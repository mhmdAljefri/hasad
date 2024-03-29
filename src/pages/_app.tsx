import "@/styles/globals.css";
import useTranslation from "next-translate/useTranslation";
import type { AppProps } from "next/app";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const { t, lang } = useTranslation("common");

  useEffect(() => {
    const htmlTag = document.documentElement;
    htmlTag.lang = lang;
    htmlTag.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  return <Component {...pageProps} />;
}
