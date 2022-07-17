import { GetStaticProps } from "next";
import { IClass } from "../interfaces";
import { getClasses } from "../provider/getData";
import BookingView from "../views/booking/Booking.view";

export type ClassesProps = {
  classes: IClass[];
};

export default function Booking({ classes }: ClassesProps) {
  return <BookingView classes={classes} />;
}

export const getStaticProps: GetStaticProps = async () => {
  const { data: classes, error } = await getClasses();

  if (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
  return {
    props: { classes },
  };
};
