import React from "react";
import Day from "./Day";
import dayjs from "dayjs";
import { IClass } from "../../interfaces";

export default function Month({
  month,
  classes,
}: {
  month: dayjs.Dayjs[][];
  classes: IClass[];
}) {
  return (
    <div className="flex-1 grid grid-cols-7 grid-rows-5 gap-1">
      {month.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((day, idx) => (
            <Day day={day} key={idx} rowIdx={i} classes={classes} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}
