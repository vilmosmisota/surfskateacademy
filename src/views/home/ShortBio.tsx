import Image from "next/future/image";
import { IShortBio } from "../../interfaces";
import { motion } from "framer-motion";
import { animateItemsUp, animateUp } from "../../utils/animations";

export default function ShortBio({ shortBio }: { shortBio: IShortBio }) {
  const image = shortBio.fields.image;
  return (
    <section className=" mb-10 py-5 mx-4 md:py-10 lg:mx-auto  lg:px-0 max-w-screen-lg text-center md:mb-20">
      <div className="w-full z-0 max-w-[480px] mx-auto">
        <Image
          src={`https:${image.fields.file.url}`}
          width={image.fields.file.details.image.width || 700}
          height={image.fields.file.details.image.height}
          alt={image.fields.title}
          className=""
          fill
          sizes="(max-width: 510px) 90vw,
                            (max-width: 900px) 80vw,
                    60vw"
        />
      </div>
      <motion.div
        variants={animateUp}
        initial={"hidden"}
        whileInView={"show"}
        viewport={{ once: true }}
        className="bg-red z-10 relative max-w-2xl md:py-10 -mt-10 mx-4 md:mx-auto rounded-lg shadow p-5"
      >
        <motion.p
          variants={animateItemsUp}
          className="font-semibold max-w-lg mx-auto"
        >
          {shortBio.fields.text}
        </motion.p>
      </motion.div>
    </section>
  );
}
