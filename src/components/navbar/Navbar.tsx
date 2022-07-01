import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import burger from "../../assets/icons/burger.svg";
import logo from "../../assets/icons/logo.svg";
import Navlinks from "./Navlinks";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isOpen, setOpen] = useState(false);
  const paths = ["about", "classes", "gallery", "booking"];

  return (
    <nav className="fixed top-0 z-50 h-14 w-full py-5">
      <div className="container mx-auto flex h-full max-w-screen-lg items-center justify-between  px-4 lg:px-0 font-sans font-semibold uppercase">
        <div className="w-20 md:w-24 cursor-pointer">
          <Link href="/" passHref>
            <Image src={logo as string} alt="logo" layout="responsive" />
          </Link>
        </div>
        <motion.ul
          className={`absolute bg-lightBlue top-14 left-0 z-10 flex h-[70vh] w-screen flex-col items-center justify-evenly  md:relative md:top-0 md:bg-opacity-0 md:h-auto md:max-w-[500px] md:!translate-x-0 md:flex-row md:justify-between md:pl-5 md:opacity-100`}
          animate={isOpen ? "open" : "closed"}
          initial="initial"
          variants={navAnimation}
        >
          {paths.map((path) => {
            return (
              <Navlinks
                path={path}
                key={path}
                handleClick={() => setOpen(false)}
              />
            );
          })}
        </motion.ul>
        <button
          className="w-7 border-0 focus:border-0 md:hidden"
          onClick={() => setOpen(!isOpen)}
        >
          <Image src={burger as string} alt="logo" layout="responsive" />
        </button>
      </div>
    </nav>
  );
}

export const navAnimation = {
  open: {
    x: 0,
    transition: {
      duration: 1,
      type: "spring",
    },
  },
  closed: { x: 900, transition: { duration: 1, type: "spring" } },
  initial: { x: 900 },
};
