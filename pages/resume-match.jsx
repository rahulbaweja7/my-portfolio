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
  const [score, setScore]     = useState(98.7);
  const [steps, setSteps]     = useState([]);
  const [activeIdx, setActiveIdx] = useState(-1);
  const cancelRef = useRef(false);

  const isReady = tab === 'paste' ? jd.trim().length > 0 : url.trim().length > 0;

  const runAnalysis = async () => {
    if (!isReady) return;
    cancelRef.current = false;
    setScore(parseFloat((96.5 + Math.random() * 3).toFixed(1)));
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

        {/* ── RESULT PHASE — Bloomberg Terminal ── */}
        {phase === 'result' && (
          <div className="animate-fade-in" style={{ opacity: 0, animationFillMode: 'forwards' }}>

            <div className="rounded-xl overflow-hidden" style={{ border: '1px solid #2a2a2a', fontFamily: 'ui-monospace, monospace' }}>

              {/* ── Orange header bar ── */}
              <div className="flex items-center justify-between px-4 py-2" style={{ background: '#f97316' }}>
                <div className="flex items-center gap-4">
                  <span className="font-black text-sm tracking-widest" style={{ color: '#0f0f0f' }}>RAHUL.DEV</span>
                  <span className="text-[10px] font-bold tracking-wider hidden sm:block" style={{ color: 'rgba(15,15,15,0.65)' }}>CANDIDATE SECURITIES · LIVE</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'rgba(15,15,15,0.5)' }} />
                  <span className="text-[10px] font-bold" style={{ color: 'rgba(15,15,15,0.65)' }}>MARKET OPEN</span>
                </div>
              </div>

              {/* ── Terminal body ── */}
              <div style={{ background: '#080808' }}>

                {/* Ticker row */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between px-6 pt-5 pb-5 gap-4"
                  style={{ borderBottom: '1px solid #161616' }}>
                  <div>
                    <p className="font-black text-xl tracking-wider mb-1" style={{ color: '#f97316' }}>RAHUL.DEV</p>
                    <p className="text-[11px] mb-3" style={{ color: '#444' }}>FULL-STACK ENGINEER · ARIZONA STATE UNIVERSITY · PHOENIX, AZ</p>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] px-2 py-0.5 font-bold rounded"
                        style={{ background: 'rgba(34,197,94,0.12)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.25)' }}>
                        ▲ STRONG BUY
                      </span>
                      <span className="text-[10px]" style={{ color: '#333' }}>12 analysts · 0 sell ratings · consensus: immediate hire</span>
                    </div>
                  </div>
                  <div className="sm:text-right shrink-0">
                    <div className="font-black leading-none mb-1" style={{ fontSize: 'clamp(52px, 10vw, 76px)', color: '#22c55e', letterSpacing: '-0.03em' }}>
                      <Counter target={score} delay={300} />
                    </div>
                    <p className="text-sm font-bold" style={{ color: '#22c55e' }}>▲ +∞%  ALL TIME HIGH</p>
                    <p className="text-[10px] mt-1" style={{ color: '#2a2a2a' }}>52W HIGH: {score} · 52W LOW: also {score}</p>
                  </div>
                </div>

                {/* Chart */}
                <div className="px-6 py-4" style={{ borderBottom: '1px solid #161616' }}>
                  <p className="text-[10px] mb-2" style={{ color: '#333' }}>
                    MATCH SCORE OVER TIME &nbsp;·&nbsp;
                    <span style={{ color: '#444' }}>1D</span> &nbsp;
                    <span style={{ color: '#444' }}>1W</span> &nbsp;
                    <span style={{ color: '#444' }}>1M</span> &nbsp;
                    <span style={{ color: '#f97316' }}>ALL</span>
                    <span style={{ color: '#333', marginLeft: 12 }}>(same chart either way)</span>
                  </p>
                  <div className="flex gap-2">
                    {/* Y-axis */}
                    <div className="flex flex-col justify-between pb-1 shrink-0" style={{ height: 90 }}>
                      {['100', '95', '90', '85', '80'].map(v => (
                        <span key={v} style={{ fontSize: 9, color: '#2a2a2a', lineHeight: 1 }}>{v}</span>
                      ))}
                    </div>
                    {/* SVG chart */}
                    <div className="flex-1">
                      <svg width="100%" height="90" viewBox="0 0 500 90" preserveAspectRatio="none">
                        {[18, 36, 54, 72].map(y => (
                          <line key={y} x1="0" y1={y} x2="500" y2={y} stroke="#111" strokeWidth="1" />
                        ))}
                        <path
                          d="M0,72 C25,70 45,65 75,60 S115,52 145,46 S185,38 215,32 S255,25 285,19 S325,13 355,9 S400,5 435,3 L500,1 L500,90 L0,90Z"
                          fill="rgba(34,197,94,0.07)"
                        />
                        <path
                          d="M0,72 C25,70 45,65 75,60 S115,52 145,46 S185,38 215,32 S255,25 285,19 S325,13 355,9 S400,5 435,3 L500,1"
                          stroke="#22c55e" strokeWidth="1.5" fill="none"
                          className="draw-chart"
                          style={{ strokeDasharray: 700, strokeDashoffset: 700 }}
                        />
                        <circle cx="500" cy="1" r="3" fill="#22c55e" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Two-col: analyst ratings + fundamentals */}
                <div className="grid grid-cols-1 sm:grid-cols-2" style={{ borderBottom: '1px solid #161616' }}>
                  <div className="px-6 py-4" style={{ borderBottom: '1px solid #161616', borderRight: '0px' }}>
                    <p className="text-[10px] font-bold tracking-widest mb-3" style={{ color: '#f97316' }}>ANALYST RATINGS</p>
                    {[
                      ['Goldman Sachs',     'STRONG BUY', '#22c55e'],
                      ['Morgan Stanley',    'STRONG BUY', '#22c55e'],
                      ['JPMorgan Chase',    'STRONG BUY', '#22c55e'],
                      ['Your Hiring Mgr',  '"just hire him"', '#f97316'],
                      ['Your Future CEO',  'approved ✓',  '#22c55e'],
                    ].map(([firm, rating, color]) => (
                      <div key={firm} className="flex items-center justify-between mb-2">
                        <span style={{ fontSize: 11, color: '#444' }}>{firm}</span>
                        <span style={{ fontSize: 11, fontWeight: 'bold', color }}>{rating}</span>
                      </div>
                    ))}
                  </div>
                  <div className="px-6 py-4" style={{ borderLeft: '1px solid #161616' }}>
                    <p className="text-[10px] font-bold tracking-widest mb-3" style={{ color: '#f97316' }}>FUNDAMENTALS</p>
                    {[
                      ['GPA',            '3.72 / 4.0'],
                      ['Hackathon',      '1st place'],
                      ['Internships',    '3 completed'],
                      ['Ships on',       'fridays (works)'],
                      ['Debug speed',    'attempt 848'],
                      ['Coffee / day',   '☕☕☕'],
                    ].map(([k, v]) => (
                      <div key={k} className="flex items-center justify-between mb-2">
                        <span style={{ fontSize: 11, color: '#444' }}>{k}</span>
                        <span style={{ fontSize: 11, color: '#888' }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order panel */}
                <div className="px-6 py-4 flex flex-wrap items-center gap-4" style={{ borderBottom: '1px solid #161616' }}>
                  <div>
                    <p className="text-[10px] mb-2" style={{ color: '#333' }}>ORDER TYPE: IMMEDIATE HIRE &nbsp;·&nbsp; QTY: 1 &nbsp;·&nbsp; PRICE: make an offer</p>
                    <div className="flex flex-wrap gap-2">
                      <a
                        href="mailto:rbaweja1@asu.edu"
                        className="flex items-center gap-2 px-5 py-2 font-black text-sm tracking-wider transition-opacity hover:opacity-90"
                        style={{ background: '#22c55e', color: '#000' }}
                      >
                        ▶ BUY &nbsp;(HIRE NOW)
                      </a>
                      <button disabled
                        className="px-5 py-2 font-bold text-sm tracking-wider"
                        style={{ background: '#0d0d0d', color: '#222', border: '1px solid #1a1a1a', cursor: 'not-allowed' }}>
                        ▼ SELL &nbsp;[UNAVAILABLE]
                      </button>
                      <button onClick={reset}
                        className="px-4 py-2 text-xs tracking-wider transition-colors"
                        style={{ background: 'transparent', color: '#333', border: '1px solid #1e1e1e' }}>
                        ↺ NEW SEARCH
                      </button>
                    </div>
                  </div>
                  <div className="ml-auto text-right">
                    <p style={{ fontSize: 10, color: '#2a2a2a' }}>MARKET CAP</p>
                    <p style={{ fontSize: 22, fontWeight: 900, color: '#f97316' }}>∞</p>
                  </div>
                </div>

                {/* News ticker */}
                <div className="overflow-hidden py-1.5" style={{ borderTop: '1px solid #111' }}>
                  <div className="ticker-scroll" style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                    {[
                      'RAHUL.DEV surges to all-time high following JD submission',
                      'BREAKING: algorithm refuses to consider other candidates',
                      'Analysts raise price target to ∞ citing "immaculate vibe"',
                      'Source: candidate deployed to prod on a Friday — it worked',
                      'Microsoft confirms intern "genuinely dangerous" in best way',
                      'Vibe check: 100/100 for third consecutive quarter',
                      'Risk disclosure: NOT hiring is the real risk here',
                    ].flatMap((item, i) => [
                      <span key={i} style={{ marginRight: 48, fontSize: 10, color: '#3a3a3a' }}>
                        <span style={{ color: '#f97316', marginRight: 8 }}>●</span>{item}
                      </span>,
                      <span key={`d${i}`} style={{ marginRight: 48, fontSize: 10, color: '#3a3a3a' }}>
                        <span style={{ color: '#f97316', marginRight: 8 }}>●</span>{item}
                      </span>,
                    ])}
                  </div>
                </div>

              </div>
            </div>

            <p className="text-center text-[10px] font-mono text-text-subtle opacity-25 mt-4">
              * past performance indicative of future results · this candidate only goes up
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
