"use client"

import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

interface AccountHealthScoreProps {
  customer: HttpTypes.StoreCustomer | null
  emailVerified: boolean
}

const AccountHealthScore = ({ customer, emailVerified }: AccountHealthScoreProps) => {
  let completionScore = 0
  const completionItems: Array<{ label: string; completed: boolean; href: string }> = []

  // Email verified
  if (emailVerified) {
    completionScore += 20
    completionItems.push({ label: "Email Verified", completed: true, href: "/account/security" })
  } else {
    completionItems.push({ label: "Verify Email", completed: false, href: "/account/security" })
  }

  // Phone
  if (customer?.phone) {
    completionScore += 20
    completionItems.push({ label: "Phone Added", completed: true, href: "/account/profile" })
  } else {
    completionItems.push({ label: "Add Phone", completed: false, href: "/account/profile" })
  }

  // Full name
  if (customer?.first_name && customer?.last_name) {
    completionScore += 20
    completionItems.push({ label: "Full Name Added", completed: true, href: "/account/profile" })
  } else {
    completionItems.push({ label: "Add Full Name", completed: false, href: "/account/profile" })
  }

  // Address
  if (customer?.addresses && customer.addresses.length > 0) {
    completionScore += 20
    completionItems.push({ label: "Address Saved", completed: true, href: "/account/addresses" })
  } else {
    completionItems.push({ label: "Add Address", completed: false, href: "/account/addresses" })
  }

  // Billing address
  if (customer?.billing_address || customer?.addresses?.find((a) => a.is_default_billing)) {
    completionScore += 20
    completionItems.push({ label: "Billing Address Set", completed: true, href: "/account/addresses" })
  } else {
    completionItems.push({ label: "Set Billing Address", completed: false, href: "/account/addresses" })
  }

  const getHealthColor = (score: number) => {
    if (score >= 80) return "from-green-500 to-emerald-500"
    if (score >= 60) return "from-yellow-500 to-orange-500"
    return "from-red-500 to-rose-500"
  }

  const getHealthLabel = (score: number) => {
    if (score >= 80) return "Excellent"
    if (score >= 60) return "Good"
    return "Needs Work"
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 small:p-8">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Account Health</h3>
        <p className="text-sm text-gray-600">Complete your profile for a better experience</p>
      </div>

      {/* Score Display */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-700">Profile Completion</span>
          <span className="text-2xl font-bold bg-gradient-to-r {getHealthColor(completionScore)} bg-clip-text text-transparent">
            {completionScore}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${getHealthColor(completionScore)} transition-all duration-500`}
            style={{ width: `${completionScore}%` }}
          />
        </div>
        <p className="text-xs text-gray-600 mt-2">Status: <span className="font-semibold">{getHealthLabel(completionScore)}</span></p>
      </div>

      {/* Checklist */}
      <div className="space-y-2">
        {completionItems.map((item) => (
          <LocalizedClientLink href={item.href} key={item.label}>
            <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <span className={`text-lg ${item.completed ? "text-green-600" : "text-gray-400"}`}>
                {item.completed ? "✓" : "○"}
              </span>
              <span className={`text-sm ${item.completed ? "text-gray-900 font-medium" : "text-gray-600"}`}>
                {item.label}
              </span>
            </div>
          </LocalizedClientLink>
        ))}
      </div>
    </div>
  )
}

export default AccountHealthScore
