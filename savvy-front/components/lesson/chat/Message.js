import React, { useEffect, useRef } from "react";

import styled from "styled-components";
import parse from "html-react-parser";

const IconBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 65px;
  .icon {
    margin: 5px;
    border-radius: 50%;
    height: 55px;
    width: 55px;
    object-fit: cover;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .name {
    font-size: 1.2rem;
    text-align: center;
    color: #8f93a3;
    max-width: 80px;
    margin: 0 7px;
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

const Styles = styled.div`
  display: flex;
  transition: 0.2s ease-out;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 20px;

  /* Add slide-in animation */
  opacity: ${({ className }) => (className === "author" ? 0 : 1)};
  transform: ${({ className }) =>
    className === "author" ? "translateX(50px)" : "none"};

  animation: ${({ className }) =>
    className === "author" ? "animate-slide-in 0.8s forwards" : "none"};

  @keyframes animate-slide-in {
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

  /* Add typewriter animation for p elements */
  /* (existing styles for child elements) */

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
      margin: 10px 0;
      &.button_box {
        margin: 30px 0;
        displlay: flex;
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

  .dark_author_text {
    background: #5265ef;
    color: #e4e4e4;
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
      margin: 10px 0;
      &.button_box {
        margin: 30px 0;
        displlay: flex;
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
    min-width: 40%;
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
  .dark_student_text {
    width: 70%;
    border: 2px solid;
    border-color: #222222;
    background: #1d1d1d;
    color: #e4e4e4;
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

const typewriterEffect = (element, index = 0, speed = 50) => {
  if (element.childNodes && index < element.childNodes.length) {
    const child = element.childNodes[index];
    if (child.nodeType === Node.TEXT_NODE) {
      const text = child.textContent;
      child.textContent = "";
      let textIndex = 0;

      const typeText = () => {
        if (textIndex < text.length) {
          child.textContent += text[textIndex];
          textIndex++;
          setTimeout(typeText, speed);
        } else {
          typewriterEffect(element, index + 1, speed);
        }
      };

      typeText();
    } else {
      typewriterEffect(child, 0, speed);
      typewriterEffect(element, index + 1, speed);
    }
  }
};

const Message = ({
  id,
  key,
  time,
  className,
  shouldSlide,
  shouldBounce,
  m,
  me,
  author,
}) => {
  const studentTextRef = useRef(null);

  useEffect(() => {
    if (studentTextRef.current) {
      if (className === "student") {
        typewriterEffect(studentTextRef.current, 0);
      } else {
        studentTextRef.current.innerHTML = m.text;
      }
    }
  }, [className, m.text]);

  return (
    <Styles id={id} key={key} className={className}>
      {className === "author" && (
        <>
          <div className="author_text">{parse(m.text)}</div>
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
        </>
      )}
      {className === "student" && (
        <>
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
          <div className="student_text" ref={studentTextRef}>
            {parse(m.text)}
          </div>
        </>
      )}
    </Styles>
  );
};

export default Message;
