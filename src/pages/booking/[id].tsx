import { GetStaticPaths, GetStaticProps } from "next";
import { IBookingLandingItem, IClass } from "../../interfaces";
import { contentApi } from "../../libs/contentful";
import { getClasses, getClassesById } from "../../provider/getData";
import BookClassView from "../../views/dynamicPath/BookClass.view";

export type ClassProps = {
  cls: IClass;
  bookingItemContent: IBookingLandingItem;
};

export default function BookClass({ cls, bookingItemContent }: ClassProps) {
  return <BookClassView bookingItemContent={bookingItemContent} cls={cls} />;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };
  const { data: cls, error } = await getClassesById(id);
  const content = await contentApi
    .getEntries({ content_type: "pageBookingItem" })
    .catch((err) => {
      throw new Error(err as string);
    });

  if (error || !content) {
    console.error(error);
    return {
      notFound: true,
    };
  }

  const bookingItemContent = content.items[0].fields;
  return {
    props: { cls, bookingItemContent },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: classes } = await getClasses();

  if (classes === null) {
    return {
      paths: [{ params: {} }],
      fallback: false,
    };
  }

  const paths = classes.map((cls) => ({ params: { id: cls.class_id } }));

  return {
    paths,
    fallback: false,
  };
};
