import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import HubApp from '@/components/hub/HubApp';
import { createSupabaseServerClient } from '@/lib/supabaseServer';
import { demoAllowed } from '@/lib/auth/redirect';
export const metadata: Metadata = { title: 'BIT HUB — Connect. Collaborate. Build.', description: 'Find student teammates, join hackathon discussion bubbles, showcase projects and build together.' };
export const dynamic = 'force-dynamic';
export default async function HubPage({ searchParams }: { searchParams: Promise<{ demo?: string }> }) {
  const params = await searchParams;
  const isDemo = params.demo === '1' && demoAllowed(process.env.NODE_ENV, process.env.NEXT_PUBLIC_HUB_DEMO_ENABLED);
  if (!isDemo) {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/login?next=/hub');
  }
  return <HubApp />;
}
