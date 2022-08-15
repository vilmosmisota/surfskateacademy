import { useEffect, useState } from "react";
import { useCallback } from "react";
import { useRouter } from "next/router";

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    function handleResize() {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};

export function useLogger(value: unknown) {
  useEffect(() => {
    console.log(value);
  }, [value]);
}

export function useRouterRefresh() {
  const { asPath, replace } = useRouter();

  return useCallback(() => replace(asPath), [asPath, replace]);
}
