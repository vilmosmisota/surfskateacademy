import dayjs from "dayjs";
import React from "react";
import { IClass } from "../../interfaces";
import EmptyDay from "./EmptyDay";
import ClsDay from "./ClsDay";

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

  const { getCurrentDayClass, hidePrevDays } = customDays(day);

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

const customDays = (day: dayjs.Dayjs) => {
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

  return { getCurrentDayClass, hidePrevDays };
};
