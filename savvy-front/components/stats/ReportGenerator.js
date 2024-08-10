import React, { useState } from "react";
import styled from "styled-components";
import { TailSpin } from "react-loader-spinner";
import parse from "html-react-parser";
import moment from "moment";

// Import your report generation functions here:
import {
  findProblems,
  findTextEditors,
  populateTextEditorsWithQuestions,
  populateTextEditorsWithResults,
  populateProblemsWithQuestions,
  populateQuizWithResults,
  analyzeStudentPerformance,
  analyzeTextEditorStudentPerformance,
  getFeedbackOnTasks,
  generateReportIntro,
  generateOverAllResults,
  generateRecommendation,
} from "./ReportFunctions";

const IntroData = styled.div`
  width: 60%;
  margin: 30px 0;
  font-size: 1.6rem;
  h4 {
    font-size: 2rem;
    margin: 20px 0;
  }
  button {
    width: 200px;
    height: 35px;
    background: none;
    padding: 5px 0;
    margin: 30px 0;
    border: 2px solid #69696a;
    border-radius: 5px;
    font-family: Montserrat;
    font-size: 1.6rem;
    font-weight: 500;
    color: #323334;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      background: #f4f4f4;
    }
  }
`;

const Progress = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  margin: 0 0 2% 0;
`;

const Report = styled.div`
  width: 100%;
  border: 2px solid #f2f6f9;
  border-radius: 20px;
  padding: 15px;
  background: #fff;
`;

const ReportGenerator = ({ student, lesson, lessonData, date }) => {
  const [report, setReport] = useState("");
  const [reportData, setReportData] = useState([]);
  const [generating, setGenerating] = useState(false);

  const generateReport = async (event) => {
    event.preventDefault();
    setReport("");
    setGenerating(true);
    console.log("start report");

    // 1. Find all problems / texteditors
    let availableProblems = findProblems(lesson);
    let availableTextEditors = findTextEditors(lesson);
    console.log("availableTextEditors", availableTextEditors);
    // 2. Populate with questions
    availableProblems = populateProblemsWithQuestions(
      availableProblems,
      lesson
    );
    availableTextEditors = populateTextEditorsWithQuestions(
      availableTextEditors,
      lesson,
      lessonData.stats.quizResults
    );

    console.log("availableTextEditors with quizzes", availableTextEditors);
    // 3. Populate all tasks with results
    const updateQuestions = (problems, quizResults) => {
      let updatedProblems = problems.map((problem) => {
        // Create a new object to avoid modifying the original problem
        let updatedProblem = { ...problem };
        let newQuestions = problem.questions.map((question) => {
          if (question.__typename.toLowerCase() === "quiz") {
            return populateQuizWithResults(question, quizResults);
          }
          return question;
        });
        updatedProblem.populatedQuestions = newQuestions;
        return updatedProblem;
      });
      return updatedProblems;
    };

    const updateTextEditors = (texteditors, quizResults) => {
      let updatedTextEditors = texteditors.map((t) => {
        let populatedQuestions = [];
        t.questions.map((question) => {
          if (question.__typename.toLowerCase() === "quiz") {
            let populatedQuiz = populateQuizWithResults(question, quizResults);
            populatedQuestions.push(populatedQuiz);
          } else if (question.__typename.toLowerCase() === "problem") {
            return;
            // updatedProblem.populatedQuestions = question.questions.map((q) => {
            //   if (q.__typename.toLowerCase() === "quiz") {
            //     return populateQuizWithResults(q, quizResults);
            //   }
            //   return q;
            // });
            // populatedQuestions.push(updatedProblem);
          }
          return question;
        });
        t.populatedQuestions = populatedQuestions;
        return t;
      });
      return updatedTextEditors;
    };

    let availableProblems2 = updateQuestions(
      availableProblems,
      lessonData.stats.quizResults
    );

    // Log after update

    let availableTextEditors2 = updateTextEditors(
      availableTextEditors,
      lessonData.stats.quizResults
    );

    // 4. Analyze student performance
    let availableProblems3 = analyzeStudentPerformance(
      availableProblems2,
      lessonData.res,
      lessonData.data
    );

    let availableTextEditors3 = analyzeTextEditorStudentPerformance(
      availableTextEditors2,
      lessonData.res,
      lesson
    );

    // 5. Generate report sections
    let intro = await generateReportIntro(student, lesson, date);

    // let overall = {
    //   learning: [],
    //   practiced: [],
    //   feedback: [],
    //   reflection: [],
    //   marks: [],
    // };
    // [...availableProblems, ...availableTextEditors].forEach((el) => {
    //   overall.learning.push(el.totalResults.hasLearnt);
    //   overall.practiced.push(el.totalResults.hasPracticed);
    //   overall.feedback.push(el.totalResults.hasReceivedFeedback);
    //   overall.reflection.push(el.totalResults.hasReflected);
    //   overall.marks.push(el.totalResults.mark);
    // });

    // let overallResults = await generateOverAllResults(student, overall);
    let feedbackOnTasks = await getFeedbackOnTasks(
      [...availableProblems3, ...availableTextEditors],
      student
    );

    console.log("feedbackOnTasks", feedbackOnTasks);
    setReportData(feedbackOnTasks);
    // let recommendation = await generateRecommendation(student, lesson, overall);

    // setReport(
    //   intro +
    //     // overallResults +
    //     feedbackOnTasks.map((el) => el.text).join(" ")
    //   // + recommendation
    // );
    setGenerating(false);
  };

  function generateHtmlTable(data) {
    const {
      totalNumberOfAttempts,
      totalNumberOfCorrectAnswers,
      totalNumberOfQuestions,
      totalNumberOfHintsUsed,
    } = data;

    const tableRows = `
    <tr>
      <td>Total Number of Attempts</td>
      <td>${totalNumberOfAttempts}</td>
    </tr>
    <tr>
      <td>Total Number of Correct Answers</td>
      <td>${totalNumberOfCorrectAnswers}</td>
    </tr>
    <tr>
      <td>Total Number of Questions</td>
      <td>${totalNumberOfQuestions}</td>
    </tr>
    <tr>
      <td>Total Number of Hints Used</td>
      <td>${totalNumberOfHintsUsed}</td>
    </tr>
  `;

    const tableHtml = `
    <table border="1">
      <thead>
        <tr>
          <th>Metric</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>
  `;

    return tableHtml;
  }

  return (
    <IntroData>
      <h4>How to use the analytics page?</h4>
      <div>
        At analytics page you can:
        <ul>
          {lesson.goal && (
            <li>
              get recommendations based on the simulator goals and student
              results (press the "Generate report" button for that)
            </li>
          )}
          <li>
            take a look at how the student was going through the simulator.
            (scroll down to the "Lesson Results" section){" "}
          </li>
        </ul>
      </div>
      <div>Lesson goal: {lesson.goal}</div>
      {<button onClick={generateReport}>Generate report</button>}
      {generating ? (
        <Progress>
          <TailSpin
            height="60"
            width="60"
            color="#2E80EC"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </Progress>
      ) : (
        ""
      )}
      {console.log("reportData", reportData)}
      {reportData.length > 0
        ? reportData.map((item, index) => {
            return (
              <div key={index}>
                <h4>{item.name}</h4>
                {parse(generateHtmlTable(item.data))}
              </div>
            );
          })
        : null}
      {report && report.length > 0 && <Report>{parse(report)}</Report>}
    </IntroData>
  );
};

export default ReportGenerator;
