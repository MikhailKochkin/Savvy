import React from "react";
import Program from "../components/programs/Program";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["nav", "auth"])),
  },
});

const program = (props) => {
  return <Program id={props.query.id} />;
};

export default program;
