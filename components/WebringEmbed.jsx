import { useEffect, useRef } from 'react';
import styles from '@/styles/Home.module.css';

// ASU webring: https://github.com/rahulbaweja7/webring
const SRC = 'https://ring.rahulbaweja.workers.dev/embed.js';

export default function WebringEmbed({ member }) {
  const ref = useRef(null);

  // The server-rendered <script> covers a full page load. React never executes a script it inserts
  // during client-side navigation, so load it again if the widget hasn't drawn into the div.
  // embed.js ignores a div that already has a shadow root, so running it twice is harmless.
  useEffect(() => {
    if (ref.current.shadowRoot) return;
    const script = document.createElement('script');
    script.src = SRC;
    script.async = true;
    document.body.appendChild(script);
    return () => script.remove();
  }, []);

  return (
    <>
      <div ref={ref} className={styles.ring} data-ring="" data-member={member} />
      <script src={SRC} async />
    </>
  );
}
