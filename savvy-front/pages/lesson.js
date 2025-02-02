import SingleLesson from "../components/lesson/SingleLesson";
import Challenge from "../components/lesson/lesson_type_challenge//Challenge";
import OldSingleLesson from "../components/lesson/OldSingleLesson";
import SimulatorAnalyticsDataLoad from "../components/stats/simulatorStats/SimulatorAnalyticsDataLoad";
import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

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

const LessonPage = (props) => (
  <div>
    {props.query.type === "old" && <OldSingleLesson id={props.query.id} />}

    {props.query.type === "regular" && <SingleLesson id={props.query.id} />}
    {props.query.type === "story" && (
      <DynamicNewSingleLesson
        id={props.query.id}
        size={props.query.size}
        add={props.query.add}
        step={props.query.step}
        authSource={props.query.authSource}
      />
    )}
    {props.query.type === "stats" && (
      <SimulatorAnalyticsDataLoad id={props.query.id} />
    )}
    {props.query.type === "challenge" && <Challenge id={props.query.id} />}
    {!props.query.type && (
      <div>The link is incorrect. Please check the URL and try again.</div>
    )}
  </div>
);

export default LessonPage;
