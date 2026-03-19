import Head from 'next/head';
import Navbar from '@/components/Navbar';
import { useEffect, useRef } from 'react';

/* ── Data ───────────────────────────────────────────────────────── */
const stats = [
  {
    id: '01',
    label: 'Frontend',
    xp: 4800,
    level: 88,
    items: ['React', 'Next.js', 'Tailwind CSS', 'Angular', 'HTML', 'CSS', 'Material-UI'],
  },
  {
    id: '02',
    label: 'Backend',
    xp: 4100,
    level: 76,
    items: ['Node.js', 'Express.js', 'Spring Boot', 'Flask', 'REST APIs', 'GraphQL'],
  },
  {
    id: '03',
    label: 'Languages',
    xp: 3700,
    level: 70,
    items: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C', 'C++'],
  },
  {
    id: '04',
    label: 'Databases',
    xp: 3200,
    level: 62,
    items: ['MongoDB', 'PostgreSQL', 'MySQL', 'DynamoDB'],
  },
  {
    id: '05',
    label: 'Cloud & Infra',
    xp: 2600,
    level: 52,
    items: ['AWS', 'Azure', 'Docker', 'Git'],
  },
  {
    id: '06',
    label: 'Skill Tree: Unlocking',
    xp: 800,
    level: 18,
    items: ['Rust', 'Go', 'System Design', 'Deep Learning'],
    learning: true,
  },
];

const achievements = [
  { icon: '🏆', label: 'WiCS 2025 Winner',      sub: '1st place hackathon' },
  { icon: '💼', label: 'Microsoft SWE Intern',   sub: 'Summer 2025' },
  { icon: '🎓', label: 'Arizona State Univ.',    sub: 'CS · GPA 3.72' },
  { icon: '⚽', label: 'Football Fanatic',        sub: 'Watching > sleeping' },
  { icon: '🎮', label: 'Gamer',                  sub: 'When not coding' },
  { icon: '🌙', label: '2AM Debugger',           sub: 'Consistently' },
];

/* ── Animated XP bar ────────────────────────────────────────────── */
function XpBar({ level, learning, delay = 0 }) {
  const barRef = useRef(null);
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const timer = setTimeout(() => {
      el.style.width = level + '%';
    }, delay);
    return () => clearTimeout(timer);
  }, [level, delay]);

  return (
    <div className="h-1 rounded-full overflow-hidden" style={{ background: '#1a1a1a' }}>
      <div
        ref={barRef}
        className="h-full rounded-full"
        style={{
          width: 0,
          transition: 'width 1.1s cubic-bezier(0.25, 1, 0.5, 1)',
          background: learning
            ? 'linear-gradient(90deg, #2a2a2a 0%, #484848 100%)'
            : `linear-gradient(90deg, #f97316 0%, #fb923c ${level}%)`,
        }}
      />
    </div>
  );
}

/* ── Stat card ──────────────────────────────────────────────────── */
function StatCard({ stat, delay }) {
  return (
    <div
      className="card-interactive rounded-xl p-5 border border-dark-border flex flex-col gap-4 animate-fade-in-up"
      style={{ opacity: 0, animationFillMode: 'forwards', animationDelay: `${delay}s` }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="text-[10px] font-mono text-text-subtle block mb-1">
            [{stat.id}] // {stat.label.toUpperCase()}
          </span>
          <div className="flex items-baseline gap-2">
            <span
              className="text-2xl font-black"
              style={{ color: stat.learning ? '#484848' : '#efefef' }}
            >
              {stat.level}
            </span>
            <span className="text-[10px] font-mono text-text-subtle">LVL</span>
          </div>
        </div>
        <span
          className="text-[10px] font-mono px-2 py-1 rounded border mt-1"
          style={{
            color: stat.learning ? '#484848' : '#f97316',
            borderColor: stat.learning ? '#2a2a2a' : 'rgba(249,115,22,0.2)',
            background: stat.learning ? 'transparent' : 'rgba(249,115,22,0.04)',
          }}
        >
          {stat.xp.toLocaleString()} XP
        </span>
      </div>

      {/* XP bar */}
      <XpBar level={stat.level} learning={stat.learning} delay={delay * 1000 + 300} />

      {/* Skill pills */}
      <div className="flex flex-wrap gap-1.5">
        {stat.items.map((item, i) => (
          <span
            key={i}
            className="text-[11px] px-2.5 py-1 rounded font-mono border transition-colors duration-200"
            style={{
              color: stat.learning ? '#484848' : '#808080',
              borderColor: stat.learning ? '#1f1f1f' : '#2a2a2a',
              background: '#111',
            }}
          >
            {stat.learning && <span className="mr-1 opacity-40">~</span>}
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Page ───────────────────────────────────────────────────────── */
export default function Skills() {
  return (
    <div className="min-h-screen bg-dark">
      <Head>
        <title>Skills | Rahul Baweja</title>
        <meta name="description" content="Skills and stack of Rahul Baweja" />
      </Head>
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 pt-28 pb-20">

        {/* ── Player card ──────────────────────────────────────── */}
        <div
          className="mb-8 rounded-2xl p-6 animate-fade-in-up"
          style={{
            opacity: 0,
            animationFillMode: 'forwards',
            border: '1.5px dashed rgba(249,115,22,0.35)',
          }}
        >
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <div>
              <p className="text-[10px] font-mono text-text-subtle uppercase tracking-widest mb-1">player_id</p>
              <p className="text-[#efefef] font-mono text-sm">rahulbaweja7</p>
            </div>
            <div>
              <p className="text-[10px] font-mono text-text-subtle uppercase tracking-widest mb-1">class</p>
              <p className="text-[#efefef] font-mono text-sm">Full-Stack Engineer</p>
            </div>
            <div>
              <p className="text-[10px] font-mono text-text-subtle uppercase tracking-widest mb-1">faction</p>
              <p className="text-[#efefef] font-mono text-sm">ASU → Microsoft</p>
            </div>
            <div>
              <p className="text-[10px] font-mono text-text-subtle uppercase tracking-widest mb-1">status</p>
              <p className="flex items-center gap-1.5 font-mono text-sm text-green-400">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                open_to_work
              </p>
            </div>
            <div className="ml-auto text-right hidden sm:block">
              <p className="text-[10px] font-mono text-text-subtle uppercase tracking-widest mb-1">total XP</p>
              <p className="text-accent font-mono text-sm font-bold">
                {stats.reduce((sum, s) => sum + s.xp, 0).toLocaleString()} XP
              </p>
            </div>
          </div>
        </div>

        {/* ── Page title ───────────────────────────────────────── */}
        <div
          className="mb-8 animate-fade-in-up delay-100"
          style={{ opacity: 0, animationFillMode: 'forwards' }}
        >
          <p className="text-[10px] font-mono text-text-subtle uppercase tracking-widest mb-2">Character stats</p>
          <h1 className="text-4xl sm:text-5xl font-black uppercase text-[#efefef] leading-none">
            Skill<br />
            <span style={{ color: '#2c2c2c' }}>Sheet.</span>
          </h1>
        </div>

        {/* ── Stats grid ───────────────────────────────────────── */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {stats.map((stat, i) => (
            <StatCard key={stat.id} stat={stat} delay={0.15 + i * 0.07} />
          ))}
        </div>

        {/* ── Achievements ─────────────────────────────────────── */}
        <div
          className="animate-fade-in-up"
          style={{ opacity: 0, animationFillMode: 'forwards', animationDelay: '0.65s' }}
        >
          <p className="text-[10px] font-mono text-text-subtle uppercase tracking-widest mb-4">
            // ACHIEVEMENTS_UNLOCKED
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {achievements.map((a, i) => (
              <div
                key={i}
                className="card-interactive rounded-xl border border-dark-border px-4 py-3 flex items-center gap-3"
              >
                <span className="text-xl shrink-0">{a.icon}</span>
                <div className="min-w-0">
                  <p className="text-[#efefef] text-[12px] font-medium truncate">{a.label}</p>
                  <p className="text-text-subtle text-[10px] font-mono truncate">{a.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
