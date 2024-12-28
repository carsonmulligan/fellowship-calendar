"use client"

import { useState } from "react"
import { Bookmark, BookmarkCheck, Tag } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import Link from "next/link"
import { format, parse, isValid } from "date-fns"

interface Tag {
  id: string
  name: string
  color: string
}

interface FellowshipCardProps {
  fellowship: {
    id: string
    name: string
    description: string
    deadline: string // DD/MM/YYYY format
    url: string
    isBookmarked?: boolean
    tags?: Tag[]
  }
  onBookmark?: (id: string) => void
  onAddTag?: (id: string, tag: Tag) => void
  onRemoveTag?: (id: string, tagId: string) => void
}

// Helper function to convert DD/MM/YYYY to MM/DD/YYYY
function formatDate(dateStr: string) {
  try {
    // First try parsing as DD/MM/YYYY
    const date = parse(dateStr, "dd/MM/yyyy", new Date())
    if (isValid(date)) {
      return format(date, "MM/dd/yyyy")
    }
    
    // If that fails, try parsing as MM/DD/YYYY
    const altDate = parse(dateStr, "MM/dd/yyyy", new Date())
    if (isValid(altDate)) {
      return dateStr // Already in correct format
    }
    
    return "Invalid date"
  } catch (error) {
    console.error("Error parsing date:", dateStr, error)
    return "Invalid date"
  }
}

export function FellowshipCard({
  fellowship,
  onBookmark,
  onAddTag,
  onRemoveTag,
}: FellowshipCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className="relative hover:shadow-lg transition-shadow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-xl">
              <Link href={`/fellowships/${fellowship.id}`} className="hover:underline">
                {fellowship.name}
              </Link>
            </CardTitle>
            <CardDescription>
              Due: {formatDate(fellowship.deadline)}
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={fellowship.isBookmarked ? "text-yellow-500" : "text-gray-400"}
            onClick={() => onBookmark?.(fellowship.id)}
          >
            {fellowship.isBookmarked ? (
              <BookmarkCheck className="h-5 w-5" />
            ) : (
              <Bookmark className="h-5 w-5" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {fellowship.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {fellowship.tags?.map((tag) => (
            <Badge
              key={tag.id}
              variant="secondary"
              className="cursor-pointer hover:bg-secondary/80"
              style={{ backgroundColor: tag.color + "20", color: tag.color }}
            >
              <Tag className="w-3 h-3 mr-1" />
              {tag.name}
            </Badge>
          ))}
          {isHovered && (
            <Button
              variant="outline"
              size="sm"
              className="h-6"
              onClick={() => {
                // Open tag selection dialog
              }}
            >
              <Tag className="w-3 h-3 mr-1" />
              Add Tag
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 