import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="theme-color" content="#0f0f0f" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme')||((window.matchMedia('(prefers-color-scheme:dark)').matches)?'dark':'light');document.documentElement.classList.add(t);var m=document.querySelector('meta[name=theme-color]');if(m)m.setAttribute('content',t==='light'?'#f5f3ef':'#0f0f0f');}catch(e){document.documentElement.classList.add('dark');}})();` }} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
