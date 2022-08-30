import { IIntro } from "../../interfaces";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { motion } from "framer-motion";
import { animateItemsUp, animateUp } from "../../utils/animations";

export default function Mainintro({ intro }: { intro: IIntro }) {
  return (
    <motion.section
      variants={animateUp}
      initial={"hidden"}
      whileInView={"show"}
      viewport={{ once: true }}
      className="px-4 mb-10 py-5 mx-4 md:py-10 lg:mx-auto rounded-lg lg:px-0 max-w-screen-lg bg-darkBlue border-2 text-center md:mb-20 min-h-[200px] flex items-center justify-center flex-col"
    >
      <motion.div variants={animateItemsUp}>
        <ReactMarkdown className="intro mb-5">
          {intro.fields.introText}
        </ReactMarkdown>
      </motion.div>
      <motion.div variants={animateItemsUp}>
        <Link href={intro.fields.buttonDestination}>
          <button className="btn primary-btn ">
            {intro.fields.buttonLabel}
          </button>
        </Link>
      </motion.div>
    </motion.section>
  );
}
