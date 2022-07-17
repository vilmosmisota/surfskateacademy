import dayjs from "dayjs";
import React from "react";
import { IClass } from "../../interfaces";

export default function Day({
  day,
  classes,
}: {
  day: dayjs.Dayjs;
  classes: IClass[];
}) {
  const dayClasses = classes.filter((cls) => {
    const clsDay = cls.date.split("T");
    if (clsDay[0] !== day.format("YYYY-MM-DD")) return;
    return cls;
  });

  const getCurrentDayClass = () => {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "text-red"
      : "";
  };

  const hidePrevDays = () => {
    if (
      (day.format("DD-MM-YY") < dayjs().format("DD-MM-YY") &&
        day.format("MM-YY") === dayjs().format("MM-YY")) ||
      day.format("MM-YY") < dayjs().format("MM-YY")
    ) {
      return "opacity-30";
    }
    return "";
  };

  const hideNAclasses = (cls: IClass) => {
    if (cls.is_available) {
      return "text-orange";
    }
    return "text-black opacity-50";
  };

  return (
    <>
      <div
        className={`flex flex-col bg-darkBlue rounded-sm max-h-28 overflow-y-scroll ${hidePrevDays()}`}
      >
        <header className="flex flex-col items-center">
          <p
            className={`text-sm font-sans font-black text-light p-1 my-1 text-center   ${getCurrentDayClass()}`}
          >
            {day.format("DD")}
          </p>
        </header>
        <div
          className="flex-1 cursor-pointer"
          // onClick={() => {
          //   setDaySelected(day);
          //   setShowEventModal(true);
          // }}
        >
          {dayClasses.map((cls, idx) => (
            <div key={idx} className="text-center mb-2">
              <p className={`text-xs  underline mb-1 ${hideNAclasses(cls)}`}>
                {cls.date.split("T")[1].substring(0, 5)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
