"use client"

import { WishlistItem } from "@lib/data/wishlist"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { removeFromWishlist } from "@lib/data/wishlist"
import { addToCart } from "@lib/data/cart"
import { useParams } from "next/navigation"
import { useToast } from "@modules/common/contexts/toast-context"
import { convertToLocale } from "@lib/util/money"

interface WishlistCardProps {
  item: WishlistItem
  onRemove?: (itemId: string) => void
}

const WishlistCard = ({ item, onRemove }: WishlistCardProps) => {
  const [isRemoving, setIsRemoving] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const { countryCode } = useParams() as { countryCode: string }
  const { addToast } = useToast()

  const handleRemove = async () => {
    setIsRemoving(true)
    try {
      const success = await removeFromWishlist(item.id)
      if (success) {
        if (onRemove) onRemove(item.id)
        addToast("Removed from wishlist", "success", 2000)
      } else {
        addToast("Failed to remove from wishlist", "error", 3000)
      }
    } catch {
      addToast("Something went wrong", "error", 3000)
    } finally {
      setIsRemoving(false)
    }
  }

  const handleAddToCart = async () => {
    if (!item.product?.variants || item.product.variants.length === 0) {
      addToast("Product not available", "error", 3000)
      return
    }
    setIsAddingToCart(true)
    try {
      const variantId = item.variant_id || item.product.variants[0]?.id
      if (variantId) {
        await addToCart({ variantId, quantity: 1, countryCode })
        addToast("Added to cart!", "success", 2000)
      }
    } catch {
      addToast("Failed to add to cart", "error", 3000)
    } finally {
      setIsAddingToCart(false)
    }
  }

  if (!item.product) {
    return (
      <div className="rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 p-5 flex flex-col gap-3">
        <div className="w-full aspect-square bg-gray-100 rounded-xl flex items-center justify-center">
          <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-sm text-gray-400 text-center">Product unavailable</p>
        <button
          onClick={() => {
            if (onRemove) onRemove(item.id)
            removeFromWishlist(item.id)
            addToast("Item removed", "info", 2000)
          }}
          className="w-full py-2 rounded-xl text-sm font-medium text-red-500 bg-red-50 hover:bg-red-100 transition-colors"
        >
          Remove
        </button>
      </div>
    )
  }

  const productImage = item.product?.images?.[0]?.url || item.product?.thumbnail

  // Resolve pricing: collect all prices for the first variant, filter by store
  // currency (inr), sort ascending — cheapest = current price, highest = original.
  const allPrices: { amount: number; currency_code: string }[] =
    item.product.variants?.[0]?.prices ?? []
  const inrPrices = allPrices
    .filter((p) => p.currency_code?.toLowerCase() === "inr")
    .sort((a, b) => a.amount - b.amount)

  const currentPriceAmt = inrPrices[0]?.amount
  const originalPriceAmt =
    inrPrices.length > 1 ? inrPrices[inrPrices.length - 1].amount : null

  // Amounts from query.graph prices.amount are already in the major currency unit (₹)
  const formattedPrice = currentPriceAmt != null
    ? convertToLocale({ amount: currentPriceAmt, currency_code: "inr", locale: "en-IN" })
    : null
  const formattedOriginal =
    originalPriceAmt != null && originalPriceAmt > (currentPriceAmt ?? 0)
      ? convertToLocale({ amount: originalPriceAmt, currency_code: "inr", locale: "en-IN" })
      : null

  const hasDiscount = !!formattedOriginal
  const discountPct = hasDiscount && originalPriceAmt && currentPriceAmt != null
    ? Math.round(((originalPriceAmt - currentPriceAmt) / originalPriceAmt) * 100)
    : null

  return (
    <div
      className="group relative rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1"
      style={{
        background: "#FFFDF9",
        border: "1px solid #EDE4DA",
        boxShadow: "0 2px 12px rgba(139, 69, 19, 0.06)",
      }}
    >
      {/* Image container */}
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#F5EFE7]">
        <Link href={`/${countryCode}/products/${item.product.handle}`}>
          {productImage ? (
            <Image
              src={productImage}
              alt={item.product.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-14 h-14 text-[#C9B9A8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
        </Link>

        {/* Discount badge */}
        {discountPct && (
          <span className="absolute top-3 left-3 bg-[#E05C2A] text-white text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide">
            -{discountPct}%
          </span>
        )}

        {/* Remove (heart) button */}
        <button
          onClick={handleRemove}
          disabled={isRemoving}
          aria-label="Remove from wishlist"
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-red-50 transition-all duration-200 disabled:opacity-40"
        >
          {isRemoving ? (
            <svg className="w-4 h-4 animate-spin text-red-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}
        </button>
      </div>

      {/* Info */}
      <div className="flex flex-col gap-2 p-4">
        <Link href={`/${countryCode}/products/${item.product.handle}`}>
          <h3
            className="text-sm font-semibold leading-snug line-clamp-2 hover:text-[#8B4513] transition-colors"
            style={{ color: "#2C1810" }}
          >
            {item.product.title}
          </h3>
        </Link>

        {/* Price row */}
        <div className="flex items-baseline gap-2 mt-0.5">
          {formattedPrice ? (
            <span className="text-base font-bold" style={{ color: "#8B4513" }}>
              {formattedPrice}
            </span>
          ) : (
            <span className="text-sm text-gray-400">Price unavailable</span>
          )}
          {formattedOriginal && (
            <span className="text-xs text-gray-400 line-through">
              {formattedOriginal}
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-2">
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart || isRemoving}
            className="flex-1 py-2 rounded-xl text-xs font-semibold text-white transition-all duration-200 active:scale-95 disabled:opacity-50"
            style={{ background: "#564154" }}
          >
            {isAddingToCart ? (
              <span className="flex items-center justify-center gap-1">
                <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Adding
              </span>
            ) : "Add to Cart"}
          </button>
          <Link
            href={`/${countryCode}/products/${item.product.handle}`}
            className="flex-1 py-2 rounded-xl text-xs font-semibold text-center transition-all duration-200 active:scale-95"
            style={{ background: "#F5EFE7", color: "#8B6F47", border: "1px solid #E8DDD4" }}
          >
            View
          </Link>
        </div>
      </div>
    </div>
  )
}

export default WishlistCard
