import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function BookingBar() {
  return (
    <section className="h-[120px] md:h-[100px] bg-orange rounded-t-lg py-2 px-5 flex flex-col items-center justify-evenly md:justify-evenly md:flex-row">
      <div className="self-start md:self-center border-2 rounded-lg ">
        <a
          className="uppercase text-sm py-2 font-bold px-1"
          href="https://booking.lostshore.com/surfskate"
          target="_blank"
          rel="noreferrer"
        >
          Booking
        </a>
      </div>
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
  {
    label: "Review",
    link: "/booking/details/review",
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
    if (router.query.page !== item.link.split("/")[3]) {
      setActive(false);
      return;
    }

    setActive(true);
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
