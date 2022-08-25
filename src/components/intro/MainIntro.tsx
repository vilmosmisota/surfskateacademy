import { IIntro } from "../../interfaces";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

export default function Mainintro({ intro }: { intro: IIntro }) {
  return (
    <section className="px-4 mb-10 py-5 mx-4 md:py-10 lg:mx-auto rounded-lg lg:px-0 max-w-screen-lg bg-darkBlue text-center md:mb-20 min-h-[200px] flex items-center justify-center flex-col">
      <ReactMarkdown className="intro mb-5">
        {intro.fields.introText}
      </ReactMarkdown>
      <Link href={intro.fields.buttonDestination}>
        <button className="btn bg-orange">{intro.fields.buttonLabel}</button>
      </Link>
    </section>
  );
}
