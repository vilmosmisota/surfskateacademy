import dayjs from "dayjs";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IClass } from "../../interfaces";
import Modal from "../modals/Modal";
import closeIcon from "../../assets/icons/close.svg";

type DayProps = {
  day: dayjs.Dayjs;
  classes: IClass[];
  rowIdx: number;
};

export default function Day({ day, classes }: DayProps) {
  const dayClasses = classes
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .filter((cls) => {
      const clsDay = cls.date.split("T");
      if (clsDay[0] !== day.format("YYYY-MM-DD")) return;
      return cls;
    });

  const isToday = day.format("DD-MM-YY") === dayjs().format("DD-MM-YY");
  const isThisMonth = day.format("MM-YY") === dayjs().format("MM-YY");
  const isPrevDay = day.format("DD-MM-YY") < dayjs().format("DD-MM-YY");
  const isPrevMonth = day.format("MM-YY") < dayjs().format("MM-YY");

  const getCurrentDayClass = () => {
    if (isToday) return "text-red";
    if ((isPrevDay && isThisMonth) || isPrevMonth) return "text-darkBlue";
    return "text-light";
  };

  const hidePrevDays = () => {
    if (isPrevMonth) return "opacity-0";
    if ((isPrevDay && isThisMonth) || isPrevMonth)
      return "bg-none border-darkBlue border";
    return "bg-darkBlue";
  };

  return (
    <>
      {dayClasses.length === 0 && (
        <EmptyDay
          day={day}
          getCurrentDayClass={getCurrentDayClass}
          hidePrevDays={hidePrevDays}
        />
      )}
      {dayClasses.length > 0 && (
        <ClsDay
          hidePrevDays={hidePrevDays}
          getCurrentDayClass={getCurrentDayClass}
          dayClasses={dayClasses}
          day={day}
        />
      )}
    </>
  );
}

type EmptyDayProps = {
  day: dayjs.Dayjs;
  hidePrevDays: () => string;
  getCurrentDayClass: () => string;
};

const EmptyDay = ({ day, hidePrevDays, getCurrentDayClass }: EmptyDayProps) => {
  return (
    <div
      className={`flex-col rounded-sm min-h-[100px] overflow-hidden ${hidePrevDays()}`}
    >
      <header className="flex flex-col items-center">
        <p
          className={`text-sm md:text-base font-sans font-black p-1 my-1 text-center   ${getCurrentDayClass()}`}
        >
          {day.format("DD")}
        </p>
      </header>
    </div>
  );
};

type ClsDayProps = {
  day: dayjs.Dayjs;
  hidePrevDays: () => string;
  getCurrentDayClass: () => string;
  dayClasses: IClass[];
};

const ClsDay = ({
  hidePrevDays,
  getCurrentDayClass,
  dayClasses,
  day,
}: ClsDayProps) => {
  const [classModalOpen, setClassModalOpen] = useState(false);
  const close = () => setClassModalOpen(false);
  const open = () => setClassModalOpen(true);

  const isThisMonth = day.format("MM-YY") === dayjs().format("MM-YY");
  const isPrevDay = day.format("DD-MM-YY") < dayjs().format("DD-MM-YY");
  const isPrevMonth = day.format("MM-YY") < dayjs().format("MM-YY");

  const hideNAclasses = (cls: IClass) => {
    if ((isPrevDay && isThisMonth) || isPrevMonth)
      return "text-darkBlue opacity-40";
    if (!cls.is_available) return "text-light opacity-40 line-through";
    if (cls.is_available && isPrevDay && isThisMonth) return "text-darkBlue";
    return "text-light";
  };

  return (
    <>
      <div
        onClick={open}
        className={`flex-col rounded-sm min-h-[100px] hover:shadow transition-all cursor-pointer overflow-hidden ${hidePrevDays()}`}
      >
        <header className="flex flex-col items-center">
          <p
            className={`text-sm md:text-base font-sans font-black p-1 my-1 text-center   ${getCurrentDayClass()}`}
          >
            {day.format("DD")}
          </p>
        </header>
        <div className="flex-1">
          {dayClasses.map((cls, idx) => (
            <div key={idx} className="text-center mb-2">
              <p className={`text-xs mb-1 ${hideNAclasses(cls)}`}>
                {cls.date.split("T")[1].substring(0, 5)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Modal state={classModalOpen}>
        <ModalClasses dayClasses={dayClasses} close={close} day={day} />
      </Modal>
    </>
  );
};

type ModalClassesProps = {
  day: dayjs.Dayjs;
  dayClasses: IClass[];
  close: () => void;
};

const ModalClasses = ({ dayClasses, day, close }: ModalClassesProps) => {
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
                <button className=" bg-green cursor-pointer py-1 px-5 rounded-lg font-black shadow">
                  {cls.date.split("T")[1].substring(0, 5)}
                </button>
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
};
