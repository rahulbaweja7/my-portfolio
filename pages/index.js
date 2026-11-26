import Head from 'next/head';
import { Crimson_Text } from 'next/font/google';
import GithubActivity from '@/components/GithubActivity';
import ViewCounter from '@/components/ViewCounter';
import styles from '@/styles/Home.module.css';

const serif = Crimson_Text({ subsets: ['latin'], weight: ['400', '600'], variable: '--font-serif' });

const links = {
  github:   'https://github.com/rahulbaweja7',
  linkedin: 'https://www.linkedin.com/in/rahulbaweja-/',
  x:        'https://x.com/RahulBaweja07',
  email:    'mailto:rbaweja1@asu.edu',
};

// ASU webring: https://github.com/rahulbaweja7/webring
const ring = { origin: 'https://ring.rahulbaweja.workers.dev', slug: 'rahul-baweja' };

const experience = [
  { company: 'Microsoft',    role: 'Software Engineer Intern', year: 'Current' },
  { company: 'SuperWorld',   role: 'Software Engineer Intern', year: '2025' },
  { company: 'IDX Exchange', role: 'Software Engineer Intern', year: '2025' },
  { company: 'Eazy2Biz',     role: 'Software Engineer Intern', year: '2023' },
];

const projects = [
  { name: 'Applycation', description: 'Automated job application tracker', href: 'https://applycation.org' },
  { name: 'SERA',        description: 'AI sexual health chatbot, WiCS 2025 winner', href: 'https://github.com/rahulbaweja7' },
  { name: 'MacroBuddy',  description: 'AI nutrition tracker', href: 'https://github.com/rahulbaweja7/macrobuddy' },
  { name: 'QuizModoro',  description: 'Pomodoro + active recall', href: 'https://github.com/rahulbaweja7/quizmodoro' },
];

function Arrow({ className = '' }) {
  return (
    <svg className={`${styles.external} ${className}`} viewBox="0 0 16 16" aria-hidden="true">
      <path d="M3 13 13 3M3 3h10v10" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Rahul Baweja</title>
        <meta name="description" content="Rahul Baweja, software engineer. Experience and projects, one page." />
      </Head>

      <main className={`minimal-home ${serif.variable} ${styles.page}`}>
        <header>
          <h1 className={styles.title}>Rahul Baweja</h1>
          <div className={styles.prose}>
            <p>22, CS Grad, Prev SWE Intern @ Microsoft, SuperWorld, and IDX Exchange</p>
            <p>
              You can find me on{' '}
              <a href={links.github} target="_blank" rel="noopener noreferrer">GitHub</a>,{' '}
              <a href={links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>, and{' '}
              <a href={links.x} target="_blank" rel="noopener noreferrer">X</a>, or email me{' '}
              <a href={links.email}>here</a>.
            </p>
          </div>
        </header>

        <div className={styles.columns}>
          <section className={styles.section} aria-labelledby="experience">
            <h2 className={styles.heading} id="experience">Experience</h2>
            <ul className={`${styles.list} ${styles.listYear}`}>
              {experience.map(e => (
                <li key={e.company} className={styles.row}>
                  <span className={styles.name}>{e.company}</span>
                  <span className={styles.role}>{e.role}</span>
                  <span className={styles.year}>{e.year}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.section} aria-labelledby="projects">
            <h2 className={styles.heading} id="projects">Projects</h2>
            <ul className={`${styles.list} ${styles.listLink}`}>
              {projects.map(p => (
                <li key={p.name}>
                  <a
                    className={`${styles.row} ${styles.projectLink}`}
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className={styles.name}>{p.name}</span>
                    <span className={styles.description}>{p.description}</span>
                    <Arrow className={styles.arrow} />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className={styles.section} aria-labelledby="activity">
          <h2 className={styles.heading} id="activity">Activity</h2>
          <GithubActivity minimal />
        </section>

        <footer className={styles.footer}>
          <nav className={styles.ring} aria-label="ASU webring">
            <a href={`${ring.origin}/prev/${ring.slug}`} aria-label="Previous site in the ring">←</a>
            <a href={ring.origin} aria-label="ASU webring home">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${ring.origin}/badge/${ring.slug}.svg`} alt="" width={22} height={22} referrerPolicy="no-referrer" />
            </a>
            <a href={`${ring.origin}/next/${ring.slug}`} aria-label="Next site in the ring">→</a>
          </nav>
          <div className={styles.views}>
            <ViewCounter />
          </div>
        </footer>
      </main>
    </>
  );
}
