import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

function getAdmin() {
  if (!supabaseUrl || !serviceRoleKey) return null;
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

function todayRange() {
  const now = new Date();
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);
  return { start: start.toISOString(), end: end.toISOString() };
}

function thisWeekRange() {
  const now = new Date();
  const start = new Date(now);
  start.setDate(start.getDate() - start.getDay());
  start.setHours(0, 0, 0, 0);
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);
  return { start: start.toISOString(), end: end.toISOString() };
}

function last30Range() {
  const now = new Date();
  const start = new Date(now);
  start.setDate(start.getDate() - 29);
  start.setHours(0, 0, 0, 0);
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);
  return { start: start.toISOString(), end: end.toISOString() };
}

function last7Range() {
  const now = new Date();
  const start = new Date(now);
  start.setDate(start.getDate() - 6);
  start.setHours(0, 0, 0, 0);
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);
  return { start: start.toISOString(), end: end.toISOString() };
}

export async function GET() {
  const supabase = getAdmin();
  if (!supabase) {
    return NextResponse.json({ error: 'Service role not configured' }, { status: 500 });
  }

  try {
    const today = todayRange();
    const week = thisWeekRange();
    const last7 = last7Range();
    const last30 = last30Range();

    const yesterdayStart = new Date();
    yesterdayStart.setDate(yesterdayStart.getDate() - 1);
    yesterdayStart.setHours(0, 0, 0, 0);
    const yesterdayEnd = new Date();
    yesterdayEnd.setDate(yesterdayEnd.getDate() - 1);
    yesterdayEnd.setHours(23, 59, 59, 999);

    // ── Daily Active Users ──────────────────────────────────
    const [
      usersTodayRes,
      usersYesterdayRes,
      usersWeeklyRes,
      usersMonthlyRes,
      dailyTrendRes,
    ] = await Promise.all([
      supabase.from('user_access_log').select('user_id', { count: 'exact', head: true })
        .gte('accessed_at', today.start).lte('accessed_at', today.end),
      supabase.from('user_access_log').select('user_id', { count: 'exact', head: true })
        .gte('accessed_at', yesterdayStart.toISOString()).lte('accessed_at', yesterdayEnd.toISOString()),
      supabase.from('user_access_log').select('user_id')
        .gte('accessed_at', week.start),
      supabase.from('user_access_log').select('user_id')
        .gte('accessed_at', last30.start),
      supabase.from('user_access_log').select('access_date')
        .gte('accessed_at', last30.start),
    ]);

    const weeklyUnique = new Set((usersWeeklyRes.data ?? []).map((r: any) => r.user_id)).size;
    const monthlyUnique = new Set((usersMonthlyRes.data ?? []).map((r: any) => r.user_id)).size;

    const dailyUsers = {
      today: usersTodayRes.count ?? 0,
      yesterday: usersYesterdayRes.count ?? 0,
      weekly: weeklyUnique,
      monthly: monthlyUnique,
      trend: (dailyTrendRes.data ?? []).reduce<Record<string, number>>((acc, row: any) => {
        const key = row.access_date;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {}),
    };

    // ── Department Activity ─────────────────────────────────
    const { data: deptData } = await supabase
      .from('profiles')
      .select('department, login_count');

    const deptMap = new Map<string, number>();
    let totalDeptCount = 0;
    for (const p of (deptData ?? [])) {
      const dept = p.department || 'UNKNOWN';
      deptMap.set(dept, (deptMap.get(dept) || 0) + (p.login_count || 1));
      totalDeptCount += (p.login_count || 1);
    }
    const departmentActivity = Array.from(deptMap.entries())
      .map(([department, count]) => ({
        department,
        count,
        percentage: totalDeptCount > 0 ? Math.round((count / totalDeptCount) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count);

    // ── Top Active Users ────────────────────────────────────
    const { data: topProfiles } = await supabase
      .from('profiles')
      .select('id, name, email, department, login_count')
      .order('login_count', { ascending: false })
      .limit(20);

    const userIds = (topProfiles ?? []).map((p) => p.id);

    let postViewCounts: Record<string, number> = {};
    if (userIds.length > 0) {
      const { data: pvData } = await supabase
        .from('post_views')
        .select('user_id')
        .in('user_id', userIds);
      for (const row of (pvData ?? [])) {
        postViewCounts[row.user_id] = (postViewCounts[row.user_id] || 0) + 1;
      }
    }

    const topUsers = (topProfiles ?? []).map((p) => ({
      id: p.id,
      name: p.name || 'Unknown',
      email: p.email,
      department: p.department || '—',
      loginCount: p.login_count || 0,
      postViews: postViewCounts[p.id] || 0,
      downloads: 0,
    }));

    // ── Most Viewed Posts ───────────────────────────────────
    const { data: posts } = await supabase
      .from('admin_posts')
      .select('id, title, body, view_count, created_at')
      .order('view_count', { ascending: false })
      .limit(20);

    const postIds = (posts ?? []).map((p) => p.id);

    let likesMap: Record<string, number> = {};
    let dislikesMap: Record<string, number> = {};
    if (postIds.length > 0) {
      const { data: reactions } = await supabase
        .from('post_reactions')
        .select('post_id, reaction_type')
        .in('post_id', postIds);
      for (const r of (reactions ?? [])) {
        if (r.reaction_type === 'like') {
          likesMap[r.post_id] = (likesMap[r.post_id] || 0) + 1;
        } else if (r.reaction_type === 'dislike') {
          dislikesMap[r.post_id] = (dislikesMap[r.post_id] || 0) + 1;
        }
      }
    }

    let dlMap: Record<string, number> = {};
    if (postIds.length > 0) {
      const { data: fileMeta } = await supabase
        .from('file_metadata')
        .select('post_id, download_count')
        .in('post_id', postIds);
      for (const f of (fileMeta ?? [])) {
        dlMap[f.post_id!] = (dlMap[f.post_id!] || 0) + (f.download_count || 0);
      }
    }

    const mostViewedPosts = (posts ?? []).map((p) => ({
      id: p.id,
      title: p.title || p.body.slice(0, 80),
      body: p.body,
      views: p.view_count || 0,
      likes: likesMap[p.id] || 0,
      dislikes: dislikesMap[p.id] || 0,
      downloads: dlMap[p.id] || 0,
    }));

    // ── Most Downloaded Files ───────────────────────────────
    const { data: files } = await supabase
      .from('file_metadata')
      .select('id, file_name, file_url, storage_provider, download_count, created_at, post_id')
      .order('download_count', { ascending: false })
      .limit(20);

    const filePostIds = [...new Set((files ?? []).map((f) => f.post_id).filter(Boolean))];
    let postDeptMap: Record<string, string> = {};
    if (filePostIds.length > 0) {
      const { data: filePosts } = await supabase
        .from('admin_posts')
        .select('id, created_by')
        .in('id', filePostIds);
      const fileCreatedByIds = [...new Set((filePosts ?? []).map((p) => p.created_by).filter(Boolean))];
      if (fileCreatedByIds.length > 0) {
        const { data: uploaders } = await supabase
          .from('profiles')
          .select('id, department')
          .in('id', fileCreatedByIds);
        const deptById = Object.fromEntries((uploaders ?? []).map((u) => [u.id, u.department || '—']));
        for (const p of (filePosts ?? [])) {
          postDeptMap[p.id] = deptById[p.created_by!] || '—';
        }
      }
    }

    let fileViewCounts: Record<string, number> = {};
    if (filePostIds.length > 0) {
      const { data: fvData } = await supabase
        .from('post_views')
        .select('post_id', { count: 'exact', head: false })
        .in('post_id', filePostIds);
      for (const row of (fvData ?? [])) {
        fileViewCounts[row.post_id] = (fileViewCounts[row.post_id] || 0) + 1;
      }
    }

    const mostDownloadedFiles = (files ?? []).map((f) => ({
      id: f.id,
      fileName: f.file_name,
      department: f.post_id ? (postDeptMap[f.post_id] || '—') : '—',
      downloads: f.download_count || 0,
      views: f.post_id ? (fileViewCounts[f.post_id] || 0) : 0,
    }));

    // ── Engagement Analytics ────────────────────────────────
    const [likeCountRes, dislikeCountRes, emojiCountRes, totalViewsRes] = await Promise.all([
      supabase.from('post_reactions').select('id', { count: 'exact', head: true }).eq('reaction_type', 'like'),
      supabase.from('post_reactions').select('id', { count: 'exact', head: true }).eq('reaction_type', 'dislike'),
      supabase.from('post_reactions').select('id', { count: 'exact', head: true })
        .not('reaction_type', 'in', '("like","dislike")'),
      supabase.from('post_views').select('id', { count: 'exact', head: true }),
    ]);

    const totalLikes = likeCountRes.count ?? 0;
    const totalDislikes = dislikeCountRes.count ?? 0;
    const totalEmojis = emojiCountRes.count ?? 0;
    const totalViews = totalViewsRes.count ?? 0;

    // Engagement trend: daily likes/dislikes/views for last 30 days
    const { data: recentReactions } = await supabase
      .from('post_reactions')
      .select('reaction_type, created_at')
      .gte('created_at', last30.start);

    const { data: recentViews } = await supabase
      .from('post_views')
      .select('viewed_at')
      .gte('viewed_at', last30.start);

    const trendMap = new Map<string, { likes: number; dislikes: number; views: number }>();
    for (const r of (recentReactions ?? [])) {
      const day = r.created_at?.slice(0, 10);
      if (!day) continue;
      if (!trendMap.has(day)) trendMap.set(day, { likes: 0, dislikes: 0, views: 0 });
      const entry = trendMap.get(day)!;
      if (r.reaction_type === 'like') entry.likes++;
      else if (r.reaction_type === 'dislike') entry.dislikes++;
    }
    for (const v of (recentViews ?? [])) {
      const day = v.viewed_at?.slice(0, 10);
      if (!day) continue;
      if (!trendMap.has(day)) trendMap.set(day, { likes: 0, dislikes: 0, views: 0 });
      trendMap.get(day)!.views++;
    }

    const engagementTrend = Array.from(trendMap.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, vals]) => ({ date, ...vals }));

    // ── Traffic Timeline (hourly) ───────────────────────────
    const { data: hourlyData } = await supabase
      .from('user_access_log')
      .select('accessed_at')
      .gte('accessed_at', last7.start);

    const hourCounts = new Array(24).fill(0);
    for (const row of (hourlyData ?? [])) {
      if (row.accessed_at) {
        const hour = new Date(row.accessed_at).getHours();
        hourCounts[hour]++;
      }
    }

    const trafficTimeline = hourCounts.map((count, hour) => ({
      hour,
      count,
      label: hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`,
    }));

    const peakHour = trafficTimeline.reduce((max, h) => (h.count > max.count ? h : max), trafficTimeline[0]);

    // ── Device Analytics ────────────────────────────────────
    const { data: deviceData } = await supabase
      .from('user_access_log')
      .select('device_type')
      .gte('accessed_at', last30.start);

    const deviceMap: Record<string, number> = { desktop: 0, mobile: 0, tablet: 0, unknown: 0 };
    for (const row of (deviceData ?? [])) {
      const dt = row.device_type || 'unknown';
      deviceMap[dt] = (deviceMap[dt] || 0) + 1;
    }

    const hasDeviceData = Object.values(deviceMap).some((v) => v > 0);
    const deviceAnalytics = hasDeviceData ? deviceMap : null;

    // ── Storage Analytics ───────────────────────────────────
    const [supabaseFiles, vercelFiles] = await Promise.all([
      supabase.from('file_metadata').select('file_size, download_count')
        .eq('storage_provider', 'supabase').eq('is_active', true),
      supabase.from('file_metadata').select('file_size, download_count')
        .eq('storage_provider', 'vercel_blob').eq('is_active', true),
    ]);

    const calcStorage = (rows: any[]) => ({
      fileCount: rows.length,
      usedSpace: rows.reduce((s, r) => s + (Number(r.file_size) || 0), 0),
      downloads: rows.reduce((s, r) => s + (r.download_count || 0), 0),
    });

    const storage = {
      supabase: calcStorage(supabaseFiles.data ?? []),
      vercelBlob: calcStorage(vercelFiles.data ?? []),
    };

    // ── Content Performance ─────────────────────────────────
    const { data: allPosts } = await supabase
      .from('admin_posts')
      .select('id, title, body, view_count')
      .order('view_count', { ascending: false })
      .limit(50);

    const allPostIds = (allPosts ?? []).map((p) => p.id);

    let likesAll: Record<string, number> = {};
    let dislikesAll: Record<string, number> = {};
    let emojiAll: Record<string, number> = {};
    if (allPostIds.length > 0) {
      const { data: allReactions } = await supabase
        .from('post_reactions')
        .select('post_id, reaction_type')
        .in('post_id', allPostIds);
      for (const r of (allReactions ?? [])) {
        if (r.reaction_type === 'like') likesAll[r.post_id] = (likesAll[r.post_id] || 0) + 1;
        else if (r.reaction_type === 'dislike') dislikesAll[r.post_id] = (dislikesAll[r.post_id] || 0) + 1;
        else emojiAll[r.post_id] = (emojiAll[r.post_id] || 0) + 1;
      }
    }

    let dlAll: Record<string, number> = {};
    if (allPostIds.length > 0) {
      const { data: allFileMeta } = await supabase
        .from('file_metadata')
        .select('post_id, download_count')
        .in('post_id', allPostIds);
      for (const f of (allFileMeta ?? [])) {
        dlAll[f.post_id!] = (dlAll[f.post_id!] || 0) + (f.download_count || 0);
      }
    }

    const contentPerformance = (allPosts ?? []).map((p) => {
      const views = p.view_count || 0;
      const likes = likesAll[p.id] || 0;
      const dislikes = dislikesAll[p.id] || 0;
      const reactionCount = emojiAll[p.id] || 0;
      const downloads = dlAll[p.id] || 0;
      const engagementScore = views > 0
        ? Math.round(((likes + reactionCount + downloads) / views) * 100)
        : 0;
      return {
        id: p.id,
        title: p.title || p.body.slice(0, 80),
        views,
        downloads,
        likes,
        dislikes,
        reactionCount,
        engagementScore,
      };
    });

    // ── Poll Analytics ─────────────────────────────────────
    const [totalPollsRes, totalVotesRes, activePollsRes] = await Promise.all([
      supabase.from('polls').select('id', { count: 'exact', head: true }),
      supabase.from('poll_votes').select('id', { count: 'exact', head: true }),
      supabase.from('polls').select('id', { count: 'exact', head: true }).eq('status', 'active'),
    ]);

    const { data: pollVoteData } = await supabase
      .from('poll_votes')
      .select('user_id');

    const { data: allPolls } = await supabase
      .from('polls')
      .select('id, question, status')
      .order('created_at', { ascending: false })
      .limit(50);

    // Most active poll
    let mostActivePoll: { question: string; total_votes: number } | null = null;
    if (allPolls && allPolls.length > 0) {
      const pollIds = allPolls.map((p) => p.id);
      const { data: voteCounts } = await supabase
        .from('poll_votes')
        .select('poll_id');
      const voteMap: Record<string, number> = {};
      for (const v of (voteCounts ?? [])) {
        voteMap[v.poll_id] = (voteMap[v.poll_id] || 0) + 1;
      }
      let maxVotes = 0;
      for (const p of allPolls) {
        const vc = voteMap[p.id] || 0;
        if (vc > maxVotes) {
          maxVotes = vc;
          mostActivePoll = { question: p.question, total_votes: vc };
        }
      }
    }

    // Department-wise participation
    const uniqueVoterIds = [...new Set((pollVoteData ?? []).map((v: any) => v.user_id))];
    let deptParticipation: { department: string; votes: number }[] = [];
    if (uniqueVoterIds.length > 0) {
      const { data: voterProfiles } = await supabase
        .from('profiles')
        .select('id, department')
        .in('id', uniqueVoterIds);
      const deptVoteMap: Record<string, number> = {};
      for (const p of (voterProfiles ?? [])) {
        const dept = p.department || 'UNKNOWN';
        deptVoteMap[dept] = (deptVoteMap[dept] || 0) + 1;
      }
      deptParticipation = Object.entries(deptVoteMap)
        .map(([department, votes]) => ({ department, votes }))
        .sort((a, b) => b.votes - a.votes);
    }

    const totalPolls = totalPollsRes.count ?? 0;
    const totalPollVotes = totalVotesRes.count ?? 0;
    const activePollsCount = activePollsRes.count ?? 0;

    // Participation rate (unique voters / total profiles)
    const { count: totalProfiles } = await supabase
      .from('profiles')
      .select('id', { count: 'exact', head: true });

    const participationRate = totalProfiles && totalProfiles > 0
      ? Math.round((uniqueVoterIds.length / totalProfiles) * 100)
      : 0;

    const pollAnalytics = {
      totalPolls,
      totalVotes: totalPollVotes,
      activePollsCount,
      mostActivePoll,
      deptParticipation,
      participationRate,
    };

    return NextResponse.json({
      pollAnalytics,
      dailyUsers,
      departmentActivity,
      topUsers,
      mostViewedPosts,
      mostDownloadedFiles,
      engagement: {
        totalLikes,
        totalDislikes,
        totalEmojis,
        totalViews,
        trend: engagementTrend,
      },
      trafficTimeline,
      peakHour,
      deviceAnalytics,
      storage,
      contentPerformance,
    });
  } catch (err: any) {
    console.error('Analytics aggregation error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
