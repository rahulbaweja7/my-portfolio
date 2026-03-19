import Head from 'next/head';
import Navbar from '@/components/Navbar';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';

const contactLinks = [
  {
    icon: <AiOutlineMail size={18} />,
    label: 'Email',
    value: 'rbaweja1@asu.edu',
    href: 'mailto:rbaweja1@asu.edu',
  },
  {
    icon: <FaLinkedinIn size={16} />,
    label: 'LinkedIn',
    value: '/in/rahulbaweja-/',
    href: 'https://www.linkedin.com/in/rahulbaweja-/',
  },
  {
    icon: <FaGithub size={16} />,
    label: 'GitHub',
    value: 'rahulbaweja7',
    href: 'https://github.com/rahulbaweja7',
  },
];

const Contact = () => {
  return (
    <div className="min-h-screen bg-dark">
      <Head>
        <title>Contact | Rahul Baweja</title>
      </Head>
      <Navbar />

      <main className="max-w-2xl mx-auto px-6 pt-28 pb-20">
        {/* Header */}
        <div
          className="mb-14 animate-fade-in-up"
          style={{ opacity: 0, animationFillMode: 'forwards' }}
        >
          <h1 className="text-4xl sm:text-5xl font-light text-[#efefef] mb-4">
            Let&apos;s talk<span className="text-accent">.</span>
          </h1>
          <p className="text-text-muted text-base leading-relaxed max-w-sm">
            Opportunity, project idea, or just want to say hi — I&apos;m always down for a good conversation.
          </p>
        </div>

        {/* Links */}
        <div
          className="space-y-3 mb-12 animate-fade-in-up delay-100"
          style={{ opacity: 0, animationFillMode: 'forwards' }}
        >
          {contactLinks.map((link, i) => (
            <a
              key={i}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="flex items-center justify-between p-4 card-interactive rounded-lg group border border-dark-border"
            >
              <div className="flex items-center gap-4">
                <span className="text-text-subtle group-hover:text-accent transition-colors duration-200">
                  {link.icon}
                </span>
                <div>
                  <p className="text-xs font-mono text-text-subtle mb-0.5">{link.label}</p>
                  <p className="text-sm text-[#efefef]">{link.value}</p>
                </div>
              </div>
              <span className="text-text-subtle text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                ↗
              </span>
            </a>
          ))}
        </div>

        {/* Note */}
        <div
          className="animate-fade-in-up delay-300"
          style={{ opacity: 0, animationFillMode: 'forwards' }}
        >
          <p className="text-text-subtle text-xs font-mono">
            I&apos;m fastest between 10pm–2am. Occupational hazard.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Contact;
