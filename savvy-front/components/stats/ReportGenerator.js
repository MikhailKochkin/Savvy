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
  const [generating, setGenerating] = useState(false);

  const generateReport = async (event) => {
    event.preventDefault();
    setReport("");
    // setGenerating(true);
    console.log("start report");

    // 1. Find all problems / texteditors
    let availableProblems = findProblems(lesson);
    let availableTextEditors = findTextEditors(lesson);

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

    // 3. Populate all tasks with results
    const updateQuestions = (items, quizResults) =>
      items.map((item) => ({
        ...item,
        questions: item.questions.map((question) =>
          question.__typename.toLowerCase() === "quiz"
            ? populateQuizWithResults(question, quizResults)
            : question
        ),
      }));

    availableProblems = updateQuestions(
      availableProblems,
      lessonData.stats.quizResults
    );
    availableTextEditors = updateQuestions(
      availableTextEditors,
      lessonData.stats.quizResults
    );

    console.log("availableProblems", availableProblems);
    console.log("availableTextEditors", availableTextEditors);

    // 4. Analyze student performance
    let problemAnalysis = analyzeStudentPerformance(
      availableProblems,
      lessonData.res,
      lessonData.data
    );

    console.log("problemAnalysis", problemAnalysis);

    return;

    // 5. Generate report sections
    let intro = await generateReportIntro(student, lesson, date);

    let overall = {
      learning: [],
      practiced: [],
      feedback: [],
      reflection: [],
      marks: [],
    };
    availableData.forEach((el) => {
      overall.learning.push(el.totalResults.hasLearnt);
      overall.practiced.push(el.totalResults.hasPracticed);
      overall.feedback.push(el.totalResults.hasReceivedFeedback);
      overall.reflection.push(el.totalResults.hasReflected);
      overall.marks.push(el.totalResults.mark);
    });

    let overallResults = await generateOverAllResults(student, overall);
    let feedbackOnTasks = await getFeedbackOnTasks(availableData, student);
    let recommendation = await generateRecommendation(student, lesson, overall);

    setReport(
      intro + overallResults + feedbackOnTasks.join("") + recommendation
    );
    setGenerating(false);
  };

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
      {lesson.goal && <button onClick={generateReport}>Generate report</button>}
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
      {report && report.length > 0 && <Report>{parse(report)}</Report>}
    </IntroData>
  );
};

export default ReportGenerator;
