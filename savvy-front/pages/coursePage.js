import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

import NewCoursePage from "../components/course/NewCoursePage";

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, [
      "coursePage",
      "nav",
      "auth",
      "create",
      "course",
    ])),
  },
});

const CoursePagePage = (props) => {
  const router = useRouter();
  const { id, form, down: promocode } = router.query || {};

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

  return <NewCoursePage id={id} form={form} promocode={promocode} />;
};

export default CoursePagePage;
