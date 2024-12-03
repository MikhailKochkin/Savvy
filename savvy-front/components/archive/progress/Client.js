import { useState, useEffect } from "react";
import moment from "moment";
import styled from "styled-components";
import { useQuery, useMutation, gql } from "@apollo/client";
import dynamic from "next/dynamic";
import parse from 'html-react-parser';

const SEND_MESSAGE_MUTATION = gql`
  mutation SEND_MESSAGE_MUTATION(
    $userId: String!
    $text: String!
    $subject: String
  ) {
    sendMessage(userId: $userId, text: $text, subject: $subject) {
      id
    }
  }
`;

const DynamicLoadedEditor = dynamic(import("../editor/HoverEditor"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const Row = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: left;
  padding: 5px 0;
  background: #fff;
  border: 1px solid #eff0f1;
  border-top: 1px solid #fff;

  form {
    input {
      width: 50px;
      background: none;
      border: none;
      outline: 0;
      font-family: Montserrat;
      font-size: 1rem;
    }
  }
  .index {
    width: 2%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .time {
    width: 15%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .name {
    width: 25%;
  }
  .email {
    width: 25%;
  }
  .number {
    width: 10%;
  }
  .comment {
    width: 55%;
    padding: 0 2%;
    h4 {
      margin: 0;
      margin-bottom: 10px;
    }
    .editor {
      font-size: 1.6rem;
      width: 95%;
      border: 1px solid #c4c4c4;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      outline: 0;
      padding: 0.5%;
      font-size: 1.6rem;
      margin-bottom: 20px;
      @media (max-width: 800px) {
        width: 350px;
      }
    }
    button {
      margin-bottom: 5%;
    }
    textarea {
      font-family: Montserrat;
      padding: 0 5%;
      margin: 0 5%;
      border: none;
      width: 90%;
      height: 100px;
      white-space: pre-line;
    }
    .editor {
    }
  }
  .tags {
    padding-left: 20px;
    li {
      width: 100%;
    }
  }
  @media (max-width: 800px) {
    flex-direction: column;
    width: 100%;
    padding: 3%;
  }
`;

const ReminderClient = (props) => {
  const { reminder } = props;
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");

  const [sendMessage, { data: data1, loading: loading1, error: error1 }] =
    useMutation(SEND_MESSAGE_MUTATION);

  const myCallback2 = (dataFromChild) => {
    setMessage(dataFromChild);
  };

  return (
    <Row id={reminder.id}>
      <div className="index">{props.index + 1}.</div>
      <div className="time">
        {moment(reminder.createdAt).format("DD-MM-YYYY HH:mm")}
      </div>
      <div className="name">
        <div>{props.reminder.user.name}</div>
        <div>{props.reminder.user.surname}</div>
        <div>{props.reminder.user.number}</div>
        <div>{props.reminder.user.email}</div>
        {/* {tags &&
          tags.map((t, i) => (
            <>
              <Tag
                onClick={(e) => {
                  e.preventDefault();
                  props.sort(t);
                }}
                key={i}
              >
                {t}
              </Tag>
            </>
          ))} */}
        {/* <form
          method="POST"
          onSubmit={async (e) => {
            e.preventDefault();
            let new_arr = [...tags, newTag];
            setTags(new_arr);
            setNewTag("");

            let updated_client = updateBusinessClient({
              variables: {
                id: props.id,
                tags: [...new_arr],
                comment: comment,
              },
            });
            return updated_client;
          }}
        >
          <input
            type="text"
            name=""
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="..."
          />
        </form> */}
        {props.reminder.user.number && (
          <>
            <button>
              <a
                target="_blank"
                href={`https://t.me/${props.reminder.user.number}`}
              >
                Написать в Telegram
              </a>
            </button>
            <button>
              <a
                target="_blank"
                // href={`https://api.whatsapp.com/send?phone=${number}?text=Hello!`}
                href={`https://wa.me/${props.reminder.user.number}`}
              >
                Написать в whatsApp
              </a>
            </button>
          </>
        )}
      </div>
      <div className="comment">
        <h4>Имейл</h4>
        {/* {props.communication_history &&
          props.communication_history.messages &&
          props.communication_history.messages.map((m) => (
            <Message>
              <div>{parse(m.message)}</div>
              <div> {moment(m.date).format("DD-MM-YYYY HH:mm")}</div>
            </Message>
          ))} */}
        <div>Subject</div>
        <input onChange={(e) => setSubject(e.target.value)} />
        <div className="editor">
          <DynamicLoadedEditor
            getEditorText={myCallback2}
            value={message}
            name="text"
          />
        </div>
        <button
          onClick={async (e) => {
            e.preventDefault();
            // let mess = props.communication_history
            //   ? [
            //       ...props.communication_history.messages,
            //       {
            //         message: message,
            //         date: new Date().toISOString(),
            //       },
            //     ]
            //   : [
            //       {
            //         message: message,
            //         date: new Date().toISOString(),
            //       },
            //     ];

            const res = await sendMessage({
              variables: {
                userId: props.reminder.user.id,
                text: message,
                subject: subject,
              },
            });
            alert("Sent!");
          }}
        >
          Отправить имейл
        </button>
        <br />
        {/* <button
          onClick={(e) => {
            updateBusinessClient({
              variables: {
                id: props.id,
                comment: comment,
                tags: tags,
              },
            });
            alert("Изменили");
          }}
        >
          Изменить
        </button> */}
      </div>
    </Row>
  );
};

export default ReminderClient;
