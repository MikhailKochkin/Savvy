const { objectType, inputObjectType, list } = require("nexus");

const TestResult = objectType({
  name: "TestResult",
  definition(t) {
    t.string("id", { description: "Unique identifier for the test result." });
    t.string("answer", { description: "Answer provided by the student." });
    t.list.string("answerArray", {
      description: "Array of answers if multiple are possible.",
    });
    t.int("attempts", { description: "Number of attempts made for the test." });
    t.string("hint", { description: "Hint provided to the student, if any." });
    t.string("type", { description: "Type of the test." });
    t.string("lessonID", { description: "Legacy ID of the lesson." });
    t.string("testID", { description: "Legacy ID of the test." });
    t.string("studentId", {
      description: "ID of the student who took the test.",
    });
    t.string("lessonId", {
      description: "ID of the lesson associated with the test.",
    });
    t.string("testId", { description: "ID of the test." });
    t.field("lesson", {
      type: "Lesson",
      description: "Details of the lesson.",
    });
    t.field("student", {
      type: "User",
      description: "Details of the student.",
    });
    t.string("result", { description: "The result of the test (pass/fail)." });
    t.field("test", { type: "NewTest", description: "Details of the test." });
    t.field("createdAt", {
      type: "DateTime",
      description: "Timestamp when the result was created.",
    });
    t.field("updatedAt", {
      type: "DateTime",
      description: "Timestamp when the result was last updated.",
    });
  },
});

const QuizResult = objectType({
  name: "QuizResult",
  definition(t) {
    t.string("id", { description: "Unique identifier for the quiz result." });
    t.string("answer", { description: "Answer provided by the student." });
    t.string("comment", { description: "Comment on the quiz result." });
    t.int("attempts", { description: "Number of attempts made for the quiz." });
    t.string("type", { description: "Type of the quiz." });
    t.string("result", { description: "The result of the quiz (pass/fail)." });
    t.string("hint", { description: "Hint provided to the student, if any." });
    t.string("ideas", {
      description: "Student's ideas or input for the quiz.",
    });
    t.field("ideasList", {
      type: "QuizIdeas",
      description: "List of ideas for the quiz.",
    });
    t.string("explanation", {
      description: "Explanation provided for the quiz.",
    });
    t.string("improvement", { description: "Suggestions for improvement." });
    t.boolean("correct", {
      description: "Indicates whether the answer is correct.",
    });
    t.string("lessonID", { description: "Legacy ID of the lesson." });
    t.string("quizId", { description: "ID of the quiz." });
    t.string("studentId", {
      description: "ID of the student who took the quiz.",
    });
    t.string("lessonId", {
      description: "ID of the lesson associated with the quiz.",
    });
    t.field("lesson", {
      type: "Lesson",
      description: "Details of the lesson.",
    });
    t.field("student", {
      type: "User",
      description: "Details of the student.",
    });
    t.field("quiz", { type: "Quiz", description: "Details of the quiz." });
    t.field("createdAt", {
      type: "DateTime",
      description: "Timestamp when the result was created.",
    });
    t.field("updatedAt", {
      type: "DateTime",
      description: "Timestamp when the result was last updated.",
    });
  },
});

const QuizIdea = objectType({
  name: "QuizIdea",
  definition(t) {
    t.string("id", { description: "Unique identifier for the quiz idea." });
    t.string("idea", { description: "The core idea or concept of the quiz." });
    t.string("result", {
      description: "The result associated with the quiz idea.",
    });
    t.string("feedback");
    t.string("matchedAnswer");
    t.string("next_id", { description: "ID of the next step or quiz." });
    t.string("next_type", { description: "Type of the next step or quiz." });
  },
});

const QuizIdeas = objectType({
  name: "QuizIdeas",
  definition(t) {
    t.list.field("quizIdeas", {
      type: "QuizIdea",
      description: "List of ideas for quizzes.",
    });
  },
});

const QuizIdeaInput = inputObjectType({
  name: "QuizIdeaInput",
  definition(t) {
    t.string("id", { description: "Unique identifier for the quiz idea." });
    t.string("idea", { description: "The core idea or concept of the quiz." });
    t.string("result", {
      description: "The result associated with the quiz idea.",
    });
    t.string("feedback");
    t.string("matchedAnswer");
    t.string("next_id", { description: "ID of the next step or quiz." });
    t.string("next_type", { description: "Type of the next step or quiz." });
  },
});

const QuizIdeasInput = inputObjectType({
  name: "QuizIdeasInput",
  definition(t) {
    t.list.field("quizIdeas", {
      type: "QuizIdeaInput",
      description: "List of ideas for quizzes.",
    });
  },
});

const TextEditorResult = objectType({
  name: "TextEditorResult",
  definition(t) {
    t.string("id", {
      description: "Unique identifier for the text editor result.",
    });
    t.string("wrong", {
      description: "Details of incorrect answers or inputs.",
    });
    t.int("attempts", { description: "Number of attempts made for the task." });
    t.string("correct", {
      description: "Indicates if the answer was correct.",
    });
    t.string("result", { description: "Result of the text editor activity." });
    t.string("guess", { description: "Guesses made by the student." });
    t.string("type", { description: "Type of the text editor activity." });
    t.string("textEditorId", {
      description: "ID of the associated text editor.",
    });
    t.string("studentId", {
      description: "ID of the student who completed the task.",
    });
    t.string("lessonId", { description: "ID of the associated lesson." });
    t.field("lesson", {
      type: "Lesson",
      description: "Details of the associated lesson.",
    });
    t.field("student", {
      type: "User",
      description: "Details of the student.",
    });
    t.field("textEditor", {
      type: "TextEditor",
      description: "Details of the text editor.",
    });
    t.field("createdAt", {
      type: "DateTime",
      description: "Timestamp when the result was created.",
    });
    t.field("updatedAt", {
      type: "DateTime",
      description: "Timestamp when the result was last updated.",
    });
  },
});

const ConstructionResult = objectType({
  name: "ConstructionResult",
  definition(t) {
    t.string("id", {
      description: "Unique identifier for the construction result.",
    });
    t.string("answer", { description: "Answer provided by the student." });
    t.int("attempts", { description: "Number of attempts made." });
    t.string("constructionID", {
      description: "Legacy ID of the construction.",
    });
    t.list.string("inputs", {
      description: "Inputs provided during the construction task.",
    });
    t.string("lessonID", { description: "Legacy ID of the lesson." });
    t.string("lessonId", { description: "ID of the associated lesson." });
    t.string("constructionId", { description: "ID of the construction." });
    t.string("studentId", {
      description: "ID of the student who completed the task.",
    });
    t.field("lesson", {
      type: "Lesson",
      description: "Details of the associated lesson.",
    });
    t.field("student", {
      type: "User",
      description: "Details of the student.",
    });
    t.field("construction", {
      type: "Construction",
      description: "Details of the construction.",
    });
    t.list.string("answers", { description: "List of answers provided." });
    t.field("elements", { type: "ConstructionElementsList" });
    t.field("createdAt", {
      type: "DateTime",
      description: "Timestamp when the result was created.",
    });
    t.field("updatedAt", {
      type: "DateTime",
      description: "Timestamp when the result was last updated.",
    });
  },
});

const ProblemResult = objectType({
  name: "ProblemResult",
  definition(t) {
    t.string("id", {
      description: "Unique identifier for the problem result.",
    });
    t.string("answer", { description: "Answer provided by the student." });
    t.boolean("revealed", {
      description: "Indicates if the solution was revealed.",
    });
    t.int("depth", { description: "Depth or complexity of the problem." });
    t.string("problemID", { description: "Legacy ID of the problem." });
    t.string("lessonID", { description: "Legacy ID of the lesson." });
    t.string("lessonId", { description: "ID of the associated lesson." });
    t.string("problemId", { description: "ID of the problem." });
    t.string("studentId", {
      description: "ID of the student who completed the task.",
    });
    t.field("lesson", {
      type: "Lesson",
      description: "Details of the associated lesson.",
    });
    t.field("student", {
      type: "User",
      description: "Details of the student.",
    });
    t.field("problem", {
      type: "Problem",
      description: "Details of the problem.",
    });
    t.field("createdAt", {
      type: "DateTime",
      description: "Timestamp when the result was created.",
    });
    t.field("updatedAt", {
      type: "DateTime",
      description: "Timestamp when the result was last updated.",
    });
  },
});

const ShotResult = objectType({
  name: "ShotResult",
  definition(t) {
    t.string("id", { description: "Unique identifier for the shot result." });
    t.string("answer", { description: "Answer provided by the student." });
    t.string("lessonId", { description: "ID of the associated lesson." });
    t.string("shotId", { description: "ID of the shot." });
    t.string("studentId", {
      description: "ID of the student who completed the task.",
    });
    t.field("lesson", {
      type: "Lesson",
      description: "Details of the associated lesson.",
    });
    t.field("student", {
      type: "User",
      description: "Details of the student.",
    });
    t.field("shot", { type: "Shot", description: "Details of the shot." });
    t.int("depth", { description: "Depth or complexity of the task." });
    t.field("createdAt", {
      type: "DateTime",
      description: "Timestamp when the result was created.",
    });
    t.field("updatedAt", {
      type: "DateTime",
      description: "Timestamp when the result was last updated.",
    });
  },
});

const DocumentResult = objectType({
  name: "DocumentResult",
  definition(t) {
    t.string("id", {
      description: "Unique identifier for the document result.",
    });
    t.list.string("answers", {
      description: "List of answers associated with the document.",
    });
    t.list.string("drafts", {
      description: "Drafts created for the document.",
    });
    t.string("lessonId", { description: "ID of the associated lesson." });
    t.string("documentId", { description: "ID of the document." });
    t.string("userId", {
      description: "ID of the user who completed the task.",
    });
    t.field("lesson", {
      type: "Lesson",
      description: "Details of the associated lesson.",
    });
    t.field("user", { type: "User", description: "Details of the user." });
    t.field("document", {
      type: "Document",
      description: "Details of the document.",
    });
    t.field("createdAt", {
      type: "DateTime",
      description: "Timestamp when the result was created.",
    });
    t.field("updatedAt", {
      type: "DateTime",
      description: "Timestamp when the result was last updated.",
    });
  },
});

const ChallengeResult = objectType({
  name: "ChallengeResult",
  definition(t) {
    t.string("id", {
      description: "Unique identifier for the challenge result.",
    });
    t.boolean("correct", {
      description: "Indicates whether the challenge was completed correctly.",
    });
    t.boolean("wrong", {
      description: "Indicates whether the challenge was completed incorrectly.",
    });
    t.float("time", { description: "Time taken to complete the challenge." });
    t.int("studentId", {
      description: "ID of the student who completed the challenge.",
    });
    t.field("student", {
      type: "User",
      description: "Details of the student.",
    });
    t.field("lesson", {
      type: "Lesson",
      description: "Details of the associated lesson.",
    });
    t.string("lessonId", { description: "ID of the associated lesson." });
    t.field("createdAt", {
      type: "DateTime",
      description: "Timestamp when the result was created.",
    });
    t.field("updatedAt", {
      type: "DateTime",
      description: "Timestamp when the result was last updated.",
    });
  },
});

const TestPracticeResult = objectType({
  name: "TestPracticeResult",
  definition(t) {
    t.string("id", {
      description: "Unique identifier for the test practice result.",
    });
    t.boolean("correct", {
      description: "Indicates whether the test practice was correct.",
    });
    // t.list.field("tasks", {
    //   type: "Task",
    //   description: "List of tasks completed during the test practice.",
    // });
    t.string("testPracticeId", { description: "ID of the test practice." });
    t.string("studentId", {
      description: "ID of the student who completed the test practice.",
    });
    t.string("lessonId", { description: "ID of the associated lesson." });
    t.field("lesson", {
      type: "Lesson",
      description: "Details of the associated lesson.",
    });
    t.field("student", {
      type: "User",
      description: "Details of the student.",
    });
    t.field("testPractice", {
      type: "TestPractice",
      description: "Details of the test practice.",
    });
    t.field("createdAt", {
      type: "DateTime",
      description: "Timestamp when the result was created.",
    });
    t.field("updatedAt", {
      type: "DateTime",
      description: "Timestamp when the result was last updated.",
    });
  },
});

const TeamQuestResult = objectType({
  name: "TeamQuestResult",
  definition(t) {
    t.string("id", {
      description: "Unique identifier for the team quest result.",
    });
    t.string("answer", {
      description: "Answer provided during the team quest.",
    });
    t.field("createdAt", {
      type: "DateTime",
      description: "Timestamp when the result was created.",
    });
    t.field("updatedAt", {
      type: "DateTime",
      description: "Timestamp when the result was last updated.",
    });
    t.string("studentId", {
      description: "ID of the student who participated in the team quest.",
    });
    t.string("lessonId", { description: "ID of the associated lesson." });
    t.string("teamQuestId", { description: "ID of the team quest." });
    t.field("teamQuest", {
      type: "TeamQuest",
      description: "Details of the team quest.",
    });
    t.field("lesson", {
      type: "Lesson",
      description: "Details of the associated lesson.",
    });
    t.field("student", {
      type: "User",
      description: "Details of the student.",
    });
  },
});

const Dialogue = inputObjectType({
  name: "Dialogue",
  definition(t) {
    t.string("question", {
      description: "Question asked during the dialogue.",
    });
    t.string("answer", { description: "Answer provided during the dialogue." });
    t.string("comment", {
      description: "Additional comments or notes for the dialogue.",
    });
    t.string("sourceId", { description: "Source ID related to the dialogue." });
  },
});

const ChatResult = objectType({
  name: "ChatResult",
  definition(t) {
    t.string("id", { description: "Unique identifier for the chat result." });
    t.string("text", { description: "Text content of the chat result." });
    t.string("name", { description: "Name associated with the chat result." });
    t.field("createdAt", {
      type: "DateTime",
      description: "Timestamp when the chat result was created.",
    });
    t.field("updatedAt", {
      type: "DateTime",
      description: "Timestamp when the chat result was last updated.",
    });
    t.string("chatId", { description: "ID of the associated chat." });
    t.string("userId", {
      description: "ID of the user associated with the chat result.",
    });
    t.string("lessonId", { description: "ID of the associated lesson." });
    t.field("chat", {
      type: "Chat",
      description: "Details of the associated chat.",
    });
    t.field("lesson", {
      type: "Lesson",
      description: "Details of the associated lesson.",
    });
    t.field("user", { type: "User", description: "Details of the user." });
  },
});

const DialogueHistory = inputObjectType({
  name: "DialogueHistory",
  definition(t) {
    t.list.field("steps", {
      type: "DialogueStep",
      description: "List of steps in the dialogue history.",
    });
  },
});

const DialogueStep = inputObjectType({
  name: "DialogueStep",
  definition(t) {
    t.int("number", { description: "Step number in the dialogue." });
    t.string("text", { description: "Text content of the dialogue step." });
    t.string("name", {
      description: "Name associated with the dialogue step.",
    });
    t.string("image", { description: "Image URL for the dialogue step." });
    t.string("startTime", { description: "Start time of the dialogue step." });
    t.string("sourceId", {
      description: "Source ID related to the dialogue step.",
    });
  },
});

const LessonData = objectType({
  name: "LessonData",
  definition(t) {
    t.field("notes", { type: list("Note"), description: "List of notes." });
    t.field("chats", { type: list("Chat"), description: "List of chats." });
    t.field("quizes", { type: list("Quiz"), description: "List of quizzes." });
    t.field("problems", {
      type: list("Problem"),
      description: "List of problems.",
    });
    t.field("newTests", {
      type: list("NewTest"),
      description: "List of new tests.",
    });
    t.field("testPractices", {
      type: list("TestPractice"),
      description: "List of test practices.",
    });
    t.field("constructions", {
      type: list("Construction"),
      description: "List of constructions.",
    });
    t.field("textEditors", {
      type: list("TextEditor"),
      description: "List of text editors.",
    });
    t.field("documents", {
      type: list("Document"),
      description: "List of documents.",
    });
    t.field("shots", { type: list("Shot"), description: "List of shots." });
    t.field("forum", { type: "Forum", description: "Forum" });
  },
});

module.exports = {
  TestResult,
  QuizResult,
  TextEditorResult,
  ConstructionResult,
  ProblemResult,
  ShotResult,
  DocumentResult,
  ChallengeResult,
  TestPracticeResult,
  TeamQuestResult,
  ChatResult,
  Dialogue,
  DialogueHistory,
  DialogueStep,
  QuizIdea,
  QuizIdeas,
  QuizIdeasInput,
  QuizIdeaInput,
  LessonData,
};
