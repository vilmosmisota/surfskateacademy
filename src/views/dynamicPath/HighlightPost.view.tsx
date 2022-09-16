import Image from "next/future/image";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import SmallHeader from "../../components/header/SmallHeader";
import ImgModal from "../../components/modals/ImgModal";
import { IHighlightsPost, IImage } from "../../interfaces";
import { motion } from "framer-motion";

export default function HighlightPost({ post }: { post: IHighlightsPost }) {
  const [imgToShow, setImgToShow] = useState<IImage | null>(null);
  const [isModalShown, setModalShown] = useState(false);

  const handleClick = (i: number) => {
    setImgToShow(post.imagelists[i]);
    setModalShown(true);
  };

  return (
    <>
      <SmallHeader image={post.previewImage} title={post.title} />
      <main className="mx-auto lg:px-0 max-w-screen-lg  my-10 md:mb-20">
        <section className="mb-10">
          <ReactMarkdown className="markdown-text max-w-2xl mx-auto px-4">
            {post.mainText}
          </ReactMarkdown>
        </section>
        <section className=" columns-2 md:columns-2 lg:columns-4 gap-2 px-4 lg:px-0">
          {post.imagelists?.map((img, i) => {
            return (
              <motion.div
                layoutId={`modal-${img.fields.file.url}`}
                key={img.fields.file.url}
                className="mb-2 cursor-pointer"
                onClick={() => handleClick(i)}
              >
                <Image
                  src={`https:${img.fields.file.url}`}
                  width={img.fields.file.details.image.width}
                  height={img.fields.file.details.image.height}
                  alt={img.fields.title}
                  className="rounded-lg res-img"
                  sizes="(max-width: 1023px) 49vw,
                    20vw"
                />
              </motion.div>
            );
          })}
        </section>
      </main>
      <ImgModal state={isModalShown} handleClick={() => setModalShown(false)}>
        {imgToShow && <ImageModalInner imgToShow={imgToShow} />}
      </ImgModal>
    </>
  );
}

const ImageModalInner = ({ imgToShow }: { imgToShow: IImage }) => {
  const handleImgRatio = (w: number, h: number) => {
    if (w > h) {
      return "max-w-3xl ";
    }
    return "max-w-lg";
  };
  return (
    <motion.div
      layoutId={`modal-${imgToShow.fields.file.url}`}
      className={`${handleImgRatio(
        imgToShow.fields.file.details.image.width,
        imgToShow.fields.file.details.image.height
      )} w-full max-w-lg `}
    >
      <Image
        src={`https:${imgToShow.fields.file.url}`}
        width={imgToShow.fields.file.details.image.width}
        height={imgToShow.fields.file.details.image.height}
        alt={imgToShow.fields.title}
        className="rounded-lg res-img"
        sizes="100vw"
      />
    </motion.div>
  );
};
