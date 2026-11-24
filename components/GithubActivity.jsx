import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { FaGithub } from 'react-icons/fa';
import { useTheme } from '@/context/ThemeContext';

const GitHubCalendar = dynamic(
  () => import('react-github-calendar').then(mod => mod.GitHubCalendar),
  { ssr: false }
);

const palette = {
  dark:  ['#1a1a1a', '#3a2414', '#7c3a10', '#c75c12', '#f97316'],
  light: ['#f0ede7', '#ffd9b3', '#ffb166', '#fc8c2e', '#f97316'],
};

// Warm paper-and-ink scale for the minimal home page
const monoPalette = {
  dark:  ['#2a2820', '#4a463a', '#7a7562', '#b3ad96', '#ece7d6'],
  light: ['#ece6cf', '#cfc7aa', '#968f76', '#5a5546', '#282828'],
};

export default function GithubActivity({ username = 'rahulbaweja7', minimal = false }) {
  const { theme } = useTheme();
  const scrollRef = useRef(null);

  // The calendar is wider than the card and loads async, so keep its scroll
  // container pinned to the right edge (latest month) whenever it re-renders.
  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;
    const scrollToLatest = () => {
      root.querySelectorAll('*').forEach(el => {
        if (el.scrollWidth > el.clientWidth) el.scrollLeft = el.scrollWidth;
      });
    };
    const observer = new MutationObserver(scrollToLatest);
    observer.observe(root, { childList: true, subtree: true });
    scrollToLatest();
    return () => observer.disconnect();
  }, []);

  if (minimal) {
    return (
      <div ref={scrollRef} className="gh-cal-scroll">
        <GitHubCalendar
          username={username}
          colorScheme={theme}
          theme={monoPalette}
          blockSize={9}
          blockMargin={3}
          fontSize={14}
          style={{ color: 'inherit' }}
        />
      </div>
    );
  }

  return (
    <div className="rounded-xl p-4" style={{ background: 'var(--c-card)', border: '1px solid var(--c-border)' }}>
      <a
        href={`https://github.com/${username}`}
        target="_blank"
        rel="noopener noreferrer"
        data-hover
        className="flex items-center gap-2 mb-4 w-fit"
      >
        <FaGithub size={14} style={{ color: 'var(--c-subtle)' }} />
        <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--c-subtle)' }}>
          Commit activity
        </p>
      </a>

      <div ref={scrollRef} className="gh-cal-scroll">
        <GitHubCalendar
          username={username}
          colorScheme={theme}
          theme={palette}
          blockSize={9}
          blockMargin={3}
          fontSize={11}
          hideTotalCount={false}
          style={{ color: 'var(--c-muted)' }}
        />
      </div>
    </div>
  );
}
