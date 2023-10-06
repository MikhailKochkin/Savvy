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
  width: 60%;
  #id {
    background: #ffe2e1;
    color: #3e3e3e;
    padding: 3px;
  }
  .editor_note {
    background: #d2fde1;
    color: #3e3e3e;
    padding: 3px;
  }
  .editor_error {
    background: #ffe2e1;
    color: #fff2c8;
    padding: 3px;
  }
  .editor_quiz {
    background: #f2cc8f;
    padding: 3px;
  }
`;

const Text = styled.div`
  font-size: 1.6rem;
`;

const TexteditorModal = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { texteditor, student, results } = props;
  useEffect(() => {
    let res;

    if (results.filter((t) => t.textEditor.id === texteditor.id).length > 0) {
      res = results.filter((t) => t.textEditor.id === texteditor.id);
      const error_elements = document
        .getElementById("check_" + texteditor.id)
        .querySelectorAll("[error_data]");
      const note_elements = document
        .getElementById("check_" + texteditor.id)
        .querySelectorAll(".editor_note");
      const quiz_elements = document
        .getElementById("check_" + texteditor.id)
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
            return { guess: obj.guess, result: obj.result };
          });

          if (guesses_arr.length == 0) {
            guesses_arr = ["––"];
          }
          element.innerHTML = `${answers[0].wrong} (Target answer: ${
            answers[0].correct
          } / <b>Student Answers</b>: ${[
            ...new Set(
              guesses_arr.map((g) => `${g.result ? "✅" : "❌"} ${g.guess}`)
            ),
          ].join(", ")})`;
        }
      });

      note_elements.forEach((element) => {
        let answers = res.filter(
          (r) => r.correct == element.getAttribute("text")
        );

        var guesses_arr = answers.map(function (obj) {
          return obj.guess;
        });
        element.innerHTML = `${element.innerHTML} (${
          guesses_arr.length > 0 ? "<b>Opened</b>" : "<b>Not opened</b>"
        })`;
      });
      quiz_elements.forEach((element) => {
        let answers = res.filter(
          (r) => r.correct == element.getAttribute("answer")
        );

        var guesses_arr = answers.map(function (obj) {
          return obj.guess;
        });

        if (guesses_arr.length == 0) {
          guesses_arr = ["––"];
        }
        element.innerHTML = `${element.innerHTML}. <b>Student Answers:</b> ${[
          ...new Set(guesses_arr),
        ].join(", ")}`;
        // }
      });
    }
  }, [0]);
  return (
    <Box>
      <TextBox id={"check_" + texteditor.id}>
        <Text>
          <h2>Doc Editor </h2>
          {parse(texteditor.text)}
        </Text>
      </TextBox>
    </Box>
  );
};

export default TexteditorModal;
