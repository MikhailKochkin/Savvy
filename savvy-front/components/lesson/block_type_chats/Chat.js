import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "next-i18next";
import { useMutation, gql } from "@apollo/client";
import _ from "lodash";

import UpdateChat from "./UpdateChat";
import DeleteChat from "./DeleteChat";
import FixedChat from "./types/FixedChat";
import DynamicChat from "./types/DynamicChat";
import VoiceChat from "./types/VoiceChat";
import { SecondaryButton } from "../styles/DevPageStyles";

const UPDATE_CHAT_MUTATION = gql`
  mutation UPDATE_CHAT_MUTATION($id: String!, $link_clicks: Int) {
    updateChat(id: $id, link_clicks: $link_clicks) {
      id
    }
  }
`;

const Buttons = styled.div`
  margin-bottom: 20px;
`;

const Styles = styled.div`
  width: 570px;
  margin: 20px 0;
  font-weight: 500;
  margin-bottom: 100px;
  display: flex;
  flex-direction: column;
  img {
    display: block;
    width: 100%;
    max-height: 50em;
    box-shadow: "0 0 0 2px blue;";
  }
  .video {
    height: 489px;
    width: 275px;
    iframe {
      width: 100%;
      border: none;
      height: 100%;
      border-radius: 15px;
    }
  }
  table {
    width: 100%;
    border: 1px solid #edefed;
    border-collapse: collapse;
    tr {
      border: 1px solid #d0d0d0;
      line-height: 1.6;
      vertical-align: text-top;
    }
    thead {
      background: #f5f5f5;
      font-weight: bold;
      vertical-align: text-top;
      line-height: 1.6;
    }
    thead th {
      padding: 20px 0px;
    }
    th {
      border: 1px solid #d0d0d0;
    }
    td {
      border: 1px solid #d0d0d0;
      border-top: none;
      border-bottom: none;
      border-right: none;
      padding: 0% 2.5%;
      position: relative;
      width: 5%;
      padding: 10px 10px;
    }
  }
  a {
    border-bottom: 2px solid #26ba8d;
    padding: 0%;
    transition: 0.3s;
    cursor: pointer;
  }
  @media (max-width: 800px) {
    width: 100%;
    font-size: 1.6rem;
    .video {
      height: 356px;
      width: 200px;
    }
  }
`;

const ArrowBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .arrow_box {
    cursor: pointer;
    padding: 10px 2%;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    transition: 0.5s;
    &:hover {
      background: #dde1f8;
    }
  }
  .arrow {
    width: 25px;
  }
`;

const Chat = (props) => {
  const {
    name,
    messages,
    me,
    story,
    lessonId,
    id,
    author,
    getData,
    library,
    type,
    previousStories,
  } = props;
  const [update, setUpdate] = useState(false);
  const [num, setNum] = useState(1);
  const [moved, setMoved] = useState(false);
  const [clicks, setClicks] = useState(props.clicks);

  const chatRef = useRef(null);
  const { t } = useTranslation("lesson");
  const [updateChat, { data, loading, error }] =
    useMutation(UPDATE_CHAT_MUTATION);

  const getResult = (data) => {
    props.getResult(data);
  };

  const switchUpdate = () => {
    setUpdate(!update);
  };

  const push = () => {
    if (moved == false) {
      props.getData(props.next ? [true, props.next.true] : [true, undefined]);
    }
    setMoved(true);
  };

  const passNum = (num) => {
    setNum(num);
  };

  // const detectKeyDown = (e) => {
  //   if (e.key === "n") {
  //     setNum((num) => num + 1);
  //   } else if (e.key === "b") {
  //     setNum((num) => num - 1);
  //   } else if (e.key === "s") {
  //     setShowButton((showButton) => !showButton);
  //   }
  // };

  let width;
  if (props.problem) {
    width = "50%";
  } else if (props.story) {
    width = "50%";
  } else {
    width = "90%";
  }
  return (
    <Styles
      id={id}
      width={width}
      ref={chatRef}
      onClick={async (e) => {
        if (e.target.className === "button") {
          const res = await updateChat({
            variables: {
              id: id,
              link_clicks: clicks + 1,
            },
          });
          setClicks(clicks + 1);
        }
      }}
    >
      <Buttons>
        {me && !story && (
          <>
            <SecondaryButton onClick={(e) => setUpdate(!update)}>
              {!update ? t("update") : "Back"}
            </SecondaryButton>
            <DeleteChat me={me.id} chatId={id} lessonId={lessonId} />
          </>
        )}
      </Buttons>
      {!update && (
        <>
          {type == "dynamicchat" ? (
            <DynamicChat
              messages={messages}
              me={me}
              lessonId={lessonId}
              id={id}
              author={author}
              library={library}
              isSecret={props.isSecret}
              moveNext={props.moveNext}
              story={story}
              previousStories={previousStories}
            />
          ) : null}
          {type == "voicechat" ? (
            <VoiceChat
              messages={messages}
              me={me}
              lessonId={lessonId}
              id={id}
              author={author}
              library={library}
              isSecret={props.isSecret}
              moveNext={props.moveNext}
              story={story}
              previousStories={previousStories}
            />
          ) : null}
          {type == "fixedchat" && (
            <FixedChat
              messages={messages}
              me={me}
              lessonId={lessonId}
              id={id}
              author={author}
              library={library}
              isSecret={props.isSecret}
              moveNext={props.moveNext}
              story={story}
              passNum={passNum}
              // passTextToBeTranslated={passTextToBeTranslated}
            />
          )}
        </>
      )}
      {getData &&
        props.next.true.value &&
        !moved &&
        num == messages.messagesList.length && (
          <ArrowBox>
            <div className="arrow_box" onClick={(e) => push()}>
              <img className="arrow" src="../../static/down-arrow.svg" />
            </div>
          </ArrowBox>
        )}
      {update && (
        <UpdateChat
          id={id}
          name={name}
          me={me}
          type={type}
          isSecret={props.isSecret}
          messages={messages}
          lessonId={lessonId}
          characters={props.characters}
          getResult={getResult}
          switchUpdate={switchUpdate}
        />
      )}
    </Styles>
  );
};

export default Chat;
