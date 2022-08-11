import dayjs from "dayjs";

type EmptyDayProps = {
  day: dayjs.Dayjs;
  hidePrevDays: () => string;
  getCurrentDayClass: () => string;
};

const EmptyDay = ({ day, hidePrevDays, getCurrentDayClass }: EmptyDayProps) => {
  return (
    <div
      className={`flex-col rounded-sm min-h-[100px] overflow-hidden ${hidePrevDays()}`}
    >
      <header className="flex flex-col items-center">
        <p
          className={`text-sm md:text-base font-sans font-black p-1 my-1 text-center   ${getCurrentDayClass()}`}
        >
          {day.format("DD")}
        </p>
      </header>
    </div>
  );
};

export default EmptyDay;
