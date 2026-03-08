"use client"

import { OrderStats } from "@lib/data/account-features"
import { convertToLocale } from "@lib/util/money"

interface OrderStatisticsProps {
  stats: OrderStats
}

const OrderStatistics = ({ stats }: OrderStatisticsProps) => {
  const memberSince = new Date(stats.member_since)
  const yearsAsMember = Math.floor(
    (new Date().getTime() - memberSince.getTime()) / (1000 * 60 * 60 * 24 * 365)
  )

  return (
    <div className="grid grid-cols-1 small:grid-cols-2 gap-4">
      {/* Total Orders */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-100 rounded-lg p-6 border border-blue-200">
        <div className="text-3xl mb-2">📦</div>
        <p className="text-sm text-gray-600 mb-1">Total Orders</p>
        <p className="text-3xl font-bold text-blue-600">{stats.total_orders}</p>
        <p className="text-xs text-gray-600 mt-2">Member for {yearsAsMember}+ year{yearsAsMember !== 1 ? "s" : ""}</p>
      </div>

      {/* Total Spent */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-lg p-6 border border-purple-200">
        <div className="text-3xl mb-2">💰</div>
        <p className="text-sm text-gray-600 mb-1">Total Spent</p>
        <p className="text-3xl font-bold text-purple-600">
          {stats.total_spent > 0 ? `₹${(stats.total_spent / 100).toFixed(0)}` : "₹0"}
        </p>
        <p className="text-xs text-gray-600 mt-2">
          Avg: ₹{(stats.average_order_value / 100).toFixed(0)} per order
        </p>
      </div>
    </div>
  )
}

export default OrderStatistics
