import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function middleware(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.next()
  }
  
  const supabase = createClient(supabaseUrl, supabaseAnonKey)

  // Get session token from cookies
  const sessionToken = request.cookies.get('session_token')?.value

  // Protected therapist routes
  if (request.nextUrl.pathname.startsWith('/therapist')) {
    if (!sessionToken) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    
    // Validate session and check if user is therapist
    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('username', sessionToken) // Using sessionToken as username for simplicity
      .single()
    
    if (!userData || userData.role !== 'therapist') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Protected patient routes
  if (request.nextUrl.pathname.startsWith('/pacient')) {
    if (!sessionToken) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    
    // Validate session and check if user is patient
    const { data: patientData } = await supabase
      .from('users')
      .select('role')
      .eq('username', sessionToken) // Using sessionToken as username for simplicity
      .single()
    
    if (!patientData || patientData.role !== 'patient') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Redirect authenticated users from login/register
  if ((request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register') && sessionToken) {
    const { data: userRoleData } = await supabase
      .from('users')
      .select('role')
      .eq('username', sessionToken)
      .single()
    
    if (userRoleData) {
      if (userRoleData.role === 'therapist') {
        return NextResponse.redirect(new URL('/therapist', request.url))
      } else if (userRoleData.role === 'patient') {
        return NextResponse.redirect(new URL('/pacient', request.url))
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/therapist/:path*', '/pacient/:path*', '/login', '/register']
}
