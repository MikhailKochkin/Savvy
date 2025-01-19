import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";

import { useUser } from "../components/User";
const DynamicSubscription = dynamic(
  import("../components/subscription/Subscription"),
  {
    loading: () => <p>...</p>,
    ssr: false,
  }
);

export const getServerSideProps = async ({ query, locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["nav", "blog", "landing"])),
    query,
  },
});

const SubscriptionPage = ({ query }) => {
  const me = useUser();
  return (
    <DynamicSubscription
      me={me}
      courseId={query.courseId}
      referrerId={query.referrerId}
      referrerName={query.referrerName}
      // avalable types: "gift", "special"
      type={query.type}
    />
  );
};

export default SubscriptionPage;
