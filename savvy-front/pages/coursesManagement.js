import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Educator from "../components/course/courseManagement/MyCourses";
import { useUser } from "../components/User";
import Loading from "../components/layout/Loading";

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["nav", "educator", "course"])),
  },
});

const CoursesManagement = () => {
  const me = useUser();

  return (
    <>
      {!me && <Loading />}

      {me && <Educator me={me} />}
    </>
  );
};

export default CoursesManagement;
