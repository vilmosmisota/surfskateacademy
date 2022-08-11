import { GetServerSideProps } from "next";
import { IClass } from "../../interfaces";
import { getClasses } from "../../provider/getData";
import AdminClassesView from "../../views/admin/classes/AdminClasses.view";

export default function AdminClasses({ classes }: { classes: IClass[] }) {
  return <AdminClassesView classes={classes} />;
}

export const getServerSideProps: GetServerSideProps = async () => {
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
