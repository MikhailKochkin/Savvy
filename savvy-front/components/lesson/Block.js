import React, { useState } from "react";
import styled from "styled-components";
import { Icon } from "react-icons-kit";
import { arrowDown } from "react-icons-kit/fa/arrowDown";
import renderHTML from "react-render-html";

const Styles = styled.div`
  margin: 3% 0;
  border: 1px solid #e4e4e4;
  padding: 2%;
  option {
    font-family: Montserrat;
  }
`;

const Title = styled.div`
  background: rgba(169, 210, 255, 0.25);
  padding: 2%;
  .type {
    font-size: 1.7rem;
    font-weight: bold;
    p {
      margin: 4px 0;
    }
    h2 {
      font-size: 1.7rem;
      margin: 4px 0;
    }
  }
`;

const Variants = styled.div`
  width: 100%;
`;

const Section = styled.div`
  h2 {
    font-size: 1.5rem;
    font-weight: 300;
  }
  .option {
    border-bottom: 1px solid #e4e4e4;
    padding-bottom: 2%;
    margin-bottom: 2%;
  }
`;

const Block = (props) => {
  const [task, setTask] = useState(false);
  const {
    value,
    tests,
    quizes,
    notes,
    shots,
    problems,
    texteditors,
    constructions,
    exams,
    documents,
    forum,
  } = props;
  return (
    <>
      {props.i !== 0 && <Icon size={"2.5em"} icon={arrowDown} id="back" />}
      <Styles>
        {value.type === "NewTest" ? (
          <Title>
            <div className="type">
              Тест: {tests.filter((t) => t.id === value.id)[0].question}
            </div>
          </Title>
        ) : null}
        {value.type === "Quiz" ? (
          <Title>
            <div className="type">
              Вопрос: {quizes.filter((q) => q.id === value.id)[0].question}
            </div>
          </Title>
        ) : null}
        {value.type === "Note" ? (
          <Title>
            <div className="type">
              Лонгрид:{" "}
              {renderHTML(
                notes.filter((q) => q.id === value.id)[0].text.substring(0, 100)
              )}
            </div>
          </Title>
        ) : null}
        {value.type === "Shot" ? (
          <Title>
            <div className="type">
              Алгоритм: {shots.filter((q) => q.id === value.id)[0].title}
            </div>
          </Title>
        ) : null}
        {value.type === "TextEditor" ? (
          <Title>
            <div className="type">
              Редактор:{" "}
              {renderHTML(
                texteditors
                  .filter((q) => q.id === value.id)[0]
                  .text.substring(0, 100)
              )}
            </div>
          </Title>
        ) : null}
        {value.type === "Construction" ? (
          <Title>
            <div className="type">
              Конструктор:{" "}
              {constructions.filter((q) => q.id === value.id)[0].name}
            </div>
          </Title>
        ) : null}
        {value.type === "Problem" ? (
          <Title>
            <div className="type">
              Задача:{" "}
              {renderHTML(
                problems
                  .filter((q) => q.id === value.id)[0]
                  .text.substring(0, 100)
              )}
            </div>
          </Title>
        ) : null}
        {value.type === "Document" ? (
          <Title>
            <div className="type">
              Документ: {documents.filter((q) => q.id === value.id)[0].title}
            </div>
          </Title>
        ) : null}
        {value.type === "Exam" ? (
          <Title>
            <div className="type">
              Экзамен: {exams.filter((q) => q.id === value.id)[0].name}
            </div>
          </Title>
        ) : null}
        {value.type === "Forum" ? (
          <Title>
            <div className="type">
              Чат: {renderHTML(forum.text.substring(0, 100))}
            </div>
          </Title>
        ) : null}

        <div>
          Тип задания:{" "}
          <select name="task" onChange={(e) => setTask(e.target.value)}>
            <option value="---">---</option>
            {notes && <option value="Note">Лонгриды</option>}
            {shots && <option value="Shot">Алгоритмы</option>}
            {tests && <option value="NewTest">Тесты</option>}
            {quizes && <option value="Quiz">Вопросы</option>}
            {problems && <option value="Problem">Задачи</option>}
            {texteditors && <option value="TextEditor">Редакторы</option>}
            {constructions && <option value="Construction">Констукторы</option>}
            {exams && <option value="Exam">Экзамены</option>}
            {documents && <option value="Document">Документы</option>}
            {forum && <option value="Forum">Форум</option>}
          </select>
        </div>
        <Variants>
          {task === "NewTest" && (
            <Section>
              <h4>Тесты:</h4>
              {tests.map((t) => (
                <div className="option">
                  <div>{t.question}</div>
                  <button
                    name={t.__typename}
                    value={t.id}
                    onClick={(e) =>
                      props.set(e.target.name, e.target.value, props.i)
                    }
                  >
                    Выбрать
                  </button>
                </div>
              ))}
            </Section>
          )}
          {task === "Quiz" && (
            <Section>
              <h4>Вопросы:</h4>
              {quizes.map((q) => (
                <div className="option">
                  <div>{q.question}</div>
                  <button
                    name={q.__typename}
                    value={q.id}
                    onClick={(e) =>
                      props.set(e.target.name, e.target.value, props.i)
                    }
                  >
                    Выбрать
                  </button>
                </div>
              ))}
            </Section>
          )}
          {task === "Note" && (
            <Section>
              <h4>Лонгриды:</h4>
              {notes.map((n) => (
                <div className="option">
                  <div>{renderHTML(n.text.substring(0, 100))}</div>
                  <button
                    name={n.__typename}
                    value={n.id}
                    onClick={(e) =>
                      props.set(e.target.name, e.target.value, props.i)
                    }
                  >
                    Выбрать
                  </button>
                </div>
              ))}
            </Section>
          )}
          {task === "Shot" && (
            <Section>
              <h4>Алгоритмы:</h4>
              {shots.map((s) => (
                <div className="option">
                  <div>{renderHTML(s.title)}</div>
                  <button
                    name={s.__typename}
                    value={s.id}
                    onClick={(e) =>
                      props.set(e.target.name, e.target.value, props.i)
                    }
                  >
                    Выбрать
                  </button>
                </div>
              ))}{" "}
            </Section>
          )}
          {task === "TextEditor" && (
            <Section>
              <h4>Редакторы:</h4>
              {texteditors.map((s) => (
                <div className="option">
                  <div>{renderHTML(s.text.substring(0, 100))}</div>
                  <button
                    name={s.__typename}
                    value={s.id}
                    onClick={(e) =>
                      props.set(e.target.name, e.target.value, props.i)
                    }
                  >
                    Выбрать
                  </button>
                </div>
              ))}
            </Section>
          )}
          {task === "Construction" && (
            <Section>
              <h4>Конструкторы:</h4>
              {constructions.map((s) => (
                <div className="option">
                  <div>{renderHTML(s.name)}</div>
                  <button
                    name={s.__typename}
                    value={s.id}
                    onClick={(e) =>
                      props.set(e.target.name, e.target.value, props.i)
                    }
                  >
                    Выбрать
                  </button>
                </div>
              ))}
            </Section>
          )}
          {task === "Problem" && (
            <Section>
              <h4>Задачи:</h4>
              {problems.map((s) => (
                <div className="option">
                  <div>{renderHTML(s.text.substring(0, 300))}</div>
                  <button
                    name={s.__typename}
                    value={s.id}
                    onClick={(e) =>
                      props.set(e.target.name, e.target.value, props.i)
                    }
                  >
                    Выбрать
                  </button>
                </div>
              ))}
            </Section>
          )}
          {task === "Exam" && (
            <Section>
              <h4>Экзамены:</h4>
              {exams.map((s) => (
                <div className="option">
                  <div>ID первого вопроса: {s.id}</div>
                  <button
                    name={s.__typename}
                    value={s.id}
                    onClick={(e) =>
                      props.set(e.target.name, e.target.value, props.i)
                    }
                  >
                    Выбрать
                  </button>
                </div>
              ))}
            </Section>
          )}
          {task === "Document" && (
            <Section>
              <h4>Документы:</h4>
              {documents.map((s) => (
                <div className="option">
                  <div>{s.title}</div>
                  <button
                    name={s.__typename}
                    value={s.id}
                    onClick={(e) =>
                      props.set(e.target.name, e.target.value, props.i)
                    }
                  >
                    Выбрать
                  </button>
                </div>
              ))}
            </Section>
          )}
          {task === "Forum" && (
            <Section>
              <h4>Чат:</h4>

              <div>{renderHTML(forum.text.substring(0, 100))}</div>
              <button
                name={forum.__typename}
                value={forum.id}
                onClick={(e) =>
                  props.set(e.target.name, e.target.value, props.i)
                }
              >
                Выбрать
              </button>
            </Section>
          )}
        </Variants>
        <button onClick={(e) => props.plus(props.i)}>Добавить блок</button>
        <button onClick={(e) => props.minus(value.id ? value.id : "el")}>
          Убрать блок
        </button>
      </Styles>
    </>
  );
};

export default Block;
