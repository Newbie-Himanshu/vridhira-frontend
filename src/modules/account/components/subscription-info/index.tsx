"use client"

import { HttpTypes } from "@medusajs/types"

interface SubscriptionInfoProps {
  orders: HttpTypes.StoreOrder[] | null
}

const SubscriptionInfo = ({ orders }: SubscriptionInfoProps) => {
  if (!orders || orders.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Frequency</h3>
        <p className="text-sm text-gray-600 text-center py-6">Make your first purchase to see insights</p>
      </div>
    )
  }

  // Calculate order frequency
  const sortedOrders = [...orders].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  const getFrequencyInsights = () => {
    if (sortedOrders.length < 2) return "You've made 1 order"

    const firstOrder = new Date(sortedOrders[sortedOrders.length - 1].created_at)
    const lastOrder = new Date(sortedOrders[0].created_at)
    const daysSpan = Math.floor((lastOrder.getTime() - firstOrder.getTime()) / (1000 * 60 * 60 * 24))
    const avgDaysBetweenOrders = Math.floor(daysSpan / (sortedOrders.length - 1))

    return `Your average ordering frequency is every ${avgDaysBetweenOrders} days (${sortedOrders.length} orders)`
  }

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-100 rounded-lg border border-indigo-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">📊 Order Insights</h3>
      <p className="text-sm text-gray-700 mb-4">{getFrequencyInsights()}</p>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Total Orders:</span>
          <span className="font-semibold text-gray-900">{sortedOrders.length}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">First Order:</span>
          <span className="font-semibold text-gray-900">{new Date(sortedOrders[sortedOrders.length - 1].created_at).toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Latest Order:</span>
          <span className="font-semibold text-gray-900">{new Date(sortedOrders[0].created_at).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionInfo
