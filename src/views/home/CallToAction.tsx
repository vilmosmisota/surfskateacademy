import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { ICallToAction } from "../../interfaces";
import { motion } from "framer-motion";
import { animateItemsUp, animateUp } from "../../utils/animations";
import DelayedLinkBtn from "../../components/buttons/DelayedLinkBtn";

export default function CallToAction({
  callToAction,
}: {
  callToAction: ICallToAction;
}) {
  return (
    <motion.section
      variants={animateUp}
      initial={"hidden"}
      whileInView={"show"}
      viewport={{ once: true }}
      className="px-4 mb-10 py-5 mx-4 border-2  md:py-10 lg:mx-auto rounded-lg lg:px-0 max-w-screen-lg bg-orange text-center md:mb-20 min-h-[200px] flex items-center justify-center flex-col"
    >
      <motion.div variants={animateItemsUp}>
        <ReactMarkdown className="cta-text mb-5">
          {callToAction.fields.description}
        </ReactMarkdown>
      </motion.div>
      <motion.div variants={animateItemsUp}>
        {/* <DelayedLinkBtn
          href={callToAction.fields.buttonDestination}
          theme="btn secondary-btn"
        >
          {callToAction.fields.buttonLabel}
        </DelayedLinkBtn> */}

        <a
          href="https://booking.lostshore.com/surfskate"
          target="_blank"
          rel="noreferrer"
          className="btn secondary-btn"
        >
          Book now
        </a>
      </motion.div>
    </motion.section>
  );
}
