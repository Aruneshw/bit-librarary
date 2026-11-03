"use client";
import { useEffect, useRef, useState } from "react";
import type { Message, Room, Student } from "@/lib/hub/types";
import { useBubbleRoom } from "./useBubbleRoom";
import "./BubbleRoom.css";

type Props = {
  room: Room;
  userId: string;
  messages: Message[];
  status: string;
  busy: boolean;
  hasOlder: boolean;
  send: (body: string) => Promise<void>;
  older: () => Promise<void>;
  back: () => void;
  leave: () => Promise<void>;
  students?: Student[];
  cancel?: (reason?: string) => Promise<void>;
  removeMember?: (member: string) => Promise<void>;
  invite?: (members: string[]) => Promise<void>;
  finalize?: (finalists: string[], endsAt: string) => Promise<void>;
};
function position(slot: number) {
  const angle = ((slot % 8) * 45 - 150 + (slot >= 8 ? 22.5 : 0)) * Math.PI / 180;
  const radius = slot < 8 ? 255 : 135;
  return { x: 380 + Math.cos(angle) * radius, y: 280 + Math.sin(angle) * radius * .49 };
}
export function BubbleRoom(props: Props) {
  const live = useBubbleRoom(props.room.id);
  return <BubbleRoomView {...props} {...live} />;
}
export function BubbleRoomView({ room, userId, messages, status, busy, hasOlder, send, older, back, leave, students = [], cancel, removeMember, invite, finalize, members, error, connected, pulseTyping, clearTyping }: Props & ReturnType<typeof useBubbleRoom>) {
  const [draft, setDraft] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [unread, setUnread] = useState(false);
  const [sendError, setSendError] = useState("");
  const [panel, setPanel] = useState<"none" | "close" | "team">("none");
  const [closeReason, setCloseReason] = useState("");
  const [panelError, setPanelError] = useState("");
  const [invitees, setInvitees] = useState<string[]>([]);
  const [finalists, setFinalists] = useState<string[]>([]);
  const [endsAt, setEndsAt] = useState("");
  const scroller = useRef<HTMLDivElement>(null);
  const atBottom = useRef(true);
  const lastMessage = messages.at(-1)?.id;
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    if (atBottom.current) el.scrollTop = el.scrollHeight;
    else if (lastMessage) queueMicrotask(() => setUnread(true));
  }, [lastMessage]);
  useEffect(() => {
    if (room.is_host) setFinalists(members.filter(member => member.team_status === "finalist").map(member => member.id));
  }, [room.is_host, members]);
  const online = members.filter(member => member.online);
  const typing = members.filter(member => member.typing && member.id !== userId);
  const focus = members.find(member => member.id === selected);
  const candidateInvitees = students.filter(student => !members.some(member => member.id === student.id) && student.id !== userId);
  const isTeamHost = room.is_host && room.kind === "team" && !room.finalized_at;
  return <section className="bubble-room" aria-label="Bubble waiting room">
    <header className="bubble-toolbar"><div><button className="hub-text-button" onClick={back}>← All bubbles</button><h2>{room.name}{room.finalized_at && <em className="bubble-final-tag">TEAM FINALISED</em>}</h2><p>{room.category} <span> / </span> ROOM {room.id.slice(0, 8).toUpperCase()}{room.hackathon_ends_at && <span> · ENDS {new Date(room.hackathon_ends_at).toLocaleString()}</span>}</p></div><div className="bubble-toolbar-right"><span className="bubble-status">● {connected && !error ? "LIVE ZONE" : "CONNECTING"}</span>{room.is_host && <div className="bubble-host-actions">{room.kind === "team" && !room.finalized_at && <button className="hub-button" disabled={busy} onClick={() => { setPanelError(""); setPanel("team"); }}>Manage team</button>}<button className="hub-button hub-button-danger" disabled={busy} onClick={() => { setCloseReason(""); setPanelError(""); setPanel("close"); }}>Cancel room</button></div>}<button className="hub-button" disabled={busy} onClick={() => { if (!room.is_host) void leave().catch(() => {}); else setPanel("close"); }}>{room.is_host ? "Exit room" : "Leave room"}</button></div></header>
    {error && <p role="alert" className="bubble-error">{error}</p>}
    <div className="bubble-workspace">
      <aside className="bubble-roster"><h3>PARTICIPANTS <span>{members.length}/{room.capacity}</span></h3><p className="bubble-muted">{online.length} online now</p><div className="bubble-member-list">{members.map(member => <div key={member.id} className="bubble-member-row"><button onClick={() => setSelected(member.id)} className={selected === member.id ? "selected" : ""}><span className="bubble-avatar">{member.name.slice(0, 2).toUpperCase()}<i className={member.online ? "online" : ""}/></span><span>{member.name}{member.id === userId ? " (you)" : ""}<small>{member.id === room.owner_id ? "HOST · " : ""}{member.team_status === "finalist" ? "FINAL TEAM · " : ""}{member.typing ? "Typing…" : member.online ? "In the zone" : "Offline"}</small></span></button>{room.is_host && member.id !== userId && !room.finalized_at && removeMember && <button className="bubble-kick" title={`Remove ${member.name}`} aria-label={`Remove ${member.name} from the room`} disabled={busy} onClick={() => void removeMember(member.id).catch(() => {})}>✕</button>}</div>)}</div>{room.is_host && !room.finalized_at && <div className="bubble-roster-footer">YOU ARE THE HOST<br/><span>Remove members or cancel the room above.</span></div>}{!room.is_host && <div className="bubble-roster-footer">MEMBERS ONLY<br/><span>Your next team starts here.</span></div>}</aside>
      <div className="bubble-zone"><div className="bubble-zone-heading"><span className="bubble-eyebrow">COLLABORATION NETWORK</span><h3>Your ideas. Connected.</h3><p>Meet, discuss, and build something together.</p></div><span className="bubble-map-label">LIVE TOPOLOGY / 01</span>
        <svg className="bubble-map" viewBox="0 0 760 480" role="img" aria-label={`Live collaboration map: ${online.length} online participants. Select a student in the participant list for details.`}>
          <defs><radialGradient id="bubble-floor"><stop stopColor="#063944" stopOpacity=".65"/><stop offset="1" stopColor="#030d14" stopOpacity="0"/></radialGradient><linearGradient id="bubble-beam" x2="0" y2="1"><stop stopColor="#3ff9ff" stopOpacity=".65"/><stop offset="1" stopColor="#3ff9ff" stopOpacity="0"/></linearGradient><pattern id="bubble-grid" width="36" height="22" patternUnits="userSpaceOnUse"><path d="M36 0H0V22" fill="none" stroke="#16434e" strokeWidth=".5"/></pattern></defs>
          <ellipse cx="380" cy="280" rx="350" ry="175" fill="url(#bubble-floor)"/><ellipse cx="380" cy="280" rx="320" ry="154" fill="url(#bubble-grid)"/>
          {[1, .8, .6, .4].map(scale => <ellipse key={scale} cx="380" cy="280" rx={320 * scale} ry={154 * scale} fill="none" stroke="#12606c" strokeOpacity={scale === 1 ? .8 : .35} strokeDasharray={scale === 1 ? "4 7" : undefined}/>)}
          <g transform="translate(380 280) scale(1 .48)"><path className="bubble-sweep" d="M0 0 L320 0 A320 320 0 0 1 226 226 Z" fill="#00e6ff" fillOpacity=".06"/></g>
          <path d="M60 280H700M380 126V434" stroke="#1e4853" strokeDasharray="2 8"/>
          {members.map(member => { const p = position(member.slot); return <g key={member.id} opacity={member.online ? 1 : .35}>
            <path id={`link-${member.id}`} d={`M380 280L${p.x} ${p.y}`} stroke="#19a5b6" strokeWidth=".8" fill="none"/>
            {member.online && <circle r="2" fill="#7fffff" className="bubble-packet"><animateMotion dur={`${3 + p.x % 3}s`} repeatCount="indefinite" path={`M380 280L${p.x} ${p.y}`}/></circle>}
            <g className="bubble-node" style={{ transformOrigin: `${p.x}px ${p.y}px` }}><ellipse cx={p.x} cy={p.y} rx="24" ry="10" fill="#00eaff" fillOpacity=".06" stroke="#00eaff" strokeOpacity=".5"/>{member.online && <ellipse className="bubble-pulse" cx={p.x} cy={p.y} rx="32" ry="14" fill="none" stroke="#00efff"/>}{member.typing && <ellipse className="bubble-typing-ring" cx={p.x} cy={p.y} rx="40" ry="18" fill="none" stroke="#ffd166"/>}<path d={`M${p.x - 12} ${p.y}V${p.y - 42}H${p.x + 12}V${p.y}Z`} fill="url(#bubble-beam)"/><path d={`M${p.x} ${p.y - 53}l14 8-14 8-14-8Z`} fill={member.id === userId ? "#bdfff8" : member.team_status === "finalist" ? "#123f5e" : "#0b5f70"} stroke="#6bffff"/><path d={`M${p.x - 14} ${p.y - 45}v12l14 8 14-8v-12M${p.x} ${p.y - 37}v12`} fill="none" stroke="#2ce6f3"/><text x={p.x} y={p.y + 30} textAnchor="middle" fill="#c4e8ee" fontSize="10">{member.name.slice(0, 18).toUpperCase()}</text></g></g>; })}
          <g><ellipse cx="380" cy="280" rx="28" ry="13" fill="#03272f" stroke="#27f6ee"/><path d="M380 248l16 9-16 9-16-9Z" fill="#0b6a70" stroke="#65ffff"/><text x="380" y="310" textAnchor="middle" fill="#42d8e5" fontSize="9" letterSpacing="3">BIT HUB</text></g>
        </svg>
        <div className="bubble-zone-bottom"><div><strong>{String(online.length).padStart(2,"0")}</strong><span>ONLINE NOW</span></div><div><strong>{String(members.length).padStart(2,"0")}</strong><span>CONNECTED MEMBERS</span></div><div><strong>{room.capacity - members.length}</strong><span>OPEN PLACES</span></div></div>
        <div className="bubble-inspector">{focus ? <><span>SELECTED STUDENT</span><strong>{focus.name}</strong><p>{focus.online ? "Online in this room" : "Currently offline"} · Joined {new Date(focus.joined_at).toLocaleDateString()}{focus.team_status === "finalist" ? " · Final team member" : ""}</p></> : <><span>ROOM BRIEF</span><p>{room.description}</p></>}</div>
      </div>
      <section className="bubble-discussion"><header><h3>ROOM DISCUSSION</h3><span className="bubble-muted">● {status}</span></header><div ref={scroller} className="bubble-messages" role="log" aria-label="Room messages" onScroll={() => { const el=scroller.current!; atBottom.current=el.scrollHeight-el.scrollTop-el.clientHeight<50; if(atBottom.current)setUnread(false); }}>
        {hasOlder && <button className="hub-text-button" disabled={busy} onClick={async()=>{const el=scroller.current!;const height=el.scrollHeight;const top=el.scrollTop;try{await older();requestAnimationFrame(()=>{el.scrollTop=top+el.scrollHeight-height;});}catch{ /* The parent displays the error. */ }}}>Load earlier messages</button>}
        {!messages.length && <div className="bubble-empty"><span>✧</span><h4>Start a conversation</h4><p>Share an idea or tell the room what you’d like to build.</p></div>}
        {messages.map(message => <article key={message.id} className={message.sender_id===userId?"mine":""}><header><strong>{message.sender_id===userId?"You":members.find(m=>m.id===message.sender_id)?.name||"Room member"}</strong><time dateTime={message.created_at}>{new Date(message.created_at).toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"})}</time></header><p>{message.body}</p></article>)}
      </div>{unread && <button className="bubble-new" onClick={()=>{scroller.current!.scrollTop=scroller.current!.scrollHeight;atBottom.current=true;setUnread(false);}}>New messages ↓</button>}
      <p className="bubble-typing-line" aria-hidden={typing.length === 0}>{typing.length === 1 ? `${typing[0].name} is typing…` : typing.length > 1 ? `${typing.map(member => member.name).join(", ")} are typing…` : " "}</p>
      <form onSubmit={async event=>{event.preventDefault();setSendError("");try{await send(draft);setDraft("");clearTyping();atBottom.current=true;}catch{setSendError("Message not sent. Your draft is saved here; try again.");}}}><label htmlFor="bubble-message">Message your room</label><textarea id="bubble-message" value={draft} maxLength={4000} onChange={event=>{setDraft(event.target.value); if (event.target.value.trim()) pulseTyping(); else clearTyping();}} placeholder="Share your next big idea…" rows={2}/><div><small>Private to room members</small><button className="hub-button" disabled={busy||!draft.trim()}>Send ↗</button></div>{sendError&&<p role="alert">{sendError}</p>}</form></section>
    </div>
    {panel === "close" && <div className="bubble-modal-backdrop" role="dialog" aria-label="Cancel room">
      <div className="bubble-modal">
        <h3>{room.is_host ? "Exit and close this room?" : "Cancel this room?"}</h3>
        <p>Everyone in “{room.name}” ({members.length} members) will be removed and the chat history deleted. This cannot be undone.</p>
        <label htmlFor="close-reason">Reason (shown to members, optional)</label>
        <textarea id="close-reason" value={closeReason} rows={2} maxLength={200} onChange={event => setCloseReason(event.target.value)} placeholder="Why is the room closing?"/>
        {panelError && <p role="alert">{panelError}</p>}
        <div><button className="hub-text-button" onClick={() => setPanel("none")}>Keep it open</button><button className="hub-button hub-button-danger" disabled={busy} onClick={async () => { try { await cancel?.(closeReason.trim()); setPanel("none"); } catch { setPanelError("The room could not be closed. Try again."); } }}>Cancel room</button></div>
      </div>
    </div>}
    {panel === "team" && isTeamHost && <div className="bubble-modal-backdrop" role="dialog" aria-label="Manage team">
      <div className="bubble-modal bubble-modal-wide">
        <h3>Build the final team</h3>
        <p>Invite campus students, let them accept, tick the finalists, then set the hackathon end date. After that date the team room disappears automatically.</p>
        <h4>1 · Invite students</h4>
        <div className="bubble-pick-list">{candidateInvitees.length === 0 && <p className="bubble-muted">Everyone visible is already in the room.</p>}{candidateInvitees.map(student => <label key={student.id}><input type="checkbox" checked={invitees.includes(student.id)} onChange={event => setInvitees(event.target.checked ? [...invitees, student.id] : invitees.filter(id => id !== student.id))}/><span>{student.name}<small>{student.department} · Year {student.year}</small></span></label>)}</div>
        <div><button className="hub-button" disabled={busy || invitees.length === 0 || !invite} onClick={async () => { try { await invite!(invitees); setInvitees([]); setPanelError(""); } catch { setPanelError("Invitations failed. Try again."); } }}>Send {invitees.length || ""} invitation{invitees.length === 1 ? "" : "s"}</button></div>
        <h4>2 · Select finalists (including yourself)</h4>
        <div className="bubble-pick-list">{members.map(member => <label key={member.id}><input type="checkbox" checked={finalists.includes(member.id) || member.id === userId} disabled={member.id === userId} onChange={event => setFinalists(event.target.checked ? [...finalists, member.id] : finalists.filter(id => id !== member.id))}/><span>{member.name}{member.id === userId ? " (you, host)" : ""}<small>{member.online ? "Online" : "Offline"}</small></span></label>)}</div>
        <h4>3 · Hackathon end date</h4>
        <input type="datetime-local" value={endsAt} onChange={event => setEndsAt(event.target.value)} aria-label="Hackathon end date"/>
        {panelError && <p role="alert">{panelError}</p>}
        <div><button className="hub-text-button" onClick={() => setPanel("none")}>Back to room</button><button className="hub-button" disabled={busy || !endsAt || finalists.length + 1 < 2 || !finalize} onClick={async () => { try { await finalize!([...new Set([...finalists, userId])], new Date(endsAt).toISOString()); setPanel("none"); } catch { setPanelError("Could not finalise. Check the team size and future end date."); } }}>Finalise team</button></div>
      </div>
    </div>}
  </section>;
}
