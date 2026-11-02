import {
  DOMAINS,
  skillScores,
  type Project,
  type Student,
} from "@/lib/hub/types";
export function Avatar({
  student,
  small = false,
}: {
  student: Student;
  small?: boolean;
}) {
  const colors = [
    "#32e3ec",
    "#ffa76a",
    "#a8afea",
    "#7edca2",
    "#efadc5",
    "#7eb6e8",
  ];
  const color = colors[student.name.charCodeAt(0) % colors.length];
  return (
    <span
      className={`hub-avatar ${small ? "small" : ""}`}
      style={{ color, borderColor: color }}
    >
      {student.avatar_url ? (
        <img src={student.avatar_url} alt="" />
      ) : (
        <span>
          {student.name
            .split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join("")}
        </span>
      )}
      {student.available && <i title="Available for collaboration" />}
    </span>
  );
}
export function Globe() {
  const dots = Array.from({ length: 380 }, (_, i) => {
    const a = i * 2.39996,
      y = 1 - (i / 379) * 2,
      r = Math.sqrt(1 - y * y);
    const x = Math.cos(a) * r,
      z = Math.sin(a) * r;
    return z > -0.18 ? (
      <circle
        key={i}
        cx={160 + x * 148}
        cy={160 + y * 148}
        r={z > 0.5 ? 1.3 : 0.7}
        opacity={0.2 + (z + 1) / 3}
      />
    ) : null;
  });
  return (
    <svg
      className="hub-globe"
      viewBox="0 0 320 320"
      fill="currentColor"
      aria-hidden="true"
    >
      <g fill="none" stroke="currentColor" strokeWidth=".6" opacity=".55">
        <circle cx="160" cy="160" r="149" />
        <ellipse cx="160" cy="160" rx="80" ry="149" />
        <ellipse cx="160" cy="160" rx="130" ry="149" />
        <ellipse cx="160" cy="160" rx="149" ry="50" />
        <ellipse cx="160" cy="160" rx="149" ry="108" />
        <path d="M11 160h298M160 11v298" />
      </g>
      {dots}
    </svg>
  );
}
export function Radar({
  student,
  projects,
}: {
  student: Student;
  projects: Project[];
}) {
  const scores = skillScores(student, projects);
  const point = (i: number, r: number) => [
    180 + Math.sin((i * Math.PI) / 3) * r,
    125 - Math.cos((i * Math.PI) / 3) * r,
  ];
  const polygon = (r: number) =>
    scores.map((_, i) => point(i, r).join(",")).join(" ");
  return (
    <div className="hub-radar">
      <svg
        viewBox="0 0 360 260"
        role="img"
        aria-label={`Skill evidence, scale zero to five. ${scores.map((s) => `${s.domain}: ${s.score}`).join(", ")}`}
      >
        {[20, 40, 60, 80, 100].map((r) => (
          <polygon
            key={r}
            points={polygon(r)}
            fill="none"
            stroke="#12545c"
            strokeWidth="1"
          />
        ))}
        {scores.map((s, i) => {
          const [x, y] = point(i, 100);
          return (
            <line
              key={s.domain}
              x1="180"
              y1="125"
              x2={x}
              y2={y}
              stroke="#20727b"
            />
          );
        })}
        <polygon
          points={scores
            .map((s, i) => point(i, s.score * 20).join(","))
            .join(" ")}
          fill="#00e6ed"
          fillOpacity=".18"
          stroke="#00eff5"
          strokeWidth="2"
        />
        {scores.map((s, i) => {
          const [x, y] = point(i, s.score * 20);
          const [lx, ly] = point(i, 119);
          return (
            <g key={s.domain}>
              <circle cx={x} cy={y} r="3.5" fill="#18f3f6" />
              <text
                x={lx}
                y={ly + 4}
                textAnchor={
                  i === 0 || i === 3 ? "middle" : i < 3 ? "start" : "end"
                }
                fill="#c4dfec"
                fontSize="12"
              >
                {s.domain === "Web Development" ? "Web Dev" : s.domain}
              </text>
            </g>
          );
        })}
      </svg>
      <p>Evidence / 5 · declared skill + approved projects</p>
    </div>
  );
}
export function Tags({ items }: { items: readonly string[] }) {
  return (
    <div className="hub-tags">
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}
export function DomainOptions() {
  return (
    <>
      {DOMAINS.map((d) => (
        <option key={d}>{d}</option>
      ))}
    </>
  );
}
