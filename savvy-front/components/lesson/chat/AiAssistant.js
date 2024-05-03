import React, { useEffect, useRef, useState, useCallback } from "react";
import styled from "styled-components";
import parse from "html-react-parser";
import Fuse from "fuse.js";
import { gql, useMutation } from "@apollo/client";

const CREATE_CHATRESULT_MUTATION = gql`
  mutation CREATE_CHATRESULT_MUTATION(
    $dialogue: Dialogue!
    $lessonId: String!
    $chatId: String
  ) {
    createChatResult(
      dialogue: $dialogue
      lessonId: $lessonId
      chatId: $chatId
    ) {
      id
      dialogue
      lessonId
    }
  }
`;

import AiAssistantDialogue from "./AiAssistantDialogue";

import {
  IconBlock,
  Answer_text,
  MiniAIButton,
  Frame,
} from "../quizes/QuestionStyles";
import { autoResizeTextarea } from "../SimulatorDevelopmentFunctions";
import { set } from "lodash";
const Styles = styled.div`
  display: flex;
  flex-direction: column;
`;

const MessageRow = styled.div`
  display: flex;
  transition: 0.2s ease-out;
  flex-direction: row;
  justify-content: ${({ role }) =>
    role === "author" ? "flex-end" : "flex-start"};
  margin-bottom: 20px;
  /* Add slide-in animation */
  opacity: 0;
  transform: ${({ role }) =>
    role === "author" ? "translateX(50px)" : "translateX(-50px)"};
  animation: ${({ role }) =>
    role === "author"
      ? "animate-slide-in-from-right 0.8s forwards"
      : "animate-slide-in-from-left 0.8s forwards"};

  /* Animation from the right */
  @keyframes animate-slide-in-from-right {
    0% {
      opacity: 0;
      transform: translateX(70px);
    }
    50% {
      transform: translateX(-30px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  /* Animation from the left */
  @keyframes animate-slide-in-from-left {
    0% {
      opacity: 0;
      transform: translateX(-70px);
    }
    50% {
      transform: translateX(30px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  p {
    margin: 5px 0;
  }
  &.student {
    justify-content: flex-start;
    justify-content: stretch;
  }
  .author_text {
    background: #f3f3f3;
    color: black;
    border-radius: 25px;
    padding: 2% 5%;
    display: flex;
    min-width: 20%;
    max-width: 70%;
    font-size: 1.6rem;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    p {
      margin: 5px 0;
      &.button_box {
        margin: 30px 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      a.button {
        border: none;
        background: #0084ff;
        color: #fff;
        border-radius: 25px;
        padding: 12px 20px;
        cursor: pointer;
        width: 100%;
        margin: 10px 0;
        transition: 0.3s;
        &:hover {
          background: #005fb8;
        }
        @media (max-width: 800px) {
          display: block;
          text-align: center;
          padding: 12px 20px;
          line-height: 1.2;
        }
      }
    }
    @media (max-width: 800px) {
      font-size: 1.6rem;
    }
  }

  .student_text {
    max-width: 70%;
    min-width: 20%;
    border: 2px solid;
    background: #2f80ed;
    color: #fff;
    outline: 0;
    resize: none;
    border-radius: 25px;
    padding: 3% 4%;
    line-height: 1.8;
    font-family: Montserrat;
    font-size: 1.6rem;
    margin-bottom: 20px;
    @media (max-width: 800px) {
      font-size: 1.6rem;
    }
  }
`;

const Icon = styled.div`
  margin: 5px;
  border-radius: 50%;
  background: #2f80ed; /* fallback for old browsers */
  color: #fff;
  font-size: 2rem;
  font-weight: bold;
  height: 55px;
  width: 55px;
  object-fit: cover;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
`;

const AiAssistant = ({ id, lessonId, role, m, me, author, library }) => {
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const [dialogue, setDialogue] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");

  const [createChatResult] = useMutation(CREATE_CHATRESULT_MUTATION);

  //   let context = `Narrow AI specializes but lacks generalization.
  //   AGI is the pinnacle, replicating human cognition. ML learns from data, NLP processes language,
  //   and CV interprets visuals, forming AI's foundation.`;

  //   const determineIfAnswerCanBeFound = async (e) => {
  //     let comparisonData = {
  //       answer1: context,
  //       answer2: currentQuestion,
  //     };
  //     try {
  //       const response = await fetch(
  //         "https://arcane-refuge-67529.herokuapp.com/checker",
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify(comparisonData),
  //         }
  //       );
  //       const data = await response.json();
  //       console.log("res", data);
  //       return parseFloat(data.res) > 35; // Return true or false based on the comparison
  //     } catch (err) {
  //       console.log(err);
  //       return false; // Return false in case of an error
  //     }
  //   };

  const getResponseToStudent = async (e) => {
    setGeneratingAnswer(true);
    let url;
    let newAnswer = {
      question: currentQuestion,
      answer: "",
      sourceId: "",
      comment: "",
    };
    let AItype = "openai";
    let keywords;
    const options = {
      includeScore: true,
      keys: [
        {
          name: "text",
          weight: 0.6,
        },
        {
          name: "name",
          weight: 0.7,
        },
      ],
      threshold: 0.6,
      //   ignoreLocation: true,
    };
    let searchableLibrary = library;
    let result;
    if (AItype == "claude") {
      url = "/api/generate2";
    } else {
      url = "/api/generate";
    }
    let canWeFindTheAnswer = true;
    if (canWeFindTheAnswer) {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: `Return only 2 key keywords from this string ${currentQuestion} so that I can use it in the text search.
            Find professional terms. For example: Narrow AI, unsupervised learning, legal entity, Artificial General Intelligence.
            Avoid generic terms that might confuse the search: AI, learning, entity, intelligence, attention. 
            The result should look like this: "keyword1", "keyword2". If you find only generic terms, return "".
`,
          }),
        });

        if (response.status !== 200) {
          throw (
            (await response.json()).error ||
            new Error(`Request failed with status ${response.status}`)
          );
        }
        const data = await response.json();
        if (AItype == "claude") {
          result = data.result.content[0].text;
        } else {
          result = data.result.content;
        }
        if (result) {
          keywords = result.split(",").map((keyword) => keyword.trim());
          const fuse = new Fuse(searchableLibrary, options);
          let searchResult1 = fuse.search(keywords[0]);
          let searchResult2 = fuse.search(
            keywords[1] ? keywords[1] : keywords[0]
          );
          let searchResult = [...searchResult1, ...searchResult2];
          // Sort searchResult by relevance score in descending order
          searchResult.sort((a, b) => a.score - b.score);
          if (searchResult.length === 0) {
            newAnswer.answer =
              "I'm sorry, but I couldn't find a relevant answer to your question in my current knowledge base. I will do my best to find the information and email you the answer as soon as possible.";
            setDialogue([...dialogue, newAnswer]);
            createChatResult({
              variables: {
                dialogue: newAnswer,
                lessonId: lessonId,
                chatId: id,
              },
            });
            setCurrentQuestion("");
            setGeneratingAnswer(false);
            return;
          }
          newAnswer.sourceId = searchResult[0].item.id;
          try {
            const response = await fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                prompt: `Asnswer this question in 2 sentences: ${currentQuestion} using this source: ${searchResult[0].item.text}. 
                ONLY USE INFORMATION FROM THE SOURCE TO ANSWER THE QUESTION. MAKE EXPLANATIONS AS SIMPLE AS IF YOU SRE SPEAKING to a high school student.
                If the source does not contain this information, return that you do no have this information right now.`,
              }),
            });

            if (response.status !== 200) {
              throw (
                (await response.json()).error ||
                new Error(`Request failed with status ${response.status}`)
              );
            }
            const data = await response.json();
            if (AItype == "claude") {
              result = data.result.content[0].text;
            } else {
              result = data.result.content;
            }
            if (result) {
              newAnswer.answer = result;
            }
          } catch (error) {
            console.error(error);
            alert(error.message);
          }
        }
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    } else {
      newAnswer.answer =
        "I am sorry, this question is out of the scope of this lesson.";
    }

    setDialogue([...dialogue, newAnswer]);
    createChatResult({
      variables: {
        dialogue: newAnswer,
        lessonId: lessonId,
        chatId: id,
      },
    });
    setCurrentQuestion("");
    setGeneratingAnswer(false);
  };

  return (
    <Styles>
      <MessageRow role="author">
        <div className="author_text">
          <p>
            Do you have any questions about the material above? If yes, feel
            free to ask.
          </p>
          <p>
            Please notice that my job here is to help explain the material of
            this lesson, not to answer any question there is.
          </p>
        </div>
        <IconBlock>
          {m.image && <img className="icon" src={m.image} />}
          {!m.image &&
            (author && author.image ? (
              <img className="icon" src={author.image} />
            ) : (
              <img className="icon" src="../../static/hipster.svg" />
            ))}
          <div className="name">
            {m.name && m.name.toLowerCase() !== "author"
              ? m.name
              : author && author.name
              ? author.name
              : "BeSavvy"}
          </div>
        </IconBlock>
      </MessageRow>
      {dialogue.map((message, i) => (
        <AiAssistantDialogue
          m={m}
          me={me}
          message={message}
          author={author}
          library={library}
        />
      ))}
      <MessageRow role="student">
        <IconBlock>
          <Icon className="icon2" background={m.author}>
            {m.image && <img className="icon" src={m.image} />}
            {!m.image &&
              (me && me.image ? (
                <img className="icon" src={me.image} />
              ) : me.surname ? (
                `${me.name[0]}${me.surname[0]}`
              ) : (
                `${me.name[0]}${me.name[1]}`
              ))}
          </Icon>
          <div className="name">
            {m.name && m.name !== "student" ? m.name : me.name}
          </div>
        </IconBlock>
        <Frame inputColor="#f3f3f3">
          <Answer_text
            type="text"
            required
            value={currentQuestion}
            onChange={(e) => {
              autoResizeTextarea(e);
              setCurrentQuestion(e.target.value);
            }}
            onInput={autoResizeTextarea}
            placeholder="..."
          />
          <ButtonBox>
            {" "}
            <MiniAIButton onClick={(e) => getResponseToStudent()}>
              {generatingAnswer ? "Generating..." : "Ask AI"}
            </MiniAIButton>
          </ButtonBox>
        </Frame>
      </MessageRow>
    </Styles>
  );
};

export default AiAssistant;
