import Head from 'next/head';
import Navbar from '@/components/Navbar';
import { useEffect, useRef, useState } from 'react';

const jobs = [
  {
    company: 'Microsoft',
    role: 'Software Engineer Intern',
    period: 'Summer 2026',
    location: 'Redmond, WA',
    upcoming: true,
    metrics: null,
    tech: [],
    desc: 'Incoming SWE intern. Details coming soon.',
  },
  {
    company: 'SuperWorld',
    role: 'Software Engineer Intern',
    period: 'May 2025 – Present',
    location: 'Los Angeles, CA',
    upcoming: false,
    metrics: null,
    tech: ['TypeScript', 'React', 'REST APIs', 'Component Design'],
    desc: 'Building scalable frontend features with TypeScript and React. Designing reusable components and integrating REST APIs across the product.',
    bullets: ['Architected a reusable component library used across 3+ product surfaces', 'Integrated multiple REST APIs reducing data-fetch boilerplate by ~40%', 'Shipped features end-to-end from design handoff to production'],
  },
  {
    company: 'IDX Exchange',
    role: 'Software Engineer Intern',
    period: 'May – Aug 2025',
    location: 'Boise, ID',
    upcoming: false,
    metrics: [
      { value: '40%', label: 'Latency Reduced' },
      { value: '4',   label: 'Engineers Led'  },
      { value: '1K+', label: 'Users Served'   },
    ],
    tech: ['React', 'Node.js', 'CoreLogic API', 'JWT Auth'],
    desc: 'Led a team of 4 engineers to build a real estate search platform from the ground up.',
    bullets: ['Integrated CoreLogic API, reducing property query latency by 40%', 'Built JWT authentication and role-based access control for 1,000+ users', 'Owned the full-stack from DB schema design to deployed UI'],
  },
  {
    company: 'Arizona State',
    role: 'Teaching Assistant — Intro to Java',
    period: 'Aug 2023 – May 2024',
    location: 'Tempe, AZ',
    upcoming: false,
    metrics: [
      { value: '100+', label: 'Students Mentored' },
      { value: '30+',  label: 'Sessions Facilitated' },
      { value: '2',    label: 'Semesters' },
    ],
    tech: ['Java', 'OOP', 'DSA', 'Debugging'],
    desc: 'Teaching assistant for two semesters of Intro to Java at ASU.',
    bullets: ['Mentored 100+ students through weekly office hours', 'Facilitated 30+ lab sessions on DSA, OOP, and debugging', 'Wrote supplementary materials adopted by the course'],
  },
  {
    company: 'Eazy2Biz',
    role: 'Software Engineer Intern',
    period: 'May – Aug 2023',
    location: 'Remote',
    upcoming: false,
    metrics: [
      { value: '25%', label: 'Fewer Frontend Bugs' },
      { value: '60%', label: 'Faster Onboarding'   },
    ],
    tech: ['TypeScript', 'React', 'WhatsApp API', 'PDF Generation'],
    desc: 'First internship. Built real features, shipped to production, broke things, fixed them.',
    bullets: ['Reduced frontend bugs by 25% with reusable TypeScript/React components', 'Built PDF-sharing via WhatsApp Business API from scratch', 'Improved client onboarding speed by 60%'],
  },
];

/* ── Metric tile ────────────────────────────────────────────────── */
function Metric({ value, label }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="py-4">
      <p
        className="font-black text-accent leading-none mb-1 transition-all duration-700"
        style={{ fontSize: 'clamp(28px, 3vw, 44px)', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(8px)' }}
      >
        {value}
      </p>
      <p className="text-[10px] font-mono text-text-subtle uppercase tracking-widest">{label}</p>
    </div>
  );
}

/* ── Job section ────────────────────────────────────────────────── */
function JobSection({ job, index }) {
  const isUpcoming = job.upcoming;

  return (
    <div
      className="relative py-14 border-b border-dark-border overflow-hidden animate-fade-in-up"
      style={{ opacity: 0, animationFillMode: 'forwards', animationDelay: `${index * 0.08}s` }}
    >
      {/* Ghost company name watermark */}
      <div
        className="absolute inset-0 flex items-center overflow-hidden pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-black uppercase whitespace-nowrap leading-none"
          style={{ fontSize: 'clamp(80px, 12vw, 160px)', color: isUpcoming ? 'rgba(249,115,22,0.04)' : 'var(--ghost-text)' }}
        >
          {job.company}
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10 grid md:grid-cols-[280px_1fr] gap-10 items-start">

        {/* Left — identity */}
        <div>
          <span className="text-[10px] font-mono text-text-subtle block mb-4">
            {String(index).padStart(2, '0')}
          </span>
          <h2
            className="font-black uppercase leading-none mb-4"
            style={{ fontSize: 'clamp(28px, 3.5vw, 48px)', color: isUpcoming ? '#f97316' : 'var(--c-text)' }}
          >
            {job.company}
          </h2>
          <p className="text-xs font-mono text-text-subtle">{job.period}</p>
          <p className="text-xs font-mono text-text-subtle">{job.location}</p>
        </div>

        {/* Right — details */}
        <div>
          {/* Role + badge */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <h3 className="text-lg font-medium" style={{ color: 'var(--c-text)' }}>{job.role}</h3>
            {isUpcoming && (
              <span className="flex items-center gap-1.5 text-[10px] font-mono text-accent border border-accent/30 rounded px-2 py-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                upcoming
              </span>
            )}
          </div>

          {/* Metrics */}
          {job.metrics && (
            <div className="flex gap-10 mb-6 pb-6 border-b border-dark-border">
              {job.metrics.map((m, i) => <Metric key={i} {...m} />)}
            </div>
          )}

          {/* Bullets or desc */}
          {job.bullets ? (
            <ul className="space-y-2 mb-6">
              {job.bullets.map((b, i) => (
                <li key={i} className="flex gap-3 text-sm text-text-muted leading-relaxed">
                  <span className="text-accent mt-1 shrink-0">›</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-text-muted text-sm leading-relaxed mb-6">{job.desc}</p>
          )}

          {/* Tech */}
          {job.tech.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {job.tech.map((t, i) => (
                <span key={i} className="text-[11px] px-2.5 py-1 rounded font-mono text-text-subtle border border-dark-border bg-dark">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Page ───────────────────────────────────────────────────────── */
export default function Work() {
  return (
    <div className="min-h-screen bg-dark">
      <Head>
        <title>Work | Rahul Baweja</title>
        <meta name="description" content="Work experience of Rahul Baweja" />
      </Head>
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 pt-28 pb-20">

        {/* Header */}
        <div
          className="mb-4 animate-fade-in-up"
          style={{ opacity: 0, animationFillMode: 'forwards' }}
        >
          <p className="text-[10px] font-mono text-text-subtle uppercase tracking-widest mb-3">
            Selected experience
          </p>
          <h1 className="font-black uppercase leading-none"
            style={{ fontSize: 'clamp(48px, 7vw, 96px)', color: 'var(--c-text)' }}>
            Work<span style={{ color: 'var(--c-ghost)' }}>.</span>
          </h1>
        </div>

        {/* Jobs */}
        <div>
          {jobs.map((job, i) => (
            <JobSection key={i} job={job} index={i} />
          ))}
        </div>

        {/* Footer */}
        <div
          className="mt-14 animate-fade-in"
          style={{ opacity: 0, animationFillMode: 'forwards', animationDelay: '0.6s' }}
        >
          <p className="text-text-subtle text-sm font-mono">
            Full history on{' '}
            <a href="https://www.linkedin.com/in/rahulbaweja-/" target="_blank" rel="noopener noreferrer"
              className="text-text-muted hover:text-accent transition-colors duration-200">
              linkedin.com/in/rahulbaweja-
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
