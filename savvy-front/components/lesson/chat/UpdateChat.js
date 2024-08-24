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
        {
          query: SINGLE_LESSON_QUERY,
          variables: { id: props.lessonId },
        },
      ],
    }
  );

  const updateMessageProperty = (val, i, property) => {
    const updatedMessages = [...mess];
    updatedMessages[i] = { ...updatedMessages[i], [property]: val };
    setMess(updatedMessages);
  };

  return (
    <Styles>
      <NameInput
        onChange={(e) => setName(e.target.value)}
        defaultValue={name}
        placeholder="Untitled"
      />
      {mess.map((m, i) => (
        <UpdateMessage
          key={i}
          index={i}
          author={m.author}
          text={m.text}
          name={m.name}
          isAiAssistantOn={m.isAiAssistantOn}
          reactions={m.reactions}
          getMessage={(data) => updateMessageProperty(data, data.number - 1)}
          updateAuthor={(val) => updateMessageProperty(val, i, "author")}
          updateText={(val) => updateMessageProperty(val, i, "text")}
          updateReaction={(val) => updateMessageProperty(val, i, "reactions")}
          updateImage={(val) => updateMessageProperty(val, i, "image")}
          updateName={(val) => updateMessageProperty(val, i, "name")}
          updateAiAssistant={(val) =>
            updateMessageProperty(val, i, "isAiAssistantOn")
          }
        />
      ))}
      <Bottom>
        <div className="number_box">
          <div className="number">
            <button
              onClick={(e) => {
                e.preventDefault();
                setMess(mess.slice(0, -1));
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
          }}
        >
          {loading ? t("saving") : t("save")}
        </ButtonTwo>
      </Bottom>
    </Styles>
  );
};

export default UpdateChat;
