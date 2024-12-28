import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useToast } from "@/components/ui/use-toast"
import { SignInButton } from '@/components/auth/sign-in-button'

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()
  const { toast } = useToast()

  // Fetch user's bookmarks
  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const { data, error } = await supabase
          .from('bookmarks')
          .select('fellowship_name')
          .eq('user_id', user.id)

        if (error) throw error

        setBookmarks(data.map(b => b.fellowship_name))
      } catch (error) {
        console.error('Error fetching bookmarks:', error)
        toast({
          title: "Error",
          description: "Failed to fetch bookmarks",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchBookmarks()
  }, [supabase, toast])

  // Toggle bookmark
  const toggleBookmark = async (fellowshipName: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        toast({
          title: "Sign in required",
          description: "Please sign in to bookmark fellowships",
          action: <SignInButton />,
          variant: "destructive",
        })
        return
      }

      if (bookmarks.includes(fellowshipName)) {
        // Remove bookmark
        const { error } = await supabase
          .from('bookmarks')
          .delete()
          .eq('user_id', user.id)
          .eq('fellowship_name', fellowshipName)

        if (error) throw error

        setBookmarks(prev => prev.filter(b => b !== fellowshipName))
        toast({
          title: "Success",
          description: "Fellowship removed from bookmarks",
        })
      } else {
        // Add bookmark
        const { error } = await supabase
          .from('bookmarks')
          .insert([
            { user_id: user.id, fellowship_name: fellowshipName }
          ])

        if (error) throw error

        setBookmarks(prev => [...prev, fellowshipName])
        toast({
          title: "Success",
          description: "Fellowship added to bookmarks",
        })
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error)
      toast({
        title: "Error",
        description: "Failed to update bookmark",
        variant: "destructive",
      })
    }
  }

  return {
    bookmarks,
    loading,
    toggleBookmark,
    isBookmarked: (fellowshipName: string) => bookmarks.includes(fellowshipName)
  }
} 