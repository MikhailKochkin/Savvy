const { objectType, inputObjectType } = require("nexus");

const Lesson = objectType({
  name: "Lesson",
  definition(t) {
    t.string("id");
    t.string("name");
    t.int("number");
    t.string("text");
    t.string("story");
    t.string("type");
    t.string("context");
    t.string("goal");
    t.string("description");
    t.boolean("open");
    t.list.string("tags");
    t.string("banner");
    t.boolean("hasSecret");
    t.int("totalPoints");
    t.int("coursePageID");
    t.string("openSize");
    t.string("change");
    t.list.field("offers", { type: "Offer" });
    t.int("challenge_num");
    t.boolean("published");
    t.string("map");
    t.int("userId");
    t.int("coursePageId");
    t.int("forumId");
    t.field("coursePage", { type: "CoursePage" });
    t.field("structure", { type: "LessonStructure" });
    // t.string("short_structure");
    t.string("assignment");
    t.field("user", { type: "User" });
    t.list.field("lessonResults", { type: "LessonResult" });
    t.list.field("challengeResults", { type: "ChallengeResult" });
    t.list.field("constructionResults", { type: "ConstructionResult" });
    t.list.field("testResults", { type: "TestResult" });
    t.list.field("shotResults", { type: "ShotResult" });
    t.list.field("testPractices", { type: "TestPractice" });
    t.list.field("teamQuests", { type: "TeamQuest" });
    t.list.field("teamQuestResults", { type: "TeamQuestResult" });
    t.list.field("quizResults", { type: "QuizResult" });
    t.list.field("problemResults", { type: "ProblemResult" });
    t.list.field("textEditorResults", { type: "TextEditorResult" });
    t.list.field("processManagers", { type: "ProcessManager" });
    t.list.field("shots", { type: "Shot" });
    t.list.field("notes", { type: "Note" });
    t.list.field("chats", { type: "Chat" });
    t.list.field("quizes", { type: "Quiz" });
    t.list.field("documents", { type: "Document" });
    t.field("forum", { type: "Forum" });
    t.list.field("miniforums", { type: "MiniForum" });
    t.list.field("newTests", { type: "NewTest" });
    t.list.field("problems", { type: "Problem" });
    t.list.field("constructions", { type: "Construction" });
    t.list.field("texteditors", { type: "TextEditor" });
    t.list.field("comments", { type: "Comment" });
    t.field("createdAt", { type: "DateTime" });
    t.field("updatedAt", { type: "DateTime" });
    t.list.field("characters", { type: "Character" });
  },
});

const LessonStructure = objectType({
  name: "LessonStructure",
  definition(t) {
    t.list.field("lessonItems", {
      type: "LessonItem",
      description: "Structure of a lesson with multiple items.",
    });
  },
});

const LessonItem = objectType({
  name: "LessonItem",
  definition(t) {
    t.string("type", { description: "Type of the lesson item." });
    t.string("id", { description: "Unique identifier for the lesson item." });
    t.string("comment", { description: "Additional comments or notes." });
  },
});

// Input Types
const LessonItemInput = inputObjectType({
  name: "LessonItemInput",
  definition(t) {
    t.string("type", { description: "Type of the lesson item." });
    t.string("id", { description: "Unique identifier for the lesson item." });
    t.string("comment", { description: "Additional comments or notes." });
  },
});

const LessonStructureInput = inputObjectType({
  name: "LessonStructureInput",
  definition(t) {
    t.list.field("lessonItems", {
      type: "LessonItemInput",
      description: "Structure of a lesson with multiple items.",
    });
  },
});

const LessonResult = objectType({
  name: "LessonResult",
  definition(t) {
    t.string("id");
    t.field("student", { type: "User" });
    t.field("lesson", { type: "Lesson" });
    t.boolean("checked");
    t.float("progress");
    t.int("visitsNumber");
    t.string("lessonID");
    t.field("createdAt", { type: "DateTime" });
    t.field("updatedAt", { type: "DateTime" });
  },
});

const Character = objectType({
  name: "Character",
  definition(t) {
    t.string("id");
    t.string("name");
    t.string("description");
    t.string("image");
  },
});

const CharacterInput = inputObjectType({
  name: "CharacterInput",
  definition(t) {
    t.string("id");
    t.string("name");
    t.string("description");
    t.string("image");
  },
});

const ChallengeResult = objectType({
  name: "ChallengeResult",
  definition(t) {
    t.string("id");
    t.int("correct");
    t.int("wrong");
    t.int("time");
    t.field("createdAt", { type: "DateTime" });
    t.field("updatedAt", { type: "DateTime" });
    t.field("lesson", { type: "Lesson" });
    t.field("student", { type: "User" });
  },
});

const Feedback = objectType({
  name: "Feedback",
  definition(t) {
    t.string("id");
    t.string("text");
    t.string("lessonId");
    t.string("teacherId");
    t.string("studentId");
    t.field("lesson", { type: "Lesson" });
    t.field("teacher", { type: "User" });
    t.field("student", { type: "User" });
    t.field("createdAt", { type: "DateTime" });
    t.field("updatedAt", { type: "DateTime" });
  },
});

const Comment = objectType({
  name: "Comment",
  definition(t) {
    t.string("id");
    t.string("text");
    t.string("blockId");
    t.string("status");
    t.string("userId");
    t.string("lessonId");
    t.field("lesson", { type: "Lesson" });
    t.field("user", { type: "User" });
    t.string("sourceCommentId");
    t.field("parentComment", { type: "Comment" });
    t.list.field("replies", { type: "Comment" });
    t.field("createdAt", { type: "DateTime" });
    t.field("updatedAt", { type: "DateTime" });
  },
});

module.exports = {
  Lesson,
  LessonResult,
  ChallengeResult,
  Feedback,
  Comment,
  LessonItem,
  LessonStructure,
  LessonItemInput,
  LessonStructureInput,
  Character,
  CharacterInput,
};
