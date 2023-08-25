import React, { useState } from "react";
import styled from "styled-components";
import { Mutation } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { SINGLE_LESSON_QUERY } from "../lesson/SingleLesson";
// import Button from "@material-ui/core/Button";
// import { makeStyles } from "@material-ui/core/styles";
import CanvasProblemBuilder from "./CanvasProblemBuilder";

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  .editor_container {
    width: 660px;
  }
  .canvas_container {
    width: 100%;
  }
`;

const ButtonTwo = styled.button`
  border: none;
  background: #3f51b5;
  padding: 10px 20px;
  border: 2px solid #3f51b5;
  border-radius: 5px;
  font-family: Montserrat;
  font-size: 1.4rem;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
  margin-top: 20px;
  margin-right: 10px;
  transition: 0.3s;
  width: 250px;
  &:hover {
    background: #2e3b83;
    border: 2px solid #2e3b83;
  }
`;

// const useStyles = makeStyles({
//   button: {
//     width: "250px",
//     margin: "2% 0",
//     fontSize: "1.4rem",
//     textTransform: "none",
//   },
//   root: {
//     marginBottom: "4%",
//   },
//   formControl: {
//     width: "70%",
//     fontSize: "2.4rem",
//     padding: "1% 0",
//   },
//   label: {
//     fontSize: "1.5rem",
//     fontFamily: "Montserrat",
//     marginBottom: "1%",
//   },
//   labelRoot: {
//     fontSize: "1.5rem",
//   },
// });

const CREATE_PROBLEM_MUTATION = gql`
  mutation CREATE_PROBLEM_MUTATION(
    $text: String!
    $lessonId: String!
    $steps: ProblemStructure # $nodeType: String #$nodeID: String!
  ) {
    createProblem(
      text: $text
      lessonId: $lessonId
      steps: $steps # nodeType: $nodeType # nodeID: $nodeID
    ) {
      id
      text
      lessonId
      steps
    }
  }
`;

const DynamicLoadedEditor = dynamic(import("../editor/Editor"), {
  loading: () => <p>Загрузка редактора...</p>,
  ssr: false,
});

const CreateProblem = (props) => {
  const [text, setText] = useState();
  const [steps, setSteps] = useState([]);

  const { t } = useTranslation("lesson");

  // const classes = useStyles();
  const myCallback = (dataFromChild) => {
    setText(dataFromChild);
  };
  const router = useRouter();

  const getSteps = (val) => {
    setSteps([...val]);
  };

  const { lessonID, lesson } = props;
  const rus_placeholder = `<h2><p>План задачи</p></h2><p>1. Заголовок: название задачи. Сделайте его заголовком, нажав на кнопку <b>H</b>.</p><p>2. Опишите условия кейса</p><p>3. Запишите вопрос к задаче. Визуально выделите его, нажав на кнопку с двумя точками.</p><p>4. Ответ к задаче. Его нужно будет скрыть от студента, нажав на кнопку с минусом по центру диалогового окна. В появившемся окне напишите слово "Ответ". Ответ станет доступен только после решения задачи студентом.</p>`;
  const eng_placeholder = `<h2><p>Case Study plan</p></h2><p>1. Title: the name of the case study. Add title styles by pressing <b>the H button </b>.</p><p>2. Explain the case</p><p>3. Write down the question to the case. Highlight it visually by clicking on the button with two dots.</p><p>4. Write down the solution to case study. You can hide it from the student by clicking on the button with a minus in the middle of the dialog box. In the window that appears, type the word "Answer". The answer will be available only after the student has solved the problem.</p>`;
  return (
    <Styles>
      <div className="editor_container">
        <DynamicLoadedEditor
          getEditorText={myCallback}
          problem={true}
          value={router.locale == "ru" ? rus_placeholder : eng_placeholder}
        />
      </div>
      <div className="canvas_container">
        <DndProvider backend={HTML5Backend}>
          <CanvasProblemBuilder
            lesson={props.lesson}
            me={props.me}
            lessonID={lesson.id}
            getSteps={getSteps}
            items={[]}
          />
        </DndProvider>
      </div>
      <Mutation
        mutation={CREATE_PROBLEM_MUTATION}
        variables={{
          lessonId: lessonID,
          text: text,
          steps: {
            problemItems: [...steps].map(
              ({ position, content, ...keepAttrs }) => keepAttrs
            ),
          },
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
            <ButtonTwo
              type="submit"
              variant="contained"
              color="primary"
              onClick={async (e) => {
                e.preventDefault();
                const res = await createProblem();
                props.getResult(res);
              }}
            >
              {loading ? t("saving") : t("save")}
            </ButtonTwo>
            {error ? error : null}
          </>
        )}
      </Mutation>{" "}
    </Styles>
  );
};

export default CreateProblem;
