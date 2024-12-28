"use client"

import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SignInButton } from "@/components/auth/sign-in-button"

export default function ErrorPage() {
  const searchParams = useSearchParams()
  const message = searchParams.get('message') || 'An error occurred'

  return (
    <div className="container mx-auto max-w-2xl py-12">
      <Card>
        <CardHeader>
          <CardTitle>Authentication Error</CardTitle>
          <CardDescription>
            {message}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <p>Please try signing in again:</p>
          <SignInButton />
        </CardContent>
      </Card>
    </div>
  )
} 