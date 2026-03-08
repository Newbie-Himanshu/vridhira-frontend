"use client"

import { WishlistItem } from "@lib/data/wishlist"
import WishlistCard from "../wishlist-card"
import { useState } from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

interface WishlistOverviewProps {
  items: WishlistItem[]
}

const WishlistOverview = ({ items: initialItems }: WishlistOverviewProps) => {
  const [items, setItems] = useState(initialItems)

  const handleItemRemoved = (itemId: string) => {
    setItems(items.filter(item => item.id !== itemId))
  }

  if (items?.length) {
    return (
      <div className="w-full">
        <div className="mb-6 flex items-center gap-2">
          <svg className="w-4 h-4 text-red-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          <span className="text-sm text-gray-500 font-medium">
            {items.length} item{items.length !== 1 ? "s" : ""} saved
          </span>
        </div>
        <div className="grid grid-cols-2 small:grid-cols-2 medium:grid-cols-3 large:grid-cols-4 gap-4">
          {items.map((item) => (
            <WishlistCard key={item.id} item={item} onRemove={handleItemRemoved} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div
      className="w-full flex flex-col items-center gap-y-5 py-16"
      data-testid="empty-wishlist-container"
    >
      {/* Empty heart illustration */}
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center"
        style={{ background: "#FFF0E8" }}
      >
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="#E9967A" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </div>
      <div className="text-center">
        <h2 className="text-lg font-semibold" style={{ color: "#2C1810" }}>Your wishlist is empty</h2>
        <p className="text-sm text-gray-500 mt-1 max-w-xs">
          Save items you love and come back to them anytime.
        </p>
      </div>
      <LocalizedClientLink
        href="/"
        className="mt-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 active:scale-95"
        style={{ background: "#564154" }}
        data-testid="start-shopping-button"
      >
        Start Shopping
      </LocalizedClientLink>
    </div>
  )
}

export default WishlistOverview
