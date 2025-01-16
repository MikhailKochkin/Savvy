import CoursePageLayout from "../components/course/courseManagement/CoursePageLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

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
  const { id } = props.query || {};
  const router = useRouter();

  // Handle missing `id`
  if (!id) {
    return (
      <div>
        <p>Error: No course ID provided.</p>
        <p>Please check the URL or contact support if the issue persists.</p>
        <button onClick={() => router.push("/")}>Go to Courses</button>
      </div>
    );
  }

  return <CoursePageLayout id={id} />;
};

export default Course;
