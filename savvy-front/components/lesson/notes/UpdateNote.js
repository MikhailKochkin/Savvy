import React, { useState } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import dynamic from "next/dynamic";
import Button from "@material-ui/core/Button";
import Option from "../Option";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  button: {
    width: "30%",
    margin: "2% 0",
    fontSize: "1.4rem",
    textTransform: "none"
  },
  root: {
    marginBottom: "4%"
  },
  formControl: {
    width: "70%",
    fontSize: "2.4rem",
    padding: "1% 0"
  },
  label: {
    fontSize: "1.5rem",
    fontFamily: "Montserrat",
    marginBottom: "1%"
  },
  labelRoot: {
    fontSize: "1.5rem"
  }
});

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
  ssr: false
});

const UpdateNote = props => {
  const [trueVal, setTrueVal] = useState("");
  const [falseVal, setFalseVal] = useState("");
  const [txt, setText] = useState("");
  const [next, setNext] = useState("");
  const classes = useStyles();

  const myCallback = d => setText(d);

  const myCallback2 = async (type, data) => {
    return type === "true" ? setTrueVal(data) : setFalseVal(data);
  };

  const onSave = () => {
    return setNext({
      true: trueVal,
      false: falseVal
    });
  };

  const { notes, text, quizes, id, tests } = props;
  return (
    <>
      <Container>
        <DynamicLoadedEditor getEditorText={myCallback} previousText={text} />
        <h3>Выберите задания для формата "Экзамен":</h3>
        <h3>Вопросы:</h3>
        {quizes.map(quiz => (
          <Option quiz={quiz} getData={myCallback2} />
        ))}
        <h3>Заметки:</h3>
        {notes.map(note => (
          <Option note={note} getData={myCallback2} />
        ))}
        <h3>Тесты:</h3>
        {tests.map(test => (
          <Option key={test.id} test={test} getData={myCallback2} />
        ))}
        <Button2 onClick={e => onSave()}>Compile</Button2>
        <Mutation
          mutation={UPDATE_NOTE_MUTATION}
          variables={{
            id: id,
            text: txt,
            next: next
          }}
        >
          {(updateNote, { loading, error }) => (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={async e => {
                // Stop the form from submitting
                e.preventDefault();
                // call the mutation
                const res = await updateNote();
                alert("Готово!");
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

export default UpdateNote;
