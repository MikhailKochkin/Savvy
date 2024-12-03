import CoursePageLayout from "../components/course/courseManagement/CoursePageLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, [
      "course",
      "nav",
      "auth",
      "create",
    ])),
  },
});

const Course = (props) => {
  return <CoursePageLayout id={props.query.id} />;
};

export default Course;
