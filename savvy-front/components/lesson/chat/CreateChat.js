import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import CreateMessage from "./CreateMessage";
import { useTranslation } from "next-i18next";

import { SINGLE_LESSON_QUERY } from "../SingleLesson";
import _ from "lodash";

const CREATE_CHAT_MUTATION = gql`
  mutation CREATE_CHAT_MUTATION(
    $name: String!
    $messages: Messages!
    $lessonId: String!
  ) {
    createChat(name: $name, messages: $messages, lessonId: $lessonId) {
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
  width: 570px;
  margin: 10px 0;
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

const CreateChat = (props) => {
  const [name, setName] = useState("Dialogue");
  const [messages, setMessages] = useState([
    {
      number: 0,
      author: "author",
      text: "",
      image: "",
      reactions: [],
    },
  ]);
  const [num, setNum] = useState(1);
  const [createChat, { data, loading, error }] =
    useMutation(CREATE_CHAT_MUTATION);
  const { t } = useTranslation("lesson");

  const getMessage = (data) => {
    setMessages([...messages, data]);
  };

  const updateAuthor = (val, i) => {
    let old_messages = [...messages];
    old_messages[i].author = val;
    setMessages([...old_messages]);
  };

  const updateText = (val, i) => {
    let old_messages = [...messages];
    old_messages[i].text = val;
    setMessages([...old_messages]);
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
      {messages.map((m, i) => (
        <>
          <CreateMessage
            index={i}
            // document={props.document}
            getMessage={getMessage}
            updateAuthor={updateAuthor}
            updateText={updateText}
          />
        </>
      ))}
      <Bottom>
        <div className="number_box">
          {/* <div className="number">
            <button onClick={(e) => setNum(num - 1)}>-1</button>
          </div> */}
          <div className="number">
            <button
              onClick={(e) => {
                setMessages([
                  ...messages,
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
        <br />
        <ButtonTwo
          onClick={async (e) => {
            e.preventDefault();
            const res = await createChat({
              variables: {
                lessonId: props.lessonID,
                messages: { messagesList: messages },
                name,
              },
              refetchQueries: [
                {
                  query: SINGLE_LESSON_QUERY,
                  variables: { id: props.lessonID },
                },
              ],
            });
            props.getResult(res);
          }}
        >
          {loading ? t("saving") : t("save")}
        </ButtonTwo>
      </Bottom>
    </Styles>
  );
};

export default CreateChat;
