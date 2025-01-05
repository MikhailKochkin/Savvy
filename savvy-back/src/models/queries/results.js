const { stringArg, nonNull, list } = require("nexus");

function resultsQueries(t) {
  t.list.field("testResults", {
    type: "TestResult",
    args: {
      id: stringArg({ description: "ID of the test result to fetch." }),
      lessonId: stringArg({ description: "ID of the associated lesson." }),
    },
    resolve: (_parent, { id, lessonId }, ctx) => {
      const where = {
        ...(id && { id }),
        ...(lessonId && { lessonId }),
      };
      return ctx.prisma.testResult.findMany({
        where,
        include: {
          student: true,
          test: true,
        },
      });
    },
  });

  t.field("testResult", {
    type: "TestResult",
    args: {
      id: nonNull(stringArg()),
    },
    resolve: (_parent, { id }, ctx) => {
      return ctx.prisma.testResult.findUnique({
        where: { id },
      });
    },
  });

  t.list.field("quizResults", {
    type: "QuizResult",
    args: {
      id: stringArg({ description: "ID of the quiz result to fetch." }),
      lessonId: stringArg({ description: "ID of the associated lesson." }),
    },
    resolve: (_parent, { id, lessonId }, ctx) => {
      const where = {
        ...(id && { id }),
        ...(lessonId && { lessonId }),
      };
      return ctx.prisma.quizResult.findMany({
        where,
        include: {
          student: true,
          quiz: true,
        },
      });
    },
  });

  t.field("quizResult", {
    type: "QuizResult",
    args: {
      id: nonNull(stringArg()),
    },
    resolve: (_parent, { id }, ctx) => {
      return ctx.prisma.quizResult.findUnique({
        where: { id },
      });
    },
  });

  t.list.field("problemResults", {
    type: "ProblemResult",
    args: {
      id: stringArg({ description: "ID of the problem result to fetch." }),
      lessonId: stringArg({ description: "ID of the associated lesson." }),
    },
    resolve: (_parent, { id, lessonId }, ctx) => {
      const where = {
        ...(id && { id }),
        ...(lessonId && { lessonId }),
      };
      return ctx.prisma.problemResult.findMany({
        where,
      });
    },
  });

  t.field("problemResult", {
    type: "ProblemResult",
    args: {
      id: nonNull(stringArg()),
    },
    resolve: (_parent, { id }, ctx) => {
      return ctx.prisma.problemResult.findUnique({
        where: { id },
      });
    },
  });

  t.list.field("textEditorResults", {
    type: "TextEditorResult",
    args: {
      id: stringArg({
        description: "ID of the text editor result to fetch.",
      }),
      lessonId: stringArg({ description: "ID of the associated lesson." }),
    },
    resolve: (_parent, { id, lessonId }, ctx) => {
      const where = {
        ...(id && { id }),
        ...(lessonId && { lessonId }),
      };
      return ctx.prisma.textEditorResult.findMany({
        where,
        include: {
          student: true,
          textEditor: true,
        },
      });
    },
  });

  t.field("textEditorResult", {
    type: "TextEditorResult",
    args: {
      id: nonNull(stringArg()),
    },
    resolve: (_parent, { id }, ctx) => {
      return ctx.prisma.textEditorResult.findUnique({
        where: { id },
      });
    },
  });

  t.list.field("constructionResults", {
    type: "ConstructionResult",
    args: {
      id: stringArg({
        description: "ID of the construction result to fetch.",
      }),
      constructionId: stringArg({
        description: "ID of the associated construction.",
      }),
      studentId: stringArg({
        description: "ID of the student.",
      }),
    },
    resolve: (_parent, { id, constructionId, studentId }, ctx) => {
      const where = {
        ...(id && { id }),
        ...(constructionId && { constructionId }),
        ...(studentId && { studentId }),
      };
      return ctx.prisma.constructionResult.findMany({
        where,
      });
    },
  });

  t.field("constructionResult", {
    type: "ConstructionResult",
    args: {
      id: nonNull(stringArg()),
    },
    resolve: (_parent, { id }, ctx) => {
      return ctx.prisma.constructionResult.findUnique({
        where: { id },
      });
    },
  });

  t.list.field("testPracticeResults", {
    type: "TestPracticeResult",
    args: {
      id: stringArg({
        description: "ID of the test practice result to fetch.",
      }),
    },
    resolve: (_parent, { id }, ctx) => {
      const where = id ? { id } : {};
      return ctx.prisma.testPracticeResult.findMany({
        where,
      });
    },
  });

  t.field("testPracticeResult", {
    type: "TestPracticeResult",
    args: {
      id: nonNull(stringArg()),
    },
    resolve: (_parent, { id }, ctx) => {
      return ctx.prisma.testPracticeResult.findUnique({
        where: { id },
      });
    },
  });

  t.list.field("chatResults", {
    type: "ChatResult",
    args: {
      id: stringArg({ description: "ID of the chat result to fetch." }),
    },
    resolve: (_parent, { id }, ctx) => {
      const where = id ? { id } : {};
      return ctx.prisma.chatResult.findMany({
        where,
      });
    },
  });

  t.field("chatResult", {
    type: "ChatResult",
    args: {
      id: nonNull(stringArg()),
    },
    resolve: (_parent, { id }, ctx) => {
      return ctx.prisma.chatResult.findUnique({
        where: { id },
      });
    },
  });

  t.field("questResults", {
    type: "QuestResults",
    args: {
      list_of_ids: list(stringArg()),
      lessonId: stringArg(),
    },
    resolve: async (_, { lessonId, list_of_ids }, ctx) => {
      const testResults = await ctx.prisma.testResult.findMany({
        orderBy: { createdAt: "desc" },
        where: { lessonId, studentId: { in: list_of_ids } },
      });
      const quizResults = await ctx.prisma.quizResult.findMany({
        orderBy: { createdAt: "desc" },
        where: { lessonId, studentId: { in: list_of_ids } },
      });
      const lessonResults = await ctx.prisma.lessonResult.findMany({
        orderBy: { createdAt: "desc" },
        where: { lessonId, studentId: { in: list_of_ids } },
      });
      // const textEditorResults = await ctx.prisma.textEditorResult.findMany({
      //   orderBy: { createdAt: "desc" },
      //   where: { lessonId, student: { id: { equals: userId } } },
      // });
      // const problemResults = await ctx.prisma.problemResult.findMany({
      //   orderBy: { createdAt: "desc" },
      //   where: { lessonId, student: { id: { equals: userId } } },
      // });
      // const constructionResults =
      //   await ctx.prisma.constructionResult.findMany({
      //     orderBy: { createdAt: "desc" },
      //     where: { lessonId, student: { id: { equals: userId } } },
      //   });
      // const documentResults = await ctx.prisma.documentResult.findMany({
      //   orderBy: { createdAt: "desc" },
      //   where: { lessonId, user: { id: { equals: userId } } },
      // });
      // const feedbacks = await ctx.prisma.feedback.findMany({
      //   orderBy: { createdAt: "desc" },
      //   where: { lessonId, student: { id: { equals: userId } } },
      return {
        testResults,
        quizResults,
        lessonResults,
        // textEditorResults,
        // problemResults,
        // constructionResults,
        // documentResults,
        // feedbacks,
      };
    },
  });
}

module.exports = {
  resultsQueries,
};
