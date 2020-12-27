import React, { useState, useEffect } from "react";
import renderHTML from "react-render-html";
import styled from "styled-components";
import smoothscroll from "smoothscroll-polyfill";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import { SINGLE_LESSON_QUERY } from "../../lesson/SingleLesson";

const UPDATE_QUIZ_MUTATION = gql`
  mutation UPDATE_QUIZ_MUTATION($id: ID!, $next: Json) {
    updateQuiz(id: $id, next: $next) {
      id
    }
  }
`;

const UPDATE_NOTE_MUTATION = gql`
  mutation UPDATE_NOTE_MUTATION($id: ID!, $next: Json) {
    updateNote(id: $id, next: $next) {
      id
      next
    }
  }
`;

const UPDATE_TEST_MUTATION = gql`
  mutation UPDATE_TEST_MUTATION($id: ID!, $next: Json) {
    updateTestForProblem(id: $id, next: $next) {
      id
    }
  }
`;

const Block = styled.div`
  font-size: 1.6rem;
  margin: 1% 4%;
  border-radius: 10px;
  margin: 30px 0;
  width: 400px;
  padding: 1%;
  background: rgba(240, 248, 255);
  .section {
    border-radius: 10px;
    margin-bottom: 15px;
    padding: 2%;
    div {
      font-weight: bold;
      font-size: 1.4rem;
    }
  }
  select,
  option {
    width: 100%;
    border: none;
    font-family: Montserrat;
    background: rgba(240, 248, 255);
    font-size: 1.6rem;
    outline: 0;
    &.question {
      margin-top: 7px;
      /* border-top: 1px solid black; */
    }
  }
  .body {
    padding: 2%;
  }
`;

const Section = styled.div`
  border-radius: 10px;
  background: rgba(240, 248, 255);
  margin-bottom: 15px;
  padding: 2%;
  pointer-events: ${(props) => (props.fixed ? "none" : "auto")};
  div {
    font-weight: bold;
    font-size: 1.4rem;
  }
`;

const TestBlock = (props) => {
  const [c, setC] = useState(props.value ? props.value.id : "");
  const [t, setT] = useState(
    props.value && props.value.next && props.value.next.true
      ? props.value.next.true.value
      : ""
  );
  const [f, setF] = useState(
    props.value && props.value.next && props.value.next.false
      ? props.value.next.false.value
      : ""
  );
  const [type, setType] = useState(props.type ? props.type : "");
  const [t_type, setT_type] = useState(
    props.value && props.value.next && props.value.next.true
      ? props.value.next.true.type
      : ""
  );
  const [f_type, setF_type] = useState(
    props.value && props.value.next && props.value.next.false
      ? props.value.next.false.type
      : ""
  );
  const [open, setOpen] = useState(true);

  const handleChoice = (el, correct) =>
    props.getNewBlock(el, c, props.color, correct);

  return (
    <Block id={c ? c : props.id} className={c ? c : props.id}>
      <div className="body">
        <Section className="section" fixed={props.fixed}>
          <div>
            {props.id !== "first"
              ? props.correct
                ? "Верный ответ"
                : "Неверный ответ"
              : null}
          </div>
          <div>Основное задание</div>
          <select
            defaultValue={type ? type.toLowerCase() : "example"}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="example">Выберите тип</option>
            <option value="newtest">Тест</option>
            <option value="quiz">Вопрос</option>
            <option value="note">Заметка</option>
          </select>
          {type.toLowerCase() === "newtest" && (
            <select
              className="question"
              defaultValue={c}
              onChange={(e) => setC(e.target.value)}
            >
              <option value={1}>Выберите</option>
              {props.newTests.map((q) => {
                let el = renderHTML(q.question[0]);
                return (
                  <option value={q.id}>
                    {el.props ? el.props.children[0] : el}
                  </option>
                );
              })}
            </select>
          )}
          {type.toLowerCase() === "quiz" && (
            <select
              className="question"
              defaultValue={c}
              onChange={(e) => setC(e.target.value)}
            >
              <option value={1}>Выберите</option>
              {props.quizes.map((q) => {
                let el = renderHTML(q.question);
                return (
                  <option value={q.id}>
                    {el.props ? el.props.children[0] : el}
                  </option>
                );
              })}
            </select>
          )}
          {type.toLowerCase() === "note" && (
            <select
              className="question"
              defaultValue={c}
              onChange={(e) => setC(e.target.value)}
            >
              <option value={1}>Выберите</option>
              {props.notes.map((q) => {
                return <option value={q.id}>{q.text}</option>;
              })}
            </select>
          )}
        </Section>
        {open && (
          <>
            <div className="section">
              <div>В случае правильного ответа</div>
              <select
                defaultValue={t_type ? t_type.toLowerCase() : "example"}
                onChange={(e) => setT_type(e.target.value)}
              >
                <option value="example">Выберите тип</option>
                <option value="newtest">Тест</option>
                <option value="quiz">Вопрос</option>
                <option value="note">Заметка</option>
              </select>
              {t_type && t_type.toLowerCase() === "newtest" && (
                <select defaultValue={t} onChange={(e) => setT(e.target.value)}>
                  <option value={1}>Выберите</option>

                  {props.newTests.map((q) => {
                    let el = renderHTML(q.question[0]);
                    return (
                      <option value={q.id}>
                        {el.props ? el.props.children[0] : el}
                      </option>
                    );
                  })}
                </select>
              )}
              {t_type && t_type.toLowerCase() === "quiz" && (
                <select defaultValue={t} onChange={(e) => setT(e.target.value)}>
                  <option value={1}>Выберите</option>

                  {props.quizes.map((q) => {
                    let el = renderHTML(q.question);
                    return (
                      <option value={q.id}>
                        {el.props ? el.props.children[0] : el}
                      </option>
                    );
                  })}
                </select>
              )}
              {t_type && t_type.toLowerCase() === "note" && (
                <select defaultValue={t} onChange={(e) => setT(e.target.value)}>
                  <option value={1}>Выберите</option>
                  {props.notes.map((q) => {
                    return <option value={q.id}>{q.text}</option>;
                  })}
                </select>
              )}
              <button onClick={(e) => handleChoice(t, true)}>Новый блок</button>
            </div>
            <div className="section">
              <div>В случае неправильного ответа</div>{" "}
              <select
                defaultValue={f_type ? f_type.toLowerCase() : "example"}
                onChange={(e) => setF_type(e.target.value)}
              >
                <option value="example">Выберите тип</option>
                <option value="newtest">Тест</option>
                <option value="quiz">Вопрос</option>
                <option value="note">Заметка</option>
              </select>
              {f_type && f_type.toLowerCase() === "newtest" && (
                <select defaultValue={f} onChange={(e) => setF(e.target.value)}>
                  <option value={1}>Выберите</option>
                  {props.newTests.map((q) => {
                    let el = renderHTML(q.question[0]);
                    return (
                      <option value={q.id}>
                        {el.props ? el.props.children[0] : el}
                      </option>
                    );
                  })}
                </select>
              )}
              {f_type && f_type.toLowerCase() === "quiz" && (
                <select defaultValue={f} onChange={(e) => setF(e.target.value)}>
                  <option value={1}>Выберите</option>
                  {props.quizes.map((q) => {
                    let el = renderHTML(q.question);
                    return (
                      <option value={q.id}>
                        {el.props ? el.props.children[0] : el}
                      </option>
                    );
                  })}
                </select>
              )}
              {f_type && f_type.toLowerCase() === "note" && (
                <select defaultValue={f} onChange={(e) => setF(e.target.value)}>
                  <option value={1}>Выберите</option>
                  {props.notes.map((q) => {
                    return <option value={q.id}>{q.text}</option>;
                  })}
                </select>
              )}
              <button onClick={(e) => handleChoice(f, false)}>
                Новый блок
              </button>
            </div>
          </>
        )}
      </div>
      <Mutation
        mutation={UPDATE_QUIZ_MUTATION}
        variables={{
          id: c,
          next: {
            true: {
              type: t_type,
              value: t,
            },
            false: {
              type: f_type,
              value: f,
            },
          },
        }}
        refetchQueries={() => [
          {
            query: SINGLE_LESSON_QUERY,
            variables: { id: props.lessonID },
          },
        ]}
        awaitRefetchQueries={true}
      >
        {(updateQuiz, { loading: loading1, error }) => (
          <Mutation
            mutation={UPDATE_TEST_MUTATION}
            refetchQueries={() => [
              {
                query: SINGLE_LESSON_QUERY,
                variables: { id: props.lessonID },
              },
            ]}
            awaitRefetchQueries={true}
            variables={{
              id: c,
              next: {
                true: {
                  type: t_type,
                  value: t,
                },
                false: {
                  type: f_type,
                  value: f,
                },
              },
            }}
          >
            {(updateTestForProblem, { loading: loading2, error }) => (
              <Mutation
                mutation={UPDATE_NOTE_MUTATION}
                variables={{
                  id: c,
                  next: {
                    true: {
                      type: t_type,
                      value: t,
                    },
                    false: {
                      type: f_type,
                      value: f,
                    },
                  },
                }}
                refetchQueries={() => [
                  {
                    query: SINGLE_LESSON_QUERY,
                    variables: { id: props.lessonID },
                  },
                ]}
                awaitRefetchQueries={true}
              >
                {(updateNote, { loading: loading3, error }) => (
                  <button
                    onClick={async (e) => {
                      // Stop the form from submitting
                      e.preventDefault();
                      // call the mutation
                      if (props.getNode) {
                        console.log(0);
                        props.getNode(type, c);
                      }
                      if (type === "newtest") {
                        updateTestForProblem();
                      } else if (type === "quiz") {
                        updateQuiz();
                      } else if (type === "note") {
                        updateNote();
                      }
                      console.log(1);
                    }}
                  >
                    {loading1 || loading2 || loading3
                      ? "Сохраняем..."
                      : "Сохранить"}
                  </button>
                )}
              </Mutation>
            )}
          </Mutation>
        )}
      </Mutation>
    </Block>
  );
};

export default TestBlock;
