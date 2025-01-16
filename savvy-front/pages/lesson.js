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
      {type === "old" && <OldSingleLesson id={id} />}
      {type === "regular" && <SingleLesson id={id} />}

      {type === "story" && (
        <DynamicNewSingleLesson
          id={id}
          size={size}
          add={add}
          step={step}
          authSource={authSource}
        />
      )}

      {type === "stats" && <SimulatorAnalyticsDataLoad id={id} />}

      {type === "challenge" && <Challenge id={id} />}

      {!type && (
        <div>The link is incorrect. Please check the URL and try again.</div>
      )}
    </div>
  );
};

export default LessonPage;
