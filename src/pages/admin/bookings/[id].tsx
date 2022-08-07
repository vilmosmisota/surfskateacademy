import { GetServerSideProps } from "next";
import { protectedRoute } from "../../../provider/auth";
import { getAllBookings, getAllBookingsById } from "../../../provider/getData";

export default function AdminBookingItem() {
  return (
    <main>
      <h1>Booking item</h1>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  const user = await protectedRoute({ req });
  if (!user) {
    return { props: {}, redirect: { destination: "/admin/login" } };
  }

  if (typeof query.id !== "undefined") {
    const { data: booking } = await getAllBookingsById(query.id as string);
    return { props: { booking } };
  }

  return { props: {} };
};
