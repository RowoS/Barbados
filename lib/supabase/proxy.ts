import { createServerClient } from '@supabase/ssr'
import { NextRequest, NextResponse } from 'next/server'

const PROTECTED_ROUTES = [
  '/vendor',
  '/customer',
  '/order',
]

const AUTH_ONLY_ROUTES = [
  '/login',
  '/forgot-password',
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
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  const isProtectedRoute = PROTECTED_ROUTES.some((route) => pathname.startsWith(route))
  const isAuthOnlyRoute = AUTH_ONLY_ROUTES.some((route) => pathname.startsWith(route))
  const isRoleSelectionRoute = pathname.startsWith(ROLE_SELECTION_ROUTE)

  // 1. No user trying to access protected route → login
  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // 2. No user trying to access role-select → login
  if (!user && isRoleSelectionRoute) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
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
    const roleDashboard = profile?.role === 'vendor' ? '/vendor/dashboard' : '/customer/dashboard'

    // 3. User has no role and isn't on role-select → send to role-select
    if (hasNoRole && !isRoleSelectionRoute) {
      const url = request.nextUrl.clone()
      url.pathname = ROLE_SELECTION_ROUTE
      return NextResponse.redirect(url)
    }

    // 4. User has a role and tries to access role-select → send to dashboard
    if (!hasNoRole && isRoleSelectionRoute) {
      const url = request.nextUrl.clone()
      url.pathname = roleDashboard
      return NextResponse.redirect(url)
    }

    // 5. User has a role and tries to access login/forgot-password → send to dashboard
    if (!hasNoRole && isAuthOnlyRoute) {
      const url = request.nextUrl.clone()
      url.pathname = roleDashboard
      return NextResponse.redirect(url)
    }

    // 6. Vendor trying to access /customer or vice versa → send to their dashboard
    if (profile?.role === 'vendor' && pathname.startsWith('/customer')) {
      const url = request.nextUrl.clone()
      url.pathname = '/vendor'
      return NextResponse.redirect(url)
    }

    if (profile?.role === 'customer' && pathname.startsWith('/vendor/')) {
      const url = request.nextUrl.clone()
      url.pathname = '/customer'
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}