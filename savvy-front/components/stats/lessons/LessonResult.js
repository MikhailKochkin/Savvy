import { useState } from "react";
import styled from "styled-components";
import { useMutation, useLazyQuery, gql } from "@apollo/client";
import dynamic from "next/dynamic";

const GET_RESULTS = gql`
  query GET_RESULTS($id: String!) {
    lesson(where: { id: $id }) {
      id
      text
      name
      open
      number
      structure
      lessonResults {
        id
        progress
        createdAt
        updatedAt
        student {
          id
          name
          surname
          number
          email
          new_subjects {
            id
          }
        }
      }
    }
  }
`;

const SEND_MESSAGE_MUTATION = gql`
  mutation SEND_MESSAGE_MUTATION($userId: String!, $text: String!) {
    sendMessage(userId: $userId, text: $text) {
      id
    }
  }
`;

const DynamicLoadedEditor = dynamic(import("../../editor/HoverEditor"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const Editor = styled.div`
  font-size: 1.6rem;
  width: 75%;
  border: 1px solid #c4c4c4;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  outline: 0;
  padding: 0.5%;
  font-size: 1.6rem;
  margin: 15px 0;
  @media (max-width: 800px) {
    width: 350px;
  }
`;

const Styles = styled.div`
  button {
    margin-left: 10px;
  }
`;

const LessonResult = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const [show, setShow] = useState(false);

  const [message, setMessage] = useState("");
  const [sendMessage, { data: data1, loading: loading1, error: error1 }] =
    useMutation(SEND_MESSAGE_MUTATION);
  const [getData, { loading, error, data }] = useLazyQuery(GET_RESULTS, {
    variables: { id: props.id },
  });
  const myCallback = (dataFromChild) => {
    setMessage(dataFromChild);
  };
  let maxes;
  let enrolled_maxes;
  let not_enrolled_maxes;
  console.log("data", data);

  if (data) {
    maxes = data.lesson.lessonResults.filter((r) => r.progress !== 0);

    enrolled_maxes = [...maxes]
      .filter(
        (r) =>
          r.student.new_subjects.filter((subj) => subj.id == props.coursePageId)
            .length > 0
      )
      .sort((a, b) => (a.updatedAt > b.updatedAt ? -1 : 1));

    not_enrolled_maxes = [...data.lesson.lessonResults]
      .filter(
        (r) =>
          r.student.new_subjects.filter((subj) => subj.id == props.coursePageId)
            .length == 0
      )
      .sort((a, b) => (a.updatedAt > b.updatedAt ? -1 : 1));
  }

  if (loading) return <p>Загружаем информацию об уроке...</p>;
  return (
    <Styles>
      <button
        onClick={(e) => {
          getData({
            variables: { id: props.id },
          }),
            setShow(!show);
        }}
      >
        Get data
      </button>
      {show && data !== undefined && (
        <div>
          Всего визитов: {maxes.length} {maxes.length == 0 && ""}
          <button onClick={(e) => setIsOpen(!isOpen)}>
            {isOpen ? "Close" : "Open"}
          </button>
          {isOpen && !props.structure && <p>Урок-испытание</p>}
          {isOpen && props.structure && (
            <>
              <h4>Заинтересованные пользователи:</h4>
              <ol>
                {not_enrolled_maxes.length == 0 && <div>Пусто</div>}
                {[...not_enrolled_maxes].map((r) => (
                  <li>
                    {r.student.name} {r.student.surname} – {r.progress} /{" "}
                    {props.structure.lessonItems.length} – {r.updatedAt} –
                    {r.student.number && (
                      <button>
                        <a
                          target="_blank"
                          href={`https://wa.me/${r.student.number}?text=Добрый!`}
                        >
                          Написать в whatsApp
                        </a>
                      </button>
                    )}
                    <button onClick={(e) => setIsEmailOpen(!isEmailOpen)}>
                      Написать по почте
                    </button>
                    {isEmailOpen && (
                      <>
                        <Editor className="editor">
                          <DynamicLoadedEditor
                            getEditorText={myCallback}
                            value={""}
                            name="text"
                          />
                        </Editor>
                        <button
                          onClick={async (e) => {
                            const res = await sendMessage({
                              variables: {
                                userId: r.student.id,
                                text: message,
                              },
                            });
                          }}
                        >
                          {loading1 ? "Sending..." : "Send"}
                        </button>
                      </>
                    )}
                  </li>
                ))}
              </ol>
              <h4>Участники курса:</h4>
              <ol>
                {[...enrolled_maxes].map((r) => (
                  <li>
                    {r.student.name} {r.student.surname} – {r.progress} /{" "}
                    {props.structure.lessonItems.length} – {r.updatedAt} –
                    {r.student.number && (
                      <button>
                        <a
                          target="_blank"
                          href={`https://wa.me/${r.student.number}?text=Добрый!`}
                        >
                          Написать в whatsApp
                        </a>
                      </button>
                    )}
                    <button onClick={(e) => setIsEmailOpen(!isEmailOpen)}>
                      Написать по почте
                    </button>
                    {isEmailOpen && (
                      <>
                        <Editor className="editor">
                          <DynamicLoadedEditor
                            getEditorText={myCallback}
                            value={""}
                            name="text"
                          />
                        </Editor>
                        <button
                          onClick={async (e) => {
                            const res = await sendMessage({
                              variables: {
                                userId: r.student.id,
                                text: message,
                              },
                            });
                          }}
                        >
                          {loading1 ? "Sending..." : "Send"}
                        </button>
                      </>
                    )}
                  </li>
                ))}
              </ol>
            </>
          )}
        </div>
      )}
    </Styles>
  );
};

export default LessonResult;
