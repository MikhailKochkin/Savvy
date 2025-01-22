const { stringArg, nonNull, list } = require("nexus");

function exercisesQueries(t) {
  t.list.field("quizes", {
    type: "Quiz",
    args: {
      id: stringArg({ description: "ID of the quiz to fetch." }),
    },
    resolve: (_parent, { id }, ctx) => {
      const where = id ? { id } : {};
      return ctx.prisma.quiz.findMany({
        where,
        include: {
          user: true,
        },
      });
    },
  });

  t.field("quiz", {
    type: "Quiz",
    args: {
      id: nonNull(stringArg()),
    },
    resolve: (_parent, { id }, ctx) => {
      return ctx.prisma.quizes.findUnique({
        where: { id },
        include: {
          user: true,
        },
      });
    },
  });

  t.list.field("newTests", {
    type: "NewTest",
    args: {
      id: stringArg({ description: "ID of the new test to fetch." }),
    },
    resolve: (_parent, { id }, ctx) => {
      const where = id ? { id } : {};
      return ctx.prisma.newTest.findMany({
        where,
        include: {
          user: true,
        },
      });
    },
  });

  t.field("newTest", {
    type: "NewTest",
    args: {
      id: nonNull(stringArg()),
    },
    resolve: (_parent, { id }, ctx) => {
      return ctx.prisma.newTest.findUnique({
        where: { id },
        include: {
          user: true,
        },
      });
    },
  });

  t.list.field("chats", {
    type: "Chat",
    args: {
      id: stringArg({ description: "ID of the chat to fetch." }),
    },
    resolve: (_parent, { id }, ctx) => {
      const where = id ? { id } : {};
      return ctx.prisma.chat.findMany({
        where,
      });
    },
  });

  t.field("chat", {
    type: "Chat",
    args: {
      id: nonNull(stringArg()),
    },
    resolve: (_parent, { id }, ctx) => {
      return ctx.prisma.chat.findUnique({
        where: { id },
      });
    },
  });

  t.list.field("notes", {
    type: "Note",
    args: {
      id: stringArg({ description: "ID of the note to fetch." }),
    },
    resolve: (_parent, { id }, ctx) => {
      const where = id ? { id } : {};
      return ctx.prisma.note.findMany({
        where,
        include: {
          user: true,
        },
      });
    },
  });

  t.field("note", {
    type: "Note",
    args: {
      id: nonNull(stringArg()),
    },
    resolve: (_parent, { id }, ctx) => {
      return ctx.prisma.note.findUnique({
        where: { id },
        include: {
          user: true,
        },
      });
    },
  });

  t.list.field("processManagers", {
    type: "ProcessManager",
    args: {
      id: stringArg({ description: "ID of the process manager to fetch." }),
    },
    resolve: (_parent, { id }, ctx) => {
      const where = id ? { id } : {};
      return ctx.prisma.processManager.findMany({
        where,
      });
    },
  });

  t.field("processManager", {
    type: "ProcessManager",
    args: {
      id: nonNull(stringArg()),
    },
    resolve: (_parent, { id }, ctx) => {
      return ctx.prisma.processManager.findUnique({
        where: { id },
      });
    },
  });
  t.field("loadLessonData", {
    type: "LessonData",
    args: {
      lessonId: stringArg(),
    },
    resolve: async (_, { lessonId }, ctx) => {
      const results = {};
      results.notes = await ctx.prisma.note.findMany({
        where: { lessonId },
        include: { user: { select: { id: true } } },
      });
      results.chats = await ctx.prisma.chat.findMany({
        where: { lessonId },
        include: { user: { select: { id: true } } },
      });
      results.quizes = await ctx.prisma.quiz.findMany({
        where: { lessonId },
        include: { user: { select: { id: true } } },
      });
      results.problems = await ctx.prisma.problem.findMany({
        where: { lessonId },
        include: { user: { select: { id: true } } },
      });
      results.newTests = await ctx.prisma.newTest.findMany({
        where: { lessonId },
        include: { user: { select: { id: true } } },
      });
      results.testPractices = await ctx.prisma.testPractice.findMany({
        where: { lessonId },
        include: { user: { select: { id: true } } },
      });
      results.constructions = await ctx.prisma.construction.findMany({
        where: { lessonId },
        include: { user: { select: { id: true } } },
      });
      results.textEditors = await ctx.prisma.textEditor.findMany({
        where: { lessonId },
        include: { user: { select: { id: true } } },
      });
      results.documents = await ctx.prisma.document.findMany({
        where: { lessonId },
        include: { user: { select: { id: true } } },
      });
      results.shots = await ctx.prisma.shot.findMany({
        where: { lessonId },
        include: { user: { select: { id: true } } },
      });
      return results;
    },
  });
}

module.exports = {
  exercisesQueries,
};
