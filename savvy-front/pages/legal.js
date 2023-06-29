import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Legal from "../components/Legal";

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["nav"])),
  },
});
const LegalPage = (props) => <Legal name={props.query.name} />;

export default LegalPage;
