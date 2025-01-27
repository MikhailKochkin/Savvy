import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["lesson", "nav", "auth"])),
  },
});

const DynamicLessonPlan = dynamic(
  () => import("../components/course/course_plan/PlanDataLoad"),
  {
    ssr: false, // Disable SSR if the component doesn't need it
  }
);

const PlanPage = (props) => {
  const router = useRouter();

  const { id } = router.query;

  if (!id) {
    return (
      <div>
        <p>Error: No lesson ID provided.</p>
        <p>Please check the URL or contact support if the issue persists.</p>
      </div>
    );
  }

  return <DynamicLessonPlan id={id} />;
};

export default PlanPage;
