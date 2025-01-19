import React from "react";
import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

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

const demo = (props) => {
  const router = useRouter();
  const { query } = router;
  return (
    <div>
      {query.lang == "eng" ? (
        <DynamicNewSingleLesson id="clmz0cqak00720t0xpltjg7wf" />
      ) : (
        <DynamicNewSingleLesson id="ckfc5hguf03ou0702y6fmm4wq" />
      )}
    </div>
  );
};

export default demo;
