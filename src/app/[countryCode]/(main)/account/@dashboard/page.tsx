import { Metadata } from "next"

import Overview from "@modules/account/components/overview"
import { notFound } from "next/navigation"
import { retrieveCustomer } from "@lib/data/customer"
import { listOrders } from "@lib/data/orders"
import { getCodStatus, getActivityTimeline, getOrderStatistics } from "@lib/data/account-features"
import { listWishlistItems } from "@lib/data/wishlist"

export const metadata: Metadata = {
  title: "Account",
  description: "Overview of your account activity.",
}

export default async function OverviewTemplate() {
  const customer = await retrieveCustomer().catch(() => null)
  const orders = (await listOrders().catch(() => null)) || null
  const codStatus = await getCodStatus().catch(() => null)
  const wishlistItems = await listWishlistItems().catch(() => [])
  const activityEvents = await getActivityTimeline().catch(() => [])
  const orderStats = await getOrderStatistics().catch(() => null)

  if (!customer) {
    notFound()
  }

  const emailVerificationStatus = {
    email: customer.email || "",
    verified: customer.metadata?.email_verified === true,
    verified_at: customer.metadata?.email_verified_at as string | undefined,
  }

  return (
    <Overview
      customer={customer}
      orders={orders}
      emailStatus={emailVerificationStatus}
      codStatus={codStatus}
      wishlistCount={wishlistItems.length}
      activityEvents={activityEvents}
      orderStats={orderStats}
    />
  )
}
