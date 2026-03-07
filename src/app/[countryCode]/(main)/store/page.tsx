import { Metadata } from "next"

import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import StoreTemplate from "@modules/store/templates"

export const metadata: Metadata = {
  title: "Artisan Shop | Vridhira",
  description: "Discover authentic handmade goods from India's artisans — pottery, textiles, jewellery, woodcraft and more.",
}

type Params = {
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
    q?: string
    inStock?: string
    isNew?: string
    hasSale?: string
    maxPrice?: string
  }>
  params: Promise<{
    countryCode: string
  }>
}

export default async function StorePage(props: Params) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { sortBy, page, q, inStock, isNew, hasSale, maxPrice } = searchParams

  return (
    <StoreTemplate
      sortBy={sortBy}
      page={page}
      countryCode={params.countryCode}
      searchQuery={q}
      inStock={inStock === "true"}
      isNew={isNew === "true"}
      hasSale={hasSale === "true"}
      maxPrice={maxPrice ? parseInt(maxPrice) : undefined}
    />
  )
}
