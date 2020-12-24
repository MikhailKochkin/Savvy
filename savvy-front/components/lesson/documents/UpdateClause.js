import React, { useState } from "react";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const UPDATE_CLAUSE_MUTATION = gql`
  mutation UPDATE_CLAUSE_MUTATION(
    $id: ID!
    $commentary: String!
    $sample: String!
    $keywords: [String!]
  ) {
    updateClause(
      id: $id
      commentary: $commentary
      sample: $sample
      keywords: $keywords
    ) {
      id
    }
  }
`;

const Styles = styled.div`
  margin-top: 2%;
  width: 90%;
`;

const Condition = styled.div`
  font-size: 1.7rem;
  input {
    display: inline-block;
    border: none;
    margin-left: 1%;
    font-family: Montserrat;
    font-size: 1.7rem;
    outline: 0;
  }
`;

const Frame = styled.div`
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  padding: 0 2%;
  margin: 2% 0;
`;

const Input = styled.input`
  width: 100%;
  background: none;
  font-size: 1.6rem;
  border: none;
  font-family: Montserrat;
  outline: 0;
  border-bottom: 1px solid #edefed;
  padding-bottom: 0.5%;
  &:focus {
    border-bottom: 1px solid #1a2a81;
  }
`;

const useStyles = makeStyles({
  button: {
    // width: "40%",
    margin: "4% 0",
    fontSize: "1.6rem",
    textTransform: "none",
  },
});

const DynamicLoadedEditor = dynamic(import("../../editor/HoverEditor"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const UpdateClause = (props) => {
  const [commentary, setCommentary] = useState(props.commentary);
  const [sample, setSample] = useState(props.sample);
  const [keywords, setKeywords] = useState(props.keywords);
  const myCallback = (dataFromChild, name) => {
    if (name === "sample") {
      setSample(dataFromChild);
    } else if (name === "commentary") {
      setCommentary(dataFromChild);
    }
  };
  const classes = useStyles();
  const { index } = props;
  return (
    <>
      <div id="title">Условия документа:</div>
      <Styles>
        <Mutation
          mutation={UPDATE_CLAUSE_MUTATION}
          variables={{
            id: props.id,
            commentary,
            sample,
            keywords,
          }}
        >
          {(updateClause, { loading, error }) => (
            <form>
              <Frame>
                <DynamicLoadedEditor
                  index={index}
                  value={commentary}
                  name="commentary"
                  getEditorText={myCallback}
                />
              </Frame>
              <Frame>
                <DynamicLoadedEditor
                  index={index}
                  value={sample}
                  name="sample"
                  getEditorText={myCallback}
                />
              </Frame>
              <div>
                <Input
                  defaultValue={[...keywords]}
                  onChange={(e) => setKeywords(event.target.value.split(", "))}
                />
              </div>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={async (e) => {
                  e.preventDefault();
                  const res = await updateClause();
                  alert("Изменили!");
                }}
              >
                Сохранить
              </Button>
            </form>
          )}
        </Mutation>
      </Styles>
    </>
  );
};

export default UpdateClause;
