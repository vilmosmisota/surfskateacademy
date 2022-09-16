import Carousel from "nuka-carousel";
import { useWindowDimensions } from "../../utils/hooks";
import { IHighlights } from "../../interfaces";
import { motion } from "framer-motion";
import { animateIn, animateItemsIn } from "../../utils/animations";

import PostPreview from "../../components/post/PostPreview";

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
        Lorem ipsum sample text
      </motion.h2>
      <motion.div variants={animateItemsIn}>
        <Carousel
          renderCenterLeftControls={null}
          renderCenterRightControls={null}
          cellSpacing={30}
          dragging={false}
          slidesToShow={width < 768 || highlights.length <= 1 ? 1 : 3}
        >
          {highlights.map((item) => {
            return <PostPreview key={item.sys.createdAt} item={item} />;
          })}
        </Carousel>
      </motion.div>
    </motion.section>
  );
}
