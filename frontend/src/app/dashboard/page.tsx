'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useSubjectStore } from '@/store/subjectStore';
import { usePresenceStore } from '@/store/presenceStore';
import SubjectOrbit from '@/components/dashboard/SubjectOrbit';
import SubjectCardStack from '@/components/dashboard/SubjectCardStack';
import ArcReactor from '@/components/dashboard/ArcReactor';
import HudFrontPage from '@/components/animations/HudFrontPage';
import TutorialModal from '@/components/tutorial/TutorialModal';
import MobileActionDock from '@/components/dashboard/MobileActionDock';
import PwaInstallBanner from '@/components/dashboard/PwaInstallBanner';
import FeatureNotice from '@/components/dashboard/FeatureNotice';
import BroadcastBanner from '@/components/dashboard/BroadcastBanner';
import AdminPostFeed from '@/components/dashboard/AdminPostFeed';
import MediaFeed from '@/components/dashboard/MediaFeed';
import PostComposer from '@/components/dashboard/PostComposer';
import PollComposer from '@/components/admin/PollComposer';
import FeedbackForm from '@/components/dashboard/FeedbackForm';
import NotificationCenter from '@/components/dashboard/NotificationCenter';
import NotificationSync from '@/components/dashboard/NotificationSync';
import { useNotificationStore } from '@/store/notificationStore';
import { createClient } from '@/lib/supabase';
import { sumNonAdminLoginCount } from '@/lib/adminEmails';
import { useNotification } from '@/hooks/useNotification';
import { logAccess } from '@/lib/dailyAccess';
import { useJourneyStore } from '@/store/journeyStore';
import WelcomeBanner from '@/components/journey/WelcomeBanner';
import TitleUnlockAnimation from '@/components/journey/TitleUnlockAnimation';

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
  const [metrics, setMetrics] = useState<{ totalUsers: number; totalVisits: number } | null>(null);
  const onlineCount = usePresenceStore((s) => s.onlineCount);

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
    
    // Subscribe to profile database changes for visit counts
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

    return () => {
      supabase.removeChannel(dbChannel);
    };
  }, [fetchCount]);

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


function PushToggle() {
  const pushEnabled = useNotificationStore((s) => s.pushEnabled);
  const setPushEnabled = useNotificationStore((s) => s.setPushEnabled);
  const { permission, askPermission } = useNotification();
  const [showTip, setShowTip] = useState(false);
  const tipTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleToggle = async () => {
    if (!pushEnabled) {
      if (permission === 'denied') {
        setShowTip(true);
        if (tipTimer.current) clearTimeout(tipTimer.current);
        tipTimer.current = setTimeout(() => setShowTip(false), 4000);
        return;
      }
      if (permission === 'default') {
        const granted = await askPermission();
        if (!granted) return;
      }
    }
    setPushEnabled(!pushEnabled);
  };

  return (
    <div className="relative pointer-events-auto">
      <button
        onClick={handleToggle}
        className="flex items-center gap-1.5 sm:gap-2 px-1.5 sm:px-3 py-1 rounded-lg transition-all cursor-pointer"
        style={{
          border: `1px solid ${pushEnabled ? 'rgba(0, 255, 65, 0.3)' : 'rgba(255, 61, 61, 0.3)'}`,
          backgroundColor: pushEnabled ? 'rgba(0, 255, 65, 0.1)' : 'rgba(255, 61, 61, 0.1)',
        }}
      >
        <div
          className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-sm border transition-all duration-200 flex items-center justify-center"
          style={{
            borderColor: pushEnabled ? '#00FF41' : '#FF3D3D',
            backgroundColor: pushEnabled ? '#00FF41' : 'transparent',
          }}
        >
          {pushEnabled && (
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          )}
        </div>
        <span
          className="hidden sm:inline font-mono text-[10px] uppercase tracking-wider"
          style={{ color: pushEnabled ? '#00FF41' : '#FF3D3D' }}
        >
          {pushEnabled ? 'Push On' : 'Push Off'}
        </span>
      </button>
      <AnimatePresence>
        {showTip && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="absolute top-full right-0 mt-2 w-64 p-3 rounded-lg bg-black/90 border border-warning-red/40 backdrop-blur-xl shadow-[0_0_20px_rgba(255,61,61,0.2)] z-[100]"
          >
            <p className="font-mono text-[10px] text-text-white/80 leading-relaxed">
              Push notifications are blocked by your browser. Click the lock/info icon in your address bar and enable notifications for this site.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
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
  const [showPollComposer, setShowPollComposer] = useState(false);
  const journeyStats = useJourneyStore((s) => s.stats);
  const setStats = useJourneyStore((s) => s.setStats);
  const newTitleUnlock = useJourneyStore((s) => s.newTitleUnlock);
  const clearTitleUnlock = useJourneyStore((s) => s.clearTitleUnlock);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showFeatureNotice, setShowFeatureNotice] = useState(true);

  // Check if feature notice has already been shown this session
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const noticeSeen = sessionStorage.getItem('feature_notice_shown') === 'true';
      if (noticeSeen) {
        setShowFeatureNotice(false);
      }
    }
  }, []);

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

  // Log daily access (once per browser session)
  useEffect(() => {
    if (!user?.id) return;
    const logged = sessionStorage.getItem('access_logged_today');
    if (!logged) {
      logAccess(user.id, navigator.userAgent);
      sessionStorage.setItem('access_logged_today', 'true');
    }
  }, [user?.id]);

  // Journey stats
  useEffect(() => {
    if (!user?.id) return;
    fetch('/api/journey/stats')
      .then((r) => r.json())
      .then((data) => {
        setStats(data);
        if (data.title_history && data.title_history.length > 0) {
          const lastUnlocked = data.title_history[data.title_history.length - 1];
          const unlockDate = new Date(lastUnlocked.unlocked_at).toDateString();
          if (unlockDate === new Date().toDateString()) {
            useJourneyStore.getState().updateFromHeartbeat({
              current_streak: data.current_streak,
              longest_streak: data.longest_streak,
              total_active_days: data.total_active_days,
              total_study_seconds: data.total_study_seconds,
              current_title: data.current_title,
              today_seconds: data.today_seconds,
              title_unlocked: { title: lastUnlocked.title, day: lastUnlocked.day_number, isNew: true },
            });
          }
        }
      })
      .catch(() => {});
  }, [user?.id, setStats]);

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

  const handleFeatureDismiss = useCallback(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('feature_notice_shown', 'true');
    }
    setShowFeatureNotice(false);
  }, []);

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
      {showFeatureNotice ? (
        <FeatureNotice onDismiss={handleFeatureDismiss} />
      ) : (
        <>
          <PwaInstallBanner />
          <BroadcastBanner />

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
                {journeyStats && (
                  <button onClick={() => router.push('/journey')} className="transition-transform hover:scale-105">
                    <div className="relative">
                      {avatarUrl ? (
                        <img src={avatarUrl} alt="Profile" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-arc-blue/30 object-cover" />
                      ) : (
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-arc-blue/30 bg-arc-blue/10 flex items-center justify-center">
                          <span className="font-orbitron text-arc-blue font-bold text-sm">
                            {(user?.name || user?.email || 'U').charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                      {journeyStats.current_streak > 0 && (
                        <div className="absolute -bottom-0.5 -right-0.5 px-1 py-0.5 rounded-full bg-terminal-green/20 border border-terminal-green/30">
                          <span className="font-mono text-[6px] text-terminal-green font-bold">🔥{journeyStats.current_streak}</span>
                        </div>
                      )}
                    </div>
                  </button>
                )}
                {!journeyStats && (
                  <>
                    {avatarUrl ? (
                      <img src={avatarUrl} alt="Profile" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-arc-blue/30" />
                    ) : (
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-arc-blue/30 bg-arc-blue/10 flex items-center justify-center">
                        <span className="font-orbitron text-arc-blue font-bold text-sm">
                          {(user?.name || user?.email || 'U').charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                  </>
                )}
                <div>
                  <h1
                    className="font-orbitron text-arc-blue text-base sm:text-lg font-bold tracking-wider"
                    style={{ textShadow: '0 0 12px rgba(0,217,255,0.4)' }}
                  >
                    BIT LIBRARY
                  </h1>
                  <button onClick={() => router.push('/journey')} className="block">
                    <p className="font-mono text-[8px] sm:text-[10px] text-arc-blue/40 tracking-wider mt-0.5 truncate max-w-[100px] sm:max-w-none hover:text-arc-blue/70 transition-colors">
                      {user?.name || user?.email}
                    </p>
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-4 pointer-events-auto max-w-[55%] sm:max-w-none">
                <VisitorCount />
                <SystemClock />
<PushToggle />
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
                {showWelcome && journeyStats && (
                  <div className="mb-4">
                    <WelcomeBanner
                      stats={journeyStats}
                      newTitle={newTitleUnlock}
                      onDismiss={() => setShowWelcome(false)}
                    />
                  </div>
                )}
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
                    <>
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
                      <button
                        onClick={() => setShowPollComposer(true)}
                        className="w-8 h-8 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 hover:bg-amber-400/20 transition-all"
                        aria-label="Create poll"
                      >
                        <span className="text-sm">📊</span>
                      </button>
                    </>
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

          </div>

          {isAuthenticated && introComplete && <MobileActionDock />}
          {isAuthenticated && introComplete && <NotificationCenter />}
          {isAuthenticated && introComplete && <NotificationSync />}
          {isAuthenticated && introComplete && <FeedbackForm />}
          <TitleUnlockAnimation
            unlock={newTitleUnlock}
            onComplete={() => clearTitleUnlock()}
          />
          <PostComposer isOpen={showPostComposer} onClose={() => setShowPostComposer(false)} />
          <PollComposer isOpen={showPollComposer} onClose={() => setShowPollComposer(false)} />
        </>
      )}
    </main>
  );
}
