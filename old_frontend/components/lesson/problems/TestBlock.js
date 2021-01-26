import React, { useState, useEffect } from "react";
import renderHTML from "react-render-html";
import styled from "styled-components";
import smoothscroll from "smoothscroll-polyfill";
import { Mutation } from "@apollo/client/react/components";
import gql from "graphql-tag";
import { SINGLE_LESSON_QUERY } from "../SingleLesson";

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
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  margin: 30px 0;
  width: 100%;
  .section {
    border-radius: 10px;
    background: rgba(240, 248, 255);
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

const Header = styled.div`
  background: ${(props) => props.color};
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  text-align: center;
`;

const Bottom = styled.div`
  background: ${(props) => props.color};
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  text-align: center;
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
  const [t, setT] = useState(props.t.value);
  const [f, setF] = useState(props.f.value);
  const [type, setType] = useState(props.type ? props.type : "");
  const [t_type, setT_type] = useState(props.t.type);
  const [f_type, setF_type] = useState(props.f.type);

  const handleChoice = (el) => {
    props.getNewBlock(el, c, props.color);
  };
  useEffect(() => {
    // kick off the polyfill!
    smoothscroll.polyfill();
  });

  const move = () => {
    var my_element = document.getElementById(
      props.source ? props.source : "first"
    );
    my_element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  const removeBlock = () => {
    props.removeBlock(c);
  };
  return (
    <Block id={c ? c : props.id}>
      <Header onClick={(e) => move()} color={props.sourceColor}>
        🔼
      </Header>
      <div className="body">
        <Section
          className="section"
          // fixed={props.fixed}
        >
          <div>Основное задание</div>
          <select defaultValue={type} onChange={(e) => setType(e.target.value)}>
            <option>Выберите тип</option>
            <option value="newtest">Тест</option>
            <option value="quiz">Вопрос</option>
            <option value="note">Заметка</option>
            <option value="">Конец</option>
          </select>
          {type === "newtest" && (
            <select
              className="question"
              defaultValue={c}
              onChange={(e) => setC(e.target.value)}
            >
              <option>Выберите</option>
              {props.newTests.map((q) => (
                <option value={q.id}>{q.question[0]}</option>
              ))}
              <option value="">Конец</option>м
            </select>
          )}
          {type === "quiz" && (
            <select
              className="question"
              defaultValue={c}
              onChange={(e) => setC(e.target.value)}
            >
              <option>Выберите</option>
              {props.quizes.map((q) => (
                <option value={q.id}>{q.question}</option>
              ))}
              <option value="">Конец</option>
            </select>
          )}
          {type === "note" && (
            <select
              className="question"
              defaultValue={c}
              onChange={(e) => setC(e.target.value)}
            >
              <option>Выберите</option>
              {props.notes.map((q) => (
                <option value={q.id}>{q.text}</option>
              ))}
              <option value="">Конец</option>
            </select>
          )}
        </Section>
        <div className="section">
          <div>В случае правильного ответа</div>
          <select
            defaultValue={t_type}
            onChange={(e) => setT_type(e.target.value)}
          >
            <option>Выберите тип</option>
            <option value="newtest">Тест</option>
            <option value="quiz">Вопрос</option>
            <option value="note">Заметка</option>
            <option value="">Конец</option>
          </select>
          {t_type === "newtest" && (
            <select defaultValue={t} onChange={(e) => setT(e.target.value)}>
              <option>Выберите</option>

              {props.newTests.map((q) => (
                <option value={q.id}>{q.question[0]}</option>
              ))}
              <option value="">Конец</option>
            </select>
          )}
          {t_type === "quiz" && (
            <select defaultValue={t} onChange={(e) => setT(e.target.value)}>
              <option>Выберите</option>

              {props.quizes.map((q) => (
                <option value={q.id}>{q.question}</option>
              ))}
              <option value="">Конец</option>
            </select>
          )}
          {t_type === "note" && (
            <select defaultValue={t} onChange={(e) => setT(e.target.value)}>
              <option>Выберите</option>

              {props.notes.map((q) => (
                <option value={q.id}>{q.text}</option>
              ))}
              <option value="">Конец</option>
            </select>
          )}
          <button onClick={(e) => handleChoice(t)}>Новый блок</button>
        </div>
        <div className="section">
          <div>В случае неправильного ответа</div>{" "}
          <select
            defaultValue={f_type}
            onChange={(e) => setF_type(e.target.value)}
          >
            <option>Выберите тип</option>
            <option value="newtest">Тест</option>
            <option value="quiz">Вопрос</option>
            <option value="note">Заметка</option>
            <option value="">Конец</option>
          </select>
          {f_type === "newtest" && (
            <select defaultValue={f} onChange={(e) => setF(e.target.value)}>
              <option>Выберите</option>

              {props.newTests.map((q) => (
                <option value={q.id}>{q.question[0]}</option>
              ))}

              <option value="">Конец</option>
            </select>
          )}
          {f_type === "quiz" && (
            <select defaultValue={f} onChange={(e) => setF(e.target.value)}>
              <option>Выберите</option>

              {props.quizes.map((q) => (
                <option value={q.id}>{q.question}</option>
              ))}

              <option value="">Конец</option>
            </select>
          )}
          {f_type === "note" && (
            <select defaultValue={f} onChange={(e) => setF(e.target.value)}>
              <option>Выберите</option>

              {props.notes.map((q) => (
                <option value={q.id}>{q.text}</option>
              ))}

              <option value="">Конец</option>
            </select>
          )}
          <button onClick={(e) => handleChoice(f)}>Новый блок</button>
        </div>
      </div>
      <Mutation
        mutation={UPDATE_QUIZ_MUTATION}
        variables={{
          id: props.id,
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
      >
        {(updateQuiz, { loading, error }) => (
          <Mutation
            mutation={UPDATE_TEST_MUTATION}
            refetchQueries={() => [
              {
                query: SINGLE_LESSON_QUERY,
                variables: { id: props.lessonID },
              },
            ]}
            variables={{
              id: props.id,
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
            {(updateTestForProblem, { loading, error }) => (
              <Mutation
                mutation={UPDATE_NOTE_MUTATION}
                variables={{
                  id: props.id,
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
              >
                {(updateNote, { loading, error }) => (
                  <button
                    onClick={async (e) => {
                      // Stop the form from submitting
                      e.preventDefault();
                      // call the mutation
                      if (type === "newtest") {
                        updateTestForProblem();
                      } else if (type === "quiz") {
                        updateQuiz();
                      } else if (type === "note") {
                        updateNote();
                      }
                      console.log("Изменено");
                    }}
                  >
                    {loading ? "Сохраняем..." : "Сохранить"}
                  </button>
                )}
              </Mutation>
            )}
          </Mutation>
        )}
      </Mutation>
      <button onClick={(e) => removeBlock()}>Убрать блок</button>
      <Bottom color={props.color}>🔽</Bottom>
    </Block>
  );
};

export default TestBlock;
