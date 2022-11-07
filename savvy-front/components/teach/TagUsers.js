import { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import UserRow from "./UserRow";
import renderHTML from "react-render-html";
import dynamic from "next/dynamic";

const SEND_MESSAGE_MUTATION = gql`
  mutation SEND_MESSAGE_MUTATION($userId: String!, $text: String!) {
    sendMessage(userId: $userId, text: $text) {
      id
    }
  }
`;

const USERS_QUERY = gql`
  query USERS_QUERY {
    users {
      id
      name
      surname
      tags
      createdAt
      status
      number
      messages {
        id
        text
        createdAt
      }
      coursePages {
        id
        title
        lessons {
          id
        }
      }
      lessonResults {
        id
        updatedAt
      }
    }
  }
`;

const Styles = styled.div`
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  width: 90%;
  flex-direction: column;
  justify-content: left;
  padding: 4%;
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

const Messages = styled.div``;

const DynamicLoadedEditor = dynamic(import("../editor/HoverEditor"), {
  loading: () => <p>...</p>,
  ssr: false,
});

const TagUsers = () => {
  const [tag, setTag] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const { loading, error, data } = useQuery(USERS_QUERY);
  if (loading) return <p>Loading...</p>;
  let users = data.users;
  const [sendMessage, { data: data1, loading: loading1, error: error1 }] =
    useMutation(SEND_MESSAGE_MUTATION);

  const onFilter = () => {
    setFiltered(users.filter((u) => u.tags.includes(tag)));
  };

  const myCallback = (dataFromChild) => {
    setMessage(dataFromChild);
  };

  return (
    <Styles>
      <input onChange={(e) => setTag(e.target.value)} />
      <button onClick={(e) => onFilter()}>Filter</button>
      {filtered.map((f) => (
        <>
          <Row>
            <li>
              {f.name} {f.surname}
            </li>
            {f.coursePages.length == 0 && "Нет купленных курсов"}
            {f.coursePages.length > 0 && (
              <>
                <div>Курсы:</div>
                {f.coursePages.map((c) => (
                  <li>{c.title}</li>
                ))}
              </>
            )}{" "}
          </Row>
          {f.number && (
            <button>
              <a
                target="_blank"
                // href={`https://api.whatsapp.com/send?phone=${number}?text=Hello!`}
                href={`https://wa.me/${f.number}?text=Привет!`}
              >
                Написать в whatsApp
              </a>
            </button>
          )}
          {console.log("f.messages", f.messages)}
          <Messages>
            {f.messages.map((m) => {
              return (
                <>
                  <div>{renderHTML(m.text)}</div>
                  <div>{m.createdAt}</div>
                </>
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
                  userId: f.id,
                  text: message,
                },
              });
            }}
          >
            {loading1 ? "Sending..." : "Send"}
          </button>
        </>
      ))}
    </Styles>
  );
};

export default TagUsers;
