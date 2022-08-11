import React from "react";

import dayjs from "dayjs";
import { IClass } from "../../../interfaces";

import AdminDay from "./AdminDay";

export default function AdminMonth({
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
            <AdminDay day={day} key={idx} rowIdx={i} classes={classes} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}
