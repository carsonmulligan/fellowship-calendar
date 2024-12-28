"use client"

import { Button } from "@/components/ui/button"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import Image from "next/image"
import { useToast } from "@/components/ui/use-toast"

export function SignInButton() {
  const supabase = createClientComponentClient()
  const { toast } = useToast()

  const handleSignIn = async () => {
    try {
      const redirectTo = `${window.location.origin}/auth/callback`
      
      console.log('Starting OAuth flow:', {
        redirectTo,
        currentUrl: window.location.href
      })

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
          scopes: 'email profile',
        }
      })

      if (error) {
        console.error('OAuth Error:', error)
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        })
      } else {
        console.log('OAuth Started:', {
          provider: 'google',
          url: data?.url?.substring(0, 50) + '...'
        })
        // The user will be redirected to Google's login page
      }
    } catch (error) {
      console.error('Sign In Error:', error)
      toast({
        title: "Error",
        description: "Failed to start sign in process",
        variant: "destructive",
      })
    }
  }

  return (
    <Button 
      onClick={handleSignIn}
      variant="outline"
      className="flex items-center gap-2"
    >
      <Image
        src="/images/google.svg"
        alt="Google"
        width={20}
        height={20}
      />
      Sign in with Google
    </Button>
  )
} 