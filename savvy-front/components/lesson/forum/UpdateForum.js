import React, { useState } from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import { SINGLE_LESSON_QUERY } from "../SingleLesson";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const UPDATE_FORUM_MUTATION = gql`
  mutation UPDATE_FORUM_MUTATION($id: ID!, $text: String) {
    updateForum(id: $id, text: $text) {
      id
    }
  }
`;

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

const Styles = styled.div`
  margin-top: 3%;
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
`;

const DynamicLoadedEditor = dynamic(import("../../editor/LessonEditor"), {
  loading: () => <p>Загрузка...</p>,
  ssr: false,
});

const UpdateForum = (props) => {
  const [text, setText] = useState(props.text);
  const classes = useStyles();
  const myCallback = (dataFromChild) => {
    setText(dataFromChild);
  };
  return (
    <Styles>
      <Mutation
        mutation={UPDATE_FORUM_MUTATION}
        variables={{
          id: props.id,
          text: text,
        }}
        refetchQueries={() => [
          {
            query: SINGLE_LESSON_QUERY,
            variables: { id: props.lesson },
          },
        ]}
      >
        {(updateForum, { loading, error }) => (
          <>
            <div id="Header">Изменить чат</div>
            <div>
              Внутри одного урока может быть только один форум. Но вы можете
              внести в него изменения.
            </div>
            <DynamicLoadedEditor
              getEditorText={myCallback}
              previousText={props.text}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={async (e) => {
                e.preventDefault();
                await updateForum();
                alert("Изменили!");
              }}
            >
              {loading ? "Изменяю" : "Изменить"}
            </Button>
          </>
        )}
      </Mutation>
    </Styles>
  );
};

export default UpdateForum;
