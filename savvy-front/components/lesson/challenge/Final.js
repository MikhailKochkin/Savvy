import React, { useState, useEffect } from "react";
import { Mutation } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Result from "./Result";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";

import { SINGLE_LESSON_QUERY } from "./Challenge";
import BannerOffer from "../offers/BannerOffer";

const CREATE_CHALLENGERESULT_MUTATION = gql`
  mutation CREATE_CHALLENGERESULT_MUTATION(
    $correct: Int
    $wrong: Int
    $time: Int
    $lesson: String
  ) {
    createChallengeResult(
      correct: $correct
      wrong: $wrong
      lesson: $lesson
      time: $time
    ) {
      id
    }
  }
`;

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const useStyles = makeStyles({
  button: {
    width: "35%",
    margin: "2% 0",
    fontSize: "1.4rem",
    textTransform: "none",
  },
  root: {
    marginBottom: "4%",
  },
  labelRoot: {
    fontSize: "1.5rem",
  },
});

const Final = (props) => {
  const [show, setShown] = useState(false);
  const { time, right, wrong, lesson, lessonId, offer, me } = props;
  const classes = useStyles();
  return (
    <Mutation
      mutation={CREATE_CHALLENGERESULT_MUTATION}
      variables={{
        correct: right,
        wrong: wrong,
        lesson: lessonId,
        time: time,
      }}
      refetchQueries={() => [
        {
          query: SINGLE_LESSON_QUERY,
          variables: { id: lessonId },
        },
      ]}
    >
      {(createChallengeResult, { loading, error }) => (
        <Styles>
          {!show && (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={async (e) => {
                e.preventDefault();
                setShown(true);
                if (props.getFinished) props.getFinished("finish_challenge");
                createChallengeResult();
              }}
            >
              Завершить
            </Button>
          )}
          {show && offer && (
            <BannerOffer
              key={offer.id}
              id={offer.id}
              offer={offer}
              me={me}
              coursePage={lesson.coursePage}
              coursePageId={lesson.coursePage.id}
              lessonId={lesson.id}
              user={offer.user.id}
              story={true}
            />
          )}
          {show && (
            <Result
              results={props.results}
              completed={[
                {
                  correct: right,
                  wrong: wrong,
                  lesson: lessonId,
                  time: time,
                  student: {
                    id: props.me.id,
                    name: props.me.name,
                    surname: props.me.surname,
                  },
                },
              ]}
              text="Поздравляем! Вы прошли испытание. Ваш результат:"
            />
          )}
        </Styles>
      )}
    </Mutation>
  );
};

Final.propTypes = {
  lesson: PropTypes.string.isRequired,
  right: PropTypes.number.isRequired,
  wrong: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
};

export default Final;
