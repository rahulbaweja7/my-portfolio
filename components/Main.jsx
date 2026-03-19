import Navbar from '@/components/Navbar';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';
import Link from 'next/link';

const roles = [
  "I build cool web apps.",
  "I'm a football fanatic.",
  "I debug at 2am (happily).",
  "I chase cricket scores.",
  "I game when I'm not coding.",
  "I build things people actually use.",
];

const stats = [
  { key: 'next role',  value: 'Microsoft',  accent: true },
  { key: 'gpa',        value: '3.72',        accent: false },
  { key: 'hackathon',  value: '1st place',   accent: false },
  { key: 'degree',     value: 'CS @ ASU',    accent: false },
];

const Main = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setVisible(true);
      }, 350);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-dark">
      <Navbar />

      <div className="relative z-10 max-w-5xl mx-auto px-6 min-h-screen flex items-center">
        <div className="w-full grid lg:grid-cols-[1fr_280px] gap-14 xl:gap-20 items-center py-24">

          {/* ── Left: text ── */}
          <div>
            <div
              className="inline-flex items-center gap-2 mb-10 animate-fade-in-up"
              style={{ opacity: 0, animationFillMode: 'forwards' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span className="text-xs font-mono text-text-muted tracking-widest uppercase">
                Incoming SWE Intern @ Microsoft
              </span>
            </div>

            <h1
              className="text-[64px] sm:text-7xl md:text-[80px] font-light text-[#efefef] tracking-tight leading-[1.04] mb-7 animate-fade-in-up delay-100"
              style={{ opacity: 0, animationFillMode: 'forwards' }}
            >
              Rahul<br />Baweja<span className="text-accent">.</span>
            </h1>

            <p
              className="text-text-muted text-base sm:text-lg max-w-md leading-relaxed mb-3 animate-fade-in-up delay-200"
              style={{ opacity: 0, animationFillMode: 'forwards' }}
            >
              CS student at Arizona State. Building full-stack apps, shipping real code, winning hackathons.
            </p>

            <div
              className="h-6 mb-10 animate-fade-in-up delay-300"
              style={{ opacity: 0, animationFillMode: 'forwards' }}
            >
              <p
                className="text-sm font-mono text-text-subtle transition-all duration-300"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(-5px)',
                }}
              >
                &gt; {roles[roleIndex]}<span className="animate-blink ml-0.5">_</span>
              </p>
            </div>

            <div
              className="flex flex-wrap gap-3 mb-10 animate-fade-in-up delay-500"
              style={{ opacity: 0, animationFillMode: 'forwards' }}
            >
              <Link
                href="/projects"
                className="px-5 py-2.5 text-sm font-medium text-dark bg-accent hover:bg-orange-400 transition-colors duration-200 rounded"
              >
                View Work
              </Link>
              <Link
                href="/contact"
                className="px-5 py-2.5 text-sm font-medium text-text-muted border border-dark-border hover:border-[#3a3a3a] hover:text-[#efefef] transition-all duration-200 rounded"
              >
                Get In Touch
              </Link>
            </div>

            <div
              className="flex items-center gap-5 animate-fade-in-up delay-700"
              style={{ opacity: 0, animationFillMode: 'forwards' }}
            >
              <a
                href="https://www.linkedin.com/in/rahulbaweja-/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-subtle hover:text-[#efefef] transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={17} />
              </a>
              <a
                href="https://github.com/rahulbaweja7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-subtle hover:text-[#efefef] transition-colors duration-200"
                aria-label="GitHub"
              >
                <FaGithub size={17} />
              </a>
              <a
                href="mailto:rbaweja1@asu.edu"
                className="text-text-subtle hover:text-[#efefef] transition-colors duration-200"
                aria-label="Email"
              >
                <AiOutlineMail size={18} />
              </a>
            </div>
          </div>

          {/* ── Right: photo + stats ── */}
          <div
            className="hidden lg:flex flex-col gap-3 animate-fade-in-up delay-200"
            style={{ opacity: 0, animationFillMode: 'forwards' }}
          >
            <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden border border-dark-border">
              <Image
                src="/assets/RahulLA.png"
                alt="Rahul Baweja"
                fill
                style={{ objectFit: 'cover', objectPosition: 'top' }}
                priority
              />
            </div>

            {/* Key-value stats */}
            <div className="font-mono text-xs border border-dark-border rounded-lg overflow-hidden">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className={`flex justify-between px-3 py-2 ${
                    i < stats.length - 1 ? 'border-b border-dark-border' : ''
                  } bg-dark-card`}
                >
                  <span className="text-text-subtle">{s.key}</span>
                  <span className={s.accent ? 'text-accent' : 'text-[#efefef]'}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Main;
