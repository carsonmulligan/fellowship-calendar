"use client"

import { useState } from "react"
import { FellowshipCard } from "@/components/fellowship-card"
import { ActivityCalendar } from "@/components/activity-calendar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { fellowships } from "@/app/data/fellowships"

export default function FellowshipsPage() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 4 }, (_, i) => currentYear + i)

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
        <h1 className="text-3xl font-bold">Fellowships</h1>
        <Select
          value={selectedYear.toString()}
          onValueChange={(value) => setSelectedYear(parseInt(value))}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}/{year + 1} Academic Year
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <ActivityCalendar
        activities={activities}
        startYear={selectedYear}
        numberOfYears={1}
      />

      <div className="grid gap-6">
        {fellowships.map((fellowship) => (
          <FellowshipCard
            key={fellowship.name}
            fellowship={{
              id: fellowship.name,
              name: fellowship.name,
              description: fellowship.description,
              deadline: fellowship.due_date,
              url: fellowship.url,
              isBookmarked: false,
              tags: []
            }}
            onBookmark={(id: string) => {
              // Handle bookmark
              console.log("Bookmark", id)
            }}
          />
        ))}
      </div>
    </div>
  )
} 