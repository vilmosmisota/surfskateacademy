import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Spinner from "../loading/Spinner";

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
  const [isClicked, setClicked] = useState(false);
  const [isLoading, setLoading] = useState(false);
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
    const routeStart = () => {
      if (!isClicked) return;
      setLoading(true);
    };

    const routeComplete = () => {
      setRouteChanged(true);
    };

    const routeFinish = () => {
      setLoading(false);
      setRouteChanged(false);
    };
    router.events.on("routeChangeStart", routeStart);
    router.events.on("routeChangeComplete", routeComplete);

    return () => {
      router.events.off("routeChangeComplete", routeFinish);
    };
  }, [isClicked, router.events]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (event.currentTarget.getAttribute("data-target") === href) {
      setClicked(true);
    }
    router
      .push(href, undefined, { scroll: false })
      .catch((err) => console.error(err));
  };
  return (
    <button
      data-target={href}
      className={`btn ${theme} `}
      onClick={handleClick}
    >
      {isLoading ? (
        <>
          <Spinner /> <span className="text-xs md:text-sm">Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
