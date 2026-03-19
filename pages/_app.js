import "@/styles/globals.css";
import CustomCursor from "@/components/CustomCursor";
import { ThemeProvider } from "@/context/ThemeContext";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <CustomCursor />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
