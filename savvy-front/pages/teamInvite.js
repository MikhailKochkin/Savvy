import Invite from "../components/Invite";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["account", "auth", "nav"])),
  },
});

const teamInvite = (props) => (
  <div>
    <Invite id={props.query.id} />
  </div>
);

export default teamInvite;
