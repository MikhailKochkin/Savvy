const {forwardTo} = require("prisma-binding");
const { hasPermission } = require("../utils");

const Query = {
    coursePages: forwardTo('db'),
    coursePage: forwardTo('db'),
    pointA:forwardTo('db'),
    pointATest:forwardTo('db'),
    sandboxPages: forwardTo('db'),
    sandboxPage: forwardTo('db'),
    lesson:forwardTo('db'),
    test:forwardTo('db'),
    quiz:forwardTo('db'),
    test:forwardTo('db'),
    newTest:forwardTo('db'),
    problem:forwardTo('db'),
    textEditor:forwardTo('db'),
    careerTrack:forwardTo('db'),
    careerTracks:forwardTo('db'),
    order:forwardTo('db'),
    sandbox:forwardTo('db'),
    coursePagesConnection: forwardTo('db'),
    sandboxPagesConnection: forwardTo('db'),
    sandboxesConnection: forwardTo('db'),
    lessonsConnection: forwardTo('db'),
    problemsConnection: forwardTo('db'),
    testsConnection: forwardTo('db'),
    lessons(parent, args, ctx, info){
      const pageId = args.where.coursePageID;
      return ctx.db.query.lessons(
        {
          where: {coursePageID: pageId}
        },
        info
      );
    },
    tests(parent, args, ctx, info){
      const lesID = args.where.lessonID;
      return ctx.db.query.tests(
        {
          where: {lessonID: lesID}
        },
        info
      );
    },
    newTests(parent, args, ctx, info){
      const lesID = args.where.lessonID;
      return ctx.db.query.newTests(
        {
          where: {lessonID: lesID}
        },
        info
      );
    },
    quizzes(parent, args, ctx, info){
      const lesID = args.where.lessonID;
      return ctx.db.query.newTests(
        {
          where: {lessonID: lesID}
        },
        info
      );
    },
    pointATests(parent, args, ctx, info){
      const coursePageID = args.where.coursePageID;
      return ctx.db.query.pointATests(
        {
          where: {coursePageID: coursePageID}
        },
        info
      );
    },
    problems(parent, args, ctx, info){
      const lesID = args.where.lessonID;
      return ctx.db.query.problems(
        {
          where: {lessonID: lesID}
        },
        info
      );
    },
    textEditors(parent, args, ctx, info){
      const lesID = args.where.lessonID;
      return ctx.db.query.textEditors(
        {
          where: {lessonID: lesID}
        },
        info
      );
    },
    applications(parent, args, ctx, info){
      const pageId = args.where.coursePageID;
      return ctx.db.query.applications(
        {
          where: {coursePageID: pageId}
        },
        info
      );
    },
    sandboxes(parent, args, ctx, info){
      const pageId = args.where.sandboxPageID;
      return ctx.db.query.sandboxes(
        {
          where: {sandboxPageID: pageId}
        },
        info
      );
    },
    sandboxPageGoals(parent, args, ctx, info){
      const pageId = args.where.sandboxPageID;
      return ctx.db.query.sandboxPageGoals(
        {
          where: {sandboxPageID: pageId}
        },
        info
      );
    },
    me(parent, args, ctx, info) {
        // check if there is a current user ID
        if (!ctx.request.userId) {
          return null;
        }
        return ctx.db.query.user(
          {
            where: { id: ctx.request.userId },
          },
          info
      );
    },
    async users(parent, args, ctx, info) {
      // 1. Check if they are logged in
      if (!ctx.request.userId) {
        throw new Error("You must be logged in!")
      }
      // 2. if they do, query all the users!
      return ctx.db.query.users({}, info);
    },
    async orders(parent, args, ctx, info) {

      return ctx.db.query.orders({}, info);
    },
    async pointAs(parent, args, ctx, info) {

      return ctx.db.query.pointAs({}, info);
    }
};

module.exports = Query;