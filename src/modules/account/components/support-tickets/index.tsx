"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { SupportTicket } from "@lib/data/account-features"

interface SupportTicketSummaryProps {
  tickets: SupportTicket[]
}

const SupportTicketSummary = ({ tickets }: SupportTicketSummaryProps) => {
  if (!tickets || tickets.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Support Tickets</h3>
        <p className="text-sm text-gray-600 mb-4">No open support tickets</p>
        <LocalizedClientLink href="/account/support">
          <span className="text-sm font-medium text-blue-600 hover:text-blue-700">Contact Support</span>
        </LocalizedClientLink>
      </div>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return "🔴"
      case "pending":
        return "🟡"
      case "resolved":
        return "🟢"
      case "closed":
        return "⚪"
      default:
        return "⚪"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-red-50 border-red-200"
      case "pending":
        return "bg-yellow-50 border-yellow-200"
      case "resolved":
        return "bg-green-50 border-green-200"
      case "closed":
        return "bg-gray-50 border-gray-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 small:p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Support Tickets</h3>
        <LocalizedClientLink href="/account/support">
          <span className="text-xs font-medium text-blue-600 hover:text-blue-700">View All</span>
        </LocalizedClientLink>
      </div>

      <div className="space-y-3">
        {tickets.slice(0, 5).map((ticket) => (
          <div key={ticket.id} className={`rounded-lg p-4 border ${getStatusColor(ticket.status)} cursor-pointer hover:shadow-md transition-all`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span>{getStatusIcon(ticket.status)}</span>
                  <p className="font-semibold text-gray-900">{ticket.subject}</p>
                  <span className="text-xs font-medium text-gray-600 capitalize ml-auto">{ticket.status}</span>
                </div>
                <p className="text-xs text-gray-600">
                  Created {new Date(ticket.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SupportTicketSummary
