import { useState } from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import _ from "lodash";
import { useTranslation } from "next-i18next";

const Styles = styled.div`
  margin-top: 1%;
  padding: 0;
  #title {
    font-size: 2rem;
    margin-bottom: 2%;
  }
  border-right: ${(props) =>
    props.added ? "2px solid green" : "1px solid white"};
`;

const MainFrame = styled.div`
  height: 60%;
  width: 80%;
  margin-bottom: 15px;
  border: 1px solid #8d99ae;
  border-radius: 3.5px;
  padding-left: 1%;
  font-size: 1.6rem;
  outline: 0;
  p {
    margin-left: 0.6%;
  }
`;

const Frame = styled.div`
  height: 60%;
  width: 80%;
  margin-bottom: 15px;
  border: 1px solid #e5e5e5;
  border-radius: 3.5px;
  padding-left: 1%;
  font-size: 1.6rem;
  outline: 0;
  p {
    margin-left: 0.6%;
  }
`;

const IconBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 65px;
  margin-right: 10px;
  .mini_select {
    border: 1px solid grey;
    outline: none;
    font-size: 1.2rem;
    cursor: pointer;
    margin-bottom: 10px;
  }
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
  .icon2 {
    margin: 5px;
    border-radius: 50%;
    background: #cb2d3e; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      #ef473a,
      #cb2d3e
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      #ef473a,
      #cb2d3e
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

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
  }
  .name {
    font-size: 1.2rem;
    text-align: center;
    color: #8f93a3;
    max-width: 80px;
    margin: 0 7px;
    input {
      width: 50px;
      border: none;
      font-family: Montserrat;
      color: #8f93a3;
      font-size: 1.2rem;
      outline: 0;
    }
  }
`;

const ReactBlock = styled.div`
  margin: 20px 0;
  padding: 10px 0;
  border-bottom: 1px solid #cacaca;
  width: 80%;
`;

const Header = styled.div`
  margin: 10px 0;
`;

const Phrase = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  margin-top: 0px;
  .select_box {
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: #fff;
    border: 1px solid #e5e5e5;
    width: 45px;
    height: 45px;
    font-size: 2rem;
    select {
      border: none;
      outline: none;
      font-size: 2rem;
      font-weight: bold;
      cursor: pointer;
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
  padding-bottom: 20px;
  border-bottom: 1px solid #cacaca;
  .number {
    cursor: pointer;
    border: 1px solid grey;
    border-radius: 10px;
    display: flex;
    font-size: 1.4rem;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 110px;
    height: 25px;
    margin-right: 15px;
    button {
      border: none;
      cursor: pointer;
      background: none;
      font-size: 1.2rem;
      font-family: Montserrat;
    }
  }
`;

const DynamicHoverEditor = dynamic(import("../../../editor/HoverEditor"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const CreateMessage = (props) => {
  const { m, characters } = props;
  const { t } = useTranslation("lesson");

  const [message, setMessage] = useState({
    author: m?.author?.toLowerCase() || "author",
    name: m?.name || "",
    text: m?.text || "",
    reactions: m?.reactions || [],
    image: m?.image || "",
  });

  const updateMessage = (fields) => {
    const updatedMessage = {
      ...message,
      ...fields,
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
      <Phrase>
        <IconBlock>
          {/* Author Selection */}
          <select
            className="mini_select"
            value={message.author}
            onChange={(e) => updateMessage({ author: e.target.value })}
          >
            <option value={"student"}>{t("left")}</option>
            <option value={"author"}>{t("right")}</option>
          </select>
          {/* Author and Name Selection */}
          <div className="select_box">
            <select
              value={message.name}
              onChange={(e) => {
                if (
                  e.target.value === "author" ||
                  e.target.value === "student"
                ) {
                  updateMessage({ name: e.target.value });
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
              <option value="author">👩🏼‍🏫</option>
              <option value="student">👨🏻‍🎓</option>
              {characters?.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name[0].toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          <div className="name">
            <input
              onChange={(e) => updateMessage({ name: e.target.value })}
              value={message.name}
            />
          </div>
        </IconBlock>

        {/* Text Editor */}
        <MainFrame>
          <DynamicHoverEditor
            index={props.index}
            name="text"
            getEditorText={(value) => updateMessage({ text: value })}
            placeholder="Message"
            value={message.text}
          />
        </MainFrame>
      </Phrase>

      {/* Buttons for Image and Reactions */}
      <Buttons>
        <div className="number">
          <button
            onClick={() => {
              const link = prompt("Image link: ");
              if (link) {
                updateMessage({ image: link });
              }
            }}
          >
            {message.image ? "Change image" : "Add image"}
          </button>
        </div>
        <div className="number">
          <button
            onClick={() => {
              const updatedReactions = message.reactions.slice(0, -1);
              updateMessage({ reactions: updatedReactions });
            }}
          >
            -1 {t("reaction")}
          </button>
        </div>
        <div className="number">
          <button
            onClick={() => {
              const updatedReactions = [
                ...message.reactions,
                { reaction: "", comment: "" },
              ];
              updateMessage({ reactions: updatedReactions });
            }}
          >
            +1 {t("reaction")}
          </button>
        </div>
      </Buttons>

      {/* Reactions */}
      {message.reactions.map((r, i) => (
        <ReactBlock key={i}>
          <Header>
            {t("reaction")} № {i + 1}
          </Header>
          <Phrase>
            <IconBlock>
              <div className="select_box">
                {message.author === "author" ? "👨🏻‍🎓" : "👩🏼‍🏫"}
              </div>
            </IconBlock>
            <Frame>
              <DynamicHoverEditor
                index={i}
                name="reaction"
                getEditorText={(value) => updateReaction(i, "reaction", value)}
                value={r.reaction}
              />
            </Frame>
          </Phrase>

          <Header>
            {t("response")} № {i + 1}
          </Header>
          <Phrase>
            <IconBlock>
              <div className="select_box">
                {message.author === "author" ? "👩🏼‍🏫" : "👨🏻‍🎓"}
              </div>
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

export default CreateMessage;
