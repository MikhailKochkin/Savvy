import React, { useState } from "react";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { makeStyles } from "@material-ui/core/styles";
import { SINGLE_LESSON_QUERY } from "../SingleLesson";
import ProblemBuilder from "../../create/ProblemBuilder";

const UPDATE_PROBLEM_MUTATION = gql`
  mutation UPDATE_PROBLEM_MUTATION(
    $id: String!
    $text: String
    $nodeID: String
    $nodeType: String
    $complexity: Int
  ) {
    updateProblem(
      id: $id
      text: $text
      nodeID: $nodeID
      nodeType: $nodeType
      complexity: $complexity
    ) {
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

const Complexity = styled.div`
  select,
  option {
    width: 80%;
    border-radius: 5px;
    margin-top: 3%;
    border: 1px solid #c4c4c4;
    font-family: Montserrat;
    font-size: 1.4rem;
    outline: 0;
    padding: 1.5%;
    margin-bottom: 20px;
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
  const [complexity, setComplexity] = useState(
    props.complexity ? props.complexity : 0
  );
  const getText = (d) => setText(d);
  console.log(props.complexity);
  const handleChange = (type, id) => {
    console.log(type, id);
    setNodeID(id);
    setNodeType(type);
  };

  const classes = useStyles();

  const { id, quizes, lessonID, newTests, notes } = props;
  return (
    <>
      <Container>
        <Complexity>
          <select
            value={complexity}
            onChange={(e) => setComplexity(parseInt(e.target.value))}
          >
            <option value={0}>Выберите сложность</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </Complexity>
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
            getNode={handleChange}
          />
        )}
        <Mutation
          mutation={UPDATE_PROBLEM_MUTATION}
          variables={{
            id,
            text,
            nodeID,
            nodeType,
            complexity,
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
