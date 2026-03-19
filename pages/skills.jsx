import Head from 'next/head';
import Navbar from '@/components/Navbar';

const skills = [
  {
    label: 'Languages',
    items: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C', 'C++'],
  },
  {
    label: 'Frontend',
    items: ['React', 'Next.js', 'HTML', 'CSS', 'Tailwind CSS', 'Material-UI', 'Angular'],
  },
  {
    label: 'Backend',
    items: ['Node.js', 'Express.js', 'Spring Boot', 'Flask', 'REST APIs', 'GraphQL'],
  },
  {
    label: 'Databases',
    items: ['MongoDB', 'PostgreSQL', 'MySQL', 'DynamoDB'],
  },
  {
    label: 'Cloud & Infra',
    items: ['AWS', 'Azure', 'Docker', 'Git'],
  },
  {
    label: 'Testing',
    items: ['JUnit'],
  },
];

const Skills = () => {
  return (
    <div className="min-h-screen bg-dark">
      <Head>
        <title>Skills | Rahul Baweja</title>
      </Head>
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 pt-28 pb-20">
        {/* Header */}
        <div
          className="mb-14 animate-fade-in-up"
          style={{ opacity: 0, animationFillMode: 'forwards' }}
        >
          <h1 className="text-4xl sm:text-5xl font-light text-[#efefef] mb-3">
            My toolkit<span className="text-accent">.</span>
          </h1>
          <p className="text-text-muted text-base">
            Languages, frameworks, and tools I reach for when building.
          </p>
        </div>

        {/* Skills list */}
        <div className="space-y-10">
          {skills.map((cat, ci) => (
            <div
              key={ci}
              className="animate-fade-in-up"
              style={{ opacity: 0, animationFillMode: 'forwards', animationDelay: `${ci * 0.07}s` }}
            >
              <h2 className="text-xs font-mono text-text-subtle uppercase tracking-widest mb-3">
                {cat.label}
              </h2>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((s, i) => (
                  <span
                    key={i}
                    className="text-sm px-3 py-1.5 rounded font-mono text-text-muted border border-dark-border bg-dark-card hover:border-[#3a3a3a] hover:text-[#efefef] transition-all duration-200 cursor-default"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-14 border-t border-dark-border" />

        {/* Currently learning */}
        <div
          className="animate-fade-in-up"
          style={{ opacity: 0, animationFillMode: 'forwards', animationDelay: '0.5s' }}
        >
          <h2 className="text-xs font-mono text-text-subtle uppercase tracking-widest mb-3">
            Currently exploring
          </h2>
          <p className="text-text-muted text-sm leading-relaxed">
            Rust, Go, system design, and deep learning architectures.
            The stack is always evolving.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Skills;
