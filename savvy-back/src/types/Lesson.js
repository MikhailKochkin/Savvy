const { objectType } = require("nexus");

const Lesson = objectType({
  name: "Lesson",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.number();
    t.model.text();
    t.model.story();
    t.model.type();
    t.model.context();
    t.model.goal();
    t.model.description();
    t.model.open();
    t.model.tags();
    t.model.banner();
    t.model.hasSecret();
    t.model.totalPoints();
    t.model.coursePageID();
    t.model.openSize();
    t.model.change();
    t.model.offers();
    t.model.challenge_num();
    t.model.published();
    t.model.map();
    t.model.userId();
    t.model.coursePageId();
    t.model.forumId();
    t.model.coursePage();
    t.model.structure();
    t.model.short_structure();
    t.model.assignment();
    t.model.user();
    t.model.lessonResults();
    t.model.challengeResults();
    t.model.constructionResults();
    t.model.testResults();
    t.model.shotResults();
    t.model.testPractices();
    t.model.teamQuests();
    t.model.teamQuestResults();
    t.model.quizResults();
    t.model.problemResults();
    t.model.textEditorResults();
    t.model.processManagers();
    t.model.shots();
    t.model.notes();
    t.model.chats();
    t.model.quizes();
    t.model.documents();
    t.model.forum();
    t.model.miniforums();
    t.model.newTests();
    t.model.problems();
    t.model.constructions();
    t.model.texteditors();
    t.model.comments();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

const LessonResults = objectType({
  name: "LessonResult",
  definition(t) {
    t.model.id();
    t.model.student();
    t.model.lesson();
    t.model.checked();
    t.model.progress();
    t.model.visitsNumber();
    t.model.lessonID();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

const Feedback = objectType({
  name: "Feedback",
  definition(t) {
    t.model.id();
    t.model.text();
    t.model.lessonId();
    t.model.teacherId();
    t.model.studentId();
    t.model.lesson();
    t.model.teacher();
    t.model.student();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

const Comment = objectType({
  name: "Comment",
  definition(t) {
    t.model.id();
    t.model.text();
    t.model.blockId();
    t.model.status();
    t.model.userId();
    t.model.lessonId();
    t.model.lesson();
    t.model.user();
    t.model.sourceCommentId();
    t.model.parentComment();
    t.model.replies();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

module.exports = {
  Lesson,
  LessonResults,
  Feedback,
  Comment,
};
