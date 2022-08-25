import Link from "next/link";
import ReactMarkdown from "react-markdown";
import MainHeader from "../../components/header/MainHeader";
import Mainintro from "../../components/intro/MainIntro";
import SliderClick from "../../components/slider/SliderClick";

import { IHomeContent } from "../../interfaces";
import Highlights from "./Highlights";

export default function HomeView({
  homeContent,
}: {
  homeContent: IHomeContent;
}) {
  return (
    <>
      <MainHeader header={homeContent.header} />
      <section className="px-4 pt-2 -mt-10 mb-10 md:-mt-20 mx-auto lg:px-0 max-w-screen-lg text-right md:mb-14">
        <a
          href="https://yowsurf.com/"
          className="uppercase font-sans font-black cursor-pointer text-red"
          target="_blank"
          rel="noopener noreferrer"
        >
          Supported by <span className="text-black">YOW</span>
        </a>
      </section>
      <main>
        <Mainintro intro={homeContent.intro} />
        <SliderClick carousel={homeContent.carousel} />

        <section className="px-4 mb-10 py-5 mx-4 md:py-10 lg:mx-auto rounded-lg lg:px-0 max-w-screen-lg bg-orange text-center md:mb-20 min-h-[200px] flex items-center justify-center flex-col">
          <ReactMarkdown className="cta-text mb-5">
            {homeContent.callToAction.fields.description}
          </ReactMarkdown>
          <Link href={homeContent.callToAction.fields.buttonDestination}>
            <button className="btn border-2 border-black text-black">
              {homeContent.callToAction.fields.buttonLabel}
            </button>
          </Link>
        </section>
        <Highlights highlights={homeContent.highlights} />
      </main>
    </>
  );
}
