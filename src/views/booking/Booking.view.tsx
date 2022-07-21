import dayjs from "dayjs";
import { useEffect, useState } from "react";
import CalendarHeader from "../../components/calendar/CalendarHeader";
import Month from "../../components/calendar/Month";
import { IClass } from "../../interfaces";
import { ClassesProps } from "../../pages/booking";
import getMonth from "../../utils/getMonth";
import BookingHeader from "./BookingHeader";
import FilterClasses from "./FilterClasses";

export default function BookingView({ classes }: ClassesProps) {
  const month = dayjs().month();
  const [monthIndex, setMonthIndex] = useState(month);
  const currenMonth = useMonthData(monthIndex);
  const cities = getCities(classes);

  const handlePrevClick = () =>
    monthIndex <= month ? null : setMonthIndex(monthIndex - 1);

  const handleNextClick = () => setMonthIndex(monthIndex + 1);

  return (
    <>
      <BookingHeader />
      <main className=" pb-5 mb-10 md:mx-4 -mt-16 lg:mx-auto rounded-lg lg:px-0 max-w-[950px] relative z-[5] bg-beige border-orange">
        <FilterClasses cities={cities} />
        <section className="p-2">
          <CalendarHeader
            handlePrevClick={handlePrevClick}
            handleNextClick={handleNextClick}
            monthIndex={monthIndex}
          />
          <div className="flex flex-1">
            <Month month={currenMonth} classes={classes} />
          </div>
        </section>
      </main>
    </>
  );
}

function getCities(classes: IClass[]) {
  const cities = Array.from(
    new Set(
      classes.map((cls) => {
        const clsDay = cls.date.split("T");
        if (clsDay[0] < dayjs().format("YYYY-MM-DD")) return "";
        return cls.city;
      })
    )
  );
  return cities;
}

function useMonthData(monthIndex: number) {
  const [currenMonth, setCurrentMonth] = useState(getMonth());

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return currenMonth;
}
