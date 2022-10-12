import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import { useTranslation } from "next-i18next";

import UpdateMessage from "./UpdateMessage";
import { SINGLE_LESSON_QUERY } from "../SingleLesson";

const UPDATE_CHAT_MUTATION = gql`
  mutation UPDATE_CHAT_MUTATION(
    $id: String!
    $name: String!
    $messages: Messages!
    $isSecret: Boolean
  ) {
    updateChat(id: $id, name: $name, messages: $messages, isSecret: $isSecret) {
      id
      name
      isSecret
      link_clicks
      complexity
      messages
      user {
        id
      }
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

const ButtonTwo = styled.button`
  border: none;
  background: #3f51b5;
  padding: 10px 20px;
  border: 2px solid #3f51b5;
  border-radius: 5px;
  font-family: Montserrat;
  font-size: 1.4rem;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
  margin-top: 20px;
  margin-right: 10px;
  transition: 0.3s;
  &:hover {
    background: #2e3b83;
    border: 2px solid #2e3b83;
  }
`;

const UpdateChat = (props) => {
  const [name, setName] = useState(props.name);
  const [mess, setMess] = useState(props.messages.messagesList);
  const [num, setNum] = useState(props.messages.messagesList.length);
  const [isSecret, setIsSecret] = useState(props.isSecret);
  const { t } = useTranslation("lesson");

  const [updateChat, { data, loading, error }] = useMutation(
    UPDATE_CHAT_MUTATION,
    {
      refetchQueries: [
        { query: SINGLE_LESSON_QUERY, variables: { id: props.lessonId } }, // DocumentNode object parsed with gql
        "SINGLE_LESSON_QUERY", // Query name
      ],
    }
  );

  const getMessage = (data) => {
    let old_messages = [...mess];
    old_messages.splice(data.number - 1, 1, data);
    setMess([...old_messages]);
  };

  const updateAuthor = (val, i) => {
    let old_messages = [...mess];
    let new_obj = { ...old_messages[i] };
    new_obj.author = val;
    old_messages[i] = new_obj;

    setMess([...old_messages]);
  };

  const updateText = (val, i) => {
    let old_mess = [...mess];
    let new_obj = { ...old_mess[i] };
    new_obj.text = val;
    old_mess[i] = new_obj;

    setMess([...old_mess]);
  };
  return (
    <Styles>
      {/* <Input
        type="text"
        placeholder="Название диалога"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br /> */}
      <select
        defaultValue={isSecret}
        onChange={(e) => setIsSecret(e.target.value == "true")}
      >
        <option value={"true"}>Секретный</option>
        <option value={"false"}>Открытый</option>
      </select>
      {mess.map((m, i) => (
        <UpdateMessage
          index={i}
          author={mess[i].author}
          text={m.text}
          getMessage={getMessage}
          updateAuthor={updateAuthor}
          updateText={updateText}
        />
      ))}
      <div className="number">
        <button
          onClick={(e) => {
            e.preventDefault();
            let old_messages = [...mess];
            let popped = old_messages.pop();
            setMess([...old_messages]);
          }}
        >
          -1
        </button>
      </div>
      <div className="number">
        <button
          onClick={(e) => {
            e.preventDefault();
            setMess([
              ...mess,
              {
                number: 0,
                author: "author",
                text: "",
                image: "",
                reactions: [],
              },
            ]);
          }}
        >
          +1
        </button>
      </div>
      <ButtonTwo
        onClick={async (e) => {
          e.preventDefault();
          const res = await updateChat({
            variables: {
              id: props.id,
              messages: { messagesList: mess },
              name,
              isSecret,
            },
          });
          props.getResult(res);
          props.switchUpdate();
          props.passUpdated();
        }}
      >
        {loading ? t("saving") : t("save")}
      </ButtonTwo>
    </Styles>
  );
};

export default UpdateChat;
