import { useEffect } from "react";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    // don’t run redirect on /auth itself
    if (router.pathname === "/auth") return;

    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/auth");
    }
  }, [router]);

  return <Component {...pageProps} />;
}
