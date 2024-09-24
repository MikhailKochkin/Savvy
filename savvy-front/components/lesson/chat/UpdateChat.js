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
    $type: String
  ) {
    updateChat(id: $id, name: $name, messages: $messages, type: $type) {
      id
      name
      type
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

const EditorInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  .label {
    font-weight: 600;
    margin: 5px 0;
    margin-bottom: 0px;
  }
  .comment {
    color: #b0b0b0;
    font-size: 1.2rem;
    margin-bottom: 15px;
    line-height: 1.4;
  }
  input {
    width: 90%;
    border: 2px solid #dddddd;
    border-radius: 5px;
    height: 40px;
    padding: 10px;
    font-family: Montserrat;
    font-weight: 500;
    margin-bottom: 15px;
    font-size: 1.4rem;
    outline: 0;
  }
  textarea {
    width: 90%;
    border: 2px solid #dddddd;
    border-radius: 5px;
    height: 60px;
    padding: 10px;
    font-family: Montserrat;
    font-weight: 500;
    margin-bottom: 15px;
    font-size: 1.4rem;
    outline: 0;
    line-height: 1.5;
  }
  select {
    width: 90%;
    border: 2px solid #dddddd;
    border-radius: 5px;
    height: 40px;
    padding: 5px 10px;
    font-family: Montserrat;
    font-weight: 500;
    margin-bottom: 15px;
    font-size: 1.4rem;
    outline: 0;
    line-height: 1.5;
    background: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: #fff;
    background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E"),
      linear-gradient(to bottom, #ffffff 0%, #ffffff 100%);
    background-repeat: no-repeat, repeat;
    background-position: right 0.7em top 50%, 0 0;
    background-size: 0.65em auto, 100%;
  }
`;

const UpdateChat = (props) => {
  const [name, setName] = useState(props.name);
  const [mess, setMess] = useState(props.messages.messagesList);
  const [type, setType] = useState(props.type);

  // const [isSecret, setIsSecret] = useState(props.isSecret);
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
      <EditorInfoSection>
        <h3 className="label">{t("type")}</h3>
        <select
          name="types"
          id="types"
          defaultValue={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value={null || undefined}>Undefined</option>
          <option value="fixedchat">Fixed Chat</option>
          <option value="dynamicchat">Dynamic (AI-generated) Chat</option>
        </select>
      </EditorInfoSection>
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
                // isSecret,
                type,
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
