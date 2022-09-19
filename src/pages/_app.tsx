import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout/Layout";
import { useEffect } from "react";
import { supabase } from "../libs/supabase";
import { AuthChangeEvent, Session } from "@supabase/supabase-js";
import PageAnimation from "../components/layout/PageAnimation";
import Seo from "../components/seo/Seo";

function MyApp({ Component, pageProps, router }: AppProps) {
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        async function handleAuthChange(
          event: AuthChangeEvent,
          session: Session | null
        ) {
          await fetch("/api/auth", {
            method: "POST",
            headers: new Headers({ "Content-Type": "application/json" }),
            credentials: "same-origin",
            body: JSON.stringify({ event, session }),
          });
        }

        const res = handleAuthChange(event, session);
      }
    );
    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  return (
    <>
      <Seo />
      <Layout>
        <PageAnimation>
          <Component {...pageProps} key={router.route} />
        </PageAnimation>
      </Layout>
    </>
  );
}

export default MyApp;
