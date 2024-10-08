import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Auth from "../components/auth/Auth";

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["nav", "auth"])),
  },
});
const auth = (props) => {
  return (
    <Auth
      pathname={props.query.pathname}
      referrerId={props.query.referrerId}
      id={props.query.id}
      type="main"
      authSource={props.query.authSource}
    />
  );
};

export default auth;
