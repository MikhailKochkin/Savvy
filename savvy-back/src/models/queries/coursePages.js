const { stringArg, nonNull, booleanArg, arg } = require("nexus");

function courseQueries(t) {
  t.list.field("coursePages", {
    type: "CoursePage",
    args: {
      id: stringArg({ description: "ID of the course page to fetch." }),
      published: booleanArg({ description: "Filter by published status." }),
      // A simple string argument to specify 'asc' or 'desc'
      orderByCreatedAt: arg({
        type: "String", // or use an enum
        description: "Sort direction for createdAt: 'asc' or 'desc'",
      }),
      studentId: stringArg({
        description: "ID of the student to filter by.",
      }),
      userId: stringArg({
        description: "ID of the course creator to filter by.",
      }),
      co_authorId: stringArg({
        description: "ID of the course creator to filter by.",
      }),
    },
    resolve: async (
      _parent,
      { id, published, orderByCreatedAt, studentId, userId, co_authorId },
      ctx
    ) => {
      const where = {
        ...(id && { id: { equals: id } }),
        ...(published !== null && { published }),
        ...(studentId && {
          new_students: {
            some: {
              id: { equals: studentId },
            },
          },
        }),
        ...(userId && {
          user: {
            id: { equals: userId },
          },
        }),
        ...(co_authorId && {
          authors: {
            some: {
              id: { equals: co_authorId },
            },
          },
        }),
      };

      return ctx.prisma.coursePage.findMany({
        where,
        orderBy: {
          // Default to "desc" if nothing is specified
          createdAt: orderByCreatedAt === "asc" ? "asc" : "desc",
        },
        include: {
          user: true,
          authors: true,
          new_students: true,
          orders: true,
          lessons: true,
        },
      });
    },
  });

  t.field("coursePage", {
    type: "CoursePage",
    args: {
      id: nonNull(stringArg()),
    },
    resolve: (_parent, { id }, ctx) => {
      return ctx.prisma.coursePage.findUnique({
        where: { id },
        include: {
          user: true,
          authors: true,
          new_students: true,
          lessons: true,
        },
      });
    },
  });

  t.list.field("courseVisits", {
    type: "CourseVisit",
    args: {
      id: stringArg({ description: "ID of the course visit to fetch." }),
    },
    resolve: (_parent, { id }, ctx) => {
      const where = id ? { id } : {};
      return ctx.prisma.courseVisit.findMany({
        where,
      });
    },
  });

  t.field("courseVisit", {
    type: "CourseVisit",
    args: {
      id: nonNull(stringArg()),
    },
    resolve: (_parent, { id }, ctx) => {
      return ctx.prisma.courseVisit.findUnique({
        where: { id },
      });
    },
  });
}

module.exports = {
  courseQueries,
};
