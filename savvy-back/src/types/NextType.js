const { inputObjectType } = require("@nexus/schema");

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

const NextType = inputObjectType({
  name: "NextType",
  definition(t) {
    t.field("true", { type: "NextTrueType" });
    t.field("false", { type: "NextFalseType" });
  },
});

const ProblemItem = inputObjectType({
  name: "ProblemItem",
  definition(t) {
    t.string("type");
    t.string("id");
    t.field("next", { type: "NextType" });
  },
});

const ProblemStructure = inputObjectType({
  name: "ProblemStructure",
  definition(t) {
    t.list.field("problemItems", { type: "ProblemItem" });
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

const QuestElement = inputObjectType({
  name: "QuestElement",
  definition(t) {
    t.string("type");
    t.string("value");
    t.int("number");
  },
});

const QuestList = inputObjectType({
  name: "QuestList",
  definition(t) {
    t.list.field("questElements", { type: "QuestElement" });
  },
});

const Element = inputObjectType({
  name: "Element",
  definition(t) {
    t.string("type");
    t.string("value");
    t.string("text");
    t.int("place");
    t.int("size");
    t.boolean("inDoc");
    t.boolean("isTest");
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
};
