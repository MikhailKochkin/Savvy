const { objectType } = require("@nexus/schema");

const TestResult = objectType({
  name: "TestResult",
  definition(t) {
    t.model.id();
    t.model.answer();
    t.model.atttempts();
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
    t.model.atttempts();
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
    t.model.lessonID();
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
    t.model.atttempts();
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
  },
});

const ProblemResult = objectType({
  name: "ProblemResult",
  definition(t) {
    t.model.id();
    t.model.answer();
    t.model.revealed();
    t.model.shotID();
    t.model.lessonID();
    t.model.lessonId();
    t.model.shotId();
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
    t.model.studentId();
    t.model.lesson();
    t.model.student();
    t.model.document();
    t.model.createdAt();
    t.model.updatedAt();
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
};
