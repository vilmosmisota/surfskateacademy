import { useEffect, useState } from "react";

type SliderClickBtnProps = {
  id: number;
  index: number;
  position: number;
  handleClick: (newIndex: number) => void;
};

export default function SliderClickBtn({
  id,
  index,
  position,
  handleClick,
}: SliderClickBtnProps) {
  const [isActive, setActive] = useState(index === position ? true : false);

  useEffect(() => {
    if (index === position) {
      setActive(true);
      return;
    }
    setActive(false);
  }, [position, index]);

  return (
    <button
      onClick={() => {
        handleClick(index);
      }}
      key={id}
      className={`${
        isActive ? "bg-orange shadow " : ""
      }w-5 h-5 mx-1 border-2 rounded-full border-orange transition-all duration-300 ease-in-out`}
    ></button>
  );
}
