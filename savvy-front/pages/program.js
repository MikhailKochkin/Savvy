import React from "react";
import Program from "../components/course/Program";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["nav", "auth", "coursePage"])),
  },
});

const program = (props) => {
  return <Program id={props.query.id} form={props.query.form} />;
};

export default program;
