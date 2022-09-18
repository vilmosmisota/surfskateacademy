import { GetStaticPaths, GetStaticProps } from "next";
import { IBookingDetails, IBookingDetailsPage } from "../../../interfaces";
import { contentApi } from "../../../libs/contentful";
import BookingDetailView from "../../../views/booking/details/BookingDetail.view";

export default function BookingDetailPage({
  bookingDetail,
}: {
  bookingDetail: IBookingDetailsPage;
}) {
  return <BookingDetailView bookingDetail={bookingDetail} />;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { page } = params as { page: string };
  const content = await contentApi
    .getEntries({
      content_type: "pageBookingDetails",
      "fields.page": page,
    })
    .catch((err) => {
      throw new Error(err as string);
    });

  if (!content) {
    return { notFound: true };
  }

  const bookingDetail = content.items[0].fields;

  return { props: { bookingDetail } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const contents = await contentApi
    .getEntries({
      content_type: "pageBookingDetails",
    })
    .catch((err) => {
      console.error(err);
      return undefined;
    });

  if (typeof contents === "undefined") {
    return {
      paths: [{ params: {} }],
      fallback: false,
    };
  }
  const bookingDetails = contents.items as IBookingDetails[];
  const paths = bookingDetails.map((item) => {
    return {
      params: { page: item.fields.page },
    };
  });

  return {
    paths,
    fallback: false,
  };
};
