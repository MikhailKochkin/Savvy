// Breaking down the generateReport function into smaller,
// more manageable functions can significantly improve readability and maintainability.
//Below, I'll refactor the code by extracting logical segments into separate functions:

import _ from "lodash";

export const findProblems = (lesson) => {
  let availableData = [];
  lesson?.structure?.lessonItems.forEach((item, index) => {
    if (item.type.toLowerCase() === "problem") {
      let foundProblem = lesson.problems.find(
        (problem) => problem.id === item.id
      );
      availableData.push({
        id: item.id,
        text: foundProblem.text,
        number: index + 1,
        goal: foundProblem.goal,
        name: foundProblem.name,
        type: foundProblem.__typename.toLowerCase(),
        __typename: foundProblem.__typename.toLowerCase(),
        questions: [],
        steps: foundProblem.steps,
      });
    }
  });
  return availableData;
};

export const findTextEditors = (lesson) => {
  let availableData = [];
  lesson?.structure?.lessonItems.forEach((item, index) => {
    if (item.type.toLowerCase() === "texteditor") {
      let foundTextEditor = lesson.texteditors.find(
        (editor) => editor.id === item.id
      );
      availableData.push({
        id: item.id,
        text: foundTextEditor.text,
        number: index + 1,
        goal: foundTextEditor.goal,
        name: foundTextEditor.name,
        type: foundTextEditor.__typename.toLowerCase(),
        __typename: foundTextEditor.__typename.toLowerCase(),
        questions: [],
      });
    }
  });
  return availableData;
};

export const extractElementInfoFromTextEditors = (text) => {
  const regex = /type="([^"]+)"[^>]*elementId="([^"]+)"/g;
  const matches = text.matchAll(regex);
  const elementInfoArray = [];

  for (const match of matches) {
    const [, type, elementId] = match;
    if (elementId !== "null") {
      elementInfoArray.push({ type, elementId });
    }
  }

  return elementInfoArray;
};

export const populateProblemsWithQuestions = (availableData, lesson) => {
  let updatedData = availableData.map((el) => {
    let updatedProblem = { ...el };
    updatedProblem.questions = [];
    if (updatedProblem.__typename.toLowerCase() === "problem") {
      let activeQuizzes = [];
      lesson.quizes.forEach((quiz) => {
        el.steps.problemItems.forEach((step) => {
          if (step.id === quiz.id) {
            activeQuizzes.push(quiz);
          }
        });
      });
      updatedProblem.questions.push(...activeQuizzes);
    }
    return updatedProblem;
  });
  return updatedData;
};

export const populateTextEditorsWithQuestions = (
  availableTextEditors,
  lesson,
  quizResults
) => {
  let newAvailabletextEditors = availableTextEditors.map((el) => {
    let textEditorData = extractElementInfoFromTextEditors(el.text);
    let tasks = [];
    textEditorData.map((element) => {
      if (element.type === "error") {
        let foundOpenQuestion = lesson.quizes.find(
          (quiz) => quiz.id === element.elementId
        );
        if (foundOpenQuestion) tasks.push(foundOpenQuestion);
      } else if (element.type === "problem") {
        let foundProblem = lesson.problems.find(
          (problem) => problem.id === element.elementId
        );
        if (foundProblem) tasks.push(foundProblem);
      }
    });
    el.questions.push(...tasks);
    return el;
  });
  console.log(
    "newAvailabletextEditors final texteditors",
    newAvailabletextEditors
  );
  return newAvailabletextEditors;
};

export const populateQuizWithResults = (quiz, quizResults) => {
  let updatedQuiz = { ...quiz };
  let activeResults = [];
  quizResults.forEach((result) => {
    if (result.quiz.id === updatedQuiz.id) {
      activeResults.push(result);
    }
  });
  return {
    ...updatedQuiz,
    results: activeResults,
    completionDate:
      activeResults.length > 0 ? activeResults[0]?.createdAt : undefined,
  };
};

export const populateTextEditorsWithResults = (
  availableTextEditors,
  quizResults,
  lesson
) => {
  availableTextEditors.forEach((textEditor) => {
    textEditor.questions.forEach((el) => {
      if (el.__typename.toLowerCase() === "quiz") {
        el.questions.map((question) => {
          let activeResults = [];
          quizResults.forEach((result) => {
            if (result.quiz.id === question.id) {
              activeResults.push(result);
            }
          });
          return {
            ...question,
            results: activeResults,
            completionDate:
              activeResults.length > 0
                ? activeResults[0]?.createdAt
                : undefined,
          };
        });
      } else if (el.__typename.toLowerCase() === "problem") {
        // let updatedProblem = populateProblemsWithQuestions([el], lesson);
      }
    });
  });
};

export const analyzeStudentPerformance = (availableData, res, data) => {
  let results = availableData.map((el) => {
    if (el.type.toLowerCase() === "problem") {
      let enhancedQuestions = [];
      el.populatedQuestions.map((question) => {
        // 3.1 the student gets a point for every question which has saved results

        // 3.2 the student gets a point for every question that has saved results with correct answers
        if (question.__typename === "Quiz") {
          // console.log("question", question);
          let enhancedQuestion = { ...question };
          console.log("enhancedQuestion", enhancedQuestion);
          if (
            enhancedQuestion.results.filter(
              (result) =>
                result.correct ||
                result?.ideasList?.quizIdeas?.filter(
                  (idea) => parseFloat(idea.result) > 58
                ).length > 0
            ).length > 0
          ) {
            enhancedQuestion.isCorrectAnswerRecieved = true;
          } else {
            enhancedQuestion.isCorrectAnswerRecieved = false;
          }
          enhancedQuestion.numberOfAttempts = question.results.length;
          if (
            enhancedQuestion.results.filter(
              (result) =>
                result.comment == "Student asked for explanations" ||
                result.comment == "Student asked for a hint" ||
                result.comment == "Student asked for improvement"
            ).length > 0
          ) {
            enhancedQuestion.wasHelpUsed = true;
          } else {
            enhancedQuestion.wasHelpUsed = false;
          }
          enhancedQuestions.push(enhancedQuestion);
        }
      });
      el.enhancedQuestions = enhancedQuestions;
      return el;
    }
  });
  return results;
};

export const analyzeTextEditorStudentPerformance = (
  availableData,
  res,
  lesson
) => {
  let results = availableData.map((el) => {
    let enhancedQuestions = [];
    el.populatedQuestions.map((question) => {
      // 3.1 the student gets a point for every question which has saved results

      // 3.2 the student gets a point for every question that has saved results with correct answers
      if (question.__typename === "Quiz") {
        let enhancedQuestion = { ...question };
        if (
          enhancedQuestion.results.filter((result) => result.correct).length > 0
        ) {
          enhancedQuestion.isCorrectAnswerRecieved = true;
        } else {
          enhancedQuestion.isCorrectAnswerRecieved = false;
        }
        enhancedQuestion.numberOfAttempts = question.results.length;
        if (
          enhancedQuestion.results.filter(
            (result) =>
              result.comment == "Student asked for explanations" ||
              result.comment == "Student asked for a hint" ||
              result.comment == "Student asked for improvement"
          ).length > 0
        ) {
          enhancedQuestion.wasHelpUsed = true;
        } else {
          enhancedQuestion.wasHelpUsed = false;
        }
        enhancedQuestions.push(enhancedQuestion);
      }
    });
    el.enhancedQuestions = enhancedQuestions;
    return el;
  });
  return results;
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

export const getFeedbackOnTasks = async (availableData, student) => {
  const insights = Array(availableData.length)
    .fill(null)
    .map((_, index) => ({
      number: index + 1,
      name: null,
      data: null,
    }));
  const res = await Promise.all(
    availableData.map(async (el, i) => {
      let taskCompletionInfo = [];
      el.enhancedQuestions?.map((question) => {
        let task = {
          numberOfAttempts: question.numberOfAttempts,
          hasCorectAnswerBeenFound: question.isCorrectAnswerRecieved,
          haveHintsBeenUsed: question.wasHelpUsed,
        };
        taskCompletionInfo.push(task);
      });
      let problemSolutionInfo = {
        totalNumberOfAttempts: taskCompletionInfo.reduce(
          (acc, val) => acc + val.numberOfAttempts,
          0
        ),
        totalNumberOfCorrectAnswers: taskCompletionInfo.filter(
          (task) => task.hasCorectAnswerBeenFound
        ).length,
        totalNumberOfQuestions: el.steps?.problemItems.length,
        totalNumberOfHintsUsed: taskCompletionInfo.filter(
          (task) => task.haveHintsBeenUsed
        ).length,
      };
      console.log("problemSolutionInfo", problemSolutionInfo);
      insights[i].data = problemSolutionInfo;
      insights[i].name = el.name;

      // try {
      //   const response = await fetch("/api/generate", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       prompt: `You are an AI assistant specializing in legal training and Learning and Development (L&D).
      //     Your objective is to help L&D manager prepare an accurate and concise L&D report on the progress of their students.
      //     Use the following data to prepare the report.
      //     The name of the student: """ ${student.name} """.
      //     The name of the task: """ ${el.name} """.
      //     The number of the task: """ ${i + 1} """.
      //     The goal of the task: """ ${el.goal} """.
      //     The total number of questions in the task: """ ${
      //       el.steps?.problemItems.length
      //     } """.
      //     Total number of attempts: """ ${
      //       problemSolutionInfo.totalNumberOfAttempts
      //     } """.
      //       Total number of answered questions: """ ${
      //         problemSolutionInfo.totalNumberOfCorrectAnswers
      //       } """.
      //       Total number of hints used: """ ${
      //         problemSolutionInfo.totalNumberOfHintsUsed
      //       } """.

      //     Use this text as an example.
      //     1. "<h3>Task 1. What is a contract?</h3><p>
      //     <p>The goal of this task was to ...</p>
      //     <p>Michael made 17 attempts to find the correct answer and finally managed to resolve all questions (3/3) by using hints and explanations.
      //     Great job!
      //     </p>"
      //     `,
      //     }),
      //   });

      //   if (response.status !== 200) {
      //     throw (
      //       (await response.json()).error ||
      //       new Error(`Request failed with status ${response.status}`)
      //     );
      //   }
      //   const data = await response.json();
      //   if (data.result.content) {
      //     insights[i].text = data.result.content;
      //     return data.result.content;

      //     // setReportIntro(data.result.content);
      //     // console.log("data.result.content", data.result.content);
      //   } else {
      //     return "Sorry, we are disconnected.";
      //     // setReportIntro("Sorry, we are disconnected.");
      //   }
      // } catch (error) {
      //   console.error(error);
      //   alert(error.message);
      // }
      return problemSolutionInfo;
    })
  );
  return insights;
};

export const generateRecommendation = async (student, lesson, overall) => {
  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: `You are an AI assistant specializing in legal training and Learning and Development (L&D). 
          Your objective is to transform help L&D manager prepare a comprehensive, insightful, and captivating L&D report on the progress of their students. 
          Write the recommendation part of the report using the following data.
          The name of the student: """ ${student.name}  """.
          The name of the simulator: """ ${lesson.name}  """.
          The goal of the simulator: """ ${lesson.goal}  """.
          The total mark of this lesson is: """ ${
            overall.marks.reduce((a, b) => a + b, 0) / overall.marks.length
          } """.
          Practice: all exercises have been completed: """ ${overall.practiced.every(
            (value) => value === true
          )} """.
          Feedback: all correct answers have been found: """ ${overall.feedback.every(
            (value) => value === true
          )} """.
          Reflection: all errors have been reflected and worked on: """ ${overall.reflection.every(
            (value) => value === true
          )} """.
          Use this recommendation paragraph as an example.
          "<h3>Recommendation</h3><p>Michael has practiced enough, but their work lacked reflection. We are afraid they have no acheived the goal of the lesson.
          That's why his total grade for the simulator "Contract law essentials" is 50. We suggest that Mikes goes though the sumulator one time
           so that they have another chance to reflect on the problems from this simulator.</p>"
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
    } else {
      return "Sorry, we are disconnected.";
    }
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};
