import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')
    const origin = requestUrl.origin
    
    console.log('Auth Callback:', {
      url: request.url,
      origin,
      code: code?.substring(0, 6) + '...',
      headers: Object.fromEntries(request.headers),
    })

    if (code) {
      const cookieStore = cookies()
      const supabase = createRouteHandlerClient({ cookies: () => cookieStore })
      
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (error) {
        console.error('Auth Error:', error)
        return NextResponse.redirect(`${origin}/error?message=${error.message}`)
      }

      console.log('Auth Success:', {
        user: data.user?.email,
        session: data.session?.access_token?.substring(0, 6) + '...'
      })

      // Redirect to the main dashboard after successful sign in
      return NextResponse.redirect(`${origin}/`)
    }

    return NextResponse.redirect(`${origin}/error?message=No auth code provided`)
  } catch (error) {
    console.error('Callback Error:', error)
    return NextResponse.redirect(`${origin}/error?message=Internal server error`)
  }
}
