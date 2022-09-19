import Link from "next/link";
import { useRouter } from "next/router";
import ActiveRouteBg from "./ActiveRouteBg";

type NavlinksProps = {
  path: string;
  handleClick?: () => void;
};

export default function Navlinks({ path, handleClick }: NavlinksProps) {
  const route = useRouter();
  return (
    <li
      key={path}
      className="flex relative w-full justify-center  py-5 md:w-fit  md:py-0 "
    >
      <Link href={`/${path}`} passHref>
        <a
          onClick={handleClick}
          className={`${
            route.pathname === `/${path}` ? "" : ""
          } font-sans font-semibold uppercase tracking-wider md:hover:text-lightAmber`}
        >
          {path}
        </a>
      </Link>
      <ActiveRouteBg path={`/${path}`} />
    </li>
  );
}
