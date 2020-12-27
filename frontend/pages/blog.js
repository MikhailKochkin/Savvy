import { useState } from "react";
import { useUser } from "../components/User";

import Blog from "../components/blog/Blog";

const BlogPage = () => {
  const me = useUser();
  return <Blog me={me} />;
};

BlogPage.getInitialProps = async () => ({
  namespacesRequired: ["search"],
});

export default BlogPage;
