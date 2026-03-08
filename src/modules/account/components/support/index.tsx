"use client"

import { useState } from "react"
import { submitFaqQuery } from "@lib/data/account-features"
import { Button } from "@medusajs/ui"
import { HttpTypes } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

interface SupportProps {
  customer: HttpTypes.StoreCustomer | null
}

const Support = ({ customer }: SupportProps) => {
  const [subject, setSubject] = useState("")
  const [question, setQuestion] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!subject.trim() || !question.trim() || !customer) return

    setIsSubmitting(true)
    const result = await submitFaqQuery(
      subject,
      question,
      customer.email!,
      customer.first_name || "Customer"
    )
    setIsSubmitting(false)

    if (result) {
      setSubmitted(true)
      setSubject("")
      setQuestion("")
      setTimeout(() => setSubmitted(false), 5000)
    }
  }

  return (
    <div className="max-w-2xl">
      <div className="bg-white rounded-lg border border-gray-200 p-6 small:p-8">
        <div className="mb-6 flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Customer Support</h2>
            <p className="text-sm text-gray-600">
              Have a question or need help? Submit a support inquiry below and our team will get
              back to you shortly.
            </p>
          </div>
          <LocalizedClientLink href="/account/support" passHref>
            <Button variant="secondary" size="small">
              Browse Help Center
            </Button>
          </LocalizedClientLink>
        </div>

        {submitted && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm font-medium text-green-700">
              ✓ Your support inquiry has been submitted successfully. We'll review it and get back
              to you soon.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="What is this about?"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Please provide details about your question or issue..."
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none"
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={customer?.email || ""}
              disabled
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              isLoading={isSubmitting}
              disabled={isSubmitting || !subject.trim() || !question.trim()}
            >
              Submit Inquiry
            </Button>
          </div>

          <p className="text-xs text-gray-500 pt-2">
            You can submit up to 5 inquiries per hour. Our support team typically responds within
            24-48 hours.
          </p>
        </form>
      </div>

      {/* FAQ Section */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
        <div className="space-y-3">
          <details className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors group">
            <summary className="font-medium text-gray-900 flex items-center justify-between">
              <span>How long does delivery take?</span>
              <span className="group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-3 text-sm text-gray-600">
              Delivery times vary by location but typically range from 3-7 business days for
              standard delivery. Express delivery can reach you in 1-2 days in select cities.
            </p>
          </details>

          <details className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors group">
            <summary className="font-medium text-gray-900 flex items-center justify-between">
              <span>Can I cancel or modify my order?</span>
              <span className="group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-3 text-sm text-gray-600">
              You can cancel orders within 1 hour of placement. For modifications, please cancel
              the order and place a new one. Once shipped, orders cannot be modified or cancelled.
            </p>
          </details>

          <details className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors group">
            <summary className="font-medium text-gray-900 flex items-center justify-between">
              <span>What is your return policy?</span>
              <span className="group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-3 text-sm text-gray-600">
              We offer hassle-free returns within 14 days of delivery. Items must be unused and in
              original packaging. Return shipping is free for defective items.
            </p>
          </details>

          <details className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors group">
            <summary className="font-medium text-gray-900 flex items-center justify-between">
              <span>Is my payment information secure?</span>
              <span className="group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <p className="mt-3 text-sm text-gray-600">
              Yes, all payments are processed securely through industry-standard encryption.
              Payment details are not stored on our servers during transactions.
            </p>
          </details>
        </div>
      </div>
    </div>
  )
}

export default Support
