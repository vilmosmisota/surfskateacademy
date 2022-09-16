import MainHeader from "../../components/header/MainHeader";
import PostPreview from "../../components/post/PostPreview";
import { IHighlights, IImage } from "../../interfaces";

export default function HighlightsView({
  highlights,
}: {
  highlights: IHighlights[];
}) {
  const featuredItem = highlights.filter(
    (item) => item.fields.isFeatured === true
  );
  const posts = highlights.filter(
    (item) =>
      item.fields.isFeatured === false ||
      typeof item.fields.isFeatured === "undefined"
  );
  return (
    <>
      <MainHeader
        title={featuredItem[0].fields.title}
        image={featuredItem[0].fields.featuredImage as IImage}
        link={`/highlights/${featuredItem[0].fields.slug}`}
        linkTheme="secondary-btn"
      />
      <main className=" max-w-screen-lg mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center grid gap-4 px-4 lg:px-0 ">
        {posts.map((item) => {
          return <PostPreview key={item.sys.createdAt} item={item} />;
        })}
      </main>
    </>
  );
}
