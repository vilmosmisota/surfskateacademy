export const animateIn = {
  show: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.5,
    },
  },
  hidden: {
    opacity: 0,
  },
};

export const animateItemsIn = {
  show: {
    opacity: 1,

    transition: {
      duration: 0.5,
    },
  },
  hidden: {
    opacity: 0,
  },
};

export const animateUp = {
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      type: "spring",
      stiffness: 110,
      staggerChildren: 0.4,
    },
  },
  hidden: {
    y: 100,
    opacity: 0,
  },
};

export const animateItemsUp = {
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      type: "spring",
      damping: 11,
      stiffness: 110,
    },
  },
  hidden: {
    y: 100,
    opacity: 0,
  },
};
