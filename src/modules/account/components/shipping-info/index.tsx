"use client"

import { useState } from "react"
import { checkShippingServiceability, ShippingServiceability } from "@lib/data/account-features"
import { Button } from "@medusajs/ui"

const ShippingInfo = () => {
  const [pincode, setPincode] = useState("")
  const [serviceability, setServiceability] = useState<ShippingServiceability | null>(null)
  const [isChecking, setIsChecking] = useState(false)

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!pincode.trim()) return

    setIsChecking(true)
    const result = await checkShippingServiceability(pincode)
    setServiceability(result)
    setIsChecking(false)
  }

  return (
    <div className="max-w-2xl">
      <div className="bg-white rounded-lg border border-gray-200 p-6 small:p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Check Shipping Availability</h2>
          <p className="text-sm text-gray-600">
            Check if we deliver to your location and see available courier options.
          </p>
        </div>

        <form onSubmit={handleCheck} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              placeholder="Enter your pincode"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              maxLength="6"
              required
              disabled={isChecking}
            />
            <Button
              type="submit"
              isLoading={isChecking}
              disabled={isChecking || !pincode.trim()}
            >
              Check
            </Button>
          </div>
        </form>

        {serviceability && (
          <div>
            {serviceability.serviceable ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <p className="text-sm font-medium text-green-700 mb-4">
                  ✓ We deliver to pincode {serviceability.pincode}
                </p>

                {serviceability.couriers && serviceability.couriers.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Available Couriers</h3>
                    <div className="space-y-2">
                      {serviceability.couriers.map((courier, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between bg-white p-3 rounded border border-green-200"
                        >
                          <div>
                            <p className="text-sm font-medium text-gray-900">{courier.name}</p>
                            <p className="text-xs text-gray-600">
                              {courier.estimated_days} days delivery
                            </p>
                          </div>
                          <p className="text-sm font-semibold text-green-600">
                            ₹{courier.price}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm font-medium text-red-700 mb-2">
                  ✗ We currently do not deliver to pincode {serviceability.pincode}
                </p>
                {serviceability.message && (
                  <p className="text-xs text-red-600">{serviceability.message}</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Shipping Info Cards */}
      <div className="mt-8 grid grid-cols-1 small:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl mb-2">📦</div>
          <h3 className="font-semibold text-gray-900 mb-1">Standard Delivery</h3>
          <p className="text-sm text-gray-600">
            3-7 business days for most locations across India
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl mb-2">⚡</div>
          <h3 className="font-semibold text-gray-900 mb-1">Express Delivery</h3>
          <p className="text-sm text-gray-600">
            1-2 days delivery available in select major cities
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl mb-2">🚚</div>
          <h3 className="font-semibold text-gray-900 mb-1">Real-time Tracking</h3>
          <p className="text-sm text-gray-600">
            Track your shipment with live updates from our partners
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="text-2xl mb-2">💬</div>
          <h3 className="font-semibold text-gray-900 mb-1">Support</h3>
          <p className="text-sm text-gray-600">
            Got questions? Contact our support team anytime
          </p>
        </div>
      </div>
    </div>
  )
}

export default ShippingInfo
