import React, { useState } from "react";
import { Mutation } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import styled from "styled-components";
// import Button from "@material-ui/core/Button";
// import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "next-i18next";

const CREATE_CLAUSE_MUTATION = gql`
  mutation CREATE_CLAUSE_MUTATION(
    $commentary: String!
    $sample: String!
    $keywords: [String!]
    $number: Int!
    $documentId: String!
  ) {
    createClause(
      commentary: $commentary
      sample: $sample
      keywords: $keywords
      number: $number
      documentId: $documentId
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

const CreateClause = (props) => {
  const [number, setNumber] = useState(props.index);
  const [commentary, setCommentary] = useState("");
  const [sample, setSample] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const myCallback = (dataFromChild, name) => {
    if (name === "sample") {
      setSample(dataFromChild);
    } else if (name === "commentary") {
      setCommentary(dataFromChild);
    }
  };
  const { t } = useTranslation("lesson");

  // const classes = useStyles();
  const { index, document } = props;
  return (
    <Styles>
      <Mutation
        mutation={CREATE_CLAUSE_MUTATION}
        variables={{
          documentId: document,
          commentary,
          sample,
          keywords,
          number,
        }}
      >
        {(createClause, { loading, error }) => (
          <form disabled={disabled}>
            <Condition>
              {t("doc_part")}
              <input
                type="number"
                value={number}
                onChange={(e) => setNumber(event.target.value)}
              />
            </Condition>
            <Frame>
              <DynamicLoadedEditor
                index={index}
                value={commentary}
                name="commentary"
                getEditorText={myCallback}
                placeholder={`Description of part ${index}`}
              />
            </Frame>
            <Frame>
              <DynamicLoadedEditor
                index={index}
                value={sample}
                name="sample"
                getEditorText={myCallback}
                placeholder={`Sample of part ${index}`}
              />
            </Frame>
            {/* <div>
              <Input
                defaultValue="Key words"
                onChange={(e) => setKeywords(event.target.value.split(", "))}
              />
            </div> */}
            <button
              variant="contained"
              color="primary"
              onClick={async (e) => {
                e.preventDefault();
                const res = await createClause();
                setDisabled(true);
                alert("Saved!");
              }}
            >
              {loading ? t("saving") : t("save")}
            </button>
          </form>
        )}
      </Mutation>
    </Styles>
  );
};

CreateClause.propTypes = {
  document: PropTypes.string.isRequired,
};

export default CreateClause;
