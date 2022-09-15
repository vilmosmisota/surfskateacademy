import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout/Layout";
import { useEffect } from "react";
import { supabase } from "../libs/supabase";
import { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { AnimatePresence, motion } from "framer-motion";

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
    <Layout>
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={router.route}
          initial="pageInitial"
          animate="pageAnimate"
          exit="pageExit"
          variants={{
            pageInitial: { opacity: 0, transition: { duration: 0.5 } },
            pageAnimate: { opacity: 1, transition: { duration: 0.5 } },
            pageExit: {
              opacity: 0,
              transition: { duration: 0.5 },
            },
          }}
        >
          <Component {...pageProps} key={router.route} />
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
}

export default MyApp;
