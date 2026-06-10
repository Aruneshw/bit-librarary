'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, Legend,
} from 'recharts';
import { createClient } from '@/lib/supabase';

// ── Types ─────────────────────────────────────────────────
interface DailyUsers {
  today: number;
  yesterday: number;
  weekly: number;
  monthly: number;
  trend: Record<string, number>;
}

interface DeptActivity {
  department: string;
  count: number;
  percentage: number;
}

interface TopUser {
  id: string;
  name: string;
  email: string;
  department: string;
  loginCount: number;
  postViews: number;
  downloads: number;
}

interface ViewedPost {
  id: string;
  title: string;
  body: string;
  views: number;
  likes: number;
  dislikes: number;
  downloads: number;
}

interface DownloadedFile {
  id: string;
  fileName: string;
  department: string;
  downloads: number;
  views: number;
}

interface EngagementTrend {
  date: string;
  likes: number;
  dislikes: number;
  views: number;
}

interface TrafficHour {
  hour: number;
  count: number;
  label: string;
}

interface DeviceStats {
  desktop: number;
  mobile: number;
  tablet: number;
  unknown: number;
}

interface StorageStats {
  fileCount: number;
  usedSpace: number;
  downloads: number;
}

interface ContentPerf {
  id: string;
  title: string;
  views: number;
  downloads: number;
  likes: number;
  dislikes: number;
  reactionCount: number;
  engagementScore: number;
}

interface AnalyticsData {
  dailyUsers: DailyUsers;
  departmentActivity: DeptActivity[];
  topUsers: TopUser[];
  mostViewedPosts: ViewedPost[];
  mostDownloadedFiles: DownloadedFile[];
  engagement: {
    totalLikes: number;
    totalDislikes: number;
    totalEmojis: number;
    totalViews: number;
    trend: EngagementTrend[];
  };
  trafficTimeline: TrafficHour[];
  peakHour: TrafficHour;
  deviceAnalytics: DeviceStats | null;
  storage: {
    supabase: StorageStats;
    vercelBlob: StorageStats;
  };
  contentPerformance: ContentPerf[];
}

const SLIDES = [
  'Daily Active Users',
  'Department Activity',
  'Top Active Users',
  'Most Viewed Posts',
  'Most Downloaded Files',
  'Engagement Analytics',
  'Traffic Timeline',
  'Device Analytics',
  'Storage Analytics',
  'Content Performance',
];

const DEPT_COLORS: Record<string, string> = {
  CS: '#00D9FF', IT: '#00D9FF', AL: '#00D9FF', AD: '#00D9FF',
  EEE: '#FFD700', ECE: '#FF6B35', EIE: '#FF6B35',
  ME: '#00FF41', MZ: '#00FF41',
  AG: '#A78BFA', BT: '#A78BFA',
};

const REALTIME_CHANNELS = [
  { table: 'post_views', filter: undefined },
  { table: 'post_reactions', filter: undefined },
  { table: 'user_access_log', filter: undefined },
  { table: 'file_metadata', filter: undefined },
  { table: 'profiles', filter: undefined },
];

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), sizes.length - 1);
  return `${(bytes / Math.pow(k, i)).toFixed(i > 0 ? 1 : 0)} ${sizes[i]}`;
}

// ── Shared tooltip ─────────────────────────────────────────
function ChartTooltip({ active, payload, label, prefix = '' }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-black/95 border border-arc-blue/50 rounded-lg px-4 py-3 shadow-[0_0_20px_rgba(0,217,255,0.2)] backdrop-blur-xl">
      <p className="font-orbitron text-[10px] text-arc-blue/70">{label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} className="font-orbitron text-sm text-white mt-1" style={{ color: entry.color }}>
          {prefix}{entry.value} {entry.name}
        </p>
      ))}
    </div>
  );
}

function EmptySlide({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center h-[340px]">
      <p className="font-mono text-sm text-white/30">{message}</p>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-[340px]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-arc-blue/40 border-t-arc-blue animate-spin" />
        <p className="font-mono text-xs text-arc-blue/40">Loading analytics...</p>
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────
export default function AnalyticsCarousel() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [slide, setSlide] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchAnalytics = useCallback(async () => {
    try {
      const res = await fetch('/api/analytics');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      if (json.error) throw new Error(json.error);
      setData(json);
      setError(null);
    } catch (e: any) {
      setError(e.message);
      console.error('Analytics fetch error:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  // Polling fallback
  useEffect(() => {
    intervalRef.current = setInterval(fetchAnalytics, 30000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [fetchAnalytics]);

  // Realtime subscriptions
  useEffect(() => {
    const supabase = createClient();
    const channels = REALTIME_CHANNELS.map((ch) =>
      supabase
        .channel(`analytics-${ch.table}`)
        .on(
          'postgres_changes' as any,
          { event: '*', schema: 'public', table: ch.table },
          () => fetchAnalytics(),
        )
        .subscribe()
    );
    return () => {
      for (const ch of channels) supabase.removeChannel(ch);
    };
  }, [fetchAnalytics]);

  // Keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setSlide((s) => Math.max(0, s - 1));
      if (e.key === 'ArrowRight') setSlide((s) => Math.min(SLIDES.length - 1, s + 1));
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) {
    return (
      <div className="bg-black/40 border border-warning-red/30 rounded-xl p-6">
        <p className="font-mono text-xs text-warning-red">{error}</p>
      </div>
    );
  }
  if (!data) return <EmptySlide message="No analytics data available." />;

  const totalSlides = SLIDES.length;
  const hasPrev = slide > 0;
  const hasNext = slide < totalSlides - 1;

  const renderSlide = () => {
    switch (slide) {
      case 0: return <DailyUsersSlide data={data.dailyUsers} />;
      case 1: return <DepartmentSlide data={data.departmentActivity} />;
      case 2: return <TopUsersSlide data={data.topUsers} />;
      case 3: return <MostViewedSlide data={data.mostViewedPosts} />;
      case 4: return <DownloadedFilesSlide data={data.mostDownloadedFiles} />;
      case 5: return <EngagementSlide data={data.engagement} />;
      case 6: return <TrafficSlide data={data.trafficTimeline} peak={data.peakHour} />;
      case 7: return <DeviceSlide data={data.deviceAnalytics} />;
      case 8: return <StorageSlide data={data.storage} />;
      case 9: return <ContentPerfSlide data={data.contentPerformance} />;
      default: return null;
    }
  };

  return (
    <div className="bg-black/40 border border-arc-blue/20 rounded-xl backdrop-blur-md overflow-hidden shadow-[0_0_30px_rgba(0,217,255,0.05)]">
      {/* Header */}
      <div className="p-5 border-b border-arc-blue/20 bg-arc-blue/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-arc-blue shadow-[0_0_8px_rgba(0,217,255,1)] animate-pulse" />
            <h2 className="font-orbitron text-lg text-white tracking-wider">Analytics Dashboard</h2>
            <span className="font-mono text-[10px] text-white/30 bg-white/5 px-2 py-0.5 rounded">
              {slide + 1} / {totalSlides}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSlide((s) => Math.max(0, s - 1))}
              disabled={!hasPrev}
              className={`p-2 rounded-lg border transition-all ${
                hasPrev
                  ? 'border-arc-blue/30 text-arc-blue hover:bg-arc-blue/10 hover:shadow-[0_0_8px_rgba(0,217,255,0.15)]'
                  : 'border-white/10 text-white/20 cursor-not-allowed'
              }`}
              aria-label="Previous slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <button
              onClick={() => setSlide((s) => Math.min(totalSlides - 1, s + 1))}
              disabled={!hasNext}
              className={`p-2 rounded-lg border transition-all ${
                hasNext
                  ? 'border-arc-blue/30 text-arc-blue hover:bg-arc-blue/10 hover:shadow-[0_0_8px_rgba(0,217,255,0.15)]'
                  : 'border-white/10 text-white/20 cursor-not-allowed'
              }`}
              aria-label="Next slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>
        </div>
        {/* Slide title */}
        <p className="font-orbitron text-xs text-arc-blue/60 tracking-widest uppercase mt-2">
          {SLIDES[slide]}
        </p>
      </div>

      {/* Slide content */}
      <div className="p-5">
        {renderSlide()}
      </div>

      {/* Dots */}
      <div className="px-5 pb-4 flex items-center justify-center gap-1.5">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setSlide(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === slide
                ? 'bg-arc-blue shadow-[0_0_6px_rgba(0,217,255,0.6)] w-4'
                : 'bg-white/20 hover:bg-white/40'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SLIDE 1: Daily Active Users
// ═══════════════════════════════════════════════════════════
function DailyUsersSlide({ data }: { data: DailyUsers }) {
  const chartData = Object.entries(data.trend)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));

  const peak = chartData.reduce((m, d) => Math.max(m, d.count), 0);
  const avg = chartData.length ? Math.round(chartData.reduce((s, d) => s + d.count, 0) / chartData.length) : 0;

  return (
    <div>
      <div className="grid grid-cols-4 gap-3 mb-5">
        {[
          { label: 'Today', value: data.today, color: 'text-arc-blue' },
          { label: 'Yesterday', value: data.yesterday, color: 'text-purple-400' },
          { label: 'This Week', value: data.weekly, color: 'text-terminal-green' },
          { label: 'This Month', value: data.monthly, color: 'text-amber-400' },
        ].map((s) => (
          <div key={s.label} className="bg-black/60 border border-white/10 rounded-lg p-3">
            <p className="font-mono text-[9px] text-white/40 uppercase tracking-wider">{s.label}</p>
            <p className={`font-orbitron text-xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>
      {chartData.length > 0 ? (
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="dauGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00D9FF" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#00D9FF" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,217,255,0.06)" vertical={false} />
              <XAxis dataKey="date" tickFormatter={(v) => v.slice(5)} stroke="rgba(255,255,255,0.2)" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis stroke="rgba(255,255,255,0.1)" tick={{ fill: 'rgba(255,255,255,0.25)', fontSize: 10 }} tickLine={false} axisLine={false} allowDecimals={false} />
              <Tooltip content={<ChartTooltip prefix="" />} cursor={{ stroke: 'rgba(0,217,255,0.2)', strokeDasharray: '4 4' }} />
              <Area type="monotone" dataKey="count" stroke="#00D9FF" strokeWidth={2} fill="url(#dauGrad)" dot={(props: any) => {
                const isPeak = props.payload.count === peak && peak > 0;
                if (props.payload.count === 0) return null;
                return <circle key={props.index} cx={props.cx} cy={props.cy} r={isPeak ? 4 : 2} fill={isPeak ? '#00FF41' : '#00D9FF'} />;
              }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="font-mono text-sm text-white/30 text-center py-10">No daily access data yet.</p>
      )}
      <div className="flex gap-4 mt-3 text-[10px] font-mono text-white/40">
        <span>Peak: <strong className="text-terminal-green">{peak}</strong></span>
        <span>Average: <strong className="text-arc-blue">{avg}</strong></span>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SLIDE 2: Department Activity
// ═══════════════════════════════════════════════════════════
function DepartmentSlide({ data }: { data: DeptActivity[] }) {
  if (data.length === 0) return <EmptySlide message="No department data available." />;

  const chartData = data.slice(0, 8).map((d) => ({
    name: d.department,
    value: d.percentage,
    count: d.count,
  }));
  const others = data.slice(8);
  if (others.length > 0) {
    const otherSum = others.reduce((s, d) => s + d.percentage, 0);
    const otherCount = others.reduce((s, d) => s + d.count, 0);
    chartData.push({ name: 'OTHERS', value: otherSum, count: otherCount });
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div className="space-y-2">
        {chartData.map((d) => (
          <div key={d.name}>
            <div className="flex items-center justify-between mb-0.5">
              <span className="font-mono text-xs text-white/70">{d.name}</span>
              <span className="font-mono text-xs text-white/40">{d.value}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${d.value}%`,
                  backgroundColor: DEPT_COLORS[d.name] || '#00D9FF',
                  boxShadow: `0 0 8px ${DEPT_COLORS[d.name] || '#00D9FF'}40`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={chartData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, value }) => `${name} ${value}%`}>
              {chartData.map((entry, i) => (
                <Cell key={i} fill={DEPT_COLORS[entry.name] || '#00D9FF'} stroke="rgba(0,0,0,0.3)" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SLIDE 3: Top Active Users
// ═══════════════════════════════════════════════════════════
function TopUsersSlide({ data }: { data: TopUser[] }) {
  if (data.length === 0) return <EmptySlide message="No user activity data." />;
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse text-[11px]">
        <thead>
          <tr className="border-b border-arc-blue/20 text-arc-blue/60 font-orbitron text-[9px] tracking-widest uppercase">
            <th className="pb-2 pr-2">#</th>
            <th className="pb-2 pr-2">Name</th>
            <th className="pb-2 pr-2">Dept</th>
            <th className="pb-2 pr-2 text-right">Logins</th>
            <th className="pb-2 pr-2 text-right">Views</th>
          </tr>
        </thead>
        <tbody>
          {data.map((u, i) => (
            <tr key={u.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
              <td className="py-2 pr-2 font-mono text-white/30 w-6">{i + 1}</td>
              <td className="py-2 pr-2">
                <span className="font-mono text-white/80">{u.name}</span>
                <span className="block font-mono text-[9px] text-white/30">{u.email}</span>
              </td>
              <td className="py-2 pr-2">
                <span className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${
                  DEPT_COLORS[u.department] ? `text-[${DEPT_COLORS[u.department]}] bg-[${DEPT_COLORS[u.department]}]/10` : 'text-white/40 bg-white/10'
                }`}>
                  {u.department}
                </span>
              </td>
              <td className="py-2 pr-2 text-right font-orbitron text-arc-blue">{u.loginCount}</td>
              <td className="py-2 pr-2 text-right font-orbitron text-purple-400">{u.postViews}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SLIDE 4: Most Viewed Posts
// ═══════════════════════════════════════════════════════════
function MostViewedSlide({ data }: { data: ViewedPost[] }) {
  if (data.length === 0) return <EmptySlide message="No post views recorded yet." />;
  return (
    <div className="space-y-1.5 max-h-[340px] overflow-y-auto pr-1">
      {data.slice(0, 15).map((p, i) => (
        <div key={p.id} className="flex items-center justify-between py-2 px-3 rounded bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <span className="font-mono text-[10px] text-white/30 w-5 shrink-0">#{i + 1}</span>
            <span className="font-mono text-xs text-white/80 truncate">{p.title}</span>
          </div>
          <div className="flex items-center gap-3 shrink-0 ml-2">
            <span className="font-mono text-[10px] text-arc-blue flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              {p.views}
            </span>
            <span className="font-mono text-[10px] text-terminal-green">{p.likes}L</span>
            <span className="font-mono text-[10px] text-warning-red">{p.dislikes}D</span>
            <span className="font-mono text-[10px] text-amber-400">{p.downloads}DL</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SLIDE 5: Most Downloaded Files
// ═══════════════════════════════════════════════════════════
function DownloadedFilesSlide({ data }: { data: DownloadedFile[] }) {
  if (data.length === 0) return <EmptySlide message="No file downloads recorded yet." />;
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse text-[11px]">
        <thead>
          <tr className="border-b border-amber-400/20 text-amber-400/60 font-orbitron text-[9px] tracking-widest uppercase">
            <th className="pb-2 pr-2">File</th>
            <th className="pb-2 pr-2">Dept</th>
            <th className="pb-2 pr-2 text-right">Downloads</th>
            <th className="pb-2 pr-2 text-right">Views</th>
          </tr>
        </thead>
        <tbody>
          {data.slice(0, 15).map((f) => (
            <tr key={f.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
              <td className="py-2 pr-2">
                <span className="font-mono text-white/80 truncate block max-w-[200px]">{f.fileName}</span>
              </td>
              <td className="py-2 pr-2">
                <span className="font-mono text-[10px] text-white/40">{f.department}</span>
              </td>
              <td className="py-2 pr-2 text-right font-orbitron text-amber-400">{f.downloads}</td>
              <td className="py-2 pr-2 text-right font-orbitron text-arc-blue">{f.views}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SLIDE 6: Engagement Analytics
// ═══════════════════════════════════════════════════════════
function EngagementSlide({ data }: { data: AnalyticsData['engagement'] }) {
  const total = data.totalLikes + data.totalDislikes + data.totalEmojis + data.totalViews;
  const engagementRate = data.totalViews > 0
    ? Math.round(((data.totalLikes + data.totalEmojis) / data.totalViews) * 100)
    : 0;

  return (
    <div>
      <div className="grid grid-cols-4 gap-3 mb-5">
        {[
          { label: 'Total Likes', value: data.totalLikes, color: 'text-terminal-green', icon: '👍' },
          { label: 'Total Dislikes', value: data.totalDislikes, color: 'text-warning-red', icon: '👎' },
          { label: 'Emoji Reactions', value: data.totalEmojis, color: 'text-purple-400', icon: '😄' },
          { label: 'Total Views', value: data.totalViews, color: 'text-arc-blue', icon: '👁' },
        ].map((s) => (
          <div key={s.label} className="bg-black/60 border border-white/10 rounded-lg p-3">
            <p className="font-mono text-[9px] text-white/40 uppercase tracking-wider">{s.icon} {s.label}</p>
            <p className={`font-orbitron text-lg font-bold mt-1 ${s.color}`}>{s.value.toLocaleString()}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-4 mb-4">
        <span className="font-mono text-[10px] text-white/40">
          Engagement Rate: <strong className="text-terminal-green">{engagementRate}%</strong>
        </span>
        <span className="font-mono text-[10px] text-white/40">
          Total Interactions: <strong className="text-arc-blue">{total}</strong>
        </span>
      </div>
      {data.trend.length > 0 ? (
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.trend} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,217,255,0.06)" vertical={false} />
              <XAxis dataKey="date" tickFormatter={(v) => v.slice(5)} stroke="rgba(255,255,255,0.15)" tick={{ fill: 'rgba(255,255,255,0.25)', fontSize: 9 }} tickLine={false} axisLine={false} />
              <YAxis stroke="rgba(255,255,255,0.1)" tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 9 }} tickLine={false} axisLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Legend wrapperStyle={{ fontSize: '10px', fontFamily: 'JetBrains Mono, monospace' }} />
              <Line type="monotone" dataKey="likes" stroke="#00FF41" strokeWidth={2} dot={false} name="Likes" />
              <Line type="monotone" dataKey="views" stroke="#00D9FF" strokeWidth={2} dot={false} name="Views" />
              <Line type="monotone" dataKey="dislikes" stroke="#FF4444" strokeWidth={2} dot={false} name="Dislikes" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="font-mono text-sm text-white/30 text-center py-6">No engagement data yet.</p>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SLIDE 7: Traffic Timeline
// ═══════════════════════════════════════════════════════════
function TrafficSlide({ data, peak }: { data: TrafficHour[]; peak: TrafficHour }) {
  const maxCount = Math.max(...data.map((h) => h.count), 1);
  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <span className="font-mono text-[10px] text-white/40">
          Peak Hour: <strong className="text-terminal-green">{peak.label}</strong>
          <span className="text-white/50 ml-1">({peak.count} accesses)</span>
        </span>
      </div>
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,217,255,0.06)" vertical={false} />
            <XAxis dataKey="label" stroke="rgba(255,255,255,0.15)" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 8 }} tickLine={false} axisLine={false} interval={1} />
            <YAxis stroke="rgba(255,255,255,0.1)" tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 9 }} tickLine={false} axisLine={false} allowDecimals={false} />
            <Tooltip content={<ChartTooltip prefix="" />} cursor={{ fill: 'rgba(0,217,255,0.05)' }} />
            <Bar dataKey="count" radius={[2, 2, 0, 0]}>
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.count === peak.count ? '#00FF41' : '#00D9FF'} fillOpacity={entry.count === peak.count ? 1 : 0.5 + (entry.count / maxCount) * 0.5} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SLIDE 8: Device Analytics
// ═══════════════════════════════════════════════════════════
function DeviceSlide({ data }: { data: DeviceStats | null }) {
  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px] gap-3">
        <p className="font-mono text-sm text-white/30">Device tracking not available.</p>
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 max-w-md">
          <p className="font-mono text-[10px] text-warning-red/80 leading-relaxed">
            Missing: <code className="text-arc-blue">device_type</code> column in <code className="text-arc-blue">user_access_log</code>.<br />
            Run <code className="text-terminal-green">database/analytics_enhancement.sql</code> migration to enable.<br />
            After migration, device type is detected automatically from user-agent on each login.
          </p>
        </div>
      </div>
    );
  }

  const total = Object.values(data).reduce((s, v) => s + v, 0);
  const chartData = Object.entries(data)
    .filter(([, v]) => v > 0)
    .map(([name, value]) => ({ name: name.charAt(0).toUpperCase() + name.slice(1), value, percentage: total > 0 ? Math.round((value / total) * 100) : 0 }));

  const DEVICE_COLORS: Record<string, string> = {
    Desktop: '#00D9FF',
    Mobile: '#00FF41',
    Tablet: '#A78BFA',
    Unknown: '#666',
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div className="space-y-3 flex flex-col justify-center">
        {chartData.map((d) => (
          <div key={d.name}>
            <div className="flex items-center justify-between mb-0.5">
              <span className="font-mono text-xs text-white/70">{d.name}</span>
              <span className="font-mono text-xs text-white/40">{d.percentage}% ({d.value})</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-700" style={{ width: `${d.percentage}%`, backgroundColor: DEVICE_COLORS[d.name] || '#00D9FF' }} />
            </div>
          </div>
        ))}
      </div>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={chartData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent = 0 }) => `${name} ${(percent * 100).toFixed(0)}%`}>
              {chartData.map((entry, i) => (
                <Cell key={i} fill={DEVICE_COLORS[entry.name] || '#666'} stroke="rgba(0,0,0,0.3)" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SLIDE 9: Storage Analytics
// ═══════════════════════════════════════════════════════════
function StorageSlide({ data }: { data: AnalyticsData['storage'] }) {
  const providers = [
    { name: 'Supabase', ...data.supabase, color: '#00D9FF' },
    { name: 'Vercel Blob', ...data.vercelBlob, color: '#FBBF24' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {providers.map((p) => (
        <div key={p.name} className="bg-black/60 border border-white/10 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color, boxShadow: `0 0 6px ${p.color}` }} />
            <h3 className="font-orbitron text-xs tracking-wider text-white/80">{p.name}</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-mono text-[10px] text-white/40">Files</span>
              <span className="font-orbitron text-sm text-white">{p.fileCount}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-mono text-[10px] text-white/40">Used Space</span>
              <span className="font-orbitron text-sm" style={{ color: p.color }}>{formatBytes(p.usedSpace)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-mono text-[10px] text-white/40">Downloads</span>
              <span className="font-orbitron text-sm text-terminal-green">{p.downloads}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SLIDE 10: Content Performance
// ═══════════════════════════════════════════════════════════
function ContentPerfSlide({ data }: { data: ContentPerf[] }) {
  if (data.length === 0) return <EmptySlide message="No content performance data." />;

  const [sortKey, setSortKey] = useState<keyof ContentPerf>('engagementScore');
  const [sortDir, setSortDir] = useState<'desc' | 'asc'>('desc');

  const sorted = [...data].sort((a, b) => {
    const av = a[sortKey] as number;
    const bv = b[sortKey] as number;
    return sortDir === 'desc' ? bv - av : av - bv;
  });

  const toggleSort = (key: keyof ContentPerf) => {
    if (sortKey === key) setSortDir((d) => (d === 'desc' ? 'asc' : 'desc'));
    else { setSortKey(key); setSortDir('desc'); }
  };

  const SortHeader = ({ label, field }: { label: string; field: keyof ContentPerf }) => (
    <th
      className="pb-2 pr-2 cursor-pointer hover:text-arc-blue transition-colors select-none"
      onClick={() => toggleSort(field)}
    >
      <div className="flex items-center gap-1">
        {label}
        {sortKey === field && (
          <span className="text-[8px]">{sortDir === 'desc' ? '▼' : '▲'}</span>
        )}
      </div>
    </th>
  );

  return (
    <div className="overflow-x-auto max-h-[340px] overflow-y-auto">
      <table className="w-full text-left border-collapse text-[11px]">
        <thead className="sticky top-0 bg-black/90 backdrop-blur z-10">
          <tr className="border-b border-purple-400/20 text-purple-400/60 font-orbitron text-[9px] tracking-widest uppercase">
            <th className="pb-2 pr-2">Post</th>
            <SortHeader label="Views" field="views" />
            <SortHeader label="Likes" field="likes" />
            <SortHeader label="Dislikes" field="dislikes" />
            <SortHeader label="Reactions" field="reactionCount" />
            <SortHeader label="Downloads" field="downloads" />
            <SortHeader label="Score" field="engagementScore" />
          </tr>
        </thead>
        <tbody>
          {sorted.map((p) => (
            <tr key={p.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
              <td className="py-2 pr-2">
                <span className="font-mono text-white/80 truncate block max-w-[180px]">{p.title}</span>
              </td>
              <td className="py-2 pr-2 font-orbitron text-arc-blue">{p.views}</td>
              <td className="py-2 pr-2 font-orbitron text-terminal-green">{p.likes}</td>
              <td className="py-2 pr-2 font-orbitron text-warning-red">{p.dislikes}</td>
              <td className="py-2 pr-2 font-orbitron text-purple-400">{p.reactionCount}</td>
              <td className="py-2 pr-2 font-orbitron text-amber-400">{p.downloads}</td>
              <td className="py-2 pr-2">
                <span className={`font-orbitron text-xs px-1.5 py-0.5 rounded ${
                  p.engagementScore >= 50 ? 'bg-terminal-green/20 text-terminal-green' :
                  p.engagementScore >= 20 ? 'bg-arc-blue/20 text-arc-blue' :
                  'bg-white/10 text-white/50'
                }`}>
                  {p.engagementScore}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
