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
  const { me, lessonData } = props;
  const [name, setName] = useState("Dialogue");
  const [generating, setGenerating] = useState(false);

  const [messages, setMessages] = useState([
    {
      number: 0,
      author: "Author",
      text: "Hi, I'm Mike Kochkin, a cybersecurity expert with over a decade of experience in the field. Throughout my career, I've worked with various organizations, helping them secure their digital assets and protect against cyber threats.",
      image: "",
      reactions: [],
    },
    {
      number: 1,
      author: "Student",
      text: "Nice to meet you, Mike. What are you going to teach me?",
      image: "",
      reactions: [],
    },
    {
      number: 2,
      author: "Author",
      text: "Great to have you here! In this lesson, we will dive into the exciting world of Cybersecurity. You will learn about different types of cyber threats, common attack vectors, and effective defense mechanisms. Our goal is to equip you with the knowledge and skills to safeguard digital information and maintain secure online practices. By the end of this lesson, you'll have a strong foundation in cybersecurity principles and be better prepared to navigate the digital landscape with confidence.",
      image: "",
      reactions: [],
    },
  ]);
  const [isGenerated, setIsGenerated] = useState(false);
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

  async function onGenerate(event) {
    event.preventDefault();
    setGenerating(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: `
            Imagine that you are a course author ${me.name} ${me.surname} ${me.work}. Create a dialogue for the following situation using the lesson name:${lessonData.name} and description ${lessonData.description}:
           ${props.prompt} Return a dialogue in the following format:
           {messages: [{number: 0,author: "author",text: "course author phrase",image: "",reactions: [],}]}.
           The object property author can be one of two options: "author" or "student".
            `,
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      setGenerating(false);

      const generated_chat = JSON.parse(data.result.content);
      setMessages([...generated_chat.messages]);
      setIsGenerated(true);
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <Styles>
      {/* <Input
        type="text"
        placeholder="Название диалога"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br /> */}
      <div>Do you want to generate this block with AI?</div>
      <button onClick={(e) => onGenerate(e)}>Use AI</button>
      {generating && (
        <div>Generating the chat... It can take up to one minute.</div>
      )}
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
