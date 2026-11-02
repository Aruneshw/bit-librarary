import type { CSSProperties } from "react";
const paths: Record<string, string> = {
  Home: "M3 10 12 3l9 7M5 9v12h5v-7h4v7h5V9",
  Explore: "M21 21l-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0",
  Chat: "M21 4H3v14h5l4 4v-4h9zM7 10h.01M12 10h.01M17 10h.01",
  Teams:
    "M16 21v-3a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v3M9 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8M18 3a4 4 0 0 1 0 8M22 21v-3a4 4 0 0 0-3-4",
  Hackathons:
    "M7 3h10v7a5 5 0 0 1-10 0zM7 5H3v3a4 4 0 0 0 4 4M17 5h4v3a4 4 0 0 1-4 4M12 15v6M8 21h8",
  Projects: "m7 6-6 6 6 6M17 6l6 6-6 6M14 3l-4 18",
  Leaderboard: "M3 13h4v9H3zM10 3h4v19h-4zM17 8h4v14h-4z",
  Courses: "M12 5C8 2 3 3 2 4v16c4-2 7-1 10 1 3-2 6-3 10-1V4c-3-2-7-1-10 1v16",
  Profile:
    "M20 21v-3a5 5 0 0 0-5-5H9a5 5 0 0 0-5 5v3zM16 6a4 4 0 1 1-8 0 4 4 0 0 1 8 0",
  Bell: "M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4",
  Arrow: "M4 12h16m-6-6 6 6-6 6",
  Send: "m22 2-7 20-4-9-9-4zM11 13 22 2",
  Plus: "M12 4v16M4 12h16",
  Close: "m6 6 12 12M6 18 18 6",
  Cube: "m12 2 10 5v10l-10 5L2 17V7zM2 7l10 5 10-5M12 12v10M7 4.5l10 5v5l-5 3-5-3v-5l10-5",
  Star: "m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3z",
  Check: "m4 12 5 5L20 6",
  Menu: "M3 6h18M3 12h18M3 18h18",
  Globe:
    "M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0M2 12h20M12 2c-6 6-6 14 0 20 6-6 6-14 0-20",
};
export default function HubIcon({
  name,
  size = 22,
  style,
}: {
  name: string;
  size?: number;
  style?: CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={style}
    >
      <path d={paths[name] || paths.Projects} />
    </svg>
  );
}
