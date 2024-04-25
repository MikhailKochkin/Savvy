import React, { useState } from "react";
import { Mutation } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import styled from "styled-components";
import dynamic from "next/dynamic";
// import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "next-i18next";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { SINGLE_LESSON_QUERY } from "../SingleLesson";
import ProblemBuilder from "../../create/ProblemBuilder";
import UpdateProblemBuilder from "./UpdateProblemBuilder";
import CanvasProblemBuilder from "../../create/CanvasProblemBuilder";

const UPDATE_PROBLEM_MUTATION = gql`
  mutation UPDATE_PROBLEM_MUTATION(
    $id: String!
    $text: String
    $name: String
    $type: String
    $complexity: Int
    $steps: ProblemStructure
    $goal: String
  ) {
    updateProblem(
      id: $id
      text: $text
      name: $name
      steps: $steps
      type: $type
      complexity: $complexity
      goal: $goal
    ) {
      id
      text
      name
      nodeID
      steps
      goal
      type
      complexity
      nodeType
      user {
        id
      }
      createdAt
    }
  }
`;

// const useStyles = makeStyles({
//   button: {
//     width: "30%",
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

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  /* input {
    padding: 0.5%;
    height: 75%;
    width: 100%;
    outline: 0;
    border: 1px solid #ccc;
    border-radius: 3.5px;
    padding: 2%;
    font-size: 1.4rem;
  } */
  textarea {
    width: 100%;
    height: 120px;
  }
  select {
    width: 25%;
    margin-bottom: 3%;
  }
  .editor_container {
    width: 660px;
    textarea {
      padding: 10px;
      font-size: 1.6rem;
      font-family: Montserrat;
      line-height: 1.4;
    }
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
  margin: 20px 0;
  margin-right: 10px;
  transition: 0.3s;
  width: 250px;
  &:hover {
    background: #2e3b83;
    border: 2px solid #2e3b83;
  }
`;

const NameInput = styled.input`
  width: 100%;
  height: 40px;
  font-weight: 500;
  font-size: 2rem;
  font-family: Montserrat;
  margin-bottom: 20px;
  border: none;
  outline: none;
`;

const DynamicLoadedEditor = dynamic(import("../../editor/Editor"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const UpdateProblem = (props) => {
  const [text, setText] = useState(props.text);
  const [goal, setGoal] = useState(props.goal);
  const [name, setName] = useState(props.name);
  const [type, setType] = useState(props.problem.type);

  const [updatedSteps, setUpdatedSteps] = useState(
    props.steps && props.steps.problemItems.length > 0
      ? props.steps.problemItems
      : []
  );

  const [complexity, setComplexity] = useState(
    props.complexity ? props.complexity : 0
  );
  const getText = (d) => setText(d);

  const { t } = useTranslation("lesson");

  const handleChange = () => {};
  const getSteps = (val) => {
    setUpdatedSteps([...val]);
  };

  const {
    id,
    quizes,
    lessonID,
    newTests,
    notes,
    nodeID,
    me,
    nodeType,
    steps,
    lesson,
    problem,
    story,
    author,
  } = props;

  return (
    <Styles>
      <div className="editor_container">
        <NameInput
          onChange={(e) => setName(e.target.value)}
          defaultValue={name}
          placeholder="Untitled"
        />
        <h3>HTML Editor</h3>
        <textarea onChange={(e) => setText(e.target.value)}>{text}</textarea>
        <h3>Problem Goal</h3>
        <textarea onChange={(e) => setGoal(e.target.value)}>{goal}</textarea>
        <h3>Type</h3>
        <select
          name="types"
          id="types"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="BRANCHING_SCENARIO">Branching scenario</option>
          <option value="GENERATE">Generate Ideas</option>
          <option value="ONLY_CORRECT">Quiz-based learning scenario</option>
        </select>
        <h3>Text Editor</h3>
        <DynamicLoadedEditor
          getEditorText={getText}
          value={text}
          problem={true}
        />
        {/* <h3>Выберите задания для формата "Экзамен" и "Задача":</h3> */}
        {nodeID && nodeType && (
          <>
            <div>
              Please keep in mind that this is the old architecture of problems.
              If you want to update it, the best solution is to recreate the
              problem using the new tools. You will not have to create
              everything from scratch. Just set up a new chain of existing
              questions.
            </div>
            <ProblemBuilder
              elements={[...newTests, ...quizes, ...notes]}
              quizes={quizes}
              newTests={newTests}
              notes={notes}
              nodeType={nodeType}
              nodeID={nodeID}
              lessonID={lessonID}
              // lesson={lesson}
              getNode={handleChange}
            />
          </>
        )}
      </div>
      {!nodeID && !nodeType && (
        <div className="canvas_container">
          <DndProvider backend={HTML5Backend}>
            <CanvasProblemBuilder
              lesson={props.lesson}
              me={props.me}
              lessonID={lesson.id}
              getSteps={getSteps}
              items={steps ? steps.problemItems : []}
            />
          </DndProvider>
        </div>
      )}
      <Mutation
        mutation={UPDATE_PROBLEM_MUTATION}
        variables={{
          id,
          text,
          complexity,
          goal,
          type,
          name,
          steps: {
            problemItems: [...updatedSteps].map(
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
      >
        {(updateProblem, { loading, error }) => (
          <ButtonTwo
            onClick={async (e) => {
              // Stop the form from submitting
              e.preventDefault();
              // call the mutation
              const res = await updateProblem();
              props.getResult(res);
              props.switchUpdate();
              props.passUpdated();
            }}
          >
            {loading ? t("saving") : t("save")}
          </ButtonTwo>
        )}
      </Mutation>
    </Styles>
  );
};

export default UpdateProblem;
