/* eslint-disable @typescript-eslint/no-misused-promises */
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import Modal from "../../../components/modals/Modal";
import { IClass } from "../../../interfaces";
import closeIcon from "../../../assets/icons/close.svg";
import Image from "next/image";
import Input from "../../../components/forms/Input";
import { postClass } from "../../../provider/postData";
import { useRouter } from "next/router";

type DayProps = {
  day: dayjs.Dayjs;
  classes: IClass[];
  rowIdx: number;
};

export default function AdminDay({ day, classes }: DayProps) {
  const dayClasses = classes
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .filter((cls) => {
      const clsDay = cls.date.split("T");
      if (clsDay[0] !== day.format("YYYY-MM-DD")) return;
      return cls;
    });

  const { getCurrentDayClass, hidePrevDays } = customDays(day);
  const { classModalOpen, close, open } = useModal(dayClasses, day);

  return (
    <>
      <div
        onClick={open}
        className={`flex-col rounded-sm min-h-[100px] hover:shadow transition-all cursor-pointer overflow-hidden ${hidePrevDays()}`}
      >
        <header className="flex flex-col items-center">
          <p
            className={`text-sm md:text-base tracking-widest  font-sans font-black p-1 my-1 text-center   ${getCurrentDayClass()}`}
          >
            {day.format("DD")}
          </p>
        </header>
        <div className="flex-1">
          {dayClasses.map((cls, idx) => (
            <div key={idx} className="text-center mb-2">
              <p
                className={`text-xs text-orange tracking-wide mb-1 ${hideNAclasses(
                  cls,
                  day
                )}`}
              >
                {cls.date.split("T")[1].substring(0, 5)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Modal state={classModalOpen}>
        <AdminModalCls dayClasses={dayClasses} close={close} day={day} />
      </Modal>
    </>
  );
}

const customDays = (day: dayjs.Dayjs) => {
  const isToday = day.format("DD-MM-YY") === dayjs().format("DD-MM-YY");
  const isThisMonth = day.format("MM-YY") === dayjs().format("MM-YY");
  const isPrevDay = day.format("DD-MM-YY") < dayjs().format("DD-MM-YY");
  const isPrevMonth = day.format("MM-YY") < dayjs().format("MM-YY");

  const getCurrentDayClass = () => {
    if (isToday) return "text-light bg-red rounded-xl";
    if ((isPrevDay && isThisMonth) || isPrevMonth) return "text-darkBlue";
    return "text-light ";
  };

  const hidePrevDays = () => {
    if (isPrevMonth) return "opacity-0";
    if ((isPrevDay && isThisMonth) || isPrevMonth)
      return "bg-none border-darkBlue border";
    return "bg-darkBlue";
  };

  return { getCurrentDayClass, hidePrevDays };
};

const hideNAclasses = (cls: IClass, day: dayjs.Dayjs) => {
  const isThisMonth = day.format("MM-YY") === dayjs().format("MM-YY");
  const isPrevDay = day.format("DD-MM-YY") < dayjs().format("DD-MM-YY");
  const isPrevMonth = day.format("MM-YY") < dayjs().format("MM-YY");

  if ((isPrevDay && isThisMonth) || isPrevMonth)
    return "text-darkBlue opacity-40";
  if (!cls.is_available) return "text-light opacity-40 line-through";
  if (cls.is_available && isPrevDay && isThisMonth) return "text-darkBlue";
  return "text-light";
};

const useModal = (dayClasses: IClass[], day: dayjs.Dayjs) => {
  const [classModalOpen, setClassModalOpen] = useState(false);
  const close = () => setClassModalOpen(false);
  const open = () => {
    if (day.toDate() < new Date(new Date().toDateString())) return;
    setClassModalOpen(true);
  };

  return {
    classModalOpen,
    close,
    open,
  };
};

type AdminModalClsProps = {
  day: dayjs.Dayjs;
  dayClasses: IClass[];
  close: () => void;
};

const AdminModalCls = ({ dayClasses, day, close }: AdminModalClsProps) => {
  const [classesCity, setClassesCity] = useState<string[]>([]);
  const { modalType, handleModalChange } = useModalType();

  useEffect(() => {
    const cities = Array.from(new Set(dayClasses.map((cls) => cls.city)));
    setClassesCity(cities);
  }, [dayClasses]);

  return (
    <div className=" bg-beige py-12 relative max-w-screen-sm mx-auto w-full rounded-lg min-h-[300px]">
      <button
        className="w-8 absolute right-2 top-2"
        onClick={() => {
          close();
          handleModalChange("base");
        }}
      >
        <Image src={closeIcon as string} alt="close" layout="responsive" />
      </button>
      {modalType === "base" && (
        <BaseScreen
          dayClasses={dayClasses}
          classesCity={classesCity}
          handleModalChange={handleModalChange}
          day={day}
        />
      )}
      {modalType === "add" && (
        <AddScreen day={day} handleModalChange={handleModalChange} />
      )}
    </div>
  );
};

const useModalType = () => {
  type ModalType = "base" | "add" | "edit" | "delete";
  const [modalType, setModalType] = useState<ModalType>("base");
  const handleModalChange = (type: ModalType) => setModalType(type);

  return { modalType, handleModalChange };
};

const BaseScreen = ({
  dayClasses,
  classesCity,
  handleModalChange,
  day,
}: {
  dayClasses: IClass[];
  classesCity: string[];
  day: dayjs.Dayjs;
  handleModalChange: (type: "base" | "add" | "edit" | "delete") => void;
}) => {
  return (
    <>
      <header className="mx-5 mb-5 border-b">
        <p className="uppercase">{day.format("DD MMM")}</p>
        {classesCity.length === 1 && (
          <p className="uppercase font-black tracking-wider">
            {classesCity[0]}
          </p>
        )}
      </header>
      {dayClasses.map((cls) => {
        return (
          <div
            key={cls.class_id}
            className="w-11/12 bg-darkBlue h-min rounded-lg mx-auto max-w-md p-5 flex align-middle justify-between flex-wrap mb-5"
          >
            <div className="w-2/3 h-min self-center">
              {classesCity.length !== 1 && (
                <p className="text-sm uppercase text-light mb-1">{cls.city}</p>
              )}
              {cls.map_link ? (
                <a
                  href={cls.map_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="location text-sm uppercase text-light cursor-pointer tracking-wider"
                >
                  {cls.location}
                </a>
              ) : (
                <p className="text-sm uppercase text-light">{cls.location}</p>
              )}
            </div>

            <div className="w-2/6 self-center justify-self-end text-right ">
              <p className="text-light">
                {cls.date.split("T")[1].substring(0, 5)}
              </p>
            </div>
            {cls.location && (
              <div className="w-full mt-5">
                <p className="text-sm text-light font-thin">{cls.info}</p>
              </div>
            )}
          </div>
        );
      })}
      <div className="mx-auto text-center">
        <button
          onClick={() => handleModalChange("add")}
          className="uppercase bg-orange px-4 py-1 rounded-lg font-black"
        >
          add class
        </button>
      </div>
    </>
  );
};

const BOOK_CLASS_FIELD = [
  { label: "time", name: "time", inputType: "time", isRequired: true },
  { label: "location", name: "location", inputType: "text", isRequired: true },
  {
    label: "map link",
    name: "map_link",
    inputType: "text",
    isRequired: false,
    placeholder: "optional",
  },
  {
    label: "city",
    name: "city",
    inputType: "text",
    isRequired: true,
  },
];

const AddScreen = ({
  day,
  handleModalChange,
}: {
  day: dayjs.Dayjs;
  handleModalChange: (type: "base" | "add" | "edit" | "delete") => void;
}) => {
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [classModalOpen, setClassModalOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const { time, location, map_link, city, info } =
      Object.fromEntries(formData);
    const hour = Number(time.toString().split(":")[0]);
    const minute = Number(time.toString().split(":")[1]);
    const date = day.hour(hour).minute(minute);

    const payload = {
      location: location.toString().toLowerCase(),
      city: city.toString().toLowerCase(),
      map_link: map_link.toString(),
      info,
      date: date,
      is_available: true,
    };

    const { data, error } = await postClass(payload);

    if (error) {
      console.warn(error.message);
      setWasSubmitted(true);
      return;
    }

    if (data !== null) {
      setWasSubmitted(true);
      handleModalChange("base");
      const token = process.env.NEXT_PUBLIC_REVALIDATE_TOKEN as string;
      const res = await fetch(`/api/revalidate?secret=${token}`);
      router
        .replace(router.asPath, undefined, { scroll: false })
        .catch((e) => console.error(e));
    }
  };

  useEffect(() => {
    if (!wasSubmitted) return;
    setClassModalOpen(true);
  }, [wasSubmitted]);
  return (
    <>
      <header className="mx-5 mb-5 border-b">
        <p className="uppercase">{day.format("DD MMM")}</p>
      </header>
      <form
        onSubmit={handleSubmit}
        className="bg-beige mx-auto max-w-md w-full flex items-center flex-col my-4 rounded-lg px-4 pt-4 pb-10"
      >
        {BOOK_CLASS_FIELD.map((f) => (
          <Input
            key={f.name}
            inputType={f.inputType}
            name={f.name}
            wasSubmitted={wasSubmitted}
            isRequired={f.isRequired}
            label={f.label}
            placeholder={f.placeholder}
          />
        ))}
        <div>
          <label htmlFor="message" className="font-sansBody">
            Info (optional):
          </label>

          <textarea
            id="message"
            name="message"
            placeholder="optional"
            className="focus:ring-red focus:border-red text-red w-full border-none min-h-[90px] mt-2 rounded-lg"
          ></textarea>
        </div>

        <button
          type="submit"
          className="py-2 px-6 bg-green uppercase font-bold tracking-wider rounded-lg min-w-[125px] shadow"
        >
          Submit
        </button>
      </form>
      <div className="mx-auto text-center">
        <button className="uppercase bg-orange px-4 py-1 rounded-lg font-black">
          add class
        </button>
      </div>
    </>
  );
};
