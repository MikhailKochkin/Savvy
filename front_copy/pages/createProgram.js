import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CreateProgram from "../components/create/CreateProgram";

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["nav", "create"])),
  },
});

const CreateProgramPage = (props) => <CreateProgram />;

export default CreateProgramPage;
