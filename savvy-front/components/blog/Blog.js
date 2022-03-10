import { Query } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import styled from "styled-components";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import CreatePost from "./CreatePost";
import PostCard from "./PostCard";

const POSTS_QUERY = gql`
  query POSTS_QUERY {
    posts(orderBy: { createdAt: desc }) {
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

const Blog = (props) => {
  const { t } = useTranslation("blog");
  const router = useRouter();

  return (
    <Styles>
      <Container>
        <Posts>
          <h1>The BeSavvy Blog</h1>
          <h2>{t("h2")}</h2>
          <Query query={POSTS_QUERY}>
            {({ data, loading, fetchMore }) => {
              if (loading) return <p>Загрузка...</p>;
              let posts = [...data.posts].filter(
                (p) => p.language == router.locale
              );
              return (
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
              );
            }}
          </Query>
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
