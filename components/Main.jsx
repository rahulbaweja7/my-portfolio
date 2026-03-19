import Navbar from '@/components/Navbar';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { FaGithub, FaLinkedinIn, FaTrophy } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';
import Link from 'next/link';

/* ─── Scramble on hover ─────────────────────────────────── */
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$!&*%?';

function ScrambleText({ text, className, as: Tag = 'span' }) {
  const [display, setDisplay] = useState(text);
  const iv = useRef(null);

  const scramble = () => {
    let i = 0;
    clearInterval(iv.current);
    iv.current = setInterval(() => {
      setDisplay(
        text.split('').map((ch, idx) =>
          idx < Math.floor(i) ? ch : CHARS[Math.floor(Math.random() * CHARS.length)]
        ).join('')
      );
      i += 0.45;
      if (Math.floor(i) >= text.length) {
        clearInterval(iv.current);
        setDisplay(text);
      }
    }, 22);
  };

  useEffect(() => () => clearInterval(iv.current), []);

  return (
    <Tag className={className} onMouseEnter={scramble} data-hover>
      {display}
    </Tag>
  );
}

/* ─── Cycling roles ─────────────────────────────────────── */
const roles = [
  'building cool web apps',
  'a football fanatic',
  'debugging at 2am (happily)',
  'chasing cricket scores',
  'gaming when not coding',
  'building things people actually use',
];

/* ─── Tile base ─────────────────────────────────────────── */
const T = 'rounded-2xl border border-dark-border bg-dark-card overflow-hidden';

export default function Main() {
  const [ri, setRi] = useState(0);
  const [vis, setVis] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setVis(false);
      setTimeout(() => { setRi(p => (p + 1) % roles.length); setVis(true); }, 380);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-dark flex flex-col">
      <Navbar />

      {/* ══════════ DESKTOP BENTO ══════════ */}
      <div className="hidden md:flex flex-col flex-1 w-full max-w-[1400px] mx-auto px-4 pt-[72px] pb-4">
        <div
          className="grid gap-3 flex-1"
          style={{
            gridTemplateColumns: '2.2fr 1fr 1fr 1fr',
            gridTemplateRows:    '1.8fr 1fr 1fr',
          }}
        >
          {/* ① NAME — col 1, row 1–2 */}
          <div
            className={`${T} p-7 flex flex-col justify-between select-none group`}
            style={{ gridColumn: '1', gridRow: '1 / 3' }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-text-subtle uppercase tracking-[0.15em]">
                CS Student · Arizona State
              </span>
              <span className="text-xs font-mono text-text-subtle">2025</span>
            </div>

            <div>
              <div
                className="font-light leading-[0.92] tracking-tight select-none mb-5"
                style={{ fontSize: 'clamp(56px, 5.8vw, 96px)' }}
              >
                <ScrambleText text="Rahul"  className="block text-[#efefef]" />
                <ScrambleText text="Baweja" className="block text-[#efefef]" />
                <span className="text-accent">.</span>
              </div>
              <p className="text-sm text-text-muted max-w-xs leading-relaxed">
                Building full-stack apps. Shipping real code.<br />Winning hackathons.
              </p>
            </div>

            <div className="flex items-center gap-5">
              <a href="https://github.com/rahulbaweja7" target="_blank" rel="noopener noreferrer"
                className="text-text-subtle hover:text-[#efefef] transition-colors" aria-label="GitHub">
                <FaGithub size={18} />
              </a>
              <a href="https://www.linkedin.com/in/rahulbaweja-/" target="_blank" rel="noopener noreferrer"
                className="text-text-subtle hover:text-[#efefef] transition-colors" aria-label="LinkedIn">
                <FaLinkedinIn size={17} />
              </a>
              <a href="mailto:rbaweja1@asu.edu"
                className="text-text-subtle hover:text-[#efefef] transition-colors" aria-label="Email">
                <AiOutlineMail size={18} />
              </a>
            </div>
          </div>

          {/* ② PHOTO — col 2, row 1–3 */}
          <div
            className="rounded-2xl overflow-hidden border border-dark-border relative"
            style={{ gridColumn: '2', gridRow: '1 / 4' }}
          >
            <Image
              src="/assets/RahulLA.png"
              alt="Rahul Baweja"
              fill
              priority
              style={{ objectFit: 'cover', objectPosition: 'top center' }}
            />
            <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-dark/80 to-transparent" />
            <span className="absolute bottom-3 left-4 text-[10px] font-mono text-text-subtle uppercase tracking-widest">
              Tempe, AZ
            </span>
          </div>

          {/* ③ MICROSOFT STATUS — col 3, row 1 */}
          <div className={`${T} p-5 flex flex-col justify-between`}
            style={{ gridColumn: '3', gridRow: '1' }}>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] font-mono text-text-subtle uppercase tracking-widest">Active</span>
            </div>
            <div>
              <p className="text-[10px] font-mono text-text-subtle mb-1 uppercase tracking-wider">Incoming Intern</p>
              <p className="text-[#efefef] text-lg font-medium leading-tight">Microsoft</p>
              <p className="text-xs font-mono text-text-subtle mt-1">Summer 2025</p>
            </div>
          </div>

          {/* ④ CTA — col 4, row 1 */}
          <Link
            href="/projects"
            className="rounded-2xl bg-accent hover:bg-orange-400 transition-colors duration-200 p-6 flex flex-col justify-between group"
            style={{ gridColumn: '4', gridRow: '1' }}
          >
            <span className="text-[10px] font-mono text-dark/60 uppercase tracking-widest">Portfolio</span>
            <div>
              <p className="text-dark font-medium text-xl leading-snug">
                View my<br />projects<span className="inline-block ml-1 group-hover:translate-x-1 transition-transform">→</span>
              </p>
            </div>
          </Link>

          {/* ⑤ CYCLING TEXT — col 1, row 3 */}
          <div className={`${T} p-5 flex flex-col justify-center`}
            style={{ gridColumn: '1', gridRow: '3' }}>
            <p className="text-[10px] font-mono text-text-subtle uppercase tracking-widest mb-2">Currently</p>
            <p
              className="text-sm font-mono text-text-muted transition-all duration-300"
              style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(-4px)' }}
            >
              &gt; I&apos;m {roles[ri]}
              <span className="animate-blink ml-0.5 text-accent">_</span>
            </p>
          </div>

          {/* ⑥ HACKATHON — col 3, row 2 */}
          <div className={`${T} p-5 flex flex-col justify-between hover:border-yellow-500/40 transition-colors`}
            style={{ gridColumn: '3', gridRow: '2' }}>
            <FaTrophy className="text-yellow-400" size={18} />
            <div>
              <p className="text-[#efefef] font-medium text-sm">1st Place</p>
              <p className="text-[10px] font-mono text-text-subtle mt-0.5 uppercase tracking-wide">WiCS Hackathon 2025</p>
            </div>
          </div>

          {/* ⑦ GPA — col 4, row 2 */}
          <div className={`${T} p-5 flex flex-col justify-between`}
            style={{ gridColumn: '4', gridRow: '2' }}>
            <p className="text-[10px] font-mono text-text-subtle uppercase tracking-widest">Academic</p>
            <div>
              <p className="text-[#efefef] text-3xl font-light">3.72</p>
              <p className="text-[10px] font-mono text-text-subtle mt-1 uppercase tracking-wide">Dean&apos;s List · GPA</p>
            </div>
          </div>

          {/* ⑧ INTERESTS — col 3–4, row 3 */}
          <div className={`${T} p-5 flex flex-col justify-between`}
            style={{ gridColumn: '3 / 5', gridRow: '3' }}>
            <p className="text-[10px] font-mono text-text-subtle uppercase tracking-widest">Off the clock</p>
            <div className="flex items-center gap-6">
              <span className="text-2xl" title="NFL Football">🏈</span>
              <span className="text-2xl" title="Cricket">🏏</span>
              <span className="text-2xl" title="Gaming">🎮</span>
              <span className="text-2xl" title="Music">🎵</span>
              <span className="text-xs font-mono text-text-subtle ml-2 hidden xl:block">
                NFL · Cricket · Gaming · Music
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════ MOBILE STACK ══════════ */}
      <div className="md:hidden px-5 pt-24 pb-12 space-y-4">
        {/* Name */}
        <div className={`${T} p-6`}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono text-text-subtle uppercase tracking-widest">CS · Arizona State</span>
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          </div>
          <div className="font-light leading-[0.92] tracking-tight select-none mb-5"
            style={{ fontSize: 'clamp(52px, 14vw, 72px)' }}>
            <ScrambleText text="Rahul"  className="block text-[#efefef]" />
            <ScrambleText text="Baweja" className="block text-[#efefef]" />
            <span className="text-accent">.</span>
          </div>
          <p className="text-sm text-text-muted leading-relaxed">
            Building full-stack apps. Shipping real code. Winning hackathons.
          </p>
        </div>

        {/* 2-col row */}
        <div className="grid grid-cols-2 gap-3">
          <div className={`${T} p-4 flex flex-col justify-between`}>
            <span className="text-[10px] font-mono text-text-subtle uppercase tracking-wider">Incoming</span>
            <p className="text-[#efefef] font-medium">Microsoft</p>
          </div>
          <Link href="/projects" className="rounded-2xl bg-accent p-4 flex flex-col justify-between">
            <span className="text-[10px] font-mono text-dark/60 uppercase tracking-wider">Work</span>
            <p className="text-dark font-medium">View projects →</p>
          </Link>
        </div>

        {/* Cycling */}
        <div className={`${T} p-4`}>
          <p className="text-sm font-mono text-text-muted"
            style={{ opacity: vis ? 1 : 0, transition: 'opacity 0.3s' }}>
            &gt; I&apos;m {roles[ri]}<span className="animate-blink ml-0.5 text-accent">_</span>
          </p>
        </div>

        {/* Trophy + GPA */}
        <div className="grid grid-cols-2 gap-3">
          <div className={`${T} p-4`}>
            <FaTrophy className="text-yellow-400 mb-3" size={16} />
            <p className="text-[#efefef] text-sm font-medium">1st Place</p>
            <p className="text-[10px] font-mono text-text-subtle mt-0.5">WiCS 2025</p>
          </div>
          <div className={`${T} p-4`}>
            <p className="text-[10px] font-mono text-text-subtle mb-3 uppercase">GPA</p>
            <p className="text-[#efefef] text-3xl font-light">3.72</p>
          </div>
        </div>

        {/* Socials */}
        <div className={`${T} p-4 flex items-center gap-6`}>
          <a href="https://github.com/rahulbaweja7" target="_blank" rel="noopener noreferrer"
            className="text-text-subtle hover:text-[#efefef] transition-colors"><FaGithub size={18} /></a>
          <a href="https://www.linkedin.com/in/rahulbaweja-/" target="_blank" rel="noopener noreferrer"
            className="text-text-subtle hover:text-[#efefef] transition-colors"><FaLinkedinIn size={17} /></a>
          <a href="mailto:rbaweja1@asu.edu"
            className="text-text-subtle hover:text-[#efefef] transition-colors"><AiOutlineMail size={18} /></a>
        </div>
      </div>
    </div>
  );
}
