/* eslint-disable @typescript-eslint/no-misused-promises */
import dayjs from "dayjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import { IClass } from "../../../interfaces";
import closeIcon from "../../../assets/icons/close.svg";
import { useRouter } from "next/router";
import { postClass, updateClass } from "../../../provider/postData";
import Input from "../../../components/forms/Input";
import editIcon from "../../../assets/icons/edit.svg";
import deleteIcon from "../../../assets/icons/delete.svg";
import backButton from "../../../assets/icons/backbutton.svg";
import { deleteClass } from "../../../provider/deleteData";
import Link from "next/link";
import { useLogger, useRouterRefresh } from "../../../utils/hooks";
import Spinner from "../../../components/loading/Spinner";

type AdminModalProps = {
  day: dayjs.Dayjs;
  dayClasses: IClass[];
  close: () => void;
};

export default function AdminModal({
  dayClasses,
  day,
  close,
}: AdminModalProps) {
  const { modalType, handleModalChange } = useModalType();

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
      <header className="mx-5 mb-5 border-b">
        <p className="uppercase">{day.format("DD MMM")}</p>
      </header>
      {modalType === "base" && (
        <BaseScreen
          dayClasses={dayClasses}
          handleModalChange={handleModalChange}
          day={day}
        />
      )}
      {modalType === "add" && (
        <AddScreen day={day} handleModalChange={handleModalChange} />
      )}
      {modalType === "edit" && (
        <EditScreen
          handleModalChange={handleModalChange}
          dayClasses={dayClasses}
        />
      )}
    </div>
  );
}

const useModalType = () => {
  type ModalType = "base" | "add" | "edit" | "delete";
  const [modalType, setModalType] = useState<ModalType>("base");
  const handleModalChange = (type: ModalType) => setModalType(type);

  return { modalType, handleModalChange };
};

const BaseScreen = ({
  dayClasses,
  handleModalChange,
  day,
}: {
  dayClasses: IClass[];
  day: dayjs.Dayjs;
  handleModalChange: (type: "base" | "add" | "edit" | "delete") => void;
}) => {
  return (
    <>
      {dayClasses.map((cls) => {
        return (
          <ClassItem
            cls={cls}
            key={cls.class_id}
            handleModalChange={handleModalChange}
          />
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

const ClassItem = ({
  cls,
  handleModalChange,
}: {
  cls: IClass;
  handleModalChange: (type: "base" | "add" | "edit" | "delete") => void;
}) => {
  const [isShowBtn, setShowBtn] = useState(false);
  const [isConfirmDelete, setConfirmDelete] = useState(false);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    const { res } = await deleteClass(id);
    if (res === "success") {
      router
        .replace(router.asPath, undefined, { scroll: false })
        .catch((e) => console.error(e));
    }
  };

  return (
    <article
      className={` ${
        cls.is_available ? "opacity-100" : "opacity-50"
      } w-11/12 bg-darkBlue relative min-h-[90px] rounded-lg mx-auto max-w-md p-5 flex align-middle justify-between flex-wrap mb-5`}
    >
      <div
        onClick={() => setShowBtn(!isShowBtn)}
        key={cls.class_id}
        className="  bg-darkBlue  absolute top-0 left-0 w-full h-full rounded-lg mx-auto  p-5 flex align-middle justify-between flex-wrap mb-5 cursor-pointer"
      >
        <div className="w-2/3 h-min self-center">
          <p className="text-sm uppercase text-light mb-1">{cls.city}</p>

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
          <p className="text-light">{cls.time.slice(0, -3)}</p>
        </div>
      </div>
      {isShowBtn && (
        <div className="absolute  z-10 p-2 flex items-center justify-between top-0 left-0 w-full h-full bg-red rounded-lg">
          <div className="flex h-[85%] w-full  justify-evenly items-center">
            <button
              onClick={() => {
                setConfirmDelete(true);
              }}
              className="text-center  uppercase text-sm underline font-bold w-10 h-10 bg-orange flex justify-center rounded-lg"
            >
              <Image src={deleteIcon as string} alt="delete class" />
            </button>

            <Link href={`/admin/classes?id=${cls.class_id}`} replace shallow>
              <button
                onClick={() => handleModalChange("edit")}
                className="text-center  uppercase text-sm underline font-bold w-10 h-10 bg-orange flex justify-center rounded-lg"
              >
                <Image src={editIcon as string} alt="edit class" />
              </button>
            </Link>
            <button
              onClick={() => {
                setShowBtn(false);
              }}
              className="text-center  uppercase text-sm underline font-bold w-10 h-10 bg-orange flex justify-center rounded-lg"
            >
              <Image src={backButton as string} alt="close" />
            </button>
          </div>
        </div>
      )}
      {isConfirmDelete && (
        <div className="absolute text-center  z-10 p-2 flex items-center flex-col justify-center top-0 left-0 w-full h-full bg-red rounded-lg">
          <p className="uppercase text-sm mb-2 ">Confirm:</p>
          <div className="flex w-[150px] justify-between">
            <button
              onClick={() => setConfirmDelete(false)}
              className="uppercase text-sm font-black tracking-widest underline underline-offset-4 "
            >
              Back
            </button>
            <button
              onClick={() => handleDelete(cls.class_id)}
              className="uppercase text-sm font-black tracking-widest underline underline-offset-4 "
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </article>
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
  const router = useRouter();
  const callback = useRouterRefresh();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const { time, location, map_link, city, info } =
      Object.fromEntries(formData);

    const payload = {
      location: location.toString().toLowerCase(),
      city: city.toString().toLowerCase(),
      map_link: map_link.toString(),
      info: info,
      date: day.format("YYYY-MM-DD"),
      time,
      is_available: true,
    };

    const { data, error } = await postClass(payload);

    if (error) {
      console.warn(error.message);
      return;
    }

    if (data !== null) {
      router
        .replace(router.asPath, undefined, { scroll: false })
        .catch((e) => console.error(e));
      handleModalChange("base");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-beige mx-auto max-w-md w-full flex items-center flex-col my-4 rounded-lg px-4 pt-4 pb-10"
      >
        {BOOK_CLASS_FIELD.map((f) => (
          <Input
            key={f.name}
            inputType={f.inputType}
            name={f.name}
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
            id="info"
            name="info"
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
    </>
  );
};

const CLASS_EDIT_FIELDS = [
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

const EditScreen = ({
  dayClasses,
  handleModalChange,
}: {
  dayClasses: IClass[];
  handleModalChange: (type: "base" | "add" | "edit" | "delete") => void;
}) => {
  const [clsToEdit, setClsToEdit] = useState<IClass | null>(null);
  const [time, setTime] = useState("");
  const [info, setInfo] = useState<string | undefined>("");
  const [date, setDate] = useState<string | undefined>("");
  const [checkBoxTrue, setCheckBoxTrue] = useState(false);
  const [checkboxFalse, setCheckboxFalse] = useState(false);
  const router = useRouter();

  const { query } = useRouter();
  useEffect(() => {
    dayClasses.forEach((item) => {
      if (item.class_id !== query.id) return;

      setClsToEdit(item);
      setTime(item.time);
      setDate(new Date(item.date).toISOString().split("T")[0]);
      setInfo(item.info);
      setCheckBoxTrue(item.is_available ? true : false);
      setCheckboxFalse(item.is_available ? false : true);
    });
  }, [query, dayClasses]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const { time, date, is_available, location, map_link, city, info } =
      Object.fromEntries(formData);

    const payload = {
      location: location.toString().toLowerCase(),
      city: city.toString().toLowerCase(),
      map_link: map_link.toString(),
      info: info.toString(),
      date: date.toString(),
      time: time.toString(),
      is_available: is_available === "true" ? true : false,
      class_id: clsToEdit?.class_id as string,
    };

    const { res } = await updateClass(clsToEdit?.class_id, payload);

    if (res === "success") {
      router
        .replace(router.asPath, undefined, { scroll: false })
        .catch((e) => console.error(e));
      handleModalChange("base");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-beige mx-auto max-w-sm w-full flex items-center flex-col my-4 rounded-lg px-4 pt-4 pb-10"
      >
        {clsToEdit === null ? (
          <Spinner />
        ) : (
          <>
            <div className="mb-4 self-start">
              <p className="pb-2">Is Available?</p>
              <input
                type="radio"
                id="is_available_yes"
                name="is_available"
                value="true"
                checked={checkBoxTrue}
                onClick={() => {
                  setCheckBoxTrue(true);
                  setCheckboxFalse(false);
                }}
                required
                className="focus:ring-red focus:border-red text-red mr-2 border-none"
              />
              <label htmlFor="is_available_yes" className="font-sansBody mr-2">
                Yes
              </label>
              <input
                type="radio"
                id="is_available_no"
                name="is_available"
                value="false"
                checked={checkboxFalse}
                onClick={() => {
                  setCheckboxFalse(true);
                  setCheckBoxTrue(false);
                }}
                className="focus:ring-red focus:border-red  text-red mr-2 border-none"
              />
              <label htmlFor="is_available_no" className="font-sansBody mr-2">
                No
              </label>
            </div>
            <div className="flex align-middle text-left justify-evenly flex-col w-full md:flex-row md:justify-between   mb-4">
              <label
                className="pb-2 font-sansBody capitalize md:self-center md:pb-0"
                htmlFor={`time-input`}
              >
                Date:
              </label>
              <input
                id={`time-input`}
                name="date"
                type="date"
                onChange={(event) => {
                  const value = event.currentTarget.value;
                  setDate(value);
                }}
                value={date}
                required
                className="rounded-lg focus:ring-red focus:border-red border-none"
              />
            </div>
            <div className="flex align-middle text-left justify-evenly flex-col w-full md:flex-row md:justify-between   mb-4">
              <label
                className="pb-2 font-sansBody capitalize md:self-center md:pb-0"
                htmlFor={`time-input`}
              >
                Time:
              </label>
              <input
                id={`time-input`}
                name="time"
                type="time"
                onChange={(event) => {
                  const value = event.currentTarget.value;
                  setTime(value);
                }}
                value={time}
                required
                className="rounded-lg focus:ring-red focus:border-red border-none"
              />
            </div>
            {CLASS_EDIT_FIELDS.map((f) => (
              <Input
                key={f.name}
                inputType={f.inputType}
                name={f.name}
                isRequired={f.isRequired}
                label={f.label}
                placeholder={f.placeholder}
                serverValue={clsToEdit[f.name as keyof typeof clsToEdit]}
              />
            ))}
            <div>
              <label htmlFor="info" className="font-sansBody">
                Info (optional):
              </label>

              <textarea
                id="info"
                name="info"
                placeholder="optional"
                className="focus:ring-red focus:border-red text-red w-full border-none min-h-[90px] mt-2 rounded-lg"
                value={info}
                onChange={(event) => {
                  const value = event.currentTarget.value;
                  setInfo(value);
                }}
              ></textarea>
            </div>

            <button
              type="submit"
              className="py-2 px-6 bg-green uppercase font-bold mt-8 tracking-wider rounded-lg min-w-[125px] shadow"
            >
              Submit
            </button>
          </>
        )}
      </form>
    </>
  );
};
