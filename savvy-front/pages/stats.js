import { useRouter } from "next/router";
import Stats from "../components/stats/courseStats/CourseStats";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["nav", "auth"])),
  },
});
const StatsPage = () => {
  const router = useRouter();

  return <Stats id={router.query.id} name={router.query.name} />;
};

export default StatsPage;
