import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useLogger } from "../../utils/hooks";

export default function PageAnimation({
  children,
}: JSX.ElementChildrenAttribute) {
  const [isException, setException] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const exceptions = [
      "/booking/faq",
      "/booking/terms-and-conditions",
      "/booking/prices",
    ];

    console.log(router.pathname);

    if (exceptions.includes(router.pathname) === false) return;
    setException(true);

    return () => setException(false);
  }, [router.pathname, isException]);

  useLogger(isException);

  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        key={router.route}
        initial="pageInitial"
        animate="pageAnimate"
        exit="pageExit"
        variants={isException === false ? pageAnimation : undefined}
      >
        <>{children}</>
      </motion.div>
    </AnimatePresence>
  );
}

const pageAnimation = {
  pageInitial: { opacity: 0, transition: { duration: 0.5 } },
  pageAnimate: { opacity: 1, transition: { duration: 0.5 } },
  pageExit: {
    opacity: 0,
    transition: { duration: 0.5 },
  },
};
