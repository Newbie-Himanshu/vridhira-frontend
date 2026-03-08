"use client"

import { useState } from "react"
import { addToWishlist, removeFromWishlist } from "@lib/data/wishlist"
import { useToast } from "@modules/common/contexts/toast-context"

type WishlistHeartButtonProps = {
  productId: string
  variantId?: string
}

const WishlistHeartButton = ({ productId, variantId }: WishlistHeartButtonProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [wishlistItemId, setWishlistItemId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { addToast } = useToast()

  const handleToggle = async () => {
    setIsLoading(true)
    try {
      if (isWishlisted && wishlistItemId) {
        const success = await removeFromWishlist(wishlistItemId)
        if (success) {
          setIsWishlisted(false)
          setWishlistItemId(null)
          addToast("Removed from wishlist", "success", 2000)
        } else {
          addToast("Failed to remove from wishlist", "error", 3000)
        }
      } else {
        const result = await addToWishlist(productId, variantId)
        if (result?.item) {
          setIsWishlisted(true)
          setWishlistItemId(result.item.id)
          if (result.alreadyExists) {
            addToast("Already in your wishlist", "info", 2000)
          } else {
            addToast("Added to wishlist ❤️", "success", 2000)
          }
        } else {
          addToast("Failed to add to wishlist", "error", 3000)
        }
      }
    } catch {
      addToast("Something went wrong", "error", 3000)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      className="absolute top-4 right-4 z-10 w-11 h-11 flex items-center justify-center rounded-full transition-all duration-200 disabled:opacity-50 hover:scale-110 active:scale-95"
      style={{
        background: isWishlisted ? "rgba(220, 38, 38, 0.12)" : "rgba(255,255,255,0.85)",
        backdropFilter: "blur(8px)",
        border: isWishlisted
          ? "1.5px solid rgba(220, 38, 38, 0.25)"
          : "1.5px solid rgba(200,190,180,0.4)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
      }}
    >
      {isLoading ? (
        <svg className="w-5 h-5 animate-spin text-gray-400" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      ) : (
        <svg
          className="w-5 h-5 transition-all duration-200"
          viewBox="0 0 24 24"
          fill={isWishlisted ? "#DC2626" : "none"}
          stroke={isWishlisted ? "#DC2626" : "#6B4C3B"}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      )}
    </button>
  )
}

export default WishlistHeartButton
