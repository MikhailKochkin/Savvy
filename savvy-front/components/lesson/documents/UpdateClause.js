import React, { useState } from "react";
import { Mutation } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import styled from "styled-components";
// import Button from "@material-ui/core/Button";
// import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "next-i18next";

const UPDATE_CLAUSE_MUTATION = gql`
  mutation UPDATE_CLAUSE_MUTATION(
    $id: String!
    $commentary: String!
    $number: Int
    $sample: String!
    $keywords: [String!]
  ) {
    updateClause(
      id: $id
      commentary: $commentary
      number: $number
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

// const useStyles = makeStyles({
//   button: {
//     // width: "40%",
//     margin: "4% 0",
//     fontSize: "1.6rem",
//     textTransform: "none",
//   },
// });

const DynamicLoadedEditor = dynamic(import("../../editor/HoverEditor"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const UpdateClause = (props) => {
  const [commentary, setCommentary] = useState(props.commentary);
  const [sample, setSample] = useState(props.sample);
  const [number, setNumber] = useState(props.number);
  const [keywords, setKeywords] = useState(props.keywords);
  const { t } = useTranslation("lesson");

  const myCallback = (dataFromChild, name) => {
    if (name === "sample") {
      setSample(dataFromChild);
    } else if (name === "commentary") {
      setCommentary(dataFromChild);
    }
  };
  // const classes = useStyles();
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
            number,
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
                  type="number"
                  defaultValue={number}
                  onChange={(e) => setNumber(parseInt(e.target.value))}
                />
              </div>
              {/* <div>
                <Input
                  defaultValue={[...keywords]}
                  onChange={(e) => setKeywords(e.target.value.split(", "))}
                />
              </div> */}
              <button
                variant="contained"
                color="primary"
                onClick={async (e) => {
                  e.preventDefault();
                  const res = await updateClause();
                  alert("Updated!");
                }}
              >
                {loading ? t("saving") : t("save")}
              </button>
            </form>
          )}
        </Mutation>
      </Styles>
    </>
  );
};

export default UpdateClause;
