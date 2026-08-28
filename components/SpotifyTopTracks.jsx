import { useEffect, useState } from 'react';
import { FaSpotify } from 'react-icons/fa';

export default function SpotifyTopTracks() {
  const [tracks, setTracks] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/spotify/top-tracks')
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => setTracks(data.tracks || []))
      .catch(() => setError(true));
  }, []);

  if (error) return null;

  return (
    <div className="rounded-xl p-4" style={{ background: 'var(--c-card)', border: '1px solid var(--c-border)' }}>
      <div className="flex items-center gap-2 mb-3">
        <FaSpotify size={14} style={{ color: '#1DB954' }} />
        <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--c-subtle)' }}>
          Top listens this month
        </p>
      </div>

      {!tracks && (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 animate-pulse">
              <div className="w-9 h-9 rounded shrink-0" style={{ background: 'var(--c-border)' }} />
              <div className="flex-1 space-y-1.5">
                <div className="h-2.5 rounded w-3/4" style={{ background: 'var(--c-border)' }} />
                <div className="h-2 rounded w-1/2" style={{ background: 'var(--c-border)' }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {tracks && tracks.length === 0 && (
        <p className="text-xs" style={{ color: 'var(--c-subtle)' }}>No listening data yet.</p>
      )}

      {tracks && tracks.length > 0 && (
        <ul className="space-y-3">
          {tracks.map((t, i) => (
            <li key={i}>
              <a
                href={t.url}
                target="_blank"
                rel="noopener noreferrer"
                data-hover
                className="flex items-center gap-3 group"
              >
                <span className="text-[10px] font-mono w-3 shrink-0" style={{ color: 'var(--c-subtle)' }}>
                  {i + 1}
                </span>
                {t.albumArt && (
                  <img src={t.albumArt} alt="" className="w-9 h-9 rounded shrink-0 object-cover" />
                )}
                <span className="min-w-0">
                  <span
                    className="block text-xs font-medium truncate group-hover:text-accent transition-colors duration-150"
                    style={{ color: 'var(--c-text)' }}
                  >
                    {t.name}
                  </span>
                  <span className="block text-[11px] truncate" style={{ color: 'var(--c-subtle)' }}>
                    {t.artist}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
