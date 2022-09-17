import MainHeader from "../../components/header/MainHeader";
import Mainintro from "../../components/intro/MainIntro";
import { IHomeContent } from "../../interfaces";
import Highlights from "./Highlights";
import ContentsBlock from "./ContentsBlock";
import Supporter from "./Supporter";
import CallToAction from "./CallToAction";

import ShortBio from "./ShortBio";

export default function HomeView({
  homeContent,
}: {
  homeContent: IHomeContent;
}) {
  const highlights = homeContent.highlights.slice(0, 6);
  return (
    <>
      <MainHeader
        title={homeContent.header.fields.heading}
        image={homeContent.header.fields.image}
      />
      <Supporter />
      <main>
        <Mainintro intro={homeContent.intro} />
        <ContentsBlock theme="dark" contentsBlock={homeContent.carousel} />
        <CallToAction callToAction={homeContent.callToAction} />
        <Highlights highlights={highlights} />
        <ShortBio shortBio={homeContent.shortBio} />
      </main>
    </>
  );
}
