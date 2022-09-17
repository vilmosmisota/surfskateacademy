import { GetStaticProps } from "next";
import { IClassesContent } from "../interfaces";
import { contentApi } from "../libs/contentful";
import ClassesView from "../views/classes/Classes.view";

export default function Classes({
  classesContent,
}: {
  classesContent: IClassesContent;
}) {
  return <ClassesView classesContent={classesContent} />;
}

export const getStaticProps: GetStaticProps = async () => {
  const content = await contentApi
    .getEntries({ content_type: "pageClasses" })
    .catch((err) => {
      throw new Error(err as string);
    });

  if (!content) {
    return { notFound: true };
  }

  const classesContent = content.items[0].fields as IClassesContent;

  return {
    props: { classesContent },
  };
};
