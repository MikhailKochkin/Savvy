import Courses from "../components/landing/LandingLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["landing", "nav", "auth"])),
  },
});

const Index = () => {
  return <Courses />;
};

export default Index;
