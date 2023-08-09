import { useState, useEffect } from "react";
import styled from "styled-components";
import parse from "html-react-parser";

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
  padding: 0;
  #id {
    color: #001f4e;
  }
  .editor_note {
    color: #81b29a;
  }
  .editor_error {
    color: #e07a5f !important;
  }
  .editor_quiz {
    color: #f2cc8f;
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
      res = results.filter((t) => t.textEditor.id === texteditor.id);
      const error_elements = document
        .getElementById(texteditor.id)
        .querySelectorAll(".editor_error");
      const note_elements = document
        .getElementById(texteditor.id)
        .querySelectorAll(".editor_note");

      const quiz_elements = document
        .getElementById(texteditor.id)
        .querySelectorAll(".editor_quiz");

      error_elements.forEach((element) => {
        if (
          res.filter((r) => r.correct == element.getAttribute("error_data"))
            .length > 0
        ) {
          let answers = res.filter(
            (r) => r.correct == element.getAttribute("error_data")
          );
          var guesses_arr = answers.map(function (obj) {
            return obj.guess;
          });

          if (guesses_arr.length == 0) {
            guesses_arr = ["––"];
          }
          element.innerHTML = `${answers[0].wrong} / ${
            answers[0].correct
          } / <b>Answers: </b>${[...new Set(guesses_arr)].join(", ")}`;
        }
      });

      note_elements.forEach((element) => {
        let answers = res.filter(
          (r) => r.correct == element.getAttribute("text")
        );

        var guesses_arr = answers.map(function (obj) {
          return obj.guess;
        });
        element.innerHTML = `${element.innerHTML} / ${
          guesses_arr.length > 0
            ? "<b>Элемент открыт</b>"
            : "<b>Элемент не открыт</b>"
        }`;
      });
      quiz_elements.forEach((element) => {
        // if (
        //   res.filter((r) => r.correct == element.getAttribute("quiz_data"))
        //     .length > 0
        // ) {

        let answers = res.filter(
          (r) => r.correct == element.getAttribute("answer")
        );

        var guesses_arr = answers.map(function (obj) {
          return obj.guess;
        });

        if (guesses_arr.length == 0) {
          guesses_arr = ["––"];
        }
        element.innerHTML = `${element.innerHTML}. <b>Ответы:</b> ${[
          ...new Set(guesses_arr),
        ].join(", ")}`;
        // }
      });
    }
  }, [0]);
  return (
    <Box>
      <TextBox id={texteditor.id}>
        <Text>
          <b>Редактор: </b>
          {parse(texteditor.text)}
        </Text>
      </TextBox>
      <div className="column">
        {/* {results && results.length > 0
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
          : null} */}
      </div>
    </Box>
  );
};

export default TexteditorModal;
