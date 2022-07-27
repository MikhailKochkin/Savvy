import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Educator from "../components/teach/Educator";
import { useUser } from "../components/User";

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["nav", "educator", "course"])),
  },
});

const EducatorPage = () => {
  const me = useUser();
  return <Educator me={me} />;
};

export default EducatorPage;
