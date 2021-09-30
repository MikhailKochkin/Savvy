import React, { useState } from "react";
import renderHTML from "react-render-html";
import StarRatings from "react-star-ratings";
import { Mutation } from "@apollo/client/react/components";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import moment from "moment";
import { SINGLE_LESSON_QUERY } from "../SingleLesson";
import CreateStatement from "./CreateStatement";
import DeleteStatement from "./DeleteStatement";
import Statement from "./Statement";

const CREATE_RATING_MUTATION = gql`
  mutation CREATE_RATING_MUTATION($rating: Int, $forumId: String!) {
    createRating(rating: $rating, forumId: $forumId) {
      id
    }
  }
`;

const UPDATE_RATING_MUTATION = gql`
  mutation UPDATE_RATING_MUTATION($rating: Int, $id: String!) {
    updateRating(rating: $rating, id: $id) {
      id
    }
  }
`;

const CREATE_STATEMENT_MUTATION = gql`
  mutation CREATE_STATEMENT_MUTATION($text: String!, $forumId: String!) {
    createStatement(text: $text, forumId: $forumId) {
      id
    }
  }
`;

const Styles = styled.div`
  margin: 3% 0;
  /* width: ${(props) => props.width}; */
  width: 650px;
  font-size: 1.6rem;
  display: flex;
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
    width: 90%;
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
  const [rating, setRating] = useState(props.result ? props.result.rating : 0);
  const [comment, setComment] = useState("");
  const [sent, setSent] = useState(false);

  const [createStatement, { data, loading }] = useMutation(
    CREATE_STATEMENT_MUTATION
  );

  moment.locale("ru");
  const { text, forum, id, statements, lesson, result, story, me } = props;
  return (
    <Styles story={story}>
      <div className="question">
        <div className="question_text">
          Пожалуйста, оцените, насколько полезен был этот урок. Преподаватель
          увидит оценки в анонимном формате.
        </div>
        <IconBlock>
          <img className="icon" src="../../static/hipster.svg" />
          <div className="name">BeSavvy</div>
        </IconBlock>
      </div>
      <div className="answer">
        <IconBlock>
          <img className="icon" src="../../static/flash.svg" />
          <div className="name">{me.name}</div>
        </IconBlock>{" "}
        <Stars>
          {result ? (
            <Mutation
              mutation={UPDATE_RATING_MUTATION}
              variables={{
                id: result.id,
                rating: rating,
              }}
              refetchQueries={() => [
                {
                  query: SINGLE_LESSON_QUERY,
                  variables: { id: lesson },
                },
              ]}
            >
              {(updateRating, { loading, error }) => (
                <StarRatings
                  starRatedColor={"rgb(255, 178, 3)"}
                  starEmptyColor={"#DADADA"}
                  starHoverColor={"rgb(255, 150, 64)"}
                  rating={rating}
                  numberOfStars={10}
                  starDimension="26px"
                  starSpacing="3px"
                  changeRating={async (data) => {
                    const res = await setRating(data);
                    const res1 = updateRating();
                    alert("Спасибо!");
                  }}
                />
              )}
            </Mutation>
          ) : (
            <Mutation
              mutation={CREATE_RATING_MUTATION}
              variables={{
                forumId: id,
                rating: rating,
              }}
              refetchQueries={() => [
                {
                  query: SINGLE_LESSON_QUERY,
                  variables: { id: lesson },
                },
              ]}
            >
              {(createRating, { loading, error }) => (
                <StarRatings
                  starRatedColor={"rgb(255, 178, 3)"}
                  starEmptyColor={"#DADADA"}
                  starHoverColor={"rgb(255, 150, 64)"}
                  rating={rating}
                  numberOfStars={10}
                  starDimension="26px"
                  starSpacing="3px"
                  changeRating={async (data) => {
                    const res = await setRating(data);
                    const res1 = createRating();
                    alert("Спасибо!");
                  }}
                />
              )}
            </Mutation>
          )}
        </Stars>
      </div>
      <div className="question">
        <div className="question_text">
          {text.length > 7
            ? renderHTML(text)
            : "На этом все. Увидимся на следующем уроке! Но, может быть, у тебя остались какие-то вопросы?"}
        </div>
        <IconBlock>
          <img className="icon" src="../../static/hipster.svg" />
          <div className="name">BeSavvy</div>
        </IconBlock>
      </div>
      <div className="answer">
        <IconBlock>
          <img className="icon" src="../../static/flash.svg" />
          <div className="name">{me.name}</div>
        </IconBlock>{" "}
        <Answer_text
          type="text"
          required
          onChange={(e) => setComment(e.target.value)}
          placeholder="..."
        />
        {!sent && (
          <div className="button_box">
            <button
              onClick={(e) => {
                setSent(true);
                return createStatement({
                  variables: {
                    forumId: forum.id,
                    text: comment,
                  },
                });
              }}
            >
              {!sent ? "Отправить" : "Отправлено"}
            </button>
          </div>
        )}
      </div>
      {sent && (
        <div className="question">
          <div className="question_text">
            Я получил твой вопрос, передам его авторам курса и вернусь с ответом
            в течение нескольких дней. Напишу на почту, когда найду ответ.
          </div>
          <IconBlock>
            <img className="icon" src="../../static/hipster.svg" />
            <div className="name">BeSavvy</div>
          </IconBlock>
        </div>
      )}
      <>
        {statements
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((s) => (
            <Statement author={props.author} s={s} me={me} />
          ))}
      </>
    </Styles>
  );
};

export default Forum;
