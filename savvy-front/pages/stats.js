import Stats from "../components/stats/Stats";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["nav", "auth"])),
  },
});
const StatsPage = (props) => (
  <Stats id={props.query.id} name={props.query.name} />
);

export default StatsPage;
