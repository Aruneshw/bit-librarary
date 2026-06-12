import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Pre-computed SHA-256 hash of the valid passcode
// The plaintext password is NEVER stored in source code
const VALID_CREDENTIAL_HASH = '06ceef9715535b739e13f0eff2d08f2a4d57b537aaa549facff529eaa2af02d0';

export async function POST(request: Request) {
  try {
    const { username, credential } = await request.json();

    // Validate that credential is a hex SHA-256 hash (64 chars)
    if (!credential || typeof credential !== 'string' || !/^[a-f0-9]{64}$/.test(credential)) {
      return NextResponse.json({ error: 'Invalid credentials format.' }, { status: 400 });
    }

    const validUsers = [
      { user: 'adminah', email: 'aruneshownsty1@gmail.com', name: 'Aruneshwaran' },
      { user: 'aruneshwarank', email: 'aruneshownsty1@gmail.com', name: 'Aruneshwaran' },
      { user: 'harigh', email: 'harishraghav489@gmail.com', name: 'Harish' },
    ];

    const matchedUser = validUsers.find(
      (u) => u.user.toLowerCase() === username?.trim().toLowerCase()
    );

    // Compare the incoming hash against the stored hash (never plaintext comparison)
    if (matchedUser && credential === VALID_CREDENTIAL_HASH) {
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

