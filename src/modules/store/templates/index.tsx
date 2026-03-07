import { Suspense } from "react"

import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import { listCategories } from "@lib/data/categories"
import { HttpTypes } from "@medusajs/types"

import PaginatedProducts from "./paginated-products"
import SortBar from "@modules/store/components/sort-bar"

const StoreTemplate = async ({
  sortBy,
  page,
  countryCode,
  categoryHandle,
  searchQuery,
  inStock,
  isNew,
  hasSale,
  maxPrice,
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
  categoryHandle?: string
  searchQuery?: string
  inStock?: boolean
  isNew?: boolean
  hasSale?: boolean
  maxPrice?: number
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || "created_at"

  // Fetch live categories from the backend — reflects any admin add/edit/delete
  const allCategories: HttpTypes.StoreProductCategory[] =
    await listCategories({ limit: 100 }).catch(() => [])

  return (
    <div style={{ background: "#FAF7F2", minHeight: "100vh" }}>

      {/* ── Shop Banner — pt-[88px] clears the 88px fixed navbar ── */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #FAF7F2 0%, #F5EFE7 50%, #EDE0D0 100%)",
          borderBottom: "1px solid #E8DDD4",
          paddingTop: 88,
        }}
      >
        {/* Decorative blob */}
        <div
          aria-hidden="true"
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full pointer-events-none opacity-20"
          style={{ background: "radial-gradient(circle, #C9762B 0%, transparent 70%)" }}
        />
        <div className="max-w-7xl mx-auto pl-12 pr-6 lg:pl-20 lg:pr-8 pt-10 pb-16 lg:pb-20 relative">
          {searchQuery ? (
            <>
              <span
                className="block text-xs font-semibold tracking-[0.3em] uppercase mb-3"
                style={{ color: "#C9762B" }}
              >
                🔍 Search Results
              </span>
              <h1
                className="font-serif text-4xl lg:text-5xl font-semibold mb-4"
                style={{ color: "#2C1810", lineHeight: 1.15 }}
                data-testid="store-page-title"
              >
                &ldquo;{searchQuery}&rdquo;
              </h1>
              <p className="text-sm max-w-xl" style={{ color: "#8D6E63", lineHeight: 1.7 }}>
                Showing handcrafted pieces matching your search. Use the filters to refine further.
              </p>
            </>
          ) : (
            <>
              <span
                className="block text-xs font-semibold tracking-[0.3em] uppercase mb-3"
                style={{ color: "#C9762B" }}
              >
                🇮🇳 Handcrafted in India
              </span>
              <h1
                className="font-serif text-4xl lg:text-5xl font-semibold mb-4"
                style={{ color: "#2C1810", lineHeight: 1.15 }}
                data-testid="store-page-title"
              >
                Artisan Shop
              </h1>
              <p className="text-sm max-w-xl" style={{ color: "#8D6E63", lineHeight: 1.7 }}>
                Every piece is handcrafted by skilled artisans across India.
                Discover pottery, textiles, jewellery, woodcraft and more.
              </p>
            </>
          )}
          {/* Decorative underline */}
          <div
            className="mt-6 h-px w-24"
            style={{ background: "linear-gradient(90deg, #C9762B, transparent)" }}
          />
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <RefinementList
              categoryHandle={categoryHandle}
              categories={allCategories}
            />
          </aside>

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            {/* Sort bar row */}
            <div
              style={{
                display:        "flex",
                alignItems:     "center",
                justifyContent: "flex-end",
                marginBottom:   20,
              }}
            >
              <SortBar sortBy={sort} inStock={inStock} isNew={isNew} hasSale={hasSale} maxPrice={maxPrice} />
            </div>

            <Suspense fallback={<SkeletonProductGrid />}>
              <PaginatedProducts
                sortBy={sort}
                page={pageNumber}
                countryCode={countryCode}
                categoryHandle={categoryHandle}
                queryString={searchQuery}
                inStock={inStock}
                isNew={isNew}
                hasSale={hasSale}
                maxPrice={maxPrice}
              />
            </Suspense>
          </div>

        </div>
      </div>

    </div>
  )
}

export default StoreTemplate

