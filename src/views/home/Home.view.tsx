import MainHeader from "../../components/header/MainHeader";
import Mainintro from "../../components/intro/MainIntro";
import { IHomeContent } from "../../interfaces";
import Highlights from "./Highlights";
import ContentsBlock from "./ContentsBlock";
import Supporter from "./Supporter";
import CallToAction from "./CallToAction";
import { motion } from "framer-motion";

import ShortBio from "./ShortBio";

export default function HomeView({
  homeContent,
}: {
  homeContent: IHomeContent;
}) {
  return (
    <>
      <MainHeader header={homeContent.header} />
      <Supporter />
      <main>
        <Mainintro intro={homeContent.intro} />
        <ContentsBlock contentsBlock={homeContent.carousel} />
        <CallToAction callToAction={homeContent.callToAction} />
        <Highlights highlights={homeContent.highlights} />
        <ShortBio shortBio={homeContent.shortBio} />
      </main>
    </>
  );
}
