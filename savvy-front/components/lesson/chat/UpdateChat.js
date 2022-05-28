import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import UpdateMessage from "./UpdateMessage";

const UPDATE_CHAT_MUTATION = gql`
  mutation UPDATE_CHAT_MUTATION(
    $id: String!
    $name: String!
    $messages: Messages!
    $isSecret: Boolean
  ) {
    updateChat(id: $id, name: $name, messages: $messages, isSecret: $isSecret) {
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

const UpdateChat = (props) => {
  const [name, setName] = useState(props.name);
  const [messages, setMessages] = useState(props.messages.messagesList);
  const [num, setNum] = useState(props.messages.messagesList.length);
  const [isSecret, setIsSecret] = useState(props.isSecret);

  const [updateChat, { data, loading, error }] =
    useMutation(UPDATE_CHAT_MUTATION);
  const getMessage = (data) => {
    let old_messages = [...messages];
    old_messages.splice(data.number - 1, 1, data);
    setMessages([...old_messages]);
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
      <select
        defaultValue={isSecret}
        onChange={(e) => setIsSecret(e.target.value == "true")}
      >
        <option value={"true"}>Секретный</option>
        <option value={"false"}>Открытый</option>
      </select>
      {props.messages.messagesList.map((m, i) => (
        <UpdateMessage
          index={i + 1}
          author={props.messages.messagesList[i].author}
          text={m.text}
          getMessage={getMessage}
        />
      ))}
      {/* <button className="but" onClick={(e) => setNum(num - 1)}>
        -1
      </button>
      <button className="but" onClick={(e) => setNum(num + 1)}>
        +1
      </button> */}
      <button
        onClick={async (e) => {
          e.preventDefault();
          const res = await updateChat({
            variables: {
              id: props.id,
              messages: { messagesList: messages },
              name,
              isSecret,
            },
          });
          alert("Готово!");
        }}
      >
        Сохранить
      </button>
    </Styles>
  );
};

export default UpdateChat;
