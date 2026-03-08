"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

const QuickActionsBar = () => {
  const actions = [
    { icon: "🚚", label: "Track Order", href: "/account/track-orders" },
    { icon: "⭐", label: "Write Review", href: "/account/reviews" },
    { icon: "🎁", label: "My Wishlist", href: "/account/wishlist" },
    { icon: "👤", label: "Edit Profile", href: "/account/profile" },
    { icon: "📍", label: "Manage Address", href: "/account/addresses" },
    { icon: "📞", label: "Contact Support", href: "/account/support" },
  ]

  return (
    <div className="grid grid-cols-2 small:grid-cols-3 medium:grid-cols-6 gap-3">
      {actions.map((action) => (
        <LocalizedClientLink href={action.href} key={action.href}>
          <div className="bg-white rounded-lg border border-gray-200 p-4 hover:border-blue-300 hover:shadow-md transition-all text-center cursor-pointer">
            <div className="text-2xl mb-2">{action.icon}</div>
            <p className="text-xs font-medium text-gray-900 line-clamp-2">{action.label}</p>
          </div>
        </LocalizedClientLink>
      ))}
    </div>
  )
}

export default QuickActionsBar
