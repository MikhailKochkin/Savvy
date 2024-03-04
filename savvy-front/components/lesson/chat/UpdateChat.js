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

const Bottom = styled.div`
  width: 70%;
  .number_box {
    display: flex;
    flex-direction: row;
    width: 50%;
    .number {
      cursor: pointer;
      border: 1px solid grey;
      border-radius: 50%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 30px;
      margin-right: 15px;
      button {
        border: none;
        cursor: pointer;
        background: none;
        font-family: Montserrat;
      }
    }
  }
`;

const NameInput = styled.input`
  width: 100%;
  height: 40px;
  font-weight: 500;
  font-size: 2rem;
  font-family: Montserrat;
  margin-bottom: 20px;
  border: none;
  outline: none;
`;

const UpdateChat = (props) => {
  const [name, setName] = useState(props.name);
  const [mess, setMess] = useState(props.messages.messagesList);
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

  const updateReaction = (val, i) => {
    let old_mess = [...mess];
    let new_obj = { ...old_mess[i] };
    new_obj.reactions = val;
    old_mess[i] = new_obj;
    setMess([...old_mess]);
  };

  const updateImage = (val, i) => {
    let old_mess = [...mess];
    let new_obj = { ...old_mess[i] };
    new_obj.image = val;
    old_mess[i] = new_obj;
    setMess([...old_mess]);
  };

  const updateName = (val, i) => {
    let old_mess = [...mess];
    let new_obj = { ...old_mess[i] };
    new_obj.name = val;
    old_mess[i] = new_obj;
    setMess([...old_mess]);
  };

  return (
    <Styles>
      {/* <select
        defaultValue={isSecret}
        onChange={(e) => setIsSecret(e.target.value == "true")}
      >
        <option value={"true"}>Секретный</option>
        <option value={"false"}>Открытый</option>
      </select> */}
      <NameInput
        onChange={(e) => setName(e.target.value)}
        defaultValue={name}
        placeholder="Untitled"
      />
      {mess.map((m, i) => (
        <UpdateMessage
          index={i}
          author={mess[i].author}
          text={m.text}
          name={m.name}
          reactions={m.reactions}
          getMessage={getMessage}
          updateAuthor={updateAuthor}
          updateText={updateText}
          updateReaction={updateReaction}
          updateImage={updateImage}
          updateName={updateName}
        />
      ))}
      <Bottom>
        <div className="number_box">
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
      </Bottom>
    </Styles>
  );
};

export default UpdateChat;
