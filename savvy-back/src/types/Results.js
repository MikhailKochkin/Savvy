const { objectType, inputObjectType } = require("nexus");

const TestResult = objectType({
  name: "TestResult",
  definition(t) {
    t.model.id();
    t.model.answer();
    t.model.answerArray();
    t.model.attempts();
    t.model.lessonID();
    t.model.testID();
    t.model.studentId();
    t.model.lessonId();
    t.model.testId();
    t.model.lesson();
    t.model.student();
    t.model.test();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

const QuizResult = objectType({
  name: "QuizResult",
  definition(t) {
    t.model.id();
    t.model.answer();
    t.model.comment();
    t.model.attempts();
    t.model.hint();
    t.model.ideas();
    t.model.ideasList();
    t.model.explanation();
    t.model.improvement();
    t.model.correct();
    t.model.lessonID();
    t.model.quizId();
    t.model.studentId();
    t.model.lessonId();
    t.model.lesson();
    t.model.student();
    t.model.quiz();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

const TextEditorResult = objectType({
  name: "TextEditorResult",
  definition(t) {
    t.model.id();
    t.model.wrong();
    t.model.attempts();
    t.model.correct();
    t.model.result();
    t.model.guess();
    t.model.type();
    t.model.textEditorId();
    t.model.studentId();
    t.model.lessonId();
    t.model.lesson();
    t.model.student();
    t.model.textEditor();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

const ConstructionResult = objectType({
  name: "ConstructionResult",
  definition(t) {
    t.model.id();
    t.model.answer();
    t.model.attempts();
    t.model.constructionID();
    t.model.inputs();
    t.model.lessonID();
    t.model.lessonId();
    t.model.constructionId();
    t.model.studentId();
    t.model.lessonId();
    t.model.lesson();
    t.model.student();
    t.model.construction();
    t.model.createdAt();
    t.model.updatedAt();
    t.model.answers();
    t.model.elements();
  },
});

const ProblemResult = objectType({
  name: "ProblemResult",
  definition(t) {
    t.model.id();
    t.model.answer();
    t.model.revealed();
    t.model.depth();
    t.model.problemID();
    t.model.lessonID();
    t.model.lessonId();
    t.model.problemId();
    t.model.studentId();
    t.model.lesson();
    t.model.student();
    t.model.problem();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

const ShotResult = objectType({
  name: "ShotResult",
  definition(t) {
    t.model.id();
    t.model.answer();
    t.model.lessonId();
    t.model.shotId();
    t.model.studentId();
    t.model.lesson();
    t.model.student();
    t.model.shot();
    t.model.depth();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

const DocumentResult = objectType({
  name: "DocumentResult",
  definition(t) {
    t.model.id();
    t.model.answers();
    t.model.drafts();
    t.model.lessonId();
    t.model.documentId();
    t.model.userId();
    t.model.lesson();
    t.model.user();
    t.model.document();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

const ChallengeResult = objectType({
  name: "ChallengeResult",
  definition(t) {
    t.model.id();
    t.model.correct();
    t.model.wrong();
    t.model.time();
    t.model.studentId();
    t.model.student();
    t.model.lesson();
    t.model.lessonId();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

const TestPracticeResult = objectType({
  name: "TestPracticeResult",
  definition(t) {
    t.model.id();
    t.model.correct();
    t.model.tasks();
    t.model.testPracticeId();
    t.model.studentId();
    t.model.lessonId();
    t.model.lesson();
    t.model.student();
    t.model.testPractice();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

const TeamQuestResult = objectType({
  name: "TeamQuestResult",
  definition(t) {
    t.model.id();
    t.model.answer();
    t.model.createdAt();
    t.model.updatedAt();
    t.model.studentId();
    t.model.lessonId();
    t.model.teamQuestId();
    t.model.teamQuest();
    t.model.lesson();
    t.model.student();
  },
});

module.exports = {
  TestResult,
  QuizResult,
  TextEditorResult,
  ConstructionResult,
  ProblemResult,
  ShotResult,
  DocumentResult,
  ChallengeResult,
  TestPracticeResult,
  TeamQuestResult,
};
