import ReactMarkdown from "react-markdown";
import MainHeader from "../../components/header/MainHeader";
import Mainintro from "../../components/intro/MainIntro";
import { IClassesContent } from "../../interfaces";
import CallToAction from "../home/CallToAction";
import ContentsBlock from "../home/ContentsBlock";

export default function ClassesView({
  classesContent,
}: {
  classesContent: IClassesContent;
}) {
  console.log(classesContent);
  return (
    <>
      <MainHeader
        image={classesContent.header.fields.image}
        title={classesContent.header.fields.heading}
      />
      <main>
        <Mainintro intro={classesContent.intro} />
        <section className="max-w-xl mx-auto px-4 md:px-0 mb-8 md:mb-16">
          <ReactMarkdown>{classesContent.introContent}</ReactMarkdown>
        </section>
        <ContentsBlock
          theme="light"
          contentsBlock={classesContent.contentBlock}
        />
        <CallToAction callToAction={classesContent.cta} />
      </main>
    </>
  );
}
