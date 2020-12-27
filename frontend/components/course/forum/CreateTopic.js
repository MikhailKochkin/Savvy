import React, { useState } from "react";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import styled from "styled-components";
import { SINGLE_COURSEPAGE_QUERY } from "../CoursePage";
import { send } from "react-icons-kit/fa/send";
import Icon from "react-icons-kit";

const CREATE_TOPIC_MUTATION = gql`
  mutation createTopic($coursePage: ID!, $name: String) {
    createTopic(coursePage: $coursePage, name: $name) {
      id
    }
  }
`;

const Form = styled.div`
  div {
    color: #767676;
    font-size: 1.5rem;
    margin-bottom: 2%;
  }
  #Header {
    font-weight: bold;
    font-size: 1.8rem;
    margin-bottom: 0.5%;
    color: black;
  }
  input {
    width: 100%;
    padding: 1%;
    font-family: Montserrat;
    font-size: 1.5rem;
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

const CreateTopic = (props) => {
  const [name, setName] = useState("");
  return (
    <>
      <Mutation
        mutation={CREATE_TOPIC_MUTATION}
        variables={{
          coursePage: props.coursePageID,
          name: name,
        }}
        refetchQueries={() => [
          {
            query: SINGLE_COURSEPAGE_QUERY,
            variables: { id: props.coursePageID },
          },
        ]}
      >
        {(createTopic, { loading, error }) => (
          <Form>
            <div id="Header">Новая тема</div>
            <div>
              Кратко опишите вопрос, который вы хотите обсудить с автором курса
              и другими участниками (не больше 60 знаков).
            </div>
            <input maxlength="60" onChange={(e) => setName(e.target.value)} />
            <br />
            <Button
              onClick={async (e) => {
                e.preventDefault();
                await createTopic();
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

export default CreateTopic;
