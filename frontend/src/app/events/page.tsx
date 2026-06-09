'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@/lib/supabase';
import { useAuthStore } from '@/store/authStore';
import { type Event } from '@/types';

export default function EventsPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading, fetchUser } = useAuthStore();
  const [events, setEvents] = useState<Event[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        router.replace('/login');
      } else {
        fetchEvents();
      }
    }
  }, [isAuthenticated, authLoading, router]);

  const fetchEvents = async () => {
    setLoadingEvents(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });

      if (data && !error) {
        setEvents(data as Event[]);
      } else {
        console.error('Error fetching events:', error);
      }
    } catch (err) {
      console.error('Failed to run query:', err);
    } finally {
      setLoadingEvents(false);
    }
  };

  // Filter events based on search query and status filter
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (event.organizer && event.organizer.toLowerCase().includes(searchQuery.toLowerCase()));

    if (statusFilter === 'ALL') return matchesSearch;
    if (statusFilter === 'NEW') return matchesSearch && event.status?.toLowerCase().includes('new');
    if (statusFilter === 'ONGOING') return matchesSearch && event.event_dates?.toLowerCase().includes('ongoing');
    if (statusFilter === 'ACTIVE') return matchesSearch && !event.status?.toLowerCase().includes('closed');
    return matchesSearch;
  });

  // Unique status badge color utility
  const getStatusStyle = (status: string | null) => {
    if (!status) return 'border-arc-blue/30 text-arc-blue/70 bg-arc-blue/5';
    const s = status.toLowerCase();
    if (s.includes('new')) {
      return 'border-terminal-green/50 text-terminal-green bg-terminal-green/10 shadow-[0_0_8px_rgba(0,255,65,0.2)]';
    }
    if (s.includes('closed') || s.includes('ended')) {
      return 'border-warning-red/50 text-warning-red bg-warning-red/10';
    }
    return 'border-arc-blue/40 text-arc-blue bg-arc-blue/10';
  };

  if (authLoading || (isAuthenticated && !user)) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center font-orbitron text-arc-blue animate-pulse">
        Establishing Secure Uplink...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-text-white p-4 sm:p-8 md:p-12 font-exo2 relative overflow-hidden">
      {/* Interactive Dot Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,217,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,217,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-arc-blue/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-terminal-green/300 bg-opacity-5 bg-terminal-green/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-arc-blue/15 pb-8"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-arc-blue shadow-[0_0_12px_rgba(0,217,255,1)] animate-ping" />
              <span className="font-mono text-xs text-arc-blue/60 uppercase tracking-[4px]">LIVE SIGNAL INTAKE</span>
            </div>
            <h1 className="font-orbitron text-3xl sm:text-4xl text-text-white font-black tracking-widest uppercase">
              EVENT <span className="text-arc-blue text-glow-blue">HORIZON</span>
            </h1>
            <p className="text-text-white/50 text-xs sm:text-sm mt-2 max-w-2xl font-mono leading-relaxed">
              Real-time feed of hackathons, developer events, and technical challenges curated from global channels and updated automatically.
            </p>
          </div>
          <button
            onClick={() => router.push('/dashboard')}
            className="group flex items-center gap-2 px-5 py-2.5 border border-arc-blue/30 text-arc-blue font-orbitron text-xs tracking-widest rounded bg-arc-blue/5 hover:bg-arc-blue/10 hover:border-arc-blue hover:shadow-[0_0_15px_rgba(0,217,255,0.25)] transition-all duration-300"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span> RETURN TO NEXUS
          </button>
        </motion.div>

        {/* Search & Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4 mb-8 items-center bg-black/40 border border-arc-blue/10 rounded-xl p-4 backdrop-blur-md"
        >
          {/* Search Box */}
          <div className="relative w-full sm:flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs text-arc-blue/50">[SEARCH]&gt;</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search hackathons, organizers..."
              className="w-full bg-black/60 border border-arc-blue/20 rounded-lg pl-24 pr-4 py-2.5 text-sm text-text-white font-mono placeholder-text-white/20 focus:outline-none focus:border-arc-blue focus:shadow-[0_0_15px_rgba(0,217,255,0.15)] transition-all"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative w-full sm:w-auto shrink-0 flex items-center gap-2">
            <span className="font-mono text-xs text-arc-blue/50 uppercase tracking-wider hidden md:inline">FILTER:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-48 bg-black/60 border border-arc-blue/20 rounded-lg px-4 py-2.5 text-xs font-mono text-arc-blue focus:outline-none focus:border-arc-blue focus:shadow-[0_0_15px_rgba(0,217,255,0.15)] transition-all cursor-pointer appearance-none"
            >
              <option value="ALL">ALL CHANNELS</option>
              <option value="NEW">NEW ONLY</option>
              <option value="ACTIVE">ACTIVE ONLY</option>
              <option value="ONGOING">ONGOING DATES</option>
            </select>
          </div>
        </motion.div>

        {/* Events Feed Grid */}
        {loadingEvents ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-[280px] bg-black/30 border border-arc-blue/10 rounded-xl p-6 flex flex-col justify-between animate-pulse"
              >
                <div className="space-y-4">
                  <div className="h-4 bg-arc-blue/10 rounded w-1/3" />
                  <div className="h-6 bg-arc-blue/10 rounded w-3/4" />
                  <div className="h-4 bg-arc-blue/10 rounded w-1/2" />
                  <div className="space-y-2 pt-4">
                    <div className="h-3 bg-arc-blue/5 rounded w-full" />
                    <div className="h-3 bg-arc-blue/5 rounded w-5/6" />
                  </div>
                </div>
                <div className="h-10 bg-arc-blue/10 rounded w-full" />
              </div>
            ))}
          </div>
        ) : filteredEvents.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center p-12 border border-dashed border-arc-blue/20 rounded-xl bg-black/30 backdrop-blur-sm min-h-[300px]"
          >
            <span className="text-3xl mb-4">📡</span>
            <h3 className="font-orbitron text-base text-arc-blue font-bold tracking-widest uppercase mb-2">
              No Signals Detected
            </h3>
            <p className="font-mono text-xs text-text-white/40 text-center max-w-md">
              Your search parameters do not match any active communications. Check back later or adjust filters.
            </p>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredEvents.map((event, idx) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.4) }}
                  key={event.id}
                  className="group relative flex flex-col justify-between p-6 border border-arc-blue/15 bg-black/40 rounded-xl hover:border-arc-blue/40 hover:bg-arc-blue/[0.02] hover:shadow-[0_0_30px_rgba(0,217,255,0.08)] transition-all duration-300"
                >
                  {/* Decorative glowing card corner */}
                  <div className="absolute top-0 right-0 w-0 h-0 border-t-[12px] border-r-[12px] border-t-arc-blue/30 border-r-arc-blue/30 group-hover:border-t-arc-blue group-hover:border-r-arc-blue transition-colors duration-300" />
                  
                  <div>
                    {/* Status Badge */}
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <span className={`px-2.5 py-0.5 border rounded font-mono text-[9px] font-bold uppercase tracking-wider ${getStatusStyle(event.status)}`}>
                        {event.status || 'ACTIVE'}
                      </span>
                      <span className="font-mono text-[8px] text-text-white/20 uppercase tracking-widest">
                        Node_ID: {event.id.slice(0, 8)}
                      </span>
                    </div>

                    {/* Event Name */}
                    <h3 className="font-orbitron text-base sm:text-lg text-text-white group-hover:text-arc-blue font-bold tracking-wide leading-snug mb-2 transition-colors duration-300">
                      {event.name}
                    </h3>

                    {/* Organizer */}
                    <p className="font-mono text-[10px] text-arc-blue/60 tracking-wider uppercase mb-5 truncate" title={event.organizer || ''}>
                      {event.organizer || 'Independent Organizer'}
                    </p>

                    {/* Meta info grid */}
                    <div className="space-y-3 font-mono text-xs border-t border-b border-arc-blue/10 py-4 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-text-white/30 uppercase text-[9px] tracking-wider">DEADLINE</span>
                        <span className="text-warning-red/90 font-bold uppercase tracking-wide">
                          {event.registration_deadline || 'Not Specified'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-text-white/30 uppercase text-[9px] tracking-wider">EVENT DATES</span>
                        <span className="text-text-white/80">
                          {event.event_dates || 'Ongoing'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-text-white/30 uppercase text-[9px] tracking-wider">PRIZES</span>
                        <span className="text-terminal-green/90 font-bold">
                          {event.prizes || 'Not Specified'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Register Button */}
                  <a
                    href={event.registration_link || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 text-center font-orbitron text-xs font-bold tracking-widest text-text-white bg-arc-blue/10 border border-arc-blue/20 hover:border-arc-blue hover:bg-arc-blue hover:text-black hover:shadow-[0_0_15px_rgba(0,217,255,0.4)] rounded transition-all duration-300"
                  >
                    ACCESS TRANSMISSION <span>↗</span>
                  </a>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
