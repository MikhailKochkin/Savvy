import { useState, useEffect } from "react";
import styled from "styled-components";
import parse from "html-react-parser";
import ProblemModal from "./ProblemModal";
import QuizResult from "./QuizResult";

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
  width: 100%;
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
  .editor_problem {
    background: #f2cc8f;
    padding: 3px;
  }
`;

const Text = styled.div`
  font-size: 1.6rem;
`;

const TexteditorModal = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [caseStudiesList, setCaseStudiesList] = useState([]);
  const [quizesList, setQuizesList] = useState([]);
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
      });
    }

    const problem_elements = document
      .getElementById("check_" + texteditor.id)
      .querySelectorAll(".editor_problem");

    const question_elements = document
      .getElementById("check_" + texteditor.id)
      .querySelectorAll(".editor_error");

    let caseStudies = [];
    let quizes = [];

    problem_elements.forEach((element) => {
      caseStudies.push(element.getAttribute("elementid"));
    });
    question_elements.forEach((element) => {
      quizes.push(element.getAttribute("elementid"));
    });
    setCaseStudiesList(caseStudies);
    setQuizesList(quizes);
  }, [0]);
  return (
    <Box>
      <TextBox id={"check_" + texteditor.id}>
        <Text>
          <h2>Doc Editor </h2>
          {parse(texteditor.text)}
          {quizesList.length > 0 &&
            quizesList.map((id) => {
              return (
                <QuizResult
                  quizes={props.all_quizes.filter((t) => t.id === id)}
                  student={student}
                  results={props.all_quiz_results.filter(
                    (r) => r.quiz.id === id
                  )}
                  all_quizes={props.all_quizes}
                  all_tests={props.all_tests}
                  all_notes={props.all_notes}
                />
              );
            })}
          {caseStudiesList.length > 0 &&
            caseStudiesList.map((problem) => (
              <ProblemModal
                problem={props.all_problems.filter((p) => p.id == problem)[0]}
                student={student} // +++
                results={[]}
                newTests={props.all_tests}
                quizes={props.all_quizes}
                chats={props.all_chats}
                notes={props.all_notes}
                testResults={props.all_test_results}
                quizResults={props.all_quiz_results}
              />
            ))}
        </Text>
      </TextBox>
    </Box>
  );
};

export default TexteditorModal;
