import { GetServerSideProps } from "next";
import { IAdminBookingItem } from "../../interfaces";
import { protectedRoute } from "../../provider/auth";
import { getAllBookings } from "../../provider/getData";
import AdminBookingsView from "../../views/admin/AdminBookings.view";

export default function Bookings({
  bookings,
}: {
  bookings: IAdminBookingItem[];
}) {
  return (
    <>
      <AdminBookingsView bookings={bookings} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const user = await protectedRoute({ req });
  if (!user) {
    return { props: {}, redirect: { destination: "/admin/login" } };
  }

  const { data: bookings } = await getAllBookings();

  return { props: { bookings } };
};
