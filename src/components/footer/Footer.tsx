import Image from "next/future/image";
import logoOrange from "../../assets/icons/logo-orange.svg";
import fb from "../../assets/icons/fb.svg";
import ig from "../../assets/icons/ig.svg";
import youtube from "../../assets/icons/youtube.svg";
import Link from "next/link";

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

const midPaths = [
  {
    label: "review",
    link: "/booking/details/review",
  },
  {
    label: "prices",
    link: "/booking/details/prices",
  },
  {
    label: "faq",
    link: "/booking/details/faq",
  },
  {
    label: "T's and C's",
    link: "/booking/details/terms-and-conditions",
  },
];

const sidePaths = [
  {
    label: "about",
    link: "/about",
  },
  {
    label: "highlights",
    link: "/highlights",
  },
  {
    label: "classes",
    link: "/classes",
  },
];

export default function Footer() {
  return (
    <footer className="bg-darkBlue">
      <section className="pt-10 mx-4 lg:mx-auto lg:px-0 max-w-screen-lg text-center md:grid-cols-3 md:grid md:justify-items-center gap-5 ">
        <article className="border-2 md:min-h-[300px] py-5 border-orange md:min-w-full md:max-w-[290px] rounded-lg min-h-[200px] flex align-middle justify-center flex-col mb-5">
          <div className="flex justify-center mb-5">
            {icons.map((icon) => (
              <a
                href={icon.link}
                className=""
                target="_blank"
                rel="noopener noreferrer"
                key={icon.link}
              >
                <div className="w-12 px-2">
                  <Image src={icon.icon} alt={icon.alt} />
                </div>
              </a>
            ))}
          </div>
          <a
            className="block text-light"
            href="mailto: info@thesurfskateacademy.com"
          >
            info@thesurfskateacademy.com
          </a>
        </article>
        <article className="border-2 md:min-h-[300px] py-5 border-orange md:min-w-full md:max-w-[290px] rounded-lg min-h-[200px] flex align-middle justify-center mb-5">
          <ul className="list-none flex flex-col justify-evenly">
            {midPaths.map((item) => (
              <li
                key={item.link}
                className="text-light font-medium uppercase tracking-wide"
              >
                <Link href={item.link} passHref scroll={true}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </article>
        <article className="border-2 md:min-h-[300px] py-5 border-orange md:min-w-full md:max-w-[290px] rounded-lg min-h-[200px] flex align-middle justify-center mb-5">
          <ul className="list-none flex flex-col justify-evenly">
            <li className="text-light font-medium uppercase tracking-wide">
              <a
                href="https://booking.lostshore.com/surfskate"
                target="_blank"
                rel="noreferrer"
              >
                Booking
              </a>
            </li>
            {sidePaths.map((item) => (
              <li
                key={item.link}
                className="text-light font-medium uppercase tracking-wide"
              >
                <Link href={item.link} passHref scroll={true}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </article>
      </section>
      <div className="w-52 mx-auto mb-10">
        <Image
          src={logoOrange as string}
          alt="logo"
          className="w-full h-auto"
        />
      </div>
      <div className="mx-4 lg:mx-auto lg:px-0 max-w-screen-lg pb-5 md: flex justify-between">
        <small className="block text-light">
          copyright © from 2021 <br /> The SurfSkate Academy All rights reserved
        </small>
        <br />
        <small className="pl-2 block text-light">
          website built by Vilmos Misota
        </small>
      </div>
    </footer>
  );
}
