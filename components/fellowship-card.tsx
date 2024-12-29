"use client"

import { useState, useEffect } from "react"
import { Bookmark, BookmarkCheck } from "lucide-react"
import Link from "next/link"
import { format, parse, isValid } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useSupabase } from "@/components/providers/supabase-provider"
import { useToast } from "@/components/ui/use-toast"

interface FellowshipCardProps {
  fellowship: {
    id: string
    name: string
    description: string
    deadline: string // DD/MM/YYYY format
    url: string
  }
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

export function FellowshipCard({ fellowship }: FellowshipCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { supabase, user } = useSupabase()
  const { toast } = useToast()

  useEffect(() => {
    async function checkBookmarkStatus() {
      try {
        if (user) {
          const { data: bookmarks } = await supabase
            .from('bookmarks')
            .select('id')
            .eq('fellowship_id', fellowship.id)
            .eq('user_id', user.id)
            .single()
          
          setIsBookmarked(!!bookmarks)
        }
      } catch (error) {
        console.error('Error checking bookmark status:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkBookmarkStatus()
  }, [fellowship.id, supabase, user])

  const handleBookmark = async () => {
    try {
      if (!user) {
        toast({
          title: 'Authentication required',
          description: 'Please sign in to bookmark fellowships',
          variant: 'destructive',
        })
        return
      }

      if (isBookmarked) {
        // Remove bookmark
        await supabase
          .from('bookmarks')
          .delete()
          .eq('fellowship_id', fellowship.id)
          .eq('user_id', user.id)
        
        setIsBookmarked(false)
        toast({
          title: 'Bookmark removed',
          description: 'Fellowship has been removed from your bookmarks',
        })
      } else {
        // Add bookmark
        await supabase
          .from('bookmarks')
          .insert({
            fellowship_id: fellowship.id,
            user_id: user.id,
            status: 'interested'
          })
        
        setIsBookmarked(true)
        toast({
          title: 'Fellowship bookmarked',
          description: 'Fellowship has been added to your bookmarks',
        })
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error)
      toast({
        title: 'Error',
        description: 'Failed to update bookmark. Please try again.',
        variant: 'destructive',
      })
    }
  }

  return (
    <Card
      className={cn(
        "relative transition-shadow hover:shadow-lg",
        isHovered && "ring-2 ring-primary/10"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid="fellowship-card"
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl">
              <Link 
                href={`/fellowships/${fellowship.id}`} 
                className="hover:underline"
                data-testid="fellowship-title"
              >
                {fellowship.name}
              </Link>
            </CardTitle>
            <CardDescription data-testid="fellowship-deadline">
              Due: {formatDate(fellowship.deadline)}
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "transition-colors",
              isBookmarked ? "text-yellow-500" : "text-gray-400"
            )}
            onClick={handleBookmark}
            disabled={isLoading}
            data-testid="bookmark-button"
          >
            {isBookmarked ? (
              <BookmarkCheck className="h-5 w-5" />
            ) : (
              <Bookmark className="h-5 w-5" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p 
          className="mb-4 line-clamp-2 text-sm text-muted-foreground"
          data-testid="fellowship-description"
        >
          {fellowship.description}
        </p>
        <div className="flex items-center space-x-2">
          <Link
            href={fellowship.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline"
            data-testid="fellowship-link"
          >
            Learn More →
          </Link>
        </div>
      </CardContent>
    </Card>
  )
} 