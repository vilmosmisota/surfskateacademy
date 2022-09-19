import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useWindowDimensions } from "../../utils/hooks";

export default function ActiveRouteBg({ path }: { path: string }) {
  const router = useRouter();
  const [isActive, setActive] = useState(false);
  const [isShow, setShow] = useState(false);
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (router.pathname !== path) {
      setActive(false);
      return;
    }

    setActive(true);
  }, [router.pathname, path]);

  useEffect(() => {
    if (router.pathname === "/" && width < 768) {
      setShow(false);
      return;
    }
    setShow(true);
  }, [width, router.pathname]);

  return (
    <>
      {isActive && isShow && (
        <motion.div
          layoutId={width > 767 ? "active-route" : undefined}
          className="absolute z-[-1] w-[50%]  md:w-[120%] h-7 bg-orange rounded-full filter blur-sm "
        ></motion.div>
      )}
    </>
  );
}
