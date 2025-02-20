import { useState, useEffect } from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";

import {
  MicroButton,
  Frame,
  MicroSelect,
  Buttons,
} from "../../styles/DevPageStyles";

const Styles = styled.div``;

const Header = styled.div`
  margin: 10px 0;
`;

// const Textarea = styled.textarea`
//   padding: 10px;
//   outline: 0;
//   border: 1px solid #e5e5e5;
//   margin-left: 5px;
//   border-radius: 12px;
//   font-weight: 400;
//   font-size: 1.4rem;
//   font-family: Montserrat;
// `;

const Phrase = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.right ? "row-reverse" : "row")};
  justify-content: space-between;
  margin: 10px 0;
`;

const IconBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 80px;
  margin: 0;
  /* margin: ${(props) => (props.right ? "0 0 0 10px" : "0 10px 0 0 ")}; */
  .mini_select {
    border: 1px solid grey;
    outline: none;
    font-size: 1.2rem;
    cursor: pointer;
    margin-bottom: 10px;
  }
  .icon_section {
  }
  .image_section {
    margin: 10px 0;
  }
  img {
    width: 50px;
    height: 50px;
    border-radius: 50px;
  }
  input {
    width: 100%;
    border: none;
    font-family: Montserrat;
    color: #8f93a3;
    font-size: 1.2rem;
    outline: 0;
    text-align: center;
  }
  .icon {
    margin: 5px;
    border-radius: 50%;
    height: 50px;
    width: 50px;
    border: 2px solid #e5e5e5;
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
  .number {
    cursor: pointer;
    border: 1px solid grey;
    border-radius: 10px;
    display: flex;
    font-size: 1.4rem;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 10px;
    /* height: 25px; */
    /* margin-right: 15px; */
    button {
      border: none;
      cursor: pointer;
      background: none;
      font-size: 1.2rem;
      font-family: Montserrat;
    }
  }
`;

const ReactBlock = styled.div`
  margin: 20px 0;
  padding: 10px 0;
  border-bottom: 1px solid #cacaca;
  width: 80%;
`;

const ToggleContainer = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 50px;
  height: 24px;
  position: relative;
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  display: none;
`;

const Slider = styled.span`
  display: flex;
  align-items: center;
  justify-content: ${({ checked }) => (checked ? "flex-end" : "flex-start")};
  width: 100%;
  height: 100%;
  background-color: ${({ checked }) => (checked ? "#3F50B5" : "#3F50B5")};
  border-radius: 30px;
  padding: 4px;
  transition: all 0.3s ease-in-out;

  &::after {
    content: "";
    width: 16px;
    height: 16px;
    background-color: white;
    border-radius: 50%;
    transition: transform 0.3s ease-in-out;
    transform: ${({ checked }) =>
      checked ? "translateX(0px)" : "translateX(0px)"};
  }
`;

const DynamicHoverEditor = dynamic(import("../../../editor/HoverEditor"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const UpdateMessage = (props) => {
  const { characters } = props;
  const { t } = useTranslation("lesson");

  const [message, setMessage] = useState({
    author: props.author?.toLowerCase() || "author",
    name: props.name || (props.author === "author" ? "author" : "student"),
    text: props.text,
    reactions: props.reactions || [],
    image: props.image,
    isAiAssistantOn: props.isAiAssistantOn || false,
  });
  console.log("message", message);

  let isChecked = message.author === "author";

  useEffect(() => {
    setMessage({
      author: props.author?.toLowerCase() || "author",
      name: props.name || (props.author === "author" ? "author" : "student"),
      text: props.text,
      reactions: props.reactions || [],
      image: props.image,
      isAiAssistantOn: props.isAiAssistantOn || false,
    });
  }, [
    props.text,
    props.author,
    props.name,
    props.reactions,
    props.image,
    props.isAiAssistantOn,
  ]);

  const updateMessage = (fields) => {
    const updatedMessage = {
      ...message,
      ...fields, // Update multiple fields simultaneously
    };
    setMessage(updatedMessage);
    props.passUpdatedMessage(updatedMessage, props.index);
  };

  const updateReaction = (index, field, value) => {
    const updatedReactions = [...message.reactions];
    updatedReactions[index] = {
      ...updatedReactions[index],
      [field]: value,
    };
    updateMessage({ reactions: updatedReactions });
  };

  return (
    <Styles>
      <Phrase right={message.author === "author"}>
        <IconBlock right={message.author === "author"}>
          <ToggleContainer>
            <HiddenCheckbox
              checked={isChecked}
              onChange={() =>
                updateMessage({ author: isChecked ? "student" : "author" })
              }
            />
            <Slider checked={isChecked}>
              {/* {isChecked ? t("right") : t("left")} */}
            </Slider>
          </ToggleContainer>
          {/* Name Input */}
          <div className="image_section">
            {message?.image ? (
              <img src={message?.image} />
            ) : (
              <div className="icon">
                {message.name[0].toUpperCase() + message.name[1].toUpperCase()}
              </div>
            )}
          </div>
          <div className="icon_section">
            <input
              value={message.name}
              onChange={(e) => updateMessage({ name: e.target.value })}
            />
          </div>
        </IconBlock>
        <Frame width="85%">
          <DynamicHoverEditor
            index={props.index}
            name="text"
            getEditorText={(value) => updateMessage({ text: value })}
            placeholder="Message"
            value={message.text}
          />
        </Frame>

        {/* Textarea for Text */}
        {/* <Textarea
          id="summary"
          placeholder="Description"
          value={message.text}
          onChange={(e) => updateMessage({ text: e.target.value })}
        /> */}
      </Phrase>

      {/* Reactions Management */}
      <Buttons margin="0 0 40px 0" gap="10px">
        {message.author !== "student" ? (
          <>
            <MicroButton
              onClick={() => {
                const updatedReactions = message.reactions.slice(0, -1);
                updateMessage({ reactions: updatedReactions });
              }}
            >
              -1 {t("reaction")}
            </MicroButton>
            <MicroButton
              onClick={() => {
                const updatedReactions = [
                  ...message.reactions,
                  { reaction: "", comment: "" },
                ];
                updateMessage({ reactions: updatedReactions });
              }}
            >
              +1 {t("reaction")}
            </MicroButton>
          </>
        ) : null}
        <MicroButton
          onClick={() => {
            const link = prompt("Image link: ", message.image || "");
            if (link) updateMessage({ image: link });
          }}
        >
          {/* {t("image")} */}
          Change image
        </MicroButton>
        <MicroSelect
          value={message.name}
          onChange={(e) => {
            if (e.target.value === "author" || e.target.value === "student") {
              updateMessage({ name: e.target.value, image: null });
            } else {
              const character = characters.find(
                (character) => character.name === e.target.value
              );
              if (character) {
                updateMessage({
                  name: character.name,
                  image: character.image,
                });
              }
            }
          }}
        >
          <option value="author">author</option>
          <option value="student">student</option>
          {characters &&
            characters?.map((character, index) => (
              <option key={index} value={character.name}>
                {character.name}
              </option>
            ))}
        </MicroSelect>
      </Buttons>

      {/* Display Reactions */}
      {message.reactions.length > 0 &&
        message.reactions.map((r, i) => (
          <ReactBlock key={i}>
            <Header>
              {t("reaction")} № {i + 1}
            </Header>
            <Phrase>
              <IconBlock>
                <div className="icon">ST</div>
              </IconBlock>
              <Frame>
                <DynamicHoverEditor
                  index={i}
                  name="reaction"
                  getEditorText={(value) =>
                    updateReaction(i, "reaction", value)
                  }
                  value={r.reaction}
                />
              </Frame>
            </Phrase>
            <Header>
              {t("response")} № {i + 1}
            </Header>
            <Phrase>
              <IconBlock>
                {message.author === "author" ? (
                  message?.image ? (
                    <img src={message?.image} />
                  ) : (
                    <div className="icon">
                      {message.name[0].toUpperCase() +
                        message.name[1].toUpperCase()}
                    </div>
                  )
                ) : (
                  "ST"
                )}
              </IconBlock>
              <Frame>
                <DynamicHoverEditor
                  index={i}
                  name="comment"
                  getEditorText={(value) => updateReaction(i, "comment", value)}
                  value={r.comment}
                />
              </Frame>
            </Phrase>
          </ReactBlock>
        ))}
    </Styles>
  );
};

export default UpdateMessage;
