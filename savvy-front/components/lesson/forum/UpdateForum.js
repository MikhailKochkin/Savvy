import React, { useState } from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { Mutation } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
// import Button from "@material-ui/core/Button";
// import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import { SINGLE_LESSON_QUERY } from "../SingleLesson";

const UPDATE_FORUM_MUTATION = gql`
  mutation UPDATE_FORUM_MUTATION($id: String!, $text: String) {
    updateForum(id: $id, text: $text) {
      id
    }
  }
`;

// const useStyles = makeStyles({
//   button: {
//     width: "20%",
//     marginBottom: "2%",
//     fontSize: "1.4rem",
//     textTransform: "none",
//     fontFamily: "Montserrat",
//   },
//   root: {
//     marginBottom: "4%",
//   },
//   labelRoot: {
//     fontSize: "1.5rem",
//   },
// });

const BlueButton = styled.button`
  width: 180px;
  background: #3b5bb3;
  font-size: 1.6rem;
  font-weight: 500;
  color: #fff;
  border: 1px solid #3b5bb3;
  font-family: Montserrat;
  outline: 0;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 15px;
  transition: 0.3s ease-in;
  cursor: pointer;
  &:hover {
    border: 1px solid #283d78;
    background: #283d78;
  }
`;

const Styles = styled.div`
  margin-top: 3%;
  div {
    color: #767676;
    font-size: 1.5rem;
    margin-bottom: 2%;
  }
  #header {
    font-weight: bold;
    font-size: 1.8rem;
    margin-bottom: 0.5%;
    color: black;
  }
`;

const DynamicLoadedEditor = dynamic(import("../../editor/Editor"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const UpdateForum = (props) => {
  const [text, setText] = useState(props.text);
  // const classes = useStyles();
  const router = useRouter();

  const myCallback = (dataFromChild) => {
    setText(dataFromChild);
  };
  const { t } = useTranslation("lesson");

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
            <div id="header">
              {router.locale == "ru" ? (
                <div>Изменить чат</div>
              ) : (
                <div>Update Chat</div>
              )}
            </div>
            <div>
              {router.locale == "ru" ? (
                <div>
                  Внутри одного урока может быть только один форум. Но вы можете
                  внести в него изменения.
                </div>
              ) : (
                <div>
                  There can only be one chat in a lesson. But you can update it
                  anytime.
                </div>
              )}
            </div>
            <DynamicLoadedEditor
              getEditorText={myCallback}
              value={props.text}
            />
            <BlueButton
              type="submit"
              variant="contained"
              color="primary"
              onClick={async (e) => {
                e.preventDefault();
                await updateForum();
                alert("Done!");
              }}
            >
              {loading ? t("saving") : t("save")}
            </BlueButton>
          </>
        )}
      </Mutation>
    </Styles>
  );
};

export default UpdateForum;
