import { notFound, redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabaseServer';
import { isAdminEmail } from '@/lib/adminEmails';
import HubReview from '@/components/hub/HubReview';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Project review — BIT HUB' };
export default async function ReviewPage() {
  const client = await createSupabaseServerClient();
  const { data: { user } } = await client.auth.getUser();
  if (!user) redirect('/login?next=/hub/review');
  if (!user.email_confirmed_at || !(isAdminEmail(user.email) || user.app_metadata.role === 'admin')) notFound();
  return <HubReview />;
}
