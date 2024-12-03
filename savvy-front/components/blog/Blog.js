import { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import styled from "styled-components";
import { useTranslation } from "next-i18next";

import CreatePost from "./CreatePost";
import PostCard from "./PostCard";
import Loading from "../layout/Loading";

const POSTS_QUERY = gql`
  query POSTS_QUERY {
    posts(where: { language: { equals: "en" } }, orderBy: { createdAt: desc }) {
      id
      title
      text
      tags
      language
      summary
      image
      likes
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

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #252f3f;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const PostsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const Posts = styled.div`
  padding: 100px 0;
  width: 80%;
  min-height: 500px;
  h1 {
    width: 100%;
    text-align: center;
    font-size: 6rem;
    line-height: 1.2;
    text-align: center;
    font-weight: 800;
    margin: 0;
    margin-bottom: 20px;
    color: #252f3f;
  }
  h2 {
    width: 100%;
    text-align: center;
    font-size: 2rem;
    line-height: 1.2;
    text-align: center;
    font-weight: 400;
    margin: 0;
    margin-bottom: 80px;
    color: #4b5563;
  }
  @media (max-width: 1300px) {
  }
  @media (max-width: 800px) {
    width: 100%;

    margin: 5% 0;
    padding: 0 25px;
    h1 {
      font-size: 3.4rem;
      margin-top: 30px;
      text-align: left;
    }
    h2 {
      font-size: 2.4rem;
      margin-top: 10px;
      margin-bottom: 30px;
      text-align: left;
    }
  }
`;

const Categories = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 40px;
  border-bottom: 2px solid #e2e8f0;
  margin-bottom: 40px;
  color: #4b5563;
  @media (max-width: 800px) {
    width: 100%;
    overflow-x: scroll;
    /* Hide scrollbar */
    scrollbar-width: none; /* Firefox */
  }

  /* Hide scrollbar for Webkit-based browsers */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Edge */
  }
`;

const Category = styled.h3`
  margin: 0;
  padding-bottom: 10px;
  font-weight: ${(props) => (props.active ? "600" : "500")};
  font-size: 1.8rem;
  border-bottom: ${(props) =>
    props.active ? "2px solid #383943" : "2px solid #fff"};
  cursor: pointer;
  @media (max-width: 800px) {
    flex: 0 0 auto; /* Allows scrolling while maintaining content size */
    margin: 0;
  }
`;

const Blog = (props) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [posts, setPosts] = useState([]);
  const { t } = useTranslation("blog");

  const { data, loading } = useQuery(POSTS_QUERY);
  useEffect(() => {
    if (data) {
      setPosts(data.posts);
    }
  }, [data]);

  if (loading) return <Loading />;

  return (
    <Styles>
      <Container>
        <Posts>
          <h1>The BeSavvy Blog</h1>
          <h2>
            We write about how AI and simulations can change legal training and
            education
          </h2>
          <Categories>
            <Category
              active={activeCategory === "all"}
              onClick={() => {
                setPosts(data.posts);
                setActiveCategory("all");
              }}
            >
              View All
            </Category>
            <Category
              active={activeCategory === "Law Firm Training"}
              onClick={() => {
                setPosts(
                  [...data.posts].filter((p) =>
                    p.tags.includes("Law Firm Training")
                  )
                );
                setActiveCategory("Law Firm Training");
              }}
            >
              Law Firm Training
            </Category>
            <Category
              active={activeCategory === "AI"}
              onClick={() => {
                setPosts([...data.posts].filter((p) => p.tags.includes("AI")));
                setActiveCategory("AI");
              }}
            >
              AI
            </Category>
            <Category
              active={activeCategory === "LMS"}
              onClick={() => {
                setPosts([...data.posts].filter((p) => p.tags.includes("LMS")));
                setActiveCategory("LMS");
              }}
            >
              LMS
            </Category>
            <Category
              active={activeCategory === "Simulators"}
              onClick={() => {
                setPosts(
                  [...data.posts].filter((p) => p.tags.includes("Simulators"))
                );
                setActiveCategory("Simulators");
              }}
            >
              Simulators
            </Category>
            <Category
              active={activeCategory === "Legal Tech"}
              onClick={() => {
                setPosts(
                  [...data.posts].filter((p) => p.tags.includes("Legal Tech"))
                );
                setActiveCategory("Legal Tech");
              }}
            >
              Legal Tech
            </Category>
          </Categories>
          <PostsContainer>
            {[...posts].map((d, index) => (
              <PostCard
                id={d.id}
                text={d.text}
                title={d.title}
                likes={d.likes}
                tags={d.tags}
                author={d.user}
                summary={d.summary}
                image={d.image}
                createdAt={d.createdAt}
                me={props.me}
                index={index + 1}
              />
            ))}
          </PostsContainer>
          {props.me &&
            props.me.permissions &&
            props.me.permissions.includes("ADMIN") && (
              <CreatePost me={props.me} />
            )}
        </Posts>
      </Container>
    </Styles>
  );
};

export default Blog;
export { POSTS_QUERY };
