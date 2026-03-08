import { Container } from "@medusajs/ui"

import ChevronDown from "@modules/common/icons/chevron-down"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import EmailVerification from "../email-verification"
import CodStatusSection from "../cod-status"
import WishlistWidget from "../wishlist-widget"
import QuickActionsBar from "../quick-actions"
import AccountHealthScore from "../account-health"
import RecentActivity from "../recent-activity"
import OrderStatistics from "../order-statistics"
import SeasonalBanner from "../seasonal-banner"
import SubscriptionInfo from "../subscription-info"
import ReferralProgram from "../referral-program"
import NotificationPreview from "../notification-preview"
import SupportTicketSummary from "../support-tickets"
import VIPStatus from "../vip-status"
import { EmailVerificationStatus, CodStatus, ActivityEvent, OrderStats } from "@lib/data/account-features"

type OverviewProps = {
  customer: HttpTypes.StoreCustomer | null
  orders: HttpTypes.StoreOrder[] | null
  emailStatus?: EmailVerificationStatus
  codStatus?: CodStatus
  wishlistCount?: number
  activityEvents?: ActivityEvent[]
  orderStats?: OrderStats | null
}

const Overview = ({
  customer,
  orders,
  emailStatus,
  codStatus,
  wishlistCount = 0,
  activityEvents = [],
  orderStats,
}: OverviewProps) => {
  return (
    <div data-testid="overview-page-wrapper" className="space-y-8">
      <div className="hidden small:block">
        {/* Alerts Section */}
        {(emailStatus || codStatus) && (
          <div className="space-y-4">
            {emailStatus && <EmailVerification status={emailStatus} />}
            {codStatus && <CodStatusSection codStatus={codStatus} />}
          </div>
        )}

        {/* Welcome Section */}
        <div className="mb-8 small:mb-10">
          <div className="flex flex-col small:flex-row small:justify-between small:items-center gap-3 small:gap-4">
            <h2 className="text-2xl small:text-3xl font-bold text-gray-900" data-testid="welcome-message" data-value={customer?.first_name}>
              Welcome back, {customer?.first_name}! 👋
            </h2>
            <span className="text-sm small:text-base text-gray-600">
              Account: <span className="font-semibold text-gray-900" data-testid="customer-email" data-value={customer?.email}>{customer?.email}</span>
            </span>
          </div>
        </div>

        {/* Quick Actions Bar */}
        <div className="mb-8">
          <QuickActionsBar />
        </div>

        {/* Seasonal Banner */}
        <div className="mb-8">
          <SeasonalBanner />
        </div>

        {/* Primary Widgets Grid: Profile, Addresses, Wishlist */}
        <div className="grid grid-cols-1 small:grid-cols-2 lg:grid-cols-3 gap-4 small:gap-6 mb-10 small:mb-12">
          {/* Profile Completion Card */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 small:p-8 border border-blue-200 hover:border-blue-300 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Profile</h3>
              <LocalizedClientLink href="/account/profile" passHref>
                <span className="text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer">Edit</span>
              </LocalizedClientLink>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl small:text-5xl font-bold text-blue-600" data-testid="customer-profile-completion" data-value={getProfileCompletion(customer)}>
                {getProfileCompletion(customer)}%
              </span>
              <span className="text-sm font-medium text-gray-600">Completed</span>
            </div>
            <div className="mt-4 bg-white rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-full transition-all duration-500"
                style={{ width: `${getProfileCompletion(customer)}%` }}
              />
            </div>
          </div>

          {/* Addresses Card */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 small:p-8 border border-green-200 hover:border-green-300 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Saved Addresses</h3>
              <LocalizedClientLink href="/account/addresses" passHref>
                <span className="text-sm font-medium text-green-600 hover:text-green-700 cursor-pointer">Manage</span>
              </LocalizedClientLink>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl small:text-5xl font-bold text-green-600" data-testid="addresses-count" data-value={customer?.addresses?.length || 0}>
                {customer?.addresses?.length || 0}
              </span>
              <span className="text-sm font-medium text-gray-600">Saved</span>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              {customer?.addresses?.length === 0
                ? "Add your first address for faster checkout"
                : `${customer?.addresses?.length} address${customer?.addresses?.length !== 1 ? 'es' : ''} on file`}
            </p>
          </div>

          {/* Wishlist Widget */}
          <WishlistWidget itemCount={wishlistCount} />
        </div>

        {/* Account Health Score */}
        <div className="mb-10">
          <AccountHealthScore customer={customer} emailVerified={emailStatus?.verified || false} />
        </div>

        {/* Order Statistics */}
        {orderStats && (
          <div className="mb-10">
            <OrderStatistics stats={orderStats} />
          </div>
        )}

        {/* Subscription/Order Frequency Insights */}
        {orders && orders.length > 0 && (
          <div className="mb-10">
            <SubscriptionInfo orders={orders} />
          </div>
        )}

        {/* VIP/Tier Status */}
        <div className="mb-10">
          <VIPStatus tier={null} />
        </div>

        {/* Referral Program */}
        <div className="mb-10">
          <ReferralProgram referralInfo={null} />
        </div>

        {/* Recent Orders Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 small:p-8 mb-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl small:text-2xl font-bold text-gray-900">Recent Orders</h3>
            <LocalizedClientLink href="/account/orders" passHref>
              <span className="text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer">View All</span>
            </LocalizedClientLink>
          </div>
          <ul className="flex flex-col gap-3 small:gap-4" data-testid="orders-wrapper">
            {orders && orders.length > 0 ? (
              orders.slice(0, 5).map((order) => {
                return (
                  <li key={order.id} data-testid="order-wrapper" data-value={order.id}>
                    <LocalizedClientLink href={`/account/orders/details/${order.id}`}>
                      <Container className="bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-150 flex justify-between items-center p-4 small:p-5 rounded-lg transition-all hover:shadow-md cursor-pointer border border-gray-200">
                        <div className="grid grid-cols-2 small:grid-cols-3 gap-4 flex-1">
                          <div>
                            <span className="block text-xs font-semibold text-gray-500 uppercase mb-1">Date</span>
                            <span className="text-sm font-medium text-gray-900" data-testid="order-created-date">
                              {new Date(order.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <div>
                            <span className="block text-xs font-semibold text-gray-500 uppercase mb-1">Order #</span>
                            <span className="text-sm font-medium text-gray-900" data-testid="order-id" data-value={order.display_id}>
                              #{order.display_id}
                            </span>
                          </div>
                          <div className="hidden small:block">
                            <span className="block text-xs font-semibold text-gray-500 uppercase mb-1">Total</span>
                            <span className="text-sm font-bold text-gray-900" data-testid="order-amount">
                              {convertToLocale({
                                amount: order.total,
                                currency_code: order.currency_code,
                              })}
                            </span>
                          </div>
                        </div>
                        <button className="flex-shrink-0 ml-4 p-2 hover:bg-white rounded-full transition-colors" data-testid="open-order-button">
                          <span className="sr-only">
                            Go to order #{order.display_id}
                          </span>
                          <ChevronDown className="-rotate-90 text-gray-600" />
                        </button>
                      </Container>
                    </LocalizedClientLink>
                  </li>
                )
              })
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4" data-testid="no-orders-message">No orders yet</p>
                <LocalizedClientLink href="/">
                  <span className="text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer">Start Shopping</span>
                </LocalizedClientLink>
              </div>
            )}
          </ul>
        </div>

        {/* Recent Activity Timeline */}
        {activityEvents && activityEvents.length > 0 && (
          <div className="mb-10">
            <RecentActivity events={activityEvents} />
          </div>
        )}

        {/* Notification Center Preview */}
        <div className="mb-10">
          <NotificationPreview notifications={[]} />
        </div>

        {/* Support Tickets Summary */}
        <div className="mb-10">
          <SupportTicketSummary tickets={[]} />
        </div>
      </div>
    </div>
  )
}

const getProfileCompletion = (customer: HttpTypes.StoreCustomer | null) => {
  let count = 0

  if (!customer) {
    return 0
  }

  if (customer.email) {
    count++
  }

  if (customer.first_name && customer.last_name) {
    count++
  }

  if (customer.phone) {
    count++
  }

  const billingAddress = customer.addresses?.find(
    (addr) => addr.is_default_billing
  )

  if (billingAddress) {
    count++
  }

  return (count / 4) * 100
}

export default Overview
