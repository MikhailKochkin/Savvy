import React, { useEffect, useRef, useState } from "react";
import renderHTML from "react-render-html";
import { useQuery, useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import moment from "moment";
import Link from "next/link";
import { useTranslation } from "next-i18next";

import UpdatePost from "./UpdatePost";
import Modal from "styled-react-modal";
import ContactForm from "../landing/ContactForm";
import BottomLine from "./BottomLine";
import Navigator from "../navigator/Navigator";
import Loading from "../Loading";

const UPDATE_POST_MUTATION = gql`
  mutation UPDATE_POST_MUTATION($id: String!, $likes: Int, $tags: [String]) {
    updatePost(id: $id, likes: $likes, tags: $tags) {
      id
    }
  }
`;

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
      user {
        id
        name
        surname
        image
      }
      coursePage {
        id
        title
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
    max-height: 50em;
    box-shadow: "0 0 0 2px blue;";
  }
  h1 {
    font-size: 3rem;
    margin: 0;
    margin-bottom: 30px;
    line-height: 1.2;
    color: #252f3f;
    @media (max-width: 800px) {
      font-size: 2.6rem;
    }
  }
  h2 {
    font-size: 2rem;
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
  .date {
    font-weight: bold;
    font-size: 1.6rem;
  }
  /* margin-bottom: 50px; */
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

const PostContainer = styled.div`
  width: 100%;
  /* margin-bottom: 50px; */
  button {
    margin: 50px 0;
  }
  .author {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 2rem;
    margin-top: 20px;
    color: #252f3f;
    .name {
      font-style: italic;
    }
    img {
      width: 45px;
      height: 45px;
      border-radius: 50px;
      margin-right: 20px;
    }
  }
  @media (max-width: 800px) {
    width: 90%;
  }
`;

const Banner = styled.div`
  width: 50%;
  background: #479bc5;
  margin: 5% 0;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4% 0;
  .header {
    font-size: 2.4rem;
  }
  .comment {
    font-size: 1.6rem;
    text-align: center;
    line-height: 1.2;
    margin: 2%;
  }
  @media (max-width: 800px) {
    width: 100%;
    height: 300px;
    .comment {
      margin: 4%;
    }
    .buttons {
      text-align: center;
      padding: 0 2%;
      margin-bottom: 4%;
    }
  }
`;

const StyledModal = Modal.styled`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 1px solid grey;
  border-radius: 10px;
  max-width: 40%;
  min-width: 400px;
  @media (max-width: 1300px) {
    max-width: 70%;
    min-width: 200px;
    margin: 10px;
    max-height: 100vh;
    overflow-y: scroll;
  }
  @media (max-width: 800px) {
    max-width: 90%;
    min-width: 200px;
    margin: 10px;
    max-height: 100vh;
    overflow-y: scroll;
  }
`;

const Button = styled.button`
  background: #2a79c0;
  color: white;
  font-weight: bold;
  cursor: pointer;
  border: none;
  padding: 2%;
  font-family: Montserrat;
  border-radius: 5px;
  margin-top: 2%;
  width: 50%;
  outline: 0;
  &:hover {
    background: #174975;
  }
  @media (max-width: 800px) {
    padding: 3%;
  }
`;

const Feedback = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 3%;
  font-size: 1.6rem;
  img {
    width: 25px;
    margin-right: 10px;
    cursor: pointer;
    &:hover {
      filter: drop-shadow(0px 0px 3px #a0ced9);
    }
  }
  .question {
    flex-basis: 40%;
    span {
      cursor: pointer;
      font-style: italic;
      &:hover {
        text-decoration: underline;
      }
    }
    @media (max-width: 900px) {
      flex-basis: 60%;
    }
  }
  .favorite {
    display: flex;
    flex-basis: 60%;
    font-weight: bold;
    font-size: 1.6rem;
    flex-direction: row;
    @media (max-width: 900px) {
      flex-basis: 40%;
    }
  }
`;

const Data = styled.div``;

const Post = (props) => {
  const [
    updatePost,
    { data: updated_data, loading: updated_loading, error: updated_error },
  ] = useMutation(UPDATE_POST_MUTATION);
  const {
    loading: post_loading,
    error: post_error,
    data: post_data,
  } = useQuery(POST_QUERY, {
    variables: { id: props.id },
  });

  const { t } = useTranslation("blog");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [update, setUpdate] = useState(false);
  // const [likes, setLikes] = useState(0);
  const [hasReachedBottom, setHasReachedBottom] = useState(false);
  const [hasReachedHalf, setHasReachedHalf] = useState(false);
  const postContainerRef = useRef(null);

  function handleScrollProgress() {
    const scrollPosition = window.pageYOffset;
    const componentTop = postContainerRef.current.offsetTop;
    const componentHeight = postContainerRef.current.offsetHeight;
    const viewportHeight = window.innerHeight;

    // Calculate the scrollable range of the component
    const scrollableRange = componentHeight - viewportHeight + componentTop;

    // Calculate the progress based on the scroll position and scrollable range
    const progress = ((scrollPosition - componentTop) / scrollableRange) * 100;

    // Clamp progress between 0 and 100
    const clampedProgress = Math.min(Math.max(progress, 0), 100);
    setScrollProgress(clampedProgress);
  }
  useEffect(() => {
    if (post_data) {
      props.getLessonId(post_data.post.lessonId);
      props.getLeadIn(post_data.post.leadin);
    }
  }, [post_data]);
  useEffect(() => {
    // ... (existing useEffect code)

    if (post_data && postContainerRef.current) {
      window.addEventListener("scroll", handleScrollProgress);

      return () => {
        // ... (existing cleanup code)
        window.removeEventListener("scroll", handleScrollProgress);
      };
    }
  }, [post_data, postContainerRef.current]);

  useEffect(() => {
    if (post_data && postContainerRef.current) {
      function hasScrolledToPosition(position) {
        const scrollPosition = window.pageYOffset;
        const viewportHeight = window.innerHeight;

        const componentTop = postContainerRef.current.offsetTop;
        const componentHeight = postContainerRef.current.offsetHeight;

        if (
          scrollPosition + viewportHeight >=
          componentTop + componentHeight * position
        ) {
          return true;
        } else {
          return false;
        }
      }

      function handleScroll() {
        if (!hasReachedHalf && hasScrolledToPosition(0.5)) {
          console.log("User has scrolled to the middle of the article");
          // You can add your custom code here to execute when the user scrolls to the middle of the article
          props.hasReachedHalf(true);
          setHasReachedHalf(true);
        }

        if (!hasReachedBottom && hasScrolledToPosition(1)) {
          console.log("User has scrolled to the bottom of the article");
          // You can add your custom code here to execute when the user scrolls to the bottom of the article
          props.hasReachedBottom(true);
          setHasReachedBottom(true);
        }
      }

      window.addEventListener("scroll", handleScroll);

      // Clean up the event listener when the component is unmounted
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [post_data, postContainerRef.current, hasReachedBottom, hasReachedHalf]);

  if (post_loading) return <Loading />;
  if (post_error) return post_error;
  let post = post_data.post;

  moment.locale("ru");
  return (
    <>
      {/* <BottomLine post={post} /> */}
      <Styles id={props.id}>
        {/* <div className="title">
          <Link
            href={{
              pathname: "/blog",
            }}
          >
            <a>{t("back")}</a>
          </Link>
        </div> */}
        <PostContainer ref={postContainerRef}>
          {props.me &&
            props.me.permissions &&
            props.me.permissions.includes("ADMIN") && (
              <button onClick={(e) => setUpdate(!update)}>Switch</button>
            )}
          {!update && (
            <>
              <h1>{post.title}</h1>
              <div className="author">
                <img src={post.user.image} />
                <div className="name">
                  {t("by")} {post.user.name} {post.user.surname}
                </div>
              </div>
              <div className="text">{renderHTML(post.text)}</div>
              <Data>
                <span className="date">
                  {moment(post.createdAt).format("DD/MM/YYYY")}
                </span>
                {/* <Feedback>
                  <div className="favorite">
                    <span
                      className="likes"
                      onClick={async (e) => {
                        updatePost({
                          variables: {
                            id: post.id,
                            likes: likes + 1,
                            tags: [...post.tags],
                          },
                        });
                        setLikes(likes + 1);
                      }}
                    >
                      <img src="../../static/favorite.svg" />
                    </span>
                    {likes}
                  </div>
                </Feedback> */}
              </Data>
            </>
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
        </PostContainer>
        {scrollProgress < 100 && (
          <ProgressBar style={{ width: `${scrollProgress}%` }} />
        )}
      </Styles>
      {/* <Navigator level={"more_next_steps"} tags={post.tags.join("-")} /> */}
    </>
  );
};

export default Post;
