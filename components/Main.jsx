import Navbar from '@/components/Navbar';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';
import Link from 'next/link';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$!&*%?';

function ScrambleText({ text, as: Tag = 'span', className, style }) {
  const [display, setDisplay] = useState(text);
  const iv = useRef(null);
  const scramble = () => {
    let i = 0;
    clearInterval(iv.current);
    iv.current = setInterval(() => {
      setDisplay(text.split('').map((ch, idx) =>
        idx < Math.floor(i) ? ch : CHARS[Math.floor(Math.random() * CHARS.length)]
      ).join(''));
      i += 0.45;
      if (Math.floor(i) >= text.length) { clearInterval(iv.current); setDisplay(text); }
    }, 22);
  };
  useEffect(() => () => clearInterval(iv.current), []);
  return <Tag className={className} style={style} onMouseEnter={scramble} data-hover>{display}</Tag>;
}

const roles = [
  'building cool web apps',
  'a football fanatic',
  'debugging at 2am (happily)',
  'chasing cricket scores',
  'gaming when not coding',
  'building things people use',
];

const stats = [
  { num: '3',    label: 'Internships'      },
  { num: '4+',   label: 'Projects Shipped' },
  { num: '3.72', label: 'GPA'              },
  { num: '1st',  label: 'Hackathon Win'    },
];

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

      {/* ══ DESKTOP ══ */}
      <div className="hidden lg:flex flex-1 items-center px-6 max-w-[1380px] mx-auto w-full">
        {/*
          Fixed-height inner row so both sides stay proportional.
          min() keeps it from overflowing small laptop screens.
        */}
        <div
          className="flex gap-5 w-full"
          style={{ height: 'min(calc(100vh - 96px), 600px)' }}
        >
          {/* ── Card ──────────────────────────────── */}
          <div className="w-[280px] xl:w-[310px] shrink-0 h-full">
            <div
              className="h-full rounded-2xl bg-dark-card flex flex-col overflow-hidden"
              style={{ border: '1.5px dashed rgba(249,115,22,0.4)' }}
            >
              <div className="relative flex-1 min-h-0">
                <Image
                  src="/assets/RahulLA.png"
                  alt="Rahul Baweja"
                  fill
                  priority
                  style={{ objectFit: 'cover', objectPosition: 'top center' }}
                />
              </div>

              <div className="shrink-0 p-4 border-t border-dark-border">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold text-sm" style={{ color: 'var(--c-text)' }}>Rahul Baweja</p>
                    <p className="text-[10px] font-mono text-text-subtle mt-0.5 uppercase tracking-wider">
                      CS Student · ASU
                    </p>
                  </div>
                  <span className="flex items-center gap-1.5 text-[10px] font-mono text-green-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Open
                  </span>
                </div>

                <div className="h-4 mb-3">
                  <p
                    className="text-[11px] font-mono text-text-muted truncate transition-all duration-300"
                    style={{ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(-3px)' }}
                  >
                    &gt; I&apos;m {roles[ri]}<span className="animate-blink ml-0.5 text-accent">_</span>
                  </p>
                </div>

                <div className="flex gap-4">
                  <a href="https://github.com/rahulbaweja7" target="_blank" rel="noopener noreferrer"
                    className="text-text-subtle hover:text-text-primary transition-colors"><FaGithub size={15} /></a>
                  <a href="https://www.linkedin.com/in/rahulbaweja-/" target="_blank" rel="noopener noreferrer"
                    className="text-text-subtle hover:text-text-primary transition-colors"><FaLinkedinIn size={14} /></a>
                  <a href="mailto:rbaweja1@asu.edu"
                    className="text-text-subtle hover:text-text-primary transition-colors"><AiOutlineMail size={15} /></a>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right content ─────────────────────── */}
          <div className="flex-1 flex flex-col min-w-0 h-full gap-4">

            {/* Title */}
            <div className="shrink-0">
              <div
                className="font-black uppercase leading-[0.88] tracking-tight select-none mb-4"
                style={{ fontSize: 'clamp(60px, 6.2vw, 104px)' }}
              >
                <ScrambleText text="FULL-STACK" as="div" style={{ color: 'var(--c-text)' }} />
                <div style={{ color: 'var(--c-ghost)' }}>ENGINEER.</div>
              </div>
              <p className="text-text-muted text-sm leading-relaxed max-w-lg">
                CS student at Arizona State. Building scalable web apps, shipping real code,
                winning hackathons. Incoming SWE intern at{' '}
                <span className="font-medium" style={{ color: 'var(--c-text)' }}>Microsoft</span>.
              </p>
            </div>

            {/* Stats */}
            <div className="shrink-0 grid grid-cols-4 gap-4 py-4 border-y border-dark-border">
              {stats.map((s, i) => (
                <div key={i}>
                  <p className="font-bold mb-1" style={{ fontSize: 'clamp(22px, 2.4vw, 38px)', color: 'var(--c-text)' }}>
                    {s.num}
                  </p>
                  <p className="text-xs font-mono text-text-subtle uppercase tracking-widest leading-tight">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Tiles — flex-1 fills the rest */}
            <div className="flex-1 flex flex-col gap-3 min-h-0">
              <div className="flex-1 grid grid-cols-2 gap-3 min-h-0">
                <Link
                  href="/projects"
                  className="bg-accent hover:bg-orange-400 transition-colors duration-200 rounded-xl p-5 flex flex-col justify-between group"
                >
                  <p className="text-[10px] font-mono uppercase tracking-widest" style={{ color: 'rgba(15,15,15,0.6)' }}>Portfolio</p>
                  <div className="flex items-end justify-between">
                    <p className="font-black text-lg uppercase leading-tight" style={{ color: '#0f0f0f' }}>View My<br />Work</p>
                    <span className="text-2xl group-hover:translate-x-1.5 transition-transform duration-200" style={{ color: '#0f0f0f' }}>→</span>
                  </div>
                </Link>

                <Link
                  href="/about"
                  className="bg-dark-card border border-dark-border hover:border-[#3a3a3a] transition-colors rounded-xl p-5 flex flex-col justify-between group"
                >
                  <p className="text-[10px] font-mono text-text-subtle uppercase tracking-widest">Background</p>
                  <div className="flex items-end justify-between">
                    <p className="font-black text-lg uppercase leading-tight" style={{ color: 'var(--c-text)' }}>About<br />Me</p>
                    <span className="text-text-subtle text-2xl group-hover:translate-x-1.5 transition-all duration-200" style={{ color: 'var(--c-subtle)' }}>→</span>
                  </div>
                </Link>
              </div>

              {/* Resume Match CTA */}
              <Link
                href="/resume-match"
                className="shrink-0 rounded-xl p-5 flex items-center justify-between group transition-all duration-200"
                style={{
                  background: 'linear-gradient(135deg, rgba(249,115,22,0.18) 0%, rgba(249,115,22,0.06) 100%)',
                  border: '1px solid rgba(249,115,22,0.4)',
                  minHeight: 80,
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg shrink-0 text-xl"
                    style={{ background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.3)' }}>
                    🎯
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-accent uppercase tracking-widest leading-none mb-1">For Recruiters</p>
                    <p className="font-black text-base uppercase" style={{ color: 'var(--c-text)' }}>Resume Match Checker</p>
                    <p className="text-[11px] font-mono mt-0.5" style={{ color: 'var(--c-muted)' }}>spoiler: it&apos;s always a match</p>
                  </div>
                </div>
                <span className="text-accent text-2xl font-bold group-hover:translate-x-1.5 transition-transform duration-200 shrink-0">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ══ MOBILE ══ */}
      <div className="lg:hidden px-4 pt-24 pb-10 space-y-4">
        <div className="rounded-2xl bg-dark-card overflow-hidden"
          style={{ border: '1.5px dashed rgba(249,115,22,0.4)' }}>
          <div className="relative h-52">
            <Image src="/assets/RahulLA.png" alt="Rahul" fill priority
              style={{ objectFit: 'cover', objectPosition: 'top' }} />
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between mb-1">
              <p className="font-semibold text-sm" style={{ color: 'var(--c-text)' }}>Rahul Baweja</p>
              <span className="flex items-center gap-1.5 text-[10px] font-mono text-green-400">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> Open
              </span>
            </div>
            <p className="text-[10px] font-mono text-text-subtle uppercase tracking-wider mb-3">CS Student · ASU</p>
            <div className="flex gap-4">
              <a href="https://github.com/rahulbaweja7" target="_blank" rel="noopener noreferrer"
                className="text-text-subtle hover:text-text-primary transition-colors"><FaGithub size={16} /></a>
              <a href="https://www.linkedin.com/in/rahulbaweja-/" target="_blank" rel="noopener noreferrer"
                className="text-text-subtle hover:text-text-primary transition-colors"><FaLinkedinIn size={15} /></a>
              <a href="mailto:rbaweja1@asu.edu"
                className="text-text-subtle hover:text-text-primary transition-colors"><AiOutlineMail size={16} /></a>
            </div>
          </div>
        </div>

        <div className="font-black uppercase leading-[0.88] select-none"
          style={{ fontSize: 'clamp(48px, 13vw, 72px)' }}>
          <ScrambleText text="FULL-STACK" as="div" style={{ color: 'var(--c-text)' }} />
          <div style={{ color: 'var(--c-ghost)' }}>ENGINEER.</div>
        </div>

        <p className="text-text-muted text-sm leading-relaxed">
          CS student at Arizona State. Building apps, shipping code, winning hackathons.
        </p>

        <div className="grid grid-cols-2 gap-3">
          {stats.map((s, i) => (
            <div key={i} className="bg-dark-card border border-dark-border rounded-xl p-4">
              <p className="text-2xl font-bold" style={{ color: 'var(--c-text)' }}>{s.num}</p>
              <p className="text-[10px] font-mono text-text-subtle uppercase tracking-widest mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Link href="/projects" className="bg-accent rounded-xl p-4 flex items-center justify-between hover:bg-orange-400 transition-colors">
            <p className="font-black uppercase text-sm" style={{ color: '#0f0f0f' }}>View Work</p>
            <span style={{ color: '#0f0f0f' }}>→</span>
          </Link>
          <Link href="/about" className="bg-dark-card border border-dark-border rounded-xl p-4 flex items-center justify-between">
            <p className="font-black uppercase text-sm" style={{ color: 'var(--c-text)' }}>About Me</p>
            <span style={{ color: 'var(--c-subtle)' }}>→</span>
          </Link>
        </div>

        <Link
          href="/resume-match"
          className="rounded-xl p-4 flex items-center justify-between group"
          style={{
            background: 'linear-gradient(135deg, rgba(249,115,22,0.18) 0%, rgba(249,115,22,0.06) 100%)',
            border: '1px solid rgba(249,115,22,0.4)',
          }}
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg shrink-0"
              style={{ background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.3)' }}>
              🎯
            </div>
            <div>
              <p className="text-[9px] font-mono text-accent uppercase tracking-widest leading-none mb-0.5">For Recruiters</p>
              <p className="font-black text-sm uppercase" style={{ color: 'var(--c-text)' }}>Resume Match Checker</p>
              <p className="text-[10px] font-mono mt-0.5" style={{ color: 'var(--c-muted)' }}>spoiler: it&apos;s always a match</p>
            </div>
          </div>
          <span className="text-accent text-xl font-bold group-hover:translate-x-1 transition-transform duration-200 shrink-0">→</span>
        </Link>
      </div>
    </div>
  );
}
