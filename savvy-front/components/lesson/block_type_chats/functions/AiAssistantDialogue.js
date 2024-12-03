import { useState } from "react";
import styled from "styled-components";
import parse from "html-react-parser";

import { IconBlock } from "../../styles/commonElements/QuestionStyles";

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
  .sourceText {
    font-size: 1.4rem;
    font-style: italic;
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
  button {
    margin: 15px 0;
    background: none;
    border: none;
    font-family: Montserrat;
    cursor: pointer;
    padding: 0;
    font-weight: 500;
    font-style: italic;
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

const AiAssistantDialogue = ({ m, me, message, author, library }) => {
  const [revealSource, setRevealSource] = useState(false);

  return (
    <>
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
        <div className="student_text">{parse(message.question)}</div>
      </MessageRow>
      <MessageRow role="author">
        <div className="author_text">
          <p> {parse(message.answer)}</p>
          {message.sourceId && message.sourceId !== "" && (
            <button onClick={(e) => setRevealSource(!revealSource)}>
              {revealSource ? "Hide source" : "Show source"}
            </button>
          )}

          {revealSource ? (
            <div className="sourceText">
              <div>
                <b>Information from our internal library:</b>
              </div>
              {parse(library.find((l) => l.id === message.sourceId)?.text)}
            </div>
          ) : null}
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
    </>
  );
};

export default AiAssistantDialogue;
