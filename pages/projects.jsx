import Head from 'next/head';
import Navbar from '@/components/Navbar';
import { FaGithub, FaExternalLinkAlt, FaTrophy } from 'react-icons/fa';

/* ── Inline mockup visuals ─────────────────────────────────────── */

function SeraMockup() {
  return (
    <div className="h-full flex flex-col rounded-xl overflow-hidden border border-dark-border font-mono text-xs select-none" style={{ background: 'var(--c-card-alt)' }}>
      {/* bar */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-dark-border" style={{ background: 'var(--c-deep)' }}>
        <span className="w-2.5 h-2.5 rounded-full bg-dark-border" />
        <span className="w-2.5 h-2.5 rounded-full bg-dark-border" />
        <span className="w-2.5 h-2.5 rounded-full bg-dark-border" />
        <span className="ml-3 text-text-subtle text-[10px]">SERA — AI Health Assistant</span>
      </div>
      <div className="flex-1 overflow-hidden p-4 space-y-3">
        {/* AI msg */}
        <div className="flex gap-2 items-end">
          <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent text-[8px] shrink-0">S</div>
          <div className="bg-dark-card border border-dark-border rounded-2xl rounded-bl-sm px-3 py-2 max-w-[75%]">
            <p className="text-[11px] leading-relaxed" style={{ color: 'var(--c-text)' }}>Hi! I&apos;m SERA. How can I help you today?</p>
          </div>
        </div>
        {/* user msg */}
        <div className="flex justify-end">
          <div className="bg-accent/10 border border-accent/20 rounded-2xl rounded-br-sm px-3 py-2 max-w-[75%]">
            <p className="text-[11px] leading-relaxed" style={{ color: 'var(--c-text)' }}>What are some healthy lifestyle tips?</p>
          </div>
        </div>
        {/* AI msg */}
        <div className="flex gap-2 items-end">
          <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent text-[8px] shrink-0">S</div>
          <div className="bg-dark-card border border-dark-border rounded-2xl rounded-bl-sm px-3 py-2 max-w-[80%]">
            <p className="text-[11px] leading-relaxed" style={{ color: 'var(--c-text)' }}>
              Great question! Here are a few key habits:<br />
              <span className="text-accent">01.</span> Sleep 7–9 hours<br />
              <span className="text-accent">02.</span> Stay hydrated<br />
              <span className="text-accent">03.</span> Move daily
            </p>
          </div>
        </div>
        {/* typing indicator */}
        <div className="flex gap-2 items-end">
          <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent text-[8px] shrink-0">S</div>
          <div className="bg-dark-card border border-dark-border rounded-2xl rounded-bl-sm px-3 py-2">
            <div className="flex gap-1 items-center h-3">
              <span className="w-1.5 h-1.5 rounded-full bg-text-subtle animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-text-subtle animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-text-subtle animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>
      </div>
      {/* input */}
      <div className="px-4 py-3 border-t border-dark-border flex gap-2">
        <div className="flex-1 bg-dark-card border border-dark-border rounded-lg px-3 py-1.5 text-text-subtle text-[11px]">
          Ask SERA anything…
        </div>
        <div className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent text-[10px]">↑</div>
      </div>
    </div>
  );
}

function MacroMockup() {
  const macros = [
    { label: 'Protein', val: 134, max: 160, color: '#f97316' },
    { label: 'Carbs',   val: 210, max: 250, color: '#efefef' },
    { label: 'Fats',    val: 48,  max: 65,  color: '#484848' },
  ];
  return (
    <div className="rounded-xl border border-dark-border p-5 select-none font-mono" style={{ background: 'var(--c-card-alt)' }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] uppercase tracking-widest text-text-subtle">Today&apos;s Macros</span>
        <span className="text-[10px] text-accent">1,820 / 2,200 kcal</span>
      </div>
      <div className="flex justify-center mb-5">
        <div className="relative w-20 h-20">
          <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
            <circle cx="40" cy="40" r="32" fill="none" stroke="#1a1a1a" strokeWidth="8" />
            <circle cx="40" cy="40" r="32" fill="none" stroke="#f97316" strokeWidth="8"
              strokeDasharray="201" strokeDashoffset="50" strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-base font-bold" style={{ color: 'var(--c-text)' }}>83%</span>
            <span className="text-text-subtle text-[9px]">goal</span>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        {macros.map(m => (
          <div key={m.label}>
            <div className="flex justify-between mb-1">
              <span className="text-[10px] text-text-subtle">{m.label}</span>
              <span className="text-[10px]" style={{ color: m.color }}>{m.val}g</span>
            </div>
            <div className="h-1.5 bg-dark-card rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${(m.val / m.max) * 100}%`, background: m.color }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuizMockup() {
  return (
    <div className="rounded-xl border border-dark-border p-5 select-none font-mono" style={{ background: 'var(--c-card-alt)' }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] uppercase tracking-widest text-text-subtle">QuizModoro</span>
        <span className="text-[10px] text-green-400">Focus Mode</span>
      </div>
      <div className="flex justify-center mb-4">
        <div className="relative w-20 h-20">
          <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
            <circle cx="40" cy="40" r="32" fill="none" stroke="#1a1a1a" strokeWidth="7" />
            <circle cx="40" cy="40" r="32" fill="none" stroke="#22c55e" strokeWidth="7"
              strokeDasharray="201" strokeDashoffset="100" strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-base font-bold" style={{ color: 'var(--c-text)' }}>12:34</span>
            <span className="text-text-subtle text-[9px]">remaining</span>
          </div>
        </div>
      </div>
      <div className="bg-dark-card border border-dark-border rounded-lg p-3 mb-3">
        <p className="text-[11px] leading-snug" style={{ color: 'var(--c-text)' }}>What does &apos;O&apos; stand for in SOLID?</p>
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        {['Open/Closed', 'Object-Oriented', 'Overloading', 'Observable'].map((opt, i) => (
          <div key={i} className={`rounded-md px-2 py-1.5 border text-[10px] text-center ${i === 0 ? 'border-green-500/40 bg-green-500/5 text-green-400' : 'border-dark-border text-text-subtle'}`}>
            {opt}
          </div>
        ))}
      </div>
    </div>
  );
}

function WordleMockup() {
  const rows = [
    ['C','R','A','N','E'],
    ['S','H','O','U','T'],
    ['P','L','A','N','T'],
    ['','','','',''],
  ];
  const colors = [
    ['absent','present','absent','correct','absent'],
    ['absent','absent','correct','absent','correct'],
    ['absent','absent','correct','correct','correct'],
    ['','','','',''],
  ];
  const bg = { correct: '#2d5a27', present: '#6b5000', absent: '#1a1a1a', '': '#111' };
  const border = { correct: '#3d7a37', present: '#8b6f00', absent: '#2a2a2a', '': '#2a2a2a' };
  return (
    <div className="rounded-xl border border-dark-border p-5 select-none font-mono" style={{ background: 'var(--c-card-alt)' }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] uppercase tracking-widest text-text-subtle">Unlimited Wordle</span>
        <span className="text-[10px] text-accent">Streak: 7</span>
      </div>
      <div className="flex flex-col gap-1.5 items-center">
        {rows.map((row, ri) => (
          <div key={ri} className="flex gap-1.5">
            {row.map((letter, ci) => (
              <div
                key={ci}
                className="w-9 h-9 rounded flex items-center justify-center text-sm font-bold border"
                style={{
                  background: bg[colors[ri][ci]],
                  borderColor: border[colors[ri][ci]],
                  color: colors[ri][ci] ? '#efefef' : '#2a2a2a',
                }}
              >
                {letter}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── TechPill ───────────────────────────────────────────────────── */
const TechPill = ({ label }) => (
  <span className="text-[11px] px-2 py-0.5 rounded font-mono text-text-subtle border border-dark-border bg-dark">
    {label}
  </span>
);

/* ── Project data ───────────────────────────────────────────────── */
const projects = [
  {
    title: 'SERA',
    subtitle: 'AI Sexual Health Chatbot',
    description:
      'Fullstack AI chatbot delivering real-time, empathetic guidance powered by OpenAI GPT. JWT authentication, role-based access control, and voice interaction via Web Speech API.',
    tech: ['React', 'Node.js', 'MongoDB', 'OpenAI GPT', 'JWT', 'Tailwind CSS'],
    githubUrl: 'https://github.com/rahulbaweja7',
    badge: 'WiCS 2025 Winner',
    Mockup: SeraMockup,
  },
  {
    title: 'MacroBuddy',
    subtitle: 'Nutrition Tracker',
    description:
      'Macro tracker with fast-food alternatives and AI-generated meal plans. OpenAI suggests 50+ recipes based on user goals.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'OpenAI API'],
    githubUrl: 'https://github.com/rahulbaweja7',
    Mockup: MacroMockup,
  },
  {
    title: 'QuizModoro',
    subtitle: 'Pomodoro + Active Recall',
    description:
      'Productivity quiz app blending Pomodoro technique with spaced repetition. Timed sessions and custom quiz sets.',
    tech: ['React', 'JavaScript', 'CSS', 'LocalStorage'],
    githubUrl: 'https://github.com/rahulbaweja7/quizmodoro',
    Mockup: QuizMockup,
  },
  {
    title: 'Unlimited Wordle',
    subtitle: 'Infinite Word Game',
    description:
      'Play unlimited rounds of Wordle. Win streaks, guess distribution charts, and a clean dark UI.',
    tech: ['JavaScript', 'HTML', 'CSS'],
    githubUrl: 'https://github.com/rahulbaweja7',
    Mockup: WordleMockup,
  },
];

/* ── Featured card ──────────────────────────────────────────────── */
function FeaturedCard({ project }) {
  const { title, subtitle, description, tech, githubUrl, liveUrl, badge, Mockup } = project;
  return (
    <div className="card-interactive rounded-xl overflow-hidden border border-dark-border grid lg:grid-cols-2 group">
      {/* left: content */}
      <div className="p-8 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-5">
            <span className="text-[10px] font-mono text-text-subtle uppercase tracking-widest">01 — featured</span>
            {badge && (
              <span className="flex items-center gap-1.5 text-[10px] font-mono text-accent border border-accent/20 bg-accent/5 px-2.5 py-1 rounded">
                <FaTrophy size={9} /> {badge}
              </span>
            )}
          </div>
          <h2 className="text-3xl font-black group-hover:text-accent transition-colors duration-200 mb-1 uppercase leading-none" style={{ color: 'var(--c-text)' }}>
            {title}
          </h2>
          <p className="text-xs font-mono text-text-subtle mb-5 uppercase tracking-widest">{subtitle}</p>
          <p className="text-text-muted text-sm leading-relaxed mb-6">{description}</p>
          <div className="flex flex-wrap gap-1.5 mb-8">
            {tech.map((t, i) => <TechPill key={i} label={t} />)}
          </div>
        </div>
        <div className="flex items-center gap-5 pt-5 border-t border-dark-border">
          {githubUrl && githubUrl !== '#' && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-text-subtle hover:text-text-primary transition-colors duration-200">
              <FaGithub size={14} /> Code
            </a>
          )}
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-text-subtle hover:text-accent transition-colors duration-200">
              <FaExternalLinkAlt size={11} /> Live
            </a>
          )}
        </div>
      </div>
      {/* right: mockup */}
      <div className="p-6 flex items-center justify-center border-l border-dark-border min-h-[340px]" style={{ background: 'var(--c-deep)' }}>
        <div className="w-full max-w-[340px]" style={{ height: 340 }}>
          <Mockup />
        </div>
      </div>
    </div>
  );
}

/* ── Small card ─────────────────────────────────────────────────── */
function SmallCard({ project, index }) {
  const { title, subtitle, description, tech, githubUrl, liveUrl, badge, Mockup } = project;
  return (
    <div className="card-interactive rounded-xl overflow-hidden border border-dark-border flex flex-col group">
      {/* mockup area */}
      <div className="p-5 border-b border-dark-border" style={{ background: 'var(--c-deep)' }}>
        <Mockup />
      </div>
      {/* content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <span className="text-[10px] font-mono text-text-subtle block mb-1">
              {String(index + 1).padStart(2, '0')}
            </span>
            <h3 className="text-lg font-black uppercase group-hover:text-accent transition-colors duration-200 leading-none" style={{ color: 'var(--c-text)' }}>
              {title}
            </h3>
            <p className="text-[10px] font-mono text-text-subtle mt-0.5 uppercase tracking-wider">{subtitle}</p>
          </div>
          {badge && (
            <span className="flex items-center gap-1 text-[10px] font-mono text-accent border border-accent/20 bg-accent/5 px-2 py-1 rounded shrink-0">
              <FaTrophy size={8} /> {badge}
            </span>
          )}
        </div>
        <p className="text-text-muted text-xs leading-relaxed mb-4 flex-1">{description}</p>
        <div className="flex flex-wrap gap-1 mb-4">
          {tech.map((t, i) => <TechPill key={i} label={t} />)}
        </div>
        <div className="flex items-center gap-4 pt-4 border-t border-dark-border">
          {githubUrl && githubUrl !== '#' && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[11px] text-text-subtle hover:text-text-primary transition-colors duration-200">
              <FaGithub size={12} /> Code
            </a>
          )}
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[11px] text-text-subtle hover:text-accent transition-colors duration-200">
              <FaExternalLinkAlt size={10} /> Live
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Page ───────────────────────────────────────────────────────── */
export default function Projects() {
  return (
    <div className="min-h-screen bg-dark">
      <Head>
        <title>Projects | Rahul Baweja</title>
        <meta name="description" content="Projects by Rahul Baweja" />
      </Head>
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 pt-28 pb-20">
        {/* Header */}
        <div className="mb-10 animate-fade-in-up" style={{ opacity: 0, animationFillMode: 'forwards' }}>
          <p className="text-[10px] font-mono text-text-subtle uppercase tracking-widest mb-3">Selected work</p>
          <h1 className="text-4xl sm:text-5xl font-black uppercase leading-none mb-3" style={{ color: 'var(--c-text)' }}>
            Things I&apos;ve<br />
            <span style={{ color: 'var(--c-ghost)' }}>built.</span>
          </h1>
          <p className="text-text-muted text-sm">From hackathon winners to tools I actually use.</p>
        </div>

        {/* Featured */}
        <div className="mb-4 animate-fade-in-up delay-100" style={{ opacity: 0, animationFillMode: 'forwards' }}>
          <FeaturedCard project={projects[0]} />
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-4">
          {projects.slice(1).map((project, i) => (
            <div
              key={i}
              className="animate-fade-in-up"
              style={{ opacity: 0, animationFillMode: 'forwards', animationDelay: `${(i + 2) * 0.08}s` }}
            >
              <SmallCard project={project} index={i + 1} />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-14 animate-fade-in" style={{ opacity: 0, animationFillMode: 'forwards', animationDelay: '0.5s' }}>
          <p className="text-text-subtle text-sm font-mono">
            More on{' '}
            <a href="https://github.com/rahulbaweja7" target="_blank" rel="noopener noreferrer"
              className="text-text-muted hover:text-accent transition-colors duration-200">
              github.com/rahulbaweja7
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
