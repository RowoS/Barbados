// features/auth/application/handleOAuthCallback.ts
import { createClient } from '@/lib/supabase/server'
import type { OAuthCallbackResult } from '../types/index'

export async function handleOAuthCallback(request: Request): Promise<OAuthCallbackResult> {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const next = url.searchParams.get('next') ?? '/tasks'
  const origin = url.origin

  if (!code) {
    return {
      type: 'error',
      fallback: `${origin}/(auth)/error`,
    }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    return {
      type: 'error',
      fallback: `${origin}/(auth)/error`,
    }
  }

  const forwardedHost = request.headers.get('x-forwarded-host')
  const isLocal = process.env.NODE_ENV === 'development'

  const redirectBase =
    isLocal || !forwardedHost
      ? origin
      : `https://${forwardedHost}`

  return {
    type: 'redirect',
    url: `${redirectBase}${next}`,
  }
}
