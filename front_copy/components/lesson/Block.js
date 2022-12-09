import React, { useState } from "react";
import styled from "styled-components";
// import { arrowDown } from "react-icons-kit/fa/arrowDown";
import renderHTML from "react-render-html";
import { useTranslation } from "next-i18next";

const Styles = styled.div`
  margin: 3% 0;
  border: 1px solid #e4e4e4;
  padding: 2%;
  width: 100%;
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
  const { t } = useTranslation("lesson");

  const {
    value,
    tests,
    quizes,
    chats,
    notes,
    shots,
    problems,
    texteditors,
    constructions,
    documents,
    testPractices,
    forum,
  } = props;

  return (
    <>
      <Styles>
        {/* {value.type && value.type.toLowerCase() === "newtest" ? (
          <Title>
            <div className="type">
              Тест:{" "}
              {tests.filter((q) => q.id === value.id).length > 0
                ? tests.filter((q) => q.id === value.id)[0].question
                : " Тест был удален. Удалите этот блок из урока."}
            </div>
          </Title>
        ) : null}
        {value.type && value.type.toLowerCase() === "quiz" ? (
          <Title>
            <div className="type">
              Вопрос:{" "}
              {quizes.filter((q) => q.id === value.id).length > 0
                ? quizes.filter((q) => q.id === value.id)[0].question
                : " Вопрос был удален. Удалите этот блок из урока."}
            </div>
          </Title>
        ) : null}
        {value.type && value.type.toLowerCase() === "testpractice" ? (
          <Title>
            <div className="type">
              Подводка:{" "}
              {testPractices.filter((q) => q.id === value.id).length > 0
                ? testPractices.filter((q) => q.id === value.id)[0].id
                : " Вопрос был удален. Удалите этот блок из урока."}
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
                : " Лонгрид был удален. Удалите этот блок из урока."}
            </div>
          </Title>
        ) : null}
        {value.type && value.type.toLowerCase() === "shot" ? (
          <Title>
            <div className="type">
              Алгоритм:{" "}
              {shots.filter((q) => q.id === value.id).length > 0
                ? shots.filter((q) => q.id === value.id)[0].title
                : " Материал был удален. Удалите этот блок из урока."}
            </div>
          </Title>
        ) : null}
        {value.type && value.type.toLowerCase() === "chat" ? (
          <Title>
            <div className="type">
              Диалог:
              {chats.filter((q) => q.id === value.id).length > 0
                ? chats.filter((q) => q.id === value.id)[0].name
                : " Чат был удален. Удалите этот блок из урока."}
            </div>
          </Title>
        ) : null}
        {value.type && value.type.toLowerCase() === "texteditor" ? (
          <Title>
            <div className="type">
              Редактор:
              {renderHTML(
                texteditors
                  .filter((q) => q.id === value.id)[0]
                  .text.substring(0, 100)
              )}
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
              {problems.filter((q) => q.id === value.id).length > 0
                ? renderHTML(
                    problems
                      .filter((q) => q.id === value.id)[0]
                      .text.substring(0, 100)
                  )
                : " Материал был удален. Удалите этот блок из урока."}
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
        {/* {value.type && value.type.toLowerCase() === "exam" ? (
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
        ) : null} */}
        <div>
          <select name="task" onChange={(e) => setTask(e.target.value)}>
            <option value="---">---</option>
            {notes.length > 0 && <option value="note">{t("Note")}</option>}
            {chats.length > 0 && <option value="chat">{t("Chat")}</option>}
            {shots.length > 0 && <option value="shot">{t("Shot")}</option>}
            {tests.length > 0 && (
              <option value="newTest">{t("NewTest")}</option>
            )}
            {quizes.length > 0 && <option value="quiz">{t("Quiz")}</option>}
            {problems.length > 0 && (
              <option value="problem">{t("Problem")}</option>
            )}
            {testPractices.length > 0 && (
              <option value="testPractice">{t("TestPractice")}</option>
            )}
            {texteditors.length > 0 && (
              <option value="texteditor">{t("TextEditor")}</option>
            )}
            {constructions.length > 0 && (
              <option value="construction">{t("Construction")}</option>
            )}
            {/* {exams.length > 0 && <option value="exam">Экзамены</option>} */}
            {documents.length > 0 && <option value="document">Document</option>}
            {forum && <option value="forum"> {t("Forum")}</option>}
          </select>
        </div>
        <Variants>
          {task === "newTest" && (
            <Section>
              {/* <h4>Тесты:</h4> */}
              {[...tests]
                .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
                .map((t) => (
                  <div className="option">
                    <div>{t.question}</div>
                    <button
                      name={t.__typename}
                      value={t.id}
                      onClick={(e) =>
                        props.getOldResult(
                          e.target.name,
                          e.target.value,
                          props.i
                        )
                      }
                    >
                      Add
                    </button>
                  </div>
                ))}
            </Section>
          )}
          {task === "quiz" && (
            <Section>
              {/* <h4>Вопросы:</h4> */}
              {[...quizes]
                .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
                .map((q) => (
                  <div className="option">
                    <div>{q.question}</div>
                    <button
                      name={q.__typename}
                      value={q.id}
                      onClick={(e) =>
                        props.getOldResult(
                          e.target.name,
                          e.target.value,
                          props.i
                        )
                      }
                    >
                      {t("add")}
                    </button>
                  </div>
                ))}
            </Section>
          )}
          {task === "testPractice" && (
            <Section>
              {/* <h4>Тестовые блоки:</h4> */}
              {testPractices.map((q) => (
                <div className="option">
                  <div>
                    {q.text} {q.id}
                  </div>
                  <button
                    name={q.__typename}
                    value={q.id}
                    onClick={(e) =>
                      props.getOldResult(e.target.name, e.target.value, props.i)
                    }
                  >
                    {t("add")}
                  </button>
                </div>
              ))}
            </Section>
          )}
          {task === "note" && (
            <Section>
              {/* <h4>Лонгриды:</h4> */}
              {notes.map((n) => (
                <div className="option">
                  <div>{renderHTML(n.text.substring(0, 100))}</div>
                  <button
                    name={n.__typename}
                    value={n.id}
                    onClick={(e) =>
                      props.getOldResult(e.target.name, e.target.value, props.i)
                    }
                  >
                    {t("add")}
                  </button>
                </div>
              ))}
            </Section>
          )}
          {task === "chat" && (
            <Section>
              {/* <h4>Диалоги:</h4> */}
              {chats.map((n) => (
                <div className="option">
                  <div>{n.name}</div>
                  <button
                    name={n.__typename}
                    value={n.id}
                    onClick={(e) =>
                      props.getOldResult(e.target.name, e.target.value, props.i)
                    }
                  >
                    {t("add")}
                  </button>
                </div>
              ))}
            </Section>
          )}
          {task === "shot" && (
            <Section>
              {/* <h4>Алгоритмы:</h4> */}
              {shots.map((s) => (
                <div className="option">
                  <div>{renderHTML(s.title)}</div>
                  <button
                    name={s.__typename}
                    value={s.id}
                    onClick={(e) =>
                      props.getOldResult(e.target.name, e.target.value, props.i)
                    }
                  >
                    {t("add")}
                  </button>
                </div>
              ))}{" "}
            </Section>
          )}
          {task === "texteditor" && (
            <Section>
              {/* <h4>Редакторы:</h4> */}
              {texteditors.map((s) => (
                <div className="option">
                  <div>{renderHTML(s.text.substring(0, 100))}</div>
                  <button
                    name={s.__typename}
                    value={s.id}
                    onClick={(e) =>
                      props.getOldResult(e.target.name, e.target.value, props.i)
                    }
                  >
                    {t("add")}
                  </button>
                </div>
              ))}
            </Section>
          )}
          {task === "construction" && (
            <Section>
              {/* <h4>Конструкторы:</h4> */}
              {constructions.map((s) => (
                <div className="option">
                  <div>{renderHTML(s.name)}</div>
                  <button
                    name={s.__typename}
                    value={s.id}
                    onClick={(e) =>
                      props.getOldResult(e.target.name, e.target.value, props.i)
                    }
                  >
                    {t("add")}
                  </button>
                </div>
              ))}
            </Section>
          )}
          {task === "problem" && (
            <Section>
              {/* <h4>Задачи:</h4> */}
              {problems.map((s) => (
                <div className="option">
                  <div>{renderHTML(s.text.substring(0, 300))}</div>
                  <button
                    name={s.__typename}
                    value={s.id}
                    onClick={(e) =>
                      props.getOldResult(e.target.name, e.target.value, props.i)
                    }
                  >
                    {t("add")}
                  </button>
                </div>
              ))}
            </Section>
          )}
          {/* {task === "exam" && (
            <Section>
              <h4>Экзамены:</h4>
              {exams.map((s) => (
                <div className="option">
                  <div>ID первого вопроса: {s.id}</div>
                  <button
                    name={s.__typename}
                    value={s.id}
                    onClick={(e) =>
                      props.getOldResult(e.target.name, e.target.value, props.i)
                    }
                  >
                    {t("add")}
                  </button>
                </div>
              ))}
            </Section>
          )} */}
          {task === "document" && (
            <Section>
              {/* <h4>Документы:</h4> */}
              {documents.map((s) => (
                <div className="option">
                  <div>{s.title}</div>
                  <button
                    name={s.__typename}
                    value={s.id}
                    onClick={(e) =>
                      props.getOldResult(e.target.name, e.target.value, props.i)
                    }
                  >
                    {t("add")}
                  </button>
                </div>
              ))}
            </Section>
          )}
          {task === "forum" && (
            <Section>
              {/* <h4>Чат:</h4> */}

              <div>{renderHTML(forum.text.substring(0, 100))}</div>
              <button
                name={forum.__typename}
                value={forum.id}
                onClick={(e) =>
                  props.getOldResult(e.target.name, e.target.value, props.i)
                }
              >
                {t("add")}
              </button>
            </Section>
          )}
        </Variants>
        {/* <button onClick={(e) => props.plus(props.i)}>Добавить блок</button>
        <button onClick={(e) => props.minus(value.id ? value.id : "el")}>
          Убрать блок
        </button> */}
      </Styles>
    </>
  );
};

export default Block;