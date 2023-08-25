const { objectType } = require("nexus");

const Stats = objectType({
  name: "Stats",
  definition(t) {
    t.list.field("testResults", { type: "TestResult", ordering: true });
    t.list.field("quizResults", { type: "QuizResult", ordering: true });
    t.list.field("textEditorResults", {
      type: "TextEditorResult",
      ordering: true,
    });
    t.list.field("problemResults", { type: "ProblemResult", ordering: true });
    t.list.field("shotResults", {
      type: "ShotResult",
      ordering: true,
    });

    t.list.field("constructionResults", {
      type: "ConstructionResult",
      ordering: true,
    });
    t.list.field("documentResults", {
      type: "DocumentResult",
      ordering: true,
    });
    t.list.field("feedbacks", {
      type: "Feedback",
      ordering: true,
    });
  },
});

const QuestResults = objectType({
  name: "QuestResults",
  definition(t) {
    t.list.field("testResults", { type: "TestResult", ordering: true });
    t.list.field("quizResults", { type: "QuizResult", ordering: true });
    t.list.field("lessonResults", { type: "LessonResult", ordering: true });

    // t.list.field("textEditorResults", {
    //   type: "TextEditorResult",
    //   ordering: true,
    // });
    // t.list.field("problemResults", { type: "ProblemResult", ordering: true });
    // t.list.field("constructionResults", {
    //   type: "ConstructionResult",
    //   ordering: true,
    // });
    // t.list.field("documentResults", {
    //   type: "DocumentResult",
    //   ordering: true,
    // });
    // t.list.field("feedbacks", {
    //   type: "Feedback",
    //   ordering: true,
    // });
  },
});

module.exports = { Stats, QuestResults };
