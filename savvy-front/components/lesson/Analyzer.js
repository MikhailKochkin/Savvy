import { enableExperimentalFragmentVariables } from "@apollo/client";
import { useState } from "react";
import styled from "styled-components";
import { Bar } from "react-chartjs-2";

const Styles = styled.div`
  width: 660px;
  border: 1px solid #adb5bd;
  margin: 40px 0;
  padding: 20px;
`;

const Container = styled.div`
  width: 100%;
  margin: 5% 0;
  .box {
    margin-bottom: 15px;
  }
  h4 {
    padding: 0% 5%;
  }
  p > a {
    font-weight: 700;
  }
  p > a:hover {
    text-decoration: underline;
  }
  @media (max-width: 600px) {
    width: 100%;
  }
  input {
    padding: 1.5% 2%;
    width: 100%;
    outline: 0;
    border: 1px solid #ccc;
    border-radius: 3.5px;
    font-size: 1.4rem;
    font-family: Montserrat;
  }
  select {
    width: 100%;
    font-size: 1.4rem;
    outline: none;
    font-family: Montserrat;

    line-height: 1.3;
    padding: 1.5% 2%;
    max-width: 100%;
    box-sizing: border-box;
    margin: 0;
    border: 1px solid #c5c5c5;
    border-radius: 4px;
    background: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: #fff;
    background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E"),
      linear-gradient(to bottom, #ffffff 0%, #ffffff 100%);
    background-repeat: no-repeat, repeat;
    background-position: right 0.7em top 50%, 0 0;
    background-size: 0.65em auto, 100%;
  }
`;

const Button = styled.button`
  border: none;
  background: #3f51b5;
  padding: 10px 20px;
  border: 2px solid #3f51b5;
  border-radius: 5px;
  font-family: Montserrat;
  font-size: 1.4rem;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
  margin-top: 20px;
  margin-right: 10px;
  transition: 0.3s;
  margin-bottom: 25px;
  &:hover {
    background: #2e3b83;
    border: 2px solid #2e3b83;
  }
`;

const Frame = styled.div`
  width: 100%;
  margin-bottom: 15px;
  border: 1px solid #e5e5e5;
  border-radius: 3.5px;
  padding-left: 1%;
  font-size: 1.6rem;
  outline: 0;
  p {
    /* margin: 0.8%; */
    margin-left: 0.6%;
  }
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
  .description {
    width: 25%;
    line-height: 1.4;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .input {
    width: 75%;
    .explainer {
      font-size: 1.2rem;
      color: #000000;
      margin-top: 5px;
    }

    input {
      padding: 10px;
      width: 100%;
      outline: 0;
      border: 1px solid #ccc;
      border-radius: 3.5px;
      font-size: 1.4rem;
      font-family: Montserrat;
    }
    select {
      width: 100%;
      font-size: 1.4rem;
      outline: none;
      font-family: Montserrat;
      line-height: 1.3;
      padding: 10px;
      max-width: 100%;
      box-sizing: border-box;
      margin: 0;
      border: 1px solid #c5c5c5;
      border-radius: 4px;
      background: none;
      -moz-appearance: none;
      -webkit-appearance: none;
      appearance: none;
      background-color: #fff;
      background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E"),
        linear-gradient(to bottom, #ffffff 0%, #ffffff 100%);
      background-repeat: no-repeat, repeat;
      background-position: right 0.7em top 50%, 0 0;
      background-size: 0.65em auto, 100%;
    }
  }
`;

const Analyzer = (props) => {
  const [show, setShow] = useState(false);
  const [communication, setCommunication] = useState(0);
  const [theory, setTheory] = useState(0);
  const [practice, setPractice] = useState(0);

  const { elements, lesson } = props;

  let lesson_structure = [];
  elements.map((el, i) => {
    if (i == 0) {
      lesson_structure.push([el]);
    } else {
      if (elements[i - 1].type.toLowerCase() == el.type.toLowerCase()) {
        lesson_structure.at(-1).push(el);
      } else {
        lesson_structure.push([el]);
      }
    }
  });

  let lesson_difficulty_map = [];
  let lesson_labels = [];
  elements.map((el, i) => {
    if (el.type.toLowerCase() == "quiz") {
      lesson_difficulty_map.push(2);
      lesson_labels.push("quiz");
    } else if (el.type.toLowerCase() == "testpractice") {
      lesson_difficulty_map.push(3);
      lesson_labels.push("testpractice");
    } else if (
      el.type.toLowerCase() == "texteditor" ||
      el.type.toLowerCase() == "constructor"
    ) {
      lesson_difficulty_map.push(4);
      if (el.type.toLowerCase() == "texteditor") {
        lesson_labels.push("text editor");
      } else if (el.type.toLowerCase() == "constructor") {
        lesson_labels.push("doc builder");
      }
    } else if (el.type.toLowerCase() == "problem") {
      lesson_difficulty_map.push(5);
      lesson_labels.push("problem");
    } else if (el.type.toLowerCase() == "newtest") {
      lesson_difficulty_map.push(1);
      lesson_labels.push("newtest");
    } else if (el.type.toLowerCase() == "note") {
      lesson_difficulty_map.push(1);
      lesson_labels.push("longread");
    } else if (el.type.toLowerCase() == "chat") {
      lesson_difficulty_map.push(1);
      lesson_labels.push("chat");
    } else if (el.type.toLowerCase() == "forum") {
      lesson_difficulty_map.push(1);
      lesson_labels.push("forum");
    }
    //   else {
    //     lesson_difficulty_map.push(1);
    //     if (el.type.toLowerCase() == "newTest") {
    //       lesson_labels.push("test");
    //     } else if (el.type.toLowerCase() == "note") {
    //       lesson_labels.push("longread");
    //     } else if (el.type.toLowerCase() == "chat") {
    //       lesson_labels.push("chat");
    //     }
    //   }
  });

  // let arr = [1, 2, 2, 2, 3, 4, 4, 4]
  // result = [[1],[2,2,2],[3],[4, 4, 4]]

  let communicationElements = [];
  let theoryElements = [];
  let practiceElements = [];
  let communicationLevel = 0;
  let theoryLevel = 0;
  let practiceLevel = 0;
  let total_number = 0;

  let communicationComment;
  let practiceComment;
  let theoryComment;

  if (communication < 5) {
    communicationComment =
      "❌ ⬆️ Add more communication elements (intro chat, forum or forms) to communicate more with your students";
  } else if (communication >= 5 && communication < 11) {
    communicationComment = "✅  Communication is fine";
  } else if (communication >= 11) {
    communicationComment = "❌ ⬇️ Cut down on communication elements";
  }
  if (practice < 40) {
    practiceComment =
      "❌ ⬆️ Add more practice elements (quizes, texteditors, doc builders or case studies) to help your students practice more";
  } else if (practice >= 40 && practice < 66) {
    practiceComment = "✅  Practice is fine";
  } else if (practice >= 66) {
    practiceComment =
      "❌ ⬇️ Are you sure that all these practical assignments are supported by the theory block?";
  }
  console.log("theory Level", theoryLevel);
  if (theory < 25) {
    theoryComment = "❌ ⬆️ Add more theory and explanations";
  } else if (theory >= 25 && theory < 50) {
    theoryComment = "✅  Theory and explanations are fine";
  } else if (theory >= 50) {
    theoryComment =
      "❌ ⬇️ Isn't that too much theory for one lesson? Or maybe you should add more exercises?";
  }

  const analyzeLesson = () => {
    elements.map((el, i) => {
      if (
        el.type.toLowerCase() == "forum" ||
        (el.type.toLowerCase() == "chat" && i == 0) ||
        (el.type.toLowerCase() == "newtest" &&
          lesson.newTests.find((nt) => nt.id == el.id).type &&
          lesson.newTests.find((nt) => nt.id == el.id).type.toLowerCase() ==
            "form")
      ) {
        communicationElements.push(el);
        if (el.type.toLowerCase() == "forum") {
          communicationLevel = communicationLevel + 3;
        } else if (el.type.toLowerCase() == "chat") {
          communicationLevel = communicationLevel + 1;
        } else if (el.type.toLowerCase() == "newtest") {
          communicationLevel = communicationLevel + 2;
        }
      } else if (
        el.type.toLowerCase() == "note" ||
        el.type.toLowerCase() == "chat" ||
        el.type.toLowerCase() == "shot"
      ) {
        theoryElements.push(el);
        if (el.type.toLowerCase() == "note") {
          theoryLevel = theoryLevel + 3;
        } else if (el.type.toLowerCase() == "chat") {
          theoryLevel = theoryLevel + 1;
        } else if (el.type.toLowerCase() == "shot") {
          theoryLevel = theoryLevel + 2;
        }
      } else if (
        el.type.toLowerCase() == "newtest" ||
        el.type.toLowerCase() == "quiz" ||
        el.type.toLowerCase() == "testpractice" ||
        el.type.toLowerCase() == "texteditor" ||
        el.type.toLowerCase() == "document" ||
        el.type.toLowerCase() == "constructor" ||
        el.type.toLowerCase() == "problem"
      ) {
        practiceElements.push(el);
        if (
          el.type.toLowerCase() == "newtest" ||
          el.type.toLowerCase() == "quiz"
        ) {
          practiceLevel = practiceLevel + 1;
        } else if (
          el.type.toLowerCase() == "testpractice" ||
          el.type.toLowerCase() == "problem" ||
          el.type.toLowerCase() == "document"
        ) {
          practiceLevel = practiceLevel + 3;
        } else if (
          el.type.toLowerCase() == "constructor" ||
          el.type.toLowerCase() == "texteditor"
        ) {
          practiceLevel = practiceLevel + 2;
        }
      }
    });

    total_number = communicationLevel + theoryLevel + practiceLevel;
    setCommunication(Math.round((communicationLevel / total_number) * 100));
    setPractice(Math.round((practiceLevel / total_number) * 100));
    setTheory(Math.round((theoryLevel / total_number) * 100));

    setShow(true);
  };
  return (
    <Styles>
      <Container>
        <Button onClick={(e) => analyzeLesson()}>Analyze lesson</Button>
        {show ? (
          <div>
            <div>
              <b>Lesson size:</b>
            </div>
            <div className="box">
              <div>
                – Estimated time to complete the lesson:{" "}
                <b>{elements.length * 3} min</b>:
                {elements.length * 3 >= 30 && elements.length * 3 <= 80 ? (
                  <div>✅ That's a good lesson size.</div>
                ) : null}
                {elements.length * 3 < 30 ? (
                  <div>
                    ❌ ⬆️ Don't you think it's a good idea to make this lesson
                    slighly bigger?
                  </div>
                ) : null}
                {elements.length * 3 > 80 ? (
                  <div>
                    ❌ ⬇️ Don't you think it's a good idea to make this lesson
                    slighly smaller? Maybe we can unite separate tests into a
                    test group?
                  </div>
                ) : null}
              </div>
            </div>
            <div>
              <b>Lesson proportions:</b>
            </div>
            <div className="box">
              <div>
                – Communication with students: <b>{communication}%</b>:{" "}
              </div>
              <div>{communicationComment} </div>
            </div>
            <div className="box">
              <div>
                – Theory: <b>{theory}</b>%
              </div>
              <div>{theoryComment}</div>
            </div>
            <div className="box">
              <div>
                – Practice: <b>{practice}</b>%
              </div>
              <div>{practiceComment}</div>
            </div>

            <div className="box">
              <div>
                <b>Advice:</b>
              </div>
              <div>
                {lesson_structure.map((arr) => {
                  if (arr.length > 3) {
                    console.log(
                      "elements.indexOf[arr[0]]",
                      elements.indexOf(arr[0])
                    );
                    return (
                      <li>
                        There are probably too many elements of the same type (
                        {arr[0].type}) in a row: {elements.indexOf(arr[0]) + 1}{" "}
                        - {elements.indexOf(arr.at(-1)) + 1}. It may be boring
                        to go through the same elements for a long time.
                      </li>
                    );
                  }
                })}
              </div>
            </div>
            <div className="box">
              <div>
                <b>Lesson difficulty map:</b>
              </div>
              <div>
                Look at the difficulty map of your lesson. A good lesson goes
                from level 1 to level 5 (like a computer game). Does your lesson
                follow this pattern?
              </div>
              <div>
                {console.log(
                  "lesson_difficulty_map",
                  lesson_difficulty_map,
                  lesson_labels
                )}
                <Bar
                  data={{
                    labels: lesson_labels,
                    datasets: [
                      {
                        label: "Elements difficulty",
                        backgroundColor: "#60B55A",
                        borderColor: "#60B55A",
                        borderWidth: 1,
                        data: lesson_difficulty_map,
                      },
                    ],
                  }}
                  options={{
                    maintainAspectRatio: false,
                    legend: {
                      display: true,
                    },
                    scales: {
                      xAxes: [{ display: true, barPercentage: 0.8 }],
                      yAxes: [
                        {
                          display: true,
                          ticks: {
                            min: 0,
                            max: 5,
                            stepSize: 1,
                            beginAtZero: true,
                          },
                        },
                      ],
                    },
                  }}
                />
              </div>
            </div>
          </div>
        ) : null}
      </Container>
    </Styles>
  );
};

export default Analyzer;
