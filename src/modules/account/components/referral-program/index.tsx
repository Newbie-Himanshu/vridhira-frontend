"use client"

import { ReferralInfo } from "@lib/data/account-features"
import { Button } from "@medusajs/ui"

interface ReferralProgramProps {
  referralInfo: ReferralInfo | null
}

const ReferralProgram = ({ referralInfo }: ReferralProgramProps) => {
  if (!referralInfo) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Referral Program</h3>
        <p className="text-sm text-gray-600">Referral program is not available at the moment</p>
      </div>
    )
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralInfo.referral_link)
  }

  return (
    <div className="bg-gradient-to-br from-amber-50 to-yellow-100 rounded-lg border border-amber-200 p-6 small:p-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">Referral Program 🎁</h3>
          <p className="text-sm text-gray-700">Earn rewards by referring friends</p>
        </div>
        <span className="text-3xl">🤝</span>
      </div>

      <div className="grid grid-cols-1 small:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4">
          <p className="text-xs text-gray-600 mb-1">Friends Referred</p>
          <p className="text-2xl font-bold text-amber-600">{referralInfo.total_referrals}</p>
        </div>
        <div className="bg-white rounded-lg p-4">
          <p className="text-xs text-gray-600 mb-1">Rewards Earned</p>
          <p className="text-2xl font-bold text-amber-600">₹{referralInfo.total_rewards.toFixed(0)}</p>
        </div>
        <div className="bg-white rounded-lg p-4">
          <p className="text-xs text-gray-600 mb-1">Pending Rewards</p>
          <p className="text-2xl font-bold text-amber-600">₹{referralInfo.pending_rewards.toFixed(0)}</p>
        </div>
      </div>

      <div>
        <p className="text-xs text-gray-600 mb-2 font-semibold uppercase">Your Referral Link</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={referralInfo.referral_link}
            readOnly
            className="flex-1 px-3 py-2 border border-amber-300 rounded-lg bg-white text-sm text-gray-600"
          />
          <Button onClick={handleCopyLink} variant="secondary" size="small">
            Copy
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ReferralProgram
