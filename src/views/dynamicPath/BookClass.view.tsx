import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Input from "../../components/forms/Input";
import Modal from "../../components/modals/Modal";
import { ClassProps } from "../../pages/booking/[id]";
import { postBooking } from "../../provider/postData";
import closeIcon from "../../assets/icons/close.svg";
import BackButton from "../../components/buttons/BackButton";

export default function BookClassView({ cls }: ClassProps) {
  return (
    <>
      <BookingHeader />
      <main className=" max-w-screen-lg mb-10 md:mb-20 mx-auto px-4 lg:px-0 flex flex-wrap">
        <BookingInfo cls={cls} />
        <BookingForm clsId={cls.class_id} />
      </main>
    </>
  );
}

const BookingHeader = () => {
  return (
    <header className="mt-4 relative  max-w-screen-lg mx-auto px-4 lg:px-0">
      <BackButton />
      <h1 className="my-4 text-center">Booking</h1>
    </header>
  );
};

const BookingInfo = ({ cls }: ClassProps) => {
  const formatedDate = new Date(cls.date.split("T")[0]).toLocaleDateString(
    "en-GB"
  );
  return (
    <article className="mx-auto max-w-sm">
      <p className="text-left">
        You are about to book a class with the following details:
      </p>
      <ul className="mx-auto bg-orange max-w-sm flex items-center flex-col my-4 rounded-lg p-4">
        <li className="flex justify-between mb-4 w-full">
          <p>Date:</p>
          <p className="font-bold text-right">{formatedDate}</p>
        </li>
        <li className="flex justify-between mb-4 w-full">
          <p>Time:</p>
          <p className="font-bold text-right">{cls.time.slice(0, -3)}</p>
        </li>
        <li className="flex justify-between mb-4 w-full">
          <p>Location:</p>
          <p className="font-bold text-right">
            {cls.city} <br /> {cls.location}
          </p>
        </li>
        {cls.info && (
          <li className="flex justify-between mb-4 w-full">
            <p>{cls.info}</p>
          </li>
        )}
      </ul>
    </article>
  );
};

const BOOK_CLASS_FIELD = [
  {
    label: "first name * ",
    name: "fname",
    inputType: "text",
    isRequired: true,
  },
  { label: "last name * ", name: "lname", inputType: "text", isRequired: true },
  { label: "email * ", name: "email", inputType: "email", isRequired: true },
  {
    label: "phone number",
    name: "phonenumber",
    inputType: "tel",
    isRequired: false,
    placeholder: "optional",
  },
];

const BookingForm = ({ clsId }: { clsId: string }) => {
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [isError, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [isConfirmed, setConfirmed] = useState<string | undefined>();

  const [classModalOpen, setClassModalOpen] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const { fname, lname, email, is_equipment, phonenumber, message } =
      Object.fromEntries(formData);

    const payload = {
      class_id: clsId,
      fname: fname.toString().toLowerCase(),
      lname: lname.toString().toLowerCase(),
      email: email.toString().toLowerCase(),
      phonenumber,
      message,
      is_read: false,
      is_equipment: is_equipment === "true" ? true : false,
    };

    const { data, error } = await postBooking(payload);

    if (error) {
      setError(error.message);
      setWasSubmitted(true);
      return;
    }

    if (data !== null) {
      setConfirmed(data[0].fname);
      setWasSubmitted(true);
    }
  };

  useEffect(() => {
    if (!wasSubmitted) return;
    setClassModalOpen(true);
    setLoading(false);
  }, [wasSubmitted]);
  return (
    <>
      <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit}
        className="bg-beige mx-auto max-w-sm w-full flex items-center flex-col my-4 rounded-lg px-4 pt-4 pb-10"
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
        <div className="mb-4">
          <p className="pb-2">
            Do you need a board provided during the class? *
          </p>
          <input
            type="radio"
            id="is_equipment_yes"
            name="is_equipment"
            value="true"
            required
            className="focus:ring-red focus:border-red text-red mr-2 border-none"
          />
          <label htmlFor="is_equipment_yes" className="font-sansBody mr-2">
            Yes
          </label>
          <input
            type="radio"
            id="is_equipment_no"
            name="is_equipment"
            value="false"
            required
            className="focus:ring-red focus:border-red text-red mr-2 border-none"
          />
          <label htmlFor="is_equipment_no" className="font-sansBody mr-2">
            No
          </label>
        </div>
        <div>
          <label htmlFor="message" className="font-sansBody">
            Additional message:
          </label>

          <textarea
            id="message"
            name="message"
            placeholder="optional"
            className="focus:ring-red focus:border-red text-red w-full border-none min-h-[90px] mt-2 rounded-lg"
          ></textarea>
        </div>
        <div className="mt-4 mb-8 text-left w-full">
          <label htmlFor="consent" className="italic pr-4">
            I agree to the{" "}
            <Link href="/" passHref>
              <a className="underline">terms and conditions</a>
            </Link>
            *
          </label>
          <input
            type="checkbox"
            id="consent"
            required
            className="border-none focus:ring-red focus:border-red text-red rounded-sm "
          />
        </div>

        <button type="submit" className="btn primary-btn text-sm md:text-base">
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
      <Modal state={classModalOpen}>
        <ModalBookingConfirmed
          isError={isError}
          isConfirmed={isConfirmed}
          close={() => setClassModalOpen(false)}
        />
      </Modal>
    </>
  );
};

type ModalBookingConfirmedProps = {
  isError: string;
  isConfirmed: string | undefined;
  close: () => void;
};

const ModalBookingConfirmed = ({
  isError,
  isConfirmed,
}: ModalBookingConfirmedProps) => {
  return (
    <div className=" bg-beige py-12 flex align-middle relative max-w-screen-sm mx-auto w-full rounded-lg min-h-[300px]">
      <Link href="/booking">
        <button className="w-8 absolute right-2 top-2">
          <Image src={closeIcon as string} alt="close" layout="responsive" />
        </button>
      </Link>
      <div className=" p-5 max-w-md mx-auto">
        {isError !== "" && (
          <>
            <p className="mb-4 font-sans font-bold capitalize">
              Ooops, something went wrong. Try again or get in touch if you keep
              experiencing issues
            </p>
            <p>{isError}</p>
          </>
        )}

        {typeof isConfirmed !== "undefined" && (
          <>
            <p className="mb-4 font-sans font-bold capitalize">
              Thanks {isConfirmed}!
            </p>
            <p className="mb-2">Your booking was successful.</p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo
              incidunt, autem architecto aliquid suscipit adipisci.
            </p>
          </>
        )}
      </div>
    </div>
  );
};
