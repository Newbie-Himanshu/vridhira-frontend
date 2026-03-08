import { Metadata } from "next"

import WishlistOverview from "@modules/account/components/wishlist-overview"
import { listWishlistItems } from "@lib/data/wishlist"
import Divider from "@modules/common/components/divider"

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Your saved items for later.",
}

export default async function Wishlist() {
  const wishlistItems = await listWishlistItems()

  return (
    <div className="w-full" data-testid="wishlist-page-wrapper">
      <div className="mb-8 flex flex-col gap-y-4">
        <h1 className="text-2xl-semi">Wishlist</h1>
        <p className="text-base-regular">
          View and manage your saved items. Add items to your cart whenever you're ready to purchase.
        </p>
      </div>
      <div>
        <WishlistOverview items={wishlistItems} />
        <Divider className="my-16" />
      </div>
    </div>
  )
}
