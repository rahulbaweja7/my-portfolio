import React from 'react';
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
    desc: 'Build scalable frontend features with TypeScript + React, designing reusable components and integrating REST APIs.',
  },
  {
    period: 'May 2025 – Aug 2025',
    role: 'Software Engineer Intern',
    company: 'IDX Exchange',
    location: 'Boise, ID',
    desc: 'Led a team of 4 to build a real estate search platform. Integrated CoreLogic API, reducing query latency by 40%. Built auth for 1,000+ users.',
  },
  {
    period: 'Aug 2023 – May 2024',
    role: 'Teaching Assistant',
    company: 'Arizona State University',
    location: 'Tempe, AZ',
    desc: 'TA for Intro to Java over 2 semesters. Mentored 100+ students, facilitated 30+ discussion sessions on DSA and debugging.',
  },
  {
    period: 'May 2023 – Aug 2023',
    role: 'Software Engineer Intern',
    company: 'Eazy2Biz',
    location: 'Remote',
    desc: 'Reduced frontend bugs by 25% with reusable TypeScript/React components. Built PDF-sharing via WhatsApp API, improved onboarding speed by 60%.',
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-dark">
      <Head>
        <title>About | Rahul Baweja</title>
      </Head>
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 pt-28 pb-20">

        {/* Hero row */}
        <div className="grid md:grid-cols-[1fr_280px] gap-16 items-start mb-20">

          {/* Text */}
          <div
            className="animate-fade-in-up"
            style={{ opacity: 0, animationFillMode: 'forwards' }}
          >
            <h1 className="text-4xl sm:text-5xl font-light text-[#efefef] mb-6 leading-tight">
              CS student.<br />Builder.<br />Night owl<span className="text-accent">.</span>
            </h1>

            <p className="text-text-muted text-base leading-relaxed mb-4">
              I&apos;m <span className="text-[#efefef]">Rahul Baweja</span>, studying CS at{' '}
              <span className="text-[#efefef]">Arizona State University</span> (4+1 BS/MS).
              GPA 3.72, Dean&apos;s List, incoming{' '}
              <span className="text-accent font-medium">SWE Intern at Microsoft</span>.
            </p>
            <p className="text-text-muted text-base leading-relaxed mb-4">
              I build full-stack apps — clean UIs, solid backends, AI where it makes sense.
              I&apos;ve shipped production code, won a hackathon, and TA&apos;d 100+ students through Java.
            </p>
            <p className="text-text-muted text-base leading-relaxed">
              Off the keyboard: NFL, cricket, gaming, and an unhealthy amount of coffee.
            </p>

            {/* Social links */}
            <div className="flex gap-3 mt-8">
              <a
                href="https://www.linkedin.com/in/rahulbaweja-/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 card rounded text-sm text-text-muted hover:text-[#efefef] hover:border-[#3a3a3a] transition-all duration-200 border border-dark-border"
              >
                <FaLinkedinIn size={14} /> LinkedIn
              </a>
              <a
                href="https://github.com/rahulbaweja7"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 card rounded text-sm text-text-muted hover:text-[#efefef] hover:border-[#3a3a3a] transition-all duration-200 border border-dark-border"
              >
                <FaGithub size={14} /> GitHub
              </a>
              <a
                href="mailto:rbaweja1@asu.edu"
                className="flex items-center gap-2 px-4 py-2 card rounded text-sm text-text-muted hover:text-[#efefef] hover:border-[#3a3a3a] transition-all duration-200 border border-dark-border"
              >
                <AiOutlineMail size={15} /> Email
              </a>
            </div>
          </div>

          {/* Photo + quick stats */}
          <div
            className="animate-fade-in-up delay-200"
            style={{ opacity: 0, animationFillMode: 'forwards' }}
          >
            <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-dark-border mb-5">
              <Image
                src="/assets/RahulLA.png"
                alt="Rahul Baweja"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="space-y-2 text-sm font-mono">
              <div className="flex justify-between text-text-subtle border-b border-dark-border pb-2">
                <span>GPA</span><span className="text-[#efefef]">3.72</span>
              </div>
              <div className="flex justify-between text-text-subtle border-b border-dark-border pb-2">
                <span>Hackathon</span><span className="text-accent">1st place</span>
              </div>
              <div className="flex justify-between text-text-subtle border-b border-dark-border pb-2">
                <span>Scholarship</span><span className="text-[#efefef]">$14,500/yr</span>
              </div>
              <div className="flex justify-between text-text-subtle">
                <span>Next role</span><span className="text-[#efefef]">Microsoft</span>
              </div>
            </div>
          </div>
        </div>

        {/* Experience */}
        <section>
          <h2 className="text-2xl font-light text-[#efefef] mb-8 pb-3 border-b border-dark-border">
            Experience
          </h2>
          <div className="space-y-6">
            {timeline.map((item, i) => (
              <div
                key={i}
                className="card-interactive rounded-lg p-5 animate-fade-in-up"
                style={{ opacity: 0, animationFillMode: 'forwards', animationDelay: `${i * 0.08}s` }}
              >
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-[#efefef] font-medium">{item.role}</h3>
                    <p className="text-sm text-text-muted mt-0.5">
                      {item.company} <span className="text-text-subtle">·</span> {item.location}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-text-subtle whitespace-nowrap mt-0.5">
                    {item.period}
                  </span>
                </div>
                <p className="text-text-muted text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Outside code */}
        <section className="mt-16">
          <h2 className="text-2xl font-light text-[#efefef] mb-5 pb-3 border-b border-dark-border">
            Outside the code
          </h2>
          <p className="text-text-muted text-sm leading-relaxed max-w-2xl">
            NFL football, cricket, gaming, music, and too much coffee.
            I&apos;m most productive after 10pm — occupational hazard.
          </p>
        </section>
      </main>
    </div>
  );
};

export default About;
