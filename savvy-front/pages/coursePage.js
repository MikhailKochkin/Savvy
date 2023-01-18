import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import NewCoursePage from "../components/course/NewCoursePage";

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, [
      "coursePage",
      "nav",
      "auth",
      "create",
    ])),
  },
});

const CoursePagePage = (props) => {
  return <NewCoursePage id={props.query.id} form={props.query.form} />;
};

export default CoursePagePage;
