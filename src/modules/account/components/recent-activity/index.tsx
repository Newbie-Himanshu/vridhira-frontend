"use client"

import { ActivityEvent } from "@lib/data/account-features"

interface RecentActivityProps {
  events: ActivityEvent[]
}

const RecentActivity = ({ events }: RecentActivityProps) => {
  if (!events || events.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <p className="text-sm text-gray-600 text-center py-6">No recent activity</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 small:p-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>

      <div className="space-y-4">
        {events.map((event, index) => (
          <div key={event.id} className="flex gap-4">
            {/* Timeline dot and line */}
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 bg-blue-600 rounded-full mt-1.5"></div>
              {index !== events.length - 1 && (
                <div className="w-0.5 h-12 bg-gray-300 mt-2"></div>
              )}
            </div>

            {/* Event content */}
            <div className="pb-4 flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-gray-900">
                    <span className="text-lg mr-2">{event.icon}</span>
                    {event.title}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                  {new Date(event.timestamp).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentActivity
