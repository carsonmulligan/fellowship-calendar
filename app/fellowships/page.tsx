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
import { format, parse, isValid } from "date-fns"
import { useBookmarks } from "@/app/hooks/use-bookmarks"

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

export default function FellowshipsPage() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const { bookmarks, toggleBookmark, isBookmarked, loading } = useBookmarks()
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 4 }, (_, i) => currentYear + i)

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
        {fellowships
          .sort((a, b) => {
            const dateA = parseDate(a.due_date)
            const dateB = parseDate(b.due_date)
            return dateA.getTime() - dateB.getTime()
          })
          .map((fellowship) => (
            <FellowshipCard
              key={fellowship.name}
              fellowship={{
                id: fellowship.name,
                name: fellowship.name,
                description: fellowship.description,
                deadline: fellowship.due_date,
                url: fellowship.url,
                isBookmarked: isBookmarked(fellowship.name),
                tags: []
              }}
              onBookmark={() => toggleBookmark(fellowship.name)}
            />
          ))}
      </div>
    </div>
  )
} 