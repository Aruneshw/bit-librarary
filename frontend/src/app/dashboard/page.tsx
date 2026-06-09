'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useSubjectStore } from '@/store/subjectStore';
import SubjectOrbit from '@/components/dashboard/SubjectOrbit';
import SubjectCardStack from '@/components/dashboard/SubjectCardStack';
import ArcReactor from '@/components/dashboard/ArcReactor';
import AINoticeBoard from '@/components/dashboard/AINoticeBoard';
import HudFrontPage from '@/components/animations/HudFrontPage';
import TutorialModal from '@/components/tutorial/TutorialModal';
import MobileActionDock from '@/components/dashboard/MobileActionDock';
import BroadcastBanner from '@/components/dashboard/BroadcastBanner';
import PwaInstallBanner from '@/components/dashboard/PwaInstallBanner';
import AdminPostFeed from '@/components/dashboard/AdminPostFeed';
import MediaFeed from '@/components/dashboard/MediaFeed';
import PostComposer from '@/components/dashboard/PostComposer';
import FeedbackForm from '@/components/dashboard/FeedbackForm';
import NotificationCenter from '@/components/dashboard/NotificationCenter';
import { createClient } from '@/lib/supabase';
import { sumNonAdminLoginCount } from '@/lib/adminEmails';

function SystemClock() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: false }) + ' IST');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time) return <div className="w-20 h-4" />;

  return (
    <div className="font-mono text-[8px] sm:text-[10px] text-arc-blue/80 tracking-widest tabular-nums bg-arc-blue/5 border border-arc-blue/20 px-2 sm:px-3 py-1 rounded-lg">
      <span className="inline">{time.split(' ')[0]}</span> <span className="hidden sm:inline">IST</span>
    </div>
  );
}

function VisitorCount() {
  const { user } = useAuthStore();
  const [metrics, setMetrics] = useState<{ totalUsers: number; totalVisits: number } | null>(null);
  const [onlineCount, setOnlineCount] = useState<number>(1);

  const fetchCount = useCallback(async () => {
    const supabase = createClient();
    // Try calling RPC first (highly efficient, secure definer, bypasses RLS)
    const { data, error } = await supabase.rpc('get_system_metrics');
    if (!error && data) {
      setMetrics({
        totalUsers: Number(data.total_users) || 0,
        totalVisits: Number(data.total_visits) || 0
      });
      return;
    }

    // Fallback: If RPC is not created yet, query profiles table directly.
    const { data: profiles } = await supabase.from('profiles').select('email, login_count');
    if (profiles) {
      setMetrics({
        totalUsers: profiles.length,
        totalVisits: sumNonAdminLoginCount(profiles)
      });
    }
  }, []);

  useEffect(() => {
    fetchCount();

    const supabase = createClient();
    
    // 1. Subscribe to profile database changes for visit counts
    const dbChannel = supabase
      .channel('system-metrics-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'profiles' },
        () => {
          fetchCount();
        }
      )
      .subscribe();

    // 2. Subscribe to Supabase Presence for active online users
    const presenceChannel = supabase.channel('online-users', {
      config: {
        presence: {
          key: user?.id || 'anonymous',
        },
      },
    });

    presenceChannel
      .on('presence', { event: 'sync' }, () => {
        const state = presenceChannel.presenceState();
        // The number of unique keys in presenceState is the online count
        const count = Object.keys(state).length;
        setOnlineCount(count > 0 ? count : 1);
      })
      .subscribe(async (status: string) => {
        if (status === 'SUBSCRIBED' && user) {
          await presenceChannel.track({
            online_at: new Date().toISOString(),
            name: user.name || user.email,
          });
        }
      });

    return () => {
      supabase.removeChannel(dbChannel);
      supabase.removeChannel(presenceChannel);
    };
  }, [fetchCount, user]);

  if (!metrics) {
    return (
      <div className="font-mono text-[8px] sm:text-[10px] text-arc-blue/40 tracking-widest bg-arc-blue/5 border border-arc-blue/20 px-2 sm:px-3 py-1 rounded-lg animate-pulse">
        CONNECTING...
      </div>
    );
  }

  return (
    <div className="font-mono text-[8px] sm:text-[10px] text-arc-blue/80 tracking-widest bg-arc-blue/5 border border-arc-blue/20 px-2 sm:px-3 py-1 rounded-lg flex items-center gap-1.5 sm:gap-2">
      <div className="flex items-center gap-1">
        <span className="hidden sm:inline text-arc-blue/40">SYS_ACCESS:</span>
        <span className="font-bold text-arc-blue" style={{ textShadow: '0 0 8px rgba(0,217,255,0.4)' }}>
          {metrics.totalVisits}
        </span>
      </div>
      <span className="text-arc-blue/20">|</span>
      <div className="flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-terminal-green animate-pulse" style={{ filter: 'drop-shadow(0 0 4px rgba(0,255,65,0.8))' }} />
        <span className="hidden sm:inline text-arc-blue/40">ONLINE:</span>
        <span className="font-bold text-arc-blue" style={{ textShadow: '0 0 8px rgba(0,217,255,0.4)' }}>
          {onlineCount}
        </span>
      </div>
    </div>
  );
}


export default function DashboardPage() {
  const { user, avatarUrl, isAuthenticated, isAdmin, isLoading: authLoading, fetchUser, signOut } = useAuthStore();
  const { subjects, isLoading: subjectsLoading, fetchSubjects } = useSubjectStore();
  const router = useRouter();

  const [showIntro, setShowIntro] = useState(true);
  const [introComplete, setIntroComplete] = useState(false);
  const [isSessionLoaded, setIsSessionLoaded] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeFeedTab, setActiveFeedTab] = useState<'posts' | 'media'>('posts');
  const [showPostComposer, setShowPostComposer] = useState(false);

  // Check if intro has already been completed in this browser session
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const introSeen = sessionStorage.getItem('intro_seen') === 'true';
      if (introSeen) {
        setShowIntro(false);
        setIntroComplete(true);
      }
      setIsSessionLoaded(true);

      // Auto-heal old mock bypass session if present
      if (localStorage.getItem('admin_bypass_active') === 'true') {
        localStorage.removeItem('admin_bypass_active');
        localStorage.removeItem('admin_bypass_profile');
        signOut();
      }
    }
  }, [signOut]);

  // Check viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fetch user if not loaded
  useEffect(() => {
    if (!isAuthenticated) {
      fetchUser();
    }
  }, [isAuthenticated, fetchUser]);

  // Redirect if not authenticated or missing department (unless admin)
  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated || (user && !user.department && !isAdmin)) {
      router.replace('/login');
    }
  }, [authLoading, isAuthenticated, isAdmin, user, router]);

  // Fetch subjects when user is ready
  useEffect(() => {
    if (user?.department) {
      fetchSubjects(user.department);
    } else if (isAdmin) {
      fetchSubjects('ALL');
    }
  }, [user?.department, isAdmin, fetchSubjects]);

  // Check tutorial status
  useEffect(() => {
    const checkTutorial = async () => {
      if (!user) return;
      const supabase = createClient();
      const { data } = await supabase
        .from('settings')
        .select('tutorial_seen')
        .eq('user_id', user.id)
        .single();

      if (data && !data.tutorial_seen) {
        setShowTutorial(true);
      }
    };
    if (introComplete) checkTutorial();
  }, [introComplete, user]);

  const handleIntroComplete = useCallback(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('intro_seen', 'true');
    }
    setShowIntro(false);
    setIntroComplete(true);
  }, []);

  const handleLogout = async () => {
    await signOut();
    router.push('/login');
  };

  if (authLoading || (isAuthenticated && user && !user.department && !isAdmin) || !isSessionLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="relative z-10 w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-arc-blue/40"
            style={{ animation: 'spin-clockwise 2s linear infinite' }} />
          <div className="absolute inset-3 rounded-full bg-arc-blue/20"
            style={{ boxShadow: '0 0 20px rgba(0,217,255,0.5)' }} />
        </div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <BroadcastBanner />
      <AINoticeBoard />
      <PwaInstallBanner />

      {/* HUD Front Page / Boot sequence */}
      {showIntro && (
        <HudFrontPage
          onEnter={handleIntroComplete}
        />
      )}

      {/* Tutorial Modal */}
      <TutorialModal
        isOpen={showTutorial}
        onClose={() => setShowTutorial(false)}
      />

      {/* Dashboard Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center">
        {/* Header */}
        <header className="absolute top-0 left-0 right-0 flex items-start sm:items-center justify-between px-4 sm:px-6 py-4 pointer-events-none z-50">
          <div className="flex items-center gap-3 pointer-events-auto">
            {avatarUrl ? (
              <img src={avatarUrl} alt="Profile" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-arc-blue/30" />
            ) : (
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-arc-blue/30 bg-arc-blue/10 flex items-center justify-center">
                <span className="font-orbitron text-arc-blue font-bold text-sm">
                  {(user?.name || user?.email || 'U').charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div>
              <h1
                className="font-orbitron text-arc-blue text-base sm:text-lg font-bold tracking-wider"
                style={{ textShadow: '0 0 12px rgba(0,217,255,0.4)' }}
              >
                BIT LIBRARY
              </h1>
              <p className="font-mono text-[8px] sm:text-[10px] text-text-white/60 tracking-wider mt-0.5 truncate max-w-[100px] sm:max-w-none">
                {user?.name || user?.email}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-4 pointer-events-auto max-w-[55%] sm:max-w-none">
            <VisitorCount />
            <SystemClock />
            <div className="flex items-center gap-1.5 sm:gap-2 px-1.5 sm:px-3 py-1 border border-terminal-green/30 bg-terminal-green/10 rounded-lg">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-terminal-green animate-pulse" style={{ filter: 'drop-shadow(0 0 4px rgba(0,255,65,0.8))' }} />
              <span className="hidden sm:inline font-mono text-[10px] text-terminal-green uppercase tracking-wider">Secure Channel</span>
            </div>
            {user?.department && (
              <span className="font-rajdhani text-[10px] sm:text-xs text-arc-blue/60 uppercase tracking-[2px] sm:tracking-[3px] border border-arc-blue/20 px-1.5 sm:px-3 py-1 rounded-lg">
                {user.department}
              </span>
            )}
            <button
              onClick={() => router.push('/events')}
              className="font-rajdhani text-[10px] sm:text-xs text-arc-blue uppercase tracking-wider hover:text-white transition-colors border border-arc-blue/30 px-2 py-0.5 rounded bg-arc-blue/10"
            >
              Events
            </button>
            {isAdmin && (
              <button
                onClick={() => router.push('/admin')}
                className="font-rajdhani text-[10px] sm:text-xs text-arc-blue uppercase tracking-wider hover:text-white transition-colors border border-arc-blue/30 px-2 py-0.5 rounded bg-arc-blue/10"
              >
                Admin
              </button>
            )}
            <button
              onClick={handleLogout}
              className="font-rajdhani text-[10px] sm:text-xs text-text-white/40 uppercase tracking-wider hover:text-warning-red transition-colors"
              id="logout-btn"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Feed tabs */}
        {!subjectsLoading && introComplete && (
          <div className="w-full max-w-2xl mx-auto px-4 pt-20 sm:pt-24">
            <div className="flex items-center justify-between mb-3">
              <div className="flex gap-1 bg-arc-blue/5 border border-arc-blue/20 rounded-lg p-1">
                <button
                  onClick={() => setActiveFeedTab('posts')}
                  className={`px-3 py-1.5 font-orbitron text-xs tracking-wider rounded-md transition-all ${
                    activeFeedTab === 'posts'
                      ? 'bg-arc-blue/20 text-arc-blue shadow-[0_0_8px_rgba(0,217,255,0.2)]'
                      : 'text-text-white/50 hover:text-text-white/80'
                  }`}
                >
                  Posts
                </button>
                <button
                  onClick={() => setActiveFeedTab('media')}
                  className={`px-3 py-1.5 font-orbitron text-xs tracking-wider rounded-md transition-all ${
                    activeFeedTab === 'media'
                      ? 'bg-arc-blue/20 text-arc-blue shadow-[0_0_8px_rgba(0,217,255,0.2)]'
                      : 'text-text-white/50 hover:text-text-white/80'
                  }`}
                >
                  Media
                </button>
              </div>
              {isAdmin && (
                <button
                  onClick={() => setShowPostComposer(true)}
                  className="w-8 h-8 rounded-full bg-arc-blue/10 border border-arc-blue/30 flex items-center justify-center text-arc-blue hover:bg-arc-blue/20 transition-all"
                  aria-label="Create post"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </button>
              )}
            </div>

            {activeFeedTab === 'posts' ? <AdminPostFeed /> : <MediaFeed />}
          </div>
        )}

        {/* Subject Display */}
        {!subjectsLoading && introComplete && (
          <div className="w-full flex-1 flex flex-col items-center justify-center pb-12 pt-24 lg:pt-0">
            {/* Compact reactor + title for mobile */}
            {isMobile && (
              <div className="flex flex-col items-center mb-8">
                {/* Compact ARC Reactor (Triangular Design) */}
                <div className="relative mb-4">
                  <ArcReactor size={80} />
                </div>

                <h2 className="font-orbitron text-sm text-arc-blue/60 uppercase tracking-[4px]">
                  Knowledge Nodes
                </h2>
              </div>
            )}

            {isMobile ? (
              <SubjectCardStack subjects={subjects} />
            ) : (
              <SubjectOrbit subjects={subjects} />
            )}
          </div>
        )}

        {/* Loading State */}
        {subjectsLoading && introComplete && (
          <div className="flex items-center justify-center mt-20">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-arc-blue/40 border-t-arc-blue animate-spin" />
              <p className="font-mono text-xs text-arc-blue/40">Loading subjects...</p>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="absolute bottom-4 left-0 right-0 flex justify-center pointer-events-none z-50">
          <p className="font-mono text-[9px] sm:text-[10px] text-arc-blue/40 uppercase tracking-[4px]">
            Developed by <span className="text-arc-blue/80 font-bold">Stark</span> & <span className="text-arc-blue/80 font-bold">Ruder</span>
          </p>
        </footer>

        {isAuthenticated && introComplete && <MobileActionDock />}
        {isAuthenticated && introComplete && <NotificationCenter />}
        {isAuthenticated && introComplete && <FeedbackForm />}
        <PostComposer isOpen={showPostComposer} onClose={() => setShowPostComposer(false)} />
      </div>
    </main>
  );
}
