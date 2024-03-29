import React, { useState } from "react";
import { Mutation } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import styled from "styled-components";
import PropTypes from "prop-types";
// import Button from "@material-ui/core/Button";
// import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "next-i18next";

const CREATE_DOCUMENT_MUTATION = gql`
  mutation CREATE_DOCUMENT_MUTATION($title: String!, $lessonId: String!) {
    createDocument(title: $title, lessonId: $lessonId) {
      id
      lessonId
      title
    }
  }
`;

const Styles = styled.div`
  margin-top: 5%;
  padding: 0% 0;
  width: 100%;
  #title {
    font-size: 2rem;
    margin-bottom: 2%;
  }
`;

const Input = styled.input`
  width: 50%;
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

const CreateTitle = (props) => {
  const [value, setValue] = useState("");
  // const classes = useStyles();
  const { t } = useTranslation("lesson");

  return (
    <Mutation
      mutation={CREATE_DOCUMENT_MUTATION}
      variables={{
        lessonId: props.id,
        title: value,
      }}
    >
      {(createDocument, { loading, error }) => (
        <Styles>
          <div id="title">{t("doc_name")}</div>
          <form>
            <Input
              value={value}
              onChange={(e) => setValue(event.target.value)}
            />
            <br />
            <button
              variant="contained"
              color="primary"
              onClick={async (e) => {
                e.preventDefault();
                const res = await createDocument();
                props.getStep("clauses", res.data.createDocument.id);
                props.getRes(res);
              }}
            >
              {loading ? t("saving") : t("save")}
            </button>
          </form>
        </Styles>
      )}
    </Mutation>
  );
};

CreateTitle.propTypes = {
  id: PropTypes.string.isRequired,
  getStep: PropTypes.func.isRequired,
};

export default CreateTitle;
