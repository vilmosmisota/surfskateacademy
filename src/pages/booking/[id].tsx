import { GetStaticPaths, GetStaticProps } from "next";
import { IClass } from "../../interfaces";
import { getClasses, getClassesById } from "../../provider/getData";
import BookClassView from "../../views/dynamicPath/BookClass.view";

export type ClassProps = {
  cls: IClass;
};

export default function BookClass({ cls }: ClassProps) {
  return <BookClassView cls={cls} />;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };
  const { data: cls, error } = await getClassesById(id);

  if (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
  return {
    props: { cls },
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
