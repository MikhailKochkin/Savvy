import React from "react";
import Navigator from "../components/navigator/Navigator";
import { useUser } from "../components/User";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["nav", "auth"])),
  },
});

const navigator = (props) => {
  const me = useUser();

  return (
    <Navigator
      me={me}
      referal={props.query.referal}
      level={props.query.level}
      tags={props.query.tags}
    />
  );
};

export default navigator;
