import React, { useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import { Mutation } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import { SINGLE_LESSON_QUERY } from "../SingleLesson";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";

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

const TestCreate = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1% 2%;
  margin: 5% 0;
  /* input {
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
  } */
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
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

const More = styled.div`
  align-self: flex-start;
  background: #ffffff;
  margin-top: 2.5%;
  border: 1px solid #112a62;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 0.5% 1.5%;
  color: #112a62;
  cursor: pointer;
  &:active {
    border: 2px solid #112a62;
  }
`;

const Remove = styled.div`
  align-self: flex-start;
  background: #ffffff;
  margin-top: 2.5%;
  border: 1px solid #de6b48;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 0.5% 1.5%;
  color: #de6b48;
  cursor: pointer;
  &:active {
    border: 2px solid #de6b48;
  }
`;

const Save = styled.button`
  padding: 1.5% 3%;
  align-self: flex-start;
  margin-top: 2.5%;
  font-size: 1.6rem;
  font-weight: 600;
  color: #fffdf7;
  background: ${(props) => props.theme.green};
  border: solid 1px white;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  &:active {
    background: ${(props) => props.theme.darkGreen};
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
    <Mutation
      mutation={UPDATE_SHOTS_MUTATION}
      variables={{
        id: props.shotID,
        parts: parts,
        comments: comments,
        title: title,
        name: name,
      }}
      refetchQueries={() => [
        {
          query: SINGLE_LESSON_QUERY,
          variables: { id: props.lessonID },
        },
      ]}
      awaitRefetchQueries={true}
    >
      {(updateShot, { loading, error }) => (
        <TestCreate>
          <NameInput
            name="title"
            spellCheck={true}
            placeholder="Doc name"
            autoFocus
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <>
            {_.times(parts.length, (i) => (
              <Row>
                <Frame>
                  <DynamicLoadedEditor
                    index={i}
                    value={parts[i]}
                    getEditorText={myCallback}
                    placeholder={`Text ${i + 1}`}
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
          <Remove onClick={(e) => remove()}>-1</Remove>
          <More onClick={(e) => more()}>+1</More>
          <Save
            onClick={async (e) => {
              e.preventDefault();
              const res2 = await updateShot();
              props.getResult(res2);
              props.switchUpdate();
              props.passUpdated();
            }}
          >
            {loading ? t("saving") : t("save")}
          </Save>
        </TestCreate>
      )}
    </Mutation>
  );
};

export default UpdateShot;
