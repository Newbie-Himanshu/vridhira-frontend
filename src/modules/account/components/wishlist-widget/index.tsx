"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

interface WishlistWidgetProps {
  itemCount: number
}

const WishlistWidget = ({ itemCount }: WishlistWidgetProps) => {
  return (
    <LocalizedClientLink href="/account/wishlist">
      <div className="bg-gradient-to-br from-red-50 to-rose-100 rounded-lg p-6 border border-red-200 hover:border-red-300 transition-all hover:shadow-md cursor-pointer">
        <div className="flex items-center justify-between mb-2">
          <span className="text-3xl">❤️</span>
          <span className="text-xs font-semibold text-red-600 bg-red-100 px-2 py-1 rounded-full">
            {itemCount} items
          </span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Wishlist</h3>
        <p className="text-sm text-gray-600 mt-1">
          {itemCount === 0 ? "Start adding items to your wishlist" : "View your saved items"}
        </p>
      </div>
    </LocalizedClientLink>
  )
}

export default WishlistWidget
