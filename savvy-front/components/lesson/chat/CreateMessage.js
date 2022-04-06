import { useState } from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import { isGeneratorFunction } from "regenerator-runtime";

const Styles = styled.div`
  margin-top: 5%;
  padding: 0% 0;
  #title {
    font-size: 2rem;
    margin-bottom: 2%;
  }
  border-right: ${(props) =>
    props.added ? "2px solid green" : "1px solid white"};
`;

const Frame = styled.div`
  height: 60%;
  width: 70%;
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
    } else if (name == "reaction") {
      setReaction(dataFromChild);
    } else if (name == "comment") {
      setComment(dataFromChild);
    }
  };

  const add = () => {
    props.getMessage({
      number: props.index,
      author,
      text,
      image: "",
      reactions,
    });
    setIsAdded(true);
  };

  const addReaction = (index) => {
    let obj = {
      reaction: reaction,
      comment: comment,
    };
    let arr = [...reactions];
    arr[index] = obj;
    console.log("index", arr[index]);
    setReactions(arr);
    setReaction("");
    setComment("");
  };
  return (
    <Styles added={isAdded}>
      <div>{props.index}.</div>
      <select value={author} onChange={(e) => setAuthor(e.target.value)}>
        <option value="NAN">Автор реплики</option>
        <option value="student">Студент</option>
        <option value="author">Преподаватель</option>
      </select>
      <Frame>
        <DynamicHoverEditor
          index={1}
          name="text"
          getEditorText={myCallback2}
          placeholder="Фраза"
          value={props.text}
        />
      </Frame>
      {_.times(reactionsNum, (i) => (
        <ReactBlock saved={reactions[i] !== "" && reactions[i] !== undefined}>
          <div>Рекция № {i + 1} на реплику</div>

          <Frame>
            <DynamicHoverEditor
              index={i}
              name="reaction"
              getEditorText={myCallback2}
              value={""}
            />
          </Frame>
          <br />
          <div>Ответ на реакцию № {i + 1}</div>

          <Frame>
            <DynamicHoverEditor
              index={i}
              name="comment"
              getEditorText={myCallback2}
              value={""}
            />
          </Frame>
          <button onClick={(e) => addReaction(i)}>Сохранить реакцию</button>
          <button onClick={(e) => setReactions([])}>Убрать реакции</button>
        </ReactBlock>
      ))}
      <button
        className="but"
        onClick={(e) => {
          setReactionsNum(reactionsNum + 1);
          setReactions([...reactions, ""]);
        }}
      >
        +1 реакция
      </button>
      <button onClick={(e) => add()}>Сохранить реплику</button>
    </Styles>
  );
};

export default CreateMessage;
