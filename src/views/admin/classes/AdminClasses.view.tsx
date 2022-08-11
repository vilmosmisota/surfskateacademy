import dayjs from "dayjs";
import { useEffect, useState } from "react";
import CalendarHeader from "../../../components/calendar/CalendarHeader";
import { IClass } from "../../../interfaces";
import getMonth from "../../../utils/getMonth";
import AdminClassesHeader from "./AdminClassesHeader";
import AdminMonth from "./AdminMonth";

export default function AdminClassesView({ classes }: { classes: IClass[] }) {
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
      <main className=" pb-5 mb-10 md:mx-4 mt-16 lg:mx-auto rounded-lg lg:px-0 max-w-[950px] relative z-[5] bg-beige border-orange">
        <AdminClassesHeader
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
            <AdminMonth month={currenMonth} classes={fClasses} />
          </div>
        </section>
      </main>
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
