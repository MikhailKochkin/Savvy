const { inputObjectType, objectType, list } = require("@nexus/schema");

const Option = inputObjectType({
  name: "Option",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.string("name");
    t.nonNull.int("value");
    t.nonNull.int("num");
  },
});

const Options = inputObjectType({
  name: "Options",
  definition(t) {
    t.list.field("optionsArray", { type: "Option" });
  },
});

const SynergyArray = inputObjectType({
  name: "SynergyArray",
  definition(t) {
    t.list.int("value");
  },
});

const Synergy = inputObjectType({
  name: "Synergy",
  definition(t) {
    t.list.field("synergyArrays", { type: "SynergyArray" });
  },
});

const FeedbackArray = inputObjectType({
  name: "FeedbackArray",
  definition(t) {
    t.list.string("value");
  },
});

const DecisionMakerFeedback = inputObjectType({
  name: "DecisionMakerFeedback",
  definition(t) {
    t.list.field("feedbackArrays", { type: "FeedbackArray" });
  },
});

const QualityDecisionMaker = objectType({
  name: "QualityDecisionMaker",
  definition(t) {
    t.model.id();
    t.model.goal();
    t.model.intro();
    t.model.createdAt();
    t.model.updatedAt();
    t.model.name();
    t.model.synergy();
    t.model.feedback();
    t.model.next();
    t.model.options();
    t.model.userId();
    t.model.user();
    t.model.lessonId();
    t.model.lesson();
  },
});

const QuantityOption = inputObjectType({
  name: "QuantityOption",
  definition(t) {
    t.string("id");
    t.string("index");
    t.string("name");
    t.int("value");
    t.int("output");
    t.string("formula");
  },
});

const QuantityOptions = inputObjectType({
  name: "QuantityOptions",
  definition(t) {
    t.list.field("options", { type: "QuantityOption" });
  },
});

const QuantityDecisionMaker = objectType({
  name: "QuantityDecisionMaker",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.intro();
    t.model.goal();
    t.model.options();
    t.model.max();
    t.model.formula();
    t.model.next();
    t.model.createdAt();
    t.model.updatedAt();
    t.model.userId();
    t.model.user();
    t.model.lessonId();
    t.model.lesson();
  },
});

module.exports = {
  Option,
  Options,
  SynergyArray,
  Synergy,
  FeedbackArray,
  DecisionMakerFeedback,
  QualityDecisionMaker,
  QuantityOption,
  QuantityOptions,
  QuantityDecisionMaker,
};
