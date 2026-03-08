"use client"

import { useState } from "react"
import { EmailVerificationStatus, sendVerificationEmail } from "@lib/data/account-features"
import { Button } from "@medusajs/ui"

interface EmailVerificationProps {
  status: EmailVerificationStatus | null
}

const EmailVerification = ({ status }: EmailVerificationProps) => {
  const [isSending, setIsSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSendVerification = async () => {
    setIsSending(true)
    const success = await sendVerificationEmail()
    setIsSending(false)
    if (success) {
      setSent(true)
      setTimeout(() => setSent(false), 3000)
    }
  }

  if (!status) {
    return null
  }

  return (
    <div
      className={`rounded-lg border p-4 ${
        status.verified
          ? "bg-green-50 border-green-200"
          : "bg-yellow-50 border-yellow-200"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="text-2xl mt-1">
          {status.verified ? "✓" : "⚠"}
        </div>
        <div className="flex-1">
          <h3 className={`font-semibold mb-1 ${
            status.verified ? "text-green-900" : "text-yellow-900"
          }`}>
            {status.verified ? "Email Verified" : "Email Not Verified"}
          </h3>
          <p className={`text-sm mb-3 ${
            status.verified ? "text-green-700" : "text-yellow-700"
          }`}>
            {status.verified
              ? `Your email (${status.email}) has been verified on ${new Date(
                  status.verified_at!
                ).toLocaleDateString()}`
              : `Your email (${status.email}) hasn't been verified yet. Please verify it to ensure you receive important account updates.`}
          </p>
          {!status.verified && (
            <Button
              onClick={handleSendVerification}
              isLoading={isSending}
              disabled={isSending || sent}
              variant="secondary"
              size="small"
            >
              {sent ? "Verification email sent!" : "Send Verification Email"}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default EmailVerification
