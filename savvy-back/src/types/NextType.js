const { inputObjectType } = require("nexus");

const NextTrueType = inputObjectType({
  name: "NextTrueType",
  definition(t) {
    t.string("type");
    t.string("value");
  },
});

const NextFalseType = inputObjectType({
  name: "NextFalseType",
  definition(t) {
    t.string("type");
    t.string("value");
  },
});

const BranchItem = inputObjectType({
  name: "BranchItem",
  definition(t) {
    t.string("source");
    t.string("type");
    t.string("value");
  },
});

const NextType = inputObjectType({
  name: "NextType",
  definition(t) {
    t.field("true", { type: "NextTrueType" });
    t.field("false", { type: "NextFalseType" });
    t.list.field("branches", { type: "BranchItem" });
  },
});

const Position = inputObjectType({
  name: "Position",
  definition(t) {
    t.int("x");
    t.int("y");
  },
});

const ProblemItem = inputObjectType({
  name: "ProblemItem",
  definition(t) {
    t.string("type");
    t.string("id");
    t.int("index");
    t.field("next", { type: "NextType" });
    t.field("position", { type: "Position" });
  },
});

const ProblemStructure = inputObjectType({
  name: "ProblemStructure",
  definition(t) {
    t.list.field("problemItems", { type: "ProblemItem" });
  },
});

const ComplexTestAnswer = inputObjectType({
  name: "ComplexTestAnswer",
  definition(t) {
    t.string("id");
    t.string("answer");
  },
});

const ComplexTestAnswers = inputObjectType({
  name: "ComplexTestAnswers",
  definition(t) {
    t.list.field("complexTestAnswers", { type: "ComplexTestAnswer" });
  },
});

const QuizIdea = inputObjectType({
  name: "QuizIdea",
  definition(t) {
    t.string("idea");
    t.string("result");
    t.string("next_id");
    t.string("next_type");
  },
});

const QuizIdeas = inputObjectType({
  name: "QuizIdeas",
  definition(t) {
    t.list.field("quizIdeas", { type: "QuizIdea" });
  },
});

const AnswerElement = inputObjectType({
  name: "AnswerElement",
  definition(t) {
    t.string("answer");
    t.string("next_id");
    t.string("next_type");
    t.int("index");
  },
});

const ComplexAnswer = inputObjectType({
  name: "ComplexAnswer",
  definition(t) {
    t.list.field("answerElements", { type: "AnswerElement" });
  },
});

const LessonItem = inputObjectType({
  name: "LessonItem",
  definition(t) {
    t.string("type");
    t.string("id");
  },
});

const LessonStructure = inputObjectType({
  name: "LessonStructure",
  definition(t) {
    t.list.field("lessonItems", { type: "LessonItem" });
  },
});

const Email = inputObjectType({
  name: "Email",
  definition(t) {
    t.string("name");
    t.string("header");
    t.string("text");
    t.int("number");
  },
});

const EmailsList = inputObjectType({
  name: "EmailsList",
  definition(t) {
    t.list.field("emails", { type: "Email" });
  },
});

const Promocode = inputObjectType({
  name: "Promocode",
  definition(t) {
    t.string("name");
    t.float("value");
  },
});

const PromocodeList = inputObjectType({
  name: "PromocodeList",
  definition(t) {
    t.list.field("promocodes", { type: "Promocode" });
  },
});

const SalesStage = inputObjectType({
  name: "SalesStage",
  definition(t) {
    t.string("name");
    t.string("date");
  },
});

const SalesCycle = inputObjectType({
  name: "SalesCycle",
  definition(t) {
    t.list.field("stages", { type: "SalesStage" });
  },
});

const ClientMessage = inputObjectType({
  name: "ClientMessage",
  definition(t) {
    t.string("message");
    t.string("subject");
    t.string("date");
  },
});

const ClientMessages = inputObjectType({
  name: "ClientMessages",
  definition(t) {
    t.list.field("messages", { type: "ClientMessage" });
  },
});

const ProgramModule = inputObjectType({
  name: "ProgramModule",
  definition(t) {
    t.string("header");
    t.list.string("topic");
  },
});

const Syllabus = inputObjectType({
  name: "Syllabus",
  definition(t) {
    t.list.field("modules", { type: "ProgramModule" });
  },
});

const Price = inputObjectType({
  name: "Price",
  definition(t) {
    t.string("name");
    t.string("description");
    t.int("price");
    t.float("discount");
    t.string("currency");
    t.string("timer");
    t.int("places");
    t.string("buttonText");
  },
});

const Prices = inputObjectType({
  name: "Prices",
  definition(t) {
    t.list.field("prices", { type: "Price" });
  },
});

const QuestList = inputObjectType({
  name: "QuestList",
  definition(t) {
    t.list.field("questElements", { type: "QuestElement" });
  },
});

const QuestElement = inputObjectType({
  name: "QuestElement",
  definition(t) {
    t.string("type");
    t.string("value");
    t.int("number");
  },
});

const LessonInModule = inputObjectType({
  name: "LessonInModule",
  definition(t) {
    t.string("id");
  },
});

const Module = inputObjectType({
  name: "Module",
  definition(t) {
    t.int("number");
    t.string("name");
    t.list.field("lessonsInModule", { type: "LessonInModule" });
  },
});

const Modules = inputObjectType({
  name: "Modules",
  definition(t) {
    t.list.field("modules", { type: "Module" });
  },
});

const Element = inputObjectType({
  name: "Element",
  definition(t) {
    t.string("type");
    t.string("value");
    t.string("text");
    t.string("comment");
    t.int("place");
    t.int("size");
    t.int("rows");
    t.boolean("inDoc");
    t.boolean("isTest");
    t.boolean("edit");
    t.field("borders", { type: "Borders" });
  },
});

const Borders = inputObjectType({
  name: "Borders",
  definition(t) {
    t.string("top");
    t.string("right");
    t.string("bottom");
    t.string("left");
  },
});

const ElementsList = inputObjectType({
  name: "ElementsList",
  definition(t) {
    t.list.field("elements", { type: "Element" });
  },
});

const EmailInfo = inputObjectType({
  name: "EmailInfo",
  definition(t) {
    t.string("course_name");
    t.string("student_name");
    t.int("lessons_number");
    t.int("completed_lessons_number");
    t.field("lesResultsList", { type: "LesResultsList" });
  },
});

const LesResultsList = inputObjectType({
  name: "LesResultsList",
  definition(t) {
    t.list.field("lesResults", { type: "LesResult" });
  },
});

const LesResult = inputObjectType({
  name: "LesResult",
  definition(t) {
    t.int("progress");
    t.int("lesson_number");
    t.int("lesson_size");
    t.string("lesson_name");
    t.int("visits");
  },
});

const MyProgress = inputObjectType({
  name: "MyProgress",
  definition(t) {
    t.string("name");
    t.int("progress");
  },
});

const MyProgressList = inputObjectType({
  name: "MyProgressList",
  definition(t) {
    t.list.field("progressList", { type: "MyProgress" });
  },
});

const ConsumedContent = inputObjectType({
  name: "ConsumedContent",
  definition(t) {
    t.string("id");
    t.string("type");
    t.list.string("tags");
  },
});

const ConsumedContentList = inputObjectType({
  name: "ConsumedContentList",
  definition(t) {
    t.list.field("consumedContentList", { type: "ConsumedContent" });
  },
});

const Mark = inputObjectType({
  name: "Mark",
  definition(t) {
    t.string("name");
    t.int("level");
    t.string("message");
  },
});

const MarksList = inputObjectType({
  name: "MarksList",
  definition(t) {
    t.list.field("marksList", { type: "Mark" });
  },
});

const Review = inputObjectType({
  name: "Review",
  definition(t) {
    t.string("name");
    t.string("text");
    t.string("image");
    t.string("source");
  },
});

const ReviewsList = inputObjectType({
  name: "ReviewsList",
  definition(t) {
    t.list.field("reviews", { type: "Review" });
  },
});

const ConstructionAnswers = inputObjectType({
  name: "ConstructionAnswers",
  definition(t) {
    t.list.field("answers", { type: "AnswerItem" });
  },
});

const AnswerItem = inputObjectType({
  name: "AnswerItem",
  definition(t) {
    t.string("id");
    t.string("studentAnswer");
    t.string("correctAnswer");
    t.string("res");
  },
});

module.exports = {
  NextType,
  NextTrueType,
  NextFalseType,
  LessonItem,
  LessonStructure,
  Promocode,
  PromocodeList,
  LesResult,
  LesResultsList,
  EmailInfo,
  ProblemItem,
  ProblemStructure,
  Element,
  ElementsList,
  QuestElement,
  QuestList,
  SalesStage,
  SalesCycle,
  ClientMessages,
  ClientMessage,
  Price,
  Prices,
  LessonInModule,
  Module,
  Modules,
  EmailsList,
  Email,
  MyProgressList,
  MyProgress,
  ConsumedContentList,
  ConsumedContent,
  Mark,
  MarksList,
  Syllabus,
  ProgramModule,
  ReviewsList,
  Review,
  Borders,
  ConstructionAnswers,
  AnswerItem,
  AnswerElement,
  ComplexAnswer,
  QuizIdeas,
  QuizIdea,
  ComplexTestAnswers,
  ComplexTestAnswer,
  BranchItem,
  Position,
};
