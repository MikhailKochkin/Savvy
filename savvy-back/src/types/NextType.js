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

module.exports = {
  NextType,
  NextTrueType,
  NextFalseType,
  LessonItem,
  LessonStructure,
  Promocode,
  PromocodeList,
  // Message,
  // Messages,
};
