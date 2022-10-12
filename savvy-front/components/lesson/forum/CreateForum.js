import React, { useState } from "react";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { SINGLE_LESSON_QUERY } from "../SingleLesson";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

const CREATE_FORUM_MUTATION = gql`
  mutation createForum($lessonId: String!, $text: String) {
    createForum(lessonId: $lessonId, text: $text) {
      id
    }
  }
`;

const Styles = styled.div`
  margin-top: 3%;
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

const DynamicLoadedEditor = dynamic(import("../../editor/Editor"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const useStyles = makeStyles({
  button: {
    width: "20%",
    marginBottom: "2%",
    fontSize: "1.4rem",
    textTransform: "none",
    fontFamily: "Montserrat",
  },
  root: {
    marginBottom: "4%",
  },
  labelRoot: {
    fontSize: "1.5rem",
  },
});

const CreateForum = (props) => {
  const [text, setText] = useState("");
  const classes = useStyles();
  const myCallback = (dataFromChild) => {
    setText(dataFromChild);
  };

  const { t } = useTranslation("lesson");
  const router = useRouter();

  return (
    <Styles>
      <Mutation
        mutation={CREATE_FORUM_MUTATION}
        variables={{
          lessonId: props.lesson,
          text: text,
        }}
        refetchQueries={() => [
          {
            query: SINGLE_LESSON_QUERY,
            variables: { id: props.lesson },
          },
        ]}
      >
        {(createForum, { loading, error }) => (
          <Form>
            <div id="Header">{t("Forum")}</div>
            <div>
              {/* Кратко опишите вопрос, который вы хотите обсудить с участниками
              курса. */}
            </div>
            <DynamicLoadedEditor
              getEditorText={myCallback}
              placeholder="Описание"
              onChange={(e) => setText(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={async (e) => {
                e.preventDefault();
                const res = await createForum();
                props.getResult(res);

                // alert("Создали!");
              }}
            >
              {loading ? t("saving") : t("save")}
            </Button>
          </Form>
        )}
      </Mutation>
    </Styles>
  );
};

export default CreateForum;
