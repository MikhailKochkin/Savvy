import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import AccountPage from "../components/AccountPage";

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["nav", "account", "auth"])),
  },
});

const AccountPagePage = (props) => (
  <div>
    <AccountPage id={props.query.id} />
  </div>
);

export default AccountPagePage;
