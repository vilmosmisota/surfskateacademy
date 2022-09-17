import { GetServerSideProps } from "next";
import {
  IBookingLandingContent,
  IBookingLandingContentRaw,
  IClass,
} from "../interfaces";
import { contentApi } from "../libs/contentful";
import { getClasses } from "../provider/getData";
import BookingView from "../views/booking/Booking.view";

export type ClassesProps = {
  classes: IClass[];
  bookingContent: IBookingLandingContent;
};

export default function Booking({ classes, bookingContent }: ClassesProps) {
  return <BookingView classes={classes} bookingContent={bookingContent} />;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: classes, error } = await getClasses();
  const content = await contentApi
    .getEntries({ content_type: "pageBookingLanding" })
    .catch((err) => {
      throw new Error(err as string);
    });

  if (error || !content) {
    console.error(error);
    return {
      notFound: true,
    };
  }

  const c = content.items[0].fields as IBookingLandingContentRaw;
  const { quotes } = c;
  const randomNumber = Math.floor(Math.random() * quotes.length);

  const bookingContent: IBookingLandingContent = {
    ...c,
    quotes: quotes[randomNumber],
  };

  return {
    props: { classes, bookingContent },
  };
};
