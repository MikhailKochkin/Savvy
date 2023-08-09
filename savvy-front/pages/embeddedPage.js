import React from "react";
import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import SingleLesson from "../components/lesson/SingleLesson";

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

const embeddedPage = (props) => {
  return (
    <DynamicNewSingleLesson
      id={props.query.id}
      embedded={true}
      // add={props.query.add}
    />
  );
};

export default embeddedPage;
