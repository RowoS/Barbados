import { createServerClient } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_ROUTES = [
  '/login',
  '/forgot-password',
  '/error',
  '/sign-up',
  '/'
]

const AUTH_ONLY_ROUTES = [
  '/login',
  '/forgot-password',
  '/sign-up',
  '/',
]

const ROLE_SELECTION_ROUTE = '/sign-up/role-select'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  
  const pathname = request.nextUrl.pathname
  const isPublicRoute = PUBLIC_ROUTES.some((route) =>
    pathname.startsWith(route)
  )
  const isAuthOnlyRoute = AUTH_ONLY_ROUTES.some((route) =>
    pathname === route
  )


  const isRoleSelectionRoute = pathname.startsWith(ROLE_SELECTION_ROUTE)

  if (!user && (!isPublicRoute || isRoleSelectionRoute)) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }


  if (user && isAuthOnlyRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  if (user) {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (error) {
      console.error('Profile fetch failed:', error)
      const url = request.nextUrl.clone()
      url.pathname = '/error'
      return NextResponse.redirect(url)
    }

    const hasNoRole = !profile?.role || profile.role === 'new'

    if (hasNoRole && !isRoleSelectionRoute) {
      const url = request.nextUrl.clone()
      url.pathname = ROLE_SELECTION_ROUTE
      return NextResponse.redirect(url)
    }

    if (!hasNoRole && isRoleSelectionRoute) {
      const url = request.nextUrl.clone()
      url.pathname = '/dashboard'
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}