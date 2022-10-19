import UpdateCoursePage from "../components/course/UpdateCoursePage";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["coursePage", "nav", "auth"])),
  },
});
const change = (props) => <UpdateCoursePage id={props.query.id} />;

export default change;
