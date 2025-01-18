import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import SingleLesson from "../components/lesson/SingleLesson";
import Challenge from "../components/lesson/lesson_type_challenge//Challenge";
import OldSingleLesson from "../components/lesson/OldSingleLesson";
import SimulatorAnalyticsDataLoad from "../components/stats/simulatorStats/SimulatorAnalyticsDataLoad";

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

const DynamicSingleLesson = dynamic(
  () => import("../components/lesson/SingleLesson"),
  {
    ssr: false, // Disable SSR if the component doesn't need it
  }
);

const DynamicOldSingleLesson = dynamic(
  () => import("../components/lesson/OldSingleLesson"),
  {
    ssr: false, // Disable SSR if the component doesn't need it
  }
);

const DynamicSimulatorAnalyticsDataLoad = dynamic(
  () => import("../components/stats/simulatorStats/SimulatorAnalyticsDataLoad"),
  {
    ssr: false, // Disable SSR if the component doesn't need it
  }
);

const DynamicChallenge = dynamic(
  () => import("../components/lesson/lesson_type_challenge/Challenge"),
  {
    ssr: false, // Disable SSR if the component doesn't need it
  }
);

const LessonPage = (props) => {
  const { type, id, size, add, step, authSource } = props.query || {};

  if (!id) {
    return (
      <div>
        <p>Error: No lesson ID provided.</p>
        <p>Please check the URL or contact support if the issue persists.</p>
      </div>
    );
  }

  return (
    <div>
      {type === "old" && <DynamicOldSingleLesson id={id} />}
      {type === "regular" && <DynamicSingleLesson id={id} />}

      {type === "story" && (
        <DynamicNewSingleLesson
          id={id}
          size={size}
          add={add}
          step={step}
          authSource={authSource}
        />
      )}

      {type === "stats" && <DynamicSimulatorAnalyticsDataLoad id={id} />}

      {type === "challenge" && <DynamicChallenge id={id} />}

      {!type && (
        <div>The link is incorrect. Please check the URL and try again.</div>
      )}
    </div>
  );
};

export default LessonPage;
