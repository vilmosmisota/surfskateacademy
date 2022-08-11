import dayjs from "dayjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IClass } from "../../interfaces";
import closeIcon from "../../assets/icons/close.svg";
import Link from "next/link";

type ModalClassesProps = {
  day: dayjs.Dayjs;
  dayClasses: IClass[];
  close: () => void;
};

export default function ModalClasses({
  dayClasses,
  day,
  close,
}: ModalClassesProps) {
  const [classesCity, setClassesCity] = useState<string[]>([]);

  useEffect(() => {
    const cities = Array.from(new Set(dayClasses.map((cls) => cls.city)));
    setClassesCity(cities);
  }, [dayClasses]);

  return (
    <div className=" bg-beige py-12 relative max-w-screen-sm mx-auto w-full rounded-lg min-h-[300px]">
      <button className="w-8 absolute right-2 top-2" onClick={close}>
        <Image src={closeIcon as string} alt="close" layout="responsive" />
      </button>
      <header className="mx-5 mb-5 border-b">
        <p className="uppercase">{day.format("DD MMM")}</p>
        {classesCity.length === 1 && (
          <p className="uppercase font-black tracking-wider">
            {classesCity[0]}
          </p>
        )}
      </header>

      {dayClasses.map((cls) => {
        return (
          <div
            key={cls.class_id}
            className="w-11/12 bg-darkBlue h-min rounded-lg mx-auto max-w-md p-5 flex align-middle justify-between flex-wrap mb-5"
          >
            <div className="w-2/3 h-min self-center">
              {classesCity.length !== 1 && (
                <p className="text-sm uppercase text-light mb-1">{cls.city}</p>
              )}
              {cls.map_link ? (
                <a
                  href={cls.map_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="location text-sm uppercase text-light cursor-pointer tracking-wider"
                >
                  {cls.location}
                </a>
              ) : (
                <p className="text-sm uppercase text-light">{cls.location}</p>
              )}
            </div>

            <div className="w-2/6 self-center justify-self-end text-right ">
              {cls.is_available ? (
                <Link href={`/booking/${cls.class_id}`}>
                  <button className=" bg-green cursor-pointer py-1 px-5 rounded-lg font-black shadow">
                    {cls.date.split("T")[1].substring(0, 5)}
                  </button>
                </Link>
              ) : (
                <button className=" bg-red opacity-40 cursor-default py-1 px-5 rounded-lg font-black shadow line-through">
                  {cls.date.split("T")[1].substring(0, 5)}
                </button>
              )}
            </div>
            {cls.location && (
              <div className="w-full mt-5">
                <p className="text-sm text-light font-thin">{cls.info}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
