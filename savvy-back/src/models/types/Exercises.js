const { objectType, inputObjectType } = require("nexus");

const NewTest = objectType({
  name: "NewTest",
  definition(t) {
    t.string("id");
    t.string("ifRight");
    t.string("ifWrong");
    t.string("type");
    t.string("goal");
    t.string("goalType");
    t.int("complexity");
    t.int("lessonID");
    t.field("next", { type: "NextType" });
    t.string("name");
    t.string("instructorName");
    t.string("image");
    t.list.string("comments");
    t.list.string("question");
    t.list.string("answers");
    t.field("complexTestAnswers", { type: "ComplexTestAnswers" });
    t.list.boolean("correct");
    t.int("userId");
    t.int("lessonId");
    t.field("user", { type: "User" });
    t.field("lesson", { type: "Lesson" });
    t.list.field("testResults", { type: "TestResult" });
    t.field("createdAt", { type: "DateTime" });
    t.field("updatedAt", { type: "DateTime" });
  },
});

const ComplexTestAnswer = objectType({
  name: "ComplexTestAnswer",
  definition(t) {
    t.string("id", { description: "Unique identifier for the test answer." });
    t.string("answer", { description: "The answer text or value." });
  },
});

const ComplexTestAnswers = objectType({
  name: "ComplexTestAnswers",
  definition(t) {
    t.list.field("complexTestAnswers", {
      type: "ComplexTestAnswer",
      description: "List of answers for a complex test.",
    });
  },
});

const ComplexTestAnswerInput = inputObjectType({
  name: "ComplexTestAnswerInput",
  definition(t) {
    t.string("id", { description: "Unique identifier for the test answer." });
    t.string("answer", { description: "The answer text or value." });
  },
});

const ComplexTestAnswersInput = inputObjectType({
  name: "ComplexTestAnswersInput",
  definition(t) {
    t.list.field("complexTestAnswers", {
      type: "ComplexTestAnswerInput",
      description: "List of answers for a complex test.",
    });
  },
});

const Quiz = objectType({
  name: "Quiz",
  definition(t) {
    t.string("id");
    t.string("question");
    t.string("answer");
    t.field("answers", {
      type: "ComplexAnswer", // Reference the `AnswerElement` type
    });
    t.string("type");
    t.string("goal");
    t.string("goalType");
    t.field("next", { type: "NextType" });
    t.string("name");
    t.boolean("isOrderOfAnswersImportant");
    t.boolean("shouldAnswerSizeMatchSample");
    t.boolean("isScoringShown");
    t.string("instructorName");
    t.string("image");
    t.int("complexity");
    t.string("ifRight");
    t.string("ifWrong");
    t.int("lessonID");
    t.string("check");
    t.int("userId");
    t.int("lessonId");
    t.field("lesson", { type: "Lesson" });
    t.field("user", { type: "User" });
    t.list.field("quizResults", { type: "QuizResult" });
    t.field("createdAt", { type: "DateTime" });
    t.field("updatedAt", { type: "DateTime" });
  },
});

const AnswerElement = objectType({
  name: "AnswerElement",
  definition(t) {
    t.string("id", {
      description: "Unique identifier for the answer element.",
    });
    t.string("answer", { description: "Answer text." });
    t.list.string("relatedAnswers");
    t.string("feedback", { description: "Feedback for the answer." });
    t.string("next_id", {
      description: "ID of the next step after this answer.",
    });
    t.string("next_type", {
      description: "Type of the next step after this answer.",
    });
    t.int("index", { description: "Position or index of the answer." });
  },
});

const ComplexAnswer = objectType({
  name: "ComplexAnswer",
  definition(t) {
    t.list.field("answerElements", {
      type: "AnswerElement",
      description: "List of elements in a complex answer.",
    });
  },
});

const AnswerElementInput = inputObjectType({
  name: "AnswerElementInput",
  definition(t) {
    t.string("id", {
      description: "Unique identifier for the answer element.",
    });
    t.string("answer", { description: "Answer text." });
    t.list.string("relatedAnswers");
    t.string("feedback", { description: "Feedback for the answer." });
    t.string("next_id", {
      description: "ID of the next step after this answer.",
    });
    t.string("next_type", {
      description: "Type of the next step after this answer.",
    });
    t.int("index", { description: "Position or index of the answer." });
  },
});

const ComplexAnswerInput = inputObjectType({
  name: "ComplexAnswerInput",
  definition(t) {
    t.list.field("answerElements", {
      type: "AnswerElementInput",
      description: "List of elements in a complex answer.",
    });
  },
});

const TestPractice = objectType({
  name: "TestPractice",
  definition(t) {
    t.string("id");
    t.list.string("tasks");
    t.string("text");
    t.string("intro");
    t.string("goal");
    t.string("successText");
    t.string("failureText");
    t.int("tasksNum");
    t.int("lessonId");
    t.field("createdAt", { type: "DateTime" });
    t.field("updatedAt", { type: "DateTime" });
  },
});

const Note = objectType({
  name: "Note",
  definition(t) {
    t.string("id");
    t.string("text");
    t.string("name");
    t.string("instructorName");
    t.field("next", { type: "NextType" });
    t.string("type");
    t.string("horizontal_image");
    t.string("vertical_image");
    t.int("link_clicks");
    t.boolean("isSecret");
    t.int("complexity");
    t.int("userId");
    t.int("lessonId");
    t.field("lesson", { type: "Lesson" });
    t.field("user", { type: "User" });
    t.field("createdAt", { type: "DateTime" });
    t.field("updatedAt", { type: "DateTime" });
  },
});

const Offer = objectType({
  name: "Offer",
  definition(t) {
    t.string("id");
    t.string("text");
    t.string("header");
    t.string("type");
    t.string("courseId");
    t.float("price");
    t.float("discountPrice");
    t.string("userId");
    t.string("lessonId");
    t.field("lesson", { type: "Lesson" });
    t.field("user", { type: "User" });
    t.string("programId");
    t.field("program", { type: "Program" });
    t.field("createdAt", { type: "DateTime" });
    t.field("updatedAt", { type: "DateTime" });
  },
});

const TextEditor = objectType({
  name: "TextEditor",
  definition(t) {
    t.string("id");
    t.string("text");
    t.string("name");
    t.int("complexity");
    t.string("goal");
    t.string("context");
    t.int("userId");
    t.int("lessonId");
    t.field("lesson", { type: "Lesson" });
    t.field("user", { type: "User" });
    t.list.field("textEditorResults", { type: "TextEditorResult" });
    t.int("totalMistakes");
    t.field("createdAt", { type: "DateTime" });
    t.field("updatedAt", { type: "DateTime" });
  },
});

const Construction = objectType({
  name: "Construction",
  definition(t) {
    t.string("id");
    t.string("hint");
    t.string("name");
    t.string("type");
    t.string("text");
    t.string("goal");
    t.string("context");
    t.int("columnsNum");
    t.field("elements", { type: "ConstructionElementsList" });
    t.boolean("hasText");
    t.int("complexity");
    t.list.string("variants");
    t.list.string("answer");
    t.string("userId");
    t.string("lessonId");
    t.string("lessonID");
    t.field("lesson", { type: "Lesson" });
    t.field("user", { type: "User" });
    t.list.field("constructionResults", { type: "ConstructionResult" });
    t.field("createdAt", { type: "DateTime" });
    t.field("updatedAt", { type: "DateTime" });
  },
});

const ConstructionElementsList = objectType({
  name: "ConstructionElementsList",
  definition(t) {
    t.list.field("elements", {
      type: "ConstructionElement",
      description: "List of elements in the structure.",
    });
  },
});

const ConstructionElement = objectType({
  name: "ConstructionElement",
  definition(t) {
    t.string("type", { description: "The type of the element." });
    t.string("value", { description: "The value of the element." });
    t.string("text", { description: "Text content of the element." });
    t.string("comment", { description: "Additional comment for the element." });
    t.int("place", { description: "Placement position of the element." });
    t.int("size", { description: "Size of the element." });
    t.int("rows", { description: "Number of rows occupied by the element." });
    t.boolean("inDoc", {
      description: "Indicates if the element is part of a document.",
    });
    t.boolean("isTest", {
      description: "Indicates if the element is a test component.",
    });
    t.boolean("edit", { description: "Indicates if the element is editable." });
    t.field("borders", {
      type: "Borders",
      description: "Defines the borders of the element.",
    });
  },
});

const ConstructionElementsListInput = inputObjectType({
  name: "ConstructionElementsListInput",
  definition(t) {
    t.list.field("elements", {
      type: "ConstructionElementInput",
      description: "List of elements in the structure.",
    });
  },
});

const ConstructionElementInput = inputObjectType({
  name: "ConstructionElementInput",
  definition(t) {
    t.string("type", { description: "The type of the element." });
    t.string("value", { description: "The value of the element." });
    t.string("text", { description: "Text content of the element." });
    t.string("comment", { description: "Additional comment for the element." });
    t.int("place", { description: "Placement position of the element." });
    t.int("size", { description: "Size of the element." });
    t.int("rows", { description: "Number of rows occupied by the element." });
    t.boolean("inDoc", {
      description: "Indicates if the element is part of a document.",
    });
    t.boolean("isTest", {
      description: "Indicates if the element is a test component.",
    });
    t.boolean("edit", { description: "Indicates if the element is editable." });
    t.field("borders", {
      type: "BordersInput",
      description: "Defines the borders of the element.",
    });
  },
});

const Borders = objectType({
  name: "Borders",
  definition(t) {
    t.string("top", { description: "Top border value." });
    t.string("right", { description: "Right border value." });
    t.string("bottom", { description: "Bottom border value." });
    t.string("left", { description: "Left border value." });
  },
});

const BordersInput = inputObjectType({
  name: "BordersInput",
  definition(t) {
    t.string("top", { description: "Top border value." });
    t.string("right", { description: "Right border value." });
    t.string("bottom", { description: "Bottom border value." });
    t.string("left", { description: "Left border value." });
  },
});

const Problem = objectType({
  name: "Problem",
  definition(t) {
    t.string("id");
    t.string("text");
    t.string("name");
    t.string("nodeType");
    t.int("complexity");
    t.boolean("isSecret");
    t.string("goal");
    t.string("context");
    t.string("type");
    t.string("nodeID");
    t.int("userId");
    t.string("lessonId");
    t.field("lesson", { type: "Lesson" });
    t.field("user", { type: "User" });
    t.list.field("problemResults", { type: "ProblemResult" });
    t.field("steps", { type: "ProblemStructure" });
    t.field("createdAt", { type: "DateTime" });
    t.field("updatedAt", { type: "DateTime" });
  },
});

const ProblemStructure = objectType({
  name: "ProblemStructure",
  definition(t) {
    t.list.field("problemItems", { type: "ProblemItem" });
  },
});

const ProblemItem = objectType({
  name: "ProblemItem",
  definition(t) {
    t.string("type", { description: "The type of the problem item." });
    t.string("id", {
      description: "The unique identifier for the problem item.",
    });
    t.int("index", { description: "The index of the problem item." });
    t.field("next", {
      type: "NextType",
      description: "The next type configuration for this problem item.",
    });
    t.field("position", {
      type: "Position",
      description: "The position of the problem item.",
    });
  },
});

const Position = objectType({
  name: "Position",
  definition(t) {
    t.int("x", { description: "The x-coordinate of the position." });
    t.int("y", { description: "The y-coordinate of the position." });
  },
});

const NextType = objectType({
  name: "NextType",
  definition(t) {
    t.field("true", {
      type: "NextTrueType",
      description: "True condition configuration.",
    });
    t.field("false", {
      type: "NextFalseType",
      description: "False condition configuration.",
    });
    t.list.field("branches", {
      type: "BranchItem",
      description: "List of branches for decision making.",
    });
  },
});

const NextTrueType = objectType({
  name: "NextTrueType",
  definition(t) {
    t.string("type", { description: "The type of the true condition." });
    t.string("value", {
      description: "The value associated with the true condition.",
    });
  },
});

const NextFalseType = objectType({
  name: "NextFalseType",
  definition(t) {
    t.string("type", { description: "The type of the false condition." });
    t.string("value", {
      description: "The value associated with the false condition.",
    });
  },
});

const BranchItem = objectType({
  name: "BranchItem",
  definition(t) {
    t.string("source", { description: "The source of the branch item." });
    t.string("sourceAnswerId", {
      description: "The source answer ID of the branch item.",
    });
    t.string("type", { description: "The type of the branch item." });
    t.string("value", { description: "The value of the branch item." });
  },
});

const ProblemStructureInput = inputObjectType({
  name: "ProblemStructureInput",
  definition(t) {
    t.list.field("problemItems", { type: "ProblemItemInput" });
  },
});

const ProblemItemInput = inputObjectType({
  name: "ProblemItemInput",
  definition(t) {
    t.string("type", { description: "The type of the problem item." });
    t.string("id", {
      description: "The unique identifier for the problem item.",
    });
    t.int("index", { description: "The index of the problem item." });
    t.field("next", {
      type: "NextTypeInput",
      description: "The next type configuration for this problem item.",
    });
    t.field("position", {
      type: "PositionInput",
      description: "The position of the problem item.",
    });
  },
});

const PositionInput = inputObjectType({
  name: "PositionInput",
  definition(t) {
    t.int("x", { description: "The x-coordinate of the position." });
    t.int("y", { description: "The y-coordinate of the position." });
  },
});

const NextTypeInput = inputObjectType({
  name: "NextTypeInput",
  definition(t) {
    t.field("true", {
      type: "NextTrueTypeInput",
      description: "True condition configuration.",
    });
    t.field("false", {
      type: "NextFalseTypeInput",
      description: "False condition configuration.",
    });
    t.list.field("branches", {
      type: "BranchItemInput",
      description: "List of branches for decision making.",
    });
  },
});

const NextTrueTypeInput = inputObjectType({
  name: "NextTrueTypeInput",
  definition(t) {
    t.string("type", { description: "The type of the true condition." });
    t.string("value", {
      description: "The value associated with the true condition.",
    });
  },
});

const NextFalseTypeInput = inputObjectType({
  name: "NextFalseTypeInput",
  definition(t) {
    t.string("type", { description: "The type of the false condition." });
    t.string("value", {
      description: "The value associated with the false condition.",
    });
  },
});

const BranchItemInput = inputObjectType({
  name: "BranchItemInput",
  definition(t) {
    t.string("source", { description: "The source of the branch item." });
    t.string("sourceAnswerId", {
      description: "The source answer ID of the branch item.",
    });
    t.string("type", { description: "The type of the branch item." });
    t.string("value", { description: "The value of the branch item." });
  },
});

const Forum = objectType({
  name: "Forum",
  definition(t) {
    t.string("id");
    t.string("text");
    t.field("user", { type: "User" });
    t.string("userId");
    t.string("lessonId");
    t.field("lesson", { type: "Lesson" });
    t.list.field("rating", { type: "Rating" });
    t.list.field("statements", { type: "Statement" });
    t.field("createdAt", { type: "DateTime" });
    t.field("updatedAt", { type: "DateTime" });
  },
});

const MiniForum = objectType({
  name: "MiniForum",
  definition(t) {
    t.string("id");
    t.field("user", { type: "User" });
    t.string("userId");
    t.string("lessonId");
    t.field("lesson", { type: "Lesson" });
    t.string("type");
    t.string("value");
    t.list.field("statements", { type: "Statement" });
    t.field("createdAt", { type: "DateTime" });
    t.field("updatedAt", { type: "DateTime" });
  },
});

const Rating = objectType({
  name: "Rating",
  definition(t) {
    t.string("id");
    t.float("rating");
    t.field("user", { type: "User" });
    t.int("userId");
    t.int("forumId");
    t.field("forum", { type: "Forum" });
    t.field("createdAt", { type: "DateTime" });
    t.field("updatedAt", { type: "DateTime" });
  },
});

const Statement = objectType({
  name: "Statement",
  definition(t) {
    t.string("id");
    t.string("text");
    t.list.string("comments");
    t.field("user", { type: "User" });
    t.int("userId");
    t.boolean("answered");
    t.int("forumId");
    t.field("forum", { type: "Forum" });
    t.field("createdAt", { type: "DateTime" });
    t.field("updatedAt", { type: "DateTime" });
  },
});

const Shot = objectType({
  name: "Shot",
  definition(t) {
    t.string("id");
    t.string("name");
    t.string("title");
    t.list.string("parts");
    t.list.string("comments");
    t.string("lessonID");
    t.string("userId");
    t.string("lessonId");
    t.field("user", { type: "User" });
    t.field("lesson", { type: "Lesson" });
    t.list.field("shotResults", { type: "ShotResult" });
    t.field("createdAt", { type: "DateTime" });
    t.field("updatedAt", { type: "DateTime" });
  },
});

const Document = objectType({
  name: "Document",
  definition(t) {
    t.string("id");
    t.string("title");
    t.string("name");
    t.list.field("clauses", { type: "Clause" });
    t.string("userId");
    t.int("complexity");
    t.string("lessonId");
    t.string("goal");
    t.field("user", { type: "User" });
    t.field("lesson", { type: "Lesson" });
    t.list.field("documentResults", { type: "DocumentResult" });
    t.field("createdAt", { type: "DateTime" });
    t.field("updatedAt", { type: "DateTime" });
  },
});

const Clause = objectType({
  name: "Clause",
  definition(t) {
    t.string("id");
    t.int("number");
    t.string("commentary");
    t.string("sample");
    t.list.string("keywords");
    t.int("userId");
    t.int("documentId");
    t.field("user", { type: "User" });
    t.field("document", { type: "Document" });
    t.field("createdAt", { type: "DateTime" });
    t.field("updatedAt", { type: "DateTime" });
  },
});

const Chat = objectType({
  name: "Chat",
  definition(t) {
    t.string("id");
    t.string("name");
    t.string("type");
    t.int("link_clicks");
    t.int("complexity");
    t.field("messages", { type: "Messages" });
    t.boolean("isSecret");
    t.list.field("chatResults", { type: "ChatResult" });
    t.string("lessonId");
    t.field("lesson", { type: "Lesson" });
    t.field("user", { type: "User" });
    t.field("createdAt", { type: "DateTime" });
    t.field("updatedAt", { type: "DateTime" });
  },
});

const Messages = objectType({
  name: "Messages",
  definition(t) {
    t.list.field("messagesList", { type: "MessageElement" });
  },
});

const MessageElement = objectType({
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

const Reaction = objectType({
  name: "Reaction",
  definition(t) {
    t.string("reaction");
    t.string("comment");
    t.string("name");
    t.string("image");
  },
});

const MessagesInput = inputObjectType({
  name: "MessagesInput",
  definition(t) {
    t.list.field("messagesList", { type: "MessageElementInput" });
  },
});

const MessageElementInput = inputObjectType({
  name: "MessageElementInput",
  definition(t) {
    t.int("number");
    t.string("author");
    t.string("name");
    t.string("text");
    t.string("image");
    t.boolean("isAiAssistantOn");
    t.list.field("reactions", { type: "ReactionInput" });
  },
});

const ReactionInput = inputObjectType({
  name: "ReactionInput",
  definition(t) {
    t.string("reaction");
    t.string("comment");
    t.string("name");
    t.string("image");
  },
});

//input types

const TeamQuest = objectType({
  name: "TeamQuest",
  definition(t) {
    t.string("id");
    t.string("introduction");
    t.string("solution");
    // t.list.field("tasks", { type: "Task" });
    t.string("userId");
    t.string("lessonId");
    t.field("lesson", { type: "Lesson" });
    t.field("user", { type: "User" });
    // t.list.field("teamQuestResults", { type: "TeamQuestResult" });
    t.field("createdAt", { type: "DateTime" });
    t.field("updatedAt", { type: "DateTime" });
  },
});

const ProcessManager = objectType({
  name: "ProcessManager",
  definition(t) {
    t.string("id");
    t.string("name");
    t.string("backgroundStory");
    t.int("remainingResources");
    t.string("userId");
    t.string("lessonId");
    t.field("user", { type: "User" });
    t.field("lesson", { type: "Lesson" });
    // t.list.field("nodes", { type: "ProcessNode" });
    // t.list.field("edges", { type: "ProcessEdge" });
    t.field("createdAt", { type: "DateTime" });
    t.field("updatedAt", { type: "DateTime" });
  },
});

const ProcessNodes = inputObjectType({
  name: "ProcessNodes",
  definition(t) {
    t.list.field("processNodes", {
      type: "ProcessNode",
      description: "A list of process nodes in the workflow.",
    });
  },
});

const ProcessNode = inputObjectType({
  name: "ProcessNode",
  definition(t) {
    t.string("id", { description: "The unique identifier for the node." });
    t.string("type", { description: "The type of the process node." });
    t.string("label", { description: "The label displayed for the node." });
    t.string("value", {
      description: "The value or data associated with the node.",
    });
    t.boolean("canNodeBeUpdated", {
      description: "Indicates whether the node is updatable.",
    });
    t.string("description", { description: "A description of the node." });
    t.string("formula", { description: "A formula associated with the node." });
  },
});

const ProcessEdges = inputObjectType({
  name: "ProcessEdges",
  definition(t) {
    t.list.field("processEdges", {
      type: "ProcessEdge",
      description: "A list of process edges connecting nodes in the workflow.",
    });
  },
});

const ProcessEdge = inputObjectType({
  name: "ProcessEdge",
  definition(t) {
    t.string("id", { description: "The unique identifier for the edge." });
    t.string("source", { description: "The source node ID for the edge." });
    t.string("target", { description: "The target node ID for the edge." });
  },
});

module.exports = {
  NewTest,
  ComplexTestAnswers,
  ComplexTestAnswersInput,
  ComplexTestAnswer,
  ComplexTestAnswerInput,
  Shot,
  Chat,
  Reaction,
  ReactionInput,
  Messages,
  MessagesInput,
  MessageElement,
  MessageElementInput,
  Quiz,
  ComplexAnswer,
  AnswerElement,
  ComplexAnswerInput,
  AnswerElementInput,
  Note,
  TextEditor,
  Construction,
  ConstructionElement,
  ConstructionElementsList,
  ConstructionElementInput,
  ConstructionElementsListInput,
  Borders,
  BordersInput,
  Problem,
  ProblemItem,
  ProblemStructure,
  ProblemItemInput,
  ProblemStructureInput,
  NextType,
  NextTypeInput,
  NextTrueType,
  NextTrueTypeInput,
  NextFalseType,
  NextFalseTypeInput,
  BranchItem,
  BranchItemInput,
  Position,
  PositionInput,
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
