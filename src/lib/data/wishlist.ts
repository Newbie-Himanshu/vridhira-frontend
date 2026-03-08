"use server"

import { sdk } from "@lib/config"
import { getAuthHeaders, getCacheOptions, getCacheTag } from "./cookies"
import { revalidateTag } from "next/cache"

export interface WishlistItem {
  id: string
  customer_id: string
  product_id: string
  variant_id: string | null
  metadata: Record<string, unknown> | null
  product?: any
}

export const listWishlistItems = async (): Promise<WishlistItem[]> => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  const next = {
    ...(await getCacheOptions("wishlist")),
  }

  return sdk.client
    .fetch<{ wishlist: WishlistItem[] }>(`/store/wishlist`, {
      method: "GET",
      headers,
      next,
      cache: "force-cache",
    })
    .then(({ wishlist }) => wishlist || [])
    .catch(() => [])
}

export const removeFromWishlist = async (wishlistItemId: string) => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  const result = await sdk.client
    .fetch<{ deleted: boolean; id: string }>(`/store/wishlist/${wishlistItemId}`, {
      method: "DELETE",
      headers,
    })
    .then(({ deleted }) => deleted)
    .catch(() => false)

  if (result) {
    const wishlistCacheTag = await getCacheTag("wishlist")
    if (wishlistCacheTag) {
      revalidateTag(wishlistCacheTag)
    }
  }

  return result
}

export const addToWishlist = async (productId: string, variantId?: string) => {
  const headers = {
    ...(await getAuthHeaders()),
  }

  const response = await sdk.client
    .fetch<{ wishlist_item: WishlistItem; already_exists?: boolean }>(`/store/wishlist`, {
      method: "POST",
      headers,
      body: {
        product_id: productId,
        variant_id: variantId,
      },
    })
    .catch(() => null)

  if (!response) return null

  if (response.wishlist_item) {
    const wishlistCacheTag = await getCacheTag("wishlist")
    if (wishlistCacheTag) {
      revalidateTag(wishlistCacheTag)
    }
  }

  return { item: response.wishlist_item, alreadyExists: !!response.already_exists }
}
