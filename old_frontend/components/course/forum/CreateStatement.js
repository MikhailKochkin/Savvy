import React, { useState } from "react";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { send } from "react-icons-kit/fa/send";
import Icon from "react-icons-kit";
import { SINGLE_COURSEPAGE_QUERY } from "../CoursePage";

const CREATE_STATEMENT_MUTATION = gql`
  mutation CREATE_STATEMENT_MUTATION($text: String!, $topic: ID!) {
    createStatement(text: $text, topic: $topic) {
      id
    }
  }
`;

const Button = styled.button`
  padding: 1%;
  font-size: 1.4rem;
  font-weight: 600;
  margin: 2% 0;
  width: 7%;
  color: #fffdf7;
  text-align: center;
  background: ${(props) => props.theme.green};
  border: solid 1px white;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  &:active {
    background: ${(props) => props.theme.darkGreen};
  }
  @media (max-width: 600px) {
    width: 10%;
    padding: 2%;
  }
`;

const TextBox = styled.div`
  font-size: 1.6rem;
  width: 100%;
  border: 1px solid #c4c4c4;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  outline: 0;
  padding: 0.5% 2%;
  font-size: 1.6rem;
  @media (max-width: 800px) {
    width: 350px;
  }
`;

const Form = styled.div`
  /* text-align: right; */
`;

const DynamicLoadedEditor = dynamic(import("../../editor/HoverEditor"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const CreateStatement = (props) => {
  const [text, setText] = useState("");

  const myCallback = (dataFromChild) => setText(dataFromChild);

  return (
    <>
      <Mutation
        mutation={CREATE_STATEMENT_MUTATION}
        variables={{
          topic: props.topic.id,
          text: text,
        }}
        refetchQueries={() => [
          {
            query: SINGLE_COURSEPAGE_QUERY,
            variables: { id: props.coursePageID },
          },
        ]}
      >
        {(createStatement, { loading, error }) => (
          <Form>
            <TextBox>
              <DynamicLoadedEditor getEditorText={myCallback} name="text" />{" "}
            </TextBox>
            <Button
              onClick={async (e) => {
                e.preventDefault();
                console.log("2");
                const res = await createStatement();
              }}
            >
              {loading ? "..." : <Icon icon={send} />}
            </Button>
          </Form>
        )}
      </Mutation>
    </>
  );
};

export default CreateStatement;
