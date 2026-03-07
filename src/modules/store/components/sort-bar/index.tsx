"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useRef, useState, useEffect } from "react"
import { SortOptions } from "../refinement-list/sort-products"

const sortOptions: { value: SortOptions; label: string }[] = [
  { value: "created_at", label: "Latest Arrivals" },
  { value: "price_asc",  label: "Price: Low → High" },
  { value: "price_desc", label: "Price: High → Low" },
]

type FilterBarProps = {
  sortBy: SortOptions
  inStock?: boolean
  isNew?: boolean
  hasSale?: boolean
  maxPrice?: number
}

export default function FilterBar({ sortBy, inStock, isNew, hasSale, maxPrice }: FilterBarProps) {
  const router       = useRouter()
  const pathname     = usePathname()
  const searchParams = useSearchParams()
  const [openSort, setOpenSort] = useState(false)
  const [openPrice, setOpenPrice] = useState(false)
  const sortRef = useRef<HTMLDivElement>(null)
  const priceRef = useRef<HTMLDivElement>(null)

  const activeSort = sortOptions.find((o) => o.value === sortBy) ?? sortOptions[0]

  const createQueryString = useCallback(
    (name: string, value: string | null) => {
      const params = new URLSearchParams(searchParams)
      if (value === null) {
        params.delete(name)
      } else {
        params.set(name, value)
      }
      return params.toString()
    },
    [searchParams]
  )

  const handleSortSelect = (value: SortOptions) => {
    router.push(`${pathname}?${createQueryString("sortBy", value)}`)
    setOpenSort(false)
  }

  const toggleInStock = () => {
    const nextVal = inStock ? null : "true"
    router.push(`${pathname}?${createQueryString("inStock", nextVal)}`)
  }

  const toggleIsNew = () => {
    const nextVal = isNew ? null : "true"
    router.push(`${pathname}?${createQueryString("isNew", nextVal)}`)
  }

  const toggleHasSale = () => {
    const nextVal = hasSale ? null : "true"
    router.push(`${pathname}?${createQueryString("hasSale", nextVal)}`)
  }

  const handlePriceSelect = (val: number | null) => {
    router.push(`${pathname}?${createQueryString("maxPrice", val ? val.toString() : null)}`)
    setOpenPrice(false)
  }

  // Close sort dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (openSort && sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setOpenSort(false)
      }
      if (openPrice && priceRef.current && !priceRef.current.contains(e.target as Node)) {
        setOpenPrice(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [openSort, openPrice])

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
      
      {/* ── Filter 1: In Stock Toggle ── */}
      <button
        onClick={toggleInStock}
        aria-pressed={!!inStock}
        style={{
          display:        "inline-flex",
          alignItems:     "center",
          gap:            6,
          padding:        "7px 14px",
          borderRadius:   9999,
          border:         inStock ? "1px solid rgba(201,118,43,0.3)" : "1px solid #E8DDD4",
          background:     inStock ? "rgba(201,118,43,0.06)" : "#FFFDF9",
          color:          inStock ? "#8B4513" : "#5C4033",
          fontSize:       13,
          fontWeight:     inStock ? 600 : 500,
          cursor:         "pointer",
          whiteSpace:     "nowrap",
          transition:     "all 150ms ease",
          boxShadow:      "0 1px 3px rgba(139,69,19,0.06)",
        }}
      >
        <div 
          style={{ 
            width: 8, height: 8, borderRadius: "50%", 
            background: inStock ? "#4CAF50" : "#D4C4B0",
            transition: "background 150ms ease" 
          }} 
        />
        Ready to Ship
      </button>

      {/* ── Filter 2: New Arrivals Toggle ── */}
      <button
        onClick={toggleIsNew}
        aria-pressed={!!isNew}
        style={{
          display:        "inline-flex",
          alignItems:     "center",
          gap:            6,
          padding:        "7px 14px",
          borderRadius:   9999,
          border:         isNew ? "1px solid rgba(201,118,43,0.3)" : "1px solid #E8DDD4",
          background:     isNew ? "rgba(201,118,43,0.06)" : "#FFFDF9",
          color:          isNew ? "#8B4513" : "#5C4033",
          fontSize:       13,
          fontWeight:     isNew ? 600 : 500,
          cursor:         "pointer",
          whiteSpace:     "nowrap",
          transition:     "all 150ms ease",
          boxShadow:      "0 1px 3px rgba(139,69,19,0.06)",
        }}
      >
        <span style={{ fontSize: 14 }}>✨</span>
        New Arrivals
      </button>

      {/* ── Filter 3: Sale Items Toggle ── */}
      <button
        onClick={toggleHasSale}
        aria-pressed={!!hasSale}
        style={{
          display:        "inline-flex",
          alignItems:     "center",
          gap:            6,
          padding:        "7px 14px",
          borderRadius:   9999,
          border:         hasSale ? "1px solid rgba(220, 38, 38, 0.4)" : "1px solid #E8DDD4",
          background:     hasSale ? "rgba(239, 68, 68, 0.08)" : "#FFFDF9",
          color:          hasSale ? "#B91C1C" : "#5C4033",
          fontSize:       13,
          fontWeight:     hasSale ? 600 : 500,
          cursor:         "pointer",
          whiteSpace:     "nowrap",
          transition:     "all 150ms ease",
          boxShadow:      "0 1px 3px rgba(139,69,19,0.06)",
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 700 }}>%</span>
        Sale
      </button>

      {/* ── Filter 4: Price Range Dropdown ── */}
      <div ref={priceRef} style={{ position: "relative", display: "inline-block" }}>
        <button
          onClick={() => setOpenPrice((o) => !o)}
          style={{
            display:        "inline-flex",
            alignItems:     "center",
            gap:            6,
            padding:        "7px 14px",
            borderRadius:   9999,
            border:         maxPrice ? "1px solid rgba(201,118,43,0.3)" : "1px solid #E8DDD4",
            background:     maxPrice ? "rgba(201,118,43,0.06)" : "#FFFDF9",
            color:          maxPrice ? "#8B4513" : "#5C4033",
            fontSize:       13,
            fontWeight:     maxPrice ? 600 : 500,
            cursor:         "pointer",
            whiteSpace:     "nowrap",
            transition:     "all 150ms ease",
            boxShadow:      "0 1px 3px rgba(139,69,19,0.06)",
          }}
        >
          {maxPrice ? `Under ₹${maxPrice}` : "Price: Any"}
          <svg
            width="12" height="12" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            style={{ transform: openPrice ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 200ms ease" }}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        {/* Price Dropdown panel */}
        {openPrice && (
          <div
            role="listbox"
            style={{
              position:     "absolute",
              top:          "calc(100% + 8px)",
              right:        0,
              zIndex:       50,
              minWidth:     160,
              background:   "#FFFDF9",
              border:       "1px solid #E8DDD4",
              borderRadius: 16,
              boxShadow:    "0 8px 24px rgba(44,24,16,0.10), 0 2px 6px rgba(44,24,16,0.06)",
              padding:      "6px",
              animation:    "sbFadeIn 120ms ease forwards",
            }}
          >
             {[null, 500, 1000, 2000, 5000].map((val) => {
              const isActive = maxPrice === val || (val === null && !maxPrice)
              const label = val === null ? "Any Price" : `Under ₹${val}`
              return (
                <button
                  key={val || "any"}
                  role="option"
                  aria-selected={isActive}
                  onClick={() => handlePriceSelect(val)}
                  style={{
                    display:      "flex",
                    alignItems:   "center",
                    gap:          10,
                    width:        "100%",
                    padding:      "9px 12px",
                    borderRadius: 10,
                    border:       isActive ? "1px solid rgba(201,118,43,0.25)" : "1px solid transparent",
                    background:   isActive ? "rgba(201,118,43,0.09)" : "transparent",
                    color:        isActive ? "#8B4513" : "#5C4033",
                    fontWeight:   isActive ? 600 : 400,
                    fontSize:     13,
                    cursor:       "pointer",
                    textAlign:    "left",
                    transition:   "background 150ms ease, border-color 150ms ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = "rgba(201,118,43,0.04)"
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = "transparent"
                  }}
                >
                  <span
                    style={{
                      width:        6,
                      height:       6,
                      borderRadius: "50%",
                      flexShrink:   0,
                      background:   isActive ? "#C9762B" : "transparent",
                      border:       isActive ? "none" : "1.5px solid #D4C4B0",
                    }}
                  />
                  {label}
                </button>
              )
            })}
          </div>
        )}
      </div>

      {/* ── Divider ── */}
      <div style={{ width: 1, height: 24, background: "#E8DDD4", margin: "0 4px" }} />

      {/* ── Sort Dropdown ── */}
      <div ref={sortRef} style={{ position: "relative", display: "inline-block" }}>
        {/* Trigger button */}
        <button
          onClick={() => setOpenSort((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={openSort}
          style={{
            display:        "inline-flex",
            alignItems:     "center",
            gap:            8,
            padding:        "7px 14px",
            borderRadius:   9999,
            border:         "1px solid #E8DDD4",
            background:     openSort ? "rgba(201,118,43,0.06)" : "#FFFDF9",
            color:          "#5C4033",
            fontSize:       13,
            fontWeight:     500,
            cursor:         "pointer",
            whiteSpace:     "nowrap",
            transition:     "background 150ms ease, border-color 150ms ease",
            boxShadow:      "0 1px 3px rgba(139,69,19,0.06)",
          }}
        >
          {/* Sort icon */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="#C9762B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18M7 12h10M11 18h2" />
          </svg>
          <span style={{ color: "#8D6E63", marginRight: 2, fontSize: 12 }}>Sort:</span>
          <span style={{ color: "#2C1810", fontWeight: 600 }}>{activeSort.label}</span>
          {/* Chevron */}
          <svg
            width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="#C9762B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            style={{ transform: openSort ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 200ms ease" }}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        {/* Dropdown panel */}
        {openSort && (
          <div
            role="listbox"
            aria-label="Sort options"
            style={{
              position:     "absolute",
              top:          "calc(100% + 8px)",
              right:        0,
              zIndex:       50,
              minWidth:     200,
              background:   "#FFFDF9",
              border:       "1px solid #E8DDD4",
              borderRadius: 16,
              boxShadow:    "0 8px 24px rgba(44,24,16,0.10), 0 2px 6px rgba(44,24,16,0.06)",
              padding:      "6px",
              animation:    "sbFadeIn 120ms ease forwards",
            }}
          >
            <style>{`
              @keyframes sbFadeIn {
                from { opacity: 0; transform: translateY(-4px); }
                to   { opacity: 1; transform: translateY(0);    }
              }
            `}</style>

            {sortOptions.map((opt) => {
              const isActive = sortBy === opt.value
              return (
                <button
                  key={opt.value}
                  role="option"
                  aria-selected={isActive}
                  onClick={() => handleSortSelect(opt.value)}
                  style={{
                    display:      "flex",
                    alignItems:   "center",
                    gap:          10,
                    width:        "100%",
                    padding:      "9px 12px",
                    borderRadius: 10,
                    border:       isActive ? "1px solid rgba(201,118,43,0.25)" : "1px solid transparent",
                    background:   isActive ? "rgba(201,118,43,0.09)" : "transparent",
                    color:        isActive ? "#8B4513" : "#5C4033",
                    fontWeight:   isActive ? 600 : 400,
                    fontSize:     13,
                    cursor:       "pointer",
                    textAlign:    "left",
                    transition:   "background 150ms ease, border-color 150ms ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = "rgba(201,118,43,0.04)"
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = "transparent"
                  }}
                >
                  {/* Active dot indicator */}
                  <span
                    style={{
                      width:        6,
                      height:       6,
                      borderRadius: "50%",
                      flexShrink:   0,
                      background:   isActive ? "#C9762B" : "transparent",
                      border:       isActive ? "none" : "1.5px solid #D4C4B0",
                      transition:   "background 150ms ease",
                    }}
                  />
                  {opt.label}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
