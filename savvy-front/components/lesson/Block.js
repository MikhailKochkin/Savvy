import React, { useState } from "react";
import styled from "styled-components";
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
    offers,
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
            {offers.length > 0 && <option value="offer">Offer</option>}
            {texteditors.length > 0 && (
              <option value="texteditor">{t("TextEditor")}</option>
            )}
            {constructions.length > 0 && (
              <option value="construction">{t("Construction")}</option>
            )}
            {documents.length > 0 && <option value="document">Document</option>}
            {forum && <option value="forum"> {t("Forum")}</option>}
          </select>
        </div>
        <Variants>
          {task === "newTest" && (
            <Section>
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
          {task === "offer" && (
            <Section>
              {offers.map((q) => (
                <div className="option">
                  <div>{q.header}</div>
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
