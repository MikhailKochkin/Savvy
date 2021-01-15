import { useState, useEffect } from "react";
import styled from "styled-components";
import renderHTML from "react-render-html";
import Modal from "styled-react-modal";

const Box = styled.div`
  display: flex;
  justify-content: row;
  margin-bottom: 1%;
  div {
    flex: 50%;
    &.column {
      padding-left: 2%;
      border-left: 1px solid #edefed;
    }
    &.mistake {
      border-bottom: 1px solid #edefed;
      padding-bottom: 10px;
      margin-bottom: 10px;
    }
  }
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1%;
  #id {
    color: #001f4e;
  }
`;

const Block = styled.div`
  padding-bottom: 2%;
  margin-bottom: 3%;
  border-bottom: 1px solid #edefed;
`;

const Text = styled.div`
  font-size: 1.4rem;
`;

const TexteditorModal = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { texteditor, student, results } = props;
  useEffect(() => {
    let res;
    if (results.filter((t) => t.textEditor.id === texteditor.id).length > 0) {
      if (texteditor.id == "ck9k4st6j04ys07341ols5zbl")
        console.log(results.filter((t) => t.textEditor.id === texteditor.id));
      res = results.filter((t) => t.textEditor.id === texteditor.id);
      const elements = document
        .getElementById(texteditor.id)
        .querySelectorAll("#id");
      if (texteditor.id == "ck9k4st6j04ys07341ols5zbl") console.log(elements);
      elements.forEach((element) => {
        if (
          res.filter((r) => r.correct == element.getAttribute("data")).length >
          0
        ) {
          let answers = res.filter(
            (r) => r.correct == element.getAttribute("data")
          );
          if (texteditor.id == "ck9k4st6j04ys07341ols5zbl")
            console.log(answers);
          var guesses_arr = answers.map(function (obj) {
            return obj.guess;
          });
          if (guesses_arr.leength == 0) {
            guesses_arr = ["––"];
          }
          if (texteditor.id == "ck9k4st6j04ys07341ols5zbl") console.log(111);
          if (texteditor.id == "ck9k4st6j04ys07341ols5zbl")
            console.log(
              element,
              `${answers[0].wrong} / ${answers[0].correct} / ${guesses_arr.join(
                ", "
              )}`
            );
          element.innerHTML = `${answers[0].wrong} / ${
            answers[0].correct
          } / ${guesses_arr.join(", ")}`;
        }
      });
    }
  }, [0]);
  return (
    <Box>
      <TextBox id={texteditor.id}>
        <Text>
          <b>Редактор: </b>
          {renderHTML(texteditor.text)}
        </Text>
      </TextBox>
      <div className="column">
        {results && results.length > 0
          ? results
              .filter((t) => t.textEditor.id === texteditor.id)
              .map((t) => (
                <Block>
                  <div>⛔️: {t.wrong} </div>
                  <div>✅: {t.correct} </div>
                  <div>❓: {t.guess} </div>
                  <div>Попытка {t.attempts} </div>
                </Block>
              ))
          : null}
      </div>
    </Box>
  );
};

export default TexteditorModal;
