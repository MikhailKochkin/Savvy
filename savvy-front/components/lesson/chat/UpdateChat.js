import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import UpdateMessage from "./UpdateMessage";

const UPDATE_CHAT_MUTATION = gql`
  mutation UPDATE_CHAT_MUTATION(
    $id: String!
    $name: String!
    $messages: Messages!
  ) {
    updateChat(id: $id, name: $name, messages: $messages) {
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
  const [updateChat, { data, loading, error }] = useMutation(
    UPDATE_CHAT_MUTATION
  );

  const getMessage = (data) => {
    console.log(data);
    let old_messages = [...messages];
    old_messages.splice(data.number - 1, 1, data);
    setMessages([...old_messages]);
  };
  console.log(num);
  return (
    <Styles>
      <Input
        type="text"
        placeholder="Название диалога"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
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
            },
          });
          console.log(res);
          alert("Готово!");
        }}
      >
        Сохранить
      </button>
    </Styles>
  );
};

export default UpdateChat;