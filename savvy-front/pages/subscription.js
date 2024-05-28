import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";

import { useUser } from "../components/User";
const DynamicSubscription = dynamic(import("../components/Subscription"), {
  loading: () => <p>...</p>,
  ssr: false,
});

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["nav", "blog"])),
  },
});

const SubscriptionPage = (props) => {
  console.log("props.query.courseId", props.query.courseId);
  const me = useUser();
  return <DynamicSubscription me={me} courseId={props.query.courseId} />;
};

export default SubscriptionPage;