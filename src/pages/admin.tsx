import { GetServerSideProps } from "next";
import { protectedRoute } from "../provider/auth";
import { getNumOfUnreadBookings } from "../provider/getData";
import AdminView from "../views/admin/Admin.view";

export type AdminProps = {
  count: number | null;
};

export default function Admin({ count }: AdminProps) {
  return <AdminView count={count} />;
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const user = await protectedRoute({ req });
  if (!user) {
    return { props: {}, redirect: { destination: "/admin/login" } };
  }
  const { count } = await getNumOfUnreadBookings();

  return { props: { count } };
};
