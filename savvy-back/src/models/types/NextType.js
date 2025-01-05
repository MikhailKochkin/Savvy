const { inputObjectType } = require("nexus");

const Email = inputObjectType({
  name: "Email",
  definition(t) {
    t.string("name", { description: "Name of the email template." });
    t.string("header", { description: "Header of the email." });
    t.string("text", { description: "Content or body of the email." });
    t.int("number", { description: "Sequence number of the email." });
  },
});

const EmailsList = inputObjectType({
  name: "EmailsList",
  definition(t) {
    t.list.field("emails", {
      type: "Email",
      description: "List of emails in a campaign.",
    });
  },
});

const Promocode = inputObjectType({
  name: "Promocode",
  definition(t) {
    t.string("name", { description: "Name of the promocode." });
    t.float("value", { description: "Discount value of the promocode." });
  },
});

const PromocodeList = inputObjectType({
  name: "PromocodeList",
  definition(t) {
    t.list.field("promocodes", {
      type: "Promocode",
      description: "List of available promocodes.",
    });
  },
});

const SalesStage = inputObjectType({
  name: "SalesStage",
  definition(t) {
    t.string("name", { description: "Name of the sales stage." });
    t.string("date", { description: "Date associated with the sales stage." });
  },
});

const SalesCycle = inputObjectType({
  name: "SalesCycle",
  definition(t) {
    t.list.field("stages", {
      type: "SalesStage",
      description: "List of stages in the sales cycle.",
    });
  },
});

const ProgramModule = inputObjectType({
  name: "ProgramModule",
  definition(t) {
    t.string("header", { description: "Header for the program module." });
    t.list.string("topic", { description: "Topics covered in the module." });
  },
});

const Syllabus = inputObjectType({
  name: "Syllabus",
  definition(t) {
    t.list.field("modules", {
      type: "ProgramModule",
      description: "List of program modules in the syllabus.",
    });
  },
});

const Price = inputObjectType({
  name: "Price",
  definition(t) {
    t.string("name", { description: "Name of the price plan." });
    t.string("description", { description: "Description of the price plan." });
    t.int("price", { description: "Price value in the specified currency." });
    t.float("discount", { description: "Discount applied to the price." });
    t.string("currency", { description: "Currency of the price." });
    t.string("timer", { description: "Timer or deadline for the price plan." });
    t.int("places", {
      description: "Number of available places in the price plan.",
    });
    t.string("buttonText", {
      description: "Text displayed on the purchase button.",
    });
  },
});

const Prices = inputObjectType({
  name: "Prices",
  definition(t) {
    t.list.field("prices", {
      type: "Price",
      description: "List of available prices.",
    });
  },
});

const QuestList = inputObjectType({
  name: "QuestList",
  definition(t) {
    t.list.field("questElements", {
      type: "QuestElement",
      description: "List of elements in the quest.",
    });
  },
});

const QuestElement = inputObjectType({
  name: "QuestElement",
  definition(t) {
    t.string("type", { description: "The type of the quest element." });
    t.string("value", { description: "The value of the quest element." });
    t.int("number", {
      description: "The position number of the element in the quest.",
    });
  },
});

const LessonInModule = inputObjectType({
  name: "LessonInModule",
  definition(t) {
    t.string("id", { description: "The ID of the lesson in the module." });
  },
});

const Module = inputObjectType({
  name: "Module",
  definition(t) {
    t.int("number", {
      description: "The number of the module in the program.",
    });
    t.string("name", { description: "The name of the module." });
    t.list.field("lessonsInModule", {
      type: "LessonInModule",
      description: "List of lessons contained within the module.",
    });
  },
});

const Modules = inputObjectType({
  name: "Modules",
  definition(t) {
    t.list.field("modules", {
      type: "Module",
      description: "List of modules in the program.",
    });
  },
});

const EmailInfo = inputObjectType({
  name: "EmailInfo",
  definition(t) {
    t.string("course_name", { description: "Name of the course." });
    t.string("student_name", { description: "Name of the student." });
    t.int("lessons_number", { description: "Total number of lessons." });
    t.int("completed_lessons_number", {
      description: "Number of completed lessons.",
    });
    t.field("lesResultsList", {
      type: "LesResultsList",
      description: "Results list for the lessons.",
    });
  },
});

const LesResultsList = inputObjectType({
  name: "LesResultsList",
  definition(t) {
    t.list.field("lesResults", {
      type: "LesResult",
      description: "List of individual lesson results.",
    });
  },
});

const LesResult = inputObjectType({
  name: "LesResult",
  definition(t) {
    t.int("progress", { description: "Progress in the lesson." });
    t.int("lesson_number", { description: "Number of the lesson." });
    t.int("lesson_size", { description: "Size of the lesson content." });
    t.string("lesson_name", { description: "Name of the lesson." });
    t.int("visits", { description: "Number of visits to the lesson." });
  },
});

const MyProgress = inputObjectType({
  name: "MyProgress",
  definition(t) {
    t.string("name", { description: "Name of the progress item." });
    t.int("progress", { description: "Progress percentage or value." });
  },
});

const MyProgressList = inputObjectType({
  name: "MyProgressList",
  definition(t) {
    t.list.field("progressList", {
      type: "MyProgress",
      description: "List of progress items.",
    });
  },
});

const ConsumedContent = inputObjectType({
  name: "ConsumedContent",
  definition(t) {
    t.string("id", {
      description: "Unique identifier for the consumed content.",
    });
    t.string("type", { description: "Type of the consumed content." });
    t.list.string("tags", { description: "Tags associated with the content." });
  },
});

const ConsumedContentList = inputObjectType({
  name: "ConsumedContentList",
  definition(t) {
    t.list.field("consumedContentList", {
      type: "ConsumedContent",
      description: "List of consumed content items.",
    });
  },
});

const Mark = inputObjectType({
  name: "Mark",
  definition(t) {
    t.string("name", { description: "Name of the mark or grade." });
    t.int("level", { description: "Level associated with the mark." });
    t.string("message", {
      description: "Message or feedback associated with the mark.",
    });
  },
});

const MarksList = inputObjectType({
  name: "MarksList",
  definition(t) {
    t.list.field("marksList", {
      type: "Mark",
      description: "List of marks or grades.",
    });
  },
});

// const ConstructionAnswers = inputObjectType({
//   name: "ConstructionAnswers",
//   definition(t) {
//     t.list.field("answers", {
//       type: "AnswerItem",
//       description: "List of answers for construction exercises.",
//     });
//   },
// });

// const AnswerItem = inputObjectType({
//   name: "AnswerItem",
//   definition(t) {
//     t.string("id", { description: "Unique identifier for the answer." });
//     t.string("studentAnswer", {
//       description: "Answer provided by the student.",
//     });
//     t.string("correctAnswer", { description: "Correct answer." });
//     t.string("res", { description: "Result of the answer evaluation." });
//   },
// });
module.exports = {
  Promocode,
  PromocodeList,
  LesResult,
  LesResultsList,
  EmailInfo,
  QuestElement,
  QuestList,
  SalesStage,
  SalesCycle,
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
};
