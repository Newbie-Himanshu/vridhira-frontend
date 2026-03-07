import { listProductsWithSort } from "@lib/data/products"
import { listCategories } from "@lib/data/categories"
import { getRegion } from "@lib/data/regions"
import ProductPreview from "@modules/products/components/product-preview"
import { Pagination } from "@modules/store/components/pagination"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

const PRODUCT_LIMIT = 12

type PaginatedProductsParams = {
  limit: number
  collection_id?: string[]
  category_id?: string[]
  id?: string[]
  order?: string
  q?: string
}

export default async function PaginatedProducts({
  sortBy,
  page,
  collectionId,
  categoryId,
  categoryHandle,
  productsIds,
  countryCode,
  queryString,
  inStock,
  isNew,
  hasSale,
  maxPrice,
}: {
  sortBy?: SortOptions
  page: number
  collectionId?: string
  categoryId?: string
  categoryHandle?: string
  productsIds?: string[]
  countryCode: string
  queryString?: string
  inStock?: boolean
  isNew?: boolean
  hasSale?: boolean
  maxPrice?: number
}) {
  const queryParams: PaginatedProductsParams = {
    limit: 12,
  }

  if (collectionId) {
    queryParams["collection_id"] = [collectionId]
  }

  // Resolve categoryHandle → categoryId if provided
  if (categoryHandle) {
    const allCats = await listCategories({ handle: categoryHandle })
    const cat = allCats?.find((c: any) => c.handle === categoryHandle)
    if (cat) queryParams["category_id"] = [cat.id]
  } else if (categoryId) {
    queryParams["category_id"] = [categoryId]
  }

  if (productsIds) {
    queryParams["id"] = productsIds
  }

  if (sortBy === "created_at") {
    queryParams["order"] = "created_at"
  }

  // Wire the text-search query param into Medusa's native q filter
  if (queryString?.trim()) {
    queryParams["q"] = queryString.trim()
  }

  // Note: Medusa v2 native API rejects unrecognized fields like `in_stock`.
  // To avoid crashes, we do NOT inject them into `queryParams` here.
  // Instead, we fetch standard results and filter locally below.


  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  let {
    response: { products, count },
  } = await listProductsWithSort({
    page,
    queryParams,
    sortBy,
    countryCode,
  })

  // ── Local Post-Fetch Filtering ──
  // Medusa API doesn't natively support `in_stock` filtering on the storefront
  if (inStock) {
    products = products.filter((p) => {
      // Find total inventory across all variants
      const totalInventory = p.variants?.reduce((acc, v) => acc + (v.inventory_quantity || 0), 0) || 0
      return totalInventory > 0
    })
    count = products.length
  }

  if (isNew) {
    // Simple mock filter: Latest 30 days
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    
    products = products.filter((p) => new Date(p.created_at) > thirtyDaysAgo)
    count = products.length
  }

  if (maxPrice !== undefined) {
    // Filter products where their cheapest variant is <= maxPrice
    products = products.filter((p) => {
      let lowestPrice = Infinity
      p.variants?.forEach((v: any) => {
        const calculatedPrice = v.calculated_price?.calculated_amount || v.prices?.[0]?.amount
        if (calculatedPrice && calculatedPrice < lowestPrice) {
          lowestPrice = calculatedPrice
        }
      })
      return lowestPrice !== Infinity && lowestPrice <= maxPrice
    })
    count = products.length
  }

  if (hasSale) {
    // Filter products where at least one variant has a calculated price lower than original price
    products = products.filter((p) => {
      return p.variants?.some((v: any) => {
        const originalPrice = v.calculated_price?.original_amount
        const calculatedPrice = v.calculated_price?.calculated_amount
        return originalPrice && calculatedPrice && calculatedPrice < originalPrice
      })
    })
    count = products.length
  }

  const totalPages = Math.ceil(count / PRODUCT_LIMIT)

  return (
    <>
      {products.length === 0 && (
        <div
          className="flex flex-col items-center justify-center py-24 text-center rounded-2xl"
          style={{ background: "#FFFDF9", border: "1px solid #E8DDD4" }}
        >
          <span className="text-5xl mb-4">🧺</span>
          <p className="font-serif text-xl mb-2" style={{ color: "#2C1810" }}>No products yet</p>
          <p className="text-sm" style={{ color: "#8D6E63" }}>Check back soon — artisans are adding new pieces.</p>
        </div>
      )}
      <ul
        className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        data-testid="products-list"
      >
        {products.map((p) => {
          return (
            <li key={p.id}>
              <ProductPreview product={p} region={region} />
            </li>
          )
        })}
      </ul>
      {totalPages > 1 && (
        <Pagination
          data-testid="product-pagination"
          page={page}
          totalPages={totalPages}
        />
      )}
    </>
  )
}
