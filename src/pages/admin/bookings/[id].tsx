import { GetServerSideProps } from "next";
import { IBooking } from "../../../interfaces";
import { protectedRoute } from "../../../provider/auth";
import { getBookingById } from "../../../provider/getData";

import BookedItemView from "../../../views/admin/dynamicPath/BookedItem.view";

export type AdminBookedItemProps = {
  booking: IBooking;
};

export default function AdminBookedItem({ booking }: AdminBookedItemProps) {
  return <BookedItemView booking={booking} />;
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
    const { data: booking } = await getBookingById(query.id as string);
    return { props: { booking } };
  }

  return { notFound: true };
};
