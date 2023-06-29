import React from "react";
import Navigator from "../components/navigator/Navigator";
import { useUser } from "../components/User";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, [
      "nav",
      "auth",
      "lesson",
      "navigator",
    ])),
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
      id={props.query.id}
      name={props.query.name}
      email_link={props.query.email_link}
    />
  );
};

export default navigator;
