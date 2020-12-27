import React, { useState } from "react";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { SINGLE_LESSON_QUERY } from "../SingleLesson";
import { withTranslation } from "../../../i18n";

const UPDATE_NOTE_MUTATION = gql`
  mutation UPDATE_NOTE_MUTATION($id: ID!, $text: String, $next: Json) {
    updateNote(id: $id, text: $text, next: $next) {
      id
      text
      next
    }
  }
`;

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

const Button2 = styled.button`
  font-family: Montserrat;
  /* color: #112a62; */
  padding: 0.5% 1%;
  font-size: 1.6rem;
  background: #ffffff;
  /* border: 1px solid #112a62; */
  border-radius: 5px;
  outline: 0;
  margin-top: 3%;
  width: 25%;
`;

const DynamicLoadedEditor = dynamic(import("../../editor/LessonEditor"), {
  loading: () => <p>Загрузка...</p>,
  ssr: false,
});

const UpdateNote = (props) => {
  const [text, setText] = useState(props.text);
  const [trueVal, setTrueVal] = useState(
    props.next && props.next.true ? props.next.true : ""
  );
  const [falseVal, setFalseVal] = useState(
    props.next && props.next.false ? props.next.false : ""
  );

  const myCallback = async (type, data) => {
    return type === true ? setTrueVal(data) : setFalseVal(data);
  };

  const getText = (d) => setText(d);

  const { notes, quizes, id, tests, lessonID } = props;
  return (
    <>
      <Container>
        <DynamicLoadedEditor getEditorText={getText} previousText={text} />
        <Mutation
          mutation={UPDATE_NOTE_MUTATION}
          variables={{
            id: id,
            text: text,
            next: {
              true: trueVal,
              false: falseVal,
            },
          }}
          refetchQueries={() => [
            {
              query: SINGLE_LESSON_QUERY,
              variables: { id: lessonID },
            },
          ]}
        >
          {(updateNote, { loading, error }) => (
            <Button
              onClick={async (e) => {
                // Stop the form from submitting
                e.preventDefault();
                // call the mutation
                const res = await updateNote();
              }}
            >
              {loading ? props.t("saving") : props.t("save")}
            </Button>
          )}
        </Mutation>
      </Container>
    </>
  );
};

export default withTranslation("tasks")(UpdateNote);
