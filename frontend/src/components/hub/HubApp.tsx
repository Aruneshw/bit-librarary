"use client";
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import Link from "next/link";
import {
  DOMAINS,
  rankStudents,
  safeUrl,
  type HubPage,
  type Project,
  type Room,
  type Student,
} from "@/lib/hub/types";
import { hubClient } from "@/lib/hub/client";
import { useHub } from "./useHub";
import Icon from "./HubIcon";
import { Avatar, DomainOptions, Globe, Radar, Tags } from "./HubVisuals";
import "./hub.css";
const NAV: HubPage[] = [
  "Home",
  "Explore",
  "Chat",
  "Teams",
  "Hackathons",
  "Projects",
  "Leaderboard",
  "Profile",
];
function Panel({
  title,
  children,
  action,
  className = "",
}: {
  title: string;
  children: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <section className={`hub-panel ${className}`}>
      <div className="hub-panel-heading">
        <h2>
          {title} <i className="hub-dot" />
        </h2>
        {action}
      </div>
      {children}
    </section>
  );
}
function Modal({
  title,
  children,
  close,
}: {
  title: string;
  children: ReactNode;
  close: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    ref.current?.showModal();
  }, []);
  return (
    <dialog
      ref={ref}
      className="hub-modal"
      onCancel={close}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <header>
        <h2>{title}</h2>
        <button type="button" aria-label="Close dialog" onClick={close}>
          <Icon name="Close" />
        </button>
      </header>
      {children}
    </dialog>
  );
}
function NameTicker({ name }: { name: string }) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 9000);
    return () => window.clearTimeout(timer);
  }, []);
  if (!name || !visible) return null;
  return (
    <em className="hub-user-marquee" aria-hidden="true">
      <span>{name.toUpperCase()}</span>
    </em>
  );
}
function Cover({ project }: { project: Project }) {
  const [url, setUrl] = useState("");
  useEffect(() => {
    let active = true;
    if (!project.cover_path) return;
    if (
      project.cover_path.startsWith("data:image/") ||
      project.cover_path.startsWith("https://") ||
      project.cover_path.startsWith("/api/")
    )
      return;
    hubClient()
      ?.storage.from("hub-covers")
      .createSignedUrl(project.cover_path, 3600)
      .then(({ data }) => {
        if (active && data) setUrl(data.signedUrl);
      });
    return () => {
      active = false;
    };
  }, [project.cover_path]);
  const directUrl =
    project.cover_path?.startsWith("data:image/") ||
    project.cover_path?.startsWith("https://") ||
    project.cover_path?.startsWith("/api/");
  const displayUrl = directUrl ? project.cover_path : url;
  return displayUrl ? (
    <img
      className="hub-project-cover"
      src={displayUrl}
      alt={`${project.title} cover`}
    />
  ) : (
    <div className="hub-project-placeholder">
      <Icon name="Projects" size={42} />
      <span>{project.category}</span>
    </div>
  );
}
export default function HubApp() {
  const hub = useHub();
  const { data, userId, demo, busy, identityName, identityAvatar } = hub;
  const [page, setPage] = useState<HubPage>("Home");
  const [query, setQuery] = useState("");
  const [domain, setDomain] = useState("All");
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [year, setYear] = useState("All");
  const [menu, setMenu] = useState(false);
  const [modal, setModal] = useState<
    "project" | "room" | "profile" | "notifications" | null
  >(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [roomKind, setRoomKind] = useState<"bubble" | "team">("bubble");
  const [draft, setDraft] = useState("");
  const [time, setTime] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const messageEnd = useRef<HTMLDivElement>(null);
  const me = data.students.find((s) => s.id === userId);
  const displayName = (me?.name || identityName || "").trim();
  const headerStudent: Student | null = me
    ? { ...me, avatar_url: me.avatar_url || identityAvatar }
    : identityAvatar && displayName
      ? {
          id: userId || "oauth-user",
          name: displayName,
          department: "",
          college: "",
          year: 1,
          bio: "",
          skills: [],
          available: true,
          avatar_url: identityAvatar,
          github_url: "",
          xp: 0,
          project_count: 0,
          achievement_count: 0,
          visibility: "campus",
        }
      : null;
  const ranked = rankStudents(data.students);
  const myRank = data.summary ? data.summary.rank : ranked.findIndex((s) => s.id === userId) + 1;
  const room = data.rooms.find((r) => r.id === hub.activeRoom);
  const unread = data.notifications.filter((n) => !n.read_at).length;
  const search = query.toLowerCase();
  const filteredStudents = data.students.filter(
    (s) =>
      s.id !== userId &&
      (domain === "All" || s.skills.includes(domain)) &&
      (!onlyAvailable || s.available) &&
      (year === "All" || s.year === Number(year)) &&
      `${s.name} ${s.skills.join(" ")} ${s.department} ${s.bio}`
        .toLowerCase()
        .includes(search),
  );
  const shownProjects = data.projects.filter(
    (p) =>
      p.status !== "archived" &&
      `${p.title} ${p.technologies.join(" ")} ${p.category}`
        .toLowerCase()
        .includes(search) &&
      (domain === "All" || p.category === domain),
  );
  const act = (promise: Promise<unknown>) => {
    void promise.catch(() => {});
  };
  function navigate(next: HubPage) {
    setPage(next);
    setMenu(false);
    setDomain("All");
    setQuery("");
    setSelectedStudent(null);
  }
  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("en-IN", {
          hour12: false,
          timeZone: "Asia/Kolkata",
        }),
      );
    update();
    const timer = setInterval(update, 1000);
    const key = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        !["INPUT", "TEXTAREA", "SELECT"].includes(
          (e.target as HTMLElement).tagName,
        )
      ) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", key);
    return () => {
      clearInterval(timer);
      window.removeEventListener("keydown", key);
    };
  }, []);
  useEffect(() => {
    messageEnd.current?.scrollIntoView({ block: "nearest" });
  }, [hub.messages.length, hub.activeRoom]);
  function openRoom(r: Room) {
    act(
      hub.joinRoom(r).then(() => {
        setPage("Chat");
        setQuery("");
      }),
    );
  }
  function createRoom(kind: "bubble" | "team") {
    if (!me) {
      setModal("profile");
      return;
    }
    setRoomKind(kind);
    setModal("room");
  }
  function openProfile(s: Student) {
    setSelectedStudent(s);
    setPage("Profile");
  }
  function studentCard(s: Student) {
    const connection = data.connections.find(
      (c) =>
        (c.sender_id === userId && c.recipient_id === s.id) ||
        (c.recipient_id === userId && c.sender_id === s.id),
    );
    return (
      <article className="hub-student" key={s.id}>
        <div className="hub-student-top">
          <button
            className="hub-avatar-button"
            aria-label={`View ${s.name}'s profile`}
            onClick={() => openProfile(s)}
          >
            <Avatar student={s} />
          </button>
          <div>
            <button className="hub-name" onClick={() => openProfile(s)}>
              {s.name}
            </button>
            <p>
              {s.department} · {s.college}
            </p>
          </div>
          <span className="hub-year">Year {s.year}</span>
        </div>
        <p className="hub-bio">{s.bio}</p>
        <Tags items={s.skills.slice(0, 4)} />
        <div className="hub-card-stats">
          <span>
            <Icon name="Projects" size={17} />
            {s.project_count} Projects
          </span>
          <span>
            <Icon name="Star" size={16} />
            {s.xp} XP
          </span>
        </div>
        <div className="hub-card-actions">
          <button
            className="hub-button"
            disabled={busy || !!connection}
            onClick={() => {
              if (!me) setModal("profile");
              else act(hub.connect(s));
            }}
          >
            <Icon name={connection ? "Check" : "Send"} size={17} />
            {connection
              ? connection.status === "accepted"
                ? "Connected"
                : "Requested"
              : "Connect"}
          </button>
          <button
            className="hub-more"
            aria-label={`More about ${s.name}`}
            onClick={() => openProfile(s)}
          >
            ···
          </button>
        </div>
      </article>
    );
  }
  function filters() {
    return (
      <div className="hub-filters" aria-label="Filter by skill">
        {["All", ...DOMAINS.slice(0, 6)].map((d) => (
          <button
            key={d}
            className={domain === d ? "selected" : ""}
            aria-pressed={domain === d}
            onClick={() => setDomain(d)}
          >
            {d}
          </button>
        ))}
      </div>
    );
  }
  function eventRows(limit?: number) {
    const events = data.events
      .filter((e) =>
        `${e.title} ${e.tags.join(" ")}`.toLowerCase().includes(search),
      )
      .slice(0, limit);
    return events.length ? (
      <div className="hub-events">
        {events.map((e) => (
          <article key={e.id}>
            <div className="hub-date">
              <span>
                {new Date(e.starts_at).toLocaleDateString("en", {
                  month: "short",
                  timeZone: "Asia/Kolkata",
                })}
              </span>
              <b>
                {new Date(e.starts_at).toLocaleDateString("en", {
                  day: "2-digit",
                  timeZone: "Asia/Kolkata",
                })}
              </b>
            </div>
            <div className="hub-event-info">
              <h3>{e.title}</h3>
              <Tags items={e.tags} />
            </div>
            <div className="hub-event-meta">
              <span>
                <i
                  className={`hub-dot ${e.location === "Online" ? "" : "amber"}`}
                />
                {e.location}
              </span>
              {e.url && safeUrl(e.url) ? (
                <a href={safeUrl(e.url)} target="_blank" rel="noreferrer">
                  Event details ↗
                </a>
              ) : (
                <button
                  onClick={() => {
                    setQuery(e.tags[0] || "");
                    navigate("Chat");
                  }}
                >
                  {demo ? "Sample event · find a team" : "Find a team"}{" "}
                  <Icon name="Arrow" size={14} />
                </button>
              )}
            </div>
          </article>
        ))}
      </div>
    ) : (
      <p className="hub-empty">
        No upcoming hackathons yet. Start a discussion bubble while you wait.
      </p>
    );
  }
  function projectsGrid(projects: Project[]) {
    return projects.length ? (
      <div className="hub-project-grid">
        {projects.map((p) => (
          <article className="hub-project" key={p.id}>
            <button
              className="hub-cover-button"
              aria-label={`View ${p.title}`}
              onClick={() => setSelectedProject(p)}
            >
              <Cover project={p} />
            </button>
            <div className="hub-project-body">
              <div className="hub-row">
                <h3>
                  <button onClick={() => setSelectedProject(p)}>
                    {p.title}
                  </button>
                </h3>
                <span className={`hub-status ${p.status}`}>{p.status}</span>
              </div>
              <p>{p.description}</p>
              <Tags items={p.technologies} />
              <div className="hub-row">
                <span>
                  {data.students.find((s) => s.id === p.owner_id)?.name ||
                    "Student"}
                </span>
                <span className="hub-cyan">
                  {p.status === "approved" ? "+5 XP" : "Awaiting review"}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    ) : (
      <div className="hub-empty">
        <Icon name="Projects" size={30} />
        <p>No projects here yet. Share what you’re building.</p>
        <button
          className="hub-button"
          onClick={() => setModal(me ? "project" : "profile")}
        >
          Share a project
        </button>
      </div>
    );
  }
  const profile = selectedStudent || me;
  async function submitProject(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const cover = form.get("cover") as File;
    await hub.addProject(
      {
        title: String(form.get("title")).trim(),
        description: String(form.get("description")).trim(),
        category: String(form.get("category")),
        technologies: String(form.get("technologies"))
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        repository_url: String(form.get("repository_url")).trim(),
        demo_url: String(form.get("demo_url")).trim(),
      },
      cover.size ? cover : null,
    );
    setModal(null);
    setPage("Projects");
  }
  async function submitRoom(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    await hub.createRoom({
      name: String(form.get("name")).trim(),
      description: String(form.get("description")).trim(),
      category: String(form.get("category")),
      capacity: Number(form.get("capacity")),
      kind: roomKind,
    });
    setModal(null);
    setPage("Chat");
  }
  async function submitProfile(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    await hub.saveProfile({
      name: String(form.get("name")).trim(),
      department: String(form.get("department")).trim(),
      college: String(form.get("college")).trim(),
      year: Number(form.get("year")),
      bio: String(form.get("bio")).trim(),
      skills: form.getAll("skills").map(String),
      available: form.get("available") === "on",
      avatar_url: me?.avatar_url || identityAvatar || null,
      github_url: String(form.get("github_url")).trim(),
      visibility: String(form.get("visibility")),
    });
    setModal(null);
  }
  return (
    <div className="hub-root">
      <a href="#hub-main" className="hub-skip">
        Skip to content
      </a>
      <header className="hub-header">
        <button
          className="hub-mobile-menu"
          aria-label="Toggle navigation"
          aria-expanded={menu}
          onClick={() => setMenu(!menu)}
        >
          <Icon name="Menu" />
        </button>
        <Link href="/hub" className="hub-brand">
          <Icon name="Cube" size={43} />
          <span>
            <b>BIT HUB</b>
            <small>STUDENT COLLABORATION PLATFORM</small>
            {displayName && (
              <NameTicker key={displayName} name={displayName} />
            )}
          </span>
        </Link>
        <form
          className="hub-search"
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            setPage("Explore");
          }}
        >
          <Icon name="Explore" size={22} />
          <input
            ref={searchRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (page === "Home") setPage("Explore");
            }}
            placeholder="Search students, projects, teams, hackathons…"
            aria-label="Search BIT HUB"
          />
          <kbd>/</kbd>
        </form>
        <div className="hub-header-right">
          <span className="hub-clock">{time || "──:──:──"} IST</span>
          <span className="hub-online">
            <i className="hub-dot" />
            {demo ? "DEMO" : hub.loading ? "LOADING" : "CAMPUS"}
          </span>
          <button
            className="hub-bell"
            aria-label={`Notifications, ${unread} unread`}
            onClick={() => setModal("notifications")}
          >
            <Icon name="Bell" />
            {unread > 0 && <i />}
          </button>
          <button className="hub-account" onClick={() => navigate("Profile")}>
            {headerStudent && <Avatar student={headerStudent} small />}
            <span>
              <b>{displayName || "YOUR PROFILE"}</b>
              <small>
                {me?.department ||
                  (displayName ? "BIT student" : "Join the community")}
              </small>
            </span>
            <span>⌄</span>
          </button>
          {!demo && (
            <button
              className="hub-signout"
              aria-label="Sign out"
              title="Sign out"
              disabled={busy}
              onClick={() => act(hub.signOut())}
            >
              <Icon name="SignOut" size={18} />
            </button>
          )}
        </div>
      </header>
      <aside className={`hub-sidebar ${menu ? "open" : ""}`}>
        <nav aria-label="BIT HUB navigation">
          {NAV.map((item) => (
            <button
              key={item}
              className={page === item ? "active" : ""}
              onClick={() => navigate(item)}
              aria-current={page === item ? "page" : undefined}
            >
              <Icon name={item} />
              <span>{item}</span>
              {item === "Chat" && (
                <small>
                  {data.rooms.filter((r) => r.kind === "bubble").length}
                </small>
              )}
            </button>
          ))}
        </nav>
        <div className="hub-sidebar-bottom">
          {hub.isReviewer && <Link className="hub-text-button" href="/hub/review">Review projects</Link>}
          {!demo && <button className="hub-text-button" disabled={busy} onClick={() => act(hub.signOut())}>Sign out</button>}
          <div className="hub-switch">
            <span>QUICK SWITCH</span>
            <Link className="active" href="/hub">
              <Icon name="Cube" />
              BIT HUB
            </Link>
            <Link href="/dashboard">
              <Icon name="Courses" />
              BIT LIBRARY
            </Link>
          </div>
          <p>
            <span>v1.0.0</span>
            <span>CONNECTING MINDS_</span>
          </p>
        </div>
      </aside>
      <main id="hub-main" className="hub-main">
        {demo && (
          <div className="hub-demo-banner">
            <span>
              <i className="hub-dot amber" /> INTERACTIVE DEMO · Sample students
              and activity. Changes stay in this tab.
            </span>
            <Link href="/login">
              Sign in to your campus <Icon name="Arrow" size={14} />
            </Link>
          </div>
        )}
        {hub.error && (
          <div className="hub-alert" role="alert">
            <span>{hub.error}</span>
            <button
              onClick={() =>
                act(
                  hub
                    .refresh()
                    .then(() => hub.setError(""))
                    .catch((cause) =>
                      hub.setError(
                        cause instanceof Error && cause.message
                          ? cause.message
                          : "Database unavailable. Apply the Hub database setup and retry.",
                      ),
                    ),
                )
              }
            >
              Retry
            </button>
            <a href="/hub?demo=1">Open demo</a>
            <button aria-label="Dismiss error" onClick={() => hub.setError("")}>
              <Icon name="Close" size={16} />
            </button>
          </div>
        )}
        {hub.notice && (
          <div className="hub-notice" role="status">
            <span>
              <Icon name="Check" size={16} />
              {hub.notice}
            </span>
            <button
              aria-label="Dismiss notification"
              onClick={() => hub.setNotice("")}
            >
              <Icon name="Close" size={16} />
            </button>
          </div>
        )}
        {hub.loading ? (
          <div className="hub-loading">
            <Icon name="Cube" size={50} />
            <h1>Connecting to BIT HUB</h1>
            <p>Finding your community…</p>
          </div>
        ) : (
          <>
            {page === "Home" && (
              <>
                <section className="hub-welcome hub-panel">
                  <Globe />
                  <div className="hub-welcome-copy">
                    <h1>
                      Welcome Back,{" "}
                      {me?.name.split(" ")[0].toUpperCase() || "BUILDER"}{" "}
                      <span className="hub-cursor">|</span>
                    </h1>
                    <h2>
                      CONNECT&nbsp; // &nbsp;COLLABORATE&nbsp; // &nbsp;BUILD
                    </h2>
                    <p>“Ideas grow faster when shared.”</p>
                  </div>
                  <span className="hub-globe-note">
                    STUDENTS
                    <br />
                    BUILDING
                    <br />A BRIGHTER
                    <br />
                    TOMORROW_
                  </span>
                  <div className="hub-metrics">
                    {[
                      {
                        name: "STUDENTS",
                        value: data.summary?.students ?? data.students.length,
                        icon: "Teams",
                        page: "Explore",
                      },
                      {
                        name: "ACTIVE TEAMS",
                        value: data.summary?.teams ?? data.rooms.filter((r) => r.kind === "team")
                          .length,
                        icon: "Teams",
                        page: "Teams",
                      },
                      {
                        name: "PROJECTS",
                        value: data.summary?.projects ?? data.projects.filter(
                          (p) => p.status === "approved",
                        ).length,
                        icon: "Projects",
                        page: "Projects",
                      },
                      {
                        name: "UPCOMING HACKATHONS",
                        value: data.summary?.events ?? data.events.length,
                        icon: "Hackathons",
                        page: "Hackathons",
                      },
                    ].map((stat) => (
                      <button
                        key={stat.name}
                        onClick={() => navigate(stat.page as HubPage)}
                      >
                        <Icon name={stat.icon} size={35} />
                        <span>
                          <b>{stat.value.toLocaleString()}</b>
                          <small>{stat.name}</small>
                        </span>
                        <Icon name="Arrow" size={14} />
                      </button>
                    ))}
                  </div>
                </section>
                <div className="hub-home-grid">
                  <Panel
                    title="FIND YOUR NEXT TEAMMATE"
                    action={
                      <button
                        className="hub-text-button"
                        onClick={() => navigate("Explore")}
                      >
                        View All <Icon name="Arrow" size={14} />
                      </button>
                    }
                    className="hub-discovery"
                  >
                    {filters()}
                    <div className="hub-student-grid">
                      {filteredStudents.slice(0, 3).map(studentCard)}
                    </div>
                    {filteredStudents.length === 0 && (
                      <p className="hub-empty">
                        No students match this skill yet. Try another category.
                      </p>
                    )}
                  </Panel>
                  <Panel
                    title="YOUR SKILL STRENGTH"
                    action={
                      <button
                        className="hub-small-button"
                        onClick={() => navigate("Profile")}
                      >
                        View Profile <Icon name="Arrow" size={14} />
                      </button>
                    }
                    className="hub-skill"
                  >
                    {me ? (
                      <Radar student={me} projects={data.projects} />
                    ) : (
                      <div className="hub-empty">
                        <p>Create a profile to build your skill graph.</p>
                        <button
                          className="hub-button"
                          onClick={() => setModal("profile")}
                        >
                          Create profile
                        </button>
                      </div>
                    )}
                    <div className="hub-personal-stats">
                      {[
                        { icon: "Star", value: me?.xp || 0, label: "TOTAL XP" },
                        {
                          icon: "Leaderboard",
                          value: myRank ? `#${myRank}` : "—",
                          label: "YOUR RANK",
                        },
                        {
                          icon: "Projects",
                          value: me?.project_count || 0,
                          label: "PROJECTS",
                        },
                        {
                          icon: "Hackathons",
                          value: me?.achievement_count || 0,
                          label: "ACHIEVEMENTS",
                        },
                      ].map((s) => (
                        <button
                          key={s.label}
                          onClick={() =>
                            navigate(
                              s.label === "YOUR RANK" || s.label === "TOTAL XP"
                                ? "Leaderboard"
                                : "Profile",
                            )
                          }
                        >
                          <Icon name={s.icon} size={23} />
                          <span>
                            <b>{s.value}</b>
                            <small>{s.label}</small>
                          </span>
                        </button>
                      ))}
                    </div>
                  </Panel>
                </div>
                <div className="hub-bottom-grid">
                  <Panel
                    title="COMMUNITY ACTIVITY"
                    action={
                      <span className="hub-muted">
                        {demo ? "Sample activity" : "Recent projects"}
                      </span>
                    }
                  >
                    <div className="hub-activity">
                      {data.projects
                        .filter((p) => p.status === "approved")
                        .slice(0, 5)
                        .map((p) => {
                          const student = data.students.find(
                            (s) => s.id === p.owner_id,
                          );
                          return (
                            <button
                              key={p.id}
                              onClick={() => setSelectedProject(p)}
                            >
                              <Icon name="Projects" size={19} />
                              {student && <Avatar student={student} small />}
                              <span>
                                {student?.name || "A student"} shared{" "}
                                <b>{p.title}</b>
                              </span>
                              <small>
                                {new Date(p.created_at).toLocaleDateString(
                                  "en-IN",
                                  { month: "short", day: "numeric" },
                                )}
                              </small>
                            </button>
                          );
                        })}
                      {!data.projects.length && (
                        <p className="hub-empty">
                          Your community’s next project could be yours.
                        </p>
                      )}
                    </div>
                  </Panel>
                  <Panel
                    title="UPCOMING HACKATHONS"
                    action={
                      <button
                        className="hub-text-button"
                        onClick={() => navigate("Hackathons")}
                      >
                        View All <Icon name="Arrow" size={14} />
                      </button>
                    }
                  >
                    {eventRows(3)}
                  </Panel>
                </div>
                <Panel
                  title="BUBBLE WAITING ROOMS"
                  className="hub-home-bubbles"
                  action={
                    <button
                      className="hub-text-button"
                      onClick={() => navigate("Chat")}
                    >
                      Join the discussion <Icon name="Arrow" size={14} />
                    </button>
                  }
                >
                  <div className="hub-bubble-strip">
                    {data.rooms
                      .filter((r) => r.kind === "bubble")
                      .slice(0, 3)
                      .map((r) => (
                        <button key={r.id} onClick={() => openRoom(r)}>
                          <span className="hub-mini-bubble">
                            <Icon name="Chat" />
                          </span>
                          <span>
                            <b>{r.name}</b>
                            <small>
                              {r.category} · {r.member_count}/{r.capacity}{" "}
                              students
                            </small>
                          </span>
                          <Icon name="Arrow" size={18} />
                        </button>
                      ))}
                    {!data.rooms.length && (
                      <button
                        className="hub-button"
                        onClick={() => createRoom("bubble")}
                      >
                        Start the first bubble
                      </button>
                    )}
                  </div>
                </Panel>
              </>
            )}
            {page === "Explore" && (
              <>
                <div className="hub-page-title">
                  <div>
                    <h1>
                      Find your next teammate<span>_</span>
                    </h1>
                    <p>A shared interest is the start of something great.</p>
                  </div>
                  <button
                    className="hub-button"
                    onClick={() => createRoom("bubble")}
                  >
                    <Icon name="Plus" size={17} />
                    Start a bubble
                  </button>
                </div>
                <Panel title="EXPLORE STUDENTS">
                  {filters()}
                  <div className="hub-filter-tools">
                    <label>
                      <input
                        type="checkbox"
                        checked={onlyAvailable}
                        onChange={(e) => setOnlyAvailable(e.target.checked)}
                      />
                      Available for collaboration
                    </label>
                    <label>
                      Year{" "}
                      <select
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                      >
                        <option>All</option>
                        {[1, 2, 3, 4, 5, 6].map((y) => (
                          <option key={y}>{y}</option>
                        ))}
                      </select>
                    </label>
                    <span>{filteredStudents.length} students</span>
                  </div>
                  <div className="hub-student-grid expanded">
                    {filteredStudents.map(studentCard)}
                  </div>
                  {!filteredStudents.length && (
                    <p className="hub-empty">
                      No students match your filters. Try another skill or year.
                    </p>
                  )}
                </Panel>
              </>
            )}
            {(page === "Chat" || page === "Teams") && (
              <>
                <div className="hub-page-title">
                  <div>
                    <h1>
                      {page === "Teams"
                        ? "Find your people. Build your team."
                        : "A little bubble. A big idea."}
                      <span>_</span>
                    </h1>
                    <p>
                      {page === "Teams"
                        ? "Bring complementary skills together for your next hackathon."
                        : "Drop into a waiting room, discuss an idea, and meet your next teammates."}
                    </p>
                  </div>
                  <button
                    className="hub-button"
                    onClick={() =>
                      createRoom(page === "Teams" ? "team" : "bubble")
                    }
                  >
                    <Icon name="Plus" size={17} />
                    Create {page === "Teams" ? "team" : "bubble"}
                  </button>
                </div>
                {page === "Chat" && room ? (
                  <div className="hub-chat-layout">
                    <Panel
                      title="YOUR ROOMS"
                      className="hub-room-list"
                      action={
                        <button
                          className="hub-text-button"
                          onClick={() => hub.setActiveRoom(null)}
                        >
                          All bubbles
                        </button>
                      }
                    >
                      {data.rooms
                        .filter((r) => r.is_member)
                        .map((r) => (
                          <button
                            key={r.id}
                            className={r.id === room.id ? "selected" : ""}
                            onClick={() => hub.setActiveRoom(r.id)}
                          >
                            <Icon name="Chat" />
                            <span>
                              <b>{r.name}</b>
                              <small>
                                {r.member_count} students · {r.category}
                              </small>
                            </span>
                          </button>
                        ))}
                    </Panel>
                    <section className="hub-panel hub-chat">
                      <header>
                        <div>
                          <h2>{room.name}</h2>
                          <p>
                            <i className="hub-dot" />
                            {hub.chatStatus} · {room.member_count}/
                            {room.capacity} students
                          </p>
                        </div>
                        {room.owner_id !== userId && (
                          <button
                            className="hub-small-button"
                            onClick={() => act(hub.leaveRoom(room))}
                          >
                            Leave room
                          </button>
                        )}
                      </header>
                      <div className="hub-chat-context">
                        {room.description}
                        <small>
                          Members-only discussion · Messages are stored on the
                          server; end-to-end encryption is not available.
                        </small>
                      </div>
                      <div
                        className="hub-messages"
                        role="log"
                        aria-label="Discussion messages"
                        aria-live="polite"
                      >
                        {hub.hasOlder && (
                          <button
                            className="hub-text-button"
                            disabled={busy}
                            onClick={() => act(hub.olderMessages())}
                          >
                            Load earlier messages
                          </button>
                        )}
                        {hub.messages
                          .filter((m) => m.room_id === room.id)
                          .map((m) => {
                            const sender = data.students.find(
                              (s) => s.id === m.sender_id,
                            );
                            return (
                              <div
                                className={`hub-message ${m.sender_id === userId ? "mine" : ""}`}
                                key={m.id}
                              >
                                {sender && <Avatar student={sender} small />}
                                <div>
                                  <span>
                                    {m.sender_id === userId
                                      ? "You"
                                      : sender?.name || "Room member"}
                                    <time>
                                      {new Date(
                                        m.created_at,
                                      ).toLocaleTimeString("en-IN", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })}
                                    </time>
                                  </span>
                                  <p>{m.body}</p>
                                </div>
                              </div>
                            );
                          })}
                        {!hub.messages.some((m) => m.room_id === room.id) && (
                          <div className="hub-empty">
                            <Icon name="Chat" size={36} />
                            <p>Your idea starts the conversation. Say hello.</p>
                          </div>
                        )}
                        <div ref={messageEnd} />
                      </div>
                      <form
                        className="hub-composer"
                        onSubmit={(e) => {
                          e.preventDefault();
                          act(hub.sendMessage(draft).then(() => setDraft("")));
                        }}
                      >
                        <input
                          aria-label="Message"
                          placeholder="Share an idea with the room…"
                          maxLength={4000}
                          value={draft}
                          onChange={(e) => setDraft(e.target.value)}
                        />
                        <button
                          className="hub-button"
                          disabled={busy || !draft.trim()}
                        >
                          <Icon name="Send" size={18} />
                          <span>Send</span>
                        </button>
                      </form>
                    </section>
                  </div>
                ) : (
                  <Panel
                    title={
                      page === "Teams"
                        ? "TEAMS LOOKING FOR BUILDERS"
                        : "FIND YOUR DISCUSSION BUBBLE"
                    }
                  >
                    {filters()}
                    <div className="hub-room-grid">
                      {data.rooms
                        .filter(
                          (r) =>
                            r.kind === (page === "Teams" ? "team" : "bubble") &&
                            (domain === "All" || r.category === domain) &&
                            `${r.name} ${r.description} ${r.category}`
                              .toLowerCase()
                              .includes(search),
                        )
                        .map((r) => (
                          <article className="hub-room-card" key={r.id}>
                            <div className="hub-bubble-orbit">
                              <div className="hub-bubble-core">
                                <Icon
                                  name={r.kind === "team" ? "Teams" : "Chat"}
                                  size={35}
                                />
                                <span>
                                  {r.member_count}
                                  <small>/{r.capacity}</small>
                                </span>
                              </div>
                              {Array.from(
                                { length: Math.min(r.member_count, 8) },
                                (_, i) => (
                                  <span
                                    className="hub-orbit-dot"
                                    key={i}
                                    style={{
                                      transform: `rotate(${(i * 360) / Math.min(r.member_count, 8)}deg) translateX(72px) rotate(${(-i * 360) / Math.min(r.member_count, 8)}deg)`,
                                    }}
                                  >
                                    <Icon name="Profile" size={15} />
                                  </span>
                                ),
                              )}
                            </div>
                            <Tags items={[r.category]} />
                            <h3>{r.name}</h3>
                            <p>{r.description}</p>
                            <span className="hub-muted">
                              {r.capacity - r.member_count} open seats ·{" "}
                              {r.is_member
                                ? "You’re a member"
                                : "Open to students"}
                            </span>
                            <button
                              className="hub-button"
                              disabled={
                                busy ||
                                (!r.is_member && r.member_count >= r.capacity)
                              }
                              onClick={() => {
                                if (!me) setModal("profile");
                                else openRoom(r);
                              }}
                            >
                              <Icon name="Chat" size={17} />
                              {r.is_member
                                ? "Open discussion"
                                : r.member_count >= r.capacity
                                  ? "Room full"
                                  : "Join the bubble"}
                            </button>
                          </article>
                        ))}
                    </div>
                    {!data.rooms.some(
                      (r) => r.kind === (page === "Teams" ? "team" : "bubble"),
                    ) && (
                      <p className="hub-empty">
                        No rooms yet. Create one and invite your classmates to
                        join.
                      </p>
                    )}
                  </Panel>
                )}
              </>
            )}
            {page === "Projects" && (
              <>
                <div className="hub-page-title">
                  <div>
                    <h1>
                      Built by students. Shared with everyone.<span>_</span>
                    </h1>
                    <p>
                      Your work speaks for you. Every approved project earns +5
                      XP.
                    </p>
                  </div>
                  <button
                    className="hub-button"
                    onClick={() => setModal(me ? "project" : "profile")}
                  >
                    <Icon name="Plus" size={17} />
                    Share a project
                  </button>
                </div>
                <Panel title="PROJECT SHOWCASE">
                  {filters()}
                  {projectsGrid(shownProjects)}
                </Panel>
              </>
            )}
            {page === "Hackathons" && (
              <>
                <div className="hub-page-title">
                  <div>
                    <h1>
                      Your next challenge starts here<span>_</span>
                    </h1>
                    <p>
                      Find an event. Assemble your team. Build something that
                      matters.
                    </p>
                  </div>
                  <button
                    className="hub-button"
                    onClick={() => navigate("Teams")}
                  >
                    Find a team <Icon name="Arrow" size={17} />
                  </button>
                </div>
                <Panel title="UPCOMING HACKATHONS">{eventRows()}</Panel>
              </>
            )}
            {page === "Leaderboard" && (
              <>
                <div className="hub-page-title">
                  <div>
                    <h1>
                      Build. Share. Rise.<span>_</span>
                    </h1>
                    <p>
                      +5 XP per approved project. Recognition earned through
                      real work.
                    </p>
                  </div>
                  <span className="hub-rank-label">
                    YOUR RANK <b>{myRank ? `#${myRank}` : "Unranked"}</b>
                  </span>
                </div>
                <Panel title="CAMPUS LEADERBOARD">
                  {filters()}
                  <p className="hub-explainer">
                    Ranked by approved XP. Ties use name, then student ID.
                    Category filters show students who declare that skill.
                  </p>
                  <div
                    className="hub-leaderboard"
                    role="table"
                    aria-label="Student leaderboard"
                  >
                    <div className="hub-leaderboard-head" role="row">
                      <span>RANK</span>
                      <span>STUDENT</span>
                      <span>PRIMARY SKILL</span>
                      <span>PROJECTS</span>
                      <span>TOTAL XP</span>
                    </div>
                    {ranked
                      .filter(
                        (s) =>
                          (domain === "All" || s.skills.includes(domain)) &&
                          s.name.toLowerCase().includes(search),
                      )
                      .map((s) => (
                        <button
                          key={s.id}
                          role="row"
                          className={s.id === userId ? "is-you" : ""}
                          onClick={() => openProfile(s)}
                        >
                          <span className="hub-position" role="cell">
                            {ranked.indexOf(s) < 3 ? (
                              <Icon name="Hackathons" size={19} />
                            ) : (
                              "#"
                            )}
                            {ranked.indexOf(s) + 1}
                          </span>
                          <span className="hub-leader-name" role="cell">
                            <Avatar student={s} small />
                            <span>
                              <b>
                                {s.name}
                                {s.id === userId ? " (You)" : ""}
                              </b>
                              <small>
                                {s.department} · Year {s.year}
                              </small>
                            </span>
                          </span>
                          <span role="cell">{s.skills[0] || "Not added"}</span>
                          <span role="cell">{s.project_count}</span>
                          <strong role="cell">
                            {s.xp} <small>XP</small>
                          </strong>
                        </button>
                      ))}
                  </div>
                  {!ranked.length && (
                    <p className="hub-empty">
                      The leaderboard starts with your first approved project.
                    </p>
                  )}
                </Panel>
              </>
            )}
            {page === "Profile" && (
              <>
                {profile ? (
                  <>
                    <div className="hub-page-title">
                      <div>
                        <h1>
                          {profile.id === userId
                            ? "Your builder profile"
                            : `${profile.name}’s profile`}
                          <span>_</span>
                        </h1>
                        <p>
                          Skills, projects, and the things you’re proud to have
                          built.
                        </p>
                      </div>
                      {profile.id === userId ? (
                        <button
                          className="hub-button"
                          onClick={() => setModal("profile")}
                        >
                          Edit profile
                        </button>
                      ) : (
                        <button
                          className="hub-button"
                          disabled={busy}
                          onClick={() => act(hub.connect(profile))}
                        >
                          Connect <Icon name="Send" size={17} />
                        </button>
                      )}
                    </div>
                    <div className="hub-profile-grid">
                      <Panel title="STUDENT PROFILE">
                        <div className="hub-profile-person">
                          <Avatar student={profile} />
                          <div>
                            <h2>{profile.name}</h2>
                            <p>
                              {profile.department} · {profile.college} · Year{" "}
                              {profile.year}
                            </p>
                            <span className="hub-cyan">
                              {profile.available
                                ? "Available for projects & hackathons"
                                : "Focused on current projects"}
                            </span>
                          </div>
                        </div>
                        <p className="hub-profile-bio">{profile.bio}</p>
                        <Tags items={profile.skills} />
                        {profile.github_url && safeUrl(profile.github_url) && (
                          <a
                            className="hub-text-button"
                            href={safeUrl(profile.github_url)}
                            target="_blank"
                            rel="noreferrer"
                          >
                            GitHub / portfolio ↗
                          </a>
                        )}
                        <div className="hub-profile-totals">
                          <span>
                            <b>{profile.xp}</b>Total XP
                          </span>
                          <span>
                            <b>{profile.project_count}</b>Projects
                          </span>
                          <span>
                            <b>
                              #
                              {ranked.findIndex((s) => s.id === profile.id) + 1}
                            </b>
                            Campus rank
                          </span>
                        </div>
                        <p className="hub-explainer">
                          Skills are self-declared. Project approval is separate
                          from identity or expertise verification.
                        </p>
                      </Panel>
                      <Panel title="SKILL EVIDENCE">
                        <Radar student={profile} projects={data.projects} />
                      </Panel>
                    </div>
                    <Panel
                      title="PROJECT PORTFOLIO"
                      action={
                        profile.id === userId && (
                          <button
                            className="hub-small-button"
                            onClick={() => setModal("project")}
                          >
                            <Icon name="Plus" size={14} />
                            Add project
                          </button>
                        )
                      }
                    >
                      {projectsGrid(
                        data.projects.filter((p) => p.owner_id === profile.id),
                      )}
                    </Panel>
                  </>
                ) : (
                  <Panel title="CREATE YOUR STUDENT PROFILE">
                    <div className="hub-empty">
                      <Icon name="Profile" size={42} />
                      <h1>Let your future teammates find you.</h1>
                      <p>
                        Add your skills, interests and availability to get
                        started.
                      </p>
                      <button
                        className="hub-button"
                        onClick={() => setModal("profile")}
                      >
                        Create profile
                      </button>
                    </div>
                  </Panel>
                )}
              </>
            )}
          </>
        )}
        <footer className="hub-footer">
          <span>BIT HUB // CONNECTING MINDS, BUILDING TOGETHER</span>
          <button onClick={() => navigate("Chat")}>
            Find your bubble <Icon name="Arrow" size={13} />
          </button>
        </footer>
      </main>
      {modal === "project" && (
        <Modal title="Showcase your project" close={() => setModal(null)}>
          <form className="hub-form" onSubmit={(e) => act(submitProject(e))}>
            <p>
              Share as many projects as you build. Each approved project earns
              +5 XP once.
            </p>
            <label>
              Project title
              <input
                name="title"
                required
                minLength={3}
                maxLength={100}
                placeholder="What have you been building?"
              />
            </label>
            <label>
              Description
              <textarea
                name="description"
                required
                minLength={20}
                maxLength={2000}
                placeholder="Explain the problem, your solution, and your contribution."
                rows={4}
              />
            </label>
            <div className="hub-form-columns">
              <label>
                Domain
                <select name="category">
                  <DomainOptions />
                </select>
              </label>
              <label>
                Technologies
                <input
                  name="technologies"
                  maxLength={200}
                  placeholder="React, Python, PostgreSQL"
                />
              </label>
            </div>
            <label>
              Repository URL
              <input
                type="url"
                name="repository_url"
                pattern="https://.*"
                placeholder="https://github.com/you/project"
                maxLength={500}
              />
            </label>
            <label>
              Live demo URL
              <input
                type="url"
                name="demo_url"
                pattern="https://.*"
                placeholder="https://your-project.com"
                maxLength={500}
              />
            </label>
            <label>
              Project cover · PNG, JPG, WebP · up to 5 MB
              <input
                type="file"
                name="cover"
                accept="image/png,image/jpeg,image/webp"
              />
            </label>
            <p className="hub-explainer">
              New submissions are pending review. Uploading or editing cannot
              assign points.
            </p>
            {hub.error && (
              <p role="alert" className="hub-form-error">
                {hub.error}
              </p>
            )}
            <button className="hub-button" disabled={busy}>
              {busy ? "Submitting…" : "Submit project"}
              <Icon name="Arrow" size={18} />
            </button>
          </form>
        </Modal>
      )}
      {modal === "room" && (
        <Modal
          title={`Create a ${roomKind === "team" ? "team" : "discussion bubble"}`}
          close={() => setModal(null)}
        >
          <form className="hub-form" onSubmit={(e) => act(submitRoom(e))}>
            <p>
              A shared space to meet, discuss ideas, and start building
              together.
            </p>
            <label>
              {roomKind === "team" ? "Team" : "Bubble"} name
              <input
                name="name"
                required
                minLength={3}
                maxLength={80}
                placeholder="Give your room a name"
              />
            </label>
            <label>
              What will you build or discuss?
              <textarea
                name="description"
                required
                minLength={10}
                maxLength={500}
                rows={3}
                placeholder="Tell students who should join and what you have in mind."
              />
            </label>
            <div className="hub-form-columns">
              <label>
                Skill focus
                <select name="category">
                  <DomainOptions />
                </select>
              </label>
              <label>
                Room size
                <select name="capacity" defaultValue="6">
                  {[2, 4, 6, 8, 12, 16].map((n) => (
                    <option value={n} key={n}>
                      {n} students
                    </option>
                  ))}
                </select>
              </label>
            </div>
            {hub.error && (
              <p role="alert" className="hub-form-error">
                {hub.error}
              </p>
            )}
            <button className="hub-button" disabled={busy}>
              {busy ? "Creating…" : `Create ${roomKind}`}{" "}
              <Icon name="Plus" size={18} />
            </button>
          </form>
        </Modal>
      )}
      {modal === "profile" && (
        <Modal
          title={
            me ? "Edit your student profile" : "Create your student profile"
          }
          close={() => setModal(null)}
        >
          <form className="hub-form" onSubmit={(e) => act(submitProfile(e))}>
            <div className="hub-form-columns">
              <label>
                Display name
                <input
                  name="name"
                  required
                  minLength={2}
                  maxLength={80}
                  defaultValue={me?.name || identityName}
                />
              </label>
              <label>
                Department
                <input
                  name="department"
                  required
                  maxLength={60}
                  defaultValue={me?.department}
                />
              </label>
            </div>
            <div className="hub-form-columns">
              <label>
                College
                <input
                  name="college"
                  required
                  maxLength={100}
                  defaultValue={me?.college || "BIT Sathy"}
                />
              </label>
              <label>
                Academic year
                <select name="year" defaultValue={me?.year || 1}>
                  {[1, 2, 3, 4, 5, 6].map((y) => (
                    <option key={y}>{y}</option>
                  ))}
                </select>
              </label>
            </div>
            <label>
              About you
              <textarea
                name="bio"
                required
                minLength={10}
                maxLength={500}
                rows={3}
                defaultValue={me?.bio}
              />
            </label>
            <fieldset>
              <legend>Your skills & interests</legend>
              <div className="hub-skill-options">
                {DOMAINS.map((d) => (
                  <label key={d}>
                    <input
                      type="checkbox"
                      name="skills"
                      value={d}
                      defaultChecked={me?.skills.includes(d)}
                    />
                    {d}
                  </label>
                ))}
              </div>
            </fieldset>
            <label>
              GitHub or portfolio
              <input
                type="url"
                pattern="https://.*"
                name="github_url"
                defaultValue={me?.github_url}
                placeholder="https://github.com/you"
                maxLength={500}
              />
            </label>
            <label className="hub-check">
              <input
                type="checkbox"
                name="available"
                defaultChecked={me?.available ?? true}
              />
              Available for projects and hackathons
            </label>
            <label>
              Profile visibility
              <select
                name="visibility"
                defaultValue={me?.visibility || "campus"}
              >
                <option value="campus">Campus students</option>
                <option value="private">
                  Only me (hide from discovery and leaderboard)
                </option>
              </select>
            </label>
            {hub.error && (
              <p role="alert" className="hub-form-error">
                {hub.error}
              </p>
            )}
            <button className="hub-button" disabled={busy}>
              {busy ? "Saving…" : "Save profile"}{" "}
              <Icon name="Check" size={18} />
            </button>
          </form>
        </Modal>
      )}
      {modal === "notifications" && (
        <Modal title="Your notifications" close={() => setModal(null)}>
          <div className="hub-notifications">
            {data.connections
              .filter(
                (c) => c.recipient_id === userId && c.status === "pending",
              )
              .map((c) => (
                <article key={c.id}>
                  <p>
                    {data.students.find((s) => s.id === c.sender_id)?.name ||
                      "A student"}{" "}
                    wants to connect.
                  </p>
                  <button
                    className="hub-small-button"
                    disabled={busy}
                    onClick={() => act(hub.acceptConnection(c.id))}
                  >
                    Accept connection
                  </button>
                </article>
              ))}
            {data.notifications.map((n) => (
              <article className={n.read_at ? "read" : ""} key={n.id}>
                <Icon name={n.read_at ? "Check" : "Bell"} size={18} />
                <p>{n.body}</p>
              </article>
            ))}
            {!data.notifications.length && (
              <p className="hub-empty">
                You’re all caught up. New connection and project updates will
                appear here.
              </p>
            )}
            <button
              className="hub-button"
              disabled={busy || !unread}
              onClick={() => act(hub.readNotifications())}
            >
              Mark all as read
            </button>
          </div>
        </Modal>
      )}
      {selectedProject && (
        <Modal
          title={selectedProject.title}
          close={() => setSelectedProject(null)}
        >
          <div className="hub-project-detail">
            <Cover key={selectedProject.id} project={selectedProject} />
            <Tags items={selectedProject.technologies} />
            <p>{selectedProject.description}</p>
            <p>
              Status: <strong>{selectedProject.status}</strong> ·{" "}
              {selectedProject.status === "approved"
                ? "5 XP awarded"
                : "No XP awarded yet"}
            </p>
            <div className="hub-row">
              {safeUrl(selectedProject.repository_url) && (
                <a
                  className="hub-button"
                  href={safeUrl(selectedProject.repository_url)}
                  target="_blank"
                  rel="noreferrer"
                >
                  Repository ↗
                </a>
              )}
              {safeUrl(selectedProject.demo_url) && (
                <a
                  className="hub-button"
                  href={safeUrl(selectedProject.demo_url)}
                  target="_blank"
                  rel="noreferrer"
                >
                  Live demo ↗
                </a>
              )}
            </div>
            {selectedProject.owner_id === userId && (
              <button
                className="hub-text-button"
                disabled={busy}
                onClick={() => {
                  if (
                    window.confirm(
                      "Archive this project? It will leave the showcase and any XP awarded for it will be removed.",
                    )
                  )
                    act(
                      hub
                        .archiveProject(selectedProject.id)
                        .then(() => setSelectedProject(null)),
                    );
                }}
              >
                Archive project
              </button>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
