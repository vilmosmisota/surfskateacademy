import dayjs from "dayjs";
import { useState } from "react";
import { IClass } from "../../interfaces";
import Modal from "../modals/Modal";
import ModalClasses from "./ModalClass";

type ClsDayProps = {
  day: dayjs.Dayjs;
  hidePrevDays: () => string;
  getCurrentDayClass: () => string;
  dayClasses: IClass[];
};

export default function ClsDay({
  hidePrevDays,
  getCurrentDayClass,
  dayClasses,
  day,
}: ClsDayProps) {
  const { classModalOpen, close, open } = useModal(dayClasses);
  return (
    <>
      <div
        onClick={open}
        className={`flex-col rounded-sm min-h-[100px] hover:shadow transition-all cursor-pointer overflow-hidden ${hidePrevDays()}`}
      >
        <header className="flex flex-col items-center">
          <p
            className={`text-sm  md:text-base font-sans font-black p-1 my-1 text-center tracking-widest   ${getCurrentDayClass()}`}
          >
            {day.format("DD")}
          </p>
        </header>
        <div className="flex-1">
          {dayClasses.map((cls, idx) => (
            <div key={idx} className="text-center mb-2">
              <p
                className={`text-xs md:tracking-wider mb-1 ${hideNAclasses(
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
        <ModalClasses dayClasses={dayClasses} close={close} day={day} />
      </Modal>
    </>
  );
}

const hideNAclasses = (cls: IClass, day: dayjs.Dayjs) => {
  const isThisMonth = day.format("MM-YY") === dayjs().format("MM-YY");
  const isPrevDay = day.format("DD-MM-YY") < dayjs().format("DD-MM-YY");
  const isPrevMonth = day.format("MM-YY") < dayjs().format("MM-YY");

  if ((isPrevDay && isThisMonth) || isPrevMonth)
    return "text-darkBlue opacity-40";
  if (!cls.is_available) return "text-light opacity-40 line-through";
  if (cls.is_available && isPrevDay && isThisMonth) return "text-darkBlue";
  return "text-orange";
};

const useModal = (dayClasses: IClass[]) => {
  const [classModalOpen, setClassModalOpen] = useState(false);
  const close = () => setClassModalOpen(false);
  const open = () => {
    if (new Date(dayClasses[0].date.split("T")[0]) < new Date()) return;
    setClassModalOpen(true);
  };

  return {
    classModalOpen,
    close,
    open,
  };
};
