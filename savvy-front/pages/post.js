import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import Post from "../components/blog/Post";
import { useUser } from "../components/User";
export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["nav", "blog", "landing"])),
  },
});

const PostPage = (props) => {
  const me = useUser();

  return <Post id={props.query.id} me={me} />;
};

export default PostPage;
