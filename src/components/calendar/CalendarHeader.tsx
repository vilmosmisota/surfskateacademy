import dayjs from "dayjs";
import Image from "next/image";
import arrowLeft from "../../assets/icons/arrow-left.svg";
import arrowRight from "../../assets/icons/arrow-right.svg";

type CalendarHeaderProps = {
  handlePrevClick: () => void;
  handleNextClick: () => void;
  monthIndex: number;
};

export default function CalendarHeader({
  handlePrevClick,
  handleNextClick,
  monthIndex,
}: CalendarHeaderProps) {
  const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  return (
    <header className="my-5">
      <div className="flex max-w-sm mx-5 justify-between mb-5 md:mx-auto md:my-10">
        <button onClick={handlePrevClick} className="w-5">
          <Image
            src={arrowLeft as string}
            alt="previous month"
            layout="responsive"
          />
        </button>
        <div>
          <p>
            {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
          </p>
        </div>
        <button onClick={handleNextClick} className="w-5">
          <Image
            src={arrowRight as string}
            alt="next month"
            layout="responsive"
          />
        </button>
      </div>
      <div className="flex-1 grid grid-cols-7 justify-items-center gap-2">
        {days.map((d) => (
          <div key={d}>
            <p className="text-xs">{d}</p>
          </div>
        ))}
      </div>
    </header>
  );
}
