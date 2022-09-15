import { useRouter } from "next/router";
import { SyntheticEvent, useEffect, useState } from "react";

type DelayedLinkBtnProps = {
  children: string;
  href: string;
  theme: string;
};

export default function DelayedLinkBtn({
  children,
  href,
  theme,
}: DelayedLinkBtnProps) {
  const router = useRouter();
  const [isRouteChanged, setRouteChanged] = useState(false);

  useEffect(() => {
    if (isRouteChanged === false) return;

    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0 });
    }, 400);
    return () => {
      clearTimeout(timer);
    };
  }, [isRouteChanged]);

  useEffect(() => {
    router.events.on("routeChangeComplete", () => setRouteChanged(true));
    return () => {
      router.events.off("routeChangeComplete", () => setRouteChanged(false));
    };
  }, []);

  const handleClick = (event: SyntheticEvent) => {
    event.preventDefault();
    router
      .push(href, undefined, { scroll: false })
      .catch((err) => console.error(err));
  };
  return (
    <button className={`btn ${theme} `} onClick={handleClick}>
      {children}
    </button>
  );
}
