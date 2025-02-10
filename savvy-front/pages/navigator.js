import React from "react";
import Navigator from "../components/navigator/Navigator";
import { useRouter } from "next/router";
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

const navigator = () => {
  const router = useRouter();
  const { id, referal, level, tags, name, email_link } = router.query;
  const me = useUser();

  return (
    <Navigator
      me={me}
      referal={referal}
      level={level}
      tags={tags}
      id={id}
      name={name}
      email_link={email_link}
    />
  );
};

export default navigator;
