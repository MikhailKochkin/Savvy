import React, { useState } from "react";
import { Mutation } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { SINGLE_LESSON_QUERY } from "../../lesson/SingleLesson";

const CREATE_STATEMENT_MUTATION = gql`
  mutation CREATE_STATEMENT_MUTATION($text: String!, $forum: String!) {
    createStatement(text: $text, forum: $forum) {
      id
    }
  }
`;

const IconBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .icon {
    margin: 5px;
    border-radius: 50%;
    height: 55px;
    width: 55px;
    object-fit: cover;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .name {
    font-size: 1.2rem;
    text-align: center;
    color: #8f93a3;
    width: 70px;
    margin: 0 7px;
  }
`;

const Button = styled.button`
  padding: 1%;
  font-size: 1.4rem;
  font-weight: 600;
  margin: 2% 0;
  width: 12%;
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
    max-width: 350px;
  }
`;

const Form = styled.div`
  margin-top: 4%;
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
          forum: props.forum,
          text: text,
        }}
        refetchQueries={() => [
          {
            query: SINGLE_LESSON_QUERY,
            variables: { id: props.lesson },
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
                const res = await createStatement();
              }}
            >
              {loading ? "..." : "Send"}
            </Button>
          </Form>
        )}
      </Mutation>
    </>
  );
};

export default CreateStatement;
