import { GetServerSideProps } from "next";
import { IHighlights } from "../interfaces";
import { contentApi } from "../libs/contentful";
import HighlightsView from "../views/highlights/HighlightsView";

export default function Highlights({
  highlights,
}: {
  highlights: IHighlights[];
}) {
  return <HighlightsView highlights={highlights} />;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const content = await contentApi
    .getEntries({ content_type: "highlights" })
    .catch((err) => {
      throw new Error(err as string);
    });

  if (!content) {
    return { notFound: true };
  }

  const highlights = content.items as IHighlights[];

  return {
    props: { highlights },
  };
};
