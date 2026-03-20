import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

/* ─── MS Logo ── */
function MsLogo({ size = 20 }) {
  const s = size / 2 - 1;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `${s}px ${s}px`, gap: 2 }}>
      <div style={{ background: '#f25022', borderRadius: 1, width: s, height: s }} />
      <div style={{ background: '#7fba00', borderRadius: 1, width: s, height: s }} />
      <div style={{ background: '#00a4ef', borderRadius: 1, width: s, height: s }} />
      <div style={{ background: '#ffb900', borderRadius: 1, width: s, height: s }} />
    </div>
  );
}

/* ─── Draggable Window ── */
function Win({ title, icon, initialX, initialY, width = 320, rotate = 0, minimized, zIndex, onFocus, onMinimize, children }) {
  const [pos, setPos] = useState({ x: initialX, y: initialY });
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = e => {
      if (!dragging.current) return;
      setPos({ x: e.clientX - offset.current.x, y: e.clientY - offset.current.y });
    };
    const onUp = () => {
      if (dragging.current) document.body.style.cursor = '';
      dragging.current = false;
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
  }, []);

  return (
    <div
      onMouseDown={onFocus}
      style={{
        position: 'absolute', left: pos.x, top: pos.y, width,
        zIndex, borderRadius: 12, overflow: 'hidden',
        display: minimized ? 'none' : 'block',
        transform: `rotate(${rotate}deg)`,
        boxShadow: '0 24px 72px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.06)',
      }}
    >
      <div
        style={{
          background: '#131313',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          padding: '9px 12px', display: 'flex', alignItems: 'center', gap: 8,
          cursor: 'grab', userSelect: 'none',
          borderTop: '2px solid #f97316',
        }}
        onMouseDown={e => {
          if (e.button !== 0) return;
          dragging.current = true;
          document.body.style.cursor = 'grabbing';
          offset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
          e.preventDefault();
        }}
      >
        <div style={{ display: 'flex', gap: 5, flexShrink: 0 }}>
          <button onClick={e => { e.stopPropagation(); onMinimize(); }}
            style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f57', border: 'none', cursor: 'pointer', padding: 0 }} />
          <button onClick={e => { e.stopPropagation(); onMinimize(); }}
            style={{ width: 11, height: 11, borderRadius: '50%', background: '#ffbd2e', border: 'none', cursor: 'pointer', padding: 0 }} />
          <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#28c840' }} />
        </div>
        <span style={{ flex: 1, textAlign: 'center', fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.04em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {title}
        </span>
        <span style={{ fontSize: 12, flexShrink: 0 }}>{icon}</span>
      </div>
      <div style={{ background: 'var(--c-card)' }}>{children}</div>
    </div>
  );
}

/* ─── Profile Card ── */
function ProfileContent() {
  const highlights = [
    { label: 'GPA', value: '3.72', sub: "Dean's List" },
    { label: 'Hackathon', value: '1st', sub: 'WiCS 2025' },
    { label: 'Internships', value: '3+', sub: 'incl. Microsoft' },
  ];
  const tags = ['React', 'Next.js', 'Node.js', 'Python', 'TypeScript', 'AWS'];
  return (
    <div style={{ padding: '20px 22px', background: 'var(--c-card)' }}>

      {/* Name + role */}
      <div style={{ marginBottom: 16 }}>
        <p style={{ fontSize: 22, fontWeight: 900, color: 'var(--c-text)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          Rahul Baweja
        </p>
        <p style={{ fontSize: 12, color: '#f97316', fontWeight: 600, marginTop: 4, letterSpacing: '0.02em' }}>
          Full-Stack Engineer
        </p>
      </div>

      {/* Bio */}
      <p style={{ fontSize: 12.5, color: 'var(--c-muted)', lineHeight: 1.7, marginBottom: 18 }}>
        CS student at <span style={{ color: 'var(--c-text)', fontWeight: 600 }}>Arizona State</span> (BS/MS 4+1).
        I build production-grade apps, win hackathons, and ship features people actually use.
        Incoming SWE intern at <span style={{ color: '#f97316', fontWeight: 700 }}>Microsoft</span>.
      </p>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 18 }}>
        {highlights.map(({ label, value, sub }) => (
          <div key={label} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 8, padding: '10px 10px 9px' }}>
            <p style={{ fontSize: 9, fontFamily: 'monospace', color: '#484848', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>{label}</p>
            <p style={{ fontSize: 20, fontWeight: 900, color: 'var(--c-text)', lineHeight: 1 }}>{value}</p>
            <p style={{ fontSize: 9, color: '#484848', marginTop: 3 }}>{sub}</p>
          </div>
        ))}
      </div>

      {/* Tech tags */}
      <div>
        <p style={{ fontSize: 9, fontFamily: 'monospace', color: '#383838', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Stack</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {tags.map(t => (
            <span key={t} style={{ fontSize: 10, fontFamily: 'monospace', padding: '3px 9px', borderRadius: 5, background: 'rgba(249,115,22,0.08)', border: '1px solid rgba(249,115,22,0.18)', color: '#f97316' }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Stats JSON ── */
function StatsContent() {
  const rows = [
    ['gpa',         '3.72',              'num'],
    ['dean_list',   'true',              'bool'],
    ['hackathon',   '"1st — WiCS 2025"', 'str'],
    ['internships', '3',                 'num'],
    ['next_role',   '"MSFT SWE Intern"', 'str'],
    ['school',      '"ASU (4+1 BS/MS)"', 'str'],
    ['location',    '"Phoenix, AZ"',     'str'],
    ['available',   'true',              'bool'],
  ];
  return (
    <div style={{ background: '#060606', padding: '12px 16px', fontFamily: '"SF Mono","Fira Code",monospace', fontSize: 11, lineHeight: 2.05 }}>
      <div style={{ color: '#333' }}>{'{'}</div>
      {rows.map(([k, v, type]) => (
        <div key={k} style={{ paddingLeft: 14 }}>
          <span style={{ color: '#4ade80' }}>&quot;{k}&quot;</span>
          <span style={{ color: '#2a2a2a' }}>: </span>
          <span style={{ color: type === 'str' ? '#7aa2c8' : type === 'bool' ? '#f97316' : '#e4b97e' }}>{v}</span>
          <span style={{ color: '#2a2a2a' }}>,</span>
        </div>
      ))}
      <div style={{ color: '#333' }}>{'}'}</div>
    </div>
  );
}

/* ─── Microsoft ── */
function MsftContent() {
  return (
    <div style={{ padding: '16px 18px' }}>
      <p style={{ fontSize: 9, fontFamily: 'monospace', color: '#f97316', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 14 }}>next_role.exe</p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 16 }}>
        <MsLogo size={36} />
        <div>
          <p style={{ fontSize: 16, fontWeight: 900, textTransform: 'uppercase', color: 'var(--c-text)', lineHeight: 1.1 }}>Microsoft</p>
          <p style={{ fontSize: 10, fontFamily: 'monospace', color: 'var(--c-muted)', marginTop: 2 }}>Software Engineer Intern</p>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
        {[['📍', 'Redmond, WA'], ['📅', 'Summer 2026'], ['🏢', 'Azure · Cloud + AI']].map(([e, t]) => (
          <p key={t} style={{ fontSize: 10, fontFamily: 'monospace', color: 'var(--c-subtle)' }}>{e}&nbsp; {t}</p>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 12px', borderRadius: 8, background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.18)', fontSize: 10, fontFamily: 'monospace', color: '#22c55e', fontWeight: 700 }}>
        ✓&nbsp;&nbsp;OFFER CONFIRMED
      </div>
    </div>
  );
}

/* ─── Photo ── */
function PhotoContent() {
  return (
    <div>
      <div style={{ position: 'relative', height: 260 }}>
        <Image src="/assets/RahulLA.png" alt="Rahul Baweja" fill style={{ objectFit: 'cover', objectPosition: '50% 18%' }} />
      </div>
      <div style={{ padding: '10px 14px', background: '#0e0e0e', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--c-text)', fontFamily: 'monospace' }}>rahul_baweja.png</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 3 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
          <p style={{ fontSize: 9, color: '#22c55e', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Open to work · Phoenix, AZ</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Barça Card ── */
const BARCA_BG = 'repeating-linear-gradient(90deg,#003580 0px,#003580 24px,#a50044 24px,#a50044 48px)';
function BarcaContent() {
  return (
    <div style={{ position: 'relative', height: 260, backgroundImage: BARCA_BG, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 14px', background: 'rgba(0,0,0,0.5)', borderBottom: '1px solid rgba(237,187,0,0.15)' }}>
        <span style={{ fontSize: 9, fontFamily: 'monospace', color: 'rgba(255,255,255,0.8)', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700 }}>FC Barcelona</span>
        <span style={{ color: '#EDBB00', fontSize: 10, letterSpacing: 3 }}>★★★★★</span>
      </div>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: 10 }}>
        <p style={{ fontSize: 108, fontWeight: 900, color: 'rgba(255,255,255,0.95)', lineHeight: 1, textShadow: '0 0 60px rgba(237,187,0,0.5),0 4px 30px rgba(0,0,0,1)', userSelect: 'none' }}>10</p>
        <p style={{ fontSize: 15, fontWeight: 900, color: 'rgba(255,255,255,0.9)', letterSpacing: '0.35em', textTransform: 'uppercase', marginTop: -4 }}>MESSI</p>
        <p style={{ fontSize: 9, color: '#EDBB00', fontFamily: 'monospace', letterSpacing: '0.3em', marginTop: 8 }}>G · O · A · T</p>
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', padding: '7px 14px', background: 'rgba(0,0,0,0.55)' }}>
        <span style={{ fontSize: 8, fontFamily: 'monospace', color: 'rgba(255,255,255,0.2)' }}>barca.fancard</span>
        <span style={{ fontSize: 8, fontFamily: 'monospace', color: 'rgba(255,255,255,0.2)' }}>BLAUGRANA ⚽</span>
      </div>
    </div>
  );
}

/* ─── Delhi Capitals ── */
function DcContent() {
  return (
    <div style={{ position: 'relative', height: 260, background: 'linear-gradient(150deg,#0d2d6b 0%,#061540 55%,#9b0018 100%)', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.28)' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 14px', background: 'rgba(0,0,0,0.5)', borderBottom: '1px solid rgba(239,28,37,0.18)' }}>
        <span style={{ fontSize: 9, fontFamily: 'monospace', color: 'rgba(255,255,255,0.8)', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700 }}>Delhi Capitals</span>
        <span style={{ fontSize: 9, fontFamily: 'monospace', color: '#EF1C25', fontWeight: 700, letterSpacing: '0.12em' }}>IPL</span>
      </div>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: 10 }}>
        <p style={{ fontSize: 108, fontWeight: 900, color: 'rgba(255,255,255,0.95)', lineHeight: 1, textShadow: '0 0 60px rgba(239,28,37,0.6),0 4px 30px rgba(0,0,0,1)', userSelect: 'none' }}>18</p>
        <p style={{ fontSize: 15, fontWeight: 900, color: 'rgba(255,255,255,0.9)', letterSpacing: '0.35em', textTransform: 'uppercase', marginTop: -4 }}>KOHLI</p>
        <p style={{ fontSize: 9, color: '#EF1C25', fontFamily: 'monospace', letterSpacing: '0.3em', marginTop: 8 }}>K · I · N · G</p>
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', padding: '7px 14px', background: 'rgba(0,0,0,0.55)' }}>
        <span style={{ fontSize: 8, fontFamily: 'monospace', color: 'rgba(255,255,255,0.2)' }}>dc.fancard</span>
        <span style={{ fontSize: 8, fontFamily: 'monospace', color: 'rgba(255,255,255,0.2)' }}>ALWAYS DC 🏏</span>
      </div>
    </div>
  );
}

/* ─── Recruiter Notepad ── */
function NotepadContent() {
  const [text, setText] = useState('');
  return (
    <div style={{ background: '#fefce8', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ background: '#fef9c3', borderBottom: '1px solid #fde68a', padding: '10px 14px' }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: '#92400e', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2 }}>
          🔒 STRICTLY FOR RECRUITERS
        </p>
        <p style={{ fontSize: 9, fontFamily: 'monospace', color: '#a16207' }}>
          confidential notes about rahul baweja (hire him)
        </p>
      </div>
      {/* Lined paper */}
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: 40, width: 1, background: 'rgba(239,68,68,0.22)', zIndex: 1, pointerEvents: 'none' }} />
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder={"your notes here...\n\n(hint: 'strong hire, schedule asap')"}
          spellCheck={false}
          style={{
            width: '100%', height: 248, resize: 'none', outline: 'none', border: 'none',
            background: 'repeating-linear-gradient(#fefce8, #fefce8 23px, #fde68a 23px, #fde68a 24px)',
            fontFamily: '"Caveat", "Comic Sans MS", cursive', fontSize: 14, lineHeight: '24px',
            color: '#1c1917', padding: '4px 14px 4px 52px', boxSizing: 'border-box',
            cursor: 'text',
          }}
        />
      </div>
      <div style={{ background: '#fef9c3', borderTop: '1px solid #fde68a', padding: '6px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 9, fontFamily: 'monospace', color: '#a16207' }}>⚠ unauthorised use will result in missing out on a great hire</span>
        <span style={{ fontSize: 9, fontFamily: 'monospace', color: '#d97706' }}>{text.length} chars</span>
      </div>
    </div>
  );
}

/* ─── Interests ── */
function InterestsContent() {
  const items = [['🎮','Gaming','Ranked & suffering'],['🌙','2AM dev','Best PRs written here'],['☕','Coffee','Fuel for late nights'],['🎵','Music','Always shuffling']];
  return (
    <div style={{ padding: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7 }}>
      {items.map(([e, l, s]) => (
        <div key={l} style={{ background: '#0e0e0e', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8, padding: '10px 11px', display: 'flex', alignItems: 'center', gap: 9 }}>
          <span style={{ fontSize: 17 }}>{e}</span>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--c-text)' }}>{l}</p>
            <p style={{ fontSize: 9, fontFamily: 'monospace', color: '#404040', marginTop: 2 }}>{s}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── Desktop ── */
/*
  Layout (3 columns, no overlap on load):
  Col1  x:16,  w:382  → right:398
  Col2  x:410, w:248  → right:658
  Col3  x:670, w:258  → right:928

  terminal   col1  y:12   h:~322   bottom:334
  photo      col2  y:12   h:~302   bottom:314
  msft       col3  y:12   h:~265   bottom:277
  interests  col3  y:289  h:~150   bottom:439
  stats      col2  y:326  h:~260   bottom:586
  barca      col1  y:346  h:~292   (minimized – open via taskbar)
  dc         col1+, y:330          (minimized – open via taskbar)
*/
const WINS = [
  { id: 'terminal',  title: 'rahul.baweja.md',             icon: '👤', x: 16,  y: 12,  w: 382, minStart: false, rotate: 0   },
  { id: 'photo',     title: 'rahul_baweja.png',           icon: '🖼', x: 410, y: 12,  w: 248, minStart: false, rotate: 0   },
  { id: 'msft',      title: 'next_role.exe',              icon: '■',  x: 670, y: 12,  w: 258, minStart: false, rotate: 0   },
  { id: 'interests', title: 'interests/',                 icon: '✦',  x: 670, y: 289, w: 258, minStart: false, rotate: 0   },
  { id: 'stats',     title: 'stats.json',                 icon: '{}', x: 410, y: 326, w: 248, minStart: false, rotate: 0   },
  { id: 'barca',    title: 'barca.fancard',        icon: '⚽', x: 18,  y: 346, w: 258, minStart: true,  rotate: -2  },
  { id: 'dc',       title: 'dc.fancard',           icon: '🏏', x: 290, y: 326, w: 258, minStart: true,  rotate: 1.8 },
  { id: 'notepad',  title: 'recruiter_notes.txt',  icon: '📋', x: 940, y: 12,  w: 300, minStart: false, rotate: 0   },
];

const WIN_CONTENT = {
  terminal:  <ProfileContent />,
  photo:     <PhotoContent />,
  msft:      <MsftContent />,
  stats:     <StatsContent />,
  barca:     <BarcaContent />,
  dc:        <DcContent />,
  interests: <InterestsContent />,
  notepad:   <NotepadContent />,
};

const TASKBAR_LABELS = {
  terminal:  'about',
  photo:     'photo',
  msft:      'msft',
  interests: 'vibes',
  stats:     'stats',
  barca:     'barça',
  dc:        'dc',
  notepad:   'notes',
};

function Desktop() {
  const [minimized, setMinimized] = useState(() => Object.fromEntries(WINS.map(w => [w.id, w.minStart])));
  const [zMap,  setZMap]  = useState(() => Object.fromEntries(WINS.map((w, i) => [w.id, i + 1])));
  const [maxZ,  setMaxZ]  = useState(WINS.length + 1);
  const [time,  setTime]  = useState(new Date());

  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);

  const focus    = id => { const z = maxZ + 1; setMaxZ(z); setZMap(p => ({ ...p, [id]: z })); };
  const minimize = id => setMinimized(p => ({ ...p, [id]: true }));
  const restore  = id => { setMinimized(p => ({ ...p, [id]: false })); focus(id); };

  const timeStr = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateStr = time.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });

  return (
    /* Navbar is fixed at top:16, height:44 → bottom of nav = 60px. Add 12px breathing room → start at 72px. */
    <div style={{ paddingTop: 72, height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Desktop canvas */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        {/* Subtle center glow */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 30%, rgba(249,115,22,0.03) 0%, transparent 70%)' }} />

        {/* OS watermark */}
        <p style={{ position: 'absolute', bottom: 60, right: 20, fontSize: 9, fontFamily: 'monospace', color: 'rgba(255,255,255,0.03)', letterSpacing: '0.35em', userSelect: 'none', zIndex: 0 }}>
          RAHUL.OS v1.0
        </p>

        {WINS.map(cfg => (
          <Win key={cfg.id} title={cfg.title} icon={cfg.icon}
            initialX={cfg.x} initialY={cfg.y} width={cfg.w} rotate={cfg.rotate}
            minimized={minimized[cfg.id]} zIndex={zMap[cfg.id]}
            onFocus={() => focus(cfg.id)} onMinimize={() => minimize(cfg.id)}>
            {WIN_CONTENT[cfg.id]}
          </Win>
        ))}
      </div>

      {/* Taskbar — anchored to bottom */}
      <div style={{
        height: 46, flexShrink: 0,
        background: 'rgba(6,6,6,0.97)', borderTop: '1px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(20px)', display: 'flex', alignItems: 'center',
        padding: '0 12px', gap: 2, zIndex: 9999,
      }}>
        <div style={{ display: 'flex', gap: 1, flex: 1 }}>
          {WINS.map(cfg => {
            const active = !minimized[cfg.id];
            return (
              <button key={cfg.id}
                onClick={() => active ? minimize(cfg.id) : restore(cfg.id)}
                title={cfg.title}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  gap: 2, padding: '4px 10px', borderRadius: 7, border: 'none', cursor: 'pointer',
                  background: active ? 'rgba(255,255,255,0.07)' : 'transparent',
                  transition: 'all 0.15s',
                }}>
                <span style={{ fontSize: 13, opacity: active ? 1 : 0.3 }}>{cfg.icon}</span>
                <span style={{ fontSize: 8, fontFamily: 'monospace', color: active ? '#f97316' : '#2a2a2a', letterSpacing: '0.05em' }}>
                  {TASKBAR_LABELS[cfg.id]}
                </span>
              </button>
            );
          })}
        </div>

        <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.06)', margin: '0 8px' }} />

        <div style={{ display: 'flex', gap: 14, alignItems: 'center', paddingRight: 12 }}>
          {[{ href: 'https://github.com/rahulbaweja7', label: 'GH' },
            { href: 'https://www.linkedin.com/in/rahulbaweja-/', label: 'LI' },
            { href: 'mailto:rbaweja1@asu.edu', label: '✉' }].map(({ href, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 10, fontFamily: 'monospace', fontWeight: 700, color: '#333', textDecoration: 'none', transition: 'color 0.15s', letterSpacing: '0.05em' }}
              onMouseEnter={e => e.target.style.color = '#f97316'}
              onMouseLeave={e => e.target.style.color = '#333'}>
              {label}
            </a>
          ))}
        </div>

        <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.06)' }} />

        <div style={{ textAlign: 'right', padding: '0 8px' }}>
          <p style={{ fontSize: 11, fontFamily: 'monospace', color: 'var(--c-text)', lineHeight: 1.3, whiteSpace: 'nowrap' }}>{timeStr}</p>
          <p style={{ fontSize: 9, fontFamily: 'monospace', color: '#383838', lineHeight: 1.3, whiteSpace: 'nowrap' }}>{dateStr}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Mobile ── */
function Mobile() {
  return (
    <div className="px-4 pt-24 pb-10 space-y-3">
      <div className="rounded-xl overflow-hidden" style={{ border: '1.5px dashed rgba(249,115,22,0.35)' }}>
        <div className="relative h-52">
          <Image src="/assets/RahulLA.png" alt="Rahul" fill priority style={{ objectFit: 'cover', objectPosition: '50% 18%' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,rgba(0,0,0,0.8) 0%,transparent 55%)' }} />
          <div className="absolute bottom-0 left-0 right-0 px-4 py-3">
            <p className="font-bold text-sm text-white">Rahul Baweja</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <p className="text-[10px] font-mono text-green-400">Open to work</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-dark-border p-5" style={{ background: 'var(--c-card)' }}>
        <p className="text-[9px] font-mono text-text-subtle uppercase tracking-widest mb-2">{'// about.txt'}</p>
        <h1 className="text-2xl font-black uppercase mb-3 leading-tight" style={{ color: 'var(--c-text)' }}>I build things<br />people use.</h1>
        <p className="text-text-muted text-sm leading-relaxed mb-4">
          CS student at ASU (4+1 BS/MS). Shipped production code, won hackathons, TA&apos;d 100+ students. Incoming SWE intern at <span className="text-accent font-semibold">Microsoft</span>.
        </p>
        <div className="flex items-center gap-2 p-3 rounded-lg" style={{ background: 'rgba(249,115,22,0.06)', border: '1px solid rgba(249,115,22,0.2)' }}>
          <MsLogo size={24} />
          <div>
            <p className="text-xs font-black uppercase" style={{ color: 'var(--c-text)' }}>Microsoft</p>
            <p className="text-[10px] font-mono text-text-subtle">SWE Intern · Summer 2026 · Redmond, WA</p>
          </div>
          <span className="ml-auto text-[9px] font-mono font-bold px-2 py-0.5 rounded" style={{ background: 'rgba(34,197,94,0.1)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.2)' }}>✓</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[['GPA','3.72',"Dean's List",null],['Hackathon','1st','WiCS 2025','#f97316'],['School','ASU','4+1 BS/MS',null],['Internships','3','+1 incoming',null]].map(([l,v,s,c]) => (
          <div key={l} className="rounded-xl border border-dark-border p-4" style={{ background: 'var(--c-card)' }}>
            <p className="text-[9px] font-mono text-text-subtle uppercase mb-2">{l}</p>
            <p className="text-2xl font-black mb-1" style={{ color: c || 'var(--c-text)' }}>{v}</p>
            <p className="text-[9px] font-mono text-text-subtle">{s}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(0,53,128,0.4)' }}>
        <div style={{ position: 'relative', height: 190, backgroundImage: BARCA_BG, overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.42)' }} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ fontSize: 86, fontWeight: 900, color: 'white', lineHeight: 1, textShadow: '0 0 40px rgba(237,187,0,0.5)', userSelect: 'none' }}>10</p>
            <p style={{ fontSize: 13, fontWeight: 900, color: 'white', letterSpacing: '0.3em', textTransform: 'uppercase', marginTop: -4 }}>MESSI · FC BARCELONA</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(14,45,107,0.4)' }}>
        <div style={{ position: 'relative', height: 190, background: 'linear-gradient(150deg,#0d2d6b 0%,#061540 55%,#9b0018 100%)', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)' }} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ fontSize: 86, fontWeight: 900, color: 'white', lineHeight: 1, textShadow: '0 0 40px rgba(239,28,37,0.55)', userSelect: 'none' }}>18</p>
            <p style={{ fontSize: 13, fontWeight: 900, color: 'white', letterSpacing: '0.3em', textTransform: 'uppercase', marginTop: -4 }}>KOHLI · DELHI CAPITALS</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Boot Screen ── */
const BIOS_LINES = [
  { t: 'RAHUL_BIOS  v2.5.1  ·  2026',                          c: '#22c55e' },
  { t: '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',          c: '#1c1c1c' },
  { t: '' },
  { t: 'CPU      Full-Stack Cortex X9  @  ∞ GHz',              c: '#3a3a3a' },
  { t: 'RAM      847  shipped features  [all working]',         c: '#3a3a3a' },
  { t: 'DISK     /dev/coffee            [always mounted]',      c: '#3a3a3a' },
  { t: 'NET      github · linkedin      [connected]',           c: '#3a3a3a' },
  { t: 'GPU      Creative Vision Pro Max Ultra',                c: '#3a3a3a' },
  { t: '' },
  { t: 'Running POST diagnostics...',                           c: '#22c55e' },
  { t: '' },
  { t: 'personality.js           ............  OK',             c: '#2e2e2e' },
  { t: 'hackathon_wins/          ............  OK  [1st place]',c: '#2e2e2e' },
  { t: 'microsoft_offer.dat      ............  OK  [confirmed]',c: '#2e2e2e' },
  { t: 'imposter_syndrome.exe    ............  NOT FOUND',      c: '#2e2e2e' },
  { t: 'coffee_dependency.exe    ............  CRITICAL',       c: '#f97316' },
  { t: 'ego_check.sh             ............  CALIBRATED',     c: '#2e2e2e' },
  { t: 'vibe_alignment.bin       ............  IMMACULATE',     c: '#2e2e2e' },
  { t: 'linkedin_dm_queue        ............  OVERFLOW',       c: '#2e2e2e' },
  { t: '' },
  { t: 'All systems nominal. No errors detected.',              c: '#22c55e' },
  { t: '' },
  { t: '▶  Launching RAHUL.OS...',                              c: '#f97316' },
];

function BootScreen({ onDone }) {
  // phase: 'bios' → 'flash' → 'glitch' → 'fading'
  const [phase, setPhase] = useState('bios');
  const [shown, setShown] = useState(0);
  const ref = useRef(null);
  const skipRef = useRef(false);

  const skip = () => {
    if (skipRef.current) return;
    skipRef.current = true;
    setPhase('fading');
    setTimeout(onDone, 520);
  };

  useEffect(() => {
    const INTERVAL = 80; // ms per BIOS line
    const totalBios = BIOS_LINES.length * INTERVAL;

    const lineTimers = BIOS_LINES.map((_, i) =>
      setTimeout(() => setShown(i + 1), i * INTERVAL)
    );

    // Brief white flash after BIOS
    const tFlash  = setTimeout(() => setPhase('flash'),  totalBios + 500);
    const tGlitch = setTimeout(() => setPhase('glitch'), totalBios + 750);
    const tFade   = setTimeout(() => setPhase('fading'), totalBios + 2400);
    const tDone   = setTimeout(() => onDone(),           totalBios + 2950);

    return () => { [...lineTimers, tFlash, tGlitch, tFade, tDone].forEach(clearTimeout); };
  }, [onDone]);

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [shown]);

  return (
    <div
      onClick={skip}
      style={{
        position: 'fixed', inset: 0, zIndex: 99999,
        background: phase === 'flash' ? '#fff' : '#000',
        fontFamily: '"SF Mono","Fira Code",monospace',
        opacity: phase === 'fading' ? 0 : 1,
        transition: phase === 'fading' ? 'opacity 0.5s ease' : phase === 'flash' ? 'background 0.06s' : 'none',
        pointerEvents: phase === 'fading' ? 'none' : 'all',
        overflow: 'hidden',
      }}
    >
      {/* CRT scanlines overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10,
        backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.2) 2px,rgba(0,0,0,0.2) 4px)',
      }} />

      {/* ── BIOS phase ── */}
      {(phase === 'bios') && (
        <div ref={ref} style={{
          position: 'absolute', inset: 0,
          padding: 'clamp(24px,5vh,60px) clamp(24px,6vw,80px)',
          overflowY: 'hidden', fontSize: 12, lineHeight: '21px', zIndex: 1,
        }}>
          {BIOS_LINES.slice(0, shown).map((line, i) => (
            <div key={i} style={{ color: line.c }}>{line.t || '\u00A0'}</div>
          ))}
          {shown > 0 && shown <= BIOS_LINES.length && (
            <span className="animate-blink" style={{ color: '#22c55e' }}>█</span>
          )}
        </div>
      )}

      {/* ── Glitch phase ── */}
      {(phase === 'glitch' || phase === 'fading') && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: 0,
        }}>
          {/* Big glitched logo */}
          <div className="glitch-shake" style={{ position: 'relative', userSelect: 'none', lineHeight: 1 }}>
            {/* Main */}
            <p style={{ fontSize: 'clamp(64px,10vw,128px)', fontWeight: 900, color: '#f97316', letterSpacing: '-0.02em', margin: 0 }}>
              RAHUL.OS
            </p>
            {/* Red ghost */}
            <p className="glitch-r" style={{ position: 'absolute', inset: 0, margin: 0, fontSize: 'clamp(64px,10vw,128px)', fontWeight: 900, color: '#ff2060', letterSpacing: '-0.02em', opacity: 0.75 }}>
              RAHUL.OS
            </p>
            {/* Cyan ghost */}
            <p className="glitch-c" style={{ position: 'absolute', inset: 0, margin: 0, fontSize: 'clamp(64px,10vw,128px)', fontWeight: 900, color: '#00fff9', letterSpacing: '-0.02em', opacity: 0.75 }}>
              RAHUL.OS
            </p>
          </div>

          <p style={{ fontSize: 11, color: '#2a2a2a', letterSpacing: '0.4em', marginTop: 20, textTransform: 'uppercase' }}>
            v1.0 · desktop environment
          </p>
        </div>
      )}

      {/* Skip hint */}
      <p style={{
        position: 'absolute', bottom: 28, right: 32,
        fontSize: 9, color: '#222', letterSpacing: '0.12em',
        opacity: shown >= 5 && phase === 'bios' ? 1 : 0,
        transition: 'opacity 0.4s ease',
        zIndex: 20,
      }}>
        click to skip
      </p>
    </div>
  );
}

/* ─── Page ── */
export default function About() {
  const [booted, setBooted] = useState(false);

  return (
    <div style={{ background: 'var(--c-bg)', height: '100vh', overflow: 'hidden' }}>
      <Head>
        <title>About | Rahul Baweja</title>
        <meta name="description" content="About Rahul Baweja — RAHUL.OS" />
      </Head>

      {/* Boot animation — desktop only */}
      <div className="hidden md:block">
        {!booted && <BootScreen onDone={() => setBooted(true)} />}
      </div>

      <Navbar />
      <div className="hidden md:block" style={{ height: '100vh' }}><Desktop /></div>
      <div className="md:hidden" style={{ minHeight: '100vh', overflowY: 'auto' }}><Mobile /></div>
    </div>
  );
}
