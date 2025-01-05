import { useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { useMutation, gql } from "@apollo/client";
import { SINGLE_LESSON_QUERY } from "../SingleLesson";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import {
  Row,
  ActionButton,
  SecondaryButton,
  Buttons,
} from "../styles/DevPageStyles";

const UPDATE_SHOTS_MUTATION = gql`
  mutation UPDATE_SHOTS_MUTATION(
    $id: String!
    $title: String
    $name: String
    $parts: [String!]
    $comments: [String!]
  ) {
    updateShot(
      id: $id
      title: $title
      name: $name
      parts: $parts
      comments: $comments
    ) {
      id
      title
      name
      parts
      comments
      user {
        id
      }
    }
  }
`;

const Styles = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1% 2%;
  margin-top: 20px;
`;

const Frame = styled.div`
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  width: 90%;
  margin-bottom: 3%;
  .com {
    border-top: 1px solid #c4c4c4;
  }
`;

const DynamicLoadedEditor = dynamic(import("../../editor/HoverEditor"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const UpdateShot = (props) => {
  const [parts, setParts] = useState([...props.parts]);
  const [comments, setComments] = useState([...props.comments]);
  const [title, setTitle] = useState(props.title);
  const [name, setName] = useState(props.name);
  const { t } = useTranslation("lesson");

  const [updateShot, { loading, error }] = useMutation(UPDATE_SHOTS_MUTATION, {
    refetchQueries: [
      {
        query: SINGLE_LESSON_QUERY,
        variables: { id: props.lessonID },
      },
    ],
    awaitRefetchQueries: true,
  });

  const myCallback = (dataFromChild, name, index) => {
    let new_parts = parts;
    new_parts[index] = dataFromChild;
    setParts([...new_parts]);
  };

  const myCallback2 = (dataFromChild, name, index) => {
    let new_comments = comments;
    new_comments[index] = dataFromChild;
    setComments([...new_comments]);
  };

  const more = () => {
    setParts([...parts, ""]);
    setComments([...comments, ""]);
  };

  const remove = () => {
    if (parts.length > 1) {
      let new_parts = [...parts];
      new_parts.pop();
      let new_comments = [...comments];
      new_comments.pop();
      setParts([...new_parts]);
      setComments([...new_comments]);
    }
  };

  return (
    <Styles>
      <Row>
        <div className="description">Id</div>
        <div className="action_area">
          <input value={props.shotID} />
        </div>
      </Row>
      <Row>
        <div className="description">Name</div>
        <div className="action_area">
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Untitled"
          />
        </div>
      </Row>
      <br />
      {_.times(parts.length, (i) => (
        <Row key={i}>
          <Frame>
            <DynamicLoadedEditor
              index={i}
              value={parts[i]}
              getEditorText={myCallback}
              placeholder={`Slide ${i + 1}`}
            />
            <div className="com">
              <DynamicLoadedEditor
                index={i}
                value={comments[i]}
                placeholder={`Comment ${i + 1}`}
                getEditorText={myCallback2}
              />
            </div>
          </Frame>
        </Row>
      ))}
      <Buttons>
        <SecondaryButton onClick={(e) => remove()}>
          Remove Slide
        </SecondaryButton>
        <SecondaryButton onClick={(e) => more()}>New Slide</SecondaryButton>
      </Buttons>
      <Buttons>
        <ActionButton
          onClick={async (e) => {
            e.preventDefault();
            const res2 = await updateShot({
              variables: {
                id: props.shotID,
                parts: parts,
                comments: comments,
                title: title,
                name: name,
              },
            });
            props.getResult(res2);
            props.switchUpdate();
          }}
        >
          {loading ? t("saving") : t("save")}
        </ActionButton>
      </Buttons>
    </Styles>
  );
};

export default UpdateShot;
