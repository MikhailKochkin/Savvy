const {forwardTo} = require("prisma-binding");
const { hasPermission } = require("../utils");

const Query = {
    coursePages: forwardTo('db'),
    coursePage: forwardTo('db'),
    sandboxPages: forwardTo('db'),
    sandboxPage: forwardTo('db'),
    case:forwardTo('db'),
    test:forwardTo('db'),
    sandbox:forwardTo('db'),
    casesConnection: forwardTo('db'),
    coursePagesConnection: forwardTo('db'),
    cases(parent, args, ctx, info){
      const pageId = args.where.coursePageID;
      return ctx.db.query.cases(
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
    tests(parent, args, ctx, info){
      const pageId = args.where.coursePageID;
      return ctx.db.query.tests(
        {
          where: {coursePageID: pageId}
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
      // 2. Check if the user has permissions to query
      // all the users
      hasPermission(ctx.request.user, ['ADMIN', 
      'PERMISSIONUPDATE']);

      // 3. if they do, query all the users!
      return ctx.db.query.users({}, info);
    }
};

module.exports = Query;