import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import { useTranslation } from "next-i18next";
import { v4 as uuidv4 } from "uuid";

import UpdateMessage from "./functions/UpdateMessage";
import { SINGLE_LESSON_QUERY } from "../SingleLesson";
import { Row, ActionButton, SecondaryButton } from "../styles/DevPageStyles";

const UPDATE_CHAT_MUTATION = gql`
  mutation UPDATE_CHAT_MUTATION(
    $id: String!
    $name: String!
    $messages: MessagesInput!
    $type: String
  ) {
    updateChat(id: $id, name: $name, messages: $messages, type: $type) {
      id
      name
      type
      link_clicks
      complexity
      messages {
        messagesList {
          id
          characterId
          author
          name
          text
          image
          reactions {
            reaction
            comment
          }
        }
      }
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

const Bottom = styled.div`
  width: 70%;
  .number_box {
    display: flex;
    flex-direction: row;
    button {
      margin-right: 15px;
    }
  }
`;

const UpdateChat = (props) => {
  const [name, setName] = useState(props.name);
  const [messages, setMessages] = useState(
    props.messages.messagesList.map((message) => ({
      ...message,
      id: message.id || uuidv4(),
    }))
  );
  const [type, setType] = useState(props.type);
  const [prompt, setPrompt] = useState("");
  const [generating, setGenerating] = useState(false);
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

  const updateMessageProperties = (message, index) => {
    const updatedMessages = [...messages];
    updatedMessages[index] = message;
    setMessages(updatedMessages);
  };

  // Helper function to insert a new message at a given index.
  const insertNewMessageAfter = (id) => {
    const index = messages.findIndex((item) => item.id === id);

    const newMessage = {
      id: uuidv4(),
      number: index + 1,
      author: "author",
      text: "",
      image: "",
      reactions: [],
    };
    if (index === -1) {
      return;
    }
    const newMessages = [...messages];
    newMessages.splice(index + 1, 0, newMessage);
    setMessages(newMessages);
  };

  const removeMessageWithId = (id) => {
    const newMessages = messages.filter((item) => item.id !== id);
    setMessages(newMessages);
  };

  const updateChatWithAI = async (e) => {
    e.preventDefault();
    let chatPrompt = `
        You receive this data that is used to make a chat block: """${JSON.stringify(
          mess,
          null,
          2
        )}"""
        Use these instructions to update the data: """${prompt}"""
        Return the data in the following JSON format:
           result: {
                "content": {
                  "messagesList": [
                    {
                      "author": "student",
                      "text": "Could you explain what a contract is?",
                      "image": "",
                      "number": 1,
                      "name": "Jane"
                    },
                    {
                      "author": "author",
                      "text": "Of course. A contract is an agreement between two parties who have agreed to carry out certain obligations to each other. In simple words, it is a legally binding agreement between two or more parties. It outlines the rights and responsibilities of each party involved in the agreement. If any party fails to fulfill their obligations as stated in the contract, they can face legal consequences.",
                      "image": "",
                      "number": 2,
                      "name": "Jack"
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
        let updated_messages = JSON.parse(data.result.content);
        setMessages(updated_messages.result.content.messagesList);
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
        <div className="description">Id</div>
        <div className="action_area">
          <div className="element_info">{props.id}</div>
        </div>
      </Row>
      <Row>
        <div className="description">{t("name")}</div>
        <div className="action_area">
          <input
            onChange={(e) => setName(e.target.value)}
            defaultValue={name}
            placeholder="Untitled"
          />
        </div>
      </Row>
      <Row>
        <div className="description">{t("type")}</div>
        <div className="action_area">
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
        </div>
      </Row>
      <Row>
        <div className="description">{t("Prompt")}</div>
        <div className="action_area">
          <textarea onChange={(e) => setPrompt(e.target.value)} />
          <ActionButton
            onClick={async (e) => {
              setGenerating(true);
              const res = await updateChatWithAI(e);
              setGenerating(false);
            }}
          >
            {!generating ? t("update_with_AI") : "..."}
          </ActionButton>
        </div>
      </Row>

      {/* Button to add a new message at the beginning */}
      <Row>
        <SecondaryButton
          onClick={(e) => {
            e.preventDefault();
            insertNewMessageAfter(0);
          }}
        >
          +1 {t("message")} at beginning
        </SecondaryButton>
      </Row>

      {/* Render the list of messages */}
      {!generating &&
        [...messages].map((m, i) => (
          <div key={m.id}>
            <div>
              {type !== "fixedchat"
                ? i === 0
                  ? "First chat message:"
                  : i === 1
                  ? "Info about the bot:"
                  : i === 2
                  ? "Info about the user:"
                  : i === 3
                  ? "Expected Agent behaviour:"
                  : i === 4
                  ? "Expected User behaviour:"
                  : null
                : null}
            </div>
            <UpdateMessage
              id={m.id}
              index={i}
              author={m.author}
              text={m.text}
              name={m.name}
              image={m.image}
              me={props.me}
              characters={props.characters}
              isAiAssistantOn={m.isAiAssistantOn}
              reactions={m.reactions}
              passUpdatedMessage={updateMessageProperties}
              insertNewMessageAfter={insertNewMessageAfter}
              removeMessageWithId={removeMessageWithId}
            />
            {/* Button to add a new message right after the current message */}
          </div>
        ))}
      <Bottom>
        <ActionButton
          onClick={async (e) => {
            e.preventDefault();

            // Clean up messagesList to remove __typename from all nested objects
            const cleanedMessages = messages.map((m) => ({
              ...m,
              reactions: m.reactions?.map((reaction) => {
                const { __typename, ...rest } = reaction; // Remove __typename
                return rest;
              }),
              __typename: undefined, // Remove __typename from the top-level message
            }));
            console.log("cleanedMessages", cleanedMessages);
            try {
              const res = await updateChat({
                variables: {
                  id: props.id,
                  messages: {
                    messagesList: cleanedMessages,
                  },
                  name,
                  type,
                },
              });
              console.log("res", res);
              props.getResult(res);
              props.switchUpdate();
            } catch (error) {
              console.error("Error updating chat:", error);
            }
          }}
        >
          {loading ? "..." : t("update")}
        </ActionButton>
      </Bottom>

      {/* Optional: if you still want a button to add a new message at the end */}
    </Styles>
  );
};

export default UpdateChat;
