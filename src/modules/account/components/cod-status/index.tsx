"use client"

import { CodStatus } from "@lib/data/account-features"

interface CodStatusProps {
  codStatus: CodStatus
}

const CodStatusSection = ({ codStatus }: CodStatusProps) => {
  if (codStatus.eligible && !codStatus.is_blocked && codStatus.strike_count === 0) {
    return null // Don't show if everything is good
  }

  return (
    <div className="space-y-4">
      {codStatus.is_blocked ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="text-2xl">🚫</div>
            <div>
              <h3 className="font-semibold text-red-900 mb-1">
                Cash on Delivery Temporarily Blocked
              </h3>
              <p className="text-sm text-red-700 mb-3">
                Your account has been temporarily blocked from using COD payment method. To regain
                access, please complete {codStatus.online_orders_needed || 0} online payment
                order(s).
              </p>
              <div className="text-xs text-red-600 font-medium">
                Reason: Multiple cancellations detected
              </div>
            </div>
          </div>
        </div>
      ) : codStatus.strike_count > 0 ? (
        <div
          className={`border rounded-lg p-4 ${
            codStatus.strike_count >= 2
              ? "bg-red-50 border-red-200"
              : "bg-yellow-50 border-yellow-200"
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="text-2xl">{codStatus.strike_count >= 2 ? "⚠️" : "⚡"}</div>
            <div>
              <h3
                className={`font-semibold mb-1 ${
                  codStatus.strike_count >= 2 ? "text-red-900" : "text-yellow-900"
                }`}
              >
                {codStatus.strike_count === 1
                  ? "1 Fraud Strike Warning"
                  : `${codStatus.strike_count} Fraud Strikes`}
              </h3>
              <p
                className={`text-sm mb-2 ${
                  codStatus.strike_count >= 2 ? "text-red-700" : "text-yellow-700"
                }`}
              >
                {codStatus.strike_count === 1
                  ? "You have received 1 warning strike. Cancelling picked-up parcels will result in your COD access being blocked."
                  : `You have ${codStatus.strike_count} fraud strikes. Your COD access may be at risk.`}
              </p>
              <div className="text-xs font-medium text-gray-600">
                Strike Progress: {codStatus.strike_count}/2
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {codStatus.notifications && codStatus.notifications.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-3">Notifications</h4>
          <div className="space-y-2">
            {codStatus.notifications.map((notification) => (
              <div
                key={notification.id}
                className="text-sm text-blue-700 flex items-start gap-2"
              >
                <span className="text-blue-600 mt-0.5">•</span>
                <span>{notification.message}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CodStatusSection
