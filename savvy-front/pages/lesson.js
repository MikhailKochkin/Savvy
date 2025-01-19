import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["lesson", "nav", "auth"])),
  },
});

const DynamicNewSingleLesson = dynamic(
  import("../components/lesson/NewSingleLesson"),
  {
    ssr: false,
  }
);

// const DynamicOldSingleLesson = dynamic(
//   () => import("../components/lesson/OldSingleLesson"),
//   {
//     ssr: false, // Disable SSR if the component doesn't need it
//   }
// );

const LessonPage = (props) => {
  const router = useRouter();

  const { type, id, size, add, step, authSource } = router.query;

  if (!id) {
    return (
      <div>
        <p>Error: No lesson ID provided.</p>
        <p>Please check the URL or contact support if the issue persists.</p>
      </div>
    );
  }

  return (
    <DynamicNewSingleLesson
      id={id}
      size={size}
      add={add}
      step={step}
      authSource={authSource}
    />
  );
};

export default LessonPage;
