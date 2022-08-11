import { useRouter } from "next/router";
import { useEffect } from "react";
import { AdminBookedItemProps } from "../../../pages/admin/bookings/[id]";
import { updateIsRead } from "../../../provider/postData";

export default function BookedItemView({ booking }: AdminBookedItemProps) {
  const router = useRouter();
  useEffect(() => {
    if (booking.is_read) return;
    if (typeof booking.booking_id === "undefined") return;
    const setIsRead = async () => {
      const res = await updateIsRead(booking.booking_id);
      console.log(res);
    };
    setIsRead().catch((err) => console.error(err));
  }, [booking.booking_id, booking.is_read]);
  return (
    <main className="mt-16 relative  max-w-screen-md mx-auto px-4 lg:px-0">
      <button
        className="border border-black py-1 px-3 rounded-lg text-xs"
        onClick={() => router.back()}
      >
        &#8592; Back
      </button>
      <h1 className="text-center mb-5">Booked Class</h1>
      <section className="bg-beige rounded-lg p-5 md:py-10">
        <div className="border-b-2 border-black border-opacity-50 mb-10 mx-auto max-w-md">
          <div className="flex justify-between items-center mb-3">
            <p className="uppercase text-sm opacity-60">Name:</p>
            <p className="capitalize font-sans">
              {booking.fname} {booking.lname}
            </p>
          </div>
          <div className="flex justify-between items-center mb-3">
            <p className="uppercase text-sm opacity-60">Email:</p>
            <a
              href={`mailto:${booking.email}`}
              className="text-red font-bold cursor-pointer font-sans"
            >
              {booking.email}
            </a>
          </div>
          {booking.phonenumber && (
            <div className="flex justify-between items-center mb-3">
              <p className="uppercase text-sm opacity-60">Phone Number:</p>
              <p className="capitalize font-sans">{booking?.phonenumber}</p>
            </div>
          )}
        </div>

        <div className="border-b-2 border-black border-opacity-50 mb-10 mx-auto max-w-md">
          <div className="flex justify-between items-center mb-3">
            <p className="uppercase text-sm opacity-60">Class Date:</p>
            <p className="capitalize font-sans">
              {new Date(booking.class?.date || "").toLocaleDateString("en-GB", {
                day: "numeric",
                month: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </p>
          </div>
          <div className="flex justify-between items-center mb-3">
            <p className="uppercase text-sm opacity-60">City:</p>
            <p className="capitalize font-sans">{booking.class?.city}</p>
          </div>
          <div className="flex justify-between items-center mb-3">
            <p className="uppercase text-sm opacity-60">Location:</p>
            <p className="capitalize font-sans">{booking.class?.location}</p>
          </div>
        </div>

        <div className=" mb-10 mx-auto  max-w-md">
          <div className="flex justify-between items-center mb-3">
            <p className="uppercase text-sm opacity-60">Booked at:</p>
            <p className="capitalize font-sans">
              {new Date(booking.created_at).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </p>
          </div>
          {typeof booking.is_first_time === "boolean" && (
            <div className="flex justify-between items-center mb-3">
              <p className="uppercase text-sm opacity-60">Is First Time:</p>
              <p className="capitalize font-sans">
                {booking.is_first_time ? "Yes" : "No"}
              </p>
            </div>
          )}

          {booking.level === "boolean" && (
            <div className="flex justify-between items-center mb-3">
              <p className="uppercase text-sm opacity-60">Level:</p>
              <p className="capitalize font-sans">{booking.level}</p>
            </div>
          )}

          <div className="flex justify-between items-center mb-3">
            <p className="uppercase text-sm opacity-60">Is equipment needed:</p>
            <p className="capitalize font-sans">
              {booking.is_equipment ? "Yes" : "No"}
            </p>
          </div>

          {booking.message && (
            <div className=" mb-3 ">
              <p className="uppercase text-sm opacity-60 mb-1">Message:</p>
              <p className="capitalize font-sans min-w-[300px] w-full">
                {booking.message}
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
