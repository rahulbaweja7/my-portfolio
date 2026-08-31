import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import SpotifyTopTracks from '@/components/SpotifyTopTracks';
import GithubActivity from '@/components/GithubActivity';

const socials = [
  { label: 'GitHub',   href: 'https://github.com/rahulbaweja7' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rahulbaweja-/' },
  { label: 'Twitter',  href: 'https://x.com/RahulBaweja07' },
  { label: 'Email',    href: 'mailto:rbaweja1@asu.edu' },
];

const experience = [
  {
    company: 'Microsoft', role: 'Software Engineer Intern', period: 'Aug 2026 – Nov 2026',
    upcoming: true,
    description: 'Joining the IDNA team to build identity and network access solutions across Azure-integrated enterprise systems, applying full-stack and cloud engineering skills at scale.',
    tech: 'Azure, C#, TypeScript',
  },
  {
    company: 'SuperWorld', role: 'Software Engineer Intern', period: 'Sep 2025 – Nov 2025',
    description: 'Architected 6 reusable React + TypeScript components adopted across 12+ call sites, consolidating 800 lines of duplicated UI code and cutting new-feature build time by 25%. Optimized the Orders dashboard by integrating 8 REST endpoints via TanStack Query with caching and optimistic mutations, reducing redundant network calls by 60% and load time from 1.9s to 0.8s. Expanded test coverage from 58% to 84% by writing 42 Jest + React Testing Library unit tests, catching 3 regressions pre-release.',
    tech: 'React, TypeScript, TanStack Query, Jest',
  },
  {
    company: 'IDX Exchange', role: 'Software Engineer Intern', period: 'May 2025 – Aug 2025',
    description: 'Led 4 engineers building a real estate search platform with 10+ fullstack features including filters, map integration, and photo galleries. Integrated CoreLogic’s Web API and a secure MySQL schema, reducing data query latency by 40%. Took end-to-end ownership of authentication for 1,000+ users, from schema design to production, with zero downtime across 20+ releases.',
    tech: 'React, PHP, MySQL, CoreLogic API',
  },
  {
    company: 'Eazy2Biz', role: 'Software Engineer Intern', period: 'May 2023 – Aug 2023',
    description: 'Produced scalable, reusable UI components with TypeScript and React, reducing frontend bugs by 25%. Designed a document sharing system enabling users to export and distribute PDFs via WhatsApp Web API, cutting manual admin time by 35%. Streamlined registration and permission management through a REST API with JWT authentication, improving onboarding speed by 60%.',
    tech: 'React, TypeScript, JWT, WhatsApp API',
  },
];

const projects = [
  {
    title: 'Applycation', subtitle: 'Automated job application tracker', period: 'Jun 2026 – Sep 2026',
    description: 'Eliminated manual job entry for job seekers by integrating the Gmail API to auto-parse and populate applications, growing the platform to 300+ active users with zero paid marketing. Decoupled email notifications from the request cycle with a BullMQ async job queue and hardened the codebase with CI/CD, Zod validation, and CSRF protection, sustaining 80%+ test coverage across all production deployments.',
    tech: 'React 19, Node.js, Express, MongoDB, BullMQ, GitHub Actions',
    href: 'https://github.com/rahulbaweja7',
  },
  {
    title: 'SERA', subtitle: 'AI sexual health chatbot', badge: 'WiCS 2025', period: 'Mar 2025 – May 2025',
    description: 'Won 1st place at WiCS Hackathon 2025 by leading the full-stack design of an AI sexual health chatbot combining OpenAI GPT with real-time voice via the Web Speech API and JWT-secured RBAC, beating 30+ competing teams. Grounded GPT responses in verified sexual health literature with a RAG pipeline indexing curated medical sources via MongoDB Atlas Vector Search, eliminating off-topic hallucinations.',
    tech: 'React, Node.js, MongoDB Atlas Vector Search, RAG, Tailwind CSS',
    href: 'https://github.com/rahulbaweja7',
  },
  {
    title: 'MacroBuddy', subtitle: 'AI nutrition tracker',
    description: 'Smart macro tracker with goal-based meal planning and AI-generated alternatives. OpenAI suggests 50+ recipes aligned to cut, maintain, or bulk goals.',
    tech: 'React, Node.js, Express, MongoDB, OpenAI API',
    href: 'https://github.com/rahulbaweja7/macrobuddy',
  },
  {
    title: 'QuizModoro', subtitle: 'Pomodoro + active recall',
    description: 'Productivity quiz app blending Pomodoro sessions with spaced repetition. Custom quiz sets, timed focus sessions, and performance tracking.',
    tech: 'React, JavaScript, LocalStorage',
    href: 'https://github.com/rahulbaweja7/quizmodoro',
  },
  {
    title: 'Unlimited Wordle', subtitle: 'Infinite word game',
    description: 'Unlimited rounds of Wordle with a large curated word bank and full color-coded game logic, streaks, and instant play-again.',
    tech: 'JavaScript, HTML, CSS',
    href: 'https://github.com/rahulbaweja7',
  },
];

function Row({ title, subtitle, period, badge, upcoming, description, tech, href }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b" style={{ borderColor: 'var(--c-border)' }}>
      <button
        onClick={() => setOpen(o => !o)}
        data-hover
        className="w-full flex items-start justify-between gap-3 py-3.5 text-left group"
      >
        <span className="text-sm flex-1 min-w-0">
          <span className="flex items-baseline flex-wrap gap-x-2">
            <span
              className="font-semibold group-hover:text-accent transition-colors duration-150"
              style={{ color: upcoming ? '#f97316' : 'var(--c-text)' }}
            >
              {title}
            </span>
            {badge && (
              <span className="text-[9px] uppercase tracking-wide px-1.5 py-0.5 rounded"
                style={{ color: '#f97316', border: '1px solid rgba(249,115,22,0.3)', background: 'rgba(249,115,22,0.06)' }}>
                {badge}
              </span>
            )}
          </span>
          <span className="block text-xs mt-0.5" style={{ color: 'var(--c-muted)' }}>
            {subtitle}{period ? ` — ${period}` : ''}
          </span>
        </span>
        <span
          className="shrink-0 mt-1 text-xs transition-transform duration-200"
          style={{ color: 'var(--c-subtle)', transform: open ? 'rotate(180deg)' : 'none' }}
        >
          ▾
        </span>
      </button>
      <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: open ? 320 : 0 }}>
        <div className="pb-4 space-y-2">
          <p className="text-xs leading-relaxed" style={{ color: 'var(--c-muted)' }}>{description}</p>
          {tech && (
            <p className="text-[11px] italic" style={{ color: 'var(--c-subtle)' }}>{tech}</p>
          )}
          {href && (
            <a href={href} target="_blank" rel="noopener noreferrer" data-hover
              className="inline-block text-[11px] pt-1 underline underline-offset-2"
              style={{ color: 'var(--c-subtle)' }}>
              View source
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Rahul Baweja</title>
        <meta name="description" content="Rahul Baweja — Software Engineer. Experience and projects, one page." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="min-h-screen lg:h-screen lg:overflow-hidden pt-24 pb-16 lg:pb-8 px-6" style={{ background: 'var(--c-bg)' }}>
        <div className="max-w-6xl mx-auto h-full grid lg:grid-cols-[1fr_320px] gap-12">
          <div className="max-w-3xl lg:flex lg:flex-col lg:min-h-0">

            {/* Header + About */}
            <div className="flex flex-col-reverse sm:flex-row sm:items-start gap-6 mb-6 shrink-0">
              <div className="flex-1 min-w-0">
                <h1 className="font-bold leading-none mb-2" style={{ fontSize: 'clamp(30px, 5vw, 44px)', color: 'var(--c-text)' }}>
                  Hey, I&apos;m Rahul<span style={{ color: '#f97316' }}>.</span>
                </h1>
                <div className="flex flex-wrap gap-x-5 gap-y-2 mb-4">
                  {socials.map(s => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-hover
                      className="text-sm underline underline-offset-4 decoration-1 transition-colors duration-200"
                      style={{ color: 'var(--c-muted)', textDecorationColor: 'var(--c-border-2)' }}
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
                <h2 className="text-base font-bold mb-2" style={{ color: 'var(--c-text)' }}>About Me</h2>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>
                  Hi, I&apos;m Rahul. I&apos;m 22, a CS student at Arizona State, and an incoming
                  SWE intern at Microsoft. I build things, and sometimes they win: first place at
                  WiCS 2025, three internships in before Microsoft. I&apos;m finishing a 4+1 BS/MS
                  and TA&apos;d Intro to Java for 100+ students who now know more about pointers
                  than they probably wanted to. When I&apos;m not shipping code (usually at 2AM,
                  running on bad coffee), I&apos;m watching Barça blow a lead or losing a ranked
                  match I had no business queuing for.
                </p>
              </div>

              <div className="relative w-32 sm:w-36 aspect-[3/4] shrink-0 mx-auto sm:mx-0">
                <div
                  className="relative w-full h-full overflow-hidden rounded-2xl grayscale hover:grayscale-0 transition-all duration-300"
                  style={{
                    border: '1px solid var(--c-border)',
                    boxShadow: '0 0 0 4px rgba(249,115,22,0.08), 0 12px 32px rgba(249,115,22,0.14)',
                  }}
                  data-hover
                >
                  <Image src="/assets/RahulLA.png" alt="Rahul" fill style={{ objectFit: 'cover', objectPosition: '50% 18%' }} />
                </div>
                <span
                  className="absolute bottom-2.5 right-2.5 w-4 h-4 rounded-full animate-pulse"
                  style={{ background: '#22c55e', border: '2.5px solid var(--c-bg)' }}
                />
              </div>
            </div>

            {/* Experience + Projects */}
            <div className="grid md:grid-cols-2 gap-x-10 gap-y-6 lg:flex-1 lg:min-h-0">
              <section className="lg:flex lg:flex-col lg:min-h-0">
                <h2 className="text-lg font-bold mb-2 shrink-0" style={{ color: 'var(--c-text)' }}>Experience</h2>
                <div className="lg:overflow-y-auto nice-scroll lg:pr-2">
                  {experience.map((e, i) => (
                    <Row
                      key={i}
                      title={e.company}
                      subtitle={e.role}
                      period={e.period}
                      upcoming={e.upcoming}
                      description={e.description}
                      tech={e.tech}
                    />
                  ))}
                </div>
              </section>

              <section className="lg:flex lg:flex-col lg:min-h-0">
                <h2 className="text-lg font-bold mb-2 shrink-0" style={{ color: 'var(--c-text)' }}>Projects</h2>
                <div className="lg:overflow-y-auto nice-scroll lg:pr-2">
                  {projects.map((p, i) => (
                    <Row
                      key={i}
                      title={p.title}
                      subtitle={p.subtitle}
                      period={p.period}
                      badge={p.badge}
                      description={p.description}
                      tech={p.tech}
                      href={p.href}
                    />
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:pt-2 lg:h-full lg:overflow-y-auto nice-scroll lg:pr-1">
            <div className="space-y-4">
              <SpotifyTopTracks />
              <GithubActivity />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
