import React, { useState } from "react";
import renderHTML from "react-render-html";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import styled from "styled-components";
import moment from "moment";
import Signup from "../auth/Signup";
import Signin from "../auth/Signin";
import RequestReset from "../auth/RequestReset";
import UpdatePost from "./UpdatePost";
import Modal from "styled-react-modal";
import { POSTS_QUERY } from "./Blog";

const UPDATE_POST_MUTATION = gql`
  mutation UPDATE_POST_MUTATION($id: ID!, $likes: Int) {
    updatePost(id: $id, likes: $likes) {
      id
    }
  }
`;

const UPDATE_USER_MUTATION = gql`
  mutation UPDATE_USER_MUTATION($id: ID!, $interests: [String]) {
    updateUserInterests(id: $id, interests: $interests) {
      id
    }
  }
`;

const Styles = styled.div`
  img {
    display: block;
    width: 100%;
    max-height: 50em;
    box-shadow: "0 0 0 2px blue;";
  }
  h2 {
    font-size: 3rem;
    margin: 0;
    margin-bottom: 30px;
    line-height: 1.2;
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
    padding-bottom: 2%;
    border-bottom: 1px solid #001f4e;
  }
  .date {
    font-weight: bold;
    font-size: 1.4rem;
  }
  margin-bottom: 50px;
`;

const Banner = styled.div`
  width: 100%;
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
  max-width: 30%;
  @media (max-width: 1300px) {
    max-width: 70%;
  }
  @media (max-width: 800px) {
    max-width: 90%;
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
  const [isOpen, setIsOpen] = useState(false);
  const [auth, setAuth] = useState("signup");
  const [update, setUpdate] = useState(false);
  const [likes, setLikes] = useState(props.likes);
  const [liked, setLiked] = useState(false);
  const changeState = (dataFromChild) => {
    setAuth(dataFromChild);
  };
  moment.locale("ru");
  let newInterests;
  let newInterests2;
  if (props.me) {
    newInterests = [...props.me.interests, ...props.tags];
    newInterests2 = [...new Set(newInterests)];
  }
  return (
    <>
      <Styles>
        {props.me && props.me.permissions.includes("ADMIN") && (
          <button onClick={(e) => setUpdate(!update)}>Switch</button>
        )}
        {!update && (
          <>
            <div className="text">{renderHTML(props.text)}</div>
            <Data>
              <span className="date">
                {moment(props.createdAt).format("Do MMMM YYYY")}
              </span>
              {props.me && (
                <Mutation
                  mutation={UPDATE_POST_MUTATION}
                  variables={{
                    id: props.id,
                    likes: likes + 1,
                  }}
                  refetchQueries={() => [
                    {
                      query: POSTS_QUERY,
                    },
                  ]}
                >
                  {(updatePost, { loading, error }) => (
                    <Mutation
                      mutation={UPDATE_USER_MUTATION}
                      variables={{
                        id: props.me.id,
                        interests: newInterests2,
                      }}
                    >
                      {(updateUserInterests, { loading, error }) => (
                        <Feedback>
                          <div className="question">Полезный материал? </div>
                          <div className="favorite">
                            <span
                              className="likes"
                              onClick={async (e) => {
                                if (!liked) {
                                  setLikes(likes + 1), setLiked(true);
                                  const res = updatePost();
                                  const res1 = updateUserInterests();
                                  console.log(1);
                                }
                              }}
                            >
                              <img src="../../static/favorite.svg" />
                            </span>
                            {likes}
                          </div>
                        </Feedback>
                      )}
                    </Mutation>
                  )}
                </Mutation>
              )}
            </Data>
          </>
        )}
        {update && <UpdatePost id={props.id} text={props.text} />}
      </Styles>
      {!props.me && (props.index === 1 || props.index === 4) && (
        <Banner>
          <div className="header">📫 Новостная рассылка</div>
          <div className="comment">
            Раз в неделю мы делаем выжимку всех материалов из блога и социальных
            сетей и отправляем их на почту.
          </div>
          <div className="buttons">
            Зарегистрируйтесь, чтобы подписаться на рассылку.
          </div>
          <Button onClick={(e) => setIsOpen(!isOpen)}>
            Зарегистрироваться
          </Button>
        </Banner>
      )}
      <StyledModal
        isOpen={isOpen}
        onBackgroundClick={(e) => setIsOpen(!isOpen)}
        onEscapeKeydown={(e) => setIsOpen(!isOpen)}
      >
        {auth === "signin" && (
          <Signin
            getData={changeState}
            closeNavBar={(e) => setIsOpen(!isOpen)}
          />
        )}
        {auth === "signup" && (
          <Signup
            getData={changeState}
            closeNavBar={(e) => setIsOpen(!isOpen)}
          />
        )}
        {auth === "reset" && <RequestReset getData={changeState} />}
      </StyledModal>
    </>
  );
};

export default Post;
