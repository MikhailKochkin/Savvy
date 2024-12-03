import React, { useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { useMutation, gql } from "@apollo/client";
import dynamic from "next/dynamic";

import { SINGLE_LESSON_QUERY } from "../SingleLesson";
import {
  Row,
  ActionButton,
  SecondaryButton,
  Buttons,
} from "../styles/DevPageStyles";

const CREATE_SHOTS_MUTATION = gql`
  mutation CREATE_SHOTS_MUTATION(
    $title: String!
    $parts: [String!]
    $comments: [String!]
    $lessonId: String!
  ) {
    createShot(
      title: $title
      parts: $parts
      comments: $comments
      lessonId: $lessonId
    ) {
      id
      title
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
`;

const TestCreate = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1% 2%;
  margin-bottom: 5%;
  input {
    align-self: flex-start;
    margin-bottom: 3%;
    border-radius: 5px;
    font-family: Montserrat;
    border: 1px solid #c4c4c4;
    width: 90%;
    height: 40px;
    padding: 1.5% 5px;
    font-size: 1.6rem;
    outline: 0;
  }
`;

const Frame = styled.div`
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  width: 90%;
  margin-bottom: 3%;
  padding: 0 1%;
  .com {
    border-top: 1px solid #c4c4c4;
  }
`;

const DynamicLoadedEditor = dynamic(import("../../editor/HoverEditor"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const CreateShot = (props) => {
  const [parts, setParts] = useState(
    props.initial_data?.content ? props.initial_data.content.parts : []
  );
  const [comments, setComments] = useState(
    props.initial_data?.content ? props.initial_data.content.comments : []
  );
  const [title, setTitle] = useState(
    props.initial_data ? props.initial_data.idea : "Deck"
  );

  const [createShot, { loading, error }] = useMutation(CREATE_SHOTS_MUTATION, {
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
      <TestCreate>
        <Row>
          <div className="description">Name</div>
          <div className="action_area">
            <input
              onChange={(e) => setTitle(e.target.value)}
              defaultValue={name}
              placeholder="Untitled"
            />
          </div>
        </Row>

        <>
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
        </>
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
              const res2 = await createShot({
                variables: {
                  lessonId: props.lessonID,
                  parts: parts,
                  comments: comments,
                  title: title,
                },
              });
              props.getResult(res2);
            }}
          >
            {loading ? "Saving..." : "Save"}
          </ActionButton>
        </Buttons>
      </TestCreate>
    </Styles>
  );
};

export default CreateShot;
