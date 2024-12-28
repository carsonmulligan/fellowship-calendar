"use client"

import { useTheme } from "next-themes"
import { Card } from "./ui/card"
import { addYears, eachDayOfInterval, format, isSameDay, subYears } from "date-fns"

interface Activity {
  date: Date
  count: number
  type: "deadline" | "action"
  name?: string
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

  // Get activities for a date
  const getActivitiesForDate = (date: Date) => {
    return activities.filter(activity => 
      isSameDay(new Date(activity.date), date)
    )
  }

  // Get activity level for a date (0-4)
  const getActivityLevel = (activities: Activity[]) => {
    if (activities.length === 0) return 0
    
    const hasDeadline = activities.some(a => a.type === "deadline")
    if (hasDeadline) return 4 // Highest level for deadlines
    
    const actionCount = activities.filter(a => a.type === "action").length
    if (actionCount > 5) return 3
    if (actionCount > 3) return 2
    return 1
  }

  // Get tooltip text for a date
  const getTooltipText = (date: Date, activities: Activity[]) => {
    if (activities.length === 0) {
      return format(date, "MMM d, yyyy")
    }

    const deadlines = activities.filter(a => a.type === "deadline")
    if (deadlines.length > 0) {
      const scholarshipNames = deadlines.map(d => d.name).filter(Boolean).join(", ")
      return `${format(date, "MMM d, yyyy")}\nDue: ${scholarshipNames}`
    }

    return `${format(date, "MMM d, yyyy")}\n${activities.length} activities`
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
            const dayActivities = getActivitiesForDate(date)
            const level = getActivityLevel(dayActivities)
            return (
              <div
                key={date.toISOString()}
                className={`w-3 h-3 rounded-sm ${getColor(level)} hover:ring-2 hover:ring-offset-2 hover:ring-zinc-400 transition-all cursor-help`}
                title={getTooltipText(date, dayActivities)}
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