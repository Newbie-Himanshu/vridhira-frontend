"use client"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { NotificationItem } from "@lib/data/account-features"

interface NotificationPreviewProps {
  notifications: NotificationItem[]
}

const NotificationPreview = ({ notifications }: NotificationPreviewProps) => {
  if (!notifications || notifications.length === 0) return null

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "success":
        return "✓"
      case "warning":
        return "!"
      case "error":
        return "✕"
      default:
        return "•"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200 text-green-700"
      case "warning":
        return "bg-yellow-50 border-yellow-200 text-yellow-700"
      case "error":
        return "bg-red-50 border-red-200 text-red-700"
      default:
        return "bg-blue-50 border-blue-200 text-blue-700"
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 small:p-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
        <LocalizedClientLink href="/account/notifications" className="text-xs font-medium text-blue-600 hover:text-blue-700">
          View All
        </LocalizedClientLink>
      </div>

      <div className="space-y-3">
        {notifications.slice(0, 3).map((notif) => (
          <div key={notif.id} className={`rounded-lg p-4 border ${getTypeColor(notif.type)}`}>
            <div className="flex items-start gap-3">
              <span className="text-lg">{getTypeIcon(notif.type)}</span>
              <div className="flex-1">
                <p className="font-semibold text-gray-900 text-sm">{notif.title}</p>
                <p className="text-xs text-gray-600 mt-1">{notif.message}</p>
                <p className="text-xs text-gray-500 mt-2">{new Date(notif.timestamp).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NotificationPreview
