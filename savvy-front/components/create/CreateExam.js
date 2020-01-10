import React, { useState } from "react";
import styled from "styled-components";
import { Mutation } from "react-apollo";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import gql from "graphql-tag";

const Box = styled.div`
  border-bottom: 1px solid #edefed;
  padding: 1%;
  padding-bottom: 2%;
  padding-top: 4%;
  background: ${props =>
    props.color === "true" ? "rgba(50, 172, 102, 0.05)" : "none"};
  .question {
    font-size: 1.6rem;
    font-weight: bold;
  }
`;

const useStyles = makeStyles({
  button: {
    width: "40%",
    margin: "4% 0",
    fontSize: "1.6rem",
    textTransform: "none"
  },
  miniButton: {
    margin: "2% 0",
    fontSize: "1.4rem",
    textTransform: "none"
  }
});

const CREATE_EXAM_MUTATION = gql`
  mutation CREATE_EXAM_MUTATION($lesson: ID!, $nodeID: ID!, $nodeType: String) {
    createExam(lesson: $lesson, nodeID: $nodeID, nodeType: $nodeType) {
      id
    }
  }
`;

const CreateExam = props => {
  const [nodeID, setNodeID] = useState("");
  const [nodeType, setNodeType] = useState("");
  const classes = useStyles();
  const { lesson } = props;
  return (
    <>
      <h3>Выберите первый вопрос, с которого начнется экзамен.</h3>
      {lesson.quizes.map(q => (
        <Box key={q.id} color={(nodeID === q.id).toString()}>
          <div className="question">{q.question}</div>
          <div className="answer">{q.answer}</div>
          <Button
            variant="outlined"
            size="medium"
            className={classes.miniButton}
            color="primary"
            onClick={e => (setNodeID(q.id), setNodeType("quiz"))}
          >
            Выбрать
          </Button>
        </Box>
      ))}
      <div>
        Впоследствии, в каждом из заданий вам будет необходимо выбрать, куда они
        будут двигатьс в случе правильно и неправильного ответа.
      </div>
      <Mutation
        mutation={CREATE_EXAM_MUTATION}
        variables={{
          lesson: lesson.id,
          nodeID,
          nodeType
        }}
      >
        {(createExam, { loading, error }) => (
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={async e => {
              e.preventDefault();
              const res = await createExam();
              alert("Готово");
            }}
          >
            Создать
          </Button>
        )}
      </Mutation>
    </>
  );
};

export default CreateExam;
