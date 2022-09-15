import Image from "next/future/image";
import ReactMarkdown from "react-markdown";
import { IHighlightsPost } from "../../interfaces";

export default function HighlightPost({ post }: { post: IHighlightsPost }) {
  return (
    <>
      <header className="mt-4 relative  max-w-screen-lg mx-auto  ">
        <div className="h-[250px] w-full px-4 lg:px-0 brightness-50">
          <Image
            src={`https:${post.featuredImage.fields.file.url}`}
            width={post.featuredImage.fields.file.details.image.width}
            height={post.featuredImage.fields.file.details.image.height}
            alt={""}
            className={" rounded-lg cover-img"}
          />
        </div>
        <div className="absolute top-2/4 left-2/4 -translate-y-1/2 -translate-x-1/2 text-center">
          <h1 className="text-orange max-w-[300px]">{post.title}</h1>
        </div>
      </header>
      <main className="mx-auto lg:px-0 max-w-screen-lg  my-10 md:mb-20">
        <section className="mb-10">
          <ReactMarkdown className="markdown-text max-w-2xl mx-auto px-4">
            {post.mainText}
          </ReactMarkdown>
        </section>
        <section className="columns-2 md:columns-2 lg:columns-3 gap-2 px-4 lg:px-0">
          {post.imagelists?.map((img) => {
            return (
              <div key={img.fields.file.url} className="mb-2">
                <Image
                  src={`https:${img.fields.file.url}`}
                  width={img.fields.file.details.image.width}
                  height={img.fields.file.details.image.height}
                  alt={img.fields.title}
                  className="rounded-lg res-img"
                  sizes="(max-width: 1023px) 49vw,
                    33vw"
                />
              </div>
            );
          })}
        </section>
      </main>
    </>
  );
}
