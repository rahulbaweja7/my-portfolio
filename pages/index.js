import Head from 'next/head';
import GithubActivity from '@/components/GithubActivity';
import ViewCounter from '@/components/ViewCounter';
import styles from '@/styles/Home.module.css';

const socials = [
  { label: 'GitHub',   href: 'https://github.com/rahulbaweja7' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rahulbaweja-/' },
  { label: 'Twitter',  href: 'https://x.com/RahulBaweja07' },
  { label: 'Email',    href: 'mailto:rbaweja1@asu.edu' },
];

const experience = [
  { company: 'Microsoft',    role: 'Software Engineer Intern', year: 'Current' },
  { company: 'SuperWorld',   role: 'Software Engineer Intern', year: '2025' },
  { company: 'IDX Exchange', role: 'Software Engineer Intern', year: '2025' },
  { company: 'Eazy2Biz',     role: 'Software Engineer Intern', year: '2023' },
];

const projects = [
  { name: 'Applycation', description: 'Automated job application tracker', href: 'https://github.com/rahulbaweja7' },
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

      <main className={`minimal-home ${styles.page}`}>
        <header>
          <h1 className={styles.title}>Rahul Baweja</h1>
          <p className={styles.intro}>22, CS student at Arizona State, SWE intern at Microsoft.</p>
          <nav className={styles.links} aria-label="Contact">
            {socials.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label} <Arrow />
              </a>
            ))}
          </nav>
        </header>

        <section className={styles.section} aria-labelledby="experience">
          <h2 className={styles.heading} id="experience">Experience</h2>
          <ul className={styles.list}>
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
          <ul className={styles.list}>
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

        <section className={styles.section} aria-labelledby="activity">
          <h2 className={styles.heading} id="activity">Activity</h2>
          <GithubActivity minimal />
        </section>

        <footer className={styles.footer}>
          <p>Computer Science at Arizona State.</p>
          <ViewCounter />
        </footer>
      </main>
    </>
  );
}
