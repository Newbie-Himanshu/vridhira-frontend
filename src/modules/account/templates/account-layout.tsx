import React from "react"

import UnderlineLink from "@modules/common/components/interactive-link"

import AccountNav from "../components/account-nav"
import { HttpTypes } from "@medusajs/types"

interface AccountLayoutProps {
  customer: HttpTypes.StoreCustomer | null
  children: React.ReactNode
}

const AccountLayout: React.FC<AccountLayoutProps> = ({
  customer,
  children,
}) => {
  return (
    <div className="flex-1 pt-20 small:pt-24 lg:pt-40 pb-6 small:pb-8 lg:pb-12 bg-gradient-to-b from-gray-50 to-white" data-testid="account-page">
      <div className="flex-1 content-container h-full max-w-7xl mx-auto flex flex-col">
        {/* Header Section */}
        <div className="mb-8 small:mb-12 pb-6 small:pb-8 border-b border-gray-200 ps-4 small:ps-6 lg:ps-0">
          <h1 className="text-2xl small:text-3xl font-bold text-gray-900 mb-2">My Account</h1>
          <p className="text-sm small:text-base text-gray-600">Manage your profile, addresses, orders, and more</p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 small:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr] gap-6 small:gap-8 lg:gap-12 mb-12 small:mb-16">
          <div className="small:sticky small:top-12">
            {customer && <AccountNav customer={customer} />}
          </div>
          <div className="flex-1">{children}</div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 small:mt-16 pt-8 small:pt-12 border-t border-gray-200 ps-4 small:ps-6 lg:ps-0">
          <div className="flex flex-col small:flex-row items-start small:items-center justify-between gap-6 small:gap-8">
            <div>
              <h3 className="text-xl small:text-2xl font-semibold text-gray-900 mb-2 small:mb-3">Got questions?</h3>
              <p className="text-sm small:text-base text-gray-600">
                You can find frequently asked questions and answers on our support page.
              </p>
            </div>
            <div className="flex-shrink-0">
              <UnderlineLink href="/account/support">
                Ask a Question
              </UnderlineLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountLayout
