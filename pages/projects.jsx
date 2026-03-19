import Head from 'next/head';
import Navbar from '@/components/Navbar';
import ProjectItem from '@/components/ProjectItem';

const projects = [
  {
    title: 'SERA',
    description:
      'Fullstack AI sexual health chatbot delivering real-time, empathetic guidance powered by OpenAI GPT. JWT authentication, role-based access control, and voice interaction via Web Speech API.',
    tech: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'OpenAI GPT', 'JWT'],
    githubUrl: 'https://github.com/rahulbaweja7',
    badge: 'WiCS 2025 Winner',
    featured: true,
  },
  {
    title: 'MacroBuddy',
    description:
      'Fullstack nutrition tracker with macro tracking, fast food alternatives, and personalized meal planning. Uses OpenAI to generate 50+ recipe suggestions based on user goals.',
    tech: ['React', 'Node.js', 'Express.js', 'MongoDB', 'OpenAI API'],
    githubUrl: 'https://github.com/rahulbaweja7',
  },
  {
    title: 'QuizModoro',
    description:
      'Productivity quiz app blending Pomodoro with active recall. Timed sessions, spaced repetition, and custom quiz sets.',
    tech: ['React', 'JavaScript', 'CSS', 'LocalStorage'],
    githubUrl: 'https://github.com/rahulbaweja7/quizmodoro',
  },
  {
    title: 'Unlimited Wordle',
    description:
      'Unlimited version of the viral Wordle game — play as many rounds as you want. Win streaks, guess distribution, clean dark UI.',
    tech: ['JavaScript', 'HTML', 'CSS'],
    githubUrl: 'https://github.com/rahulbaweja7',
  },
];

const Projects = () => {
  return (
    <div className="min-h-screen bg-dark">
      <Head>
        <title>Projects | Rahul Baweja</title>
        <meta name="description" content="Projects by Rahul Baweja" />
      </Head>
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 pt-28 pb-20">
        {/* Header */}
        <div
          className="mb-12 animate-fade-in-up"
          style={{ opacity: 0, animationFillMode: 'forwards' }}
        >
          <h1 className="text-4xl sm:text-5xl font-light text-[#efefef] mb-3">
            Things I&apos;ve built<span className="text-accent">.</span>
          </h1>
          <p className="text-text-muted text-base">
            From hackathon winners to tools I actually use.
          </p>
        </div>

        {/* Featured project */}
        <div
          className="mb-4 animate-fade-in-up delay-100"
          style={{ opacity: 0, animationFillMode: 'forwards' }}
        >
          <ProjectItem index={0} {...projects[0]} />
        </div>

        {/* Rest in grid */}
        <div className="grid md:grid-cols-3 gap-4">
          {projects.slice(1).map((project, i) => (
            <div
              key={i}
              className="animate-fade-in-up"
              style={{
                opacity: 0,
                animationFillMode: 'forwards',
                animationDelay: `${(i + 1) * 0.08}s`,
              }}
            >
              <ProjectItem index={i + 1} {...project} />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          className="mt-14 animate-fade-in"
          style={{ opacity: 0, animationFillMode: 'forwards', animationDelay: '0.5s' }}
        >
          <p className="text-text-subtle text-sm font-mono">
            More on{' '}
            <a
              href="https://github.com/rahulbaweja7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent transition-colors duration-200"
            >
              github.com/rahulbaweja7
            </a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Projects;
