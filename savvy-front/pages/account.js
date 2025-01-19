import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

import AccountPage from "../components/AccountPage";

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, [
      "nav",
      "account",
      "auth",
      "create",
    ])),
  },
});

const AccountPagePage = () => {
  const router = useRouter();

  const { id } = router.query;

  if (!id) {
    return (
      <div>
        <p>Error: No account ID provided.</p>
        <p>Please check the URL or contact support if the issue persists.</p>
      </div>
    );
  }
  return (
    <div>
      <AccountPage id={id} />
    </div>
  );
};

export default AccountPagePage;
