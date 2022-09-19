import { GetServerSideProps } from "next";
import { IBookingLandingItem, IClass } from "../../interfaces";
import { contentApi } from "../../libs/contentful";
import { getClassesById } from "../../provider/getData";
import BookClassView from "../../views/dynamicPath/BookClass.view";

export type ClassProps = {
  cls: IClass;
  bookingItemContent: IBookingLandingItem;
};

export default function BookClass({ cls, bookingItemContent }: ClassProps) {
  return <BookClassView bookingItemContent={bookingItemContent} cls={cls} />;
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (typeof query.id === "undefined") {
    return { notFound: true };
  }

  const { data: cls, error } = await getClassesById(query.id as string);
  const content = await contentApi
    .getEntries({ content_type: "pageBookingItem" })
    .catch((err) => {
      throw new Error(err as string);
    });

  if (error || !content) {
    console.warn(error);
    console.warn(content);
    return { notFound: true };
  }

  const bookingItemContent = content.items[0].fields;
  return {
    props: { cls, bookingItemContent },
  };
};
