import { useState } from "react";
import styled from "styled-components";
import { useMutation, gql } from "@apollo/client";
import dynamic from "next/dynamic";

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

  const [message, setMessage] = useState("");
  const [sendMessage, { data: data1, loading: loading1, error: error1 }] =
    useMutation(SEND_MESSAGE_MUTATION);

  let maxes = props.res.filter((r) => r.progress !== 0);
  const myCallback = (dataFromChild) => {
    setMessage(dataFromChild);
  };
  let enrolled_maxes = [...maxes]
    .filter(
      (r) =>
        r.student.new_subjects.filter((subj) => subj.id == props.coursePageId)
          .length > 0
    )
    .sort((a, b) => (a.updatedAt > b.updatedAt ? -1 : 1));
  let not_enrolled_maxes = [...maxes]
    .filter(
      (r) =>
        r.student.new_subjects.filter((subj) => subj.id == props.coursePageId)
          .length == 0
    )
    .sort((a, b) => (a.updatedAt > b.updatedAt ? -1 : 1));

  console.log("enrolled_maxes 1", enrolled_maxes);

  // if (props.res.length > 0) {
  // maxes = props.res.reduce((prev, current) =>
  //   prev.progress > current.progress ? prev : current
  // );
  // }
  return (
    <Styles>
      <div>
        Всего визитов: {maxes.length} {maxes.length == 0 && ""}
        <button onClick={(e) => setIsOpen(!isOpen)}>
          {isOpen ? "Close" : "Open"}
        </button>
        {isOpen && (
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
    </Styles>
  );
};

export default LessonResult;
