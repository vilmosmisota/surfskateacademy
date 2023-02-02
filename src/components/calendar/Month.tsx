import React from "react";
import Day from "./Day";
import dayjs from "dayjs";
import { IClass } from "../../interfaces";

export default function Month({
  month,
  classes,
  selectedMonthIndex,
}: {
  month: dayjs.Dayjs[][];
  selectedMonthIndex: number;
  classes: IClass[];
}) {
  return (
    <div className="flex-1 grid grid-cols-7 grid-rows-5 gap-1">
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day
              day={day}
              key={idx}
              rowIdx={i}
              selectedMonthIndex={selectedMonthIndex}
              classes={classes}
            />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}
