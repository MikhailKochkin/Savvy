import React, { useEffect, useRef, useState, useCallback } from "react";
import styled from "styled-components";
import parse from "html-react-parser";
import { gql, useMutation } from "@apollo/client";
import {
  getKeywords,
  getAnswerFromSource,
  searchForRelevantResults,
  findRelevantTextInSource,
  compareTexts,
} from "./AIChatFunctions";

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

    // Initialize a new answer object
    let newAnswer = {
      question: currentQuestion,
      answer: "",
      sourceId: "",
      comment: "",
    };

    // Define options for the Fuse search
    const options = {
      includeScore: true,
      keys: [
        { name: "text", weight: 0.6 },
        { name: "name", weight: 0.7 },
      ],
      threshold: 0.6,
    };

    // Check if we can find an answer
    try {
      // Get keywords from the current question
      const keywords = await getKeywords(currentQuestion);

      if (keywords) {
        // Search for relevant results using the keywords
        const searchResults = searchForRelevantResults(
          keywords,
          library,
          options
        );

        if (searchResults.length === 0) {
          // Set a default answer if no relevant results found
          newAnswer.answer =
            "I'm sorry, but I couldn't find a relevant answer to your question in my current knowledge base. I will do my best to find the information and email you the answer as soon as possible.";
        } else {
          // Set the source ID and answer from the most relevant search result
          newAnswer.sourceId = searchResults[0].item.id;
          newAnswer.answer = await getAnswerFromSource(
            currentQuestion,
            searchResults[0].item.text
          );

          let relevantText = await findRelevantTextInSource(
            currentQuestion,
            searchResults[0].item.text,
            newAnswer.answer.length
          );
          let comparisonResult = await compareTexts(
            newAnswer.answer,
            relevantText
          );
          if (parseFloat(comparisonResult) < 80) {
            newAnswer.comment = `The answer failed the comparisonResult (${comparisonResult}%) test and was not shown to the student: ${newAnswer.answer}`;
            newAnswer.answer =
              "I'm sorry, but I am not sure that I can provide you with the correct answer. I will do my best to find the information and email you the answer as soon as possible.";
          }
        }
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }

    // Update the dialogue state with the new answer
    setDialogue([...dialogue, newAnswer]);

    // Create a chat result with the new answer
    createChatResult({
      variables: {
        dialogue: newAnswer,
        lessonId: lessonId,
        chatId: id,
      },
    });

    // Reset the current question and generating answer state
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
