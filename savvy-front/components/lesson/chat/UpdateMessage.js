import { useState } from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";

const Styles = styled.div`
  margin-top: 1%;
  padding: 0;
  #title {
    font-size: 2rem;
    margin-bottom: 2%;
  }
`;

const Frame = styled.div`
  height: 60%;
  width: 100%;
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
    width: 50px;
    height: 50px;
    margin-right: 10px;
    font-size: 2rem;
    select {
      border: none;
      outline: none;
      font-size: 2rem;
      fon-weight: bold;
      cursor: pointer;
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 75%;

  .but {
    border: none;
    background: none;
    font-family: Montserrat;
    font-size: 1.4rem;
    font-style: italic;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const DynamicHoverEditor = dynamic(import("../../editor/HoverEditor"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const UpdateMessage = (props) => {
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");

  const myCallback2 = (dataFromChild, name) => {
    if (name == "text") {
      setText(dataFromChild);
      props.updateText(dataFromChild, props.index);
    } else if (name == "reaction") {
      setReaction(dataFromChild);
    } else if (name == "comment") {
      setComment(dataFromChild);
    }
  };

  const updateAuthor = (val) => {
    setAuthor(val);
    props.updateAuthor(val, props.index);
  };

  // const add = () => {
  //   console.log(text);
  //   props.getMessage({
  //     number: props.index,
  //     author,
  //     text,
  //     image: "",
  //   });
  // };
  return (
    <Styles>
      {/* <div>{props.index}.</div> */}
      <Phrase>
        <div className="select_box">
          <select
            value={props.author}
            index={props.index}
            onChange={(e) => updateAuthor(e.target.value)}
          >
            <option value="author">👩🏼‍🏫</option>
            <option value="student">👨🏻‍🎓</option>
          </select>
        </div>
        <br />

        <Frame>
          <DynamicHoverEditor
            index={props.index}
            name="text"
            getEditorText={myCallback2}
            placeholder="Message"
            value={props.text}
          />
        </Frame>
        {/* <textarea onChange={(e) => setText(e.target.value)}>
          {props.text}
        </textarea> */}
      </Phrase>

      {/* <Buttons>

            </Buttons> */}
    </Styles>
  );
};

export default UpdateMessage;
