import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import SpotifyTopTracks from '@/components/SpotifyTopTracks';
import GithubActivity from '@/components/GithubActivity';

const socials = [
  { label: 'GitHub',   href: 'https://github.com/rahulbaweja7' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rahulbaweja-/' },
  { label: 'Email',    href: 'mailto:rbaweja1@asu.edu' },
];

const experience = [
  {
    company: 'Microsoft', role: 'Software Engineer Intern', period: 'Summer 2026',
    upcoming: true,
    bullets: ['Incoming SWE intern — details TBD.'],
  },
  {
    company: 'SuperWorld', role: 'Software Engineer Intern', period: 'May 2025 – Present',
    bullets: [
      'Architected a reusable component library shipped across 3+ product surfaces',
      'Integrated REST APIs cutting data-fetch boilerplate by ~40%',
      'Owned features end-to-end from Figma handoff to production',
    ],
  },
  {
    company: 'IDX Exchange', role: 'Software Engineer Intern', period: 'May – Aug 2025',
    bullets: [
      'Led a team of 4 to build a real estate search platform from scratch',
      'Integrated CoreLogic API, cutting property query latency by 40%',
      'Built JWT auth + RBAC for 1,000+ users end-to-end',
    ],
  },
  {
    company: 'Arizona State University', role: 'Teaching Assistant — Intro to Java', period: 'Aug 2023 – May 2024',
    bullets: [
      'Mentored 100+ students through weekly office hours and labs',
      'Facilitated 30+ sessions on DSA, OOP, and debugging',
    ],
  },
  {
    company: 'Eazy2Biz', role: 'Software Engineer Intern', period: 'May – Aug 2023',
    bullets: [
      'Reduced frontend bugs by 25% with typed reusable React components',
      'Built PDF-sharing via WhatsApp Business API from scratch',
      'Cut client onboarding time by 60% with streamlined flows',
    ],
  },
];

const projects = [
  {
    title: 'SERA', subtitle: 'AI sexual health & relationship chatbot',
    bullets: ['Fullstack AI chatbot delivering real-time, empathetic guidance, powered by OpenAI GPT'],
    href: 'https://github.com/rahulbaweja7',
  },
  {
    title: 'MacroBuddy', subtitle: 'AI nutrition tracker',
    bullets: ['Smart macro tracker with goal-based meal planning and AI-generated recipes'],
    href: 'https://github.com/rahulbaweja7/macrobuddy',
  },
  {
    title: 'QuizModoro', subtitle: 'Pomodoro + active recall',
    bullets: ['Productivity quiz app blending Pomodoro sessions with spaced repetition'],
    href: 'https://github.com/rahulbaweja7/quizmodoro',
  },
  {
    title: 'Unlimited Wordle', subtitle: 'Infinite word game',
    bullets: ['Unlimited rounds of Wordle with a large curated word bank and full game logic'],
    href: 'https://github.com/rahulbaweja7',
  },
];

function Row({ title, subtitle, period, upcoming, bullets, href }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b" style={{ borderColor: 'var(--c-border)' }}>
      <button
        onClick={() => setOpen(o => !o)}
        data-hover
        className="w-full flex items-baseline justify-between gap-3 py-3.5 text-left group"
      >
        <span className="text-sm">
          <span
            className="font-semibold group-hover:text-accent transition-colors duration-150"
            style={{ color: upcoming ? '#f97316' : 'var(--c-text)' }}
          >
            {title}
          </span>
          <span style={{ color: 'var(--c-muted)' }}> — {subtitle}{period ? `, ${period}` : ''}</span>
        </span>
        <span
          className="shrink-0 text-xs transition-transform duration-200"
          style={{ color: 'var(--c-subtle)', transform: open ? 'rotate(180deg)' : 'none' }}
        >
          ▾
        </span>
      </button>
      <div className="overflow-hidden transition-all duration-300" style={{ maxHeight: open ? 160 : 0 }}>
        <div className="pb-4 space-y-1.5">
          {bullets.map((b, i) => (
            <p key={i} className="text-xs leading-relaxed" style={{ color: 'var(--c-muted)' }}>{b}</p>
          ))}
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

      <main className="min-h-screen pt-28 pb-24 px-6" style={{ background: 'var(--c-bg)' }}>
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_320px] gap-12">
          <div className="max-w-3xl">

            {/* Header */}
            <div className="flex items-center justify-between gap-6 mb-4">
              <div>
                <h1 className="font-bold leading-none mb-3" style={{ fontSize: 'clamp(36px, 6vw, 56px)', color: 'var(--c-text)' }}>
                  Hey, I&apos;m Rahul<span style={{ color: '#f97316' }}>.</span>
                </h1>
                <div className="flex flex-wrap gap-x-5 gap-y-2">
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
              </div>
              <div className="relative w-20 h-20 shrink-0 overflow-hidden rounded-full" style={{ border: '1px solid var(--c-border)' }}>
                <Image src="/assets/RahulAnimated.png" alt="Rahul" fill style={{ objectFit: 'cover' }} />
              </div>
            </div>

            {/* About */}
            <section className="mt-10 mb-12">
              <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--c-text)' }}>About Me</h2>
              <p className="text-sm leading-relaxed max-w-xl" style={{ color: 'var(--c-muted)' }}>
                I&apos;m a CS student at Arizona State University building fullstack apps around
                AI, developer tools, and automation. Previously interned at SuperWorld and
                IDX Exchange, TA&apos;d Intro to Java, and shipped a handful of side projects that
                won a few hackathons along the way.
              </p>
            </section>

            {/* Experience + Projects */}
            <div className="grid md:grid-cols-2 gap-x-10 gap-y-10">
              <section>
                <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--c-text)' }}>Experience</h2>
                <div>
                  {experience.map((e, i) => (
                    <Row key={i} title={e.company} subtitle={e.role} period={e.period} upcoming={e.upcoming} bullets={e.bullets} />
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--c-text)' }}>Projects</h2>
                <div>
                  {projects.map((p, i) => (
                    <Row key={i} title={p.title} subtitle={p.subtitle} bullets={p.bullets} href={p.href} />
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:pt-[100px]">
            <div className="lg:sticky lg:top-28 space-y-4">
              <SpotifyTopTracks />
              <GithubActivity />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
