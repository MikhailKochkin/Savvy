import { useState, useEffect } from "react";
import styled from "styled-components";
import renderHTML from "react-render-html";
import UpdateChat from "./UpdateChat";
import DeleteChat from "./DeleteChat";
import Reaction from "./Reaction";

const Styles = styled.div`
  width: 650px;
  margin: 20px 0;
  font-weight: 500;
  img {
    display: block;
    width: 100%;
    max-height: 50em;
    box-shadow: "0 0 0 2px blue;";
  }
  a {
    border-bottom: 2px solid #26ba8d;
    padding: 0%;
    transition: 0.3s;
    cursor: pointer;
  }
  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Message = styled.div`
  display: flex;
  /* opacity: 0; */
  /* transition-property: sliding-vertically; */
  transition: 0.2s ease-out;
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

const Chat = (props) => {
  const [update, setUpdate] = useState(false);

  const { name, messages, me, story, lessonId, id, author } = props;

  useEffect(() => {
    // let chat = document.getElementById(id);
    // messages.messagesList.map((m, i) => {
    //   setTimeout(() => {
    //     let el = document.getElementById("message" + i + id);
    //     el.style.opacity = 1;
    //   }, i * 2 * 1000);
    // });
  }, [0]);

  let width;
  if (props.problem) {
    width = "50%";
  } else if (props.story) {
    width = "50%";
  } else {
    width = "90%";
  }
  return (
    <Styles id={id} width={width}>
      {!story && <div>{name}</div>}
      {!update &&
        messages.messagesList.map((m, i) => {
          if (m.author === "student") {
            return (
              <Message
                id={"message" + i + id}
                key={i}
                time={i}
                className="student"
              >
                <IconBlock>
                  <img className="icon" src="../../static/flash.svg" />
                  <div className="name">{me.name}</div>
                </IconBlock>
                <div className="student_text">{renderHTML(m.text)}</div>
              </Message>
            );
          } else {
            return (
              <>
                <Message
                  id={"message" + i + id}
                  key={i}
                  time={i}
                  className="author"
                >
                  <div className="author_text">{renderHTML(m.text)}</div>
                  <IconBlock>
                    {author && author.image != null ? (
                      <img className="icon" src={author.image} />
                    ) : (
                      <img className="icon" src="../../static/hipster.svg" />
                    )}
                    <div className="name">
                      {author && author.name ? author.name : "BeSavvy"}
                    </div>
                  </IconBlock>
                </Message>
                {m.reactions && m.reactions.length > 0 && (
                  <Reaction
                    reactions={m.reactions}
                    me={me}
                    author={author}
                    initialQuestion={m.text}
                  />
                )}
              </>
            );
          }
        })}
      {!story && <button onClick={(e) => setUpdate(!update)}>Изменить</button>}
      {me && !story && (
        <DeleteChat me={me.id} chatId={id} lessonId={lessonId} />
      )}
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
