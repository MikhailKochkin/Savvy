import CoursePage from "../components/course/CoursePage";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["course", "nav", "auth"])),
  },
});

const Course = (props) => {
  return <CoursePage id={props.query.id} />;
};

export default Course;
