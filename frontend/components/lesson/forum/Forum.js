import React, { useState } from "react";
import renderHTML from "react-render-html";
import StarRatings from "react-star-ratings";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import styled from "styled-components";
import moment from "moment";
import { SINGLE_LESSON_QUERY } from "../SingleLesson";
import CreateStatement from "./CreateStatement";
import DeleteStatement from "./DeleteStatement";
import { withTranslation } from "../../../i18n";

const CREATE_RATING_MUTATION = gql`
  mutation CREATE_RATING_MUTATION($rating: Int, $forum: ID!) {
    createRating(rating: $rating, forum: $forum) {
      id
    }
  }
`;

const UPDATE_RATING_MUTATION = gql`
  mutation UPDATE_RATING_MUTATION($rating: Int, $id: ID!) {
    updateRating(rating: $rating, id: $id) {
      id
    }
  }
`;

const Styles = styled.div`
  margin-top: 3%;
  width: 100%;
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
`;

const Statement = styled.div`
  background: ${(props) => (props.color ? "#f0f8ff" : "none")};
  border-bottom: ${(props) => (props.color ? "none" : "1px solid #CCCFCC")};
  padding: 1.5% 2%;
  padding-top: 1%;
  margin-bottom: 2%;
  .text {
    margin-bottom: 1.5%;
  }
  .name {
    color: #000e2d;
    font-weight: bold;
    span {
      color: #767676;
      font-weight: normal;
    }
  }
`;

const Forum = (props) => {
  const [rating, setRating] = useState(props.result ? props.result.rating : 0);

  moment.locale("ru");

  const { text, forum, id, statements, lesson, me, result } = props;
  return (
    <Styles>
      <p>{renderHTML(text)}</p>
      <div className="header">{props.t("rate")}</div>
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
                alert(props.t("thank"));
              }}
            />
          )}
        </Mutation>
      ) : (
        <Mutation
          mutation={CREATE_RATING_MUTATION}
          variables={{
            forum: id,
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
                alert(props.t("thank"));
              }}
            />
          )}
        </Mutation>
      )}
      <div className="header2">{props.t("chat")}</div>
      {statements.length > 0 ? (
        <>
          {statements.map((s) => (
            <Statement color={forum.lesson.user.id === s.user.id}>
              <div className="text">{renderHTML(s.text)}</div>
              <div className="name">
                {s.user.surname
                  ? `${s.user.name} ${s.user.surname}`
                  : s.user.name}
                <span>
                  {`   `}
                  {moment(s.createdAt).format("LLL")}
                </span>
                {me.id === s.user.id && (
                  <DeleteStatement
                    lesson={forum.lesson.id}
                    statementID={s.id}
                  />
                )}
              </div>
            </Statement>
          ))}
        </>
      ) : (
        <div id="comment">{props.t("noone")}</div>
      )}
      <CreateStatement forum={id} lesson={lesson} />
    </Styles>
  );
};

export default withTranslation("tasks")(Forum);
