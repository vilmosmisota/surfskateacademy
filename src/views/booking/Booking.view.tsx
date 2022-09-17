import dayjs from "dayjs";
import { useEffect, useState } from "react";
import CalendarHeader from "../../components/calendar/CalendarHeader";
import Month from "../../components/calendar/Month";
import SmallHeader from "../../components/header/SmallHeader";
import Quotes from "../../components/quotes/Quotes";
import { IClass } from "../../interfaces";
import { ClassesProps } from "../../pages/booking";
import getMonth from "../../utils/getMonth";

import FilterClasses from "./FilterClasses";

export default function BookingView({ classes, bookingContent }: ClassesProps) {
  const month = dayjs().month();
  const [monthIndex, setMonthIndex] = useState(month);
  const [filter, setFilter] = useState("all");
  const currenMonth = useMonthData(monthIndex);
  const cities = useCities(classes);
  const fClasses = useFilterClasses(classes, filter);

  const handlePrevClick = () =>
    monthIndex <= month ? null : setMonthIndex(monthIndex - 1);

  const handleNextClick = () => setMonthIndex(monthIndex + 1);

  const handleSelectFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(e.target.value);
  };

  return (
    <>
      <SmallHeader
        image={bookingContent.image}
        title={bookingContent.heading}
      />
      <main className=" pb-5 mb-10 md:mx-4 -mt-16 lg:mx-auto rounded-lg lg:px-0 max-w-[950px] relative z-[5] bg-beige border-orange">
        <FilterClasses
          cities={cities}
          handleSelectFilter={handleSelectFilter}
        />
        <section className="p-2">
          <CalendarHeader
            handlePrevClick={handlePrevClick}
            handleNextClick={handleNextClick}
            monthIndex={monthIndex}
          />
          <div className="flex flex-1">
            <Month month={currenMonth} classes={fClasses} />
          </div>
        </section>
      </main>
      <Quotes quotes={bookingContent.quotes} />
    </>
  );
}

function useCities(classes: IClass[]) {
  const [citiesList, setCitiesList] = useState<string[]>([]);
  useEffect(() => {
    const cities = Array.from(
      new Set(
        classes.map((cls) => {
          const clsDay = cls.date.split("T");
          if (clsDay[0] < dayjs().format("YYYY-MM-DD")) return "";
          return cls.city;
        })
      )
    );

    setCitiesList(cities);
  }, [classes]);

  return citiesList;
}

function useMonthData(monthIndex: number) {
  const [currenMonth, setCurrentMonth] = useState(getMonth());

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return currenMonth;
}

function useFilterClasses(classes: IClass[], filter: string) {
  const [fClasses, setFClasses] = useState(classes);

  useEffect(() => {
    if (filter === "all") {
      setFClasses(classes);
      return;
    }
    const filteredClasses = classes.filter(
      (cls) => cls.city.toLowerCase() === filter
    );
    setFClasses(filteredClasses);
  }, [filter, classes]);

  return fClasses;
}
