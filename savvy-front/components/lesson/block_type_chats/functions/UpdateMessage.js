import { useState, useEffect } from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { MicroButton, Frame } from "../../styles/DevPageStyles";

const Styles = styled.div`
  margin-top: 1%;
  padding: 0;
  #title {
    font-size: 2rem;
    margin-bottom: 2%;
  }
`;

const Header = styled.div`
  margin: 10px 0;
`;

const Textarea = styled.textarea`
  padding: 10px;
  outline: 0;
  border: 1px solid #e5e5e5;
  margin-left: 5px;
  border-radius: 12px;
  font-weight: 400;
  font-size: 1.4rem;
  font-family: Montserrat;
`;

const ReactBlock = styled.div`
  margin: 20px 0;
  padding: 10px 0;
  border-bottom: 1px solid #cacaca;
  width: 80%;
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
  input {
    width: 50px;
    border: none;
    font-family: Montserrat;
    color: #8f93a3;
    font-size: 1.2rem;
    outline: 0;
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

const Phrase = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  margin-top: 0px;
  .select_box {
    border-radius: 50%;
    overflow: hidden;
    background: #fff;
    border: 1px solid #e5e5e5;
    width: 50px;
    height: 50px;
    font-size: 2rem;
    border: none;
    outline: none;
    font-size: 2rem;
    font-weight: bold;
    cursor: pointer;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
  padding-bottom: 20px;
  button {
    margin-right: 15px;
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

const UpdateMessage = (props) => {
  const { characters } = props;

  const [message, setMessage] = useState({
    author: props.author?.toLowerCase() || "author",
    name: props.name || (props.author === "author" ? "author" : "student"),
    text: props.text,
    reactions: props.reactions || [],
    image: props.image,
    isAiAssistantOn: props.isAiAssistantOn || false,
  });

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
      <Phrase>
        <IconBlock>
          {/* Author Selection */}
          <select
            className="mini_select"
            value={message.author}
            onChange={(e) => updateMessage({ author: e.target.value })}
          >
            <option value={"student"}>Left</option>
            <option value={"author"}>Right</option>
          </select>

          {/* Name and Image Selection */}
          <select
            className="select_box"
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
            <option value="author">👩🏼‍🏫</option>
            <option value="student">👨🏻‍🎓</option>
            {characters &&
              characters?.map((character, index) => (
                <option key={index} value={character.name}>
                  {character.name[0].toUpperCase()}
                </option>
              ))}
          </select>

          {/* Name Input */}
          <input
            value={message.name}
            onChange={(e) => updateMessage({ name: e.target.value })}
          />

          {/* Image Input */}
          <MicroButton
            onClick={() => {
              const link = prompt("Image link: ", message.image || "");
              if (link) updateMessage({ image: link });
            }}
          >
            Image
          </MicroButton>
        </IconBlock>

        {/* Text Editor */}
        <Frame>
          <DynamicHoverEditor
            index={props.index}
            name="text"
            getEditorText={(value) => updateMessage({ text: value })}
            placeholder="Message"
            value={message.text}
          />
        </Frame>

        {/* Textarea for Text */}
        <Textarea
          id="summary"
          placeholder="Description"
          value={message.text}
          onChange={(e) => updateMessage({ text: e.target.value })}
        />
      </Phrase>

      {/* Reactions Management */}
      <Buttons>
        <MicroButton
          onClick={() => {
            const updatedReactions = message.reactions.slice(0, -1);
            updateMessage({ reactions: updatedReactions });
          }}
        >
          -1 reaction
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
          +1 reaction
        </MicroButton>
      </Buttons>

      {/* Display Reactions */}
      {message.reactions.length > 0 &&
        message.reactions.map((r, i) => (
          <ReactBlock key={i}>
            <Header>Reaction № {i + 1}</Header>
            <Phrase>
              <IconBlock>{message.author === "author" ? "👨🏻‍🎓" : "👩🏼‍🏫"}</IconBlock>
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
            <Header>Response № {i + 1}</Header>
            <Phrase>
              <IconBlock>{message.author === "author" ? "👩🏼‍🏫" : "👨🏻‍🎓"}</IconBlock>
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
