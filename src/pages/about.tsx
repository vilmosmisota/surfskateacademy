import { GetStaticProps } from "next";
import { IAboutContent } from "../interfaces";
import { contentApi } from "../libs/contentful";
import AboutView from "../views/about/About.view";

export default function About({
  aboutContent,
}: {
  aboutContent: IAboutContent;
}) {
  return <AboutView aboutContent={aboutContent} />;
}

export const getStaticProps: GetStaticProps = async () => {
  const content = await contentApi
    .getEntries({ content_type: "pageAbout" })
    .catch((err) => {
      throw new Error(err as string);
    });

  if (!content) {
    return { notFound: true };
  }

  const aboutContent = content.items[0].fields as IAboutContent;

  return {
    props: { aboutContent },
  };
};
