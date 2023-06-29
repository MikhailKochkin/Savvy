import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { useUser } from "../components/User";
import Blog from "../components/blog/Blog";

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["nav", "blog"])),
  },
});

const BlogPage = () => {
  const me = useUser();
  return <Blog me={me} />;
};

export default BlogPage;
