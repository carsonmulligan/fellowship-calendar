"use client"

import { useTheme } from "next-themes"
import { Card } from "@/components/ui/card"
import { addYears, eachDayOfInterval, format, isSameDay, subYears } from "date-fns"

interface Activity {
  date: Date
  count: number
  type: "deadline" | "action" // deadline for fellowship deadlines, action for user activities
}

interface ActivityCalendarProps {
  activities: Activity[]
  startYear?: number
  numberOfYears?: number
}

export function ActivityCalendar({
  activities,
  startYear = new Date().getFullYear(),
  numberOfYears = 4,
}: ActivityCalendarProps) {
  const { theme } = useTheme()

  // Generate dates for the calendar
  const startDate = new Date(startYear, 0, 1)
  const endDate = addYears(startDate, numberOfYears)
  const dates = eachDayOfInterval({ start: startDate, end: endDate })

  // Get activity level for a date (0-4)
  const getActivityLevel = (date: Date) => {
    const dayActivities = activities.filter(activity => 
      isSameDay(new Date(activity.date), date)
    )
    
    if (dayActivities.length === 0) return 0
    
    const hasDeadline = dayActivities.some(a => a.type === "deadline")
    if (hasDeadline) return 4 // Highest level for deadlines
    
    const actionCount = dayActivities.filter(a => a.type === "action").length
    if (actionCount > 5) return 3
    if (actionCount > 3) return 2
    return 1
  }

  // Get color based on activity level and theme
  const getColor = (level: number) => {
    if (theme === "dark") {
      switch (level) {
        case 1: return "bg-emerald-900"
        case 2: return "bg-emerald-700"
        case 3: return "bg-emerald-500"
        case 4: return "bg-emerald-300"
        default: return "bg-zinc-800"
      }
    }
    
    switch (level) {
      case 1: return "bg-emerald-200"
      case 2: return "bg-emerald-300"
      case 3: return "bg-emerald-400"
      case 4: return "bg-emerald-500"
      default: return "bg-zinc-100"
    }
  }

  return (
    <Card className="p-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Activity Calendar</h3>
        <div className="flex flex-wrap gap-1">
          {dates.map((date) => {
            const level = getActivityLevel(date)
            return (
              <div
                key={date.toISOString()}
                className={`w-3 h-3 rounded-sm ${getColor(level)} hover:ring-2 hover:ring-offset-2 hover:ring-zinc-400 transition-all`}
                title={`${format(date, "MMM d, yyyy")}: ${level} activities`}
              />
            )
          })}
        </div>
        <div className="flex items-center justify-end gap-2 mt-4 text-sm text-zinc-500">
          <span>Less</span>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`w-3 h-3 rounded-sm ${getColor(level)}`}
              />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
    </Card>
  )
} 