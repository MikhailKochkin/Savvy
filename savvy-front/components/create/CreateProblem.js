import React, { useState } from "react";
import styled from "styled-components";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import dynamic from "next/dynamic";
import { SINGLE_LESSON_QUERY } from "../lesson/SingleLesson";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { eyeSlash } from "react-icons-kit/fa/eyeSlash";
import Icon from "react-icons-kit";
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

const DynamicLoadedEditor = dynamic(import("../editor/ProblemEditor"), {
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
        <div>
          Чтобы задать подсказки и ответ, необходимо выделить текст, нажать на
          кнопку <Icon icon={eyeSlash} /> и задать название этого куска текста.
          Название может быть любым: "Подсказка", "Комментарий", "Источник" и
          так далее. Ограничения есть только для ответа. Он может иметь только
          три названия: "Ответ", "Ответ." или "Ответ:". Это важно, потому что
          текст с таким названием будет открываться только после того, как
          ученик сдаст свой ответ.
        </div>
        <div>
          Чтобы задать этапы решения задач, нужно выбрать тест или вопрос, с
          которого начнется решение задачи. Его нужно заранее создать в
          соответствующем разделе. Дальнейшие указания на этапы нужно внести в
          самих вопросах, тестах и лонгридах.
        </div>
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
      {/* {nodeID && ( */}
      <Mutation
        mutation={CREATE_PROBLEM_MUTATION}
        variables={{
          lessonID: lessonID,
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
          </>
        )}
      </Mutation>
      {/* )} */}
    </Styles>
  );
};

export default CreateProblem;
