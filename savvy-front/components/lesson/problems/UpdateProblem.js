import React, { useState } from "react";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { makeStyles } from "@material-ui/core/styles";
import { SINGLE_LESSON_QUERY } from "../SingleLesson";
import ProblemBuilder from "./ProblemBuilder";

const UPDATE_PROBLEM_MUTATION = gql`
  mutation UPDATE_PROBLEM_MUTATION(
    $id: String!
    $text: String
    $nodeID: String
    $nodeType: String
  ) {
    updateProblem(id: $id, text: $text, nodeID: $nodeID, nodeType: $nodeType) {
      id
    }
  }
`;

const useStyles = makeStyles({
  button: {
    width: "30%",
    margin: "2% 0",
    fontSize: "1.4rem",
    textTransform: "none",
  },
  root: {
    marginBottom: "4%",
  },
  formControl: {
    width: "70%",
    fontSize: "2.4rem",
    padding: "1% 0",
  },
  label: {
    fontSize: "1.5rem",
    fontFamily: "Montserrat",
    marginBottom: "1%",
  },
  labelRoot: {
    fontSize: "1.5rem",
  },
});

const Container = styled.div`
  width: 100%;
  display: grid;
  margin: 1% 0 0 0;
  margin-top: 5%;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(3 70px);
  grid-template-areas:
    "explain"
    "first   ";
  h4 {
    padding: 0% 5%;
  }
  p > a {
    font-weight: 700;
  }
  p > a:hover {
    text-decoration: underline;
  }
  @media (max-width: 600px) {
    width: 100%;
  }
  input {
    padding: 0.5%;
    height: 75%;
    width: 100%;
    outline: 0;
    border: 1px solid #ccc;
    border-radius: 3.5px;
    padding: 2%;
    font-size: 1.4rem;
  }
`;

const Button = styled.button`
  padding: 0.5% 1%;
  background: ${(props) => props.theme.green};
  width: 25%;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  font-size: 1.6rem;
  margin: 2% 0;
  cursor: pointer;
  outline: 0;
  &:active {
    background-color: ${(props) => props.theme.darkGreen};
  }
`;

const DynamicLoadedEditor = dynamic(import("../../editor/ProblemEditor"), {
  loading: () => <p>Загрузка...</p>,
  ssr: false,
});

const UpdateProblem = (props) => {
  const [text, setText] = useState(props.text);
  const [nodeID, setNodeID] = useState(props.nodeID);
  const [nodeType, setNodeType] = useState(props.nodeType);

  const getText = (d) => setText(d);

  const handleChange = (e, type) => {
    setNodeID(e.target.value);
    setNodeType(type);
  };

  const classes = useStyles();

  const { id, quizes, lessonID, newTests, notes } = props;
  return (
    <>
      <Container>
        <DynamicLoadedEditor getEditorText={getText} previousText={text} />
        <h3>Выберите задания для формата "Экзамен" и "Задача":</h3>
        {nodeID && (
          <ProblemBuilder
            elements={[...newTests, ...quizes, ...notes]}
            quizes={quizes}
            newTests={newTests}
            notes={notes}
            nodeType={nodeType}
            nodeID={nodeID}
            lessonID={lessonID}
            // lesson={lesson}
            // getNode={getNode}
          />
        )}
        <Mutation
          mutation={UPDATE_PROBLEM_MUTATION}
          variables={{
            id: id,
            text: text,
            nodeID: nodeID,
            nodeType: nodeType,
          }}
          refetchQueries={() => [
            {
              query: SINGLE_LESSON_QUERY,
              variables: { id: lessonID },
            },
          ]}
        >
          {(updateProblem, { loading, error }) => (
            <Button
              onClick={async (e) => {
                // Stop the form from submitting
                e.preventDefault();
                // call the mutation
                const res = await updateProblem();
              }}
            >
              {loading ? "Сохраняем..." : "Сохранить"}
            </Button>
          )}
        </Mutation>
      </Container>
    </>
  );
};

export default UpdateProblem;
