import React, { useState, useEffect } from "react";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Result from "./Result";
import { makeStyles } from "@material-ui/core/styles";
import { SINGLE_LESSON_QUERY } from "./Challenge";

const CREATE_CHALLENGERESULT_MUTATION = gql`
  mutation CREATE_CHALLENGERESULT_MUTATION(
    $correct: Int
    $wrong: Int
    $time: Int
    $lesson: ID
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
  const { time, right, wrong, lesson } = props;
  const classes = useStyles();
  return (
    <Mutation
      mutation={CREATE_CHALLENGERESULT_MUTATION}
      variables={{
        correct: right,
        wrong: wrong,
        lesson: lesson,
        time: time,
      }}
      refetchQueries={() => [
        {
          query: SINGLE_LESSON_QUERY,
          variables: { id: lesson },
        },
      ]}
    >
      {(createChallengeResult, { loading, error }) => (
        <>
          {!show && (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={async (e) => {
                e.preventDefault();
                setShown(true);
                createChallengeResult();
              }}
            >
              Завершить
            </Button>
          )}
          {show && (
            <Result
              results={props.results}
              completed={[
                {
                  correct: right,
                  wrong: wrong,
                  lesson: lesson,
                  time: time,
                  student: {
                    id: props.me.id,
                    name: props.me.name,
                    surname: props.me.surname,
                  },
                },
              ]}
              text="Поздравляем! Вы прошли это испытание. Ваш результат:"
            />
          )}
        </>
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
