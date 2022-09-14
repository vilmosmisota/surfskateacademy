import Image from "next/future/image";
import { motion } from "framer-motion";
import { IContentsBlock } from "../../interfaces";
import { animateItemsUp, animateUp } from "../../utils/animations";

export default function ContentsBlock({
  contentsBlock,
}: {
  contentsBlock: IContentsBlock[];
}) {
  return (
    <section className="  mx-auto lg:px-0 max-w-screen-lg mb-10 md:mb-20">
      {contentsBlock.map((content, i) => {
        return (
          <article
            key={content.fields.contentTitle}
            className={`flex relative flex-col-reverse  ${
              i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
            }  mb-11`}
          >
            <div
              className={`w-full  -mt-[10%] z-0 lg:mt-14 ${
                i % 2 === 0 ? "lg:-mr-5" : "lg:-ml-5"
              }`}
            >
              <Image
                src={`https:${content.fields.image.fields.file.url}`}
                width={content.fields.image.fields.file.details.image.width}
                height={content.fields.image.fields.file.details.image.height}
                alt={content.fields.image.fields.title}
                sizes="(max-width: 1024px) 100vw,
                50vw"
              />
            </div>

            <motion.div
              variants={animateUp}
              initial={"hidden"}
              whileInView={"show"}
              viewport={{ once: true }}
              className="bg-darkBlue relative min-h-[330px]  lg:min-h-[390px] flex flex-col justify-center rounded-lg px-6 mx-4 md:pt-12 pb-8 shadow z-10 h-min lg:mx-0"
            >
              <motion.div
                variants={animateItemsUp}
                className="max-w-2xl w-full mx-auto "
              >
                <h2 className="uppercase font-black  text-red pb-2 tracking-wide lg:text-2xl">
                  {content.fields.contentTitle}
                </h2>
                <p className="text-light text-sm md:text-base">
                  {content.fields.description}
                </p>
              </motion.div>
            </motion.div>
          </article>
        );
      })}
    </section>
  );
}
