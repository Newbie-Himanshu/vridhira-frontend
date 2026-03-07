"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useState } from "react"
import { HttpTypes } from "@medusajs/types"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

// Emoji map keyed by handle — fallback to 🛍️ for unknown categories
const EMOJI_MAP: Record<string, string> = {
  textile:           "🧵",
  pottery:           "🏺",
  ceramic:           "🫙",
  Crochet:           "🧶",
  terracotta:        "🪴",
  art:               "🎨",
  woodcraft:         "🪵",
  "handmade-jewellery": "💎",
}

type RefinementListProps = {
  search?: boolean
  categoryHandle?: string
  categories: HttpTypes.StoreProductCategory[]
  "data-testid"?: string
}

const RefinementList = ({
  "data-testid": dataTestId,
  categoryHandle,
  categories = [],
}: RefinementListProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [catOpen, setCatOpen] = useState(true)

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )

  return (
    <div
      className="rounded-2xl sticky"
      style={{
        top: 110,  // 88px navbar + breathing room
        maxHeight: "calc(100vh - 130px)", // prevent extending off-screen
        overflowY: "auto",                // allow scrolling inside the sticky sidebar if categories overflow
        background: "#FFFDF9",
        border: "1px solid #E8DDD4",
        boxShadow: "0 1px 4px rgba(139, 69, 19, 0.06)",
        // Custom scrollbar styling for the sidebar
        scrollbarWidth: "thin",
        scrollbarColor: "rgba(201,118,43,0.3) transparent",
      }}
    >
      <style>{`
        .sticky::-webkit-scrollbar {
          width: 4px;
        }
        .sticky::-webkit-scrollbar-track {
          background: transparent;
        }
        .sticky::-webkit-scrollbar-thumb {
          background-color: rgba(201,118,43,0.3);
          border-radius: 10px;
        }
      `}</style>
      {/* ── Categories section ── */}
      <div style={{ borderBottom: catOpen ? "1px solid #E8DDD4" : "none" }}>
        {/* Accordion header */}
        <button
          onClick={() => setCatOpen(o => !o)}
          className="w-full flex items-center justify-between px-5 py-4 text-left"
          style={{ background: "transparent", border: "none", cursor: "pointer" }}
          aria-expanded={catOpen}
        >
          <span
            className="text-xs font-semibold tracking-[0.2em] uppercase"
            style={{ color: "#C9762B" }}
          >
            Category
          </span>
          <svg
            width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="#C9762B" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round"
            style={{
              transform: catOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s ease",
              flexShrink: 0,
            }}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        {/* Collapsible list */}
        {catOpen && (
          <ul className="px-3 pb-3 space-y-0.5">
            {/* "All Products" always first */}
            <li>
              <LocalizedClientLink
                href="/store"
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-all duration-200"
                style={{
                  background: !categoryHandle ? "rgba(201,118,43,0.10)" : "transparent",
                  color: !categoryHandle ? "#8B4513" : "#5C4033",
                  fontWeight: !categoryHandle ? 600 : 400,
                  border: !categoryHandle ? "1px solid rgba(201,118,43,0.25)" : "1px solid transparent",
                }}
              >
                <span>✨</span>
                <span>All Products</span>
                {!categoryHandle && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: "#C9762B" }} />
                )}
              </LocalizedClientLink>
            </li>

            {/* Dynamic categories from backend */}
            {categories
              .filter((c) => !c.parent_category)  // only top-level
              .map((cat) => {
                const isActive = categoryHandle === cat.handle
                const emoji = EMOJI_MAP[cat.handle ?? ""] ?? "🛍️"
                return (
                  <li key={cat.id}>
                    <LocalizedClientLink
                      href={`/categories/${cat.handle}`}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-all duration-200"
                      style={{
                        background: isActive ? "rgba(201,118,43,0.10)" : "transparent",
                        color: isActive ? "#8B4513" : "#5C4033",
                        fontWeight: isActive ? 600 : 400,
                        border: isActive ? "1px solid rgba(201,118,43,0.25)" : "1px solid transparent",
                      }}
                    >
                      <span>{emoji}</span>
                      <span>{cat.name}</span>
                      {isActive && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: "#C9762B" }} />
                      )}
                    </LocalizedClientLink>
                  </li>
                )
              })
            }
          </ul>
        )}
      </div>
    </div>
  )
}

export default RefinementList
