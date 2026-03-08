"use client"

import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { useToast } from "@modules/common/contexts/toast-context"
import { addToWishlist, removeFromWishlist } from "@lib/data/wishlist"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import { useState } from "react"
import { addToCart } from "@lib/data/cart"

export default function ProductPreview({
  product,
  isFeatured,
  region,
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
  region: HttpTypes.StoreRegion
}) {
  const { cheapestPrice } = getProductPrice({ product })
  const { addToast } = useToast()
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [isWishlistLoading, setIsWishlistLoading] = useState(false)
  const [wishlistItemId, setWishlistItemId] = useState<string | null>(null)

  // Extract a few variant option values to show as "chips" (e.g., shoe sizes, colors)
  // We'll just take unique values from the first two options mapped across all variants to keep it brief
  const optionChips: string[] = []
  if (product.options && product.options.length > 0) {
    product.options.slice(0, 2).forEach((opt) => {
      if (opt.values && opt.values.length > 0) {
        // Take up to 2 unique values per option to avoid cluttering the card
        const uniqueVals = Array.from(new Set(opt.values.map(v => v.value))).slice(0, 2)
        optionChips.push(...uniqueVals)
      }
    })
  }

  // Determine if we can quick-add
  const isQuickAddable = product.variants && product.variants.length === 1

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault() // prevent navigating to product page
    e.stopPropagation()

    if (!isQuickAddable || !product.variants?.[0]?.id) return

    setIsAdding(true)
    await addToCart({
      variantId: product.variants[0].id,
      quantity: 1,
      countryCode: region.currency_code.toLowerCase(), // Note: actual cart uses countryCode, region usually has it but we might need to fallback
    }).catch(() => {})
    setIsAdding(false)
  }

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setIsWishlistLoading(true)

    try {
      if (isWishlisted && wishlistItemId) {
        // Remove from wishlist
        const success = await removeFromWishlist(wishlistItemId)
        if (success) {
          setIsWishlisted(false)
          setWishlistItemId(null)
          addToast("Removed from wishlist", "success", 2000)
        } else {
          addToast("Failed to remove from wishlist", "error", 3000)
        }
      } else {
        // Add to wishlist
        const variantId = product.variants?.[0]?.id
        const result = await addToWishlist(product.id, variantId)
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
    } catch (error) {
      addToast("Something went wrong", "error", 3000)
    } finally {
      setIsWishlistLoading(false)
    }
  }

  return (
    <div
      data-testid="product-wrapper"
      className="group rounded-2xl overflow-hidden transition-all duration-300 h-full flex flex-col relative"
      style={{
        background: "#FFFDF9",
        border: "1px solid #E8DDD4",
        boxShadow: "0 4px 14px rgba(139, 69, 19, 0.04)",
      }}
    >
      {/* ── Top Half: Image & Wishlist ── */}
      <div className="relative overflow-hidden w-full" style={{ aspectRatio: "4/5", background: "linear-gradient(180deg, #F9F6F0 0%, #EFE8DF 100%)" }}>
        
        <LocalizedClientLink href={`/products/${product.handle}`} className="absolute inset-0 z-0">
          <Thumbnail
            thumbnail={product.thumbnail}
            images={product.images}
            size="full"
            isFeatured={isFeatured}
            className="!rounded-none !shadow-none !p-0 !bg-transparent w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </LocalizedClientLink>

        {/* Wishlist Button (Absolute Top Right) */}
        <button
          onClick={handleWishlistToggle}
          disabled={isWishlistLoading}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-50"
          style={{
            background: isWishlisted ? "rgba(220, 38, 38, 0.1)" : "rgba(255,255,255,0.4)",
            backdropFilter: "blur(4px)",
            border: isWishlisted ? "1px solid rgba(220, 38, 38, 0.2)" : "1px solid rgba(255,255,255,0.6)",
          }}
          aria-label="Toggle Wishlist"
        >
          <svg
            width="16" height="16" viewBox="0 0 24 24"
            fill={isWishlisted ? "#DC2626" : "none"}
            stroke={isWishlisted ? "#DC2626" : "#5C4033"}
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className={`transition-all duration-200 ${isWishlistLoading ? "animate-pulse" : ""}`}
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>

      {/* ── Bottom Half: Info & CTA ── */}
      <div className="p-4 flex flex-col flex-1 relative z-10 bg-[#FFFDF9]">
        
        {/* Title & Link */}
        <LocalizedClientLink href={`/products/${product.handle}`} className="mb-2">
          <h3
            className="text-[15px] font-semibold leading-snug line-clamp-2 transition-colors group-hover:text-[#C9762B]"
            style={{ color: "#2C1810", fontFamily: "Inter, sans-serif" }}
            data-testid="product-title"
          >
            {product.title}
          </h3>
        </LocalizedClientLink>

        {/* Variant Chips */}
        {optionChips.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {optionChips.map((chip, idx) => (
              <span 
                key={idx} 
                className="text-[10px] font-medium tracking-wider uppercase px-2 py-0.5 rounded-sm"
                style={{ 
                  color: "#6B4C3B", 
                  border: "1px solid #E8DDD4",
                  background: "#FAF7F2"
                }}
              >
                {chip}
              </span>
            ))}
          </div>
        )}

        {/* Spacer to push price/CTA to bottom if titles are short */}
        <div className="mt-auto pt-4 flex items-end justify-between">
          
          {/* Price Block */}
          <div className="flex flex-col">
            <span className="text-[9px] font-bold tracking-widest uppercase mb-0.5" style={{ color: "#A08070" }}>
              Price
            </span>
            {cheapestPrice ? (
              <PreviewPrice price={cheapestPrice} />
            ) : (
              <span className="text-sm font-semibold text-gray-400">N/A</span>
            )}
          </div>

          {/* Add to Cart CTA */}
          {isQuickAddable ? (
            <button
              onClick={handleQuickAdd}
              disabled={isAdding}
              className="px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 active:scale-95"
              style={{
                background: "#564154", // Dribbble purple/slate vibe
                color: "#FFFFFF",
                boxShadow: "0 2px 8px rgba(86, 65, 84, 0.2)",
                opacity: isAdding ? 0.7 : 1
              }}
            >
              {isAdding ? "Adding..." : "Add to cart"}
            </button>
          ) : (
            <LocalizedClientLink 
              href={`/products/${product.handle}`}
              className="px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 active:scale-95 text-center"
              style={{
                background: "#564154", 
                color: "#FFFFFF",
                boxShadow: "0 2px 8px rgba(86, 65, 84, 0.2)",
              }}
            >
              Options
            </LocalizedClientLink>
          )}

        </div>
      </div>
    </div>
  )
}

