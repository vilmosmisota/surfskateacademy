import Image from "next/future/image";
import { IImage } from "../../interfaces";
import { motion } from "framer-motion";
import DelayedLinkBtn from "../buttons/DelayedLinkBtn";

type MainHeaderProps = {
  image: IImage;
  title: string;
  link?: string;
  linkTheme?: string;
};

export default function MainHeader({
  image,
  title,
  link,
  linkTheme,
}: MainHeaderProps) {
  return (
    <header className="mt-4 relative mb-10 md:mb-20 ">
      <section className="flex  px-4 lg:px-0 align-top max-w-screen-lg mx-auto justify-start flex-col-reverse lg:justify-between lg:flex-row lg:align-middle">
        <motion.div
          variants={fadeInAnimation}
          animate="show05"
          initial="hidden"
          exit="hidden"
          className="text-center lg:text-left  relative z-20 my-10 self-center md:m-0 max-w-sm lg:max-w-lg mx-auto lg:self-end md:my-10 lg:mb-20"
        >
          <h1>{title}</h1>
          {link && (
            <div className="my-5">
              <DelayedLinkBtn href={link} theme={linkTheme as string}>
                see more
              </DelayedLinkBtn>
            </div>
          )}
        </motion.div>
        <motion.div
          variants={fadeInAnimation}
          animate="show1"
          initial="hidden"
          exit="hidden"
          className="w-full max-w-[480px] lg:m-0 mx-auto lg:self-end relative z-20 "
        >
          <Image
            src={`https:${image.fields.file.url}`}
            width={image.fields.file.details.image.width}
            height={image.fields.file.details.image.height}
            alt={image.fields.title}
            sizes="(max-width: 768px) 90vw,
            (max-width: 1000px) 70vw,
            40vw"
            className="shadow res-img"
            priority={true}
          />
        </motion.div>
      </section>

      <motion.div
        variants={backDropAnimation}
        animate="show"
        initial="hidden"
        exit="hidden"
        className="absolute  w-full h-[50%] md:h-[60%] bottom-0 left-0 bg-orange z-0"
      ></motion.div>
    </header>
  );
}

const backDropAnimation = {
  show: {
    opacity: 1,
    scale: 1,
    originY: 1,
    transition: {
      duration: 0.5,
      type: "spring",
      damping: 11,
      stiffness: 110,
    },
  },
  hidden: {
    opacity: 0,
    scale: 0,
    originY: 1,
  },
};

const fadeInAnimation = {
  show05: {
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.5,
      type: "spring",
      damping: 11,
      stiffness: 110,
    },
  },
  show1: {
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.7,
      type: "spring",
      damping: 11,
      stiffness: 110,
    },
  },
  hidden: {
    opacity: 0,
  },
};
