"use client"

import { useState } from "react"
import { ActivityCalendar } from "@/components/activity-calendar"
import { fellowships } from "@/app/data/fellowships"
import { Card } from "@/components/ui/card"

export default function CalendarPage() {
  const currentYear = new Date().getFullYear()

  // Activities for the calendar with scholarship names
  const activities = fellowships.map(f => ({
    date: new Date(f.due_date.split("/").reverse().join("-")),
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
                const dateA = new Date(a.due_date.split("/").reverse().join("-"))
                const dateB = new Date(b.due_date.split("/").reverse().join("-"))
                return dateA.getTime() - dateB.getTime()
              })
              .filter(f => {
                const dueDate = new Date(f.due_date.split("/").reverse().join("-"))
                return dueDate >= new Date()
              })
              .map(fellowship => (
                <div key={fellowship.name} className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{fellowship.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Due: {fellowship.due_date}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {Math.ceil(
                      (new Date(fellowship.due_date.split("/").reverse().join("-")).getTime() - 
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