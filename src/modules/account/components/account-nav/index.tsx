"use client"

import { clx } from "@medusajs/ui"
import { ArrowRightOnRectangle } from "@medusajs/icons"
import { useParams, usePathname } from "next/navigation"

import ChevronDown from "@modules/common/icons/chevron-down"
import User from "@modules/common/icons/user"
import MapPin from "@modules/common/icons/map-pin"
import Package from "@modules/common/icons/package"
import Heart from "@modules/common/icons/heart"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"
import { signout } from "@lib/data/customer"

const AccountNav = ({
  customer,
}: {
  customer: HttpTypes.StoreCustomer | null
}) => {
  const route = usePathname()
  const { countryCode } = useParams() as { countryCode: string }

  const handleLogout = async () => {
    await signout(countryCode)
  }

  return (
    <div>
      <div className="small:hidden" data-testid="mobile-account-nav">
        {route !== `/${countryCode}/account` ? (
          <LocalizedClientLink
            href="/account"
            className="flex items-center gap-x-2 text-small-regular py-2"
            data-testid="account-main-link"
          >
            <>
              <ChevronDown className="transform rotate-90" />
              <span>Account</span>
            </>
          </LocalizedClientLink>
        ) : (
          <>
            <div className="text-xl-semi mb-4 px-8">
              Hello {customer?.first_name}
            </div>
            <div className="text-base-regular">
              <ul>
                <li>
                  <LocalizedClientLink
                    href="/account/profile"
                    className="flex items-center justify-between py-4 border-b border-gray-200 px-8"
                    data-testid="profile-link"
                  >
                    <>
                      <div className="flex items-center gap-x-2">
                        <User size={20} />
                        <span>Profile</span>
                      </div>
                      <ChevronDown className="transform -rotate-90" />
                    </>
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/account/addresses"
                    className="flex items-center justify-between py-4 border-b border-gray-200 px-8"
                    data-testid="addresses-link"
                  >
                    <>
                      <div className="flex items-center gap-x-2">
                        <MapPin size={20} />
                        <span>Addresses</span>
                      </div>
                      <ChevronDown className="transform -rotate-90" />
                    </>
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/account/orders"
                    className="flex items-center justify-between py-4 border-b border-gray-200 px-8"
                    data-testid="orders-link"
                  >
                    <div className="flex items-center gap-x-2">
                      <Package size={20} />
                      <span>Orders</span>
                    </div>
                    <ChevronDown className="transform -rotate-90" />
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/account/wishlist"
                    className="flex items-center justify-between py-4 border-b border-gray-200 px-8"
                    data-testid="wishlist-link"
                  >
                    <div className="flex items-center gap-x-2">
                      <Heart size={20} />
                      <span>Wishlist</span>
                    </div>
                    <ChevronDown className="transform -rotate-90" />
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/account/reviews"
                    className="flex items-center justify-between py-4 border-b border-gray-200 px-8"
                    data-testid="reviews-link"
                  >
                    <div className="flex items-center gap-x-2">
                      <span>⭐</span>
                      <span>Reviews</span>
                    </div>
                    <ChevronDown className="transform -rotate-90" />
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/account/track-orders"
                    className="flex items-center justify-between py-4 border-b border-gray-200 px-8"
                    data-testid="track-orders-link"
                  >
                    <div className="flex items-center gap-x-2">
                      <span>🚚</span>
                      <span>Track Orders</span>
                    </div>
                    <ChevronDown className="transform -rotate-90" />
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/account/support"
                    className="flex items-center justify-between py-4 border-b border-gray-200 px-8"
                    data-testid="support-link"
                  >
                    <div className="flex items-center gap-x-2">
                      <span>💬</span>
                      <span>Support</span>
                    </div>
                    <ChevronDown className="transform -rotate-90" />
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/account/shipping"
                    className="flex items-center justify-between py-4 border-b border-gray-200 px-8"
                    data-testid="shipping-link"
                  >
                    <div className="flex items-center gap-x-2">
                      <span>📮</span>
                      <span>Shipping Info</span>
                    </div>
                    <ChevronDown className="transform -rotate-90" />
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/account/security"
                    className="flex items-center justify-between py-4 border-b border-gray-200 px-8"
                    data-testid="security-link"
                  >
                    <div className="flex items-center gap-x-2">
                      <span>🔒</span>
                      <span>Security</span>
                    </div>
                    <ChevronDown className="transform -rotate-90" />
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/account/cod-status"
                    className="flex items-center justify-between py-4 border-b border-gray-200 px-8"
                    data-testid="cod-status-link"
                  >
                    <div className="flex items-center gap-x-2">
                      <span>💳</span>
                      <span>Payment Status</span>
                    </div>
                    <ChevronDown className="transform -rotate-90" />
                  </LocalizedClientLink>
                </li>
                <li>
                  <button
                    type="button"
                    className="flex items-center justify-between py-4 border-b border-gray-200 px-8 w-full"
                    onClick={handleLogout}
                    data-testid="logout-button"
                  >
                    <div className="flex items-center gap-x-2">
                      <ArrowRightOnRectangle />
                      <span>Log out</span>
                    </div>
                    <ChevronDown className="transform -rotate-90" />
                  </button>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
      <div className="hidden small:block" data-testid="account-nav">
        <div className="bg-white rounded-lg border border-gray-200 p-4 small:p-6">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900">Menu</h3>
          </div>
          <div className="text-base-regular">
            <ul className="flex mb-0 justify-start items-start flex-col gap-y-1">
              <li>
                <AccountNavLink
                  href="/account"
                  route={route!}
                  data-testid="overview-link"
                  icon="📊"
                >
                  Overview
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink
                  href="/account/profile"
                  route={route!}
                  data-testid="profile-link"
                  icon="👤"
                >
                  Profile
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink
                  href="/account/addresses"
                  route={route!}
                  data-testid="addresses-link"
                  icon="📍"
                >
                  Addresses
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink
                  href="/account/orders"
                  route={route!}
                  data-testid="orders-link"
                  icon="📦"
                >
                  Orders
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink
                  href="/account/wishlist"
                  route={route!}
                  data-testid="wishlist-link"
                  icon="❤️"
                >
                  Wishlist
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink
                  href="/account/reviews"
                  route={route!}
                  data-testid="reviews-link"
                  icon="⭐"
                >
                  Reviews
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink
                  href="/account/track-orders"
                  route={route!}
                  data-testid="track-orders-link"
                  icon="🚚"
                >
                  Track Orders
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink
                  href="/account/support"
                  route={route!}
                  data-testid="support-link"
                  icon="💬"
                >
                  Support
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink
                  href="/account/shipping"
                  route={route!}
                  data-testid="shipping-link"
                  icon="📮"
                >
                  Shipping Info
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink
                  href="/account/security"
                  route={route!}
                  data-testid="security-link"
                  icon="🔒"
                >
                  Security
                </AccountNavLink>
              </li>
              <li>
                <AccountNavLink
                  href="/account/cod-status"
                  route={route!}
                  data-testid="cod-status-link"
                  icon="💳"
                >
                  Payment Status
                </AccountNavLink>
              </li>
              <li className="pt-4 mt-4 border-t border-gray-200 w-full">
                <button
                  type="button"
                  onClick={handleLogout}
                  data-testid="logout-button"
                  className={clx("text-ui-fg-subtle text-sm font-medium hover:text-ui-fg-base px-3 py-2 rounded-md transition-colors w-full text-left", {
                    "text-ui-fg-base font-semibold": false,
                  })}
                >
                  🚪 Log out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

type AccountNavLinkProps = {
  href: string
  route: string
  children: React.ReactNode
  "data-testid"?: string
  icon?: string
}

const AccountNavLink = ({
  href,
  route,
  children,
  "data-testid": dataTestId,
  icon,
}: AccountNavLinkProps) => {
  const { countryCode }: { countryCode: string } = useParams()

  const active = route.split(countryCode)[1] === href
  return (
    <LocalizedClientLink
      href={href}
      className={clx("flex items-center gap-x-3 px-3 py-2 rounded-md text-sm font-medium transition-all", {
        "text-gray-900 bg-blue-50 border-l-4 border-blue-600": active,
        "text-gray-600 hover:text-gray-900 hover:bg-gray-100": !active,
      })}
      data-testid={dataTestId}
    >
      {icon && <span className="text-lg">{icon}</span>}
      <span>{children}</span>
    </LocalizedClientLink>
  )
}

export default AccountNav
