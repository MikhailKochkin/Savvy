const { objectType } = require("nexus");

const Stats = objectType({
  name: "Stats",
  definition(t) {
    t.list.field("testResults", {
      type: "TestResult",
      ordering: true,
      description: "List of test results associated with stats.",
    });
    t.list.field("quizResults", {
      type: "QuizResult",
      ordering: true,
      description: "List of quiz results associated with stats.",
    });
    t.list.field("textEditorResults", {
      type: "TextEditorResult",
      ordering: true,
      description: "List of text editor results associated with stats.",
    });
    t.list.field("problemResults", {
      type: "ProblemResult",
      ordering: true,
      description: "List of problem results associated with stats.",
    });
    t.list.field("shotResults", {
      type: "ShotResult",
      ordering: true,
      description: "List of shot results associated with stats.",
    });
    t.list.field("constructionResults", {
      type: "ConstructionResult",
      ordering: true,
      description: "List of construction results associated with stats.",
    });
    t.list.field("documentResults", {
      type: "DocumentResult",
      ordering: true,
      description: "List of document results associated with stats.",
    });
    t.list.field("feedbacks", {
      type: "Feedback",
      ordering: true,
      description: "List of feedback entries associated with stats.",
    });
    t.list.field("testPracticeResults", {
      type: "TestPracticeResult",
      ordering: true,
      description: "List of test practice results associated with stats.",
    });
  },
});

const QuestResults = objectType({
  name: "QuestResults",
  definition(t) {
    t.list.field("testResults", {
      type: "TestResult",
      ordering: true,
      description: "List of test results associated with quest results.",
    });
    t.list.field("quizResults", {
      type: "QuizResult",
      ordering: true,
      description: "List of quiz results associated with quest results.",
    });
    t.list.field("lessonResults", {
      type: "LessonResult",
      ordering: true,
      description: "List of lesson results associated with quest results.",
    });

    // Uncomment the following fields if needed:
    // t.list.field("textEditorResults", {
    //   type: "TextEditorResult",
    //   ordering: true,
    //   description: "List of text editor results associated with quest results."
    // });
    // t.list.field("problemResults", {
    //   type: "ProblemResult",
    //   ordering: true,
    //   description: "List of problem results associated with quest results."
    // });
    // t.list.field("constructionResults", {
    //   type: "ConstructionResult",
    //   ordering: true,
    //   description: "List of construction results associated with quest results."
    // });
    // t.list.field("documentResults", {
    //   type: "DocumentResult",
    //   ordering: true,
    //   description: "List of document results associated with quest results."
    // });
    // t.list.field("feedbacks", {
    //   type: "Feedback",
    //   ordering: true,
    //   description: "List of feedback entries associated with quest results."
    // });
  },
});

module.exports = { Stats, QuestResults };
