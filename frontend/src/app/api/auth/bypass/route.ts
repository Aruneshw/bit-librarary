import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (username === 'admin' && password === '12345') {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        {
          auth: {
            autoRefreshToken: false,
            persistSession: false,
          },
        }
      );

      const origin = new URL(request.url).origin;
      const targetEmail = 'admin@bitsathy.ac.in';

      // 1. Auto-create/ensure the admin@bitsathy.ac.in user exists in Supabase Auth
      try {
        await supabase.auth.admin.createUser({
          email: targetEmail,
          password: '12345',
          email_confirm: true,
          user_metadata: {
            full_name: 'Main Admin',
          },
        });
      } catch (e) {
        // User might already exist, which is fine and expected after first run.
        console.log('User admin@bitsathy.ac.in already exists or could not be created:', e);
      }

      // 2. Generate verification magic link for admin@bitsathy.ac.in
      const { data, error } = await supabase.auth.admin.generateLink({
        type: 'magiclink',
        email: targetEmail,
        options: {
          redirectTo: `${origin}/auth/callback?next=/dashboard`,
        },
      });

      if (error) {
        console.error('Failed to generate admin bypass magic link:', error);
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      if (data?.properties?.action_link) {
        return NextResponse.json({
          success: true,
          actionLink: data.properties.action_link,
        });
      }
    }

    return NextResponse.json({ error: 'Invalid operator credentials.' }, { status: 401 });
  } catch (error: any) {
    console.error('Bypass login error:', error);
    return NextResponse.json({ error: error?.message || 'Server error.' }, { status: 500 });
  }
}
