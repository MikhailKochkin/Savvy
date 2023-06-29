import React from "react";

import { useState, useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import moment from "moment";
import dynamic from "next/dynamic";
import renderHTML from "react-render-html";

const SEND_MESSAGE_MUTATION = gql`
  mutation SEND_MESSAGE_MUTATION($userId: String!, $text: String!) {
    sendMessage(userId: $userId, text: $text) {
      id
    }
  }
`;

const Styles = styled.div`
  .row {
    width: 100%;
    display: flex;
    flex-direction: row;
    .row_name {
      width: 300px;
    }
    .row_time {
      width: 200px;
    }
    .row_contact {
      width: 400px;
    }
    .row_status {
      width: 50px;
    }
  }
`;

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

const Messages = styled.div`
  .message {
    margin: 10px 0;
    padding: 10px;
    border: 1px solid lightgrey;
  }
`;

const DynamicLoadedEditor = dynamic(import("../editor/HoverEditor"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const StudentInfo = (props) => {
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  const [sendMessage, { data: data1, loading: loading1, error: error1 }] =
    useMutation(SEND_MESSAGE_MUTATION);

  const myCallback = (dataFromChild) => {
    setMessage(dataFromChild);
  };

  const { lr, i, c } = props;
  return (
    <Styles>
      <div className="row">
        <div className="row_name">
          {i + 1}. {lr.student.name} {lr.student.surname}{" "}
        </div>
        <div className="row_time">
          {moment(lr.updatedAt).format("DD.MM.YY")}{" "}
        </div>
        <div className="row_contact">
          {lr.student.email} / {lr.student.number}
          <button onClick={(e) => setShow(!show)}>
            {show ? "Close an email" : "Write an email"}
          </button>
          {lr.student.number && (
            <button>
              <a
                target="_blank"
                // href={`https://api.whatsapp.com/send?phone=${number}?text=Hello!`}
                href={`https://wa.me/${lr.student.number}?text=Привет!`}
              >
                Write on whatsApp
              </a>
            </button>
          )}
        </div>
        <div className="row_status">
          {c &&
          lr.student &&
          lr.student.new_subjects.filter((s) => s.id == c.id).length > 0
            ? "🟢"
            : "🛑"}
        </div>
      </div>
      {show && (
        <>
          <Messages>
            {lr.student.messages.map((m) => {
              return (
                <div className="message">
                  <div>{renderHTML(m.text)}</div>
                  <div>{m.createdAt}</div>
                </div>
              );
            })}
          </Messages>
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
                  userId: lr.student.id,
                  text: message,
                },
              });
            }}
          >
            {loading1 ? "Sending..." : "Send"}
          </button>
        </>
      )}
    </Styles>
  );
};

export default StudentInfo;
