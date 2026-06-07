'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      const supabase = createClient();

      const { data: { session }, error } = await supabase.auth.getSession();

      if (error || !session) {
        router.push('/login');
        return;
      }

      // Validate email domain
      const email = session.user.email || '';
      if (!email.endsWith('@bitsathy.ac.in')) {
        await supabase.auth.signOut();
        router.push('/login?error=invalid_domain');
        return;
      }

      // Check if user has department set
      let { data: profile } = await supabase
        .from('profiles')
        .select('department')
        .eq('id', session.user.id)
        .single();

      if (!profile?.department) {
        // Auto-extract department from email
        // Example: aruneshwarank.al25@bitsathy.ac.in -> "al" -> "AL"
        try {
          const emailPrefix = email.split('@')[0];
          const parts = emailPrefix.split('.');
          const lastPart = parts[parts.length - 1]; // e.g. "al25" or "cs"
          const deptMatch = lastPart.match(/^[a-zA-Z]+/); // matches "al"
          
          if (deptMatch) {
            const extractedDept = deptMatch[0].toUpperCase();
            const allowedDepts = ['CS','IT','AL','AD','EEE','EIE','ME','MZ','AG','BT'];
            
            if (allowedDepts.includes(extractedDept)) {
              // Update profile with extracted department
              await supabase
                .from('profiles')
                .update({ department: extractedDept })
                .eq('id', session.user.id);
                
              profile = { department: extractedDept };
            }
          }
        } catch (e) {
          console.error("Failed to extract department", e);
        }
      }

      if (profile?.department) {
        router.push('/dashboard');
      } else {
        router.push('/login');
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="arc-bg" />
      <div className="relative z-10 flex flex-col items-center gap-4">
        {/* Loading reactor */}
        <div className="relative w-16 h-16">
          <div
            className="absolute inset-0 rounded-full border-2 border-arc-blue/40"
            style={{ animation: 'spin-clockwise 2s linear infinite' }}
          />
          <div
            className="absolute inset-2 rounded-full border border-arc-blue/60"
            style={{ animation: 'spin-counter 1.5s linear infinite' }}
          />
          <div
            className="absolute inset-4 rounded-full bg-arc-blue/20"
            style={{ boxShadow: '0 0 20px rgba(0,217,255,0.5)' }}
          />
        </div>
        <p className="font-mono text-xs text-arc-blue/60 tracking-wider">
          AUTHENTICATING...
        </p>
      </div>
    </div>
  );
}
