import { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import StudentInfo2 from "./StudentInfo2";
import renderHTML from "react-render-html";
import dynamic from "next/dynamic";

const SEND_MESSAGE_MUTATION = gql`
  mutation SEND_MESSAGE_MUTATION($userId: String!, $text: String!) {
    sendMessage(userId: $userId, text: $text) {
      id
    }
  }
`;

const CLIENTS_QUERY = gql`
  query CLIENTS_QUERY {
    businessClients(orderBy: { createdAt: desc }) {
      id
      name
      email
      number
      tags
      createdAt
      type
      comment
      communication_medium
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

const Requests = () => {
  const [tag, setTag] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const { loading, error, data } = useQuery(CLIENTS_QUERY);

  const [sendMessage, { data: data1, loading: loading1, error: error1 }] =
    useMutation(SEND_MESSAGE_MUTATION);

  if (loading) return <p>Loading...</p>;
  let users = data.businessClients;

  const onFilter = () => {
    setFiltered(
      users.filter(
        (u) => u.comment && u.comment.toLowerCase() == tag.toLowerCase()
      )
    );
  };

  const myCallback = (dataFromChild) => {
    setMessage(dataFromChild);
  };

  console.log("users", users);
  console.log("filtered", filtered);

  return (
    <Styles>
      <input onChange={(e) => setTag(e.target.value)} />
      <button onClick={(e) => onFilter()}>Filter</button>
      {filtered.map((f, i) => (
        <>
          <StudentInfo2 client={f} i={i} />
        </>
      ))}
    </Styles>
  );
};

export default Requests;
