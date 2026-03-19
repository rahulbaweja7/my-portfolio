import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';


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
              style={{ objectFit: 'cover', objectPosition: '50% 18%' }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 px-4 py-3"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)' }}
            >
              <p className="font-semibold text-sm" style={{ color: 'var(--c-text)' }}>Rahul Baweja</p>
              <p className="text-[10px] font-mono text-text-subtle uppercase tracking-wider">CS @ ASU</p>
            </div>
          </div>

          {/* Bio — col 3-5, row 1 */}
          <div
            className="card-interactive rounded-xl border border-dark-border p-5 flex flex-col justify-between animate-fade-in-up delay-100"
            style={{ gridColumn: '3 / span 3', gridRow: '1', opacity: 0, animationFillMode: 'forwards' }}
          >
            <div>
              <p className="text-[10px] font-mono text-text-subtle uppercase tracking-widest mb-3">{'// about'}</p>
              <h1 className="text-2xl font-black uppercase leading-tight mb-3" style={{ color: 'var(--c-text)' }}>
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
                className="flex items-center gap-1.5 text-[11px] font-mono text-text-subtle hover:text-text-primary transition-colors border border-dark-border rounded px-2.5 py-1 hover:border-dark-border">
                <FaLinkedinIn size={11} /> LinkedIn
              </a>
              <a href="https://github.com/rahulbaweja7" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[11px] font-mono text-text-subtle hover:text-text-primary transition-colors border border-dark-border rounded px-2.5 py-1 hover:border-dark-border">
                <FaGithub size={11} /> GitHub
              </a>
              <a href="mailto:rbaweja1@asu.edu"
                className="flex items-center gap-1.5 text-[11px] font-mono text-text-subtle hover:text-text-primary transition-colors border border-dark-border rounded px-2.5 py-1 hover:border-dark-border">
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
                className="font-black uppercase leading-none tracking-tight"
                style={{ fontSize: 'clamp(11px, 1.05vw, 15px)', color: 'var(--c-text)' }}
              >
                Microsoft
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
            <p className="text-4xl font-black" style={{ color: 'var(--c-text)' }}>3.72</p>
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
            <p className="text-2xl font-black" style={{ color: 'var(--c-text)' }}>ASU</p>
            <p className="text-[10px] font-mono text-text-subtle">4+1 BS/MS</p>
          </div>
        </div>

        {/* ══ MOBILE — stacked cards ══ */}
        <div className="md:hidden space-y-3 mb-6">
          <div className="rounded-xl overflow-hidden" style={{ border: '1.5px dashed rgba(249,115,22,0.35)' }}>
            <div className="relative h-48">
              <Image src="/assets/RahulLA.png" alt="Rahul" fill priority style={{ objectFit: 'cover', objectPosition: '50% 18%' }} />
            </div>
            <div className="p-4">
              <p className="font-semibold text-sm" style={{ color: 'var(--c-text)' }}>Rahul Baweja</p>
              <p className="text-text-subtle text-[10px] font-mono">CS @ ASU · Full-Stack Engineer</p>
            </div>
          </div>
          <div className="card-interactive rounded-xl border border-dark-border p-5">
            <h1 className="text-2xl font-black uppercase mb-3 leading-tight" style={{ color: 'var(--c-text)' }}>
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
                <p
                  className={`text-xl font-black ${label === 'Hackathon' ? 'text-accent' : ''}`}
                  style={label !== 'Hackathon' ? { color: 'var(--c-text)' } : undefined}
                >
                  {val}
                </p>
                <p className="text-[9px] font-mono text-text-subtle">{sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ══ OUTSIDE THE CODE ══ */}
        <section
          className="animate-fade-in-up"
          style={{ opacity: 0, animationFillMode: 'forwards', animationDelay: '0.5s' }}
        >
          <p className="text-[10px] font-mono text-text-subtle uppercase tracking-widest mb-4">
            {'// outside the code'}
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {outside.map((item, i) => (
              <div
                key={i}
                className="card-interactive rounded-xl border border-dark-border p-4 flex flex-col items-center text-center gap-1.5"
              >
                <span className="text-2xl">{item.emoji}</span>
                <p className="text-xs font-bold" style={{ color: 'var(--c-text)' }}>{item.label}</p>
                <p className="text-text-subtle text-[10px] font-mono leading-tight">{item.sub}</p>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
