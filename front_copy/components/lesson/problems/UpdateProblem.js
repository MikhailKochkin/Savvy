import React, { useState } from "react";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "next-i18next";

import { SINGLE_LESSON_QUERY } from "../SingleLesson";
import ProblemBuilder from "../../create/ProblemBuilder";

const UPDATE_PROBLEM_MUTATION = gql`
  mutation UPDATE_PROBLEM_MUTATION(
    $id: String!
    $text: String
    # $nodeID: String
    # $nodeType: String
    $complexity: Int
  ) {
    updateProblem(
      id: $id
      text: $text
      # nodeID: $nodeID
      # nodeType: $nodeType
      complexity: $complexity
    ) {
      id
      text
      nodeID
      steps
      complexity
      nodeType
      user {
        id
      }
      createdAt
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
  margin: 1% 0 0 0;
  margin-top: 5%;
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

const ButtonTwo = styled.button`
  border: none;
  background: #3f51b5;
  padding: 10px 20px;
  border: 2px solid #3f51b5;
  border-radius: 5px;
  font-family: Montserrat;
  font-size: 1.4rem;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
  margin: 20px 0;
  margin-right: 10px;
  transition: 0.3s;
  &:hover {
    background: #2e3b83;
    border: 2px solid #2e3b83;
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

const DynamicLoadedEditor = dynamic(import("../../editor/Editor"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const UpdateProblem = (props) => {
  const [text, setText] = useState(props.text);
  // const [nodeID, setNodeID] = useState(props.nodeID);
  // const [nodeType, setNodeType] = useState(props.nodeType);
  const [complexity, setComplexity] = useState(
    props.complexity ? props.complexity : 0
  );
  const getText = (d) => setText(d);

  const { t } = useTranslation("lesson");

  const handleChange = (type, id) => {
    setNodeID(id);
    setNodeType(type);
  };

  const classes = useStyles();

  const { id, quizes, lessonID, newTests, notes, nodeID, nodeType } = props;
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
        <textarea onChange={(e) => setText(e.target.value)}>{text}</textarea>

        <DynamicLoadedEditor
          getEditorText={getText}
          value={text}
          problem={true}
        />
        {/* <h3>Выберите задания для формата "Экзамен" и "Задача":</h3> */}
        {nodeID && nodeType && (
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
            // nodeID,
            // nodeType,
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
            <ButtonTwo
              onClick={async (e) => {
                // Stop the form from submitting
                e.preventDefault();
                // call the mutation
                const res = await updateProblem();
                props.getResult(res);
                props.switchUpdate();
                props.passUpdated();
              }}
            >
              {loading ? t("saving") : t("save")}
            </ButtonTwo>
          )}
        </Mutation>
      </Container>
    </>
  );
};

export default UpdateProblem;
