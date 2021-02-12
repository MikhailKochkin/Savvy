import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import CreateMessage from "./CreateMessage";

const CREATE_CHAT_MUTATION = gql`
  mutation CREATE_CHAT_MUTATION(
    $name: String!
    $messages: Messages!
    $lessonId: String!
  ) {
    createChat(name: $name, messages: $messages, lessonId: $lessonId) {
      id
    }
  }
`;

const Styles = styled.div`
  margin: 20px 0;
  button.but {
    padding: 1%;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 2%;
  }
`;

const Input = styled.input`
  width: 50%;
  background: none;
  font-size: 1.6rem;
  border: none;
  font-family: Montserrat;
  outline: 0;
  margin-bottom: 2%;
  border-bottom: 1px solid #edefed;
  padding-bottom: 0.5%;
  &:focus {
    border-bottom: 1px solid #1a2a81;
  }
`;

const CreateChat = (props) => {
  const [name, setName] = useState("");
  const [messages, setMessages] = useState([]);
  const [num, setNum] = useState(0);

  const [createChat, { data, loading, error }] = useMutation(
    CREATE_CHAT_MUTATION
  );

  const getMessage = (data) => {
    setMessages([...messages, data]);
  };

  return (
    <Styles>
      <Input
        type="text"
        placeholder="Название диалога"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <button className="but" onClick={(e) => setNum(num - 1)}>
        -1
      </button>
      <button className="but" onClick={(e) => setNum(num + 1)}>
        +1
      </button>
      {_.times(num, (i) => (
        <>
          <CreateMessage
            index={i + 1}
            document={props.document}
            getMessage={getMessage}
          />
        </>
      ))}
    </Styles>
  );
};

export default CreateChat;
