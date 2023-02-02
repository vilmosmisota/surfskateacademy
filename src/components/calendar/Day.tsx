import dayjs from "dayjs";
import React from "react";
import { IClass } from "../../interfaces";
import EmptyDay from "./EmptyDay";
import ClsDay from "./ClsDay";
import { useLogger } from "../../utils/hooks";

type DayProps = {
  day: dayjs.Dayjs;
  classes: IClass[];
  rowIdx: number;
  selectedMonthIndex: number;
};

export default function Day({ day, classes, selectedMonthIndex }: DayProps) {
  const dayClasses = classes
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .filter((cls) => {
      const clsDay = cls.date.split("T");
      if (clsDay[0] !== day.format("YYYY-MM-DD")) return;
      return cls;
    });

  const { getCurrentDayClass, hidePrevDays } = customDays(
    day,
    selectedMonthIndex
  );

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

const customDays = (day: dayjs.Dayjs, selectedMonthIndex: number) => {
  const isToday = day.format("DD-MM-YY") === dayjs().format("DD-MM-YY");
  const isThisMonth = day.format("MM-YY") === dayjs().format("MM-YY");
  const isPrevDay = day.format("DD-MM-YY") < dayjs().format("DD-MM-YY");

  const actvieMonth = dayjs(
    new Date(dayjs().year(), selectedMonthIndex)
  ).format("MM-YY");

  const getCurrentDayClass = () => {
    if (isToday) return "text-light bg-red rounded-t-md w-full";
    if (isPrevDay && isThisMonth) return "text-darkBlue";
    return "text-light";
  };

  const hidePrevDays = () => {
    if (isPrevDay && isThisMonth) return "bg-none border-darkBlue border-2";
    if (day.format("MM-YY") === actvieMonth) return "bg-darkBlue";

    // if (dayTimestamp < currentTimestamp && !isToday) return "opacity-0 bg-none";
    return "opacity-0 bg-none";
  };

  return { getCurrentDayClass, hidePrevDays };
};
