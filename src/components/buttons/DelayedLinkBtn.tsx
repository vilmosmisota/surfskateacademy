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
  const [isClicked, setClicked] = useState(false);

  useEffect(() => {
    if (isClicked === false) return;

    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0 });
    }, 490);
    return () => {
      clearTimeout(timer);
      setClicked(false);
    };
  }, [isClicked]);

  const handleClick = (event: SyntheticEvent) => {
    event.preventDefault();
    router
      .push(href, undefined, { scroll: false })
      .catch((err) => console.error(err));
    setClicked(true);
  };
  return (
    <button className={`btn ${theme} `} onClick={handleClick}>
      {children}
    </button>
  );
}
