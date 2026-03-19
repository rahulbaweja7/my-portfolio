import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';

const outside = [
  { emoji: '🏈', label: 'Football',  sub: 'NFL all day'        },
  { emoji: '🏏', label: 'Cricket',   sub: 'Always watching'    },
  { emoji: '🎮', label: 'Gaming',    sub: 'When not coding'    },
  { emoji: '🌙', label: '2AM dev',   sub: 'Peak productivity'  },
  { emoji: '☕', label: 'Coffee',    sub: 'Unhealthy amount'   },
  { emoji: '🎵', label: 'Music',     sub: 'Always on'          },
];

/* Microsoft 4-square logo */
function MsLogo({ size = 18 }) {
  const s = size / 2 - 1;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `${s}px ${s}px`, gap: 2, width: size, height: size }}>
      <div style={{ background: '#f25022', borderRadius: 1 }} />
      <div style={{ background: '#7fba00', borderRadius: 1 }} />
      <div style={{ background: '#00a4ef', borderRadius: 1 }} />
      <div style={{ background: '#ffb900', borderRadius: 1 }} />
    </div>
  );
}

export default function About() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--c-bg)' }}>
      <Head>
        <title>About | Rahul Baweja</title>
        <meta name="description" content="About Rahul Baweja" />
      </Head>
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 pt-28 pb-20">

        {/* ══ BENTO GRID — desktop ══ */}
        <div
          className="hidden md:grid gap-3 mb-6"
          style={{ gridTemplateColumns: 'repeat(6, 1fr)', gridTemplateRows: '240px 160px' }}
        >
          {/* ── Photo ── col 1-2, row 1-2 */}
          <div
            className="relative rounded-xl overflow-hidden animate-fade-in-up"
            style={{
              gridColumn: '1 / span 2', gridRow: '1 / span 2',
              opacity: 0, animationFillMode: 'forwards',
              border: '1.5px dashed rgba(249,115,22,0.4)',
            }}
          >
            <Image
              src="/assets/RahulLA.png"
              alt="Rahul Baweja"
              fill priority
              style={{ objectFit: 'cover', objectPosition: '50% 18%' }}
            />
            {/* overlay gradient */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)' }}
            />
            <div className="absolute bottom-0 left-0 right-0 px-4 py-3">
              <p className="font-bold text-sm text-white">Rahul Baweja</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <p className="text-[10px] font-mono text-green-400 uppercase tracking-wider">Open to work</p>
              </div>
            </div>
          </div>

          {/* ── Bio ── col 3-5, row 1 */}
          <div
            className="rounded-xl border p-5 flex flex-col justify-between animate-fade-in-up delay-100"
            style={{
              gridColumn: '3 / span 3', gridRow: '1',
              opacity: 0, animationFillMode: 'forwards',
              background: 'var(--c-card)',
              borderColor: 'var(--c-border)',
            }}
          >
            <div>
              <p className="text-[10px] font-mono text-text-subtle uppercase tracking-widest mb-2">{'// about.txt'}</p>
              <h1 className="font-black uppercase leading-[0.9] mb-3" style={{ fontSize: 'clamp(22px, 2.4vw, 34px)', color: 'var(--c-text)' }}>
                I build things<br />people use.
              </h1>
              <p className="text-text-muted text-[13px] leading-relaxed">
                CS student at ASU (4+1 BS/MS). Full-stack engineer.
                Shipped production code, won hackathons, TA&apos;d 100+ students.
                Incoming SWE intern at{' '}
                <span className="text-accent font-semibold">Microsoft</span>.
              </p>
            </div>

            {/* social row */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {[
                  { href: 'https://www.linkedin.com/in/rahulbaweja-/', icon: <FaLinkedinIn size={11} />, label: 'LinkedIn' },
                  { href: 'https://github.com/rahulbaweja7',           icon: <FaGithub size={11} />,     label: 'GitHub'   },
                  { href: 'mailto:rbaweja1@asu.edu',                    icon: <AiOutlineMail size={12} />, label: 'Email'    },
                ].map(({ href, icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-1.5 text-[11px] font-mono text-text-subtle hover:text-accent transition-colors border border-dark-border hover:border-accent/30 rounded px-2.5 py-1"
                  >
                    {icon} {label}
                  </a>
                ))}
              </div>
              <p className="text-[10px] font-mono text-text-subtle hidden lg:block">Phoenix, AZ</p>
            </div>
          </div>

          {/* ── Microsoft ── col 6, row 1 */}
          <div
            className="rounded-xl p-4 flex flex-col animate-fade-in-up delay-100"
            style={{
              gridColumn: '6', gridRow: '1',
              opacity: 0, animationFillMode: 'forwards',
              border: '1.5px solid rgba(249,115,22,0.3)',
              background: 'linear-gradient(135deg, rgba(249,115,22,0.06) 0%, rgba(249,115,22,0.02) 100%)',
            }}
          >
            <p className="text-[9px] font-mono text-accent uppercase tracking-widest mb-3">Next Role</p>

            {/* MS logo */}
            <div className="mb-3">
              <MsLogo size={32} />
            </div>

            <p className="font-black uppercase leading-tight text-sm mb-0.5" style={{ color: 'var(--c-text)' }}>
              Microsoft
            </p>
            <p className="text-[10px] font-mono text-text-muted mb-3">SWE Intern</p>

            <div className="flex-1" />

            <div className="space-y-1.5">
              <p className="text-[9px] font-mono text-text-subtle">📍 Redmond, WA</p>
              <p className="text-[9px] font-mono text-text-subtle">Summer 2026</p>
            </div>

            <div
              className="mt-3 flex items-center gap-1.5 text-[9px] font-mono font-bold uppercase tracking-wide px-2 py-1 rounded"
              style={{ background: 'rgba(34,197,94,0.1)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.2)' }}
            >
              <span style={{ fontSize: 8 }}>✓</span> Offer Confirmed
            </div>
          </div>

          {/* ── GPA ── col 3, row 2 */}
          <div
            className="rounded-xl border border-dark-border p-4 flex flex-col justify-between animate-fade-in-up delay-200"
            style={{
              gridColumn: '3', gridRow: '2',
              opacity: 0, animationFillMode: 'forwards',
              background: 'var(--c-card)',
            }}
          >
            <p className="text-[9px] font-mono text-text-subtle uppercase tracking-widest">GPA</p>
            <p className="text-4xl font-black" style={{ color: 'var(--c-text)' }}>3.72</p>
            <p className="text-[9px] font-mono text-text-subtle">Dean&apos;s List</p>
          </div>

          {/* ── Hackathon ── col 4, row 2 */}
          <div
            className="rounded-xl p-4 flex flex-col justify-between animate-fade-in-up delay-200"
            style={{
              gridColumn: '4', gridRow: '2',
              opacity: 0, animationFillMode: 'forwards',
              background: 'rgba(249,115,22,0.06)',
              border: '1px solid rgba(249,115,22,0.2)',
            }}
          >
            <p className="text-[9px] font-mono text-accent uppercase tracking-widest">Hackathon</p>
            <p className="text-4xl font-black text-accent">1st</p>
            <p className="text-[9px] font-mono text-text-subtle">WiCS 2025</p>
          </div>

          {/* ── School ── col 5, row 2 */}
          <div
            className="rounded-xl border border-dark-border p-4 flex flex-col justify-between animate-fade-in-up delay-200"
            style={{
              gridColumn: '5', gridRow: '2',
              opacity: 0, animationFillMode: 'forwards',
              background: 'var(--c-card)',
            }}
          >
            <p className="text-[9px] font-mono text-text-subtle uppercase tracking-widest">School</p>
            <p className="text-2xl font-black" style={{ color: 'var(--c-text)' }}>ASU</p>
            <p className="text-[9px] font-mono text-text-subtle">4+1 BS/MS</p>
          </div>

          {/* ── Internships ── col 6, row 2 */}
          <div
            className="rounded-xl border border-dark-border p-4 flex flex-col justify-between animate-fade-in-up delay-200"
            style={{
              gridColumn: '6', gridRow: '2',
              opacity: 0, animationFillMode: 'forwards',
              background: 'var(--c-card)',
            }}
          >
            <p className="text-[9px] font-mono text-text-subtle uppercase tracking-widest">Internships</p>
            <p className="text-4xl font-black" style={{ color: 'var(--c-text)' }}>3</p>
            <p className="text-[9px] font-mono text-text-subtle">+1 incoming</p>
          </div>
        </div>

        {/* ══ MOBILE ══ */}
        <div className="md:hidden space-y-3 mb-6">
          <div className="rounded-xl overflow-hidden" style={{ border: '1.5px dashed rgba(249,115,22,0.4)' }}>
            <div className="relative h-52">
              <Image src="/assets/RahulLA.png" alt="Rahul" fill priority
                style={{ objectFit: 'cover', objectPosition: '50% 18%' }} />
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)' }} />
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
            <h1 className="text-2xl font-black uppercase mb-3 leading-tight" style={{ color: 'var(--c-text)' }}>
              I build things<br />people use.
            </h1>
            <p className="text-text-muted text-sm leading-relaxed mb-4">
              CS student at ASU. Shipped production code, won hackathons, TA&apos;d 100+ students.
              Incoming SWE intern at <span className="text-accent font-semibold">Microsoft</span>.
            </p>
            <div
              className="flex items-center gap-2 p-3 rounded-lg"
              style={{ background: 'rgba(249,115,22,0.06)', border: '1px solid rgba(249,115,22,0.2)' }}
            >
              <MsLogo size={24} />
              <div>
                <p className="text-xs font-black uppercase" style={{ color: 'var(--c-text)' }}>Microsoft</p>
                <p className="text-[10px] font-mono text-text-subtle">SWE Intern · Summer 2026 · Redmond, WA</p>
              </div>
              <span className="ml-auto text-[9px] font-mono font-bold px-2 py-0.5 rounded"
                style={{ background: 'rgba(34,197,94,0.1)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.2)' }}>
                ✓ confirmed
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              ['GPA', '3.72', "Dean's List", null],
              ['Hackathon', '1st', 'WiCS 2025', '#f97316'],
              ['School', 'ASU', '4+1 BS/MS', null],
              ['Internships', '3', '+1 incoming', null],
            ].map(([label, val, sub, color]) => (
              <div key={label} className="rounded-xl border border-dark-border p-4"
                style={{ background: 'var(--c-card)' }}>
                <p className="text-[9px] font-mono text-text-subtle uppercase mb-2">{label}</p>
                <p className="text-2xl font-black mb-1" style={{ color: color || 'var(--c-text)' }}>{val}</p>
                <p className="text-[9px] font-mono text-text-subtle">{sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ══ OUTSIDE THE CODE ══ */}
        <section
          className="animate-fade-in-up"
          style={{ opacity: 0, animationFillMode: 'forwards', animationDelay: '0.4s' }}
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
