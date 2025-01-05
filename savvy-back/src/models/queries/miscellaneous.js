const { queryType, stringArg, nonNull, arg } = require("nexus");

function miscellaneousQueries(t) {
  t.list.field("certificates", {
    type: "Certificate",
    args: {
      id: stringArg({ description: "ID of the certificate to fetch." }),
    },
    resolve: (_parent, { id }, ctx) => {
      const where = id ? { id } : {};
      return ctx.prisma.certificate.findMany({
        where,
      });
    },
  });

  t.field("certificate", {
    type: "Certificate",
    args: {
      id: nonNull(stringArg()),
    },
    resolve: (_parent, { id }, ctx) => {
      return ctx.prisma.certificate.findUnique({
        where: { id },
      });
    },
  });

  t.list.field("usefuls", {
    type: "Useful",
    args: {
      id: stringArg({ description: "ID of the useful to fetch." }),
    },
    resolve: (_parent, { id }, ctx) => {
      const where = id ? { id } : {};
      return ctx.prisma.useful.findMany({
        where,
      });
    },
  });

  t.field("useful", {
    type: "Useful",
    args: {
      id: nonNull(stringArg()),
    },
    resolve: (_parent, { id }, ctx) => {
      return ctx.prisma.useful.findUnique({
        where: { id },
      });
    },
  });

  t.list.field("posts", {
    type: "Post",
    args: {
      id: stringArg({ description: "ID of the post to fetch." }),
      language: stringArg({ description: "Language of the post to fetch." }),
      orderByCreatedAt: arg({
        type: "String", // or use an enum
        description: "Sort direction for createdAt: 'asc' or 'desc'",
      }),
    },
    resolve: async (_parent, { id, language, orderByCreatedAt }, ctx) => {
      const where = {
        ...(id && { id }),
        ...(language && { language: { equals: language } }),
      };

      return ctx.prisma.post.findMany({
        where,
        orderBy: {
          createdAt: orderByCreatedAt === "asc" ? "asc" : "desc",
        },
        include: {
          user: true,
        },
      });
    },
  });

  t.field("post", {
    type: "Post",
    args: {
      id: nonNull(stringArg()),
    },
    resolve: (_parent, { id }, ctx) => {
      return ctx.prisma.post.findUnique({
        where: { id },
        include: {
          user: true,
          coursePage: true,
        },
      });
    },
  });

  t.list.field("referrals", {
    type: "Referral",
    args: {
      id: stringArg({ description: "ID of the referral to fetch." }),
    },
    resolve: (_parent, { id }, ctx) => {
      const where = id ? { id } : {};
      return ctx.prisma.referral.findMany({
        where,
      });
    },
  });

  t.field("referral", {
    type: "Referral",
    args: {
      id: nonNull(stringArg()),
    },
    resolve: (_parent, { id }, ctx) => {
      return ctx.prisma.referral.findUnique({
        where: { id },
      });
    },
  });
}

module.exports = {
  miscellaneousQueries,
};
