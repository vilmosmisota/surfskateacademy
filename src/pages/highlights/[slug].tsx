import { GetServerSideProps } from "next";
import { IHighlightsPost } from "../../interfaces";
import { contentApi } from "../../libs/contentful";
import HighlightPost from "../../views/dynamicPath/HighlightPost.view";

export default function Post({ post }: { post: IHighlightsPost }) {
  return <HighlightPost post={post} />;
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (typeof query.slug === "undefined") {
    return { notFound: true };
  }
  const content = await contentApi
    .getEntries({
      content_type: "highlights",
      "fields.slug": query.slug,
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
