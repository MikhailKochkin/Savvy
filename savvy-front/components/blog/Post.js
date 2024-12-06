import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import styled from "styled-components";
import moment from "moment";
import parse from "html-react-parser";
import Head from "next/head";
import { useRouter } from "next/router";

import UpdatePost from "./UpdatePost";
import Loading from "../layout/Loading";
import TableOfContents from "./TableOfContents";
import { SecondaryButton, Buttons } from "../lesson/styles/DevPageStyles";

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
      lessonId
      leadin
      emailCampaignId
      user {
        id
        name
        surname
        image
      }
      coursePage {
        id
        title
        lessons {
          id
          type
        }
        user {
          id
          name
          surname
        }
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
  padding-top: 20px;
  margin-bottom: 50px;
  @media (max-width: 800px) {
    padding-top: 10px;
  }
  img {
    display: block;
    width: 100%;
    box-shadow: "0 0 0 2px blue;";
  }
  h2 {
    font-size: 2.6rem;
    margin: 0;
    margin-bottom: 30px;
    line-height: 1.2;
    color: #252f3f;
  }
  iframe {
    width: 100%;
    height: 400px;
    @media (max-width: 800px) {
      width: 100%;
      height: 300px;
    }
  }
  .video-container {
    width: 100%;
    width: 400px;
    margin: 0 auto;
    text-align: center;
  }
  video {
    max-width: 100%;
    height: auto;
  }
  .video-fit {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media (max-width: 800px) {
    .video-container {
      width: 350px;
    }
    .video-fit {
      width: 350px;
      height: 100%;
    }
  }
  .video_block {
    margin: 35px 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .short_video {
      height: 489px;
      width: 275px;
      iframe {
        width: 100%;
        border: none;
        height: 100%;
        border-radius: 15px;
      }
    }
  }
  a {
    color: #003eff;
    &:hover {
      text-decoration: underline;
    }
  }
  .text {
    padding: 5% 0;
    border-bottom: 1px solid #001f4e;
    font-size: 1.6rem;
  }
  .flag {
    color: #008489;
    font-size: 1.8rem;
    width: 100%;
    margin: 3% 0;
    padding: 3% 8%;
    background-color: #f2fafb;
    border-radius: 5px;
  }
  blockquote {
    font-size: 1.6rem;
    width: 100%;
    margin: 0;
    padding: 1% 4%;
    border-left: 3px solid #0094c6;
    p {
      margin: 10px 0;
    }
  }

  .article {
    font-size: 1.6rem;
    width: 100%;
    margin: 1% 1%;
    padding: 1% 4%;
    border-left: 3px solid #0094c6;

    p {
      margin: 10px 0;
    }
  }

  .date {
    font-weight: bold;
    font-size: 1.6rem;
  }

  .title {
    width: 90%;
  }
`;

const ProgressBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 0;
  height: 8px;
  background-color: #3498db;
  z-index: 9999;
`;

const Container = styled.div`
  width: 980px;
  .author {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 2rem;
    margin-top: 20px;
    color: #252f3f;
  }
  @media (max-width: 800px) {
    width: 90%;
  }
`;

const BlogPost = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostIntroContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  h1 {
    font-size: 3.4rem;
    margin: 0;
    margin-bottom: 30px;
    line-height: 1.2;
    color: #252f3f;
    @media (max-width: 800px) {
      font-size: 3.2rem;
    }
  }
  img {
    display: block;
    height: 100%;
    object-fit: cover;

    box-shadow: "0 0 0 2px blue;";
  }
`;

const PostBodyContainer = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 800px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const SideColumn = styled.div`
  padding: 20px 0;
  width: 30%;
  padding-right: 20px;
  .name {
    font-style: italic;
  }
  #written_by {
    font-weight: 600;
    margin-bottom: 15px;
  }
  @media (max-width: 800px) {
    width: 95%;
    padding-right: 0;
  }
`;

const SideColumnBlock = styled.div`
  margin-top: 20px;
  border-bottom: 1px solid #f0f1f1;
  .author_info {
    font-size: 1.4rem;
    color: #6b7280;
    line-height: 1.4;
    font-style: italic;
  }
  button {
    background-color: #141416;
    color: white;
    border: none;
    width: 95%;
    padding: 10px 14px;
    font-size: 14px;
    border-radius: 12px;
    font-family: Montserrat;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s;
    margin: 20px 0;
    &:hover {
      background-color: #2d2d31;
    }
  }
`;

const MainColumn = styled.div`
  width: 70%;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 10px;
  padding-bottom: 10px;
  img {
    width: 55px;
    height: 55px;
    border-radius: 50px;
    margin-right: 10px;
    margin-bottom: 10px;
  }
  #author_name {
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

const Post = (props) => {
  const router = useRouter();

  const {
    loading: post_loading,
    error: post_error,
    data: post_data,
  } = useQuery(POST_QUERY, {
    variables: { id: props.id },
  });

  const [scrollProgress, setScrollProgress] = useState(0);
  const [update, setUpdate] = useState(false);

  if (post_loading) return <Loading />;
  if (post_error) return post_error;
  let post = post_data.post;

  moment.locale("ru");
  return (
    <>
      <Head>
        <title>{post.title} | besavvy</title>
        <meta name="description" content={post.summary} />
        <meta name="keywords" content={post.tags.join(", ")} />
      </Head>
      <Styles id={props.id}>
        <Container>
          <Buttons>
            <SecondaryButton
              onClick={(e) =>
                router.push("/blog", {
                  locale: "en",
                })
              }
            >
              Back
            </SecondaryButton>
            {props.me &&
              props.me.permissions &&
              props.me.permissions.includes("ADMIN") && (
                <SecondaryButton onClick={(e) => setUpdate(!update)}>
                  Switch
                </SecondaryButton>
              )}
          </Buttons>
          {!update && (
            <BlogPost>
              <PostIntroContainer>
                <h1>{post.title}</h1>
                <img src={post.image} />
              </PostIntroContainer>
              <PostBodyContainer>
                <SideColumn>
                  <TableOfContents text={post.text} />
                  <SideColumnBlock>
                    <div id="written_by">Written by</div>
                    <AuthorInfo>
                      <img src={post.user.image} />
                      <div>
                        <div id="author_name">
                          {post.user.name} {post.user.surname}
                        </div>
                        <div className="author_info">Founder of besavvy</div>
                      </div>
                    </AuthorInfo>
                  </SideColumnBlock>
                  <SideColumnBlock>
                    <div className="author_info">
                      BeSavvy is a go-to platform for building training
                      simualtions for law firms
                    </div>
                    <button
                      onClick={(e) =>
                        router.push("/", {
                          locale: "en",
                        })
                      }
                    >
                      Learn about BeSavvy
                    </button>
                  </SideColumnBlock>
                </SideColumn>
                <MainColumn>
                  <article>
                    <div className="text">{parse(post.text)}</div>
                  </article>
                  <>
                    <span className="date">
                      {moment(post.createdAt).format("DD MMM YYYY")}
                    </span>
                    <SideColumnBlock>
                      <div className="author_info">
                        BeSavvy is an AI-powered platform transforming how
                        lawyers train and develop essential skills. With
                        engaging simulations, we help legal professionals build
                        hard, soft, tech, and management skills needed to excel
                        in their careers.
                      </div>
                      <button
                        onClick={(e) =>
                          router.push("/", {
                            locale: "en",
                          })
                        }
                      >
                        Learn about BeSavvy
                      </button>
                    </SideColumnBlock>
                  </>
                </MainColumn>
              </PostBodyContainer>
            </BlogPost>
          )}
          {update && (
            <UpdatePost
              id={post.id}
              text={post.text}
              title={post.title}
              tags={post.tags}
              summary={post.summary}
              image={post.image}
            />
          )}
          {scrollProgress < 100 && (
            <ProgressBar style={{ width: `${scrollProgress}%` }} />
          )}
        </Container>
      </Styles>
    </>
  );
};

export default Post;
