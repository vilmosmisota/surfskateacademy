import dayjs from "dayjs";
import React from "react";
import { IClass } from "../../interfaces";

type DayProps = {
  day: dayjs.Dayjs;
  classes: IClass[];
  rowIdx: number;
};

export default function Day({ day, classes }: DayProps) {
  const isToday = day.format("DD-MM-YY") === dayjs().format("DD-MM-YY");
  const isThisMonth = day.format("MM-YY") === dayjs().format("MM-YY");
  const isPrevDay = day.format("DD-MM-YY") < dayjs().format("DD-MM-YY");
  const isPrevMonth = day.format("MM-YY") < dayjs().format("MM-YY");

  const dayClasses = classes
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .filter((cls) => {
      const clsDay = cls.date.split("T");
      if (clsDay[0] !== day.format("YYYY-MM-DD")) return;
      return cls;
    });

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
    </>
  );
}
