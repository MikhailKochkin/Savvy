const { booleanArg, stringArg, arg } = require("nexus");

function subscriptionMutations(t) {
  t.field("createSubscription", {
    type: "Subscription",
    args: {
      type: stringArg(),
      startDate: arg({
        type: "DateTime",
      }),
      endDate: arg({
        type: "DateTime",
      }),
      paymentID: stringArg(),
      userId: stringArg(),
      term: stringArg(),
    },
    resolve: async (_, args, ctx) => {
      const userId = args.userId;
      delete args.userId;
      const Sub = await ctx.prisma.subscription.create({
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
          ...args,
        },
      });
      return Sub;
    },
  });
  t.field("updateSubscription", {
    type: "Subscription",
    args: {
      id: stringArg(),
      type: stringArg(),
      isActive: booleanArg(),
      endDate: arg({
        type: "DateTime",
      }),
      term: stringArg(),
      paymentID: stringArg(),
      // renewals: arg({
      //   type: "Renewals",
      // }),
    },
    resolve: async (_, args, ctx) => {
      const subscriptionId = args.id;
      delete args.id;
      return ctx.prisma.subscription.update({
        where: { id: subscriptionId },
        data: args,
      });
    },
  });
  t.field("cancelSubscription", {
    type: "Subscription",
    args: {
      id: stringArg(),
    },
    resolve: async (_, args, ctx) => {
      return ctx.prisma.subscription.update({
        where: { id: args.id },
        data: {
          isActive: false,
        },
      });
    },
  });
  t.field("createReferral", {
    type: "Referral",
    args: {
      referrerId: stringArg(),
    },
    resolve: async (_, args, ctx) => {
      const Referral = await ctx.prisma.referral.create({
        data: {
          referrer: {
            connect: { id: args.referrerId },
          },
          referee: { connect: { id: ctx.res.req.userId } },
          isCounted: false,
          isPaid: false,
        },
      });
      return Referral;
    },
  });
}

module.exports = { subscriptionMutations };
