'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { fetchAccessData, type DailyAccessPoint, type AccessRange } from '@/lib/dailyAccess';

const RANGE_OPTIONS: { key: AccessRange; label: string }[] = [
  { key: 'today', label: 'Today' },
  { key: 'yesterday', label: 'Yesterday' },
  { key: 'week', label: 'Week' },
  { key: 'month', label: 'Month' },
];

function formatTime(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function formatShort(dateStr: string, range: AccessRange): string {
  const d = new Date(dateStr + 'T00:00:00');
  if (range === 'today') return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  if (range === 'yesterday') return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: { payload: DailyAccessPoint }[];
  label?: string;
  range: AccessRange;
}

function CustomTooltip({ active, payload, range }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;
  const d = payload[0].payload;
  return (
    <div className="bg-black/95 border border-arc-blue/50 rounded-lg px-4 py-3 shadow-[0_0_20px_rgba(0,217,255,0.2)] backdrop-blur-xl">
      <p className="font-orbitron text-[10px] text-arc-blue/70 tracking-wider uppercase">
        {range === 'today' ? formatTime(d.date) : new Date(d.date + 'T00:00:00').toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}
      </p>
      <p className="font-orbitron text-lg text-white mt-1" style={{ textShadow: '0 0 8px rgba(0,217,255,0.6)' }}>
        {d.count}
      </p>
      <p className="font-mono text-[10px] text-white/40">unique users</p>
    </div>
  );
}

export default function DailyAccessChart() {
  const [range, setRange] = useState<AccessRange>('week');
  const [data, setData] = useState<DailyAccessPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [peakValue, setPeakValue] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const load = useCallback(async (r: AccessRange) => {
    setLoading(true);
    const points = await fetchAccessData(r);
    setData(points);
    setPeakValue(points.reduce((max, p) => Math.max(max, p.count), 0));
    setLoading(false);
  }, []);

  useEffect(() => {
    load(range);
  }, [range, load]);

  useEffect(() => {
    intervalRef.current = setInterval(() => load(range), 30000);
    return () => { if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; } };
  }, [range, load]);

  const avg = data.length ? Math.round(data.reduce((s, p) => s + p.count, 0) / data.length) : 0;
  const total = data.reduce((s, p) => s + p.count, 0);

  return (
    <div className="bg-black/40 border border-arc-blue/20 rounded-xl backdrop-blur-md overflow-hidden shadow-[0_0_30px_rgba(0,217,255,0.05)]">
      <div className="p-6 border-b border-arc-blue/20 bg-arc-blue/5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-orbitron text-xl text-white tracking-wider flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-arc-blue shadow-[0_0_8px_rgba(0,217,255,1)] animate-pulse" />
              Daily System Access
            </h2>
            <p className="font-mono text-[10px] text-white/40 mt-1">Unique users per day — live updating every 30s</p>
          </div>
          <div className="flex gap-1 bg-black/60 border border-arc-blue/20 rounded-lg p-1">
            {RANGE_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setRange(opt.key)}
                className={`px-3 py-1.5 font-orbitron text-xs tracking-wider rounded-md transition-all ${
                  range === opt.key
                    ? 'bg-arc-blue/20 text-arc-blue shadow-[0_0_8px_rgba(0,217,255,0.2)]'
                    : 'text-text-white/50 hover:text-text-white/80'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Mini stat cards */}
        <div className="flex gap-4 mb-6">
          <div>
            <p className="font-mono text-[9px] text-white/40 uppercase tracking-wider">Total</p>
            <p className="font-orbitron text-lg text-white">{loading ? '...' : total}</p>
          </div>
          <div>
            <p className="font-mono text-[9px] text-white/40 uppercase tracking-wider">Average</p>
            <p className="font-orbitron text-lg text-arc-blue">{loading ? '...' : avg}</p>
          </div>
          <div>
            <p className="font-mono text-[9px] text-white/40 uppercase tracking-wider">Peak</p>
            <p className="font-orbitron text-lg text-terminal-green">{loading ? '...' : peakValue}</p>
          </div>
        </div>

        {/* Chart */}
        {loading ? (
          <div className="h-[250px] sm:h-[320px] flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 rounded-full border-2 border-arc-blue/40 border-t-arc-blue animate-spin" />
              <p className="font-mono text-xs text-arc-blue/40">Loading chart data...</p>
            </div>
          </div>
        ) : data.length === 0 || data.every((d) => d.count === 0) ? (
          <div className="h-[250px] sm:h-[320px] flex items-center justify-center">
            <p className="font-mono text-sm text-white/30">No access data for this period yet.</p>
          </div>
        ) : (
          <div className="h-[250px] sm:h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="accessGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00D9FF" stopOpacity={0.45} />
                    <stop offset="50%" stopColor="#00D9FF" stopOpacity={0.15} />
                    <stop offset="100%" stopColor="#00D9FF" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="peakGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00FF41" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#00FF41" stopOpacity={0.05} />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(0,217,255,0.08)"
                  vertical={false}
                />

                <XAxis
                  dataKey="date"
                  tickFormatter={(val: string) => formatShort(val, range)}
                  stroke="rgba(255,255,255,0.2)"
                  tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 10, fontFamily: 'JetBrains Mono, monospace' }}
                  tickLine={false}
                  axisLine={false}
                  interval="preserveStartEnd"
                  minTickGap={range === 'month' ? 3 : 1}
                />

                <YAxis
                  stroke="rgba(255,255,255,0.15)"
                  tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontFamily: 'JetBrains Mono, monospace' }}
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                />

                <Tooltip content={<CustomTooltip range={range} />} cursor={{ stroke: 'rgba(0,217,255,0.3)', strokeWidth: 1, strokeDasharray: '4 4' }} />

                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#00D9FF"
                  strokeWidth={2.5}
                  fill="url(#accessGradient)"
                  animationDuration={800}
                  animationEasing="ease-out"
                  dot={(props: any) => {
                    const { cx, cy, index } = props;
                    const isPeak = data[index]?.count === peakValue && peakValue > 0;
                    const isZero = data[index]?.count === 0;
                    if (isZero) return null;
                    return (
                      <circle
                        key={index}
                        cx={cx}
                        cy={cy}
                        r={isPeak ? 5 : 3}
                        fill={isPeak ? '#00FF41' : '#00D9FF'}
                        stroke={isPeak ? '#00FF41' : '#00D9FF'}
                        strokeWidth={isPeak ? 2 : 1}
                        filter={isPeak ? 'url(#glow)' : undefined}
                      />
                    );
                  }}
                  activeDot={{ r: 6, fill: '#00D9FF', stroke: '#fff', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
