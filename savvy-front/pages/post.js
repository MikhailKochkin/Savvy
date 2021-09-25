import Post from "../components/blog/Post";
import { useUser } from "../components/User";

const PostPage = (props) => {
  const me = useUser();

  return <Post id={props.query.id} me={me} />;
};

export default PostPage;
