import Image from "next/future/image";
import Carousel from "nuka-carousel";
import { useWindowDimensions } from "../../utils/hooks";
import { IHighlights } from "../../interfaces";
import { motion } from "framer-motion";
import { animateIn, animateItemsIn } from "../../utils/animations";
import Link from "next/link";

export default function Highlights({
  highlights,
}: {
  highlights: IHighlights[];
}) {
  const { width } = useWindowDimensions();

  return (
    <motion.section
      variants={animateIn}
      initial={"hidden"}
      whileInView={"show"}
      viewport={{ once: true }}
      className="py-5 mx-4 lg:mx-auto mb-10 md:mb-20 lg:px-0 max-w-screen-lg text-center"
    >
      <motion.h2
        variants={animateItemsIn}
        className="text-center font-black tracking-wide uppercase mb-6 md:mb-8"
      >
        Some of our collaborations
      </motion.h2>
      <motion.div variants={animateItemsIn}>
        <Carousel
          renderCenterLeftControls={null}
          renderCenterRightControls={null}
          cellSpacing={30}
          swiping={false}
          slidesToShow={width < 768 || highlights.length <= 1 ? 1 : 3}
        >
          {highlights.map((item) => {
            return (
              <article
                key={item.fields.title}
                className="bg-beige pb-5 w-full mb-5 mx-auto touch-none h-fit overflow-hidden max-w-sm rounded-lg  text-center shadow"
              >
                <div>
                  <Image
                    src={`https:${item.fields.featuredImage.fields.file.url}`}
                    width={
                      item.fields.featuredImage.fields.file.details.image.width
                    }
                    height={
                      item.fields.featuredImage.fields.file.details.image.height
                    }
                    sizes="(max-width: 470px) 90vw,
                            (max-width: 765px) 70vw,
                    33vw"
                    alt=""
                    className="object-fill"
                  />
                </div>
                <div className="  px-2 py-5  h-[180px]">
                  <h3 className="mb-3 text-darkBlue uppercase ">
                    {item.fields.title}
                  </h3>
                  <p className="mb-3 text-sm text-left px-2">
                    {item.fields.introText}
                  </p>
                </div>
                <div>
                  <Link href={`/highlights/${item.fields.slug}`}>
                    <button className="btn primary-btn text-sm">
                      see more
                    </button>
                  </Link>
                </div>
              </article>
            );
          })}
        </Carousel>
      </motion.div>
    </motion.section>
  );
}
