/* eslint-disable @typescript-eslint/no-misused-promises */
import Image from "next/image";
import Link from "next/link";
import { AdminProps } from "../../pages/admin";
import inbox from "../../assets/icons/inbox.svg";
import calendar from "../../assets/icons/calendar.svg";
import { useState } from "react";
import { resolve } from "path";

export default function AdminView({ count }: AdminProps) {
  return (
    <main className="mt-16 relative flex-wrap  max-w-screen-lg mx-auto px-4 lg:px-0 min-h-[500px] flex items-center">
      <section className="w-full  max-w-2xl mx-auto flex flex-col md:flex-row justify-evenly mb-10">
        <Link href="/admin/bookings?page=1">
          <div className="text-center relative shadow cursor-pointer min-w-[300px] bg-orange p-5 rounded-lg mb-5 md:mb-0">
            <h3 className="uppercase tracking-wider font-black mb-2">
              Bookings
            </h3>
            <div className="w-16 mx-auto text-center">
              <Image
                src={inbox as string}
                layout="responsive"
                alt="inbox logo"
              />
            </div>
            <div className="absolute -top-2 -right-2 bg-red w-10 h-10 flex items-center justify-center  rounded-lg">
              <p className="font-black text-lg p-0 m-0 h-min">{count}</p>
            </div>
          </div>
        </Link>
        <Link href="/admin/classes">
          <div className="text-center shadow cursor-pointer min-w-[300px] bg-darkBlue p-5 rounded-lg">
            <h3 className="uppercase text-light tracking-wider font-black mb-2">
              Classes
            </h3>
            <div className="w-16 mx-auto text-center">
              <Image
                src={calendar as string}
                layout="responsive"
                alt="inbox logo"
                className=""
              />
            </div>
          </div>
        </Link>
      </section>
      <section className="w-full ">
        <h3 className="text-center">Revalidate</h3>
        <ul className="max-w-[600px] mx-auto bg-beige p-4 rounded-lg shadow">
          {revalidatePaths.map((path) => {
            return <Paths path={path} key={path.label} />;
          })}
        </ul>
      </section>
    </main>
  );
}

const revalidatePaths = [
  {
    label: "home",
    path: "/",
  },
  {
    label: "about",
    path: "/about",
  },
  {
    label: "classes",
    path: "/classes",
  },
  {
    label: "prices",
    path: "/booking/details/prices",
  },
  {
    label: "faq",
    path: "/booking/details/faq",
  },
  {
    label: "terms",
    path: "/booking/details/terms-and-conditions",
  },
  {
    label: "review",
    path: "/booking/details/review",
  },
];

const Paths = ({ path }: { path: { label: string; path: string } }) => {
  const [isLoading, setLoading] = useState(false);

  const revalidateOnClick = async (path: string) => {
    setLoading(true);
    const token = process.env.NEXT_PUBLIC_REVALIDATE_TOKEN as string;
    const res = await fetch(`/api/revalidate?secret=${token}&url=${path}`);
    if (res.status === 200) {
      setLoading(false);
      alert("successfully revalidated the page");
    } else {
      alert("opps something went wrong");
    }
  };

  return (
    <li key={path.label} className="border-2 mb-3 p-4 rounded-lg">
      <button
        className="uppercase w-full font-semibold tracking-wider"
        onClick={() => revalidateOnClick(path.path)}
      >
        {isLoading ? "loading..." : path.label}
      </button>
    </li>
  );
};
