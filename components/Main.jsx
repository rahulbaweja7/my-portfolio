import Navbar from '@/components/Navbar';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';
import Link from 'next/link';

/* ── Scramble on hover ───────────────────────────────────── */
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$!&*%?';

function ScrambleText({ text, as: Tag = 'span', className }) {
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
      if (Math.floor(i) >= text.length) { clearInterval(iv.current); setDisplay(text); }
    }, 22);
  };

  useEffect(() => () => clearInterval(iv.current), []);
  return <Tag className={className} onMouseEnter={scramble} data-hover>{display}</Tag>;
}

/* ── Cycling roles ───────────────────────────────────────── */
const roles = [
  'building cool web apps',
  'a football fanatic',
  'debugging at 2am (happily)',
  'chasing cricket scores',
  'gaming when not coding',
  'building things people use',
];

/* ── Stats ───────────────────────────────────────────────── */
const stats = [
  { num: '3',    label: 'Internships'      },
  { num: '4+',   label: 'Projects Shipped' },
  { num: '3.72', label: 'GPA'              },
  { num: '1st',  label: 'Hackathon Win'    },
];

export default function Main() {
  const [ri,  setRi]  = useState(0);
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

      {/* ══════════════ DESKTOP ══════════════ */}
      <div className="hidden md:flex flex-1 gap-5 px-5 pt-[76px] pb-5 max-w-[1440px] mx-auto w-full">

        {/* ── LEFT: Profile card ─────────────── */}
        <div className="w-[320px] xl:w-[360px] shrink-0">
          <div
            className="h-full rounded-2xl bg-dark-card flex flex-col overflow-hidden"
            style={{ border: '1.5px dashed rgba(249,115,22,0.35)' }}
          >
            {/* Photo fills top of card */}
            <div className="relative flex-1 min-h-0">
              <Image
                src="/assets/RahulLA.png"
                alt="Rahul Baweja"
                fill
                priority
                style={{ objectFit: 'cover', objectPosition: 'top center' }}
              />
            </div>

            {/* Card info */}
            <div className="shrink-0 p-5 border-t border-dark-border">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-[#efefef] font-semibold">Rahul Baweja</p>
                  <p className="text-[10px] font-mono text-text-subtle mt-0.5 uppercase tracking-wider">
                    CS Student · ASU
                  </p>
                </div>
                <span className="flex items-center gap-1.5 text-[10px] font-mono text-green-400 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Open
                </span>
              </div>

              {/* Cycling text */}
              <div className="h-4 mb-4">
                <p
                  className="text-[11px] font-mono text-text-muted truncate transition-all duration-300"
                  style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(-3px)' }}
                >
                  &gt; I&apos;m {roles[ri]}<span className="animate-blink ml-0.5 text-accent">_</span>
                </p>
              </div>

              <div className="flex gap-4">
                <a href="https://github.com/rahulbaweja7" target="_blank" rel="noopener noreferrer"
                  className="text-text-subtle hover:text-[#efefef] transition-colors">
                  <FaGithub size={17} />
                </a>
                <a href="https://www.linkedin.com/in/rahulbaweja-/" target="_blank" rel="noopener noreferrer"
                  className="text-text-subtle hover:text-[#efefef] transition-colors">
                  <FaLinkedinIn size={16} />
                </a>
                <a href="mailto:rbaweja1@asu.edu"
                  className="text-text-subtle hover:text-[#efefef] transition-colors">
                  <AiOutlineMail size={17} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Content ─────────────────── */}
        <div className="flex-1 flex flex-col justify-between min-w-0 py-1">

          {/* Big two-tone title */}
          <div>
            <div
              className="font-black uppercase leading-[0.87] tracking-tight select-none mb-7"
              style={{ fontSize: 'clamp(64px, 8.8vw, 144px)' }}
            >
              <ScrambleText text="FULL-STACK" as="div" className="text-[#efefef]" />
              <div style={{ color: '#1d1d1d' }}>ENGINEER.</div>
            </div>

            <p className="text-text-muted text-base leading-relaxed max-w-xl">
              CS student at Arizona State University. Building scalable web apps,
              shipping real code, winning hackathons. Incoming SWE intern at{' '}
              <span className="text-[#efefef] font-medium">Microsoft</span>.
            </p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-4 gap-4 py-7 border-y border-dark-border">
            {stats.map((s, i) => (
              <div key={i}>
                <p
                  className="font-bold text-[#efefef] mb-1"
                  style={{ fontSize: 'clamp(24px, 2.8vw, 42px)' }}
                >
                  {s.num}
                </p>
                <p className="text-[10px] font-mono text-text-subtle uppercase tracking-widest leading-tight">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* CTA tiles */}
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/projects"
              className="bg-accent hover:bg-orange-400 transition-colors duration-200 rounded-xl p-6 flex items-end justify-between group"
            >
              <div>
                <p className="text-[10px] font-mono text-dark/60 uppercase tracking-widest mb-2">Portfolio</p>
                <p className="text-dark font-black text-xl uppercase leading-tight">
                  View My<br />Work
                </p>
              </div>
              <span className="text-dark text-3xl font-thin group-hover:translate-x-1.5 transition-transform duration-200">
                →
              </span>
            </Link>

            <Link
              href="/about"
              className="bg-dark-card border border-dark-border hover:border-[#3a3a3a] transition-colors rounded-xl p-6 flex items-end justify-between group"
            >
              <div>
                <p className="text-[10px] font-mono text-text-subtle uppercase tracking-widest mb-2">Background</p>
                <p className="text-[#efefef] font-black text-xl uppercase leading-tight">
                  About<br />Me
                </p>
              </div>
              <span className="text-text-subtle text-3xl font-thin group-hover:text-[#efefef] group-hover:translate-x-1.5 transition-all duration-200">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* ══════════════ MOBILE ══════════════ */}
      <div className="md:hidden px-4 pt-24 pb-10 space-y-4">
        {/* Card */}
        <div className="rounded-2xl bg-dark-card overflow-hidden"
          style={{ border: '1.5px dashed rgba(249,115,22,0.35)' }}>
          <div className="relative h-56">
            <Image src="/assets/RahulLA.png" alt="Rahul" fill priority
              style={{ objectFit: 'cover', objectPosition: 'top' }} />
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[#efefef] font-semibold">Rahul Baweja</p>
              <span className="flex items-center gap-1.5 text-[10px] font-mono text-green-400">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Open
              </span>
            </div>
            <p className="text-[10px] font-mono text-text-subtle uppercase tracking-wider mb-3">CS Student · ASU</p>
            <div className="flex gap-4">
              <a href="https://github.com/rahulbaweja7" target="_blank" rel="noopener noreferrer"
                className="text-text-subtle hover:text-[#efefef] transition-colors"><FaGithub size={16} /></a>
              <a href="https://www.linkedin.com/in/rahulbaweja-/" target="_blank" rel="noopener noreferrer"
                className="text-text-subtle hover:text-[#efefef] transition-colors"><FaLinkedinIn size={15} /></a>
              <a href="mailto:rbaweja1@asu.edu"
                className="text-text-subtle hover:text-[#efefef] transition-colors"><AiOutlineMail size={16} /></a>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="font-black uppercase leading-[0.87] select-none"
          style={{ fontSize: 'clamp(48px, 13vw, 72px)' }}>
          <ScrambleText text="FULL-STACK" as="div" className="text-[#efefef]" />
          <div style={{ color: '#1d1d1d' }}>ENGINEER.</div>
        </div>

        <p className="text-text-muted text-sm leading-relaxed">
          CS student at Arizona State. Building apps, shipping code, winning hackathons.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          {stats.map((s, i) => (
            <div key={i} className="bg-dark-card border border-dark-border rounded-xl p-4">
              <p className="text-2xl font-bold text-[#efefef]">{s.num}</p>
              <p className="text-[10px] font-mono text-text-subtle uppercase tracking-widest mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tiles */}
        <div className="grid grid-cols-2 gap-3">
          <Link href="/projects"
            className="bg-accent rounded-xl p-4 flex items-center justify-between group hover:bg-orange-400 transition-colors">
            <p className="text-dark font-black uppercase text-sm">View Work</p>
            <span className="text-dark group-hover:translate-x-1 transition-transform">→</span>
          </Link>
          <Link href="/about"
            className="bg-dark-card border border-dark-border rounded-xl p-4 flex items-center justify-between group hover:border-[#3a3a3a] transition-colors">
            <p className="text-[#efefef] font-black uppercase text-sm">About Me</p>
            <span className="text-text-subtle group-hover:text-[#efefef] transition-colors">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
