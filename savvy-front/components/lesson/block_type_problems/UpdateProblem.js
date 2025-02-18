import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { SINGLE_LESSON_QUERY } from "../SingleLesson";
import ProblemBuilder from "./archive/ProblemBuilder";
import CanvasProblemBuilder from "./functions/CanvasProblemBuilder";
import NewCanvasProblemBuilder from "./functions/NewCanvasProblemBuilder";
import { autoResizeTextarea } from "../SimulatorDevelopmentFunctions";
import { Row, ActionButton } from "../styles/DevPageStyles";

const UPDATE_PROBLEM_MUTATION = gql`
  mutation UPDATE_PROBLEM_MUTATION(
    $id: String!
    $text: String
    $name: String
    $type: String
    $complexity: Int
    $steps: ProblemStructureInput
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
      steps {
        problemItems {
          id
          type
          next {
            true {
              type
              value
            }
            false {
              type
              value
            }
            branches {
              source
              type
              value
            }
          }
          position {
            x
            y
          }
        }
      }
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
  margin-top: 20px;
  .editor_container {
    width: 600px;
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
    nodeType,
    steps,
    lesson,
  } = props;
  const [text, setText] = useState(props.text);
  const [goal, setGoal] = useState(props.goal);
  const [name, setName] = useState(props.name);
  const [type, setType] = useState(props.problem.type);
  const [context, setContext] = useState(props.context);
  const [updatedSteps, setUpdatedSteps] = useState(
    props.steps && props.steps.problemItems?.length > 0
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
          problemItems: updatedSteps.map(({ position, content, ...rest }) => ({
            ...rest,
            position: position
              ? (({ __typename, ...positionRest }) => positionRest)(position)
              : undefined, // Handle cases where position is undefined
          })),
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
  const getProblemSteps = (val) => {
    const sanitizedSteps = val.map((step) => {
      // Check if step.next and step.next.branches exist
      if (step.next?.branches) {
        // Remove __typename from each branch
        const sanitizedBranches = step.next.branches.map(
          ({ __typename, ...branch }) => branch
        );

        return {
          ...step,
          next: {
            ...step.next,
            branches: sanitizedBranches,
          },
        };
      }

      return step;
    });

    setUpdatedSteps(sanitizedSteps);
  };

  return (
    <Styles>
      <div className="editor_container">
        <Row>
          <div className="description">Id</div>
          <div className="action_area">
            <div className="element_info">{props.id}</div>
          </div>
        </Row>
        <Row>
          <div className="description">Name</div>
          <div className="action_area">
            <input
              onChange={(e) => setName(e.target.value)}
              defaultValue={name}
              placeholder="Untitled"
            />
            <div className="explainer">
              The name will be used for navigation
            </div>
          </div>
        </Row>
        <Row>
          <div className="description">Goal</div>
          <div className="action_area">
            <textarea
              value={goal}
              onChange={(e) => {
                setGoal(e.target.value);
                autoResizeTextarea(e);
              }}
              onInput={autoResizeTextarea}
            />
            <div className="explainer">
              What learning results are students expected to achieve through
              this case study
            </div>
          </div>
        </Row>
        <Row>
          <div className="description">Context</div>
          <div className="action_area">
            <textarea
              value={context}
              onChange={(e) => {
                setContext(e.target.value);
                autoResizeTextarea(e);
              }}
              onInput={autoResizeTextarea}
            />
            <div className="explainer">
              This context will be used by AI to generate hints and feedback
            </div>
          </div>
        </Row>
        <Row>
          <div className="description">Type</div>
          <div className="action_area">
            <select
              name="types"
              id="types"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="BRANCHING_SCENARIO">Branching scenario</option>
              <option value="ONLY_CORRECT">Quiz-based learning scenario</option>
              <option value="FLOW">Flow Mode</option>
            </select>
            <div className="explainer">
              This determines how the case study works
            </div>
          </div>
        </Row>
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
              characters={props.characters}
              me={props.me}
              lessonID={lesson.id}
              getProblemSteps={getProblemSteps}
              items={steps ? steps.problemItems : []}
            />
          </DndProvider>
        </div>
      )}
      <ActionButton onClick={handleUpdate}>
        {loading ? t("saving") : t("save")}
      </ActionButton>
    </Styles>
  );
};

export default UpdateProblem;
