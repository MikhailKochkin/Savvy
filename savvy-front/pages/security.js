import React from "react";
import SecurityPage from "../components/security/SecurityPage";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["nav", "auth"])),
  },
});

const security = () => {
  return <SecurityPage />;
};

export default security;
