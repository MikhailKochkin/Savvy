import { useState, useEffect } from "react";
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

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  margin: 15px 0;
  padding-bottom: 20px;
  border-bottom: 1px solid #cacaca;
  .number {
    cursor: pointer;
    border: 1px solid grey;
    border-radius: 10px;
    display: flex;
    font-size: 1.4rem;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    // width: 110px;
    height: 25px;
    margin-right: 15px;
    padding: 0 20px;
    button {
      border: none;
      cursor: pointer;
      background: none;
      font-size: 1.2rem;
      font-family: Montserrat;
    }
  }
`;

const CreateChat = (props) => {
  const { me, lessonData, initial_data } = props;
  const [name, setName] = useState("Dialogue");
  const [generating, setGenerating] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isGenerated, setIsGenerated] = useState(true);
  const [createChat, { data, loading, error }] =
    useMutation(CREATE_CHAT_MUTATION);
  const { t } = useTranslation("lesson");

  useEffect(() => {
    if (initial_data?.content?.messagesList) {
      setMessages(initial_data.content.messagesList);
    }
  }, [initial_data]);

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

  const updateReaction = (val, i) => {
    let old_messages = [...messages];
    old_messages[i].reactions = val;
    setMessages([...old_messages]);
  };

  const updateImage = (val, i) => {
    let old_messages = [...messages];
    old_messages[i].image = val;
    setMessages([...old_messages]);
  };

  const updateName = (val, i) => {
    let old_messages = [...messages];
    old_messages[i].name = val;
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
      {/* <div>Do you want to generate this block with AI?</div> */}
      {/* <Buttons>
        <div className="number">
          <button onClick={(e) => onGenerate(e)}>Use AI 🤖</button>
        </div>
        <div className="number">
          <button onClick={(e) => setIsGenerated(true)}>
            Do it on your own
          </button>
        </div>
      </Buttons>
      {generating && (
        <div>Generating the chat... It can take up to one minute.</div>
      )} */}
      {isGenerated && (
        <>
          {messages.map((m, i) => (
            <>
              <CreateMessage
                index={i}
                message={m}
                // document={props.document}
                getMessage={getMessage}
                updateAuthor={updateAuthor}
                updateText={updateText}
                updateReaction={updateReaction}
                updateImage={updateImage}
                updateName={updateName}
              />
            </>
          ))}
          <Bottom>
            <div className="number_box">
              <div className="number">
                <button
                  onClick={(e) => {
                    let old_messages = [...messages];
                    let popped = old_messages.pop();
                    setMessages([...old_messages]);
                  }}
                >
                  -1
                </button>
              </div>
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
                console.log("res", res);
                props.getResult(res);
              }}
            >
              {loading ? t("saving") : t("save")}
            </ButtonTwo>
          </Bottom>
        </>
      )}
    </Styles>
  );
};

export default CreateChat;
