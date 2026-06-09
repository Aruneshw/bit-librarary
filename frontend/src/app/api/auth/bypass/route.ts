import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    const validUsers = [
      { user: 'adminah', email: 'aruneshownsty1@gmail.com', name: 'Aruneshwaran' },
      { user: 'aruneshwarank', email: 'aruneshownsty1@gmail.com', name: 'Aruneshwaran' },
      { user: 'harigh', email: 'harishraghav489@gmail.com', name: 'Harish' },
    ];

    const matchedUser = validUsers.find(
      (u) => u.user.toLowerCase() === username?.trim().toLowerCase()
    );

    if (matchedUser && password === '12345') {
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
      const targetEmail = matchedUser.email;
      const displayName = matchedUser.name;

      // 1. Update/Ensure user metadata and database profile name are correct
      try {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('id')
          .eq('email', targetEmail)
          .maybeSingle();

        if (profileData?.id) {
          // Update auth user metadata
          await supabase.auth.admin.updateUserById(profileData.id, {
            user_metadata: { full_name: displayName }
          });
          // Update database profile
          await supabase
            .from('profiles')
            .update({ name: displayName })
            .eq('id', profileData.id);
        }
      } catch (err) {
        console.error('Failed to update admin profile name metadata:', err);
      }

      // Generate verification magic link for the target admin email
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

      if (data?.properties?.hashed_token) {
        const callbackUrl = new URL('/auth/callback', origin);
        callbackUrl.searchParams.set('token_hash', data.properties.hashed_token);
        callbackUrl.searchParams.set('type', 'magiclink');
        callbackUrl.searchParams.set('next', '/dashboard');

        return NextResponse.json({
          success: true,
          actionLink: callbackUrl.toString(),
        });
      }
    }

    return NextResponse.json({ error: 'Invalid operator credentials.' }, { status: 401 });
  } catch (error: any) {
    console.error('Bypass login error:', error);
    return NextResponse.json({ error: error?.message || 'Server error.' }, { status: 500 });
  }
}
