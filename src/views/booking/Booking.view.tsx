import dayjs from "dayjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import sample from "../../assets/sample/bookin.jpg";
import CalendarHeader from "../../components/calendar/CalendarHeader";
import Month from "../../components/calendar/Month";
import { ClassesProps } from "../../pages/booking";
import getMonth from "../../utils/getMonth";

export default function BookingView({ classes }: ClassesProps) {
  const month = dayjs().month();
  const [monthIndex, setMonthIndex] = useState(month);
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const handlePrevClick = () => {
    if (monthIndex <= month) return;
    setMonthIndex(monthIndex - 1);
  };
  const handleNextClick = () => {
    setMonthIndex(monthIndex + 1);
  };

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <>
      <header className="mt-16 relative  max-w-screen-lg mx-auto  ">
        <div className="h-[250px] w-full img-overlay">
          <Image
            src={sample}
            alt={"string"}
            layout={"fill"}
            objectFit={"cover"}
          />
        </div>
        <div className="absolute top-2/4 left-10 -translate-y-1/2">
          <h1 className="text-red max-w-[190px]">Book a class with us</h1>
        </div>
      </header>
      <main className="md:px-4 pb-5 mb-10 md:mx-4 -mt-16 lg:mx-auto rounded-lg lg:px-0 max-w-[950px] relative z-[5] bg-beige border-orange">
        <section className="h-[100px] bg-orange rounded-t-lg">filter</section>

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
