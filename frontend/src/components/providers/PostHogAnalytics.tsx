'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

type PostHogClient = typeof import('posthog-js').default

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'

let clientPromise: Promise<PostHogClient> | null = null

// posthog-js is ~187 KB of the initial bundle on every page, and nothing in the
// app reads its React context — it only ever sends pageviews. Load it after the
// first paint so analytics never compete with the page for the main thread.
function loadPostHog(): Promise<PostHogClient> | null {
  if (!KEY || typeof window === 'undefined') return null
  if (!clientPromise) {
    clientPromise = import('posthog-js').then((module) => {
      const posthog = module.default
      posthog.init(KEY, {
        api_host: HOST,
        capture_pageview: false, // Pageviews are sent manually below.
        disable_session_recording: true,
        autocapture: false,
        capture_performance: false,
      })
      return posthog
    })
  }
  return clientPromise
}

function afterFirstPaint(task: () => void) {
  const idle = (window as Window & {
    requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
  }).requestIdleCallback
  if (idle) idle(task, { timeout: 3000 })
  else setTimeout(task, 1200)
}

export function PostHogAnalytics() {
  const pathname = usePathname()

  useEffect(() => {
    // Never send OAuth codes, search terms or tokens to analytics.
    if (!pathname || pathname.startsWith('/auth/')) return
    const pending = loadPostHog()
    if (!pending) return
    let cancelled = false
    afterFirstPaint(() => {
      void pending
        .then((posthog) => {
          if (!cancelled) posthog.capture('$pageview', { $current_url: window.origin + pathname })
        })
        .catch(() => {})
    })
    return () => {
      cancelled = true
    }
  }, [pathname])

  return null
}
