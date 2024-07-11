import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";

import { useUser } from "../components/User";
const DynamicSubscription = dynamic(import("../components/Subscription"), {
  loading: () => <p>...</p>,
  ssr: false,
});

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["nav", "blog", "landing"])),
  },
});

const SubscriptionPage = (props) => {
  const me = useUser();
  return (
    <DynamicSubscription
      me={me}
      courseId={props.query.courseId}
      referrerId={props.query.referrerId}
      referrerName={props.query.referrerName}
    />
  );
};

export default SubscriptionPage;
