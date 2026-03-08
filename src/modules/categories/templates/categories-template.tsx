import { notFound } from "next/navigation"
import { listCategories } from "@lib/data/categories"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

// Emoji map for categories
const EMOJI_MAP: Record<string, string> = {
  textile: "🧵",
  pottery: "🏺",
  ceramic: "🪙",
  Crochet: "🧶",
  terracotta: "🪴",
  art: "🎨",
  woodcraft: "🪵",
  "handmade-jewellery": "💎",
}

export default async function CategoriesTemplate({
  countryCode,
}: {
  countryCode: string
}) {
  if (!countryCode) notFound()

  const categories = await listCategories({ limit: 100 }).catch(() => [])

  if (!categories || categories.length === 0) {
    notFound()
  }

  // Filter to show only root categories (those without a parent)
  const rootCategories = categories.filter((cat) => !cat.parent_category)

  return (
    <div style={{ background: "#FAF7F2", minHeight: "100vh" }} data-testid="categories-container">
      {/* ── Banner ── */}
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
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide mb-4"
            style={{
              background: "rgba(201,118,43,0.10)",
              color: "#8B4513",
              border: "1px solid rgba(201,118,43,0.20)",
            }}
          >
            <span aria-hidden="true">🛍️</span>
            <span className="uppercase tracking-[0.15em]">Shop By Category</span>
          </div>

          {/* Heading */}
          <h1
            className="font-serif text-5xl lg:text-6xl font-semibold mb-4"
            style={{ color: "#2C1810", lineHeight: 1.1 }}
            data-testid="categories-page-title"
          >
            All Categories
          </h1>

          {/* Description */}
          <p
            className="text-base max-w-2xl leading-relaxed"
            style={{ color: "#6B4C3B" }}
          >
            Explore our complete collection of handcrafted goods from Indian artisans. From traditional pottery to contemporary jewellery, find unique pieces across all our categories.
          </p>

          {/* Decorative underline */}
          <div
            className="mt-8 h-px w-32"
            style={{ background: "linear-gradient(90deg, #C9762B 0%, rgba(201,118,43,0.3) 60%, transparent 100%)" }}
          />
        </div>
      </div>

      {/* ── Categories Grid ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          data-testid="categories-grid"
        >
          {rootCategories.map((category) => {
            const emoji = EMOJI_MAP[category.handle ?? ""] ?? "🛍️"
            const productCount = category.products?.length ?? 0

            return (
              <LocalizedClientLink
                key={category.id}
                href={`/categories/${category.handle}`}
                className="group relative rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                style={{
                  background: "white",
                  border: "1px solid #E8DDD4",
                }}
              >
                {/* Background gradient on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: "linear-gradient(135deg, rgba(201,118,43,0.05) 0%, rgba(201,118,43,0.02) 100%)",
                  }}
                />

                <div className="relative p-6">
                  {/* Emoji badge */}
                  <div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                    style={{
                      background: "rgba(201,118,43,0.10)",
                      fontSize: "2rem",
                    }}
                  >
                    <span aria-hidden="true">{emoji}</span>
                  </div>

                  {/* Category name */}
                  <h3
                    className="text-lg lg:text-xl font-semibold mb-2 group-hover:text-amber-700 transition-colors"
                    style={{ color: "#2C1810" }}
                  >
                    {category.name}
                  </h3>

                  {/* Description or fallback */}
                  {category.description ? (
                    <p
                      className="text-sm line-clamp-2 mb-3"
                      style={{ color: "#6B4C3B" }}
                    >
                      {category.description}
                    </p>
                  ) : (
                    <p
                      className="text-sm italic mb-3"
                      style={{ color: "#A08070" }}
                    >
                      Discover handcrafted {category.name.toLowerCase()} pieces.
                    </p>
                  )}

                  {/* Product count */}
                  <div
                    className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full"
                    style={{
                      background: "rgba(201,118,43,0.08)",
                      color: "#8B4513",
                    }}
                  >
                    <span>{productCount}</span>
                    <span>{productCount === 1 ? "Product" : "Products"}</span>
                  </div>

                  {/* Subcategories indicator */}
                  {category.category_children && category.category_children.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-xs mb-2" style={{ color: "#8D6E63" }}>
                        Subcategories:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {category.category_children.slice(0, 3).map((subcat) => (
                          <span
                            key={subcat.id}
                            className="text-xs px-2 py-1 rounded-full"
                            style={{
                              background: "rgba(201,118,43,0.04)",
                              color: "#8B4513",
                              border: "1px solid rgba(201,118,43,0.15)",
                            }}
                          >
                            {subcat.name}
                          </span>
                        ))}
                        {category.category_children.length > 3 && (
                          <span
                            className="text-xs px-2 py-1 rounded-full"
                            style={{
                              background: "rgba(201,118,43,0.04)",
                              color: "#8B4513",
                            }}
                          >
                            +{category.category_children.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Hover arrow indicator */}
                <div
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  aria-hidden="true"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#C9762B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </div>
              </LocalizedClientLink>
            )
          })}
        </div>

        {/* Empty state message */}
        {rootCategories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg" style={{ color: "#8D6E63" }}>
              No categories available at the moment.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
