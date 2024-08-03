import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
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
import {
  EditorInfoSection,
  NameInput,
  SimpleButton,
  BlueButton,
} from "../SimulatorDevelopmentStyles";
import { autoResizeTextarea } from "../SimulatorDevelopmentFunctions";

const UPDATE_PROBLEM_MUTATION = gql`
  mutation UPDATE_PROBLEM_MUTATION(
    $id: String!
    $text: String
    $name: String
    $type: String
    $complexity: Int
    $steps: ProblemStructure
    $goal: String
    $context: String
  ) {
    updateProblem(
      id: $id
      text: $text
      name: $name
      steps: $steps
      type: $type
      complexity: $complexity
      goal: $goal
      context: $context
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
      context
      user {
        id
      }
      createdAt
    }
  }
`;

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  .editor_container {
    width: 660px;
  }
  .canvas_container {
    width: 100%;
  }
`;

const DynamicLoadedEditor = dynamic(import("../../editor/Editor"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const UpdateProblem = (props) => {
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
  const [text, setText] = useState(props.text);
  const [goal, setGoal] = useState(props.goal);
  const [name, setName] = useState(props.name);
  const [type, setType] = useState(props.problem.type);
  const [context, setContext] = useState(props.context);
  const [updatedSteps, setUpdatedSteps] = useState(
    props.steps && props.steps.problemItems.length > 0
      ? props.steps.problemItems
      : []
  );
  const [complexity, setComplexity] = useState(
    props.complexity ? props.complexity : 0
  );

  const { t } = useTranslation("lesson");
  const [updateProblem, { loading, error }] = useMutation(
    UPDATE_PROBLEM_MUTATION,
    {
      variables: {
        id,
        text,
        complexity,
        goal,
        type,
        name,
        context,
        steps: {
          problemItems: [...updatedSteps].map(
            ({ content, ...keepAttrs }) => keepAttrs
          ),
        },
      },
      refetchQueries: [
        {
          query: SINGLE_LESSON_QUERY,
          variables: { id: lessonID },
        },
      ],
      onCompleted: () => {
        props.switchUpdate();
        props.passUpdated();
      },
    }
  );

  const handleUpdate = async (e) => {
    e.preventDefault();

    const res = await updateProblem();
    props.getResult(res);
  };
  const getText = (d) => setText(d);

  const handleChange = () => {};
  const getSteps = (val) => {
    setUpdatedSteps([...val]);
  };
  return (
    <Styles>
      <div className="editor_container">
        <EditorInfoSection>
          <h3 className="label">ID: {id}</h3>
        </EditorInfoSection>
        <EditorInfoSection>
          <h3 className="label">Name</h3>
          <div className="comment">The name will be used for navigation</div>
          <NameInput
            onChange={(e) => setName(e.target.value)}
            defaultValue={name}
            placeholder="Untitled"
          />
        </EditorInfoSection>
        <EditorInfoSection>
          <h3 className="label">Goal</h3>
          <div className="comment">
            What learning results are students expected to achieve through this
            document editor
          </div>
          <textarea
            value={goal}
            onChange={(e) => {
              setGoal(e.target.value);
              autoResizeTextarea(e);
            }}
            onInput={autoResizeTextarea}
          />
        </EditorInfoSection>
        <EditorInfoSection>
          <h3 className="label">Context</h3>
          <div className="comment">
            This context will be used by AI to generate hints and feedback
          </div>
          <textarea
            value={context}
            onChange={(e) => {
              setContext(e.target.value);
              autoResizeTextarea(e);
            }}
            onInput={autoResizeTextarea}
          />
        </EditorInfoSection>
        <EditorInfoSection>
          <h3 className="label">Type</h3>
          <div className="comment">
            This determines how the case study works
          </div>
          <select
            name="types"
            id="types"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="BRANCHING_SCENARIO">Branching scenario</option>
            {/* <option value="GENERATE">Generate Ideas</option> */}
            <option value="ONLY_CORRECT">Quiz-based learning scenario</option>
          </select>
        </EditorInfoSection>
        <EditorInfoSection>
          <h3 className="label"></h3>
          <DynamicLoadedEditor
            getEditorText={getText}
            value={text}
            problem={true}
          />
        </EditorInfoSection>

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
      <BlueButton onClick={handleUpdate}>
        {loading ? t("saving") : t("save")}
      </BlueButton>
    </Styles>
  );
};

export default UpdateProblem;
