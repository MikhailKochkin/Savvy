const { objectType } = require("@nexus/schema");

const NewTest = objectType({
  name: "NewTest",
  definition(t) {
    t.model.id();
    t.model.ifRight();
    t.model.ifWrong();
    t.model.type();
    t.model.lessonID();
    t.model.next();
    t.model.question();
    t.model.answers();
    t.model.correct();
    t.model.userId();
    t.model.lessonId();
    t.model.userId();
    t.model.user();
    t.model.lesson();
    t.model.testResults();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

const Quiz = objectType({
  name: "Quiz",
  definition(t) {
    t.model.id();
    t.model.question();
    t.model.answer();
    t.model.type();
    t.model.next();
    t.model.ifRight();
    t.model.ifWrong();
    t.model.lessonID();
    t.model.next();
    t.model.check();
    t.model.userId();
    t.model.lessonId();
    t.model.lesson();
    t.model.user();
    t.model.quizResults();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

const Note = objectType({
  name: "Note",
  definition(t) {
    t.model.id();
    t.model.text();
    t.model.next();
    t.model.userId();
    t.model.lessonId();
    t.model.lesson();
    t.model.user();
    t.model.lessonID();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

const TextEditor = objectType({
  name: "TextEditor",
  definition(t) {
    t.model.id();
    t.model.text();
    t.model.name();
    t.model.userId();
    t.model.lessonId();
    t.model.lesson();
    t.model.user();
    t.model.lessonID();
    t.model.textEditorResults();
    t.model.totalMistakes();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

const Construction = objectType({
  name: "Construction",
  definition(t) {
    t.model.id();
    t.model.hint();
    t.model.name();
    t.model.type();
    t.model.variants();
    t.model.answer();
    t.model.userId();
    t.model.lessonId();
    t.model.lesson();
    t.model.user();
    t.model.lessonID();
    t.model.constructionResults();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

const Problem = objectType({
  name: "Problem",
  definition(t) {
    t.model.id();
    t.model.text();
    t.model.nodeType();
    t.model.nodeID();
    t.model.userId();
    t.model.lessonId();
    t.model.lesson();
    t.model.user();
    t.model.lessonID();
    t.model.problemResults();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

const Forum = objectType({
  name: "Forum",
  definition(t) {
    t.model.id();
    t.model.text();
    t.model.user();
    t.model.userId();
    t.model.lessonId();
    t.model.lesson();
    t.model.rating();
    t.model.statements();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

const Rating = objectType({
  name: "Rating",
  definition(t) {
    t.model.id();
    t.model.rating();
    t.model.user();
    t.model.userId();
    t.model.forumId();
    t.model.forum();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

const Statement = objectType({
  name: "Statement",
  definition(t) {
    t.model.id();
    t.model.text();
    t.model.user();
    t.model.userId();
    t.model.forumId();
    t.model.forum();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

const Shot = objectType({
  name: "Shot",
  definition(t) {
    t.model.id();
    t.model.title();
    t.model.parts();
    t.model.comments();
    t.model.lessonID();
    t.model.userId();
    t.model.lessonId();
    t.model.user();
    t.model.lesson();
    t.model.shotResults();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

const Document = objectType({
  name: "Document",
  definition(t) {
    t.model.id();
    t.model.title();
    t.model.clauses();
    t.model.userId();
    t.model.lessonId();
    t.model.user();
    t.model.lesson();
    t.model.documentResults();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

const Clause = objectType({
  name: "Clause",
  definition(t) {
    t.model.id();
    t.model.number();
    t.model.commentary();
    t.model.sample();
    t.model.keywords();
    t.model.userId();
    t.model.documentId();
    t.model.user();
    t.model.document();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

module.exports = {
  NewTest,
  Shot,
  Quiz,
  Note,
  TextEditor,
  Construction,
  Problem,
  Forum,
  Rating,
  Statement,
  Shot,
  Document,
  Clause,
};
