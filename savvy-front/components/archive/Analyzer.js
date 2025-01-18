import { enableExperimentalFragmentVariables } from "@apollo/client";
import { useState } from "react";
import styled from "styled-components";
// import { Bar } from "react-chartjs-2";
// import { Chart, registerables } from "chart.js";
import parse from "html-react-parser";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

// import calculateSum from "../../functions.js";
import _ from "lodash";

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
    .circle {
      width: 10px;
      height: 10px;
      background: blue;
      display: inline;
    }
    margin-bottom: 15px;
    .block {
      margin-bottom: 15px;
    }
    .loop_box {
      margin-bottom: 25px;
    }
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
  .chart-container canvas {
    height: 275px !important;
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
  .video-container {
    width: 400px;
    margin: 0 auto;
    text-align: center;
  }
  video {
    max-width: 100%;
    height: auto;
  }
  .video-fit {
    width: 400px;
    height: 100%;
    object-fit: cover;
  }
  @media (max-width: 800px) {
    .video-container {
      width: 350px;
    }
    .video-fit {
      width: 350px;
      height: 100%;
    }
  }
  @media (max-width: 800px) {
    font-size: 1.6rem;
    width: 90%;
    order: 3;
    h2 {
      font-size: 2.2rem;
      line-height: 1.4;
    }
  }
  .header {
    background: #e0e0e0;
  }
  h3 {
    border-top: 1px solid grey;
    padding-top: 30px;
  }

  h2 {
    font-size: 2.6rem;
    font-weight: 600;
    line-height: 1.4;
  }
  img {
    display: block;
    width: 100%;
    /* max-height: 50em; */
    box-shadow: "0 0 0 2px blue;";
    object-fit: contain;
  }
  p {
    margin: 20px 0;
  }
  iframe {
    min-width: 600px;
    width: 100%;
    height: 400px;
    @media (max-width: 800px) {
      min-width: 300px;
      min-height: 200px;
      width: 100%;
      height: auto;
    }
  }
  a {
    border-bottom: 2px solid #26ba8d;
    padding: 0%;
    transition: 0.3s;
    cursor: pointer;
  }
  .flag {
    color: #008489;
    font-size: 1.8rem;
    width: 100%;
    margin: 3% 0;
    padding: 3% 8%;
    background-color: #f2fafb;
    border-radius: 5px;
  }
  .article {
    font-size: 1.6rem;
    width: 100%;
    margin: 1% 1%;
    padding: 1% 4%;
    border-left: 3px solid #0094c6;
    /* line-height: 1.6; */
    p {
      margin: 10px 0;
    }
  }
  blockquote {
    font-size: 1.6rem;
    width: 100%;
    margin: 0;
    padding: 1% 4%;
    border-left: 3px solid #0094c6;
    /* line-height: 1.6; */
    p {
      margin: 10px 0;
    }
  }
  pre {
    background: #282c34;
    color: white;
    padding: 2% 4%;
    line-height: 1;
    font-size: 1.4rem;
    border-radius: 10px;
    overflow-x: scroll;
  }
  table {
    width: 100%;
    border: 1px solid #edefed;
    border-collapse: collapse;
    font-size: 1.4rem;
    tr {
      border: 1px solid #edefed;
    }
    tr:nth-child(even) {
      background: #f8f8f8;
    }
    thead {
      background: #36304a;
      color: #fff;
    }
    th {
      border: 1px solid #edefed;
      padding: 15px 0;
    }
    td {
      border: 1px solid #edefed;
      border-top: none;
      border-bottom: none;
      border-right: none;
      padding: 0% 2.5%;
      position: relative;
      padding: 15px 15px;
    }
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

const SimpleButton = styled.button`
  width: 230px;
  height: 40px;
  background: none;
  padding: 5px 0;
  border: 2px solid #69696a;
  border-radius: 5px;
  font-family: Montserrat;
  font-size: 1.4rem;
  font-weight: 500;
  color: #323334;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: #f4f4f4;
  }
`;

const Analyzer = (props) => {
  const [show, setShow] = useState(false);
  const [communication, setCommunication] = useState(0);
  const [theory, setTheory] = useState(0);
  const [practice, setPractice] = useState(0);
  const [longreadComments, setLongreadComments] = useState([]);
  const [chatComments, setChatComments] = useState([]);
  const [lessonRecommendations, setLessonRecommendations] = useState([]);
  const [isLongreadOpen, setIsLongreadOpen] = useState(false);
  const [isDialogueOpen, setIsDialogueOpen] = useState(false);

  const { t } = useTranslation("lesson");

  const { elements, lesson } = props;
  // Chart.register(...registerables);
  // 1. Build the labels map for the lesson difficulty map
  let lesson_difficulty_map = [];
  let lesson_labels = [];
  elements
    .filter((el) => el.id !== undefined)
    .map((el, i) => {
      const typeDifficultyMap = {
        quiz: 2,
        testpractice: 3,
        texteditor: 4,
        construction: 4,
        problem: 5,
        testpractice: 4,
        newtest: 1,
        document: 5,
        note: 2,
        shot: 2,
        chat: 1,
        forum: 3,
        document: 4,
        offer: 0,
      };

      const typeLabelMap = {
        quiz: t("Quiz"),
        testpractice: t("TestPractice"),
        texteditor: t("TextEditor"),
        construction: t("Construction"),
        problem: t("Problem"),
        newtest: t("NewTest"),
        note: t("Note"),
        shot: t("Shot"),
        chat: t("Chat"),
        forum: t("Forum"),
        document: t("Document"),
        testpractice: t("TestPractice"),
        offer: t("Offer"),
      };

      const lowerType = el.type.toLowerCase();
      if (typeLabelMap[lowerType]) {
        lesson_labels.push(`${i + 1}. ${typeLabelMap[lowerType]}`);
      }

      if (typeDifficultyMap[lowerType] !== undefined) {
        lesson_difficulty_map.push(typeDifficultyMap[lowerType]);
      }
    });

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
    communicationComment = t("add_communication");
  } else if (communication >= 5 && communication < 20) {
    communicationComment = t("communication_ok");
  } else if (communication >= 11) {
    communicationComment = t("reduce_communication");
  }
  if (practice < 40) {
    practiceComment = t("add_practice");
  } else if (practice >= 40 && practice < 66) {
    practiceComment = t("practice_ok");
  } else if (practice >= 66) {
    practiceComment = t("check_practice_theory");
  }
  if (theory < 25) {
    theoryComment = t("add_theory");
  } else if (theory >= 25 && theory < 50) {
    theoryComment = t("theory_ok");
  } else if (theory >= 50) {
    theoryComment = t("too_much_theory");
  }

  // 2. Start the anlysis

  const analyzeLesson = () => {
    const typeLevels = {
      communication: {
        forum: 3,
        chat: 1,
        newtest: 2,
      },
      theory: {
        note: 3,
        chat: 1,
        shot: 2,
      },
      practice: {
        newtest: 1,
        quiz: 1,
        testpractice: 3,
        texteditor: 3,
        document: 4,
        construction: 2,
        problem: 5,
      },
    };

    const getLessonType = (type) => {
      if (typeLevels.communication[type]) return "communication";
      if (typeLevels.theory[type]) return "theory";
      if (typeLevels.practice[type]) return "practice";
      return null;
    };

    elements
      // remove unsaved lesson blocks
      .filter((el) => el.id !== undefined)
      // go through each lesson block

      .forEach((el, i) => {
        // get lesson block type and decide which category it belongs to

        const type = el.type.toLowerCase();
        const lessonType = getLessonType(type);

        // after distribution between categories we determine
        // the value of every block using the coefs from typeLevels

        if (lessonType) {
          if (type === "chat" && i == 0) {
            communicationElements.push(el);
            communicationLevel += typeLevels.communication[type];
          } else if (type === "chat" && i !== 0) {
            theoryElements.push(el);
            theoryLevel += typeLevels.theory[type];
          } else if (
            (type === "newtest" || type === "quiz") &&
            (lesson.newTests
              .find((nt) => nt.id === el.id)
              ?.type?.toLowerCase() == "form" ||
              lesson.quizes
                .find((nt) => nt.id === el.id)
                ?.type?.toLowerCase() == "form")
          ) {
            communicationElements.push(el);
            communicationLevel += typeLevels.communication[type];
          } else if (lessonType === "communication") {
            communicationElements.push(el);
            communicationLevel += typeLevels.communication[type];
          } else if (lessonType === "theory") {
            theoryElements.push(el);
            theoryLevel += typeLevels.theory[type];
          } else if (lessonType === "practice") {
            practiceElements.push(el);
            practiceLevel += typeLevels.practice[type];
          }
        }
      });

    // get the numbers
    const total_number = communicationLevel + theoryLevel + practiceLevel;
    setCommunication(Math.round((communicationLevel / total_number) * 100));
    setPractice(Math.round((practiceLevel / total_number) * 100));
    setTheory(Math.round((theoryLevel / total_number) * 100));
    setShow(true);
  };

  // 3. Provide lesson structure insights

  const difficultyLevels = {
    theory: {
      note: 2,
      chat: 1,
      shot: 2,
    },
    practice: {
      newtest: 1,
      quiz: 2,
      testpractice: 3,
      texteditor: 3,
      document: 4,
      construction: 2,
      problem: 5,
    },
  };

  const getRecommendations = (elements) => {
    const recommendations = [];
    const uniqueElementTypes = new Set();

    let consecutiveSameType = 0;
    let consecutiveSameDifficulty = 0;
    let consecutiveOverall = 0;

    let prevElement = null;
    let prevDifficulty = null;

    let elementsAboveDifficultyOne = 0;

    for (let i = 0; i < elements.length; i++) {
      const el = elements[i];
      let currentType = null;

      // Store unique element types
      uniqueElementTypes.add(el.type.toLowerCase());

      if (el.type.toLowerCase() in difficultyLevels["theory"]) {
        currentType = "theory";
      } else if (el.type.toLowerCase() in difficultyLevels["practice"]) {
        currentType = "practice";
      }

      if (currentType) {
        const currentDifficulty =
          difficultyLevels[currentType][el.type.toLowerCase()];

        if (currentDifficulty > 2) {
          elementsAboveDifficultyOne++;
        }

        // Check consecutive type
        if (
          prevElement &&
          prevElement.type.toLowerCase() === el.type.toLowerCase()
        ) {
          consecutiveSameType++;
          consecutiveOverall++;

          // Check consecutive difficulty within the same type block
          if (prevDifficulty && prevDifficulty === currentDifficulty) {
            consecutiveSameDifficulty++;
          } else {
            consecutiveSameDifficulty = 1;
          }
        } else {
          consecutiveSameType = 1;
          consecutiveOverall = 1;
          consecutiveSameDifficulty = 1; // Reset the counter when type changes
        }

        // Make recommendations based on consecutive counts
        if (consecutiveSameType >= 3) {
          recommendations.push(
            `Three or more consecutive elements (Element number ${i + 1 - 2}, ${
              i + 1 - 1
            }, and ${i + 1}) have the same type: ${
              el.type
            }. Consider diversifying the type of elements.`
          );
        }

        if (consecutiveSameType >= 3 && consecutiveSameDifficulty >= 3) {
          recommendations.push(
            `Three or more consecutive elements (Element number ${i + 1 - 2}, ${
              i + 1 - 1
            }, and ${i + 1}) of type: ${
              el.type
            } have the same difficulty level: ${
              difficultyLevels[currentType][el.type.toLowerCase()]
            }. Consider adjusting the difficulty progression for this type.`
          );
        }

        if (consecutiveOverall >= 5) {
          recommendations.push(
            `Five or more consecutive elements (ending at element number ${
              i + 1 + 1
            }) are of the same ${
              consecutiveSameType >= 5 ? "type" : "difficulty level"
            }. Please diversify.`
          );
          consecutiveOverall = 0; // reset after making the recommendation
        }

        prevElement = el;
        prevDifficulty = currentDifficulty;
      }
    }

    const requiredCount = elements.length * 0.2;
    if (elementsAboveDifficultyOne < requiredCount) {
      recommendations.push(
        `There are only ${elementsAboveDifficultyOne} elements with a difficulty level above 2. At least 20% of the lesson elements should have a difficulty level more than 2.`
      );
    }

    if (recommendations.length === 0) {
      recommendations.push("The lesson is well built!");
    }

    // Check for the number of unique element types in the lesson
    if (uniqueElementTypes.size < 6) {
      recommendations.push(
        `The lesson has only ${uniqueElementTypes.size} different element types. It is recommended to include at least 6 different element types for diversity.`
      );
    }

    // Check the total number of element types
    if (elements.length < 10) {
      recommendations.push(
        `The total number of elements in the lesson is ${elements.length}. The lesson should contain at least 10 elements for a comprehensive experience.`
      );
    }

    setLessonRecommendations(recommendations);
    return recommendations;
  };

  // 4. Check notes / check longreads

  function extractNotesText(lessonStructure, lessonNotes) {
    let notesText = [];
    function traverse(structure) {
      if (Array.isArray(structure)) {
        for (let item of structure) {
          if (item.type === "Note") {
            if (item?.data?.text) {
              notesText.push({ id: item.id, text: item.data.text });
            } else if (lessonNotes.find((el) => el.id == item.id)) {
              notesText.push({
                id: item.id,
                text: lessonNotes.find((el) => el.id == item.id).text,
              });
            }
          }
        }
      }
    }

    traverse(lessonStructure);
    return notesText;
  }

  function countWords(str) {
    return str.trim().split(/\s+/).length;
  }

  function checkHTML(html) {
    const checks = [
      {
        regex: /<h2\b[^>]*>(.*?)<\/h2>/gi,
        msg: "Your text lacks a main header. This is necessary for giving a clear idea of the topic.",
      },
      {
        regex: /<img\b[^>]*>/gi,
        msg: "Your text could be enhanced with visuals. They support learning and engage readers more effectively.",
      },
      {
        condition: () => countWords(html) > 400,
        regex: /<h3\b[^>]*>(.*?)<\/h3>/gi,
        msg: "Your text could use some subheadings. These help guide the reader through longer pieces of content.",
      },
      {
        regex: /<a\b[^>]*>(.*?)<\/a>/gi,
        msg: "Including links in your text provides additional context and useful references for the reader.",
      },
      {
        regex: /<li\b[^>]*>(.*?)<\/li>/gi,
        msg: "You have no lists. These help structure information. Maybe you can add them?",
      },
      {
        regex: /<p\b[^>]*>([^.]*\.){7,}<\/p>/gi,
        msg: "Some paragraphs in your text are quite long. Consider breaking them down into shorter ones for better readability.",
      },
      {
        regex: /<blockquote\b[^>]*>(.*?)<\/blockquote>/gi,
        msg: "Quotes can serve as effective emphasis points. If you have any, consider highlighting them.",
      },
    ];

    const comments = [];

    checks.forEach((check) => {
      if (
        check.condition
          ? check.condition() && !check.regex.test(html)
          : !check.regex.test(html)
      ) {
        comments.push(check.msg);
      }
    });

    if (comments.length === 0) {
      comments.push("Your text meets all the guidelines. Good job!");
    }

    return comments;
  }

  function checkChatsInLesson(lessonStructure, lessonData) {
    const chatCommentsArray = [];

    function traverse(structure) {
      if (Array.isArray(structure)) {
        for (let item of structure) {
          if (item.type === "Chat") {
            const chatData = lessonData.find((chat) => chat.id === item.id);
            if (chatData) {
              const comments = [];

              // Check if chat has at least 3 messages
              if (chatData.messages.messagesList.length < 3) {
                comments.push("The chat should have at least 3 messages.");
              }

              // Check if chat has messages from both student and author
              const hasStudentMessage = chatData.messages.messagesList.some(
                (msg) => msg.author === "student"
              );
              const hasAuthorMessage = chatData.messages.messagesList.some(
                (msg) => msg.author === "author"
              );
              if (!hasStudentMessage) {
                comments.push(
                  "The chat should have messages from the student."
                );
              }
              if (!hasAuthorMessage) {
                comments.push("The chat should have messages from the author.");
              }

              // Check if every message has no more than 2 paragraphs
              chatData.messages.messagesList.forEach((msg) => {
                const paragraphCount = (
                  msg.text.match(/<p\b[^>]*>(.*?)<\/p>/gi) || []
                ).length;
                if (paragraphCount > 2) {
                  comments.push(
                    `A message in the chat has more than 2 paragraphs.`
                  );
                }
              });

              chatCommentsArray.push({
                data: chatData,
                comments: comments.length
                  ? comments
                  : ["Your chat meets all the guidelines. Good job!"],
              });
            }
          }
        }
      }
    }

    traverse(lessonStructure);
    return chatCommentsArray;
  }

  let lesson_length = 40;
  // Identify types of content
  const communicationTypes = ["chat", "newtest", "quiz", "forum"];

  const theoreticalTypes = ["chat", "note", "shot"];
  const practicalTypes = [
    "newtest",
    "texteditor",
    "problem",
    "testpractice",
    "quiz",
    "construction",
    "offer",
  ]; // and more if needed

  const getBarColor = (element, lesson, position) => {
    const elementType = element.type.toLowerCase();
    // Check for yellow color conditions
    if (
      elementType === "forum" ||
      (elementType === "chat" && position === 0) ||
      (elementType === "newtest" &&
        lesson.newTests
          .find((nt) => nt.id === element.id)
          ?.type?.toLowerCase() === "form") ||
      (elementType === "quiz" &&
        lesson.quizes
          .find((qz) => qz.id === element.id)
          ?.type?.toLowerCase() === "form")
    ) {
      return "#ffd700"; // yellow
    }

    // Check for blue color conditions
    if (theoreticalTypes.includes(elementType)) {
      return "#118ab2"; // blue
    }

    // Check for green color conditions
    if (practicalTypes.includes(elementType)) {
      return "#06d6a0"; // green
    }

    // Default color for unclassified types
    return "#073b4c"; // gray
  };

  return (
    <Styles>
      <Container>
        <Button onClick={(e) => analyzeLesson()}>{t("analyze_lesson")}</Button>
        {show ? (
          <div>
            <h2>
              <b>{t("page_size")}:</b>
            </h2>
            <div className="box">
              <div>
                – {t("estimated_lesson_time")}:{" "}
                <b>
                  {lesson_length} {t("min")}
                </b>
                {lesson_length >= 30 && lesson_length <= 80 ? (
                  <div>✅ {t("good_lesson_size")}.</div>
                ) : null}
                {lesson_length < 30 ? (
                  <div>❌ ⬆️ {t("make_bigger")}</div>
                ) : null}
                {lesson_length > 80 ? (
                  <div>❌ ⬇️ {t("make_smaller")}</div>
                ) : null}
              </div>
            </div>
            <div className="box">
              <h2>
                <b>{t("lesson_content")}</b>
              </h2>
              <div>
                <b>{t("page_proportions")}:</b>
              </div>
              <div className="box">
                <div>
                  – Yellow: {t("communication_with_students")}:{" "}
                  <b>{communication}%</b>:{" "}
                </div>
                <div>{communicationComment} </div>
              </div>
              <div className="box">
                <div>
                  – Blue: {t("theory")}: <b>{theory}</b>%
                </div>
                <div>{theoryComment}</div>
              </div>
              <div className="box">
                <div>
                  – Green: {t("practice2")}: <b>{practice}</b>%
                </div>
                <div>{practiceComment}</div>
              </div>
              {/* <div classname="chart-container" style={{ height: "275px" }}>
                <Bar
                  data={{
                    labels: lesson_labels,
                    datasets: [
                      {
                        label: t("elements_difficulty"),
                        backgroundColor: elements.map((el, i) =>
                          getBarColor(el, props.lesson, i)
                        ),
                        borderColor: elements.map((el, i) =>
                          getBarColor(el, props.lesson, i)
                        ),
                        borderWidth: 1,
                        data: lesson_difficulty_map,
                      },
                    ],
                  }}
                  options={{
                    maintainAspectRatio: false,
                    responsive: true,

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
              </div> */}
              <br />
              <SimpleButton onClick={(e) => getRecommendations(elements)}>
                {t("get_recommendations")}
              </SimpleButton>
              <div>
                <ol>
                  {lessonRecommendations.map((lr) => (
                    <li>{lr}</li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="box">
              <h2>
                <b>{t("longreads")}:</b>
              </h2>
              <SimpleButton
                onClick={(e) => {
                  let longreads = extractNotesText(
                    props.elements,
                    props.lesson.notes
                  );
                  let arr = [];
                  longreads.map((l) =>
                    arr.push({
                      comments: checkHTML(l.text),
                      text: l.text,
                    })
                  );
                  setLongreadComments(arr);
                  setIsLongreadOpen(!isLongreadOpen);
                }}
              >
                {t("check_longreads")}
              </SimpleButton>
              <div>
                {isLongreadOpen &&
                  longreadComments.map((l) => (
                    <div>
                      <div>{parse(l.text)}</div>
                      <h3>{t("comments")}</h3>
                      <ul>
                        {l.comments.map((c) => (
                          <li>{c}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>
            </div>
            <div className="box">
              <h2>
                <b>{t("dialogues")}:</b>
              </h2>
              <SimpleButton
                onClick={(e) => {
                  let comments = checkChatsInLesson(
                    elements,
                    props.lesson.chats
                  );
                  setChatComments(comments);
                  // if(chatComments.length > 0){
                  //   setChatComments([]);
                  // }
                }}
              >
                Check chats
              </SimpleButton>
              <div>
                {chatComments.map((l) => (
                  <div>
                    <div>{parse(l.data.messages.messagesList[0].text)}</div>
                    <h3>{t("comments")}</h3>
                    <ul>
                      {l.comments.map((c) => (
                        <li>{c}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </Container>
    </Styles>
  );
};

export default Analyzer;
