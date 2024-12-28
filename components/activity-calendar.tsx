"use client"

import { useTheme } from "next-themes"
import { Card } from "./ui/card"
import { addYears, eachDayOfInterval, format, isSameDay, isValid } from "date-fns"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"

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
    return activities.filter(activity => {
      if (!isValid(activity.date)) return false
      return isSameDay(activity.date, date)
    })
  }

  // Get activity level for a date (0-4)
  const getActivityLevel = (activities: Activity[]) => {
    const deadlines = activities.filter(a => a.type === "deadline")
    if (deadlines.length === 0) return 0
    if (deadlines.length >= 4) return 4
    return deadlines.length
  }

  // Get tooltip text for a date
  const getTooltipText = (date: Date, activities: Activity[]) => {
    const formattedDate = format(date, "MM/dd/yyyy")
    
    if (activities.length === 0) {
      return (
        <div className="text-sm">
          <div className="font-semibold">{formattedDate}</div>
          <div className="text-muted-foreground">No deadlines</div>
        </div>
      )
    }

    const deadlines = activities.filter(a => a.type === "deadline")
    if (deadlines.length > 0) {
      return (
        <div className="text-sm space-y-1.5">
          <div className="font-semibold border-b pb-1.5">{formattedDate}</div>
          <div className="font-medium">Due:</div>
          <div className="space-y-1">
            {deadlines
              .map(d => d.name)
              .filter(Boolean)
              .map((name, index) => (
                <div key={index} className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>{name}</span>
                </div>
              ))}
          </div>
        </div>
      )
    }

    return (
      <div className="text-sm">
        <div className="font-semibold">{formattedDate}</div>
      </div>
    )
  }

  // Get color based on activity level and theme
  const getColor = (level: number) => {
    if (theme === "dark") {
      switch (level) {
        case 1: return "bg-emerald-800"
        case 2: return "bg-emerald-600"
        case 3: return "bg-emerald-400"
        case 4: return "bg-emerald-300"
        default: return "bg-zinc-800"
      }
    }
    
    switch (level) {
      case 1: return "bg-emerald-300"
      case 2: return "bg-emerald-400"
      case 3: return "bg-emerald-500"
      case 4: return "bg-emerald-600"
      default: return "bg-zinc-100"
    }
  }

  return (
    <Card className="p-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Activity Calendar</h3>
        <div className="flex flex-wrap gap-1">
          <TooltipProvider>
            {dates.map((date) => {
              const dayActivities = getActivitiesForDate(date)
              const level = getActivityLevel(dayActivities)
              return (
                <Tooltip key={date.toISOString()} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <div
                      className={`w-3 h-3 rounded-sm ${getColor(level)} hover:ring-2 hover:ring-offset-2 hover:ring-zinc-400 transition-all`}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    {getTooltipText(date, dayActivities)}
                  </TooltipContent>
                </Tooltip>
              )
            })}
          </TooltipProvider>
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