import Head from 'next/head';
import Navbar from '@/components/Navbar';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const STEPS = [
  { ms: 400,  text: 'Parsing job description...'             },
  { ms: 750,  text: 'Extracting required skills...'          },
  { ms: 650,  text: 'Cross-referencing resume database...'   },
  { ms: 900,  text: 'Running compatibility matrix...'        },
  { ms: 600,  text: 'Calculating culture fit score...'       },
  { ms: 800,  text: 'Measuring vibe alignment...'            },
  { ms: 500,  text: 'Consulting the hiring algorithm...'     },
  { ms: 700,  text: 'Suppressing all negative findings...'   },
  { ms: 550,  text: 'Generating strongly positive report...' },
  { ms: 400,  text: 'Finalizing recommendation...'           },
];

const CATEGORIES = [
  { label: 'Technical Skills',   score: 99,  note: 'suspiciously good'     },
  { label: 'Problem Solving',    score: 98,  note: 'scarily effective'      },
  { label: 'Communication',      score: 97,  note: 'eloquent & caffeinated' },
  { label: 'Culture Fit',        score: 100, note: 'he vibes'               },
  { label: 'Growth Potential',   score: 99,  note: 'only goes up'           },
  { label: 'Vibe Check',         score: 100, note: 'immaculate'             },
];

const INSIGHTS = [
  "🧠  Candidate has shipped production code that didn't immediately catch fire.",
  "🏆  Won a hackathon. The judges had no choice.",
  "🌙  Peak productivity between 10pm–2am. Will ship features while you sleep.",
  "☕  Powered by an unhealthy amount of coffee. A feature, not a bug.",
  "📈  3.72 GPA at ASU. Clearly reads documentation.",
  "🤝  Incoming Microsoft intern. Your competitors already noticed.",
  "🔁  Debugged 847 issues. Found root cause on attempt 848.",
  "⚡  Once deployed to prod on a Friday. It worked.",
];

function ScoreBar({ score, delay }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setWidth(score), delay);
    return () => clearTimeout(t);
  }, [score, delay]);
  const color = score === 100 ? '#22c55e' : score >= 98 ? '#f97316' : '#7aa2c8';
  return (
    <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--c-border)' }}>
      <div
        className="h-full rounded-full"
        style={{ width: `${width}%`, background: color, transition: 'width 0.9s cubic-bezier(0.22,1,0.36,1)' }}
      />
    </div>
  );
}

function Counter({ target, delay }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => {
      let start = 0;
      const step = () => {
        start += 1.4;
        setVal(Math.min(Math.round(start * 10) / 10, target));
        if (start < target) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(t);
  }, [target, delay]);
  return <>{val.toFixed(1)}</>;
}

export default function ResumeMatch() {
  const [tab, setTab]         = useState('paste');   // paste | url
  const [jd, setJd]           = useState('');
  const [url, setUrl]         = useState('');
  const [phase, setPhase]     = useState('input');   // input | loading | result
  const [steps, setSteps]     = useState([]);
  const [activeIdx, setActiveIdx] = useState(-1);
  const cancelRef = useRef(false);

  const isReady = tab === 'paste' ? jd.trim().length > 0 : url.trim().length > 0;

  const runAnalysis = async () => {
    if (!isReady) return;
    cancelRef.current = false;
    setPhase('loading');
    setSteps([]);
    setActiveIdx(0);

    const sleep = ms => new Promise(r => setTimeout(r, ms));
    const steps = tab === 'url'
      ? [{ ms: 900, text: `Fetching job posting from ${url.replace(/https?:\/\//, '').split('/')[0]}...` }, ...STEPS]
      : STEPS;

    for (let i = 0; i < steps.length; i++) {
      if (cancelRef.current) return;
      setActiveIdx(i);
      await sleep(steps[i].ms);
      if (cancelRef.current) return;
      setSteps(prev => [...prev, steps[i].text]);
    }
    await sleep(400);
    if (!cancelRef.current) setPhase('result');
  };

  const reset = () => {
    cancelRef.current = true;
    setPhase('input');
    setSteps([]);
    setActiveIdx(-1);
    setJd('');
    setUrl('');
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--c-bg)' }}>
      <Head>
        <title>Resume Match | Rahul Baweja</title>
        <meta name="description" content="Paste a job description. The algorithm has already decided." />
      </Head>
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 pt-28 pb-24">

        {/* ── Header ── */}
        <div className="mb-10 animate-fade-in-up" style={{ opacity: 0, animationFillMode: 'forwards' }}>
          <p className="text-[10px] font-mono text-text-subtle uppercase tracking-widest mb-3">
            {'// totally unbiased analysis tool'}
          </p>
          <h1 className="text-5xl sm:text-6xl font-black uppercase leading-none mb-4" style={{ color: 'var(--c-text)' }}>
            Resume<span style={{ color: '#f97316' }}>.</span>
            <br />
            <span style={{ color: 'var(--c-ghost)' }}>Match();</span>
          </h1>
          <p className="text-text-muted text-sm leading-relaxed max-w-md">
            Paste a job description below. Our <span className="text-accent">100% objective</span> AI will
            determine — impartially — whether Rahul is the right fit.{' '}
            <span className="font-mono text-[11px] text-text-subtle">(spoiler: he is)</span>
          </p>
        </div>

        {/* ── INPUT PHASE ── */}
        {phase === 'input' && (
          <div className="animate-fade-in-up delay-100" style={{ opacity: 0, animationFillMode: 'forwards' }}>
            <div
              className="rounded-xl overflow-hidden border border-dark-border"
              style={{ background: 'var(--c-card)' }}
            >
              {/* chrome bar */}
              <div
                className="flex items-center gap-2 px-4 py-2.5 border-b border-dark-border"
                style={{ background: 'var(--c-card-alt)' }}
              >
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#ff5f57' }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#ffbd2e' }} />
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#28c840' }} />
                {/* tabs */}
                <div className="ml-4 flex gap-1">
                  {[{ id: 'paste', label: 'Paste JD' }, { id: 'url', label: 'Job URL' }].map(t => (
                    <button
                      key={t.id}
                      onClick={() => setTab(t.id)}
                      className="px-3 py-1 rounded text-[11px] font-mono transition-all duration-150"
                      style={{
                        background: tab === t.id ? 'rgba(249,115,22,0.15)' : 'transparent',
                        color: tab === t.id ? '#f97316' : 'var(--c-muted)',
                        border: tab === t.id ? '1px solid rgba(249,115,22,0.3)' : '1px solid transparent',
                      }}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
                <span className="ml-auto text-[11px] font-mono text-text-subtle">
                  {tab === 'paste' ? 'job_description.txt' : 'job_posting.url'}
                </span>
              </div>

              {tab === 'paste' ? (
                <textarea
                  value={jd}
                  onChange={e => setJd(e.target.value)}
                  placeholder={`Paste the job description here...\n\nExample:\n  "We're looking for a full-stack engineer with React, Node.js,\n   and strong problem-solving skills. Must be a team player..."`}
                  rows={10}
                  className="w-full resize-none outline-none font-mono text-sm leading-relaxed p-5"
                  style={{
                    background: 'var(--c-deep)',
                    color: 'var(--c-text)',
                    caretColor: '#f97316',
                    cursor: 'text',
                  }}
                  spellCheck={false}
                />
              ) : (
                <div className="p-5" style={{ background: 'var(--c-deep)', minHeight: 200 }}>
                  <p className="text-[11px] font-mono text-text-subtle mb-3">$ enter job posting url</p>
                  <div className="flex items-center gap-2 rounded-lg px-4 py-3"
                    style={{ background: 'var(--c-card)', border: '1px solid var(--c-border)' }}>
                    <span className="text-text-subtle font-mono text-sm shrink-0">🔗</span>
                    <input
                      type="url"
                      value={url}
                      onChange={e => setUrl(e.target.value)}
                      placeholder="https://jobs.lever.co/company/role-id"
                      className="flex-1 outline-none bg-transparent font-mono text-sm"
                      style={{ color: 'var(--c-text)', caretColor: '#f97316', cursor: 'text' }}
                      spellCheck={false}
                    />
                  </div>
                  <p className="text-[10px] font-mono text-text-subtle mt-3 opacity-60">
                    Works with LinkedIn, Lever, Greenhouse, Workday, Indeed — basically anywhere.
                  </p>
                </div>
              )}

              <div
                className="flex items-center justify-between px-5 py-3 border-t border-dark-border"
                style={{ background: 'var(--c-card-alt)' }}
              >
                <span className="text-[11px] font-mono text-text-subtle">
                  {tab === 'paste'
                    ? (jd.length > 0 ? `${jd.trim().split(/\s+/).length} words · ready to analyze` : 'waiting for input...')
                    : (url.length > 0 ? 'url ready · fetching job data...' : 'waiting for url...')}
                </span>
                <button
                  onClick={runAnalysis}
                  disabled={!isReady}
                  className="flex items-center gap-2 px-5 py-2 rounded-lg font-mono text-sm font-bold uppercase tracking-wide transition-all duration-200"
                  style={{
                    background: isReady ? '#f97316' : 'var(--c-border)',
                    color: isReady ? '#0f0f0f' : 'var(--c-subtle)',
                    cursor: isReady ? 'pointer' : 'not-allowed',
                  }}
                >
                  Run Analysis →
                </button>
              </div>
            </div>

            <p className="text-center text-[11px] font-mono text-text-subtle mt-4 opacity-50">
              ⚠ results may be heavily influenced by how great rahul is
            </p>
          </div>
        )}

        {/* ── LOADING PHASE ── */}
        {phase === 'loading' && (
          <div
            className="rounded-xl border border-dark-border overflow-hidden animate-fade-in"
            style={{ background: 'var(--c-card)', opacity: 0, animationFillMode: 'forwards' }}
          >
            {/* chrome bar */}
            <div
              className="flex items-center gap-2 px-4 py-2.5 border-b border-dark-border"
              style={{ background: 'var(--c-card-alt)' }}
            >
              <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: '#ffbd2e' }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#28c840' }} />
              <span className="ml-3 text-[11px] font-mono text-text-subtle">rahul_baweja_v2.exe — analyzing</span>
              <span className="ml-auto text-[10px] font-mono text-accent animate-pulse">● RUNNING</span>
            </div>

            <div className="p-6 font-mono text-sm space-y-2" style={{ minHeight: 320 }}>
              <p className="text-text-subtle text-[11px] mb-4">
                $ ./match --resume=rahul_baweja.pdf --jd=input.txt --bias=maximum
              </p>

              {steps.map((s, i) => (
                <div key={i} className="flex items-center gap-3 animate-fade-in" style={{ opacity: 0, animationFillMode: 'forwards' }}>
                  <span style={{ color: '#22c55e' }}>✓</span>
                  <span style={{ color: 'var(--c-muted)' }}>{s}</span>
                </div>
              ))}

              {activeIdx >= 0 && activeIdx === steps.length && (
                <div className="flex items-center gap-3">
                  <span className="animate-pulse" style={{ color: '#f97316' }}>▶</span>
                  <span style={{ color: 'var(--c-text)' }}>{STEPS[Math.min(activeIdx, STEPS.length - 1)]?.text}</span>
                  <span className="animate-blink" style={{ color: '#f97316' }}>▋</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── RESULT PHASE ── */}
        {phase === 'result' && (
          <div className="space-y-4 animate-fade-in-up" style={{ opacity: 0, animationFillMode: 'forwards' }}>

            {/* Score hero */}
            <div
              className="rounded-xl border p-8 text-center relative overflow-hidden"
              style={{ background: 'rgba(249,115,22,0.04)', borderColor: 'rgba(249,115,22,0.35)' }}
            >
              {/* bg glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(249,115,22,0.08) 0%, transparent 70%)' }}
              />

              <p className="text-[10px] font-mono text-accent uppercase tracking-widest mb-2">
                Analysis Complete · Confidence: 100%
              </p>

              <div className="font-black leading-none mb-2" style={{ fontSize: 'clamp(72px, 14vw, 120px)', color: '#f97316' }}>
                <Counter target={98.7} delay={200} />
                <span style={{ fontSize: '0.35em', color: 'var(--c-muted)' }}>%</span>
              </div>

              <p className="text-2xl font-black uppercase tracking-widest mb-3" style={{ color: 'var(--c-text)' }}>
                Match Confirmed
              </p>

              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-mono text-xs font-bold uppercase tracking-widest"
                style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', color: '#22c55e' }}
              >
                ✦ STRONG HIRE · DO NOT PASS ON THIS ONE
              </div>

              <p className="text-text-muted text-sm mt-4 max-w-sm mx-auto">
                Our algorithm analyzed <span className="text-accent font-mono">847</span> data points and
                reached a verdict in record time. The 1.3% gap is a rounding error.
              </p>
            </div>

            {/* Category breakdown */}
            <div
              className="rounded-xl border border-dark-border p-6"
              style={{ background: 'var(--c-card)' }}
            >
              <p className="text-[10px] font-mono text-text-subtle uppercase tracking-widest mb-5">
                {'// breakdown by category'}
              </p>
              <div className="space-y-3.5">
                {CATEGORIES.map((cat, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="text-xs font-mono w-36 shrink-0" style={{ color: 'var(--c-text)' }}>
                      {cat.label}
                    </span>
                    <ScoreBar score={cat.score} delay={300 + i * 120} />
                    <span className="text-xs font-mono w-6 text-right shrink-0" style={{ color: cat.score === 100 ? '#22c55e' : '#f97316' }}>
                      {cat.score}
                    </span>
                    <span className="text-[10px] font-mono text-text-subtle w-28 shrink-0 hidden sm:block">
                      {cat.note}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Insights */}
            <div
              className="rounded-xl border border-dark-border p-6"
              style={{ background: 'var(--c-card)' }}
            >
              <p className="text-[10px] font-mono text-text-subtle uppercase tracking-widest mb-4">
                {'// key insights from the algorithm'}
              </p>
              <div className="space-y-2.5">
                {INSIGHTS.map((ins, i) => (
                  <p key={i} className="text-sm font-mono leading-relaxed" style={{ color: 'var(--c-muted)', animationDelay: `${i * 0.05}s` }}>
                    {ins}
                  </p>
                ))}
              </div>
            </div>

            {/* Disclaimer + CTA */}
            <div
              className="rounded-xl border p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              style={{ background: 'var(--c-card-alt)', borderColor: 'var(--c-border)' }}
            >
              <div>
                <p className="text-[10px] font-mono text-text-subtle uppercase tracking-widest mb-1">
                  Recommendation
                </p>
                <p className="text-sm font-mono" style={{ color: 'var(--c-text)' }}>
                  Schedule the interview. You already know the outcome.
                </p>
              </div>
              <div className="flex gap-3 shrink-0">
                <a
                  href="mailto:rbaweja1@asu.edu"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase tracking-wide transition-all duration-200 hover:opacity-90"
                  style={{ background: '#f97316', color: '#0f0f0f' }}
                >
                  Hire Me →
                </a>
                <button
                  onClick={reset}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-wide border transition-all duration-200 hover:border-[#3a3a3a]"
                  style={{ borderColor: 'var(--c-border)', color: 'var(--c-muted)' }}
                >
                  Try Another JD
                </button>
              </div>
            </div>

            {/* fun footer note */}
            <p className="text-center text-[11px] font-mono text-text-subtle opacity-40 pt-2">
              * this tool is 100% satirical and 100% accurate. results are non-negotiable.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
