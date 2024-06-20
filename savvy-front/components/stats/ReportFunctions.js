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
      __typename: problem.__typename.toLowerCase(),
      questions: [],
      steps: problem.steps,
    });
  });
  return availableData;
};

export const findTextEditors = (lesson) => {
  let availableData = [];
  lesson?.texteditors?.forEach((t) => {
    availableData.push({
      id: t.id,
      goal: t.goal,
      text: t.text,
      type: t.__typename.toLowerCase(),
      questions: [],
    });
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
  availableTextEditors.forEach((el) => {
    let textEditorData = extractElementInfoFromTextEditors(el.text);
    textEditorData.map((element) => {
      let tasks = [];
      if (element.type === "error") {
        let foundOpenQuestion = lesson.quizes.find(
          (quiz) => quiz.id === element.elementId
        );

        if (foundOpenQuestion) {
          let foundOpenQuestionResults = quizResults.filter(
            (result) => result.quiz.id === element.elementId
          );
          foundOpenQuestion = { ...foundOpenQuestion };
          foundOpenQuestion.results = foundOpenQuestionResults
            ? foundOpenQuestionResults
            : [];
          tasks.push(foundOpenQuestion);
        }
      } else if (element.type === "problem") {
        let foundProblem = lesson.problems.find(
          (problem) => problem.id === element.elementId
        );
        if (foundProblem) {
          foundProblem = populateProblemsWithQuestions([foundProblem], lesson);
          tasks.push(foundProblem[0]);
        }
      }
      el.questions.push(...tasks);
    });
  });
  return availableTextEditors;
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
      let practice = 0;
      let correctAnswersNum = 0;
      let questionResultsWithReflectionNum = 0;

      // 1. Set the criteria by which you analyze how well the student has coped with the problem
      let criteria = {
        hasLearnt: false,
        hasPracticed: false,
        hasReceivedFeedback: false,
        hasReflected: false,
        mark: 0,
        feedbackRate: 0,
        completionRate: 0,
        weakQuestions: [],
        unreflectedQuestions: [],
      };

      // How do we use these criteria?

      // – if the student has looked through all the lesson we assume that they have learnt something. Student gets 20 total points
      // – if the student has given answers to exercises we assume that they have practiced and has received feedback. Student can get up to 20 total points. The final points depend on how many exercises have the student completed.
      // – if the student has given correct asnwers to exercises we assume that they have received feedback. They now know which answer is correct. Student can get up to 20 total points. The final points depend on how many exercises have the student completed.
      // - if the student has used additional functions (like hints, explanations, etc) we assume that they have reflected on the feedback. Student gets 40 total points. The final points depend on how many exercises have the student completed.

      // 2. Has the student learnt something (looked through all the matrials in the lesson)?

      let completion_rate =
        (res[0].progress / res[0].lesson.structure.lessonItems.length).toFixed(
          2
        ) * 100;
      if (completion_rate > 90) {
        criteria.hasLearnt = true;
        criteria.mark += 20;
      } else if (completion_rate > 50 && completion_rate <= 90) {
        criteria.hasLearnt = true;
        criteria.mark += 10;
      } else {
        criteria.hasLearnt = false;
      }

      // console.log("completion_rate", completion_rate);
      // console.log("criteria", criteria);

      // 3. Has the student practiced. received feedback and reflected?
      el.questions.forEach((question) => {
        // 3.1 the student gets a point for every question which has saved results
        if (question.results.length > 0) {
          practice += 1;
        }

        // 3.2 the student gets a point for every question that has saved results with correct answers

        if (question.__typename === "Quiz") {
          if (question.type.toLowerCase() === "test") {
            let correctAnswers = question.results.filter(
              (result) => result.correct && parseFloat(result.comment) > 65
            );
            if (correctAnswers.length == 0) {
              criteria.weakQuestions.push(question);
            }
            if (correctAnswers.length > 0) {
              correctAnswersNum += 1;
            }
          } else if (
            question.type.toLowerCase() === "findall" ||
            question.type.toLowerCase() === "generate"
          ) {
            let correctAnswers = question.results.filter((result) => {
              if (result.ideasList && result.ideasList.quizIdeas) {
                return (
                  result.ideasList.quizIdeas.filter(
                    (idea) => parseFloat(idea.result) > 60
                  ).length > 0
                );
              }
              return false;
            });
            if (correctAnswers.length == 0) {
              criteria.weakQuestions.push(question);
            }
            if (correctAnswers.length > 0) {
              correctAnswersNum += 1;
            }
          }
        }

        // 3.3. Has the student reflected on the feedback?
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

      // Practice rate calculation
      if ((practice / el.questions.length) * 100 > 90) {
        criteria.mark += 20;
      } else if (
        (practice / el.questions.length) * 100 > 50 &&
        (practice / el.questions.length) * 100 <= 90
      ) {
        criteria.mark += 10;
      }

      // Feedback rate calculation
      criteria.feedbackRate =
        (correctAnswersNum / el.questions.length).toFixed(2) * 100;
      if (criteria.feedbackRate > 90) {
        criteria.hasReceivedFeedback = true;
        criteria.mark += 20;
      } else if (criteria.feedbackRate > 50 && criteria.feedbackRate <= 90) {
        criteria.hasReceivedFeedback = true;
        criteria.mark += 10;
      }

      // Reflection check
      if (questionResultsWithReflectionNum / el.questions.length > 0.9) {
        criteria.hasReflected = true;
        criteria.mark += 40;
      } else if (
        questionResultsWithReflectionNum / el.questions.length > 0.5 &&
        questionResultsWithReflectionNum / el.questions.length <= 0.9
      ) {
        criteria.hasReflected = true;
        criteria.mark += 20;
      } else if (
        questionResultsWithReflectionNum / el.questions.length > 0.1 &&
        questionResultsWithReflectionNum / el.questions.length <= 0.5
      ) {
        criteria.hasReflected = true;
        criteria.mark += 10;
      }

      // Assigning total results to the problem
      el.totalResults = criteria;
      return el;
    }
  });
  console.log("results", results);
  return results;
};

export const analyzeTextEditorStudentPerformance = (
  availableData,
  res,
  lesson
) => {
  let results = availableData.map((el) => {
    if (el.type.toLowerCase() === "texteditor") {
      let practice = 0; // needed to calculate practice level
      let correctAnswersNum = 0; // needed to calculate practice level
      let questionResultsWithReflectionNum = 0; // needed to calculate reflection level

      // 1. Set the criteria by which you analyze how well the student has coped with the problem
      let criteria = {
        hasLearnt: true,
        hasPracticed: false,
        hasReceivedFeedback: false,
        hasReflected: false,
        mark: 0,
        feedbackRate: 0,
        completionRate: 0,
        weakQuestions: [],
        unreflectedQuestions: [],
      };

      // How do we use these criteria?

      // – if the student has given answers to exercises we assume that they have practiced and has received feedback. Student can get up to 30 total points. The final points depend on how many exercises have the student completed.
      // – if the student has given correct asnwers to exercises we assume that they have received feedback. They now know which answer is correct. Student can get up to 40 total points. The final points depend on how many exercises have the student completed.
      // - if the student has used additional functions (like hints, explanations, etc) we assume that they have reflected on the feedback. Student gets 30 total points. The final points depend on how many exercises have the student completed.

      // 3. Has the student practiced. received feedback and reflected?
      el.questions &&
        el.questions.forEach((question) => {
          console.log("question", question);
          // 3.1 the student gets a point for every question which has saved results
          if (question?.results?.length > 0) {
            practice += 1;
          }

          // 3.2 the student gets a point for every question that has saved results with correct answers

          if (question.__typename === "Quiz") {
            if (question.type.toLowerCase() === "test") {
              let correctAnswers = question.results.filter(
                (result) => result.correct || parseFloat(result.result) > 65
              );
              if (correctAnswers.length == 0) {
                criteria.weakQuestions.push(question);
              }
              if (correctAnswers.length > 0) {
                correctAnswersNum += 1;
              }
            } else if (
              question.type.toLowerCase() === "findall" ||
              question.type.toLowerCase() === "generate"
            ) {
              let correctAnswers = question.results.filter((result) => {
                if (result.ideasList && result.ideasList.quizIdeas) {
                  return (
                    result.ideasList.quizIdeas.filter(
                      (idea) => parseFloat(idea.result) > 60
                    ).length > 0
                  );
                }
                return false;
              });
              if (correctAnswers.length == 0) {
                criteria.weakQuestions.push(question);
              }
              if (correctAnswers.length > 0) {
                correctAnswersNum += 1;
              }
            }
            // 3.3. Has the student reflected on the feedback?
            let questionResultsWithReflection = question.results?.filter(
              (result) => result.improvement !== "" || result.explanation !== ""
            );
            if (questionResultsWithReflection.length == 0) {
              criteria.unreflectedQuestions.push(question);
            }
            if (questionResultsWithReflection.length > 0) {
              questionResultsWithReflectionNum += 1;
            }
          } else if (question.__typename === "Problem") {
            console.log("lesson", lesson);
            let updatedProblem = populateProblemsWithQuestions(
              [question],
              lesson
            );

            console.log("updatedProblem", updatedProblem);
            // let correctAnswers = question.results.filter(
            //   (result) => result.correct || parseFloat(result.result) > 65
            // );
            // if (correctAnswers.length == 0) {
            //   criteria.weakQuestions.push(question);
            // }
            // if (correctAnswers.length > 0) {
            //   correctAnswersNum += 1;
            // }
          }
        });

      console.log("practice", practice, el.questions.length);
      console.log("correctAnswersNum", correctAnswersNum, el.questions.length);
      console.log(
        "questionResultsWithReflectionNum",
        questionResultsWithReflectionNum
      );

      // Practice rate calculation
      if ((practice / el.questions.length) * 100 > 90) {
        criteria.mark += 30;
      } else if (
        (practice / el.questions.length) * 100 > 50 &&
        (practice / el.questions.length) * 100 <= 90
      ) {
        criteria.mark += 15;
      }

      // Feedback rate calculation
      criteria.feedbackRate =
        (correctAnswersNum / el.questions.length).toFixed(2) * 100;
      if (criteria.feedbackRate > 90) {
        criteria.hasReceivedFeedback = true;
        criteria.mark += 40;
      } else if (criteria.feedbackRate > 50 && criteria.feedbackRate <= 90) {
        criteria.hasReceivedFeedback = true;
        criteria.mark += 20;
      }

      // Reflection check
      if (questionResultsWithReflectionNum / el.questions.length > 0.9) {
        criteria.hasReflected = true;
        criteria.mark += 30;
      } else if (
        questionResultsWithReflectionNum / el.questions.length > 0.5 &&
        questionResultsWithReflectionNum / el.questions.length <= 0.9
      ) {
        criteria.hasReflected = true;
        criteria.mark += 20;
      } else if (
        questionResultsWithReflectionNum / el.questions.length > 0.1 &&
        questionResultsWithReflectionNum / el.questions.length <= 0.5
      ) {
        criteria.hasReflected = true;
        criteria.mark += 10;
      }

      // Assigning total results to the problem
      el.totalResults = criteria;
      return el;
    }
  });
  console.log("results", results);
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
  let insights = [];
  const res = await Promise.all(
    availableData.map(async (el, i) => {
      try {
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: `You are an AI assistant specializing in legal training and Learning and Development (L&D).
          Your objective is to help L&D manager prepare a comprehensive, insightful, and captivating L&D report on the progress of their students.
          Write an paragraph of the report on how well the student solved the problem using the following data.
          The name of the student: """ ${student.name} """.
          The name of the task: """ ${el.name} """.
          The number of the task: """ ${i + 1} """.
          The goal of the task: """ ${el.goal} """.
          Student grade is """ ${el.totalResults.mark} """ out of 100.
          Has the student practiced enough? """ ${
            el.totalResults.hasPracticed
          } """.
          Has the student got enough feedback? """ ${
            el.totalResults.hasReceivedFeedback
          } """.
          Has the student reflected on their errors? """ ${
            el.totalResults.hasReflected
          } """.
          The student's weak points that they need to work more on: """ ${el.totalResults.weakQuestions
            .map((el) => `<li>${el.question}</li>`)
            .join("")} """.
          Recommendations: The student does not yet have necessary skills. Go through simulator one more time.
          Use this paragraph as an example.
          1. "<h3>Task 1. What is a contract?</h3><p>
          <p>The goal of this task was to make sure that the student understands what is contract and waht are its essential elements. 
          Michael has not yet mastered this new skill yet. Theie overall grade is 50. They have worked throught the problem, answered questions and received some feedback.
          But thet have not spent enought time reflecting on some questions. Especailly their weak points and area of growth are the differences between offer and acceptance and the legal nature of consideration. 
          Our recommendation is that they go through the simulator one more time and spend more time thinking over the case studies.</p>"
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
          insights.push(data.result.content);
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
