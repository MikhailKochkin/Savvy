// import { useUser } from "../components/User";
import BuildYourSimulator from "../components/BuildYourSimulator";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["nav", "blog"])),
  },
});

const BuildPage = () => {
  //   const me = useUser();
  return <BuildYourSimulator />;
};

export default BuildPage;
