import { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
type Props = {
  children: ReactNode;
  state: boolean;
};

export default function Modal({ children, state }: Props) {
  return (
    <>
      <AnimatePresence>
        {state && (
          <motion.div
            className="w-full overflow-auto h-full fixed top-0 left-0 bg-darkBlue bg-opacity-50 backdrop-blur-lg z-50 "
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            key="modal"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className=" w-full mt-16 relative"
            >
              <>{children}</>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
