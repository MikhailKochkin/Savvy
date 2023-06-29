import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CreateLesson from "../components/create/CreateLesson";

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["nav", "create"])),
  },
});

const CreateTextPage = (props) => <CreateLesson id={props.query.id} />;

export default CreateTextPage;
