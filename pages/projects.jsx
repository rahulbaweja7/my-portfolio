import Head from 'next/head';
import Navbar from '@/components/Navbar';
import { FaGithub, FaExternalLinkAlt, FaTrophy } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';

/* ════════════════════════════════════════════════════════════════
   SERA — Interactive sexual health & relationship chatbot
   ════════════════════════════════════════════════════════════════ */

const SERA_RESPONSES = [
  {
    keywords: ['hello', 'hi', 'hey', 'start', 'help'],
    text: "Hi! I'm SERA 👋\nI'm a confidential sexual health & relationship assistant.\n\nAsk me about:\n• safe sex & contraception\n• STIs & testing\n• consent & boundaries\n• relationships & communication",
  },
  {
    keywords: ['sti', 'std', 'infection', 'testing', 'test', 'hiv', 'chlamydia', 'gonorrhea', 'herpes', 'syphilis'],
    text: "STI awareness is self-care.\n\n• Many STIs have no symptoms — get tested regularly\n• Common tests: HIV, chlamydia, gonorrhea, syphilis\n• Most STIs are fully treatable when caught early\n• Discuss status openly with partners\n\nYour health comes first 💙",
  },
  {
    keywords: ['condom', 'contraception', 'birth control', 'pill', 'protection', 'safe sex', 'iud', 'pregnancy prevention'],
    text: "Contraception options:\n\n01. Condoms — protect against STIs + pregnancy (use both!)\n02. The pill — 91–99% effective with consistent use\n03. IUD — low-maintenance, long-term option\n04. Emergency contraception — effective within 72hrs\n\nCondoms are the only method that protects against STIs.",
  },
  {
    keywords: ['consent', 'boundary', 'pressure', 'uncomfortable', 'forced', 'coerced', 'saying no'],
    text: "Consent is non-negotiable.\n\n• Must be enthusiastic, ongoing & freely given\n• Silence or hesitation is NOT consent\n• Consent can be withdrawn at any time\n• Boundaries are healthy and deserve respect\n\nIf you feel unsafe, please reach out to a trusted person or a local helpline 🤍",
  },
  {
    keywords: ['relationship', 'partner', 'dating', 'boyfriend', 'girlfriend', 'toxic', 'love', 'breakup', 'jealous'],
    text: "Healthy relationships are built on:\n\n01. Open, honest communication\n02. Mutual respect and trust\n03. Individual space and independence\n04. Consistent actions matching words\n\n🚩 Red flags: isolation, control, jealousy, pressure",
  },
  {
    keywords: ['communication', 'talk', 'difficult', 'awkward', 'conversation', 'bring up', 'discuss'],
    text: "Talking about sex can feel awkward — that's normal.\n\nTips:\n• Pick a calm, private moment\n• Use 'I feel...' statements\n• Ask open-ended questions\n• Listen without judgment\n\nGood communication = better intimacy and trust 💬",
  },
  {
    keywords: ['pregnant', 'pregnancy', 'period', 'cycle', 'ovulation', 'missed period'],
    text: "Reproductive health basics:\n\n• Average cycle: 21–35 days\n• Ovulation typically occurs mid-cycle\n• Pregnancy is most likely during the fertile window\n• A missed period can have many causes\n\nFor reliable guidance, always consult a healthcare provider.",
  },
  {
    keywords: ['orientation', 'sexuality', 'gay', 'lesbian', 'bisexual', 'queer', 'gender', 'identity', 'coming out'],
    text: "Your identity is valid 🏳️‍🌈\n\n• Sexual orientation and gender identity exist on a spectrum\n• There's no 'normal' — diversity is natural\n• Coming out is a personal journey with no timeline\n• Surround yourself with supportive people\n\nYou deserve to be loved for exactly who you are.",
  },
  {
    keywords: ['painful', 'pain', 'discomfort', 'hurts', 'bleeding'],
    text: "Pain during sex is not something to ignore.\n\n• Pain is your body signaling something is off\n• Causes can range from friction/lack of lubrication to medical conditions\n• Don't push through — stop and communicate\n• See a doctor if pain is recurring\n\nPlease consult a healthcare provider for medical concerns.",
  },
];

const SERA_DEFAULT =
  "Great question! I'm SERA — your confidential sexual health & relationship assistant.\n\nTry asking about:\n• safe sex & protection\n• STI testing\n• consent & boundaries\n• relationship communication";

function getSeraResponse(input) {
  const lower = input.toLowerCase();
  for (const { keywords, text } of SERA_RESPONSES) {
    if (keywords.some(k => lower.includes(k))) return text;
  }
  return SERA_DEFAULT;
}

function InteractiveSeraChat() {
  const [messages, setMessages] = useState([
    {
      from: 'sera',
      text: "Hi! I'm SERA 👋\nI'm your confidential sexual health & relationship assistant.\n\nAsk me anything — I'm a safe space.",
    },
  ]);
  const [input,   setInput]   = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef  = useRef(null);
  const demoRan    = useRef(false);
  const userTyped  = useRef(false);

  // auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // auto-demo: types a question after 1.4s so visitors see it's live
  useEffect(() => {
    if (demoRan.current) return;
    const ctl = { dead: false };
    const sleep = ms => new Promise(r => setTimeout(r, ms));

    (async () => {
      await sleep(1400);
      if (ctl.dead || userTyped.current) return;
      const demo = 'What is safe sex?';
      for (let i = 1; i <= demo.length; i++) {
        if (ctl.dead || userTyped.current) return;
        setInput(demo.slice(0, i));
        await sleep(52 + Math.random() * 28);
      }
      if (ctl.dead || userTyped.current) return;
      await sleep(400);
      setInput('');
      setMessages(prev => [...prev, { from: 'user', text: demo }]);
      setLoading(true);
      setTimeout(() => {
        if (ctl.dead) return;
        setMessages(prev => [...prev, { from: 'sera', text: getSeraResponse(demo) }]);
        setLoading(false);
        demoRan.current = true;
      }, 900);
    })();

    return () => { ctl.dead = true; };
  }, []);

  const send = () => {
    const text = input.trim();
    if (!text || loading) return;
    setMessages(prev => [...prev, { from: 'user', text }]);
    setInput('');
    setLoading(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { from: 'sera', text: getSeraResponse(text) }]);
      setLoading(false);
    }, 700 + Math.random() * 500);
  };

  return (
    <div
      className="h-full flex flex-col rounded-xl overflow-hidden border border-dark-border font-mono text-xs"
      style={{ background: 'var(--c-card-alt)' }}
    >
      {/* title bar */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-dark-border shrink-0" style={{ background: 'var(--c-deep)' }}>
        <span className="w-2.5 h-2.5 rounded-full bg-dark-border" />
        <span className="w-2.5 h-2.5 rounded-full bg-dark-border" />
        <span className="w-2.5 h-2.5 rounded-full bg-dark-border" />
        <span className="ml-3 text-text-subtle text-[10px]">SERA — AI Health Assistant</span>
        <span className="ml-auto flex items-center gap-1 text-[9px] font-mono text-green-400">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /> live
        </span>
      </div>

      {/* messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-2.5">
        {messages.map((msg, i) =>
          msg.from === 'sera' ? (
            <div key={i} className="flex gap-2 items-end">
              <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center text-accent text-[8px] shrink-0">S</div>
              <div className="rounded-2xl rounded-bl-sm px-3 py-2 max-w-[82%] border border-dark-border" style={{ background: 'var(--c-card)' }}>
                <p className="text-[10px] leading-relaxed whitespace-pre-line" style={{ color: 'var(--c-text)' }}>{msg.text}</p>
              </div>
            </div>
          ) : (
            <div key={i} className="flex justify-end">
              <div className="bg-accent/10 border border-accent/20 rounded-2xl rounded-br-sm px-3 py-2 max-w-[75%]">
                <p className="text-[10px] leading-relaxed" style={{ color: 'var(--c-text)' }}>{msg.text}</p>
              </div>
            </div>
          )
        )}
        {loading && (
          <div className="flex gap-2 items-end">
            <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center text-accent text-[8px] shrink-0">S</div>
            <div className="rounded-2xl rounded-bl-sm px-3 py-2 border border-dark-border" style={{ background: 'var(--c-card)' }}>
              <div className="flex gap-1 items-center h-3">
                <span className="w-1.5 h-1.5 rounded-full bg-text-subtle animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-text-subtle animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 rounded-full bg-text-subtle animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* input */}
      <div className="px-3 py-2.5 border-t border-dark-border flex gap-2 shrink-0">
        <input
          value={input}
          onChange={e => { userTyped.current = true; setInput(e.target.value); }}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); send(); } }}
          placeholder="Ask SERA anything…"
          className="flex-1 rounded-lg px-3 py-1.5 text-[10px] outline-none border border-dark-border focus:border-accent/50 transition-colors"
          style={{ background: 'var(--c-card)', color: 'var(--c-text)', caretColor: '#f97316', cursor: 'text' }}
          spellCheck={false}
          autoComplete="off"
        />
        <button
          onClick={send}
          disabled={loading || !input.trim()}
          className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent text-[10px] hover:bg-accent/20 transition-colors disabled:opacity-40"
          style={{ cursor: 'pointer' }}
        >↑</button>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   MACROBUDDY — Goal-based meal planner
   ════════════════════════════════════════════════════════════════ */

const MACRO_MEALS = {
  cut: {
    breakfast: [
      { name: 'Greek Yogurt Bowl',   cal: 320, p: 24, c: 38, f: 6  },
      { name: 'Egg White Omelette',  cal: 280, p: 28, c: 8,  f: 10 },
      { name: 'Overnight Oats',      cal: 350, p: 14, c: 52, f: 8  },
    ],
    lunch: [
      { name: 'Grilled Chicken Salad', cal: 420, p: 42, c: 22, f: 16 },
      { name: 'Tuna Lettuce Wrap',     cal: 380, p: 38, c: 18, f: 14 },
      { name: 'Turkey Rice Bowl',      cal: 400, p: 36, c: 40, f: 10 },
    ],
    dinner: [
      { name: 'Salmon + Veggies',  cal: 480, p: 44, c: 20, f: 24 },
      { name: 'Chicken Stir-Fry',  cal: 450, p: 40, c: 38, f: 12 },
      { name: 'Shrimp Zoodles',    cal: 360, p: 32, c: 22, f: 12 },
    ],
  },
  maintain: {
    breakfast: [
      { name: 'Avocado Toast + Eggs', cal: 480, p: 22, c: 42, f: 24 },
      { name: 'Smoothie Bowl',        cal: 450, p: 18, c: 68, f: 12 },
      { name: 'Bagel + Cream Cheese', cal: 520, p: 14, c: 72, f: 18 },
    ],
    lunch: [
      { name: 'Chicken Burrito Bowl',  cal: 560, p: 38, c: 62, f: 18 },
      { name: 'Grilled Chicken Sub',   cal: 540, p: 42, c: 58, f: 14 },
      { name: 'Caesar Wrap',           cal: 580, p: 34, c: 56, f: 22 },
    ],
    dinner: [
      { name: 'Pasta + Meatballs', cal: 640, p: 38, c: 78, f: 18 },
      { name: 'Steak + Potatoes',  cal: 680, p: 52, c: 48, f: 26 },
      { name: 'Salmon Rice Bowl',  cal: 620, p: 46, c: 58, f: 20 },
    ],
  },
  bulk: {
    breakfast: [
      { name: 'Protein Pancakes',  cal: 680, p: 52, c: 72, f: 16 },
      { name: 'Egg + Rice Bowl',   cal: 720, p: 48, c: 82, f: 18 },
      { name: 'PB Banana Oats',    cal: 650, p: 26, c: 88, f: 22 },
    ],
    lunch: [
      { name: 'Double Chicken Bowl', cal: 780, p: 68, c: 72, f: 20 },
      { name: 'Beef Burrito',        cal: 820, p: 52, c: 88, f: 24 },
      { name: 'Tuna Pasta',          cal: 760, p: 58, c: 82, f: 16 },
    ],
    dinner: [
      { name: '8oz Steak + Sides',  cal: 880, p: 74, c: 62, f: 32 },
      { name: 'Chicken + Pasta',    cal: 820, p: 68, c: 78, f: 20 },
      { name: 'Pulled Pork Rice',   cal: 840, p: 62, c: 86, f: 22 },
    ],
  },
};

const MACRO_TARGETS = {
  cut:      { cal: 1600, p: 160, c: 140, f: 44 },
  maintain: { cal: 2200, p: 165, c: 250, f: 65 },
  bulk:     { cal: 3000, p: 220, c: 340, f: 80 },
};

function InteractiveMacro() {
  const [goal, setGoal]       = useState('maintain');
  const [idxs, setIdxs]       = useState({ breakfast: 0, lunch: 0, dinner: 0 });

  const targets = MACRO_TARGETS[goal];

  const swap = slot =>
    setIdxs(prev => ({ ...prev, [slot]: (prev[slot] + 1) % MACRO_MEALS[goal][slot].length }));

  const meals = {
    breakfast: MACRO_MEALS[goal].breakfast[idxs.breakfast],
    lunch:     MACRO_MEALS[goal].lunch[idxs.lunch],
    dinner:    MACRO_MEALS[goal].dinner[idxs.dinner],
  };

  const totalCal = meals.breakfast.cal + meals.lunch.cal + meals.dinner.cal;
  const totP = meals.breakfast.p + meals.lunch.p + meals.dinner.p;
  const totC = meals.breakfast.c + meals.lunch.c + meals.dinner.c;
  const totF = meals.breakfast.f + meals.lunch.f + meals.dinner.f;

  const macros = [
    { label: 'P', color: '#f97316', val: totP, max: targets.p },
    { label: 'C', color: '#60a5fa', val: totC, max: targets.c },
    { label: 'F', color: '#a78bfa', val: totF, max: targets.f },
  ];

  return (
    <div className="rounded-xl border border-dark-border p-4 font-mono select-none" style={{ background: 'var(--c-card-alt)' }}>
      {/* Goal tabs */}
      <div className="flex gap-1.5 mb-2">
        {[['cut', 'Cut'], ['maintain', 'Maintain'], ['bulk', 'Bulk']].map(([key, label]) => (
          <button
            key={key}
            onClick={() => { setGoal(key); setIdxs({ breakfast: 0, lunch: 0, dinner: 0 }); }}
            className="flex-1 py-1 rounded text-[10px] uppercase tracking-wide transition-all duration-150"
            style={{
              background: goal === key ? '#f97316' : 'transparent',
              color: goal === key ? '#0f0f0f' : 'var(--c-subtle)',
              border: goal === key ? 'none' : '1px solid var(--c-border)',
              fontWeight: goal === key ? 700 : 400,
              cursor: 'pointer',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Calorie summary */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-[9px] text-text-subtle">Daily total</span>
        <span className="text-[11px] font-bold text-accent">{totalCal} / {targets.cal} kcal</span>
      </div>

      {/* Macro bars */}
      <div className="space-y-1 mb-2">
        {macros.map(({ label, color, val, max }) => (
          <div key={label} className="flex items-center gap-2">
            <span className="text-[9px] w-3 font-bold" style={{ color }}>{label}</span>
            <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--c-border)' }}>
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min((val / max) * 100, 100)}%`, background: color }}
              />
            </div>
            <span className="text-[9px] text-text-subtle w-12 text-right">{val}/{max}g</span>
          </div>
        ))}
      </div>

      {/* Meal list */}
      <div className="space-y-1">
        {Object.entries(meals).map(([slot, meal]) => (
          <div
            key={slot}
            className="flex items-center gap-2 rounded-lg px-2 py-1 border border-dark-border"
            style={{ background: 'var(--c-card)' }}
          >
            <div className="flex-1 min-w-0">
              <p className="text-[8px] text-text-subtle capitalize mb-0.5">{slot}</p>
              <p className="text-[10px] font-medium truncate" style={{ color: 'var(--c-text)' }}>{meal.name}</p>
            </div>
            <span className="text-[9px] text-text-subtle shrink-0">{meal.cal}cal</span>
            <button
              onClick={() => swap(slot)}
              className="text-accent text-sm leading-none hover:text-orange-400 transition-colors shrink-0"
              title="Swap meal"
              style={{ cursor: 'pointer' }}
            >↺</button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   QUIZMODORO — Interactive CS quiz
   ════════════════════════════════════════════════════════════════ */

const QUIZ_QS = [
  { q: "What does 'O' in SOLID stand for?",           opts: ['Open/Closed Principle', 'Object-Oriented', 'Overloading', 'Observable'],              ans: 0 },
  { q: 'Time complexity of binary search?',           opts: ['O(n)', 'O(n²)', 'O(log n)', 'O(1)'],                                                   ans: 2 },
  { q: 'What is a closure in JavaScript?',            opts: ['A loop construct', 'Function + outer scope ref', 'A CSS class', 'An async keyword'],    ans: 1 },
  { q: 'What does REST stand for?',                   opts: ['Representational State Transfer', 'Remote State Transport', 'Request Exchange Standard', 'Resource Extension Type'], ans: 0 },
  { q: 'What is memoization?',                        opts: ['Memory allocation', 'Type declaration', 'Caching function results', 'Recursive method'], ans: 2 },
  { q: 'Average time complexity of quicksort?',       opts: ['O(n log n)', 'O(n²)', 'O(log n)', 'O(n)'],                                              ans: 0 },
  { q: 'What is a Promise in JavaScript?',            opts: ['A sync callback', 'A type annotation', 'Object representing async op', 'A constructor'], ans: 2 },
  { q: 'What does DRY stand for in programming?',     opts: ["Don't Repeat Yourself", 'Dynamic Runtime Yield', 'Data Relay Yoke', 'Direct Request Yield'], ans: 0 },
  { q: 'What is a deadlock?',                         opts: ['A program crash', 'Two processes waiting on each other', 'Memory overflow', 'Infinite recursion'], ans: 1 },
  { q: 'What does SQL stand for?',                    opts: ['System Query Level', 'Structured Query Language', 'Standard Queue Logic', 'Sequential Query Link'], ans: 1 },
];

function InteractiveQuiz() {
  const [qi,       setQi]       = useState(0);
  const [selected, setSelected] = useState(null);
  const [score,    setScore]    = useState(0);
  const [done,     setDone]     = useState(false);

  const q        = QUIZ_QS[qi];
  const progress = (qi / QUIZ_QS.length) * 100;

  const pick = i => {
    if (selected !== null) return;
    setSelected(i);
    if (i === q.ans) setScore(s => s + 1);
  };

  const next = () => {
    if (qi + 1 >= QUIZ_QS.length) { setDone(true); }
    else { setQi(qi + 1); setSelected(null); }
  };

  const restart = () => { setQi(0); setSelected(null); setScore(0); setDone(false); };

  if (done) {
    const grade = score >= 8 ? 'text-green-400' : score >= 5 ? 'text-accent' : 'text-red-400';
    const msg   = score >= 8 ? 'Excellent! 🔥' : score >= 5 ? 'Good work 👍' : 'Keep grinding 📚';
    return (
      <div className="rounded-xl border border-dark-border p-5 font-mono select-none text-center" style={{ background: 'var(--c-card-alt)' }}>
        <p className="text-[10px] text-text-subtle uppercase tracking-widest mb-3">Session Complete</p>
        <p className={`text-5xl font-black mb-2 ${grade}`}>{score}<span className="text-xl text-text-subtle">/{QUIZ_QS.length}</span></p>
        <p className="text-text-subtle text-xs mb-5">{msg}</p>
        <button
          onClick={restart}
          className="text-[10px] font-mono text-accent border border-accent/30 rounded px-5 py-1.5 hover:bg-accent/10 transition-colors"
          style={{ cursor: 'pointer' }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-dark-border p-4 font-mono select-none" style={{ background: 'var(--c-card-alt)' }}>
      {/* header */}
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[10px] text-text-subtle">Q {qi + 1} / {QUIZ_QS.length}</span>
        <span className="text-[10px] text-green-400">Score: {score}</span>
      </div>

      {/* progress */}
      <div className="h-1 rounded-full overflow-hidden mb-3" style={{ background: 'var(--c-border)' }}>
        <div className="h-full bg-green-400 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>

      {/* question */}
      <div className="rounded-lg p-3 mb-3 border border-dark-border" style={{ background: 'var(--c-card)' }}>
        <p className="text-[11px] leading-snug" style={{ color: 'var(--c-text)' }}>{q.q}</p>
      </div>

      {/* options */}
      <div className="grid grid-cols-2 gap-1.5 mb-3">
        {q.opts.map((opt, i) => {
          let style = {};
          let base  = 'rounded-md px-2 py-1.5 text-[10px] text-left border transition-colors';
          if (selected !== null) {
            if (i === q.ans)     { style = { borderColor: '#22c55e', background: 'rgba(34,197,94,0.08)', color: '#22c55e' }; }
            else if (i === selected) { style = { borderColor: '#ef4444', background: 'rgba(239,68,68,0.08)', color: '#ef4444' }; }
            else                 { style = { borderColor: 'var(--c-border)', color: 'var(--c-subtle)' }; }
          } else {
            style = { borderColor: 'var(--c-border)', color: 'var(--c-subtle)', cursor: 'pointer' };
          }
          return (
            <button key={i} onClick={() => pick(i)} className={base} style={{ ...style, cursor: selected !== null ? 'default' : 'pointer' }}>
              {opt}
            </button>
          );
        })}
      </div>

      {/* next */}
      {selected !== null && (
        <button
          onClick={next}
          className="w-full text-[10px] font-mono text-accent border border-accent/30 rounded py-1.5 hover:bg-accent/10 transition-colors"
          style={{ cursor: 'pointer' }}
        >
          {qi + 1 >= QUIZ_QS.length ? 'See Results →' : 'Next →'}
        </button>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   UNLIMITED WORDLE — Playable game
   ════════════════════════════════════════════════════════════════ */

const WORD_BANK = [
  'crane','plant','shout','brave','light','stone','blend','crisp','dance','flame',
  'heart','magic','night','ocean','peace','shade','tiger','water','youth','angel',
  'black','chart','drift','eagle','frost','ghost','hedge','knack','laser','noble',
  'orbit','pixel','relay','sword','under','vapor','waltz','young','blast','glide',
  'hotel','index','limbo','march','naval','prism','raven','shard','truce','venom',
  'wrath','yacht','birch','dwarf','flank','grind','hoist','irony','jewel','kayak',
  'latch','maple','notch','otter','perch','rivet','snare','tonic','valid','weave',
  'yearn','broth','denim','gloom','jelly','lucid','vigor','whirl','adorn','drown',
  'elbow','gusto','handy','joust','karma','lyric','melon','plush','quiet','roost',
  'stomp','verge','abbey','chant','debut','extra','frisk','imply','kneel','nudge',
  'prank','smear','taunt','vouch','acorn','brash','cleft','delta','ember','flair',
  'graze','husky','kiosk','maxim','nadir','plumb','ranch','scald','thorn','zippy',
  'plaid','faith','grain','prove','squad','globe','frame','scale','drive','sense',
  'trust','world','learn','build','spark','cliff','blaze','bound','brawl','clasp',
  'cloak','clump','coast','comet','coral','court','cover','crimp','bench','brain',
  'champ','cheap','child','chunk','class','clean','clear','click','clock','close',
  'cloud','coach','color','couch','cross','crowd','crown','crash','cream','creak',
  'cinch','civic','civil','crisp','craft','cross','crypt','crust','cruel','crumb',
  'flute','forge','forte','froth','frugal','focal','found','foxes','grasp','groan',
  'grant','grape','gravy','greed','greet','grief','grill','grove','grove','gulch',
  'hatch','hazel','heist','helix','hence','herbs','hippo','hippy','hound','house',
  'human','humid','hurry','kneel','lance','layer','leach','least','ledge','legal',
  'lemon','level','liver','logic','lotus','lover','lower','lunar','lunch','lusty',
  'manor','marsh','match','minor','minus','model','month','moose','moral','motor',
  'mount','mouse','mouth','movie','muddy','music','nerve','ninja','noise','north',
  'nurse','paint','panel','paper','party','patch','peach','pearl','penny','phase',
  'piano','pinch','pizza','plain','plane','plank','plaza','polka','poppy','porch',
  'pound','power','press','price','pride','prime','print','pulse','punch','puppy',
  'purse','queen','quest','queue','quick','quill','quota','quote','raise','range',
  'rapid','reach','ready','realm','rebel','rider','ridge','right','rigid','risky',
  'robin','rocky','rodeo','rogue','round','route','royal','rugby','ruler','rusty',
  'saint','sauce','scalp','scamp','scant','scene','score','scout','screw','seize',
  'serve','seven','shaft','shale','shame','shape','sheep','shelf','shell','shift',
  'shirt','shoot','shore','sigma','sixth','skate','skill','skirt','skull','skunk',
  'sleek','sleep','slice','slide','sloth','slump','smash','smell','smoke','snail',
  'snake','solve','sorry','south','space','spare','spawn','speak','spell','spill',
  'spine','spite','spoon','sport','spray','stack','staff','stage','stake','stale',
  'stalk','stamp','stand','stark','start','steam','steel','steep','steer','stern',
  'stick','still','sting','stink','stock','stone','stood','store','stork','storm',
  'stove','strap','straw','stray','strut','stuff','stump','stunt','style','sugar',
  'suite','super','surge','swamp','swarm','swear','sweat','sweep','sweet','swept',
  'swift','swing','swipe','swirl','swoop','synth','table','taste','teach','tenth',
  'those','three','throw','thumb','tilde','timid','title','today','token','torch',
  'total','touch','towel','tower','toxic','track','trade','trail','train','trait',
  'trash','tread','treat','trend','trick','trove','truck','truly','trunk','tummy',
  'tuple','twist','ultra','unbox','uncle','unify','union','unite','until','upper',
  'upset','urban','usual','utter','value','valve','vault','verse','video','vinyl',
  'viola','viper','virus','visor','vista','vital','vivid','vixen','vocal','voter',
];

function evalGuess(guess, target) {
  const result    = Array(5).fill('absent');
  const targetArr = target.split('');
  // correct positions first
  for (let i = 0; i < 5; i++) {
    if (guess[i] === targetArr[i]) { result[i] = 'correct'; targetArr[i] = null; }
  }
  // present letters
  for (let i = 0; i < 5; i++) {
    if (result[i] === 'correct') continue;
    const idx = targetArr.indexOf(guess[i]);
    if (idx !== -1) { result[i] = 'present'; targetArr[idx] = null; }
  }
  return result;
}

const WIN_MSGS = ['Genius!', 'Magnificent!', 'Impressive!', 'Splendid!', 'Great!', 'Phew!'];
const CELL_BG  = { correct: '#2d5a27', present: '#6b5000', absent: '#1e2022' };
const CELL_BD  = { correct: '#3d7a37', present: '#8b6f00', absent: '#2e3235' };

function InteractiveWordle() {
  const pick = () => WORD_BANK[Math.floor(Math.random() * WORD_BANK.length)];

  const [target,  setTarget]  = useState(pick);
  const [guesses, setGuesses] = useState([]);   // [{word, eval}]
  const [current, setCurrent] = useState('');
  const [message, setMessage] = useState('');
  const [won,     setWon]     = useState(false);
  const inputRef = useRef(null);

  const isOver = won || guesses.length >= 6;

  const submit = () => {
    const word = current.trim().toLowerCase();
    if (word.length !== 5) { setMessage('Need 5 letters'); return; }
    const ev       = evalGuess(word, target);
    const newGuesses = [...guesses, { word, eval: ev }];
    setGuesses(newGuesses);
    setCurrent('');
    if (word === target) {
      setWon(true);
      setMessage(WIN_MSGS[newGuesses.length - 1] ?? '🎉');
    } else if (newGuesses.length >= 6) {
      setMessage(target.toUpperCase());
    } else {
      setMessage('');
    }
  };

  const reset = () => {
    setTarget(pick());
    setGuesses([]);
    setCurrent('');
    setMessage('');
    setWon(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  // Build 6-row display
  const rows = Array.from({ length: 6 }, (_, i) => {
    if (i < guesses.length) return guesses[i];
    if (i === guesses.length && !isOver) return { word: current.padEnd(5, ' '), eval: Array(5).fill('') };
    return { word: '     ', eval: Array(5).fill('') };
  });

  return (
    <div className="rounded-xl border border-dark-border p-4 font-mono select-none" style={{ background: 'var(--c-card-alt)' }}>
      {/* header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] uppercase tracking-widest text-text-subtle">Unlimited Wordle</span>
        <div className="flex items-center gap-2">
          {message && (
            <span className={`text-[10px] font-bold ${won ? 'text-green-400' : guesses.length >= 6 && !won ? 'text-red-400' : 'text-accent'}`}>
              {message}
            </span>
          )}
          {isOver && (
            <button
              onClick={reset}
              className="text-[9px] font-mono text-accent border border-accent/30 rounded px-2 py-0.5 hover:bg-accent/10"
              style={{ cursor: 'pointer' }}
            >New ↺</button>
          )}
        </div>
      </div>

      {/* grid */}
      <div className="flex flex-col gap-1 items-center mb-2">
        {rows.map((row, ri) => (
          <div key={ri} className="flex gap-1">
            {Array.from(row.word).map((letter, ci) => {
              const ev = row.eval[ci];
              return (
                <div
                  key={ci}
                  className="w-7 h-7 rounded flex items-center justify-center text-[11px] font-bold border"
                  style={{
                    background:  ev ? CELL_BG[ev] : 'var(--c-card)',
                    borderColor: ev ? CELL_BD[ev] : 'var(--c-border)',
                    color:       ev ? '#efefef'   : letter.trim() ? 'var(--c-text)' : 'transparent',
                  }}
                >
                  {letter.trim().toUpperCase()}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* input */}
      {!isOver && (
        <div className="flex gap-1.5">
          <input
            ref={inputRef}
            value={current}
            onChange={e => {
              const val = e.target.value.replace(/[^a-zA-Z]/g, '').slice(0, 5).toLowerCase();
              setCurrent(val);
              if (message === 'Need 5 letters') setMessage('');
            }}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); submit(); } }}
            placeholder="5-letter word…"
            maxLength={5}
            className="flex-1 rounded px-2.5 py-1.5 text-[10px] outline-none border border-dark-border focus:border-accent/50 transition-colors uppercase tracking-widest"
            style={{ background: 'var(--c-card)', color: 'var(--c-text)', caretColor: '#f97316', cursor: 'text' }}
            autoComplete="off"
            spellCheck={false}
          />
          <button
            onClick={submit}
            disabled={current.length !== 5}
            className="text-[10px] font-mono text-accent border border-accent/30 rounded px-2.5 py-1.5 hover:bg-accent/10 transition-colors disabled:opacity-40"
            style={{ cursor: 'pointer' }}
          >↵</button>
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   TechPill
   ════════════════════════════════════════════════════════════════ */

const TechPill = ({ label }) => (
  <span className="text-[11px] px-2 py-0.5 rounded font-mono text-text-subtle border border-dark-border bg-dark">
    {label}
  </span>
);

/* ════════════════════════════════════════════════════════════════
   Project data
   ════════════════════════════════════════════════════════════════ */

const projects = [
  {
    title: 'SERA',
    subtitle: 'AI Sexual Health & Relationship Chatbot',
    description:
      'Fullstack AI chatbot delivering real-time, empathetic sexual health and relationship guidance. Powered by OpenAI GPT with JWT authentication, role-based access control, and voice interaction via Web Speech API.',
    tech: ['React', 'Node.js', 'MongoDB', 'OpenAI GPT', 'JWT', 'Tailwind CSS'],
    githubUrl: 'https://github.com/rahulbaweja7',
    badge: 'WiCS 2025 Winner',
    Mockup: InteractiveSeraChat,
  },
  {
    title: 'MacroBuddy',
    subtitle: 'AI Nutrition Tracker',
    description:
      'Smart macro tracker with goal-based meal planning and AI-generated alternatives. OpenAI suggests 50+ recipes aligned to your cut, maintain, or bulk goals.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'OpenAI API'],
    githubUrl: 'https://github.com/rahulbaweja7',
    Mockup: InteractiveMacro,
  },
  {
    title: 'QuizModoro',
    subtitle: 'Pomodoro + Active Recall',
    description:
      'Productivity quiz app blending Pomodoro sessions with spaced repetition. Custom quiz sets, timed focus sessions, and performance tracking.',
    tech: ['React', 'JavaScript', 'CSS', 'LocalStorage'],
    githubUrl: 'https://github.com/rahulbaweja7/quizmodoro',
    Mockup: InteractiveQuiz,
  },
  {
    title: 'Unlimited Wordle',
    subtitle: 'Infinite Word Game',
    description:
      'Play unlimited rounds of Wordle with a large curated word bank. Full game logic with color-coded feedback, streaks, and instant play-again.',
    tech: ['JavaScript', 'HTML', 'CSS'],
    githubUrl: 'https://github.com/rahulbaweja7',
    Mockup: InteractiveWordle,
  },
];

/* ════════════════════════════════════════════════════════════════
   Cards
   ════════════════════════════════════════════════════════════════ */

function FeaturedCard({ project }) {
  const { title, subtitle, description, tech, githubUrl, liveUrl, badge, Mockup } = project;
  return (
    <div className="card-interactive rounded-xl overflow-hidden border border-dark-border grid lg:grid-cols-2 group">
      {/* content */}
      <div className="p-8 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-5">
            <span className="text-[10px] font-mono text-text-subtle uppercase tracking-widest">01 — featured</span>
            {badge && (
              <span className="flex items-center gap-1.5 text-[10px] font-mono text-accent border border-accent/20 bg-accent/5 px-2.5 py-1 rounded">
                <FaTrophy size={9} /> {badge}
              </span>
            )}
          </div>
          <h2 className="text-3xl font-black group-hover:text-accent transition-colors duration-200 mb-1 uppercase leading-none" style={{ color: 'var(--c-text)' }}>
            {title}
          </h2>
          <p className="text-xs font-mono text-text-subtle mb-5 uppercase tracking-widest">{subtitle}</p>
          <p className="text-text-muted text-sm leading-relaxed mb-6">{description}</p>
          <div className="flex flex-wrap gap-1.5 mb-8">
            {tech.map((t, i) => <TechPill key={i} label={t} />)}
          </div>
        </div>
        <div className="flex items-center gap-5 pt-5 border-t border-dark-border">
          {githubUrl && githubUrl !== '#' && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-text-subtle hover:text-text-primary transition-colors duration-200">
              <FaGithub size={14} /> Code
            </a>
          )}
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-text-subtle hover:text-accent transition-colors duration-200">
              <FaExternalLinkAlt size={11} /> Live
            </a>
          )}
        </div>
      </div>
      {/* mockup */}
      <div className="mockup-glow flex flex-col border-l border-dark-border min-h-[340px] transition-shadow duration-300" style={{ background: 'var(--c-deep)' }}>
        <div className="flex items-center justify-between px-5 py-2 border-b shrink-0" style={{ borderColor: 'rgba(249,115,22,0.2)', background: 'rgba(249,115,22,0.03)' }}>
          <span className="flex items-center gap-1.5 text-[10px] font-mono font-medium text-accent">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            live demo
          </span>
          <span className="text-[9px] font-mono text-text-subtle">← type something</span>
        </div>
        <div className="flex-1 flex items-center justify-center p-5">
          <div className="w-full max-w-[340px]" style={{ height: 310 }}>
            <Mockup />
          </div>
        </div>
      </div>
    </div>
  );
}

function SmallCard({ project, index, extraClass = '', extraStyle = {} }) {
  const { title, subtitle, description, tech, githubUrl, liveUrl, badge, Mockup } = project;
  return (
    <div className={`card-interactive rounded-xl overflow-hidden border border-dark-border flex flex-col group ${extraClass}`} style={{ height: '100%', ...extraStyle }}>
      {/* mockup */}
      <div className="mockup-glow border-b border-dark-border transition-shadow duration-300" style={{ background: 'var(--c-deep)' }}>
        <div className="flex items-center gap-2 px-4 py-1.5 border-b" style={{ borderColor: 'rgba(249,115,22,0.18)', background: 'rgba(249,115,22,0.03)' }}>
          <span className="w-1 h-1 rounded-full bg-accent animate-pulse" />
          <LoopType />
        </div>
        <div className="p-2" style={{ height: 320, overflow: 'hidden' }}>
          <Mockup />
        </div>
      </div>
      {/* content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <span className="text-[10px] font-mono text-text-subtle block mb-1">{String(index + 1).padStart(2, '0')}</span>
            <h3 className="text-lg font-black uppercase group-hover:text-accent transition-colors duration-200 leading-none" style={{ color: 'var(--c-text)' }}>
              {title}
            </h3>
            <p className="text-[10px] font-mono text-text-subtle mt-0.5 uppercase tracking-wider">{subtitle}</p>
          </div>
          {badge && (
            <span className="flex items-center gap-1 text-[10px] font-mono text-accent border border-accent/20 bg-accent/5 px-2 py-1 rounded shrink-0">
              <FaTrophy size={8} /> {badge}
            </span>
          )}
        </div>
        <p className="text-text-muted text-xs leading-relaxed mb-4 flex-1">{description}</p>
        <div className="flex flex-wrap gap-1 mb-4">
          {tech.map((t, i) => <TechPill key={i} label={t} />)}
        </div>
        <div className="flex items-center gap-4 pt-4 border-t border-dark-border">
          {githubUrl && githubUrl !== '#' && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[11px] text-text-subtle hover:text-text-primary transition-colors duration-200">
              <FaGithub size={12} /> Code
            </a>
          )}
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[11px] text-text-subtle hover:text-accent transition-colors duration-200">
              <FaExternalLinkAlt size={10} /> Live
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   LoopType — typewriter that cycles through prompts
   ════════════════════════════════════════════════════════════════ */

const LOOP_HINTS = ['try me →', "it's live →", 'click it →', 'interact →'];

function LoopType() {
  const [display, setDisplay] = useState('');

  useEffect(() => {
    let dead = false;
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    let idx = Math.floor(Math.random() * LOOP_HINTS.length); // stagger per card

    (async () => {
      // small random offset so 3 cards don't all sync up
      await sleep(Math.random() * 800);
      while (!dead) {
        const text = LOOP_HINTS[idx % LOOP_HINTS.length];
        for (let i = 1; i <= text.length; i++) {
          if (dead) return;
          setDisplay(text.slice(0, i));
          await sleep(52 + Math.random() * 22);
        }
        await sleep(1700);
        for (let i = text.length - 1; i >= 0; i--) {
          if (dead) return;
          setDisplay(text.slice(0, i));
          await sleep(28);
        }
        await sleep(320);
        idx++;
      }
    })();

    return () => { dead = true; };
  }, []);

  return (
    <span className="inline-flex items-baseline gap-px">
      <span className="text-[9px] font-mono text-accent">{display}</span>
      <span className="text-[9px] font-mono text-accent animate-blink">_</span>
    </span>
  );
}

/* ════════════════════════════════════════════════════════════════
   TryItBubble — floating comic callout
   ════════════════════════════════════════════════════════════════ */

function TryItBubble() {
  const [phase,  setPhase]  = useState('hidden');  // hidden → in → floating → out → gone
  const [typed,  setTyped]  = useState('');
  const MSG = 'psst — these actually work. try one.';

  // mount: fade in after short delay
  useEffect(() => {
    const t = setTimeout(() => setPhase('in'), 700);
    return () => clearTimeout(t);
  }, []);

  // once visible, typewrite the message
  useEffect(() => {
    if (phase !== 'in') return;
    const t = setTimeout(() => setPhase('floating'), 50);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'floating') return;
    let i = 0;
    const iv = setInterval(() => {
      setTyped(MSG.slice(0, ++i));
      if (i >= MSG.length) clearInterval(iv);
    }, 48);
    return () => clearInterval(iv);
  }, [phase]);

  const dismiss = () => {
    setPhase('out');
    setTimeout(() => setPhase('gone'), 350);
  };

  if (phase === 'gone') return null;

  const isVisible = phase === 'floating' || phase === 'in';

  return (
    <div style={{ position: 'absolute', top: -58, right: 0, zIndex: 20, pointerEvents: 'none' }}>
      <div
        onClick={dismiss}
        className="pointer-events-auto relative inline-flex items-start gap-3 px-5 py-3.5 rounded-2xl font-mono select-none"
        style={{
          background:  'rgba(249,115,22,0.06)',
          border:      '1.5px dashed rgba(249,115,22,0.55)',
          color:       '#f97316',
          cursor:      'pointer',
          maxWidth:    360,
          opacity:     isVisible && phase !== 'out' ? 1 : 0,
          animation:   phase === 'floating'
            ? 'bubbleIn 0.45s cubic-bezier(0.34,1.56,0.64,1) forwards, float 3.2s ease-in-out 0.5s infinite'
            : 'none',
          transition:  phase === 'out' ? 'opacity 0.3s ease' : 'none',
        }}
      >
        {/* pencil scribble dot */}
        <span style={{ fontSize: 18, lineHeight: 1, marginTop: 1, flexShrink: 0 }}>✦</span>

        <div className="flex-1">
          <p className="text-[12px] leading-relaxed">
            {typed}
            {typed.length < MSG.length && (
              <span className="animate-blink" style={{ color: 'var(--c-text)' }}>_</span>
            )}
          </p>
          {typed.length === MSG.length && (
            <p className="text-[10px] mt-1 opacity-60">click to dismiss</p>
          )}
        </div>

        {/* bubble tail — points down-left toward the featured card */}
        <svg
          width="20" height="14"
          viewBox="0 0 20 14"
          style={{ position: 'absolute', bottom: -13, left: 36 }}
          fill="none"
        >
          <path d="M0 0 L10 14 L20 0" fill="rgba(249,115,22,0.06)" />
          <path d="M0 0 L10 14 L20 0" stroke="rgba(249,115,22,0.55)" strokeWidth="1.5"
            strokeLinejoin="round" strokeDasharray="2 2" fill="none" />
        </svg>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   Page
   ════════════════════════════════════════════════════════════════ */

export default function Projects() {
  return (
    <div className="min-h-screen bg-dark">
      <Head>
        <title>Projects | Rahul Baweja</title>
        <meta name="description" content="Projects by Rahul Baweja" />
      </Head>
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 pt-28 pb-20">
        {/* Header */}
        <div className="mb-10 animate-fade-in-up" style={{ opacity: 0, animationFillMode: 'forwards' }}>
          <p className="text-[10px] font-mono text-text-subtle uppercase tracking-widest mb-3">Selected work</p>
          <h1 className="text-4xl sm:text-5xl font-black uppercase leading-none mb-3" style={{ color: 'var(--c-text)' }}>
            Things I&apos;ve<br />
            <span style={{ color: 'var(--c-ghost)' }}>built.</span>
          </h1>
          <p className="text-text-muted text-sm">From hackathon winners to tools I actually use.</p>
        </div>

        {/* Featured — relative so TryItBubble can float above it without taking layout space */}
        <div className="relative mb-4 animate-fade-in-up delay-100" style={{ opacity: 0, animationFillMode: 'forwards' }}>
          <TryItBubble />
          <FeaturedCard project={projects[0]} />
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-4" style={{ gridAutoRows: '580px' }}>
          {projects.slice(1).map((project, i) => (
            <SmallCard
              key={i}
              project={project}
              index={i + 1}
              extraClass="animate-fade-in-up"
              extraStyle={{ opacity: 0, animationFillMode: 'forwards', animationDelay: `${(i + 2) * 0.08}s` }}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="mt-14 animate-fade-in" style={{ opacity: 0, animationFillMode: 'forwards', animationDelay: '0.5s' }}>
          <p className="text-text-subtle text-sm font-mono">
            More on{' '}
            <a href="https://github.com/rahulbaweja7" target="_blank" rel="noopener noreferrer"
              className="text-text-muted hover:text-accent transition-colors duration-200">
              github.com/rahulbaweja7
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
