import { useEffect, useState } from 'react';
import { AnimatedCounter } from '@/components/ui/animated-counter';

export default function ViewCounter() {
  const [views, setViews] = useState(null);

  useEffect(() => {
    // Count each browser session once; later page loads in the same session just read
    let counted = false;
    try { counted = sessionStorage.getItem('viewed') === '1'; } catch {}

    fetch('/api/views', { method: counted ? 'GET' : 'POST' })
      .then(r => (r.ok ? r.json() : Promise.reject()))
      .then(({ views }) => {
        setViews(views);
        try { sessionStorage.setItem('viewed', '1'); } catch {}
      })
      .catch(() => setViews(null));
  }, []);

  if (views === null) return null;

  return (
    <p className="flex items-baseline gap-1 font-mono text-[11px]" style={{ color: 'var(--c-subtle)' }}>
      <AnimatedCounter value={views} style={{ color: 'var(--c-muted)' }} />
      views
    </p>
  );
}
