import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function BookingBar() {
  return (
    <section className="h-[120px] md:h-[100px] bg-orange rounded-t-lg py-2 px-5 flex flex-col-reverse items-center justify-evenly md:justify-evenly md:flex-row">
      <ul className="flex items-center w-full max-w-xs justify-between md:justify-evenly">
        {links.map((item) => {
          return <LinkItem key={item.link} item={item} />;
        })}
      </ul>
    </section>
  );
}

const links = [
  {
    label: "back",
    link: "/booking",
  },
  {
    label: "prices",
    link: "/booking/prices",
  },
  {
    label: "faq",
    link: "/booking/faq",
  },
  {
    label: "T's and C's",
    link: "/booking/terms-and-conditions",
  },
];

type LinkItemProps = {
  item: {
    label: string;
    link: string;
  };
};
const LinkItem = ({ item }: LinkItemProps) => {
  const [isActive, setActive] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (router.pathname !== item.link) return;
    setActive(true);

    return () => setActive(false);
  }, [isActive, router, item.link]);

  return (
    <li
      key={item.link}
      className={` ${
        isActive ? "text-red" : "text-black"
      } text-sm uppercase underline font-sans tracking-wider font-bold`}
    >
      <Link href={item.link}>{item.label}</Link>
    </li>
  );
};
