import Head from 'next/head';
import Navbar from '@/components/Navbar';
import { useState, useEffect, useRef } from 'react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';

/* ── Scramble ── */
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$';
function Scramble({ text, className, style }) {
  const [display, setDisplay] = useState(text);
  const iv = useRef(null);
  const scramble = () => {
    let i = 0;
    clearInterval(iv.current);
    iv.current = setInterval(() => {
      setDisplay(text.split('').map((ch, idx) =>
        idx < Math.floor(i) ? ch : CHARS[Math.floor(Math.random() * CHARS.length)]
      ).join(''));
      i += 0.55;
      if (Math.floor(i) >= text.length) { clearInterval(iv.current); setDisplay(text); }
    }, 25);
  };
  useEffect(() => () => clearInterval(iv.current), []);
  return <span className={className} style={style} onMouseEnter={scramble}>{display}</span>;
}

/* ── Time-based status ── */
function getStatus(h) {
  if (h >= 22 || h < 2)  return { text: 'peak hours — responds fast 🔥',      color: '#f97316' };
  if (h >= 2  && h < 8)  return { text: 'asleep (allegedly)',                  color: '#484848' };
  if (h >= 8  && h < 12) return { text: 'in class · replies between lectures', color: '#7aa2c8' };
  if (h >= 12 && h < 18) return { text: 'definitely coding something',         color: '#22c55e' };
  return                         { text: 'watching football or cricket',        color: '#a78bfa' };
}

const REASONS = [
  '💼 Full-time', '🚀 Internships', '🤝 Collabs', '☕ Just coffee',
];

export default function Contact() {
  const [copied, setCopied]   = useState(false);
  const [time,   setTime]     = useState(null);

  useEffect(() => {
    setTime(new Date());
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText('rbaweja1@asu.edu');
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const phoenixTime = time
    ? new Date(time.toLocaleString('en-US', { timeZone: 'America/Phoenix' }))
    : null;
  const hour    = phoenixTime ? phoenixTime.getHours() : 14;
  const timeStr = phoenixTime
    ? phoenixTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })
    : '--:--:--';
  const status  = getStatus(hour);

  return (
    <div className="min-h-screen" style={{ background: 'var(--c-bg)' }}>
      <Head>
        <title>Contact | Rahul Baweja</title>
        <meta name="description" content="Get in touch with Rahul Baweja." />
      </Head>
      <Navbar />

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-20 min-h-screen flex flex-col justify-center overflow-hidden">

        {/* ════ Desktop: two-column ════ */}
        <div className="hidden lg:flex gap-16 items-start">

          {/* ── LEFT ── */}
          <div className="flex-1 min-w-0">

            {/* Label */}
            <p className="text-[10px] font-mono text-text-subtle uppercase tracking-widest mb-8 animate-fade-in-up"
              style={{ opacity: 0, animationFillMode: 'forwards' }}>
              {'// say hi, it costs nothing'}
            </p>

            {/* Giant headline */}
            <div className="mb-10 animate-fade-in-up delay-100 leading-[0.85] tracking-tight font-black uppercase select-none"
              style={{ opacity: 0, animationFillMode: 'forwards', fontSize: 'clamp(72px, 11vw, 148px)' }}>
              <div style={{ color: 'var(--c-ghost)' }}>REACH</div>
              <Scramble text="OUT." style={{ color: 'var(--c-text)' }} />
            </div>

            {/* Description */}
            <p className="text-text-muted text-base leading-relaxed max-w-md mb-10 animate-fade-in-up delay-200"
              style={{ opacity: 0, animationFillMode: 'forwards' }}>
              Hiring, building something cool, or just want to nerd out —
              drop me a message. I&apos;m pretty quick to respond and
              not insufferable to talk to.
            </p>

            {/* Open to — no label, just tags */}
            <div className="mb-10 animate-fade-in-up delay-300" style={{ opacity: 0, animationFillMode: 'forwards' }}>
              <div className="flex flex-wrap gap-2">
                {REASONS.map(r => (
                  <span key={r} className="px-3 py-1.5 rounded-lg text-xs font-mono"
                    style={{ background: 'var(--c-card)', border: '1px solid var(--c-border)', color: 'var(--c-subtle)' }}>
                    {r}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* ── RIGHT — sticky contact card ── */}
          <div className="w-[360px] shrink-0 animate-fade-in-up delay-200" style={{ opacity: 0, animationFillMode: 'forwards', position: 'sticky', top: 100 }}>
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--c-border)', background: 'var(--c-card)' }}>

              {/* Live clock */}
              <div className="px-5 py-5 border-b" style={{ borderColor: 'var(--c-border)', background: 'var(--c-card-alt)' }}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono text-text-subtle uppercase tracking-widest">📍 Phoenix, AZ</span>
                  <span className="text-[10px] font-mono text-text-subtle">UTC−7</span>
                </div>
                <p className="font-mono font-bold mb-2" style={{ fontSize: 28, color: 'var(--c-text)', letterSpacing: '-0.02em' }}>
                  {timeStr}
                </p>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: status.color }} />
                  <span className="text-[11px] font-mono" style={{ color: status.color }}>{status.text}</span>
                </div>
              </div>

              {/* Email */}
              <div className="px-5 py-4 border-b" style={{ borderColor: 'var(--c-border)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
                    style={{ background: 'rgba(249,115,22,0.1)', color: '#f97316' }}>
                    <AiOutlineMail size={15} />
                  </div>
                  <div>
                    <p className="text-[9px] font-mono text-text-subtle uppercase tracking-widest">Email</p>
                    <Scramble text="rbaweja1@asu.edu" className="text-sm font-mono font-semibold" style={{ color: 'var(--c-text)' }} />
                  </div>
                </div>
                <div className="flex gap-2">
                  <a href="mailto:rbaweja1@asu.edu"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-mono font-bold uppercase tracking-wide transition-all duration-200 hover:bg-orange-400 group"
                    style={{ background: '#f97316', color: '#0f0f0f' }}>
                    Send email
                    <span className="group-hover:translate-x-0.5 transition-transform duration-200">→</span>
                  </a>
                  <button onClick={copyEmail}
                    className="px-4 py-2 rounded-lg text-xs font-mono border transition-all duration-200"
                    style={{
                      borderColor: copied ? 'rgba(34,197,94,0.4)' : 'var(--c-border)',
                      color: copied ? '#22c55e' : 'var(--c-subtle)',
                      background: copied ? 'rgba(34,197,94,0.06)' : 'transparent',
                    }}>
                    {copied ? '✓' : 'copy'}
                  </button>
                </div>
              </div>

              {/* LinkedIn */}
              <a href="https://www.linkedin.com/in/rahulbaweja-/" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-between px-5 py-4 border-b group transition-colors duration-200 hover:bg-[var(--c-card-alt)]"
                style={{ borderColor: 'var(--c-border)' }}>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
                    style={{ background: 'rgba(10,102,194,0.12)', color: '#0a66c2' }}>
                    <FaLinkedinIn size={13} />
                  </div>
                  <div>
                    <p className="text-[9px] font-mono text-text-subtle uppercase tracking-widest">LinkedIn</p>
                    <p className="text-sm font-mono font-semibold" style={{ color: 'var(--c-text)' }}>/in/rahulbaweja-/</p>
                  </div>
                </div>
                <span className="text-text-subtle group-hover:text-accent group-hover:translate-x-0.5 transition-all duration-200">↗</span>
              </a>

              {/* GitHub */}
              <a href="https://github.com/rahulbaweja7" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-between px-5 py-4 group transition-colors duration-200 hover:bg-[var(--c-card-alt)]">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
                    style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--c-muted)' }}>
                    <FaGithub size={13} />
                  </div>
                  <div>
                    <p className="text-[9px] font-mono text-text-subtle uppercase tracking-widest">GitHub</p>
                    <p className="text-sm font-mono font-semibold" style={{ color: 'var(--c-text)' }}>rahulbaweja7</p>
                  </div>
                </div>
                <span className="text-text-subtle group-hover:text-accent group-hover:translate-x-0.5 transition-all duration-200">↗</span>
              </a>

              {/* Footer note */}
              <div className="px-5 py-3" style={{ borderTop: '1px solid var(--c-border)', background: 'var(--c-card-alt)' }}>
                <p className="text-[10px] font-mono text-text-subtle text-center">
                  fastest 10pm – 2am. occupational hazard.
                </p>
              </div>
            </div>

            {/* Closing */}
            <p className="text-[10px] font-mono text-text-subtle mt-4 text-center opacity-40">
              {'// the worst that happens is i say no.'}
            </p>
          </div>
        </div>

        {/* ════ Mobile: stacked ════ */}
        <div className="lg:hidden space-y-6">
          <div>
            <p className="text-[10px] font-mono text-text-subtle uppercase tracking-widest mb-5 animate-fade-in-up"
              style={{ opacity: 0, animationFillMode: 'forwards' }}>
              {'// go on, make the first move'}
            </p>
            <div className="font-black uppercase leading-[0.85] tracking-tight select-none mb-6 animate-fade-in-up delay-100"
              style={{ opacity: 0, animationFillMode: 'forwards', fontSize: 'clamp(60px, 16vw, 100px)' }}>
              <div style={{ color: 'var(--c-ghost)' }}>REACH</div>
              <div style={{ color: 'var(--c-text)' }}>OUT<span style={{ color: '#f97316' }}>.</span></div>
            </div>
            <p className="text-text-muted text-sm leading-relaxed mb-6 animate-fade-in-up delay-200"
              style={{ opacity: 0, animationFillMode: 'forwards' }}>
              Recruiter, founder, fellow dev, or just curious — my inbox is always open. I reply fast.
            </p>
          </div>

          {/* Mobile contact card */}
          <div className="rounded-2xl overflow-hidden animate-fade-in-up delay-300"
            style={{ opacity: 0, animationFillMode: 'forwards', border: '1px solid var(--c-border)', background: 'var(--c-card)' }}>
            {/* Live clock */}
            <div className="px-4 py-4 border-b" style={{ borderColor: 'var(--c-border)', background: 'var(--c-card-alt)' }}>
              <p className="text-[9px] font-mono text-text-subtle mb-1">📍 Phoenix, AZ</p>
              <p className="font-mono font-bold text-xl mb-1" style={{ color: 'var(--c-text)' }}>{timeStr}</p>
              <span className="text-[10px] font-mono" style={{ color: status.color }}>{status.text}</span>
            </div>
            {/* Email */}
            <div className="px-4 py-4 border-b" style={{ borderColor: 'var(--c-border)' }}>
              <p className="text-[9px] font-mono text-text-subtle uppercase tracking-widest mb-2">Email</p>
              <p className="text-sm font-mono font-semibold mb-3" style={{ color: 'var(--c-text)' }}>rbaweja1@asu.edu</p>
              <div className="flex gap-2">
                <a href="mailto:rbaweja1@asu.edu"
                  className="flex-1 text-center py-2 rounded-lg text-xs font-mono font-bold uppercase tracking-wide transition-colors"
                  style={{ background: '#f97316', color: '#0f0f0f' }}>
                  Send email →
                </a>
                <button onClick={copyEmail}
                  className="px-4 py-2 rounded-lg text-xs font-mono border transition-all"
                  style={{ borderColor: copied ? 'rgba(34,197,94,0.4)' : 'var(--c-border)', color: copied ? '#22c55e' : 'var(--c-subtle)' }}>
                  {copied ? '✓' : 'copy'}
                </button>
              </div>
            </div>
            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/rahulbaweja-/" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-between px-4 py-4 border-b group hover:bg-[var(--c-card-alt)] transition-colors"
              style={{ borderColor: 'var(--c-border)' }}>
              <div className="flex items-center gap-3">
                <FaLinkedinIn size={14} style={{ color: '#0a66c2' }} />
                <span className="text-sm font-mono font-semibold" style={{ color: 'var(--c-text)' }}>/in/rahulbaweja-/</span>
              </div>
              <span className="text-text-subtle group-hover:text-accent">↗</span>
            </a>
            {/* GitHub */}
            <a href="https://github.com/rahulbaweja7" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-between px-4 py-4 group hover:bg-[var(--c-card-alt)] transition-colors">
              <div className="flex items-center gap-3">
                <FaGithub size={14} style={{ color: 'var(--c-muted)' }} />
                <span className="text-sm font-mono font-semibold" style={{ color: 'var(--c-text)' }}>rahulbaweja7</span>
              </div>
              <span className="text-text-subtle group-hover:text-accent">↗</span>
            </a>
          </div>

          {/* Open to — mobile */}
          <div className="animate-fade-in-up delay-500" style={{ opacity: 0, animationFillMode: 'forwards' }}>
            <div className="flex flex-wrap gap-2">
              {REASONS.map(r => (
                <span key={r} className="px-3 py-1.5 rounded-lg text-xs font-mono"
                  style={{ background: 'var(--c-card)', border: '1px solid var(--c-border)', color: 'var(--c-muted)' }}>
                  {r}
                </span>
              ))}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
