import { useEffect, useRef, useState } from 'react';
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

// Orange accent scale for the minimal home page, with empty cells tuned to the cream paper
const monoPalette = {
  dark:  ['#2a2820', '#4a2c14', '#8a4313', '#d2620f', '#f97316'],
  light: ['#ece6cf', '#fcd9b0', '#fbb269', '#f78a2c', '#e8650a'],
};

// The calendar is 53 weeks wide: width = 53 * (blockSize + margin) - margin
const WEEKS = 53;
const MARGIN = 3;
const MIN_BLOCK = 9;
const MAX_BLOCK = 20;

export default function GithubActivity({ username = 'rahulbaweja7', minimal = false }) {
  const { theme } = useTheme();
  const scrollRef = useRef(null);
  const [fitBlock, setFitBlock] = useState(MIN_BLOCK);

  // Minimal variant: scale the squares so the calendar fills its container.
  // Below the minimum size it stays at MIN_BLOCK and scrolls horizontally instead.
  useEffect(() => {
    if (!minimal) return;
    const root = scrollRef.current;
    if (!root) return;
    const fit = () => {
      const size = (root.clientWidth + MARGIN) / WEEKS - MARGIN - 0.02;
      setFitBlock(Math.min(MAX_BLOCK, Math.max(MIN_BLOCK, Math.floor(size * 100) / 100)));
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(root);
    return () => observer.disconnect();
  }, [minimal]);

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
          blockSize={fitBlock}
          blockMargin={MARGIN}
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
