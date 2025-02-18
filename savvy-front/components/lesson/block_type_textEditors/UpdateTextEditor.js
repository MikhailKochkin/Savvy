import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";

import { SINGLE_LESSON_QUERY } from "../SingleLesson";
import {
  Row,
  ActionButton,
  SecondaryButton,
  Buttons,
} from "../styles/DevPageStyles";
import { autoResizeTextarea } from "../SimulatorDevelopmentFunctions";

const UPDATE_TEXTEDITOR_MUTATION = gql`
  mutation UPDATE_TEXTEDITOR_MUTATION(
    $id: String!
    $name: String
    $text: String
    $totalMistakes: Int
    $complexity: Int
    $goal: String
    $context: String
  ) {
    updateTextEditor(
      id: $id
      name: $name
      text: $text
      totalMistakes: $totalMistakes
      complexity: $complexity
      goal: $goal
      context: $context
    ) {
      id
      name
      complexity
      text
      goal
      totalMistakes
      context
      user {
        id
      }
    }
  }
`;

const Container = styled.div`
  width: 650px;
  margin: 1% 0 0 0;
  margin-top: 5%;
  h4 {
    padding: 0% 5%;
  }
  p > a {
    /* font-weight: 700; */
  }
  p > a:hover {
    /* text-decoration: underline; */
  }
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const EditorSection = styled.div`
  width: 100%;
  margin: 20px 0;
  textarea {
    padding: 10px;
    width: 100%;
    height: 150px;
    outline: 0;
    border: 1px solid #ccc;
    border-radius: 12px;
    font-size: 1.4rem;
    font-family: Montserrat;
    margin: 20px 0;
  }
`;

const DynamicLoadedEditor = dynamic(import("../../editor/Editor"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const UpdateTextEditor = (props) => {
  const { id, lessonID } = props;
  const [name, setName] = useState(props.name ? props.name : null);
  const [text, setText] = useState(props.text);
  const [open, setOpen] = useState(false);
  const [openHTML, setOpenHTML] = useState(false);
  const [goal, setGoal] = useState(props.goal);
  const [context, setContext] = useState(props.context);

  const [mistakes, setMistakes] = useState(props.totalMistakes);
  const [complexity, setComplexity] = useState(
    props.complexity ? props.complexity : 0
  );
  const { t } = useTranslation("lesson");

  const [updateTextEditor, { loading, error }] = useMutation(
    UPDATE_TEXTEDITOR_MUTATION,
    {
      variables: {
        id: id,
        text: text,
        complexity,
        goal,
        name,
        context,
        totalMistakes: parseInt(mistakes),
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
    const res = await updateTextEditor();
    props.getResult(res);
  };

  const getText = (d) => {
    setText(d);
  };

  return (
    <>
      <Container>
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
              this document editor
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
        {/* <h3 className="label">Text</h3>
          <div className="comment">
            We do not reveal the text immediately to prevent errors from
            breaking the website
          </div> */}
        <Buttons gap="10px" margin="0px">
          <SecondaryButton onClick={(e) => setOpen(!open)}>
            {open ? "Close Editor" : "Open Editor"}
          </SecondaryButton>
          <SecondaryButton onClick={(e) => setOpenHTML(!openHTML)}>
            {openHTML ? "Close HTML" : "Open HTML"}
          </SecondaryButton>
        </Buttons>
        {open && (
          <EditorSection>
            <DynamicLoadedEditor
              getEditorText={getText}
              value={text}
              complex={true}
              lessonId={lessonID}
              lesson={props.lesson}
              me={props.me}
            />
          </EditorSection>
        )}
        {openHTML && (
          <EditorSection>
            <textarea
              id="texteditor_code"
              value={text}
              onChange={(e) => setText(e.target.value)}
            >
              {text}
            </textarea>
          </EditorSection>
        )}
        <ActionButton onClick={handleUpdate}>
          {loading ? t("saving") : t("save")}
        </ActionButton>
      </Container>
    </>
  );
};

export default UpdateTextEditor;
