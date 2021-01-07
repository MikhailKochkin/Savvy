const { idArg, queryType, stringArg } = require("@nexus/schema");

const Query = queryType({
  name: "Query",
  definition(t) {
    t.crud.users({ ordering: true, filtering: true });
    t.crud.coursePages({ ordering: true, filtering: true });
    t.crud.coursePage({ ordering: true, filtering: true });
    t.crud.courseVisits({ ordering: true, filtering: true });
    t.crud.quizzes({ ordering: true, filtering: true });
    t.crud.courseVisit({ filtering: true });
    t.crud.lesson({ filtering: true });
    t.crud.lessons({ filtering: true });
    t.crud.newTest({ filtering: true });
    t.crud.orders({ ordering: true, filtering: true });
    t.crud.posts({ ordering: true, filtering: true });
    t.crud.testResults({ ordering: true, filtering: true });
    t.crud.quizResults({ ordering: true, filtering: true });
    t.crud.problemResults({ ordering: true, filtering: true });
    t.crud.textEditorResults({ ordering: true, filtering: true });
    t.crud.feedbacks({ ordering: true, filtering: true });
    t.crud.lessonResults({ ordering: true, filtering: true });
    t.field("lessonsConnection", {
      type: "Lesson",
      resolve: async (_, _args, ctx) => {
        const lessonsConnection = await prisma.lessons.aggregate();
        console.log(lessonsConnection);
        return lessonsConnection;
      },
    });
    t.field("me", {
      type: "User",
      resolve: async (_, _args, ctx) => {
        if (!ctx.res.req.userId) {
          return null;
        }
        const user = await ctx.prisma.user.findUnique({
          where: { id: ctx.res.req.userId },
        });
        return user;
      },
    });
  },
});

module.exports = {
  Query,
};
