const { queryType, stringArg, nonNull, arg } = require("nexus");

function userQueries(t) {
  t.list.field("users", {
    type: "User",
    args: {
      id: stringArg({ description: "ID of the user to fetch." }),
      email: stringArg({ description: "Email of the user to fetch." }),
      coursePageId: stringArg({ description: "Id" }),
      initialDate: arg({
        type: "DateTime",
      }),
      lastDate: arg({
        type: "DateTime",
      }),
      activeDate: arg({
        type: "DateTime",
      }),
      tag: stringArg({ description: "tag" }),
    },
    resolve: (
      _parent,
      { id, email, initialDate, lastDate, activeDate, coursePageId, tag },
      ctx
    ) => {
      const where = {
        ...(id && { id: { equals: id } }),
        ...(email && { email: { equals: email } }),
        ...(coursePageId && {
          coursePages: {
            some: {
              id: { equals: coursePageId },
            },
          },
        }),
        ...(initialDate &&
          lastDate && {
            createdAt: {
              gte: new Date(initialDate),
              lte: new Date(lastDate),
            },
          }),
        ...(activeDate && {
          lessonResults: {
            some: {
              updatedAt: {
                gte: new Date(activeDate),
              },
            },
          },
        }),
        ...(tag && { tags: { has: tag } }),
      };
      return ctx.prisma.user.findMany({
        where,
        orderBy: {
          createdAt: "desc", // Order by creation date in descending order
        },
        include: {
          subscriptions: true,
          challengeResults: {
            include: {
              lesson: {
                include: {
                  coursePage: true,
                },
              },
            },
          },
          lessonResults: {
            include: {
              lesson: {
                include: {
                  coursePage: true,
                },
              },
            },
          },
          orders: {
            include: {
              coursePage: true,
            },
          },
          messages: true,
          new_subjects: true,
        },
      });
    },
  });
  t.list.field("students", {
    type: "User",
    args: {
      coursePageId: stringArg({ description: "Id" }),
    },
    resolve: (_parent, { coursePageId }, ctx) => {
      const where = {
        ...(coursePageId && {
          new_subjects: {
            some: {
              id: { equals: coursePageId },
            },
          },
        }),
      };
      return ctx.prisma.user.findMany({
        where,
        orderBy: {
          createdAt: "desc", // Order by creation date in descending order
        },
        include: {
          subscriptions: true,
          challengeResults: {
            include: {
              lesson: {
                include: {
                  coursePage: true,
                },
              },
            },
          },
          lessonResults: {
            include: {
              lesson: {
                include: {
                  coursePage: true,
                },
              },
            },
          },
          orders: {
            include: {
              coursePage: true,
            },
          },
          messages: true,
          new_subjects: true,
        },
      });
    },
  });
  t.list.field("studentsAnalytics", {
    type: "User",
    args: {
      lessonId: stringArg({ description: "Id" }),
    },
    resolve: (_parent, { lessonId }, ctx) => {
      const where = lessonId
        ? {
            lessonResults: {
              some: {
                lessonId: {
                  equals: lessonId,
                },
              },
            },
          }
        : {};

      return ctx.prisma.user.findMany({
        where,
        include: {
          lessons: true,
          coursePages: true,
          subscriptions: true,
          orders: true,
          challengeResults: true,
        },
      });
    },
  });

  t.list.field("subscribers", {
    type: "User",
    args: {},
    resolve: (_parent, { id, email, initialDate, lastDate }, ctx) => {
      return ctx.prisma.user.findMany({
        where: {
          subscriptions: {
            some: {},
          },
        },

        orderBy: {
          createdAt: "desc", // Order by creation date in descending order
        },
        include: {
          subscriptions: true,
          challengeResults: {
            include: {
              lesson: {
                include: {
                  coursePage: true,
                },
              },
            },
          },
          lessonResults: {
            include: {
              lesson: {
                include: {
                  coursePage: true,
                },
              },
            },
          },
          orders: {
            include: {
              coursePage: true,
            },
          },
          messages: true,
          new_subjects: true,
        },
      });
    },
  });

  t.field("user", {
    type: "User",
    args: {
      id: nonNull(stringArg()),
    },
    resolve: (_parent, { id }, ctx) => {
      return ctx.prisma.user.findUnique({
        where: { id },
      });
    },
  });
  t.list.field("businessClients", {
    type: "BusinessClient",
    args: {},
    resolve: (_parent, { id, orderBy }, ctx) => {
      const where = {
        createdAt: {
          gt: new Date("2024-06-01"),
        },
      };
      return ctx.prisma.businessClient.findMany({
        where,
        orderBy: { createdAt: "desc" },
      });
    },
  });

  t.field("businessClient", {
    type: "BusinessClient",
    args: {
      id: nonNull(stringArg()),
    },
    resolve: (_parent, { id }, ctx) => {
      return ctx.prisma.businessClient.findUnique({
        where: { id },
      });
    },
  });

  t.field("botDialogue", {
    type: "BotDialogue",
    args: {
      id: nonNull(stringArg()),
    },
    resolve: (_parent, { id }, ctx) => {
      return ctx.prisma.dialogue.findUnique({
        where: { id },
      });
    },
  });

  t.list.field("botDialogues", {
    type: "BotDialogue",
    args: {
      id: stringArg({ description: "ID of the bot dialogue to fetch." }),
    },
    resolve: (_parent, { id }, ctx) => {
      const where = id ? { id } : {};
      return ctx.prisma.dialogue.findMany({
        where,
      });
    },
  });

  t.list.field("userLevels", {
    type: "UserLevel",
    args: {
      id: stringArg({ description: "ID of the user level to fetch." }),
    },
    resolve: (_parent, { id }, ctx) => {
      const where = id ? { id } : {};
      return ctx.prisma.userLevel.findMany({
        where,
      });
    },
  });

  t.field("userLevel", {
    type: "UserLevel",
    args: {
      id: nonNull(stringArg()),
    },
    resolve: (_parent, { id }, ctx) => {
      return ctx.prisma.userLevel.findUnique({
        where: { id },
      });
    },
  });

  t.field("me", {
    type: "User",
    resolve: async (_, _args, ctx) => {
      if (!ctx.req.userId) {
        return null;
      }
      try {
        const user = await ctx.prisma.user.findUnique({
          where: { id: ctx.req.userId },
          select: {
            id: true,
            name: true,
            surname: true,
            image: true,
            email: true,
            isFamiliar: true,
            permissions: true,
            tags: true,
            lessons: {
              select: {
                id: true,
              },
            },
            coursePages: {
              select: {
                id: true,
              },
            },
            co_coursePages: {
              select: {
                id: true,
              },
            },
            new_subjects: {
              select: {
                id: true,
              },
            },
          },
        });
        return user;
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    },
  });
  t.field("stats", {
    type: "Stats",
    args: {
      lessonId: stringArg(),
      userId: stringArg(),
    },
    resolve: async (_, { lessonId, userId }, ctx) => {
      const testResults = await ctx.prisma.testResult.findMany({
        orderBy: { createdAt: "desc" },
        where: { lessonId, student: { id: { equals: userId } } },
        include: {
          test: true,
        },
      });
      const quizResults = await ctx.prisma.quizResult.findMany({
        orderBy: { createdAt: "desc" },
        where: { lessonId, student: { id: { equals: userId } } },
        include: {
          quiz: true,
        },
      });
      const textEditorResults = await ctx.prisma.textEditorResult.findMany({
        orderBy: { createdAt: "desc" },
        where: { lessonId, student: { id: { equals: userId } } },
        include: {
          textEditor: true,
        },
      });
      const problemResults = await ctx.prisma.problemResult.findMany({
        orderBy: { createdAt: "desc" },
        where: { lessonId, student: { id: { equals: userId } } },
        include: {
          problem: true,
        },
      });
      const shotResults = await ctx.prisma.shotResult.findMany({
        orderBy: { createdAt: "desc" },
        where: { lessonId, student: { id: { equals: userId } } },
      });
      const constructionResults = await ctx.prisma.constructionResult.findMany({
        orderBy: { createdAt: "desc" },
        where: { lessonId, student: { id: { equals: userId } } },
        include: {
          construction: true,
        },
      });
      const documentResults = await ctx.prisma.documentResult.findMany({
        orderBy: { createdAt: "desc" },
        where: { lessonId, user: { id: { equals: userId } } },
      });
      const feedbacks = await ctx.prisma.feedback.findMany({
        orderBy: { createdAt: "desc" },
        where: { lessonId, student: { id: { equals: userId } } },
      });
      const testPracticeResults = await ctx.prisma.testPracticeResult.findMany({
        orderBy: { createdAt: "desc" },
        where: { lessonId, student: { id: { equals: userId } } },
      });
      return {
        testResults,
        shotResults,
        quizResults,
        textEditorResults,
        problemResults,
        constructionResults,
        documentResults,
        feedbacks,
        testPracticeResults,
      };
    },
  });
}

module.exports = {
  userQueries,
};
