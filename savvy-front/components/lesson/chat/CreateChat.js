import { useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import { useTranslation } from "next-i18next";
import _ from "lodash";

import { SINGLE_LESSON_QUERY } from "../SingleLesson";
import CreateMessage from "./CreateMessage";
import { Row, ActionButton } from "../styles/DevPageStyles";

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
  const { me, lessonData, initial_data, simulationStory } = props;
  const [name, setName] = useState("");
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
  const [messages, setMessages] = useState([]);
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

  const generateChat = async (e) => {
    e.preventDefault();

    let chatPrompt = `
              You are building a block of a simulator that has the following story: """${simulationStory}"""
              This block type is Chat. Chat is a collection of messsages from different characters that explain complex topics through discussion.
              
              The topic and purpose of this chat block are: """${prompt}""".

              Generate and return in JSON format a new chat using the information from the above.

              The result must look like this:

              Example 1:
              Simulator story: "Jane is a law student who is heeting help from her tutor Jack"
              Prompt: "Explain the concept of a contract in English law."
              result: {
                "content": {
                  "messagesList": [
                    {
                      "author": "author",
                      "text": "Let's take a look at the most fundamental concept. The concept of a contract. Do you know what a contract is?"
                      "image": "",
                      "number": 1,
                      "name": "Jack",
                    },
                    {
                      "author": "student",
                      "text": "Not really... Could you explain please?",
                      "image": "",
                      "number": 2,
                      "name": "Jane",

                    },
                    {
                      "author": "author",
                      "text": "Of course. A contract is an agreement between two parties who have agreed to carry out certain obligations to each other. In simple words, it is a legally binding agreement between two or more parties. It outlines the rights and responsibilities of each party involved in the agreement. If any party fails to fulfill their obligations as stated in the contract, they can face legal consequences.",
                      "image": "",
                      "number": 3,
                      "name": "Jack",

                    }
                  ]
                }
              }

              Example 2:
              Simulator story: "Jane is a law student who is heeting help from her tutor Jack"
              Prompt: "Explain the concept of a contract in English law."
              {
                "idea": "The concept of a contract in English law",
                "description": "A contract is an agreement between two parties who have agreed to carry out certain obligations to each other.",
                "format": "chat",
                "status: "generated",
                "content": {
                  "messagesList": [
                    {
                      "author": "student",
                      "text": "Could you explain what a contract is?"
                      "image": "",
                      "number": 1,
                      "name": "Jane",

                    },
                    {
                      "author": "author",
                      "text": "Of course. A contract is an agreement between two parties who have agreed to carry out certain obligations to each other. In simple words, it is a legally binding agreement between two or more parties. It outlines the rights and responsibilities of each party involved in the agreement. If any party fails to fulfill their obligations as stated in the contract, they can face legal consequences.",
                      "image": "",
                      "number": 2,
                      "name": "Jack",
                    }
                  ]
                }
              }
          `;

    try {
      const response = await fetch("/api/generateJson", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: chatPrompt }),
      });
      const data = await response.json();
      if (response.ok) {
        let new_messages = JSON.parse(data.result.content);
        console.log("new_messages", new_messages);
        setMessages(new_messages.content.messagesList);
        // setSimulatorStory(data.result.content);
        return data;
      } else {
        throw new Error(
          data.error.message || "An error occurred during your request."
        );
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <Styles>
      <Row>
        <div className="description">Name</div>
        <div className="action_area">
          <input
            onChange={(e) => setName(e.target.value)}
            defaultValue={name}
            placeholder="Untitled"
          />
        </div>
      </Row>
      <Row>
        <div className="description">Prompt</div>
        <div className="action_area">
          <textarea onChange={(e) => setPrompt(e.target.value)} />
          <ActionButton
            onClick={async (e) => {
              setGenerating(true);
              const res = await generateChat(e);
              setGenerating(false);
            }}
          >
            {!generating ? "Generate with AI" : "..."}
          </ActionButton>
        </div>
      </Row>
      {generating && <div>Generating the chat...</div>}
      {!generating && (
        <>
          {messages.map((m, i) => (
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
