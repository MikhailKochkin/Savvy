import React, { useState } from "react";
import renderHTML from "react-render-html";
import StarRatings from "react-star-ratings";
import { Mutation } from "@apollo/client/react/components";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import moment from "moment";
import { useTranslation } from "next-i18next";

import { SINGLE_LESSON_QUERY } from "../SingleLesson";
import CreateStatement from "./CreateStatement";
import DeleteStatement from "./DeleteStatement";
import Statement from "./Statement";

const CREATE_STATEMENT_MUTATION = gql`
  mutation CREATE_STATEMENT_MUTATION($text: String!, $miniforumId: String!) {
    createStatement(text: $text, miniforumId: $miniforumId) {
      id
    }
  }
`;

const Opener = styled.div`
  width: 570px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
  margin-bottom: 20px;

  #circle {
    border: 2px solid #f3f3f3;
    border-radius: 50px;
    width: 50px;
    height: 50px;
    font-size: 2.4rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
      background: #f3f3f3;
    }
  }
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Styles = styled.div`
  /* width: ${(props) => props.width}; */
  width: 570px;
  font-size: 1.6rem;
  display: flex;
  font-weight: 500;
  flex-direction: column;
  .header {
    font-weight: bold;
    font-size: 1.6rem;
    margin-bottom: 3%;
  }
  .header2 {
    font-weight: bold;
    font-size: 1.8rem;
    margin: 3% 0;
  }
  .question {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-bottom: 20px;
    .question_text {
      background: #f3f3f3;
      color: black;
      border-radius: 25px;
      padding: 2% 3%;
      min-width: 40%;
      max-width: 70%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
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
  p {
    margin: 5px 0;
  }
  @media (max-width: 800px) {
    width: 95%;
    font-size: 1.4rem;
  }
`;

const IconBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 65px;

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
  .icon2 {
    margin: 5px;
    border-radius: 50%;
    background: #cb2d3e; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      #ef473a,
      #cb2d3e
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      #ef473a,
      #cb2d3e
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    color: #fff;
    font-size: 2rem;
    font-weight: bold;
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

const Answer_text = styled.textarea`
  height: 140px;
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
`;

const Stars = styled.div`
  display: flex;
  flex-direction: column;
  width: 55%;
  justify-content: center;
  align-items: center;
`;

const Forum = (props) => {
  const [open, setOpen] = useState(false);

  // const [rating, setRating] = useState(props.result ? props.result.rating : 0);
  const [comment, setComment] = useState("");
  const [sent, setSent] = useState(false);

  const { t } = useTranslation("lesson");

  const [createStatement, { data, loading }] = useMutation(
    CREATE_STATEMENT_MUTATION
  );

  moment.locale("ru");
  const { miniforum, me } = props;
  return (
    <Styles>
      <Opener>
        <div onClick={(e) => setOpen(!open)} id="circle">
          💡
        </div>
      </Opener>
      {open && (
        <>
          <div className="question">
            <div className="question_text">
              Что-то осталось непонятным в этом блоке? Задавайте вопросы, я
              передам их автору урока. И во всем разберемся.
            </div>
            <IconBlock>
              <img className="icon" src="../../static/hipster.svg" />
              <div className="name">BeSavvy</div>
            </IconBlock>
          </div>
          <div className="answer">
            <IconBlock>
              <div className="icon2">
                {me.surname
                  ? `${me.name[0]}${me.surname[0]}`
                  : `${me.name[0]}${me.name[1]}`}
              </div>
              <div className="name">{me.name}</div>
            </IconBlock>{" "}
            <Answer_text
              type="text"
              required
              onChange={(e) => setComment(e.target.value)}
              placeholder="..."
            />
            <div className="button_box">
              <button
                onClick={(e) => {
                  setSent(true);
                  return createStatement({
                    variables: {
                      miniforumId: miniforum.id,
                      text: comment,
                    },
                  });
                }}
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
          <>
            {miniforum.statements
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((s) => (
                <Statement author={s.user} s={s} me={me} />
              ))}
          </>
        </>
      )}
    </Styles>
  );
};

export default Forum;
