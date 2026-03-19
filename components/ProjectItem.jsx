import React, { useRef } from 'react';
import { FaGithub, FaExternalLinkAlt, FaTrophy } from 'react-icons/fa';

function useTilt(strength = 10) {
  const ref = useRef(null);

  const onMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    ref.current.style.transition = 'transform 0.08s ease-out';
    ref.current.style.transform  =
      `perspective(700px) rotateY(${x * strength}deg) rotateX(${-y * strength}deg) translateZ(6px)`;
  };

  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.transition = 'transform 0.5s ease';
    ref.current.style.transform  = 'perspective(700px) rotateY(0deg) rotateX(0deg) translateZ(0)';
  };

  return { ref, onMouseMove: onMove, onMouseLeave: onLeave };
}

const TechPill = ({ label }) => (
  <span className="text-xs px-2 py-1 rounded font-mono text-text-subtle border border-dark-border bg-dark">
    {label}
  </span>
);

const Links = ({ githubUrl, liveUrl }) => (
  <div className="flex items-center gap-5 pt-4 border-t border-dark-border">
    {githubUrl && githubUrl !== '#' && (
      <a href={githubUrl} target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-xs text-text-subtle hover:text-[#efefef] transition-colors duration-200">
        <FaGithub size={14} /> Code
      </a>
    )}
    {liveUrl && (
      <a href={liveUrl} target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-xs text-text-subtle hover:text-accent transition-colors duration-200">
        <FaExternalLinkAlt size={11} /> Live
      </a>
    )}
  </div>
);

const ProjectItem = ({ index, title, description, tech = [], githubUrl, liveUrl, badge, featured }) => {
  const tilt = useTilt(featured ? 6 : 10);

  if (featured) {
    return (
      <div {...tilt} className="card-interactive rounded-lg p-7 group border border-dark-border" style={{ willChange: 'transform' }}>
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <span className="text-xs font-mono text-text-subtle block mb-2">01 — featured</span>
            <h3 className="text-[#efefef] text-2xl font-medium group-hover:text-accent transition-colors duration-200">
              {title}
            </h3>
          </div>
          {badge && (
            <span className="flex items-center gap-1.5 text-xs font-mono text-accent border border-accent/20 bg-accent/5 px-3 py-1.5 rounded whitespace-nowrap shrink-0">
              <FaTrophy size={10} /> {badge}
            </span>
          )}
        </div>
        <p className="text-text-muted text-sm leading-relaxed mb-6 max-w-2xl">{description}</p>
        <div className="flex flex-wrap gap-2 mb-5">
          {tech.map((t, i) => <TechPill key={i} label={t} />)}
        </div>
        <Links githubUrl={githubUrl} liveUrl={liveUrl} />
      </div>
    );
  }

  return (
    <div
      {...tilt}
      className="card-interactive rounded-lg p-5 group border border-dark-border h-full flex flex-col"
      style={{ willChange: 'transform' }}
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-mono text-text-subtle">
          {String(index + 1).padStart(2, '0')}
        </span>
        {badge && (
          <span className="flex items-center gap-1.5 text-xs font-mono text-accent border border-accent/20 bg-accent/5 px-2 py-1 rounded">
            <FaTrophy size={9} /> {badge}
          </span>
        )}
      </div>
      <h3 className="text-[#efefef] text-lg font-medium mb-2 group-hover:text-accent transition-colors duration-200">
        {title}
      </h3>
      <p className="text-text-muted text-sm leading-relaxed mb-5 flex-1">{description}</p>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {tech.map((t, i) => <TechPill key={i} label={t} />)}
      </div>
      <Links githubUrl={githubUrl} liveUrl={liveUrl} />
    </div>
  );
};

export default ProjectItem;
