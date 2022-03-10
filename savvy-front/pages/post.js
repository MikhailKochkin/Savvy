import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useQuery, gql } from "@apollo/client";

import Post from "../components/blog/Post";
import { useUser } from "../components/User";

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["nav", "blog", "landing"])),
  },
});

const POST_QUERY = gql`
  query POST_QUERY($id: String!) {
    post(where: { id: $id }) {
      id
      title
      text
      tags
      likes
      summary
      language
      image
      user {
        id
        name
        surname
        image
      }
      createdAt
    }
  }
`;

const PostPage = (props) => {
  const me = useUser();

  const {
    loading: post_loading,
    error: post_error,
    data: post_data,
  } = useQuery(POST_QUERY, {
    variables: { id: props.query.id },
  });

  if (post_loading) return <p>Загрузка...</p>;
  if (post_error) return post_error;
  let post = post_data.post;

  return <Post id={props.query.id} me={me} post={post} />;
};

export default PostPage;
