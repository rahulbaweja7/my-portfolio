import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('theme')||((window.matchMedia('(prefers-color-scheme:dark)').matches)?'dark':'light');document.documentElement.classList.add(t);}catch(e){document.documentElement.classList.add('dark');}})();` }} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
