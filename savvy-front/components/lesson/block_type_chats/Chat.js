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
import { SecondaryButton, Buttons } from "../styles/DevPageStyles";

const UPDATE_CHAT_MUTATION = gql`
  mutation UPDATE_CHAT_MUTATION($id: String!, $link_clicks: Int) {
    updateChat(id: $id, link_clicks: $link_clicks) {
      id
    }
  }
`;

const Styles = styled.div`
  width: 570px;
  /* margin: 20px 0; */
  font-weight: 500;
  /* margin-bottom: 100px; */
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
    width: 95%;
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
  // Local state management
  const [isUpdateModeOn, setIsUpdateModeOn] = useState(false);
  const [num, setNum] = useState(1);
  const [moved, setMoved] = useState(false);
  const [clicks, setClicks] = useState(props.clicks);

  // Refs, translations, and mutations
  const chatRef = useRef(null);
  const { t } = useTranslation("lesson");
  const [updateChat] = useMutation(UPDATE_CHAT_MUTATION);

  // Destructure props here as you prefer
  const {
    name,
    messages,
    me,
    story,
    lessonId,
    id,
    author,
    pushNextElementToProblem,
    library,
    type,
    previousStories,
    may_i_edit,
    next,
    isSecret,
    moveNext,
    characters,
    problem,
    getResult,
  } = props;

  // Determine chat box width based on context (problem view, story view, or general)
  const width = problem || story ? "50%" : "90%";

  // Toggle update/edit mode
  const toggleUpdate = () => setIsUpdateModeOn((prev) => !prev);

  // Push the next element to the problem flow
  const handlePushNextElementToProblem = () => {
    if (!moved) {
      pushNextElementToProblem(next ? [true, next.true] : [true, undefined]);
      setMoved(true);
    }
  };

  // Pass number (progress in `FixedChat`)
  const handlePassNum = (value) => setNum(value);

  // Track link clicks (e.g., on buttons within the chat)
  const handleClickTracking = async (e) => {
    if (e.target.className === "button") {
      await updateChat({
        variables: { id, link_clicks: clicks + 1 },
      });
      setClicks((prev) => prev + 1);
    }
  };

  const renderChatComponent = () => {
    const commonChatProps = {
      messages,
      me,
      lessonId,
      id,
      characters,
      author,
      library,
      isSecret,
      moveNext,
      story,
      previousStories,
    };

    switch (type?.toLowerCase()) {
      case "dynamicchat":
        return <DynamicChat {...commonChatProps} />;
      case "voicechat":
        return <VoiceChat {...commonChatProps} />;
      default:
        return <FixedChat {...commonChatProps} passNum={handlePassNum} />;
    }
  };

  return (
    <Styles id={id} width={width} ref={chatRef} onClick={handleClickTracking}>
      {/* Admin control buttons (e.g., Update, Delete) */}
      {may_i_edit && (
        <Buttons gap="10px" margin="0 0 20px 0">
          <SecondaryButton onClick={toggleUpdate}>
            {isUpdateModeOn ? t("back") : t("update")}
          </SecondaryButton>
          <DeleteChat me={me.id} chatId={id} lessonId={lessonId} />
        </Buttons>
      )}

      {/* Update/Edit Mode */}
      {!isUpdateModeOn && renderChatComponent()}
      {/* Update/Edit Mode */}
      {isUpdateModeOn && (
        <UpdateChat
          id={id}
          name={name}
          me={me}
          type={type}
          isSecret={isSecret}
          messages={messages}
          lessonId={lessonId}
          characters={characters}
          getResult={getResult}
          switchUpdate={toggleUpdate}
        />
      )}

      {/* Arrow to progress to the next element in the problem flow */}
      {pushNextElementToProblem &&
        next?.true?.value &&
        !moved &&
        num === messages.messagesList.length && (
          <ArrowBox>
            <div className="arrow_box" onClick={handlePushNextElementToProblem}>
              <img
                className="arrow"
                src="../../static/down-arrow.svg"
                alt="Next"
              />
            </div>
          </ArrowBox>
        )}
    </Styles>
  );
};

export default Chat;
