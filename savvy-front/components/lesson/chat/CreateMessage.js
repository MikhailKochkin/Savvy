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
      fon-weight: bold;
      cursor: pointer;
    }
  }
`;

// const Buttons = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   width: 75%;

//   .but {
//     border: none;
//     background: none;
//     font-family: Montserrat;
//     font-size: 1.4rem;
//     font-style: italic;
//     &:hover {
//       text-decoration: underline;
//     }
//   }
// `;

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

const DynamicHoverEditor = dynamic(import("../../editor/HoverEditor"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const CreateMessage = (props) => {
  const { message } = props;

  const [author, setAuthor] = useState(
    message?.author?.toLowerCase() ? message.author.toLowerCase() : "author"
  );
  const [name, setName] = useState();
  const [text, setText] = useState(message?.text ? message.text : "");
  const [reactions, setReactions] = useState([]);
  const [image, setImage] = useState("");

  const myCallback2 = (dataFromChild, name, index) => {
    if (name == "text") {
      setText(dataFromChild);
      props.updateText(dataFromChild, props.index);
    }
  };

  const myCallback3 = (dataFromChild, name, index) => {
    let new_reactions = [...reactions];
    new_reactions[index][name] = dataFromChild;
    setReactions(new_reactions);
    props.updateReaction(reactions, props.index);
  };

  const updateAuthor = (val) => {
    setAuthor(val);
    setName(val);
    props.updateAuthor(val, props.index);
  };

  return (
    <Styles>
      <Phrase>
        <IconBlock>
          <div className="select_box">
            <select
              value={author}
              index={props.index}
              defaultValue={message?.author?.toLowerCase()}
              onChange={(e) => {
                e.preventDefault();
                updateAuthor(e.target.value);
                setName(e.target.value);
              }}
            >
              <option value="author">👩🏼‍🏫</option>
              <option value="student">👨🏻‍🎓</option>
            </select>
          </div>
          <div className="name">
            <input
              onChange={(e) => {
                setName(e.target.value);
                props.updateName(e.target.value, props.index);
              }}
              defaultValue={name}
            />
          </div>
        </IconBlock>
        <MainFrame>
          <DynamicHoverEditor
            index={props.index}
            name="text"
            getEditorText={myCallback2}
            placeholder="Message"
            value={text}
          />
        </MainFrame>
      </Phrase>
      <Buttons>
        <div className="number">
          <button
            onClick={(e) => {
              let link = prompt("Image link: ");
              if (link) {
                setImage(link);
                props.updateImage(link, props.index);
              }
            }}
          >
            Add image
          </button>
        </div>
        <div className="number">
          <button
            onClick={(e) => {
              let new_reactions = [...reactions];
              let popped = new_reactions.pop();
              setReactions([...new_reactions]);
              props.updateReaction([...new_reactions], props.index);
            }}
          >
            -1 reaction
          </button>
        </div>
        <div className="number">
          <button
            onClick={(e) => {
              setReactions([
                ...reactions,
                {
                  reaction: "",
                  comment: "",
                },
              ]);
              props.updateReaction(
                [
                  ...reactions,
                  {
                    reaction: "",
                    comment: "",
                  },
                ],
                props.index
              );
            }}
          >
            +1 reaction
          </button>
        </div>
      </Buttons>
      {reactions.map((r, i) => (
        <ReactBlock>
          <Header>Reaction № {i + 1}</Header>
          <Phrase>
            <IconBlock>
              <div className="select_box">
                {author == "author" ? "👨🏻‍🎓" : "👩🏼‍🏫"}
              </div>
            </IconBlock>
            <Frame>
              <DynamicHoverEditor
                index={i}
                name="reaction"
                getEditorText={myCallback3}
                value={r.reaction}
              />
            </Frame>
          </Phrase>

          <Header>Response № {i + 1}</Header>
          <Phrase>
            <IconBlock>
              <div className="select_box">
                {author == "author" ? "👩🏼‍🏫" : "👨🏻‍🎓"}
              </div>
            </IconBlock>
            <Frame>
              <DynamicHoverEditor
                index={i}
                name="comment"
                getEditorText={myCallback3}
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
