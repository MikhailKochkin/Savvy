import React from "react";

import { useState, useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import moment from "moment";
import dynamic from "next/dynamic";
import renderHTML from "react-render-html";

const SEND_MESSAGE_MUTATION = gql`
  mutation SEND_MESSAGE_MUTATION($id: String!, $comment: String!) {
    sendBusinessClientEmail(id: $id, comment: $comment) {
      id
    }
  }
`;

const Styles = styled.div`
  margin: 10px 0;
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

const StudentInfo2 = (props) => {
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  const [sendMessage, { data: data1, loading: loading1, error: error1 }] =
    useMutation(SEND_MESSAGE_MUTATION);

  const myCallback = (dataFromChild) => {
    setMessage(dataFromChild);
  };

  const { client, i, c } = props;
  return (
    <Styles>
      <div className="row">
        <div className="row_name">
          {i + 1}. {client.name} {client.surname}{" "}
        </div>
        <div className="row_time">
          {moment(client.createdAt).format("DD.MM.YY")}{" "}
        </div>
        <div className="row_contact">
          {client.email} / {client.number}
          <br />
          <button onClick={(e) => setShow(!show)}>
            {show ? "Закрыть имейл" : "Написать email"}
          </button>
          <br />
          {client.number && (
            <button>
              <a
                target="_blank"
                // href={`https://api.whatsapp.com/send?phone=${number}?text=Hello!`}
                href={`https://wa.me/${client.number}?text=Привет!`}
              >
                Написать в whatsApp
              </a>
            </button>
          )}
        </div>
        <div className="row_status">
          {/* {c &&
          client.student &&
          client.student.new_subjects.filter((s) => s.id == c.id).length > 0
            ? "🟢"
            : "🛑"} */}
        </div>
      </div>
      {show && (
        <>
          {/* <Messages>
            {client.messages.map((m) => {
              return (
                <div className="message">
                  <div>{renderHTML(m.text)}</div>
                  <div>{m.createdAt}</div>
                </div>
              );
            })}
          </Messages> */}
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
                  id: client.id,
                  comment: message,
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

export default StudentInfo2;
