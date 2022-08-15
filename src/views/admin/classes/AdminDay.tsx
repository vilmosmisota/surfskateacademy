/* eslint-disable @typescript-eslint/no-misused-promises */
import dayjs from "dayjs";
import { useState } from "react";
import Modal from "../../../components/modals/Modal";
import { IClass } from "../../../interfaces";

import AdminModal from "./AdminModal";

type DayProps = {
  day: dayjs.Dayjs;
  classes: IClass[];
  rowIdx: number;
};

export default function AdminDay({ day, classes }: DayProps) {
  const dayClasses = classes
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .filter((cls) => {
      const clsDay = cls.date.split("T");
      if (clsDay[0] !== day.format("YYYY-MM-DD")) return;
      return cls;
    });

  const { getCurrentDayClass, hidePrevDays } = customDays(day);
  const { classModalOpen, close, open } = useModal();

  return (
    <>
      <div
        onClick={open}
        className={`flex-col rounded-sm min-h-[100px] hover:shadow transition-all cursor-pointer overflow-hidden ${hidePrevDays()}`}
      >
        <header className="flex flex-col items-center">
          <p
            className={`text-sm md:text-base tracking-widest  font-sans font-black p-1 my-1 text-center   ${getCurrentDayClass()}`}
          >
            {day.format("DD")}
          </p>
        </header>
        <div className="flex-1">
          {dayClasses.map((cls, idx) => (
            <div key={idx} className="text-center mb-2">
              <p
                className={`text-xs  tracking-wide mb-1 ${hideNAclasses(
                  cls,
                  day
                )}`}
              >
                {cls.time.slice(0, -3)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Modal state={classModalOpen}>
        <AdminModal dayClasses={dayClasses} close={close} day={day} />
      </Modal>
    </>
  );
}

const customDays = (day: dayjs.Dayjs) => {
  const isToday = day.format("DD-MM-YY") === dayjs().format("DD-MM-YY");
  const isThisMonth = day.format("MM-YY") === dayjs().format("MM-YY");
  const isPrevDay = day.format("DD-MM-YY") < dayjs().format("DD-MM-YY");
  const isPrevMonth = day.format("MM-YY") < dayjs().format("MM-YY");

  const getCurrentDayClass = () => {
    if (isToday) return "text-light bg-red rounded-xl";
    if ((isPrevDay && isThisMonth) || isPrevMonth) return "text-darkBlue";
    return "text-light ";
  };

  const hidePrevDays = () => {
    if (isPrevMonth) return "opacity-0";
    if ((isPrevDay && isThisMonth) || isPrevMonth)
      return "bg-none border-darkBlue border";
    return "bg-darkBlue";
  };

  return { getCurrentDayClass, hidePrevDays };
};

const hideNAclasses = (cls: IClass, day: dayjs.Dayjs) => {
  const isThisMonth = day.format("MM-YY") === dayjs().format("MM-YY");
  const isPrevDay = day.format("DD-MM-YY") < dayjs().format("DD-MM-YY");
  const isPrevMonth = day.format("MM-YY") < dayjs().format("MM-YY");

  if ((isPrevDay && isThisMonth) || isPrevMonth)
    return "text-darkBlue opacity-40";
  if (!cls.is_available) return "text-orange opacity-40 line-through";
  if (cls.is_available && isPrevDay && isThisMonth) return "text-darkBlue";
  return "text-orange";
};

const useModal = () => {
  const [classModalOpen, setClassModalOpen] = useState(false);
  const close = () => setClassModalOpen(false);
  const open = () => setClassModalOpen(true);
  return {
    classModalOpen,
    close,
    open,
  };
};
