import Head from 'next/head';
import Navbar from '@/components/Navbar';
import { useEffect, useRef, useState } from 'react';

const jobs = [
  {
    company:  'Microsoft',
    role:     'Software Engineer Intern',
    period:   'Summer 2026',
    location: 'Redmond, WA',
    upcoming: true,
    hash:     'a3f9b2c',
    branch:   'feat/internship-msft',
    metrics:  null,
    tech:     [],
    bullets:  ['Incoming SWE intern. Details TBD — this commit is still being written.'],
  },
  {
    company:  'SuperWorld',
    role:     'Software Engineer Intern',
    period:   'May 2025 – Present',
    location: 'Los Angeles, CA',
    upcoming: false,
    hash:     '7d1e4a8',
    branch:   'feat/superworld',
    metrics:  [
      { value: '3+',  label: 'product surfaces' },
      { value: '40%', label: 'less boilerplate' },
    ],
    tech:    ['TypeScript', 'React', 'REST APIs', 'Component Design'],
    bullets: [
      'Architected a reusable component library shipped across 3+ product surfaces',
      'Integrated REST APIs cutting data-fetch boilerplate by ~40%',
      'Owned features end-to-end from Figma handoff to production',
    ],
  },
  {
    company:  'IDX Exchange',
    role:     'Software Engineer Intern',
    period:   'May – Aug 2025',
    location: 'Boise, ID',
    upcoming: false,
    hash:     'c82f3d1',
    branch:   'feat/idx-exchange',
    metrics:  [
      { value: '40%', label: 'latency reduced'  },
      { value: '4',   label: 'engineers led'    },
      { value: '1K+', label: 'users served'     },
    ],
    tech:    ['React', 'Node.js', 'CoreLogic API', 'JWT Auth'],
    bullets: [
      'Led a team of 4 to build a real estate search platform from scratch',
      'Integrated CoreLogic API, cutting property query latency by 40%',
      'Built JWT auth + RBAC for 1,000+ users end-to-end',
    ],
  },
  {
    company:  'Arizona State',
    role:     'Teaching Assistant — Intro to Java',
    period:   'Aug 2023 – May 2024',
    location: 'Tempe, AZ',
    upcoming: false,
    hash:     'e5a7c09',
    branch:   'feat/ta-asu',
    metrics:  [
      { value: '100+', label: 'students mentored'    },
      { value: '30+',  label: 'sessions facilitated' },
      { value: '2',    label: 'semesters'            },
    ],
    tech:    ['Java', 'OOP', 'DSA', 'Debugging'],
    bullets: [
      'Mentored 100+ students through weekly office hours and labs',
      'Facilitated 30+ sessions on DSA, OOP, and debugging',
      'Wrote supplementary materials adopted into the official curriculum',
    ],
  },
  {
    company:  'Eazy2Biz',
    role:     'Software Engineer Intern',
    period:   'May – Aug 2023',
    location: 'Remote',
    upcoming: false,
    hash:     'b0d6f52',
    branch:   'feat/eazy2biz',
    metrics:  [
      { value: '25%', label: 'fewer frontend bugs' },
      { value: '60%', label: 'faster onboarding'   },
    ],
    tech:    ['TypeScript', 'React', 'WhatsApp API', 'PDF Generation'],
    bullets: [
      'Reduced frontend bugs by 25% with typed reusable React components',
      'Built PDF-sharing via WhatsApp Business API from scratch',
      'Cut client onboarding time by 60% with streamlined flows',
    ],
  },
];

function MetricBadge({ value, label }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref}
      className="flex flex-col transition-all duration-500"
      style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(6px)' }}>
      <span className="font-black leading-none" style={{ fontSize: 'clamp(22px, 3vw, 32px)', color: '#f97316' }}>{value}</span>
      <span className="text-[9px] font-mono uppercase tracking-widest mt-0.5" style={{ color: 'var(--c-subtle)' }}>{label}</span>
    </div>
  );
}

function JobCard({ job, index, total }) {
  const isLast     = index === total - 1;
  const isFirst    = index === 0;
  const isUpcoming = job.upcoming;

  return (
    <div className="relative flex gap-0">

      {/* ── Git graph column ── */}
      <div className="flex flex-col items-center shrink-0" style={{ width: 40 }}>
        {/* line above dot */}
        {!isFirst && (
          <div className="w-px flex-none" style={{ height: 28, background: 'var(--c-border)' }} />
        )}
        {isFirst && <div style={{ height: 28 }} />}

        {/* dot */}
        <div className="relative shrink-0 flex items-center justify-center rounded-full z-10"
          style={{
            width: 12, height: 12,
            background: isUpcoming ? '#f97316' : 'var(--c-card)',
            border: isUpcoming ? '2px solid #f97316' : '2px solid var(--c-border-2)',
            boxShadow: isUpcoming ? '0 0 10px rgba(249,115,22,0.4)' : 'none',
          }}>
          {isUpcoming && <span className="absolute w-4 h-4 rounded-full animate-ping" style={{ background: 'rgba(249,115,22,0.3)' }} />}
        </div>

        {/* line below dot */}
        {!isLast && (
          <div className="w-px flex-1 min-h-[80px]" style={{ background: 'var(--c-border)' }} />
        )}
      </div>

      {/* ── Card ── */}
      <div className="flex-1 pb-10 pl-6" style={{ minWidth: 0 }}>
        {/* Commit header */}
        <div className="flex flex-wrap items-center gap-3 mb-4 pt-1">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded"
            style={{ background: 'var(--c-card)', border: '1px solid var(--c-border)', color: 'var(--c-muted)' }}>
            {job.hash}
          </span>
          <span className="text-[10px] font-mono" style={{ color: isUpcoming ? '#f97316' : '#7aa2c8' }}>
            {job.branch}
          </span>
          {isUpcoming && (
            <span className="flex items-center gap-1.5 text-[10px] font-mono px-2 py-0.5 rounded"
              style={{ background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.3)', color: '#f97316' }}>
              <span className="w-1 h-1 rounded-full bg-orange-400 animate-pulse" />
              upcoming
            </span>
          )}
          <span className="ml-auto text-[10px] font-mono hidden sm:block" style={{ color: 'var(--c-subtle)' }}>
            {job.period}  ·  {job.location}
          </span>
        </div>

        {/* Commit message = company + role */}
        <div className="mb-4">
          <p className="font-black uppercase leading-none mb-1"
            style={{ fontSize: 'clamp(28px, 4vw, 52px)', color: isUpcoming ? '#f97316' : 'var(--c-text)', letterSpacing: '-0.02em' }}>
            {job.company}
          </p>
          <p className="text-sm font-mono" style={{ color: 'var(--c-muted)' }}>{job.role}</p>
          <p className="text-[10px] font-mono mt-0.5 sm:hidden" style={{ color: 'var(--c-subtle)' }}>
            {job.period}  ·  {job.location}
          </p>
        </div>

        {/* Metrics — styled as "diff stats" */}
        {job.metrics && (
          <div className="flex flex-wrap gap-5 mb-5 px-4 py-3 rounded-lg"
            style={{ background: 'var(--c-card)', border: '1px solid var(--c-border)' }}>
            <span className="text-[10px] font-mono self-center" style={{ color: 'var(--c-subtle)' }}>impact:</span>
            {job.metrics.map((m, i) => <MetricBadge key={i} {...m} />)}
          </div>
        )}

        {/* Diff body = bullets */}
        <div className="rounded-lg overflow-hidden mb-4"
          style={{ border: '1px solid var(--c-border)', background: 'var(--c-card)' }}>
          <div className="flex items-center gap-2 px-3 py-2 border-b"
            style={{ borderColor: 'var(--c-border)', background: 'var(--c-card-alt)' }}>
            <span className="text-[10px] font-mono" style={{ color: 'var(--c-subtle)' }}>
              {job.company.toLowerCase().replace(/\s/g, '_')}.md
            </span>
            <span className="ml-auto text-[10px] font-mono" style={{ color: '#22c55e' }}>
              +{job.bullets.length} lines
            </span>
          </div>
          <div className="p-4 space-y-2">
            {job.bullets.map((b, i) => (
              <div key={i} className="flex gap-3">
                <span className="shrink-0 font-mono text-xs mt-0.5" style={{ color: '#22c55e' }}>+</span>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>{b}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech = labels */}
        {job.tech.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {job.tech.map((t, i) => (
              <span key={i} className="text-[10px] px-2.5 py-1 rounded-full font-mono"
                style={{ background: 'var(--c-card)', border: '1px solid var(--c-border)', color: 'var(--c-subtle)' }}>
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Work() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--c-bg)' }}>
      <Head>
        <title>Work | Rahul Baweja</title>
        <meta name="description" content="Work experience of Rahul Baweja" />
      </Head>
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 pt-28 pb-20">

        {/* Header */}
        <div className="mb-12 animate-fade-in-up" style={{ opacity: 0, animationFillMode: 'forwards' }}>
          <p className="text-[10px] font-mono text-text-subtle uppercase tracking-widest mb-3">
            {'$ git log --author="Rahul Baweja" --oneline'}
          </p>
          <h1 className="font-black uppercase leading-none mb-3"
            style={{ fontSize: 'clamp(48px, 7vw, 88px)', color: 'var(--c-text)' }}>
            Experience<span style={{ color: '#f97316' }}>.</span>
          </h1>
          <p className="text-sm font-mono" style={{ color: 'var(--c-muted)' }}>
            {jobs.length} commits · {jobs.filter(j => !j.upcoming).length} merged · 1 in progress
          </p>
        </div>

        {/* Git log */}
        <div>
          {jobs.map((job, i) => (
            <JobCard key={i} job={job} index={i} total={jobs.length} />
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 mt-4 pl-10">
          <span className="text-[10px] font-mono" style={{ color: 'var(--c-subtle)' }}>
            full history →
          </span>
          <a href="https://www.linkedin.com/in/rahulbaweja-/" target="_blank" rel="noopener noreferrer"
            className="text-[10px] font-mono transition-colors hover:text-accent"
            style={{ color: 'var(--c-muted)' }}>
            linkedin.com/in/rahulbaweja-
          </a>
        </div>

      </main>
    </div>
  );
}
