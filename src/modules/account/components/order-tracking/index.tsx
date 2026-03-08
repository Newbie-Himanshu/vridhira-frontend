"use client"

import { useState } from "react"
import { OrderTracking } from "@lib/data/account-features"
import ChevronDown from "@modules/common/icons/chevron-down"

interface OrderTrackingProps {
  tracking: OrderTracking | null
  orderId: string
  orderNumber: string
}

const OrderTrackingCard = ({ tracking, orderId, orderNumber }: OrderTrackingProps) => {
  const [expanded, setExpanded] = useState(false)

  if (!tracking) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <p className="text-sm text-gray-600">Tracking information not available</p>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "text-green-600 bg-green-50"
      case "out_for_delivery":
        return "text-blue-600 bg-blue-50"
      case "in_transit":
        return "text-purple-600 bg-purple-50"
      case "shipped":
        return "text-orange-600 bg-orange-50"
      case "cancelled":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "✓"
      case "out_for_delivery":
        return "🚚"
      case "in_transit":
        return "📦"
      case "shipped":
        return "📮"
      case "cancelled":
        return "✕"
      default:
        return "⏳"
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3 text-left">
          <div className={`p-2 rounded-full ${getStatusColor(tracking.status)}`}>
            <span>{getStatusIcon(tracking.status)}</span>
          </div>
          <div>
            <p className="font-semibold text-gray-900">AWB: {tracking.awb}</p>
            <p className="text-sm text-gray-600 capitalize">
              {tracking.status.replace(/_/g, " ")} • {tracking.current_location}
            </p>
          </div>
        </div>
        <ChevronDown
          className={`transition-transform ${expanded ? "rotate-180" : ""} text-gray-600`}
        />
      </button>

      {expanded && (
        <div className="border-t border-gray-200 p-4 bg-gray-50 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Expected Delivery</p>
              <p className="text-sm font-medium text-gray-900">{tracking.expected_delivery}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Current Location</p>
              <p className="text-sm font-medium text-gray-900">{tracking.current_location}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Origin</p>
              <p className="text-sm text-gray-600">{tracking.origin_location}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Destination</p>
              <p className="text-sm text-gray-600">{tracking.destination_location}</p>
            </div>
          </div>

          {tracking.events && tracking.events.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-3">Timeline</p>
              <div className="space-y-3">
                {tracking.events.map((event, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                      {idx !== tracking.events.length - 1 && (
                        <div className="w-0.5 h-8 bg-gray-300 mt-2"></div>
                      )}
                    </div>
                    <div className="pb-4">
                      <p className="text-sm font-medium text-gray-900">{event.status}</p>
                      <p className="text-xs text-gray-600">{event.location}</p>
                      <p className="text-xs text-gray-500">{event.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default OrderTrackingCard
