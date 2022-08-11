import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import burger from "../../assets/icons/burger.svg";
import logo from "../../assets/icons/logo.svg";
import Navlinks from "./Navlinks";
import { motion } from "framer-motion";
import closeIcon from "../../assets/icons/close.svg";
import fb from "../../assets/icons/fb-black.svg";
import ig from "../../assets/icons/ig-black.svg";
import youtube from "../../assets/icons/youtube-black.svg";

export default function Navbar() {
  const [isOpen, setOpen] = useState(false);
  const paths = ["about", "classes", "gallery", "booking"];

  return (
    <nav className="fixed top-0 z-50 h-14 w-full py-5 md:bg-lightBlue md:bg-opacity-80 md:backdrop-blur-lg ">
      <div className="container mx-auto flex h-full max-w-screen-lg items-center justify-between  px-4 lg:px-0 font-sans font-semibold uppercase">
        <Link href="/" passHref>
          <div className="w-20 md:w-24 cursor-pointer">
            <Image src={logo as string} alt="logo" layout="responsive" />
          </div>
        </Link>
        <motion.ul
          className={`absolute bg-lightBlue bg-opacity-80 backdrop-blur-lg top-0 left-0 z-10 flex h-screen w-screen flex-col items-center justify-evenly  md:relative md:top-0 md:bg-opacity-0 md:backdrop-blur-0 md:h-auto md:max-w-[500px] md:!translate-x-0 md:flex-row md:justify-between md:pl-5 md:opacity-100`}
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

          {isOpen && (
            <article className=" md:min-h-[300px] py-5  md:min-w-full md:max-w-[290px] rounded-lg min-h-[200px] flex align-middle justify-center flex-col mb-5">
              <div className="flex justify-center mb-5">
                {icons.map((icon) => (
                  <a
                    href={icon.link}
                    className=""
                    target="_blank"
                    rel="noopener noreferrer"
                    key={icon.link}
                  >
                    <div className="w-12 px-2 ">
                      <Image
                        src={icon.icon}
                        alt={icon.alt}
                        layout="responsive"
                      />
                    </div>
                  </a>
                ))}
              </div>
              <a
                className="block text-black lowercase tracking-wider underline underline-offset-4"
                href="mailto: info@thesurfskateacademy.com"
              >
                info@thesurfskateacademy.com
              </a>
            </article>
          )}

          {isOpen && (
            <button
              className="w-8 absolute right-2 top-2"
              onClick={() => {
                setOpen(false);
              }}
            >
              <Image
                src={closeIcon as string}
                alt="close"
                layout="responsive"
              />
            </button>
          )}
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

const navAnimation = {
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

const icons = [
  {
    icon: fb as string,
    link: "https://www.facebook.com/thesurfskateacademyscotland",
    alt: "facebook logo",
  },
  {
    icon: ig as string,
    link: "https://www.instagram.com/thesurfskateacademy/",
    alt: "instagram logo",
  },
  {
    icon: youtube as string,
    link: "https://www.youtube.com/channel/UC1NVqnEwdxiT0MrnYtJFJGw/featured",
    alt: "youtube logo",
  },
];
