import Link from "next/link";
import { useRouter } from "next/router";

type NavlinksProps = {
  path: string;
  handleClick?: () => void;
};

export default function Navlinks({ path, handleClick }: NavlinksProps) {
  const route = useRouter();
  return (
    <li
      key={path}
      className="flex w-full justify-center  border-opacity-5 py-5 md:w-fit md:border-none md:py-0 "
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
    </li>
  );
}
