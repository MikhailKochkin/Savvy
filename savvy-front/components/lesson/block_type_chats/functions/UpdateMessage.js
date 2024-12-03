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
  select {
    border: none;
    outline: none;
    font-size: 2rem;
    font-weight: bold;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background: #fff;
    border: 1px solid #e5e5e5;
    width: 50px;
    height: 50px;
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
  const [author, setAuthor] = useState(props.author.toLowerCase() || "author");
  const [name, setName] = useState(
    props.name || (props.author === "author" ? "author" : "student")
  );
  const [text, setText] = useState(props.text);
  const [reactions, setReactions] = useState(props.reactions);
  const [image, setImage] = useState(props.image);
  const [isAiAssistantOn, setIsAiAssistantOn] = useState(
    props.isAiAssistantOn ? props.isAiAssistantOn : false
  );

  useEffect(() => {
    setText(props.text);
    setAuthor(props.author.toLowerCase() || "author");
    setName(props.name || (props.author === "author" ? "author" : "student"));
    setReactions(props.reactions);
    setImage(props.image);
    setIsAiAssistantOn(props.isAiAssistantOn || false);
  }, [
    props.text,
    props.author,
    props.name,
    props.reactions,
    props.image,
    props.isAiAssistantOn,
  ]);

  const updateField = (field, value) => {
    if (field === "text") {
      setText(value);
      props.updateText(value, props.index);
    } else if (field === "author") {
      setAuthor(value);
      setName(value);
      props.updateAuthor(value, props.index);
    } else if (field === "name") {
      setName(value);
      props.updateName(value, props.index);
    } else if (field === "image") {
      setImage(value);
      props.updateImage(value, props.index);
    } else if (field === "AiAssistant") {
      setIsAiAssistantOn(!isAiAssistantOn);
      props.updateAiAssistant(!isAiAssistantOn, props.index);
    }
  };

  const updateReaction = (index, field, value) => {
    const updatedReactions = [...reactions];
    updatedReactions[index] = { ...updatedReactions[index], [field]: value };
    setReactions(updatedReactions);
    props.updateReaction(updatedReactions, props.index);
  };

  return (
    <Styles>
      <Phrase>
        <IconBlock>
          <select
            value={author}
            onChange={(e) => updateField("author", e.target.value)}
          >
            <option value="author">👩🏼‍🏫</option>
            <option value="student">👨🏻‍🎓</option>
          </select>
          <input
            value={name}
            onChange={(e) => updateField("name", e.target.value)}
          />
          <MicroButton
            onClick={() => {
              const link = prompt("Image link: ");
              if (link) updateField("image", link);
            }}
          >
            Image
          </MicroButton>
        </IconBlock>
        <Frame>
          <DynamicHoverEditor
            index={props.index}
            name="text"
            getEditorText={(value) => updateField("text", value)}
            placeholder="Message"
            value={text}
          />
        </Frame>
        <Textarea
          id="summary"
          placeholder="Description"
          value={text}
          onChange={(e) => updateField("text", e.target.value)}
        />
      </Phrase>
      <Buttons>
        <MicroButton
          onClick={() => {
            const updatedReactions = reactions.slice(0, -1);
            setReactions(updatedReactions);
            props.updateReaction(updatedReactions, props.index);
          }}
        >
          -1 reaction
        </MicroButton>
        <MicroButton
          onClick={() => {
            const updatedReactions = [
              ...reactions,
              { reaction: "", comment: "" },
            ];
            setReactions(updatedReactions);
            props.updateReaction(updatedReactions, props.index);
          }}
        >
          +1 reaction
        </MicroButton>
        {/* <MicroButton onClick={(e) => updateField("AiAssistant")}>
          {isAiAssistantOn ? "Turn off AI assistant" : "Turn on AI assistant"}
        </MicroButton> */}
      </Buttons>
      {reactions &&
        reactions.length > 0 &&
        reactions.map((r, i) => (
          <ReactBlock key={i}>
            <Header>Reaction № {i + 1}</Header>
            <Phrase>
              <IconBlock>{author === "author" ? "👨🏻‍🎓" : "👩🏼‍🏫"}</IconBlock>
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
              <IconBlock>{author === "author" ? "👩🏼‍🏫" : "👨🏻‍🎓"}</IconBlock>
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
