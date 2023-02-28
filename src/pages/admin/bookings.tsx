import { GetServerSideProps } from "next";
import { IAdminBookingItem } from "../../interfaces";
import { protectedRoute } from "../../provider/auth";
import {
  getBookings,
  getNumOfBookings,
  getRangedBookings,
} from "../../provider/getData";
import AdminBookingsView from "../../views/admin/bookings/AdminBookings.view";

export default function Bookings({
  bookings,
  count,
}: {
  count: number;
  bookings: IAdminBookingItem[];
}) {
  return (
    <>
      <AdminBookingsView bookings={bookings} count={count} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const user = await protectedRoute({ req });
  if (!user) {
    return { props: {}, redirect: { destination: "/admin/login" } };
  }

  const count = await getNumOfBookings();
  const { data: bookings } = await getBookings();

  return { props: { bookings, count } };
};
