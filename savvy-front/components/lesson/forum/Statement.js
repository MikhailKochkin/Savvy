import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";

import moment from "moment";
import parse from 'html-react-parser';

const UPDATE_STATEMENT_MUTATION = gql`
  mutation UPDATE_STATEMENT_MUTATION($comments: [String!], $id: String!) {
    updateStatement(comments: $comments, id: $id) {
      id
    }
  }
`;
const Comment = styled.div`
  margin-bottom: 20px;
  button {
    height: 30px;
    text-align: center;
    background: #d2edfd;
    border-radius: 5px;
    cursor: pointer;
    color: #000a60;
    font-family: Montserrat;
    border: none;
    font-size: 1.6rem;
    transition: all 0.3s ease;
    &:hover {
      background: #a5dcfe;
    }
  }
  .comment {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
  .comment_box {
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    button {
      margin: 8px 0;
    }
  }
  .comment_text {
    min-height: 100px;
    min-width: 60%;
    max-width: 70%;
    @media (max-width: 800px) {
      width: 100%;
      max-width: 100%;
    }
    border: 2px solid;
    border-color: #f3f3f3;
    background: #f3f3f3;
    outline: 0;
    resize: none;
    border-radius: 25px;
    padding: 3% 4%;
    line-height: 1.8;
    font-family: Montserrat;
    font-size: 1.6rem;
    margin-bottom: 20px;
    textarea {
      border: 0;
      width: 100%;
      background: #f3f3f3;
      outline: 0;
      resize: none;
      font-family: Montserrat;
      font-size: 1.6rem;
      line-height: 1.8;
    }
  }
  .answer {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-bottom: 20px;
    .button_box {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      height: 140px;
      margin-left: 10px;
    }
    button {
      height: 30px;
      text-align: center;
      background: #d2edfd;
      border-radius: 5px;
      cursor: pointer;
      color: #000a60;
      font-family: Montserrat;
      border: none;
      font-size: 1.6rem;
      transition: all 0.3s ease;
      &:hover {
        background: #a5dcfe;
      }
    }
  }
  .answer_name {
    margin-right: 10px;
    background: #00204e;
    color: white;
    border-radius: 50%;
    padding: 2%;
    height: 55px;
    width: 55px;
    object-fit: cover;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .answer_test {
    width: 50%;
    border: 2px solid;
    border-color: #f3f3f3;
    border-radius: 25px;
    padding: 2% 5%;
    margin-bottom: 20px;
  }
  .answer_text {
    min-width: 60%;
    max-width: 70%;
    border: 2px solid;
    border-color: #f3f3f3;
    outline: 0;
    resize: none;
    border-radius: 25px;
    padding: 3% 4%;
    line-height: 1.8;
    font-family: Montserrat;
    font-size: 1.6rem;
    /* margin-bottom: 20px; */
    span {
      color: #767676;
      font-weight: normal;
      font-size: 1.3rem;
    }
  }
`;

const IconBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .icon {
    margin: 5px;
    border-radius: 50%;
    height: 55px;
    width: 55px;
    object-fit: cover;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .name {
    font-size: 1.2rem;
    text-align: center;
    color: #8f93a3;
    width: 70px;
    margin: 0 7px;
  }
`;

const Statement = (props) => {
  const [comment, setComment] = useState("");
  const [updateStatement, { data, loading }] = useMutation(
    UPDATE_STATEMENT_MUTATION
  );
  const { s, author, me } = props;
  moment.locale("ru");

  return (
    <Comment>
      <div className="answer">
        <IconBlock>
          {s.user.id == author ? (
            <img className="icon" src="../../static/hipster.svg" />
          ) : (
            <img className="icon" src="../../static/batman.svg" />
          )}
          <div className="name">{s.user.name}</div>
        </IconBlock>{" "}
        <div className="answer_text">
          <div>{parse(s.text)}</div>
          <span>{moment(s.createdAt).format("LLL")}</span>
        </div>
      </div>
      <div className="comment">
        <div className="comment_box">
          {s.comments &&
            s.comments.map((c) => (
              <div className="comment_text">{parse(c)}</div>
            ))}
          {me && (me.id == author || me.permissions.includes("ADMIN")) && (
            <>
              <div className="comment_text">
                <textarea
                  placeholder="..."
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>

              <button
                onClick={async (e) => {
                  const data = updateStatement({
                    variables: {
                      id: s.id,
                      comments: [...s.comments, comment],
                    },
                  });
                  setComment("");
                  alert("Отправлено!");
                }}
              >
                Ответить
              </button>
            </>
          )}
        </div>
      </div>
    </Comment>
  );
};

export default Statement;
