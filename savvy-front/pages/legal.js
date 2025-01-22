import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

import Legal from "../components/layout/Legal";

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["nav"])),
  },
});
const LegalPage = (props) => {
  const router = useRouter();
  const { name } = router.query;
  return <Legal name={name} />;
};

export default LegalPage;
