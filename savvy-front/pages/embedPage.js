import React from "react";
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

const embedPage = (props) => {
  const router = useRouter();
  const { url, referrer } = router.query;

  // Handle the case when url or referrer is not provided
  // if (!url || !referrer) {
  //   return <div>Invalid url or referrer</div>;
  // }

  return (
    <DynamicNewSingleLesson
      id={props.query.id}
      embedded={true}
      authSource={props.query.authSource}
      // add={props.query.add}
    />
  );
};

export default embedPage;
