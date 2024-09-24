const {
  idArg,
  list,
  intArg,
  booleanArg,
  mutationType,
  stringArg,
  queryType,
  arg,
} = require("nexus");
const Query = queryType({
  name: "Query",
  definition(t) {
    t.crud.user({ filtering: true });
    t.crud.users({ ordering: true, filtering: true });
    t.crud.team({ filtering: true });
    t.crud.teams({ ordering: true, filtering: true });
    t.crud.certificate({ filtering: true });
    t.crud.certificates({ ordering: true, filtering: true });
    t.crud.emailReminder({ filtering: true });
    t.crud.emailReminders({ ordering: true, filtering: true });
    t.crud.emailCampaigns({ ordering: true, filtering: true });
    t.crud.emailCampaign({ ordering: true, filtering: true });
    t.crud.lawrdle({ filtering: true });
    t.crud.lawrdles({ ordering: true, filtering: true });
    t.crud.useful({ filtering: true });
    t.crud.usefuls({ filtering: true });
    t.crud.businessClients({ ordering: true, filtering: true });
    t.crud.coursePages({ ordering: true, filtering: true });
    t.crud.coursePage({ ordering: true, filtering: true });
    t.crud.program({ ordering: true, filtering: true });
    t.crud.programs({ ordering: true, filtering: true });
    t.crud.offer({ ordering: true, filtering: true });
    t.crud.offers({ ordering: true, filtering: true });
    t.crud.rating({ ordering: true, filtering: true });
    t.crud.ratings({ ordering: true, filtering: true });
    t.crud.courseVisits({ ordering: true, filtering: true });
    t.crud.quizzes({ ordering: true, filtering: true });
    t.crud.courseVisit({ filtering: true });
    t.crud.lesson({ filtering: true });
    t.crud.lessons({ filtering: true });
    t.crud.newTest({ filtering: true });
    t.crud.miniForums({ filtering: true });
    t.crud.orders({ ordering: true, filtering: true });
    t.crud.post({ ordering: true, filtering: true });
    t.crud.posts({ ordering: true, filtering: true });
    t.crud.chat({ ordering: true, filtering: true });
    t.crud.chats({ ordering: true, filtering: true });
    t.crud.testResults({ ordering: true, filtering: true });
    t.crud.testResult({ ordering: true, filtering: true });
    t.crud.quizResults({ ordering: true, filtering: true });
    t.crud.quizResult({ ordering: true, filtering: true });
    t.crud.problemResults({ ordering: true, filtering: true });
    t.crud.textEditorResults({ ordering: true, filtering: true });
    t.crud.textEditorResult({ ordering: true, filtering: true });
    t.crud.constructionResults({ ordering: true, filtering: true });
    t.crud.constructionResult({ ordering: true, filtering: true });
    t.crud.testPracticeResult({ ordering: true, filtering: true });
    t.crud.testPracticeResults({ ordering: true, filtering: true });
    t.crud.feedbacks({ ordering: true, filtering: true });
    t.crud.lessonResults({ ordering: true, filtering: true });
    t.crud.challengeResults({ ordering: true, filtering: true });
    t.crud.botDialogue({ ordering: true, filtering: true });
    t.crud.botDialogues({ ordering: true, filtering: true });
    t.crud.growthArea({ filtering: true });
    t.crud.growthAreas({ ordering: true, filtering: true });
    t.crud.userLevel({ filtering: true });
    t.crud.userLevels({ ordering: true, filtering: true });
    t.crud.referral();
    t.crud.referrals({ ordering: true, filtering: true });
    t.crud.chatResults({ ordering: true, filtering: true });
    t.crud.chatResult();
    t.field("me", {
      type: "User",
      resolve: async (_, _args, ctx) => {
        if (!ctx.req.userId) {
          return null;
        }
        try {
          const user = await ctx.prisma.user.findUnique({
            where: { id: ctx.req.userId },
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
        });
        const quizResults = await ctx.prisma.quizResult.findMany({
          orderBy: { createdAt: "desc" },
          where: { lessonId, student: { id: { equals: userId } } },
        });
        const textEditorResults = await ctx.prisma.textEditorResult.findMany({
          orderBy: { createdAt: "desc" },
          where: { lessonId, student: { id: { equals: userId } } },
        });
        const problemResults = await ctx.prisma.problemResult.findMany({
          orderBy: { createdAt: "desc" },
          where: { lessonId, student: { id: { equals: userId } } },
        });
        const shotResults = await ctx.prisma.shotResult.findMany({
          orderBy: { createdAt: "desc" },
          where: { lessonId, student: { id: { equals: userId } } },
        });
        const constructionResults =
          await ctx.prisma.constructionResult.findMany({
            orderBy: { createdAt: "desc" },
            where: { lessonId, student: { id: { equals: userId } } },
          });
        const documentResults = await ctx.prisma.documentResult.findMany({
          orderBy: { createdAt: "desc" },
          where: { lessonId, user: { id: { equals: userId } } },
        });
        const feedbacks = await ctx.prisma.feedback.findMany({
          orderBy: { createdAt: "desc" },
          where: { lessonId, student: { id: { equals: userId } } },
        });
        const testPracticeResults =
          await ctx.prisma.testPracticeResult.findMany({
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
  },
});

module.exports = {
  Query,
};
