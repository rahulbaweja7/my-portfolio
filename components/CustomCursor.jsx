import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const mouse   = useRef({ x: -200, y: -200 });
  const ring    = useRef({ x: -200, y: -200 });
  const raf     = useRef(null);
  const [hovering, setHovering] = useState(false);
  const [mounted,  setMounted]  = useState(false);

  useEffect(() => {
    setMounted(true);

    const lerp = (a, b, t) => a + (b - a) * t;

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
      }
    };

    const tick = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.1);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.1);
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(calc(${ring.current.x}px - 50%), calc(${ring.current.y}px - 50%))`;
      }
      raf.current = requestAnimationFrame(tick);
    };

    const onOver = (e) => {
      if (e.target.closest('a, button, [data-hover]')) setHovering(true);
    };
    const onOut = (e) => {
      if (e.target.closest('a, button, [data-hover]')) setHovering(false);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout',  onOut);
    raf.current = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout',  onOut);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  if (!mounted) return null;

  const dotSize  = hovering ? 10 : 5;
  const ringSize = hovering ? 42 : 28;

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: dotSize,
          height: dotSize,
          background: hovering ? '#f97316' : '#efefef',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 999999,
          transition: 'width 0.2s, height 0.2s, background 0.2s',
          willChange: 'transform',
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: ringSize,
          height: ringSize,
          border: `1.5px solid ${hovering ? 'rgba(249,115,22,0.7)' : 'rgba(239,239,239,0.22)'}`,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 999998,
          transition: 'width 0.3s ease, height 0.3s ease, border-color 0.3s ease',
          willChange: 'transform',
        }}
      />
    </>
  );
}
