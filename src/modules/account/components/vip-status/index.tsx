"use client"

import { UserTier } from "@lib/data/account-features"

interface VIPStatusProps {
  tier: UserTier | null
}

const VIPStatus = ({ tier }: VIPStatusProps) => {
  if (!tier) return null

  return (
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 small:p-8 text-white">
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-sm font-semibold text-purple-100 uppercase tracking-wide mb-2">Your Status</p>
          <h3 className="text-3xl font-bold">{tier.icon} {tier.name}</h3>
        </div>
        <span className="text-5xl">{tier.icon}</span>
      </div>

      {/* Perks */}
      {tier.perks && tier.perks.length > 0 && (
        <div className="mb-6">
          <p className="text-xs font-semibold text-purple-100 uppercase mb-3">Your Perks</p>
          <ul className="space-y-2">
            {tier.perks.map((perk, idx) => (
              <li key={idx} className="flex items-center gap-2 text-sm">
                <span>✓</span>
                <span>{perk}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Next Level Progress */}
      {tier.next_level && (
        <div className="bg-white/20 rounded-lg p-4">
          <p className="text-xs font-semibold text-purple-100 uppercase mb-2">Next Level</p>
          <p className="text-white font-semibold mb-1">{tier.next_level.name}</p>
          <p className="text-sm text-purple-100">Complete {tier.next_level.orders_needed} more orders to unlock</p>
        </div>
      )}
    </div>
  )
}

export default VIPStatus
