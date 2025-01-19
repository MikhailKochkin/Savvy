import Reset from "../components/auth/Reset";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["auth"])),
  },
});

const ResetPage = (props) => {
  const router = useRouter();
  return (
    <div>
      <Reset resetToken={router.query.resetToken} />
    </div>
  );
};

export default ResetPage;
