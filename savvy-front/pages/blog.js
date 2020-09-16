import React from "react";
import User from "../components/User";
import Blog from "../components/blog/Blog";

const BlogPage = () => <User>{({ data: { me } }) => <Blog me={me} />}</User>;

export default BlogPage;