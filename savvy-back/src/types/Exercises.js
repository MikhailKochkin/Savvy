const { objectType, inputObjectType } = require("nexus");

const NewTest = objectType({
  name: "NewTest",
  definition(t) {
    t.model.id();
    t.model.ifRight();
    t.model.ifWrong();
    t.model.type();
    t.model.goal();
    t.model.goalType();
    t.model.complexity();
    t.model.lessonID();
    t.model.next();
    t.model.name();
    t.model.instructorName();
    t.model.image();
    t.model.comments();
    t.model.question();
    t.model.answers();
    t.model.complexTestAnswers();
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
    t.model.answers();
    t.model.type();
    t.model.goal();
    t.model.goalType();
    t.model.next();
    t.model.name();
    t.model.isOrderOfAnswersImportant();
    t.model.shouldAnswerSizeMatchSample();
    t.model.isScoringShown();
    t.model.instructorName();
    t.model.image();
    t.model.complexity();
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

const TestPractice = objectType({
  name: "TestPractice",
  definition(t) {
    t.model.id();
    t.model.tasks();
    t.model.text();
    t.model.intro();
    t.model.goal();
    t.model.successText();
    t.model.failureText();
    t.model.tasksNum();
    t.model.lessonId();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

const Note = objectType({
  name: "Note",
  definition(t) {
    t.model.id();
    t.model.text();
    t.model.name();
    t.model.next();
    t.model.type();
    t.model.horizontal_image();
    t.model.vertical_image();
    t.model.link_clicks();
    t.model.isSecret();
    t.model.complexity();
    t.model.userId();
    t.model.lessonId();
    t.model.lesson();
    t.model.user();
    t.model.lessonID();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

const Offer = objectType({
  name: "Offer",
  definition(t) {
    t.model.id();
    t.model.text();
    t.model.header();
    t.model.type();
    t.model.courseId();
    t.model.price();
    t.model.discountPrice();
    t.model.userId();
    t.model.lessonId();
    t.model.lesson();
    t.model.user();
    t.model.programId();
    t.model.program();
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
    t.model.complexity();
    t.model.goal();
    t.model.context();
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
    t.model.text();
    t.model.goal();
    t.model.context();
    t.model.columnsNum();
    t.model.elements();
    t.model.hasText();
    t.model.complexity();
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
    t.model.name();
    t.model.nodeType();
    t.model.complexity();
    t.model.isSecret();
    t.model.goal();
    t.model.context();
    t.model.type();
    t.model.nodeID();
    t.model.userId();
    t.model.lessonId();
    t.model.lesson();
    t.model.user();
    t.model.lessonID();
    t.model.problemResults();
    t.model.createdAt();
    t.model.updatedAt();
    t.model.steps();
  },
});

const Forum = objectType({
  name: "Forum",
  definition(t) {
    t.model.id();
    t.model.text();
    t.model.user();
    t.model.userId();
    // t.model.lessonId();
    t.model.lesson();
    t.model.rating();
    t.model.statements();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

const MiniForum = objectType({
  name: "MiniForum",
  definition(t) {
    t.model.id();
    t.model.user();
    t.model.userId();
    t.model.lessonId();
    t.model.lesson();
    t.model.type();
    t.model.value();
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
    t.model.comments();
    t.model.user();
    t.model.userId();
    t.model.answered();
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
    t.model.name();
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
    t.model.name();
    t.model.clauses();
    t.model.userId();
    t.model.complexity();
    t.model.lessonId();
    t.model.goal();
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

const MessageElement = inputObjectType({
  name: "MessageElement",
  definition(t) {
    t.int("number");
    t.string("author");
    t.string("name");
    t.string("text");
    t.string("image");
    t.boolean("isAiAssistantOn");
    t.list.field("reactions", { type: "Reaction" });
  },
});

const Reaction = inputObjectType({
  name: "Reaction",
  definition(t) {
    t.string("reaction");
    t.string("comment");
    t.string("name");
    t.string("image");
  },
});

const Messages = inputObjectType({
  name: "Messages",
  definition(t) {
    t.list.field("messagesList", { type: "MessageElement" });
  },
});

const Chat = objectType({
  name: "Chat",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.type();
    t.model.link_clicks();
    t.model.complexity();
    t.model.messages();
    t.model.isSecret();
    t.model.chatResults();
    t.model.lessonId();
    t.model.lesson();
    t.model.user();
    t.model.chatResults();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

const TeamQuest = objectType({
  name: "TeamQuest",
  definition(t) {
    t.model.id();
    t.model.introduction();
    t.model.solution();
    t.model.tasks();
    t.model.userId();
    t.model.lessonId();
    t.model.lesson();
    t.model.user();
    t.model.createdAt();
    t.model.updatedAt();
    t.model.teamQuestResults();
  },
});

const ProcessManager = objectType({
  name: "ProcessManager",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.backgroundStory();
    t.model.remainingResources();
    t.model.userId();
    t.model.lessonId();
    t.model.user();
    t.model.lesson();
    t.model.nodes();
    t.model.edges();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

// const Messages = inputObjectType({
//   name: "Messages",
//   definition(t) {
//     t.list.field("messagesList", { type: "MessageElement" });
//   },
// });

// const MessageElement = inputObjectType({
//   name: "MessageElement",
//   definition(t) {
//     t.int("number");
//     t.string("author");
//     t.string("name");
//     t.string("text");
//     t.string("image");
//     t.boolean("isAiAssistantOn");
//     t.list.field("reactions", { type: "Reaction" });
//   },
// });

const ProcessNodes = inputObjectType({
  name: "ProcessNodes",
  definition(t) {
    t.list.field("processNodes", { type: "ProcessNode" });
  },
});

const ProcessNode = inputObjectType({
  name: "ProcessNode",
  definition(t) {
    t.string("id");
    t.string("type");
    t.string("label");
    t.string("value");
    t.boolean("canNodeBeUpdated");
    t.string("description");
    t.string("formula");
  },
});

const ProcessEdges = inputObjectType({
  name: "ProcessEdges",
  definition(t) {
    t.list.field("processEdges", { type: "ProcessEdge" });
  },
});

const ProcessEdge = inputObjectType({
  name: "ProcessEdge",
  definition(t) {
    t.string("id");
    t.string("source");
    t.string("target");
  },
});

module.exports = {
  NewTest,
  Shot,
  Chat,
  Messages,
  Reaction,
  MessageElement,
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
  TestPractice,
  MiniForum,
  TeamQuest,
  Offer,
  ProcessManager,
  ProcessNode,
  ProcessNodes,
  ProcessEdges,
  ProcessEdge,
};
