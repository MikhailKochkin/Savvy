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
        {value.type && value.type.toLowerCase() === "newtest" ? (
          <Title>
            <div className="type">
              Тест:{" "}
              {tests.filter((q) => q.id === value.id).length > 0
                ? tests.filter((q) => q.id === value.id)[0].question
                : "Тест был удален. Удалите этот блок из урока."}
            </div>
          </Title>
        ) : null}
        {value.type && value.type.toLowerCase() === "quiz" ? (
          <Title>
            <div className="type">
              Вопрос:{" "}
              {quizes.filter((q) => q.id === value.id).length > 0
                ? quizes.filter((q) => q.id === value.id)[0].question
                : "Вопрос был удален. Удалите этот блок из урока."}
            </div>
          </Title>
        ) : null}
        {value.type && value.type.toLowerCase() === "note" ? (
          <Title>
            <div className="type">
              Лонгрид:{" "}
              {notes.filter((q) => q.id === value.id).length > 0
                ? renderHTML(
                    notes
                      .filter((q) => q.id === value.id)[0]
                      .text.substring(0, 100)
                  )
                : "Лонгрид был удален. Удалите этот блок из урока."}
            </div>
          </Title>
        ) : null}
        {value.type && value.type.toLowerCase() === "shot" ? (
          <Title>
            <div className="type">
              Алгоритм: {shots.filter((q) => q.id === value.id)[0].title}
            </div>
          </Title>
        ) : null}
        {value.type && value.type.toLowerCase() === "texteditor" ? (
          <Title>
            <div className="type">
              Редактор: {console.log(texteditors[0].id, value.id)}
              {/* {renderHTML(
                texteditors
                  .filter((q) => q.id === value.id)[0]
                  .text.substring(0, 100)
              )} */}
            </div>
          </Title>
        ) : null}
        {value.type && value.type.toLowerCase() === "construction" ? (
          <Title>
            <div className="type">
              Конструктор:{" "}
              {constructions.filter((q) => q.id === value.id)[0].name}
            </div>
          </Title>
        ) : null}
        {value.type && value.type.toLowerCase() === "problem" ? (
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
        {value.type && value.type.toLowerCase() === "document" ? (
          <Title>
            <div className="type">
              Документ: {documents.filter((q) => q.id === value.id)[0].title}
            </div>
          </Title>
        ) : null}
        {value.type && value.type.toLowerCase() === "exam" ? (
          <Title>
            <div className="type">
              Экзамен: {exams.filter((q) => q.id === value.id)[0].name}
            </div>
          </Title>
        ) : null}
        {value.type && value.type.toLowerCase() === "forum" ? (
          <Title>
            <div className="type">
              Чат: {renderHTML(forum.text.substring(0, 100))}
            </div>
          </Title>
        ) : null}
        <div>
          <select name="task" onChange={(e) => setTask(e.target.value)}>
            <option value="---">---</option>
            {notes.length > 0 && <option value="note">Лонгриды</option>}
            {shots.length > 0 && <option value="shot">Алгоритмы</option>}
            {tests.length > 0 && <option value="newTest">Тесты</option>}
            {quizes.length > 0 && <option value="quiz">Вопросы</option>}
            {problems.length > 0 && <option value="problem">Задачи</option>}
            {texteditors.length > 0 && (
              <option value="texteditor">Редакторы</option>
            )}
            {constructions.length > 0 && (
              <option value="construction">Констукторы</option>
            )}
            {exams.length > 0 && <option value="exam">Экзамены</option>}
            {documents.length > 0 && (
              <option value="document">Документы</option>
            )}
            {forum && <option value="forum">Форум</option>}
          </select>
        </div>
        <Variants>
          {task === "newTest" && (
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
          {task === "quiz" && (
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
          {task === "note" && (
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
          {task === "shot" && (
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
          {task === "texteditor" && (
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
          {task === "construction" && (
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
          {task === "problem" && (
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
          {task === "exam" && (
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
          {task === "document" && (
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
          {task === "forum" && (
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
