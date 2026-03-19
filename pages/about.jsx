import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';

const timeline = [
  {
    period: 'May 2025 – Present',
    role: 'Software Engineer Intern',
    company: 'SuperWorld',
    location: 'Los Angeles, CA',
    tag: 'Current',
    metrics: ['TypeScript + React', 'Reusable component library', 'REST API integrations'],
    desc: 'Building scalable frontend features with TypeScript and React.',
  },
  {
    period: 'May 2025 – Aug 2025',
    role: 'Software Engineer Intern',
    company: 'IDX Exchange',
    location: 'Boise, ID',
    tag: null,
    metrics: ['Led team of 4', '40% latency ↓', '1,000+ users'],
    desc: 'Led a team to build a real estate search platform. Integrated CoreLogic API, built auth at scale.',
  },
  {
    period: 'Aug 2023 – May 2024',
    role: 'Teaching Assistant',
    company: 'Arizona State University',
    location: 'Tempe, AZ',
    tag: null,
    metrics: ['100+ students', '30+ sessions', 'Java · DSA'],
    desc: 'TA for Intro to Java. Ran discussion sessions on algorithms, data structures, and debugging.',
  },
  {
    period: 'May 2023 – Aug 2023',
    role: 'Software Engineer Intern',
    company: 'Eazy2Biz',
    location: 'Remote',
    tag: null,
    metrics: ['25% fewer bugs', '60% faster onboarding', 'WhatsApp API'],
    desc: 'Reduced frontend bugs with reusable TypeScript/React components. Built PDF-sharing via WhatsApp API.',
  },
];

const outside = [
  { emoji: '🏈', label: 'Football',   sub: 'NFL all day' },
  { emoji: '🏏', label: 'Cricket',    sub: 'Always watching' },
  { emoji: '🎮', label: 'Gaming',     sub: 'When not coding' },
  { emoji: '🌙', label: '2AM dev',    sub: 'Peak productivity' },
  { emoji: '☕', label: 'Coffee',     sub: 'Unhealthy amount' },
  { emoji: '🎵', label: 'Music',      sub: 'Always on' },
];

export default function About() {
  return (
    <div className="min-h-screen bg-dark">
      <Head>
        <title>About | Rahul Baweja</title>
        <meta name="description" content="About Rahul Baweja" />
      </Head>
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 pt-28 pb-20">

        {/* ══ BENTO GRID — desktop ══ */}
        <div
          className="hidden md:grid gap-3 mb-6"
          style={{ gridTemplateColumns: 'repeat(6, 1fr)', gridTemplateRows: '210px 150px' }}
        >
          {/* Photo — col 1-2, row 1-2 */}
          <div
            className="relative rounded-xl overflow-hidden animate-fade-in-up"
            style={{
              gridColumn: '1 / span 2', gridRow: '1 / span 2',
              opacity: 0, animationFillMode: 'forwards',
              border: '1.5px dashed rgba(249,115,22,0.35)',
            }}
          >
            <Image
              src="/assets/RahulLA.png"
              alt="Rahul Baweja"
              fill
              priority
              style={{ objectFit: 'cover', objectPosition: 'top center' }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 px-4 py-3"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)' }}
            >
              <p className="text-[#efefef] font-semibold text-sm">Rahul Baweja</p>
              <p className="text-[10px] font-mono text-text-subtle uppercase tracking-wider">CS @ ASU</p>
            </div>
          </div>

          {/* Bio — col 3-5, row 1 */}
          <div
            className="card-interactive rounded-xl border border-dark-border p-5 flex flex-col justify-between animate-fade-in-up delay-100"
            style={{ gridColumn: '3 / span 3', gridRow: '1', opacity: 0, animationFillMode: 'forwards' }}
          >
            <div>
              <p className="text-[10px] font-mono text-text-subtle uppercase tracking-widest mb-3">// about</p>
              <h1 className="text-2xl font-black uppercase text-[#efefef] leading-tight mb-3">
                I build things<br />people use.
              </h1>
              <p className="text-text-muted text-[13px] leading-relaxed">
                CS student at ASU (4+1 BS/MS). Full-stack engineer. Shipped production code,
                won hackathons, TA&apos;d 100+ students. Incoming SWE intern at{' '}
                <span className="text-accent font-medium">Microsoft</span>.
              </p>
            </div>
            <div className="flex gap-3 mt-3">
              <a href="https://www.linkedin.com/in/rahulbaweja-/" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[11px] font-mono text-text-subtle hover:text-[#efefef] transition-colors border border-dark-border rounded px-2.5 py-1 hover:border-[#3a3a3a]">
                <FaLinkedinIn size={11} /> LinkedIn
              </a>
              <a href="https://github.com/rahulbaweja7" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[11px] font-mono text-text-subtle hover:text-[#efefef] transition-colors border border-dark-border rounded px-2.5 py-1 hover:border-[#3a3a3a]">
                <FaGithub size={11} /> GitHub
              </a>
              <a href="mailto:rbaweja1@asu.edu"
                className="flex items-center gap-1.5 text-[11px] font-mono text-text-subtle hover:text-[#efefef] transition-colors border border-dark-border rounded px-2.5 py-1 hover:border-[#3a3a3a]">
                <AiOutlineMail size={12} /> Email
              </a>
            </div>
          </div>

          {/* Microsoft — col 6, row 1-2 */}
          <div
            className="rounded-xl p-5 flex flex-col justify-between animate-fade-in-up delay-100"
            style={{
              gridColumn: '6', gridRow: '1 / span 2',
              opacity: 0, animationFillMode: 'forwards',
              border: '1.5px solid rgba(249,115,22,0.3)',
              background: 'rgba(249,115,22,0.04)',
            }}
          >
            <div>
              <p className="text-[10px] font-mono text-accent uppercase tracking-widest mb-3">Next role</p>
              <p
                className="font-black uppercase text-[#efefef] leading-none"
                style={{ fontSize: 'clamp(14px, 1.4vw, 20px)' }}
              >
                Micro<br />soft
              </p>
            </div>
            <div>
              <p className="text-text-subtle text-[10px] font-mono mb-0.5">SWE Intern</p>
              <p className="text-text-subtle text-[10px] font-mono">Summer 2026</p>
            </div>
            <span className="text-accent text-xl font-bold">→</span>
          </div>

          {/* GPA — col 3, row 2 */}
          <div
            className="card-interactive rounded-xl border border-dark-border p-4 flex flex-col justify-between animate-fade-in-up delay-200"
            style={{ gridColumn: '3', gridRow: '2', opacity: 0, animationFillMode: 'forwards' }}
          >
            <p className="text-[10px] font-mono text-text-subtle uppercase tracking-widest">GPA</p>
            <p className="text-4xl font-black text-[#efefef]">3.72</p>
            <p className="text-[10px] font-mono text-text-subtle">Dean&apos;s List</p>
          </div>

          {/* Hackathon — col 4, row 2 */}
          <div
            className="card-interactive rounded-xl border border-dark-border p-4 flex flex-col justify-between animate-fade-in-up delay-200"
            style={{ gridColumn: '4', gridRow: '2', opacity: 0, animationFillMode: 'forwards' }}
          >
            <p className="text-[10px] font-mono text-text-subtle uppercase tracking-widest">Hackathon</p>
            <p className="text-4xl font-black text-accent">1st</p>
            <p className="text-[10px] font-mono text-text-subtle">WiCS 2025</p>
          </div>

          {/* School — col 5, row 2 */}
          <div
            className="card-interactive rounded-xl border border-dark-border p-4 flex flex-col justify-between animate-fade-in-up delay-200"
            style={{ gridColumn: '5', gridRow: '2', opacity: 0, animationFillMode: 'forwards' }}
          >
            <p className="text-[10px] font-mono text-text-subtle uppercase tracking-widest">School</p>
            <p className="text-2xl font-black text-[#efefef]">ASU</p>
            <p className="text-[10px] font-mono text-text-subtle">4+1 BS/MS</p>
          </div>
        </div>

        {/* ══ MOBILE — stacked cards ══ */}
        <div className="md:hidden space-y-3 mb-6">
          <div className="rounded-xl overflow-hidden" style={{ border: '1.5px dashed rgba(249,115,22,0.35)' }}>
            <div className="relative h-48">
              <Image src="/assets/RahulLA.png" alt="Rahul" fill priority style={{ objectFit: 'cover', objectPosition: 'top' }} />
            </div>
            <div className="p-4">
              <p className="text-[#efefef] font-semibold text-sm">Rahul Baweja</p>
              <p className="text-text-subtle text-[10px] font-mono">CS @ ASU · Full-Stack Engineer</p>
            </div>
          </div>
          <div className="card-interactive rounded-xl border border-dark-border p-5">
            <h1 className="text-2xl font-black uppercase text-[#efefef] mb-3 leading-tight">
              I build things<br />people use.
            </h1>
            <p className="text-text-muted text-sm leading-relaxed">
              CS student at ASU. Shipped production code, won hackathons, TA&apos;d 100+ students.
              Incoming SWE intern at <span className="text-accent">Microsoft</span>.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[['GPA', '3.72', 'Dean\'s List'], ['Hackathon', '1st', 'WiCS 2025'], ['School', 'ASU', '4+1 BS/MS']].map(([label, val, sub]) => (
              <div key={label} className="card-interactive rounded-xl border border-dark-border p-3 text-center">
                <p className="text-[9px] font-mono text-text-subtle uppercase mb-1">{label}</p>
                <p className={`text-xl font-black ${label === 'Hackathon' ? 'text-accent' : 'text-[#efefef]'}`}>{val}</p>
                <p className="text-[9px] font-mono text-text-subtle">{sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ══ EXPERIENCE — git log style ══ */}
        <section
          className="mb-10 animate-fade-in-up delay-300"
          style={{ opacity: 0, animationFillMode: 'forwards' }}
        >
          <p className="text-[10px] font-mono text-text-subtle uppercase tracking-widest mb-5">
            // git log --author=rahulbaweja7
          </p>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[5px] top-3 bottom-3 w-px bg-dark-border" />

            <div className="space-y-4">
              {/* Upcoming Microsoft */}
              <div className="relative pl-8">
                <div
                  className="absolute left-0 top-1.5 w-[11px] h-[11px] rounded-full border-2 border-accent animate-pulse"
                  style={{ background: 'rgba(249,115,22,0.2)' }}
                />
                <div
                  className="rounded-xl p-4"
                  style={{ border: '1px solid rgba(249,115,22,0.25)', background: 'rgba(249,115,22,0.03)' }}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-[#efefef] font-semibold text-sm">SWE Intern</p>
                        <span className="text-[9px] font-mono text-accent border border-accent/30 rounded px-1.5 py-0.5">upcoming</span>
                      </div>
                      <p className="text-accent font-medium text-sm">Microsoft</p>
                    </div>
                    <span className="text-[11px] font-mono text-text-subtle">Summer 2026</span>
                  </div>
                  <p className="text-text-muted text-xs">Redmond, WA</p>
                </div>
              </div>

              {timeline.map((job, i) => (
                <div key={i} className="relative pl-8">
                  <div
                    className="absolute left-0 top-1.5 w-[11px] h-[11px] rounded-full border border-dark-border bg-[#0f0f0f]"
                    style={{ background: '#1a1a1a' }}
                  />
                  <div className="card-interactive rounded-xl border border-dark-border p-4">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div>
                        <p className="text-[#efefef] font-semibold text-sm">{job.role}</p>
                        <p className="text-text-muted text-sm">{job.company}
                          <span className="text-text-subtle text-xs ml-2 font-mono">{job.location}</span>
                        </p>
                      </div>
                      <span className="text-[11px] font-mono text-text-subtle">{job.period}</span>
                    </div>

                    {/* Impact metrics */}
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {job.metrics.map((m, mi) => (
                        <span
                          key={mi}
                          className="text-[11px] font-mono text-accent border border-accent/20 bg-accent/5 px-2 py-0.5 rounded"
                        >
                          {m}
                        </span>
                      ))}
                    </div>

                    <p className="text-text-muted text-xs leading-relaxed">{job.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ OUTSIDE THE CODE ══ */}
        <section
          className="animate-fade-in-up"
          style={{ opacity: 0, animationFillMode: 'forwards', animationDelay: '0.5s' }}
        >
          <p className="text-[10px] font-mono text-text-subtle uppercase tracking-widest mb-4">
            // outside the code
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {outside.map((item, i) => (
              <div
                key={i}
                className="card-interactive rounded-xl border border-dark-border p-4 flex flex-col items-center text-center gap-1.5"
              >
                <span className="text-2xl">{item.emoji}</span>
                <p className="text-[#efefef] text-xs font-bold">{item.label}</p>
                <p className="text-text-subtle text-[10px] font-mono leading-tight">{item.sub}</p>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
