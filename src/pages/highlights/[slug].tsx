import { GetStaticPaths, GetStaticProps } from "next";
import { IHighlightsPost, IHighlights } from "../../interfaces";
import { contentApi } from "../../libs/contentful";
import HighlightPost from "../../views/dynamicPath/HighlightPost.view";

export default function Post({ post }: { post: IHighlightsPost }) {
  return <HighlightPost post={post} />;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };
  const content = await contentApi
    .getEntries({
      content_type: "highlights",
      "fields.slug": slug,
    })
    .catch((err) => {
      throw new Error(err as string);
    });

  if (!content) {
    return { notFound: true };
  }

  const post = content.items[0].fields as IHighlightsPost;

  return { props: { post } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const contents = await contentApi
    .getEntries({
      content_type: "highlights",
    })
    .catch((err) => {
      console.error(err);
      return undefined;
    });

  if (typeof contents === "undefined") {
    return {
      paths: [{ params: {} }],
      fallback: false,
    };
  }
  const highlights = contents.items as IHighlights[];
  const paths = highlights.map((item) => {
    return {
      params: { slug: item.fields.slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
};
