import React, { useState } from "react";
import styled from "styled-components";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import dynamic from "next/dynamic";
import { SINGLE_LESSON_QUERY } from "../lesson/SingleLesson";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
// import { eyeSlash } from "react-icons-kit/fa/eyeSlash";
import ProblemBuilder from "./ProblemBuilder";

const useStyles = makeStyles({
  button: {
    width: "30%",
    margin: "2% 0",
    fontSize: "1.4rem",
    textTransform: "none",
  },
  root: {
    marginBottom: "4%",
  },
  formControl: {
    width: "70%",
    fontSize: "2.4rem",
    padding: "1% 0",
  },
  label: {
    fontSize: "1.5rem",
    fontFamily: "Montserrat",
    marginBottom: "1%",
  },
  labelRoot: {
    fontSize: "1.5rem",
  },
});

const CREATE_PROBLEM_MUTATION = gql`
  mutation CREATE_PROBLEM_MUTATION(
    $text: String!
    $lessonId: String!
    $nodeID: String!
    $nodeType: String
  ) {
    createProblem(
      text: $text
      lessonId: $lessonId
      nodeID: $nodeID
      nodeType: $nodeType
    ) {
      id
    }
  }
`;

const Styles = styled.div`
  margin-top: 2%;
  max-width: 600px;
`;

const Title = styled.div`
  font-size: 2.2rem;
  font-weight: 600;
  margin-bottom: 2%;
`;

const Advice = styled.p`
  font-size: 1.5rem;
  margin: 1% 4%;
  background: #fdf3c8;
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  padding: 2%;
  margin: 30px 0;
  width: 80%;
  div {
    margin-bottom: 1.5%;
  }
`;

const DynamicLoadedEditor = dynamic(import("../editor/Editor"), {
  loading: () => <p>Загрузка редактора...</p>,
  ssr: false,
});

const CreateProblem = (props) => {
  const [text, setText] = React.useState("");
  const [nodeID, setNodeID] = React.useState("");
  const [nodeType, setNodeType] = React.useState("");
  const classes = useStyles();
  const myCallback = (dataFromChild) => {
    setText(dataFromChild);
  };

  const { lessonID, lesson } = props;

  const getNode = (type, id) => {
    setNodeID(id);
    setNodeType(type);
  };

  return (
    <Styles>
      <Advice>
        <div>
          Задача состоит из двух частей. К первой части относятся{" "}
          <b>текст задачи, подсказки и ответ</b>. Ко второй –{" "}
          <b>поэтапное решение задачи</b>.
        </div>{" "}
      </Advice>
      <Title>Новая задача</Title>
      <DynamicLoadedEditor getEditorText={myCallback} />
      <h3>
        Выберите первый вопрос, с которого начнется объяснение решения задачи.
      </h3>
      <ProblemBuilder
        lessonID={lesson.id}
        getNode={getNode}
        quizes={lesson.quizes}
        newTests={lesson.newTests}
        notes={lesson.notes}
      />
      <Mutation
        mutation={CREATE_PROBLEM_MUTATION}
        variables={{
          lessonId: lessonID,
          text: text,
          nodeID: nodeID,
          nodeType: nodeType,
        }}
        refetchQueries={() => [
          {
            query: SINGLE_LESSON_QUERY,
            variables: { id: lessonID },
          },
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
              onClick={async (e) => {
                e.preventDefault();
                const res = await createProblem();
                alert("Создали!");
              }}
            >
              {loading ? "Сохраняем..." : "Сохранить"}
            </Button>
            {error ? error : null}
          </>
        )}
      </Mutation>
    </Styles>
  );
};

export default CreateProblem;
