import { useState } from "react";
import styled from "styled-components";
import renderHTML from "react-render-html";
import UpdateChat from "./UpdateChat";

const Styles = styled.div`
  /* width: ${(props) => props.width}; */
  width: 650px;
  margin: 20px 0;
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Message = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 20px;
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
    min-width: 40%;
    max-width: 70%;
    display: flex;
    font-size: 1.6rem;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
  .student_text {
    /* height: 140px; */
    min-width: 60%;
    max-width: 70%;
    border: 2px solid;
    border-color: #f3f3f3;
    outline: 0;
    resize: none;
    border-radius: 25px;
    padding: 3% 4%;
    line-height: 1.8;
    font-family: Montserrat;
    font-size: 1.6rem;
    margin-bottom: 20px;
  }
`;

const IconBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .icon {
    margin: 5px;
    border-radius: 50%;
    height: 55px;
    width: 55px;
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

const Chat = (props) => {
  const [update, setUpdate] = useState(false); // what is the answer?
  const { name, messages, me, story, lessonId, id } = props;
  let width;
  if (props.problem) {
    width = "50%";
  } else if (props.story) {
    width = "50%";
  } else {
    width = "90%";
  }
  return (
    <Styles width={width}>
      {!story && <div>{name}</div>}
      {!update &&
        messages.messagesList.map((m) => {
          if (m.author === "student") {
            return (
              <Message className="student">
                <IconBlock>
                  <img className="icon" src="../../static/flash.svg" />
                  <div className="name">{me.name}</div>
                </IconBlock>
                <div className="student_text">{renderHTML(m.text)}</div>
              </Message>
            );
          } else {
            return (
              <Message className="author">
                <div className="author_text">{renderHTML(m.text)}</div>
                <IconBlock>
                  <img className="icon" src="../../static/hipster.svg" />
                  <div className="name">BeSavvy</div>
                </IconBlock>
              </Message>
            );
          }
        })}
      {!story && <button onClick={(e) => setUpdate(!update)}>Изменить</button>}
      {update && (
        <UpdateChat
          id={id}
          name={name}
          me={me}
          messages={messages}
          lessonId={lessonId}
        />
      )}
    </Styles>
  );
};

export default Chat;
