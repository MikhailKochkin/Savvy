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

const IconBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 65px;
  margin-right: 10px;
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
  const [author, setAuthor] = useState(props.author);
  const [text, setText] = useState(props.text);

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
        <IconBlock>
          <div className="select_box">
            <select
              value={props.author}
              index={props.index}
              onChange={(e) => updateAuthor(e.target.value)}
            >
              <option value="author">👩🏼‍🏫</option>
              <option value="student">👨🏻‍🎓</option>
              <option value="anya">👩🏻‍💼</option>
              <option value="sasha">🧑🏻‍💼</option>
              <option value="james">🧑🏾‍💼</option>
              <option value="mary">👩🏾‍💼</option>
            </select>
          </div>
          <div className="name">{author}</div>
        </IconBlock>
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
