'use client'

import posthog from 'posthog-js'
import { PostHogProvider as CSPostHogProvider } from 'posthog-js/react'
import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
        capture_pageview: false, // Disable automatic pageview capture, as we capture manually in Next.js
        disable_session_recording: true, // CRITICAL: Disables screen recording which causes massive lag with your Matrix animations
        autocapture: false, // Disables automatic click tracking to save main thread performance
        capture_performance: false // Disables performance monitoring that hooks into paint events
      })
    }
  }, [])

  return (
    <CSPostHogProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
    </CSPostHogProvider>
  )
}

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname && !pathname.startsWith('/auth/') && typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      let url = window.origin + pathname;
      // Do not send OAuth codes, search terms or tokens to analytics.
      posthog.capture('$pageview', {
        $current_url: url,
      });
    }
  }, [pathname, searchParams]);

  return null;
}
