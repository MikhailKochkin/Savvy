import { useState } from "react";
import styled from "styled-components";
import { useMutation, useLazyQuery, gql } from "@apollo/client";
import dynamic from "next/dynamic";
import moment from "moment";
import ExResults from "./ExResults";
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

const LessonResult = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const [show, setShow] = useState(false);

  const [message, setMessage] = useState("");

  const myCallback = (dataFromChild) => {
    setMessage(dataFromChild);
  };
  const [sendMessage, { data: data1, loading: loading1, error: error1 }] =
    useMutation(SEND_MESSAGE_MUTATION);

  const { r } = props;
  console.log("props", props.lessondId);
  return (
    <div>
      <li>
        {r.student.name} {r.student.surname} – visits: {r.visitsNumber} –{" "}
        {r.progress} / {props.structure.lessonItems.length} – Score:{" "}
        {props.lesson.forum &&
        props.lesson.forum.rating.filter((rat) => rat.user.id == r.student.id)
          .length > 0
          ? props.lesson.forum.rating.filter(
              (rat) => rat.user.id == r.student.id
            )[0].rating
          : "No"}{" "}
        -{moment(r.updatedAt).format("DD.MM.YY HH:mm:ss")} –
        {props.lessondId && (
          <button onClick={(e) => setShow(true)}>Show results</button>
        )}
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
      {show && (
        <ExResults
          userId={r.student.id}
          lessondId={props.lessondId}
          coursePageId={props.coursePageId}
        />
      )}
    </div>
  );
};

export default LessonResult;
