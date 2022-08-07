import Image from "next/image";
import Link from "next/link";
import { IBooking } from "../../interfaces";
import { AdminProps } from "../../pages/admin";
import inbox from "../../assets/icons/inbox.svg";
import calendar from "../../assets/icons/calendar.svg";

export default function AdminView({ count }: AdminProps) {
  return (
    <main className="mt-16 relative  max-w-screen-lg mx-auto px-4 lg:px-0 min-h-[500px] flex items-center">
      <section className="w-full  max-w-2xl mx-auto flex flex-col md:flex-row justify-evenly">
        <Link href="/admin/bookings">
          <div className="text-center relative shadow cursor-pointer min-w-[300px] bg-orange p-5 rounded-lg mb-5 md:mb-0">
            <h3 className="uppercase tracking-wider font-black mb-2">
              Bookings
            </h3>
            <div className="w-16 mx-auto text-center">
              <Image
                src={inbox as string}
                layout="responsive"
                alt="inbox logo"
              />
            </div>
            <div className="absolute -top-2 -right-2 bg-red w-10 h-10 flex items-center justify-center  rounded-lg">
              <p className="font-black text-lg p-0 m-0 h-min">{count}</p>
            </div>
          </div>
        </Link>
        <Link href="/admin/classes">
          <div className="text-center shadow cursor-pointer min-w-[300px] bg-darkBlue p-5 rounded-lg">
            <h3 className="uppercase text-light tracking-wider font-black mb-2">
              Classes
            </h3>
            <div className="w-16 mx-auto text-center">
              <Image
                src={calendar as string}
                layout="responsive"
                alt="inbox logo"
                className=""
              />
            </div>
          </div>
        </Link>
      </section>
    </main>
  );
}
