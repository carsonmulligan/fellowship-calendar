"use client"

import { useState } from "react"
import { FellowshipCard } from "@/components/fellowship-card"
import { fellowships } from "@/app/data/fellowships"

export default function BookmarkedPage() {
  const [bookmarkedFellowships, setBookmarkedFellowships] = useState(
    fellowships.filter(f => f.isBookmarked)
  )

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Bookmarked Fellowships</h1>
      </div>

      {bookmarkedFellowships.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>No bookmarked fellowships yet.</p>
          <p className="text-sm mt-2">
            Browse fellowships and click the bookmark icon to save them here.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {bookmarkedFellowships.map((fellowship) => (
            <FellowshipCard
              key={fellowship.name}
              fellowship={{
                id: fellowship.name,
                name: fellowship.name,
                description: fellowship.description,
                deadline: fellowship.due_date,
                url: fellowship.url,
                isBookmarked: true,
                tags: []
              }}
              onBookmark={(id: string) => {
                setBookmarkedFellowships(prev => 
                  prev.filter(f => f.name !== id)
                )
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
} 