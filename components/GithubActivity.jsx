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

export default function GithubActivity({ username = 'rahulbaweja7' }) {
  const { theme } = useTheme();

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

      <div className="gh-cal-scroll">
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
