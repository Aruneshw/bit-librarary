export interface TitleTier {
  day: number;
  title: string;
}

export const TITLE_PROGRESSION: TitleTier[] = [
  { day: 2, title: 'Traveller' },
  { day: 4, title: 'Wanderer' },
  { day: 7, title: 'Explorer' },
  { day: 10, title: 'Seeker' },
  { day: 14, title: 'Pathfinder' },
  { day: 18, title: 'Scout' },
  { day: 22, title: 'Adventurer' },
  { day: 26, title: 'Researcher' },
  { day: 30, title: 'Scholar' },
  { day: 35, title: 'Knowledge Hunter' },
  { day: 40, title: 'Analyst' },
  { day: 45, title: 'Strategist' },
  { day: 50, title: 'Thinker' },
  { day: 55, title: 'Problem Solver' },
  { day: 60, title: 'Sage' },
  { day: 65, title: 'Academic Sage' },
  { day: 70, title: 'Mentor' },
  { day: 75, title: 'Guide' },
  { day: 80, title: 'Master Guide' },
  { day: 85, title: 'Visionary' },
  { day: 90, title: 'Architect' },
  { day: 95, title: 'Knowledge Architect' },
  { day: 100, title: 'Elite Scholar' },
  { day: 105, title: 'Grand Scholar' },
  { day: 110, title: 'Academic Guardian' },
  { day: 115, title: 'Wisdom Keeper' },
  { day: 120, title: 'Knowledge Keeper' },
  { day: 125, title: 'Library Guardian' },
  { day: 130, title: 'Digital Sage' },
  { day: 135, title: 'Wisdom Architect' },
  { day: 140, title: 'Master Researcher' },
  { day: 145, title: 'Elite Researcher' },
  { day: 150, title: 'Master Scholar' },
  { day: 155, title: 'Grand Sage' },
  { day: 160, title: 'Knowledge Champion' },
  { day: 165, title: 'Learning Champion' },
  { day: 170, title: 'Academic Champion' },
  { day: 175, title: 'Wisdom Champion' },
  { day: 180, title: 'Legendary Scholar' },
  { day: 185, title: 'Legendary Sage' },
  { day: 190, title: 'Legendary Researcher' },
  { day: 195, title: 'Legendary Mentor' },
  { day: 200, title: 'Library Legend' },
  { day: 205, title: 'Knowledge Legend' },
  { day: 210, title: 'Wisdom Legend' },
  { day: 215, title: 'Academic Legend' },
  { day: 220, title: 'Digital Legend' },
  { day: 225, title: 'Master of Learning' },
  { day: 230, title: 'Master of Wisdom' },
  { day: 235, title: 'Master of Knowledge' },
  { day: 240, title: 'Master of Research' },
  { day: 245, title: 'Master of Academics' },
  { day: 250, title: 'Supreme Scholar' },
  { day: 255, title: 'Supreme Sage' },
  { day: 260, title: 'Supreme Mentor' },
  { day: 265, title: 'Supreme Architect' },
  { day: 270, title: 'Supreme Researcher' },
  { day: 275, title: 'Supreme Guardian' },
  { day: 280, title: 'Supreme Legend' },
  { day: 285, title: 'Mythic Scholar' },
  { day: 290, title: 'Mythic Sage' },
  { day: 295, title: 'Mythic Architect' },
  { day: 300, title: 'Mythic Researcher' },
  { day: 305, title: 'Mythic Guardian' },
  { day: 310, title: 'Mythic Legend' },
  { day: 315, title: 'Eternal Scholar' },
  { day: 320, title: 'Eternal Sage' },
  { day: 325, title: 'Eternal Mentor' },
  { day: 330, title: 'Eternal Architect' },
  { day: 335, title: 'Eternal Researcher' },
  { day: 340, title: 'Eternal Guardian' },
  { day: 345, title: 'Eternal Legend' },
  { day: 350, title: 'Chronicle Keeper' },
  { day: 352, title: 'Archive Master' },
  { day: 354, title: 'Wisdom Emperor' },
  { day: 356, title: 'Knowledge Emperor' },
  { day: 358, title: 'Academic Emperor' },
  { day: 360, title: 'Library Emperor' },
  { day: 361, title: 'Digital Emperor' },
  { day: 362, title: 'Master of Time' },
  { day: 363, title: 'Keeper of Knowledge' },
  { day: 364, title: 'Guardian of Wisdom' },
  { day: 365, title: 'BIT Library Immortal' },
];

export function getTitleForDay(days: number): string {
  let result = 'Newcomer';
  for (const tier of TITLE_PROGRESSION) {
    if (days >= tier.day) {
      result = tier.title;
    }
  }
  return result;
}

export function getNextTitle(currentDay: number): TitleTier | null {
  for (const tier of TITLE_PROGRESSION) {
    if (tier.day > currentDay) {
      return tier;
    }
  }
  return null;
}

export function getTitleColor(title: string): string {
  const tier = TITLE_PROGRESSION.find((t) => t.title === title);
  if (!tier) return 'text-white/70';
  if (tier.day >= 350) return 'text-yellow-300';
  if (tier.day >= 250) return 'text-purple-400';
  if (tier.day >= 150) return 'text-amber-400';
  if (tier.day >= 60) return 'text-terminal-green';
  if (tier.day >= 14) return 'text-arc-blue';
  return 'text-white/70';
}
