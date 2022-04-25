import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import NewCoursePage from "../components/course/NewCoursePage";
import { useUser } from "../components/User";

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["coursePage", "nav", "auth"])),
  },
});

const CoursePagePage = (props) => {
  const me = useUser();

  return <NewCoursePage id={props.query.id} />;
};

export default CoursePagePage;
