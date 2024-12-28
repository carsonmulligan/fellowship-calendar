"use client"

import { useState } from "react"
import { ActivityCalendar } from "@/components/activity-calendar"
import { fellowships } from "@/app/data/fellowships"
import { Card } from "@/components/ui/card"
import { format, parse, isValid } from "date-fns"

// Helper function to convert DD/MM/YYYY to Date object
function parseDate(dateStr: string) {
  try {
    // First try parsing as DD/MM/YYYY
    const date = parse(dateStr, "dd/MM/yyyy", new Date())
    if (isValid(date)) {
      return date
    }
    
    // If that fails, try parsing as MM/DD/YYYY
    const altDate = parse(dateStr, "MM/dd/yyyy", new Date())
    if (isValid(altDate)) {
      return altDate
    }
    
    console.error("Invalid date format:", dateStr)
    return new Date() // Fallback to current date
  } catch (error) {
    console.error("Error parsing date:", dateStr, error)
    return new Date() // Fallback to current date
  }
}

// Helper function to format date as MM/DD/YYYY
function formatDate(dateStr: string) {
  const date = parseDate(dateStr)
  return format(date, "MM/dd/yyyy")
}

export default function CalendarPage() {
  const currentYear = new Date().getFullYear()

  // Activities for the calendar with scholarship names
  const activities = fellowships.map(f => ({
    date: parseDate(f.due_date),
    count: 1,
    type: "deadline" as const,
    name: f.name
  }))

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Calendar View</h1>
      </div>

      <ActivityCalendar
        activities={activities}
        startYear={currentYear}
        numberOfYears={2}
      />

      <div className="grid gap-6 mt-8">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Upcoming Deadlines</h2>
          <div className="space-y-4">
            {fellowships
              .sort((a, b) => {
                const dateA = parseDate(a.due_date)
                const dateB = parseDate(b.due_date)
                return dateA.getTime() - dateB.getTime()
              })
              .filter(f => {
                const dueDate = parseDate(f.due_date)
                return dueDate >= new Date()
              })
              .map(fellowship => (
                <div 
                  key={fellowship.name} 
                  className="flex justify-between items-center hover:bg-muted/50 p-2 rounded-lg transition-colors"
                  title={`${fellowship.name}\nDue: ${formatDate(fellowship.due_date)}`}
                >
                  <div>
                    <h3 className="font-medium">{fellowship.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Due: {formatDate(fellowship.due_date)}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {Math.ceil(
                      (parseDate(fellowship.due_date).getTime() - 
                      new Date().getTime()) / (1000 * 60 * 60 * 24)
                    )} days left
                  </div>
                </div>
              ))}
          </div>
        </Card>
      </div>
    </div>
  )
} 