import HomeView from "../views/home/Home.view";
import { GetStaticProps } from "next";
import { contentApi } from "../libs/contentful";
import { IHomeContent } from "../interfaces";

export type HomeProps = {
  homeContent: IHomeContent;
};

export default function Home({ homeContent }: HomeProps) {
  return <HomeView homeContent={homeContent} />;
}

export const getStaticProps: GetStaticProps = async () => {
  const content = await contentApi
    .getEntries({ content_type: "pageHome" })
    .catch((err) => {
      throw new Error(err as string);
    });

  if (!content) {
    return { notFound: true };
  }

  const homeContent = content.items[0].fields as IHomeContent;

  return {
    props: { homeContent },
  };
};
