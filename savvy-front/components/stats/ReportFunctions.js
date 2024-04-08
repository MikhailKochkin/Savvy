// Breaking down the generateReport function into smaller,
// more manageable functions can significantly improve readability and maintainability.
//Below, I'll refactor the code by extracting logical segments into separate functions:

export const findProblems = (lesson) => {
  let availableData = [];
  lesson?.problems?.forEach((problem) => {
    availableData.push({
      id: problem.id,
      goal: problem.goal,
      name: problem.name,
      type: problem.__typename.toLowerCase(),
      questions: [],
      steps: problem.steps.problemItems,
    });
  });
  return availableData;
};

export const populateProblemsWithQuestions = (availableData, lesson) => {
  availableData.forEach((el) => {
    if (el.type.toLowerCase() === "problem") {
      let activeQuizzes = [];
      lesson.quizes.forEach((quiz) => {
        el.steps.forEach((step) => {
          if (step.id === quiz.id) {
            activeQuizzes.push(quiz);
          }
        });
      });
      el.questions.push(...activeQuizzes);
    }
  });
};

export const populateQuizzesWithResults = (availableData, quizResults) => {
  availableData.forEach((el) => {
    el.questions = el.questions.map((question) => {
      let activeResults = [];
      quizResults.forEach((result) => {
        if (result.quiz.id === question.id) {
          activeResults.push(result);
        }
      });
      return {
        ...question,
        results: activeResults,
        completionDate: activeResults[0].createdAt,
      };
    });
  });
};

export const analyzeStudentPerformance = (availableData, res, data) => {
  availableData.forEach((el) => {
    if (el.type.toLowerCase() === "problem") {
      let practice = 0;
      let correctAnswersNum = 0;
      let questionResultsWithReflectionNum = 0;

      // 1. Set the criteria by which you analyze how well the student has coped with the problem
      let criteria = {
        hasLearnt: false,
        hasPracticed: false,
        completionRate: 0,
        hasReceivedFeedback: false,
        feedbackRate: 0,
        weakQuestions: [],
        unreflectedQuestions: [],
        hasReflected: false,
        mark: 0,
      };

      // 2. Has the student learnt something?
      if (
        (res[0].progress / res[0].lesson.structure.lessonItems.length).toFixed(
          2
        ) *
          100 >
        90
      ) {
        criteria.hasLearnt = true;
      }

      el.questions.forEach((question) => {
        if (question.results.length > 0) {
          practice += 1;
        }

        // 3. What feedback has the student received?
        let correctAnswers = question.results.filter(
          (result) => result.correct && parseFloat(result.comment) > 65
        );
        if (correctAnswers.length == 0) {
          criteria.weakQuestions.push(question);
        }
        if (correctAnswers.length > 0) {
          correctAnswersNum += 1;
        }

        // 4. Has the student reflected on the feedback?
        let questionResultsWithReflection = question.results.filter(
          (result) => result.improvement !== "" || result.explanation !== ""
        );
        if (questionResultsWithReflection.length == 0) {
          criteria.unreflectedQuestions.push(question);
        }
        if (questionResultsWithReflection.length > 0) {
          questionResultsWithReflectionNum += 1;
        }
      });

      // Completion rate calculation
      criteria.completionRate =
        (practice / el.questions.length).toFixed(2) * 100;
      if (practice == el.questions.length) {
        criteria.hasPracticed = true;
        criteria.mark += 25;
      }

      // Feedback rate calculation
      criteria.feedbackRate =
        (correctAnswersNum / el.questions.length).toFixed(2) * 100;
      if (correctAnswersNum == el.questions.length) {
        criteria.hasReceivedFeedback = true;
        criteria.mark += 25;
      }

      // Reflection check
      if (questionResultsWithReflectionNum == el.questions.length) {
        criteria.hasReflected = true;
        criteria.mark += 50;
      }

      // Assigning total results to the problem
      el.totalResults = criteria;
    }
  });
};

export const generateReportIntro = async (student, lesson, date) => {
  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: `You are an AI assistant specializing in legal training and Learning and Development (L&D). 
          Your objective is to transform help L&D manager prepare a comprehensive, insightful, and captivating L&D report on the progress of their students. 
          Write an introduction to the report using the following data.
          The name of the student: """ ${student.name}  ${student.surname} """.
          The name of the simulator: """ ${lesson.name}  """.
          The goal of the simulator: """ ${lesson.goal}  """.
          The date of completion: """ ${date}  """.
          Use this introduction as an example.
          "<h3>Introduction</h3><p>Michael Evans has completed the simulator called "The Art of Negotiation" on November 4, 2024. The goal of the simulator is to <b>teach the student how to negotiate effectively.</b</p>"
          `,
      }),
    });

    if (response.status !== 200) {
      throw (
        (await response.json()).error ||
        new Error(`Request failed with status ${response.status}`)
      );
    }
    const data = await response.json();
    if (data.result.content) {
      return data.result.content;
      // setReportIntro(data.result.content);
      // console.log("data.result.content", data.result.content);
    } else {
      return "Sorry, we are disconnected.";
      // setReportIntro("Sorry, we are disconnected.");
    }
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

export const generateOverAllResults = async (student, overall) => {
  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: `You are an AI assistant specializing in legal training and Learning and Development (L&D).
          Your objective is to transform help L&D manager prepare a comprehensive, insightful, and captivating L&D report on the progress of their students.
          Write an executive summary of the report using the following data.
          The name of the student: """ ${student.name} """.
          Learn: all the materials in the simulator have been looked through: """ ${overall.learning.every(
            (value) => value === true
          )}""".
          Practice: all exercises have been completed: """ ${overall.practiced.every(
            (value) => value === true
          )} """.
          Feedback: all correct answers have been found: """ ${overall.feedback.every(
            (value) => value === true
          )} """.
          Reflection: all errors have been reflected and worked on: """ ${overall.reflection.every(
            (value) => value === true
          )} """.
          Use these executive summaries as an example.
          1. "<h3>Executive summary</h3><p>Michael has worked through all the materials in the simulator. They have also made their best to complete all exercises. However, not all correct answers have been found. And not all errors have been reflected upon, meaning that the student has not worked through explanantions and have not suggested correct answers.</p>"
          2. "<h3>Executive summary</h3<p>Michael has worked through all the materials in the simulator. They have also made their best to complete all exercises and theu have provdied answers to all the questions in the simulator. However, they have made some errors and we have not seen them reflection upon them and suggesting correct variants.</p>"
          `,
      }),
    });

    if (response.status !== 200) {
      throw (
        (await response.json()).error ||
        new Error(`Request failed with status ${response.status}`)
      );
    }
    const data = await response.json();
    if (data.result.content) {
      return data.result.content;
      // setReportIntro(data.result.content);
      // console.log("data.result.content", data.result.content);
    } else {
      return "Sorry, we are disconnected.";
      // setReportIntro("Sorry, we are disconnected.");
    }
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

// module.exports = {
//   findProblems,
//   populateProblemsWithQuestions,
//   populateQuizzesWithResults,
//   analyzeStudentPerformance,
// };
