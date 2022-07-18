import { useState } from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import _ from "lodash";

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

const ReactBlock = styled.div`
  margin: 20px 0;
  padding: 10px 0;
  border-bottom: 1px solid #cacaca;
  width: 80%;
  border-right: ${(props) =>
    props.saved ? "2px solid #29AB87" : "1px solid white"};
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

const CreateMessage = (props) => {
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [reactions, setReactions] = useState([]);
  const [reactionsNum, setReactionsNum] = useState(0);
  const [reaction, setReaction] = useState("");
  const [comment, setComment] = useState("");
  const [isAdded, setIsAdded] = useState(false);

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
  //   props.getMessage({
  //     number: props.index,
  //     author,
  //     text,
  //     image: "",
  //     reactions,
  //   });
  //   // setIsAdded(true);
  // };

  const addReaction = (index) => {
    let obj = {
      reaction: reaction,
      comment: comment,
    };
    let arr = [...reactions];
    arr[index] = obj;
    setReactions(arr);
    setReaction("");
    setComment("");
  };
  return (
    <Styles added={isAdded}>
      {/* <div>{props.index}.</div> */}
      <Phrase>
        <div className="select_box">
          <select
            value={author}
            index={props.index}
            onChange={(e) => updateAuthor(e.target.value)}
          >
            <option value="author">👩🏼‍🏫</option>
            <option value="student">👨🏻‍🎓</option>
          </select>
        </div>
        <Frame>
          <DynamicHoverEditor
            index={props.index}
            name="text"
            getEditorText={myCallback2}
            placeholder="Фраза"
            value={props.text}
          />
        </Frame>
      </Phrase>
      {_.times(reactionsNum, (i) => (
        <ReactBlock saved={reactions[i] !== "" && reactions[i] !== undefined}>
          <Header>Реакция № {i + 1}</Header>
          <Phrase>
            <div className="select_box">{author == "author" ? "👨🏻‍🎓" : "👩🏼‍🏫"}</div>
            <Frame>
              <DynamicHoverEditor
                index={i}
                name="reaction"
                getEditorText={myCallback2}
                value={""}
              />
            </Frame>
          </Phrase>
          <br />

          <Header>Ответ на реакцию № {i + 1}</Header>
          <Phrase>
            <div className="select_box">{author == "author" ? "👩🏼‍🏫" : "👨🏻‍🎓"}</div>
            <Frame>
              <DynamicHoverEditor
                index={i}
                name="comment"
                getEditorText={myCallback2}
                value={""}
              />
            </Frame>
          </Phrase>

          <button onClick={(e) => addReaction(i)}>Сохранить реакцию</button>
          {/* <button onClick={(e) => setReactions([])}>Убрать реакции</button> */}
        </ReactBlock>
      ))}
      <Buttons>
        {/* <button onClick={(e) => add()}>Сохранить фразу</button> */}
        {/* <button
          className="but"
          onClick={(e) => {
            setReactionsNum(reactionsNum + 1);
            setReactions([...reactions, ""]);
          }}
        >
          Добавить реакции
        </button> */}
        {reactionsNum > 0 && (
          <button
            className="but"
            onClick={(e) => {
              setReactionsNum(0);
              setReactions([""]);
            }}
          >
            Убрать реакции
          </button>
        )}
      </Buttons>
    </Styles>
  );
};

export default CreateMessage;
