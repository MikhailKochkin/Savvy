import React, { useState } from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import Button from "@material-ui/core/Button";
import renderHTML from "react-render-html";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import UpdateClause from "./UpdateClause";

const Styles = styled.div`
  margin-top: 2%;
  width: ${props => (props.story ? "90%" : "100%")};
`;

const Frame = styled.div`
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  padding: 0 2%;
  margin: 2% 0;
  .com {
    border-top: 1px solid #c4c4c4;
  }
`;

const Comments = styled.div`
  display: ${props => (props.display ? "block" : "none")};
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  margin-bottom: 3%;
  padding: 2% 4%;
  p {
    font-size: 1.8rem;
    font-weight: bold;
  }
  .comment {
    margin: 2% 0;
    border-bottom: 1px solid #c4c4c4;
    padding-bottom: 2%;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  div {
    margin: 1% 0;
    font-size: 1.6rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const Progress = styled.div`
  display: ${props => (props.display ? "flex" : "none")};
  flex-direction: row;
  justify-content: center;
  width: 100%;
  margin: 2% 0 2% 0;
`;

const StyledButton = withStyles({
  root: {
    margin: "1% 0",
    marginRight: "2%",
    fontSize: "1.6rem",
    textTransform: "none"
  }
})(Button);

const DynamicLoadedEditor = dynamic(import("../../editor/HoverEditor"), {
  loading: () => <p>...</p>,
  ssr: false
});

const Clause = props => {
  const [type, setType] = useState("test");
  const [text, setText] = useState("");
  const [show, setShow] = useState(false);
  const [comments, setComments] = useState();
  const [checked, setChecked] = useState(false);
  const [progress, setProgress] = useState(false);

  const myCallback = dataFromChild => {
    setText(dataFromChild);
    props.getText(dataFromChild, props.index);
  };

  const checkAnswer = async e => {
    if (!checked) {
      setProgress(true);
      props.getDraft(text, props.index);
      setShow(true);
      let data = {
        answer: text,
        model: props.sample,
        keywords: props.keywords
      };
      // http://localhost:5000/
      // https://dry-plains-91452.herokuapp.com/
      const r = await fetch("https://dry-plains-91452.herokuapp.com/text", {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(res => {
          console.log(res);
          setComments(res);
          setProgress(false);
        })
        .catch(err => console.log(err));
    } else {
      alert("Вы уже проверили этот пункт!");
    }
    setChecked(true);
  };

  const {
    id,
    index,
    total,
    getNumber,
    commentary,
    keywords,
    story,
    sample
  } = props;
  return (
    <Styles size={story}>
      {type === "test" && (
        <>
          <div>
            {" "}
            Пункт {index}. {renderHTML(commentary)}
          </div>
          <Frame>
            <DynamicLoadedEditor getEditorText={myCallback} />
          </Frame>
          <Comments display={show}>
            <p>Комментарии:</p>
            <Progress display={progress}>
              <CircularProgress />
            </Progress>
            {comments &&
              (comments > 0.65 ? (
                <>
                  <div>
                    Класс, нам кажется, у вас получилось отлично! Двигаемся
                    дальше. Составьте все части документа, чтобы увидеть
                    вариант, составленный автором курса.
                  </div>
                </>
              ) : (
                <>
                  <div>
                    Этот текст еще можно доработать. Опирайтесь на следующие
                    слова / идеи:
                  </div>
                  <div>
                    {keywords.map(el => (
                      <li>{el}</li>
                    ))}
                  </div>
                  <div>
                    Составьте все части документа, чтобы увидеть вариант автора
                    курса.
                  </div>
                </>
              ))}
            {/* {comments.map(com => {
          if (Object.keys(com)[0] === "spellcheck") {
            return Object.values(com)[0].length > 0 ? (
              <>
                <div className="comment">
                  Возможно, вы допустили ошибки в следующих словах:{" "}
                  {Object.values(com)[0].map(el => (
                    <li>{el}</li>
                  ))}
                </div>
              </>
            ) : (
              <div className="comment">Мы не нашли ошибок в словах.</div>
            );
          } else if (Object.keys(com)[0] === "enough_keywords") {
            return Object.values(com)[0] === false ? (
              <>
                <div className="comment">
                  Используйте больше специальных выражений:{" "}
                  {keywords.map(el => (
                    <li>{el}</li>
                  ))}
                </div>
              </>
            ) : (
              <div className="comment">
                Вы используете юридическую лекссику! Молодец!
              </div>
            );
          } else if (Object.keys(com)[0] === "style") {
            return Object.values(com)[0].length > 0 ? (
              <>
                <div className="comment">
                  Обратите внимание на следующие стилистические недостатки:{" "}
                  {Object.values(com)[0].map(el => (
                    <li>{el.reason}</li>
                  ))}
                </div>
              </>
            ) : (
              <div className="comment">Мы не нашли стилистических проблем.</div>
            );
          } else if (Object.keys(com)[0] === "paragraph") {
            return Object.values(com)[0].length > 0 ? (
              <>
                <div>
                  Обратите внимание на следующие структурные недостатки:{" "}
                  {Object.values(com)[0].map(el => (
                    <li>
                      {el.comment} Sentence number: {el.sentence_number}
                    </li>
                  ))}
                </div>
              </>
            ) : (
              <div>Мы не нашли структурных проблем.</div>
            );
          }
        })} */}
          </Comments>
          <Buttons>
            {<StyledButton onClick={checkAnswer}>Проверить</StyledButton>}
            {props.me.id === props.userID && (
              <StyledButton onClick={e => setType("update")}>
                Изменить
              </StyledButton>
            )}
            {index !== total ? (
              <StyledButton onClick={e => getNumber(index + 1)}>
                Дальше
              </StyledButton>
            ) : (
              <div>Конец документа.</div>
            )}
          </Buttons>
        </>
      )}
      {type === "update" && (
        <>
          <UpdateClause
            id={id}
            sample={sample}
            commentary={commentary}
            keywords={keywords}
          />
          {<StyledButton onClick={e => setType("test")}>Изменить</StyledButton>}
        </>
      )}
    </Styles>
  );
};

export default Clause;
