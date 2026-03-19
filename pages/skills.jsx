import Head from 'next/head';
import Navbar from '@/components/Navbar';
import { useEffect, useRef, useState } from 'react';

/* ── Skill data ─────────────────────────────────────────────────── */
const SKILLS = {
  frontend:  [['React', 95], ['Next.js', 85], ['Tailwind CSS', 82], ['HTML · CSS', 90], ['Angular', 65], ['Material-UI', 68]],
  backend:   [['Node.js', 82], ['Express.js', 80], ['Spring Boot', 68], ['Flask', 65], ['REST APIs', 85], ['GraphQL', 60]],
  languages: [['JavaScript', 90], ['TypeScript', 78], ['Python', 75], ['Java', 70], ['C · C++', 55]],
  databases: [['MongoDB', 80], ['PostgreSQL', 70], ['MySQL', 68], ['DynamoDB', 55]],
  cloud:     [['AWS', 62], ['Azure', 58], ['Docker', 65], ['Git', 90]],
  learning:  [['Rust', 20], ['Go', 15], ['System Design', 35], ['Deep Learning', 25]],
};

const INTRO_CMDS = [
  { cmd: 'whoami',                   pre: 500  },
  { cmd: 'ls skills/',               pre: 350  },
  { cmd: 'cat skills/frontend.json', pre: 350  },
];

/* ── Command executor ───────────────────────────────────────────── */
function execute(raw) {
  const cmd = raw.trim();
  const lower = cmd.toLowerCase();

  if (lower === 'whoami') return [
    { k: 'out', text: 'rahulbaweja7  —  Full-Stack Engineer', color: '#efefef' },
    { k: 'out', text: 'CS @ Arizona State University  ·  Incoming SWE Intern @ Microsoft', color: '#808080' },
    { k: 'out', text: 'WiCS 2025 Hackathon Winner  ·  GPA 3.72  ·  3 Internships', color: '#484848' },
  ];

  if (lower === 'ls' || lower === 'ls skills/' || lower === 'ls skills') return [
    { k: 'ls', items: ['frontend/', 'backend/', 'languages/', 'databases/', 'cloud/', 'learning/'] },
  ];

  const catMatch = lower.match(/^cat skills\/(\w+)\.json$/);
  if (catMatch) {
    const cat = catMatch[1];
    if (!SKILLS[cat]) return [{ k: 'err', text: `cat: skills/${cat}.json: No such file or directory` }];
    return [{ k: 'skills', cat }];
  }

  if (lower === 'achievements' || lower === './achievements') return [
    { k: 'out', text: '[✓]  WiCS 2025 Hackathon — 1st Place', color: '#f97316' },
    { k: 'out', text: '[✓]  Microsoft SWE Intern  (Summer 2025)', color: '#efefef' },
    { k: 'out', text: '[✓]  GPA 3.72 · Arizona State University', color: '#efefef' },
    { k: 'out', text: '[✓]  3 Internships · 4+ Projects shipped', color: '#efefef' },
    { k: 'out', text: '[~]  Football · Cricket · Gaming', color: '#484848' },
    { k: 'out', text: '[~]  Debugging at 2AM (consistently)', color: '#484848' },
  ];

  if (lower === 'help') return [
    { k: 'out', text: 'AVAILABLE COMMANDS', color: '#efefef' },
    { k: 'out', text: '  whoami                       identity & status', color: '#484848' },
    { k: 'out', text: '  ls skills/                   list categories', color: '#484848' },
    { k: 'out', text: '  cat skills/<name>.json       view proficiency', color: '#484848' },
    { k: 'out', text: '    → frontend  backend  languages  databases  cloud  learning', color: '#2a2a2a' },
    { k: 'out', text: '  achievements                 unlocked achievements', color: '#484848' },
    { k: 'out', text: '  clear                        clear terminal', color: '#484848' },
  ];

  if (lower === 'clear') return [{ k: 'clear' }];
  if (!cmd) return [];

  return [{ k: 'err', text: `zsh: command not found: ${cmd}` }];
}

/* ── Skill bar component ────────────────────────────────────────── */
function SkillBar({ pct, muted }) {
  const filled = Math.round(pct / 5);
  const empty  = 20 - filled;
  return (
    <span>
      <span style={{ color: muted ? '#2a2a2a' : '#f97316' }}>{'█'.repeat(filled)}</span>
      <span style={{ color: '#1e1e1e' }}>{'░'.repeat(empty)}</span>
      <span style={{ color: muted ? '#2a2a2a' : '#484848' }}> {pct}%</span>
    </span>
  );
}

/* ── Line renderer ──────────────────────────────────────────────── */
const HOST = 'rahul@portfolio';
const DIR  = '~';

function Prompt({ text }) {
  return (
    <div className="flex flex-wrap font-mono text-sm leading-7">
      <span style={{ color: '#22c55e' }}>{HOST}</span>
      <span style={{ color: '#484848' }}>:</span>
      <span style={{ color: '#7aa2c8' }}>{DIR}</span>
      <span style={{ color: '#808080' }}>&nbsp;%&nbsp;</span>
      <span style={{ color: 'var(--c-text)' }}>{text}</span>
    </div>
  );
}

function Line({ line }) {
  if (line.k === 'blank') return <div className="h-2" />;

  if (line.k === 'cmd') return <Prompt text={line.text} />;

  if (line.k === 'out') return (
    <div className="font-mono text-sm leading-6 pl-0" style={{ color: line.color || '#808080' }}>
      {line.text}
    </div>
  );

  if (line.k === 'err') return (
    <div className="font-mono text-sm leading-6 text-red-400">{line.text}</div>
  );

  if (line.k === 'ls') return (
    <div className="font-mono text-sm leading-7 flex flex-wrap gap-x-6">
      {line.items.map((item, i) => (
        <span key={i} style={{ color: '#7aa2c8' }}>{item}</span>
      ))}
    </div>
  );

  if (line.k === 'skills') {
    const items  = SKILLS[line.cat];
    const muted  = line.cat === 'learning';
    const maxLen = Math.max(...items.map(([n]) => n.length));
    return (
      <div className="font-mono text-sm leading-7">
        <div style={{ color: '#484848' }}>{'{'}</div>
        {items.map(([name, pct], i) => (
          <div key={i} className="pl-4 flex items-baseline">
            <span
              style={{
                color: '#22c55e',
                display: 'inline-block',
                width: `${maxLen + 2}ch`,
                flexShrink: 0,
              }}
            >
              &quot;{name}&quot;
            </span>
            <span style={{ color: '#484848' }}>:&nbsp;&quot;</span>
            <SkillBar pct={pct} muted={muted} />
            <span style={{ color: '#484848' }}>&quot;{i < items.length - 1 ? ',' : ''}</span>
          </div>
        ))}
        <div style={{ color: '#484848' }}>{'}'}</div>
      </div>
    );
  }

  return null;
}

/* ── Page ───────────────────────────────────────────────────────── */
export default function Skills() {
  const [lines,          setLines]          = useState([]);
  const [typingText,     setTypingText]     = useState('');
  const [introComplete,  setIntroComplete]  = useState(false);
  const [userInput,      setUserInput]      = useState('');
  const [cmdHistory,     setCmdHistory]     = useState([]);
  const [histIdx,        setHistIdx]        = useState(-1);

  const termRef  = useRef(null);
  const inputRef = useRef(null);

  /* auto-scroll */
  useEffect(() => {
    if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight;
  }, [lines, typingText, userInput]);

  /* intro sequence */
  useEffect(() => {
    let dead = false;
    const sleep = ms => new Promise(r => setTimeout(r, ms));

    async function typeCmd(text) {
      for (let i = 1; i <= text.length; i++) {
        if (dead) return;
        setTypingText(text.slice(0, i));
        await sleep(46 + Math.random() * 28);
      }
    }

    (async () => {
      await sleep(600);
      for (const { cmd, pre } of INTRO_CMDS) {
        if (dead) return;
        await sleep(pre);
        await typeCmd(cmd);
        if (dead) return;
        await sleep(140);
        setTypingText('');
        const out = execute(cmd);
        setLines(prev => [...prev, { k: 'cmd', text: cmd }, ...out, { k: 'blank' }]);
        await sleep(180);
      }
      if (!dead) setIntroComplete(true);
    })();

    return () => { dead = true; };
  }, []);

  /* submit */
  const submit = () => {
    const cmd = userInput;
    const out = execute(cmd);
    if (out.length === 1 && out[0].k === 'clear') {
      setLines([]);
    } else {
      setLines(prev => [...prev, { k: 'cmd', text: cmd }, ...out, { k: 'blank' }]);
    }
    if (cmd.trim()) setCmdHistory(prev => [cmd, ...prev.slice(0, 49)]);
    setUserInput('');
    setHistIdx(-1);
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') { submit(); return; }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(histIdx + 1, cmdHistory.length - 1);
      setHistIdx(next);
      setUserInput(cmdHistory[next] ?? '');
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setUserInput(next < 0 ? '' : cmdHistory[next]);
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      const completions = ['cat skills/frontend.json', 'cat skills/backend.json', 'cat skills/languages.json', 'cat skills/databases.json', 'cat skills/cloud.json', 'cat skills/learning.json'];
      const match = completions.find(c => c.startsWith(userInput) && c !== userInput);
      if (match) setUserInput(match);
    }
  };

  const quickRun = cmd => {
    setUserInput(cmd);
    setTimeout(() => {
      const out = execute(cmd);
      setLines(prev => [...prev, { k: 'cmd', text: cmd }, ...out, { k: 'blank' }]);
      if (cmd.trim()) setCmdHistory(prev => [cmd, ...prev.slice(0, 49)]);
      setUserInput('');
    }, 0);
    inputRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-dark">
      <Head>
        <title>Skills | Rahul Baweja</title>
        <meta name="description" content="Skills and stack of Rahul Baweja" />
      </Head>
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 pt-28 pb-10">
        {/* Header */}
        <div
          className="mb-6 animate-fade-in-up"
          style={{ opacity: 0, animationFillMode: 'forwards' }}
        >
          <p className="text-[10px] font-mono text-text-subtle uppercase tracking-widest mb-2">
            Interactive terminal
          </p>
          <h1 className="text-4xl sm:text-5xl font-black uppercase leading-none" style={{ color: 'var(--c-text)' }}>
            Skill<span style={{ color: 'var(--c-ghost)' }}>s.</span>
          </h1>
        </div>

        {/* Terminal window */}
        <div
          className="rounded-xl overflow-hidden border border-dark-border animate-fade-in-up delay-100 cursor-text"
          style={{ opacity: 0, animationFillMode: 'forwards' }}
          onClick={() => introComplete && inputRef.current?.focus()}
        >
          {/* Chrome bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-dark-border select-none" style={{ background: 'var(--c-card-alt)' }}>
            <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
            <span className="w-3 h-3 rounded-full" style={{ background: '#ffbd2e' }} />
            <span className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
            <span className="ml-3 text-[11px] font-mono text-text-subtle">
              skills.zsh — {HOST}
            </span>
            <span className="ml-auto text-[10px] font-mono text-text-subtle opacity-40">80×24</span>
          </div>

          {/* Body */}
          <div
            ref={termRef}
            className="px-5 py-4 overflow-y-auto"
            style={{ background: 'var(--c-deep)', height: 'min(calc(100vh - 280px), 520px)', minHeight: 380 }}
          >
            {/* Welcome */}
            <div className="font-mono text-[11px] text-text-subtle mb-4 leading-5 select-none">
              Last login: {new Date().toDateString()} on ttys001
              <br />
              Type <span className="text-accent">help</span> to see all commands.
              &nbsp;<span className="opacity-40">Tab to autocomplete.</span>
            </div>

            {/* History */}
            {lines.map((line, i) => <Line key={i} line={line} />)}

            {/* Typing indicator (intro) */}
            {!introComplete && (
              <div className="flex items-center font-mono text-sm leading-7">
                <span style={{ color: '#22c55e' }}>{HOST}</span>
                <span style={{ color: '#484848' }}>:</span>
                <span style={{ color: '#7aa2c8' }}>{DIR}</span>
                <span style={{ color: '#808080' }}>&nbsp;%&nbsp;</span>
                <span style={{ color: 'var(--c-text)' }}>{typingText}</span>
                <span className="animate-blink" style={{ color: '#f97316' }}>▋</span>
              </div>
            )}

            {/* Interactive prompt */}
            {introComplete && (
              <div className="flex items-center font-mono text-sm leading-7">
                <span style={{ color: '#22c55e' }}>{HOST}</span>
                <span style={{ color: '#484848' }}>:</span>
                <span style={{ color: '#7aa2c8' }}>{DIR}</span>
                <span style={{ color: '#808080' }}>&nbsp;%&nbsp;</span>
                <span style={{ color: 'var(--c-text)' }}>{userInput}</span>
                <span className="animate-blink" style={{ color: '#f97316' }}>▋</span>
                <input
                  ref={inputRef}
                  value={userInput}
                  onChange={e => { setUserInput(e.target.value); setHistIdx(-1); }}
                  onKeyDown={handleKeyDown}
                  autoFocus
                  spellCheck={false}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  style={{ position: 'fixed', top: -200, left: -200, opacity: 0, width: 1, height: 1 }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Quick-run hints */}
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
          <span className="text-text-subtle text-[11px] font-mono">try →</span>
          {[
            'cat skills/backend.json',
            'cat skills/languages.json',
            'achievements',
            'help',
            'clear',
          ].map(cmd => (
            <button
              key={cmd}
              onClick={() => quickRun(cmd)}
              className="text-[11px] font-mono text-accent hover:text-orange-400 transition-colors duration-150"
            >
              {cmd}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
