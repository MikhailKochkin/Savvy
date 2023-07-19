import { useState, useEffect } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import moment from "moment";
import dynamic from "next/dynamic";
import parse from "html-react-parser";

const SEND_MESSAGE_MUTATION = gql`
  mutation SEND_MESSAGE_MUTATION(
    $id: String!
    $email: String!
    $message: String
    $comment: String
  ) {
    sendMessage(id: $id, email: $email, message: $message, comment: $comment) {
      id
    }
  }
`;

const DynamicLoadedEditor = dynamic(import("../editor/HoverEditor"), {
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
  @media (max-width: 800px) {
    width: 350px;
  }
`;

const Row = styled.div`
  display: flex;
  width: 90%;
  flex-direction: row;
  justify-content: left;
  padding: 5px 0;
  margin-top: 30px;
  background: #fff;
  border: 1px solid #eff0f1;
  border-top: 1px solid #fff;
  .index {
    width: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .courses {
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .name {
    width: 300px;
  }
  .email {
    width: 20%;
  }
  .number {
    width: 10%;
  }
  .comment {
    width: 45%;
    padding: 0 2%;
    .editor {
      font-size: 1.6rem;
      width: 95%;
      border: 1px solid #c4c4c4;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      outline: 0;
      padding: 0.5%;
      font-size: 1.6rem;
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

const UserRow = (props) => {
  const [message, setMessage] = useState("");
  const [comment, setComment] = useState(props.author.comment);

  const { author } = props;

  const [sendMessage, { data, loading, error }] = useMutation(
    SEND_MESSAGE_MUTATION
  );

  const myCallback = (dataFromChild) => {
    setMessage(dataFromChild);
  };

  const myCallback2 = (dataFromChild) => {
    setComment(dataFromChild);
  };

  let number;
  if (author.number && author.number.startsWith("8")) {
    number = author.number.replace("8", "+7");
  } else {
    number = author.number;
  }

  return (
    <>
      <Row>
        <div className="index">{props.index + 1}.</div>
        <div className="name">
          <div>{author.name}</div>
          <div>{author.surname}</div>
          <div>{author.email}</div>
          <div>{author.number}</div>
          <div>{author.createdAt}</div>
          {number && (
            <button>
              <a
                target="_blank"
                // href={`https://api.whatsapp.com/send?phone=${number}?text=Hello!`}
                href={`https://wa.me/${number}?text=Привет!`}
              >
                Написать в whatsApp
              </a>
            </button>
          )}
        </div>
        <div className="courses">
          <ul>
            {author.coursePages.map((c) => (
              <li>{c.title}</li>
            ))}
            {author.co_coursePages.map((c) => (
              <li>{c.title}</li>
            ))}
          </ul>
        </div>
      </Row>
      <div>Комментарии к пользователю</div>
      <Editor className="editor">
        <DynamicLoadedEditor
          getEditorText={myCallback2}
          value={comment}
          name="text"
        />
      </Editor>
      <div>Текст письма</div>
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
              id: author.id,
              message: message,
              email: author.email,
              comment: comment,
            },
          });
        }}
      >
        {loading ? "Sending..." : "Send"}
      </button>
    </>
  );
};

export default UserRow;
