import React, { useState } from "react";
import styled from "styled-components";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import dynamic from "next/dynamic";
import { SINGLE_LESSON_QUERY } from "../lesson/SingleLesson";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles({
  button: {
    width: "30%",
    margin: "2% 0",
    fontSize: "1.4rem",
    textTransform: "none"
  },
  root: {
    marginBottom: "4%"
  },
  formControl: {
    width: "70%",
    fontSize: "2.4rem",
    padding: "1% 0"
  },
  label: {
    fontSize: "1.5rem",
    fontFamily: "Montserrat",
    marginBottom: "1%"
  },
  labelRoot: {
    fontSize: "1.5rem"
  }
});

const CREATE_PROBLEM_MUTATION = gql`
  mutation CREATE_PROBLEM_MUTATION(
    $text: String!
    $lessonID: ID!
    $nodeID: ID!
    $nodeType: String
  ) {
    createProblem(
      text: $text
      lessonID: $lessonID
      nodeID: $nodeID
      nodeType: $nodeType
    ) {
      id
    }
  }
`;

const Title = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
`;

const Styles = styled.div`
  margin-top: 2%;
`;

const DynamicLoadedEditor = dynamic(import("../editor/ProblemEditor"), {
  loading: () => <p>Загрузка редактора...</p>,
  ssr: false
});

const CreateProblem = props => {
  const [text, setText] = React.useState("");
  const [nodeID, setNodeID] = React.useState("");
  const [nodeType, setNodeType] = React.useState("");
  const classes = useStyles();

  const handleChange = (e, type) => {
    setNodeID(e.target.value);
    setNodeType(type);
  };

  const myCallback = dataFromChild => {
    setText(dataFromChild);
  };

  const { lessonID, lesson } = props;
  return (
    <Styles>
      <Title>Создайте новую задачу для вашего урока</Title>
      <DynamicLoadedEditor getEditorText={myCallback} />
      <h3>
        Выберите первый вопрос, с которого начнется объяснение решения задачи.
      </h3>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label" className={classes.label}>
          Вопрос
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={nodeType === "quiz" ? nodeID : null}
          type="quiz"
          onChange={e => handleChange(e, "quiz")}
        >
          {lesson.quizes.map(q => (
            <MenuItem value={q.id}>{q.question}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label" className={classes.label}>
          Тест
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={nodeType === "newTest" ? nodeID : null}
          type="quiz"
          onChange={e => handleChange(e, "newTest")}
        >
          {lesson.newTests.map(q => (
            <MenuItem value={q.id}>{q.question[0]}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <br />
      <Mutation
        mutation={CREATE_PROBLEM_MUTATION}
        variables={{
          lessonID: lessonID,
          text: text,
          nodeID: nodeID,
          nodeType: nodeType
        }}
        refetchQueries={() => [
          {
            query: SINGLE_LESSON_QUERY,
            variables: { id: lessonID }
          }
        ]}
        awaitRefetchQueries={true}
      >
        {(createProblem, { loading, error }) => (
          <>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={async e => {
                e.preventDefault();
                const res = await createProblem();
                alert("Создали!");
              }}
            >
              {loading ? "Сохраняем..." : "Сохранить"}
            </Button>
          </>
        )}
      </Mutation>
    </Styles>
  );
};

export default CreateProblem;
