import "@/styles/globals.css";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/context/ThemeContext";
import ThemeToggle from "@/components/ThemeToggle";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" key="viewport" />
      </Head>
      <Component {...pageProps} />
      <ThemeToggle />
      <Analytics />
    </ThemeProvider>
  );
}
