import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";

import { SINGLE_LESSON_QUERY } from "../SingleLesson";
import {
  EditorInfoSection,
  NameInput,
  SimpleButton,
  BlueButton,
} from "../SimulatorDevelopmentStyles";
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

const DynamicLoadedEditor = dynamic(import("../../editor/Editor"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const UpdateTextEditor = (props) => {
  const { id, lessonID } = props;
  const [name, setName] = useState(props.name ? props.name : null);
  const [text, setText] = useState(props.text);
  const [open, setOpen] = useState(false);
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
        props.passUpdated();
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
          <h3 className="label">Text</h3>
          <div className="comment">
            We do not reveal the text immediately to prevent errors from
            breaking the website
          </div>
          <SimpleButton onClick={(e) => setOpen(!open)}>
            {open ? "Close" : "Open"}
          </SimpleButton>
          {open && (
            <DynamicLoadedEditor
              getEditorText={getText}
              value={text}
              complex={true}
              lessonId={lessonID}
            />
          )}
        </EditorInfoSection>
        <EditorInfoSection>
          <h3 className="label">Doc Editor</h3>
          <div className="comment">
            Use TextEditor code to add features unavailable in the default
          </div>
          <textarea
            id="texteditor_code"
            value={text}
            onChange={(e) => setText(e.target.value)}
          >
            {text}
          </textarea>
        </EditorInfoSection>
        <BlueButton onClick={handleUpdate}>
          {loading ? t("saving") : t("save")}
        </BlueButton>
      </Container>
    </>
  );
};

export default UpdateTextEditor;
