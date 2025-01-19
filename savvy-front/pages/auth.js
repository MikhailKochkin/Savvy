import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

import Auth from "../components/auth/Auth";

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["nav", "auth"])),
  },
});

const auth = () => {
  const router = useRouter();
  const { pathname, referrerId, id, authSource } = router.query;

  return (
    <Auth
      pathname={pathname}
      referrerId={referrerId}
      id={id}
      type="main"
      authSource={authSource}
    />
  );
};

export default auth;
