/* eslint-disable @typescript-eslint/no-misused-promises */
import Link from "next/link";
import { IAdminBookingItem } from "../../interfaces";
import close from "../../assets/icons/close.svg";
import Image from "next/image";
import { useState } from "react";
import Modal from "../../components/modals/Modal";
import { deleteBooking } from "../../provider/deleteData";
import { useRouter } from "next/router";

export default function AdminBookingsView({
  bookings,
}: {
  bookings: IAdminBookingItem[];
}) {
  const [classModalOpen, setClassModalOpen] = useState(false);
  const [itemToDel, setItemToDel] = useState("");
  const [itemEmail, setItemEmail] = useState("");
  const router = useRouter();

  const sortedBookings = bookings.sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    if (dateA < dateB) return 1;
    return -1;
  });
  const openConfirmation = (id: string, email: string) => {
    setClassModalOpen(true);
    setItemToDel(id);
    setItemEmail(email);
  };
  const closeConfirmMsg = () => {
    setClassModalOpen(false);
    setItemToDel("");
    setItemEmail("");
  };

  const handleDeleteBooking = async (id: string) => {
    const { res } = await deleteBooking(id);

    if (res === "success") {
      setClassModalOpen(false);
      setItemToDel("");
      setItemEmail("");
      router
        .replace(router.asPath, undefined, { scroll: false })
        .catch((e) => console.error(e));
    }
  };

  return (
    <>
      <main className="mt-16 relative  max-w-screen-md mx-auto px-4 lg:px-0">
        <header className="text-center mb-5">
          <h1>Bookings</h1>
        </header>
        <section className="bg-beige rounded-lg p-5 md:py-10">
          {sortedBookings.map((booking) => {
            return (
              <BookingItem
                booking={booking}
                key={booking.booking_id}
                openConfirmation={openConfirmation}
              />
            );
          })}
        </section>
      </main>
      <Modal state={classModalOpen}>
        <section className="bg-red p-5 rounded-lg relative text-center">
          <div className="my-5">
            <p>Are you sure you want to delete booking made by {itemEmail}?</p>
          </div>
          <button
            onClick={() => handleDeleteBooking(itemToDel)}
            className="py-1 px-4 bg-orange rounded-lg uppercase tracking-wider font-bold"
          >
            Delete
          </button>
          <button onClick={closeConfirmMsg} className="absolute top-1 right-2">
            <Image
              src={close as string}
              alt="delete booking"
              className="bg-red rounded-md "
            />
          </button>
        </section>
      </Modal>
    </>
  );
}

type BookingItemProps = {
  booking: IAdminBookingItem;
  openConfirmation: (id: string, email: string) => void;
};

const BookingItem = ({ booking, openConfirmation }: BookingItemProps) => {
  const classDate = new Date(booking.class.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "numeric",
  });
  const tob = new Date(booking.created_at).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  return (
    <article
      key={booking.booking_id}
      className={`rounded-lg mb-5 px-5 py-7 shadow max-w-xl mx-auto relative ${
        booking.is_read ? "bg-light" : "bg-orange"
      }`}
    >
      <Link href={`/admin/bookings/${booking.booking_id}`}>
        <div className="cursor-pointer w-max">
          <p className="uppercase underline underline-offset-4  font-bold">
            {classDate} - {booking.class?.city}
          </p>
          <p className="">{booking.email}</p>

          <p className="font-thin font-sans text-sm absolute bottom-1 right-2">
            {tob}
          </p>
        </div>
      </Link>

      {booking.is_read && (
        <button
          className="absolute top-1 right-2 "
          onClick={() => openConfirmation(booking.booking_id, booking.email)}
        >
          <Image
            src={close as string}
            alt="delete booking"
            className="bg-red rounded-md"
          />
        </button>
      )}
    </article>
  );
};
