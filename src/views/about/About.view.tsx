import Image from "next/future/image";
import ReactMarkdown from "react-markdown";
import MainHeader from "../../components/header/MainHeader";
import Mainintro from "../../components/intro/MainIntro";
import { IAboutContent } from "../../interfaces";

export default function AboutView({
  aboutContent,
}: {
  aboutContent: IAboutContent;
}) {
  return (
    <>
      <MainHeader
        title={aboutContent.header.fields.heading}
        image={aboutContent.header.fields.image}
      />
      <main>
        <Mainintro intro={aboutContent.intro} />
        <section className="max-w-xl mx-auto px-4 md:px-0 mb-8 md:mb-16">
          <ReactMarkdown>{aboutContent.introContentBlock}</ReactMarkdown>
        </section>
        <section className="max-w-xl mx-auto px-4 md:px-0 mb-8 md:mb-16">
          <Image
            src={`https:${aboutContent.image1.fields.file.url}`}
            width={aboutContent.image1.fields.file.details.image.width}
            height={aboutContent.image1.fields.file.details.image.height}
            alt={aboutContent.image1.fields.title}
            className=" res-img"
            sizes="(max-width: 1023px) 90vw,
                    70vw"
          />
        </section>
        <section className="max-w-xl mx-auto px-4 md:px-0 mb-8 md:mb-16">
          <ReactMarkdown className="markdown-text">
            {aboutContent.mainContentBlock}
          </ReactMarkdown>
        </section>
        <section className="max-w-xl mx-auto px-4 md:px-0 mb-8 md:mb-16">
          <Image
            src={`https:${aboutContent.image2.fields.file.url}`}
            width={aboutContent.image2.fields.file.details.image.width}
            height={aboutContent.image2.fields.file.details.image.height}
            alt={aboutContent.image2.fields.title}
            className=" res-img"
            sizes="(max-width: 1023px) 90vw,
                    70vw"
          />
        </section>
        <section className="max-w-xl mx-auto px-4 md:px-0 mb-8 md:mb-16">
          <ReactMarkdown className="markdown-text">
            {aboutContent.outroContentBlock}
          </ReactMarkdown>
        </section>
        <section className="max-w-xl mx-auto px-4 md:px-0 mb-10 md:mb-20">
          <Image
            src={`https:${aboutContent.image3.fields.file.url}`}
            width={aboutContent.image3.fields.file.details.image.width}
            height={aboutContent.image3.fields.file.details.image.height}
            alt={aboutContent.image3.fields.title}
            className=" res-img"
            sizes="(max-width: 1023px) 90vw,
                    70vw"
          />
        </section>
      </main>
    </>
  );
}
