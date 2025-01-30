import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, [
      "lesson",
      "nav",
      "auth",
      "create",
    ])),
  },
});

const DynamicNewSingleLesson = dynamic(
  import("../components/demo/DemoLesson"),
  {
    ssr: false,
  }
);

const demo = () => {
  return <DynamicNewSingleLesson id="cm60o96o20004xsowrbm20v16" />;
};

export default demo;
