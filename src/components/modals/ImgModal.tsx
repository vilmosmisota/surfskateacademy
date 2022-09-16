import { ReactNode } from "react";
import { motion } from "framer-motion";

type Props = {
  children: ReactNode;
  state: boolean;
  handleClick?: () => void;
};

export default function ImgModal({ children, state, handleClick }: Props) {
  return (
    <>
      {state && (
        <motion.div
          onClick={handleClick}
          className="w-full overflow-auto h-full fixed top-0 left-0 bg-darkBlue bg-opacity-50 backdrop-blur-lg z-50 "
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className=" w-full h-full  relative flex items-center justify-center pointer-events-none p-4"
          >
            <>{children}</>
          </div>
        </motion.div>
      )}
    </>
  );
}
