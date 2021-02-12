import { useState } from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";

const Styles = styled.div`
  margin-top: 5%;
  padding: 0% 0;
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

const DynamicHoverEditor = dynamic(import("../../editor/HoverEditor"), {
  loading: () => <p>Загрузка...</p>,
  ssr: false,
});

const CreateMessage = (props) => {
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");

  const myCallback2 = (dataFromChild) => {
    setText(dataFromChild);
  };

  const add = () => {
    props.getMessage({
      number: props.index,
      author,
      text,
      image: "",
    });
  };

  return (
    <Styles>
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
        />
      </Frame>
      <button onClick={(e) => add()}>Добавить</button>
    </Styles>
  );
};

export default CreateMessage;
