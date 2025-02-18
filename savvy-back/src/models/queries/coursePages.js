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
      courseType: stringArg({
        description: "Filter by course type.",
      }),
    },
    resolve: async (
      _parent,
      {
        id,
        published,
        orderByCreatedAt,
        studentId,
        userId,
        co_authorId,
        courseType,
      },
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
        ...(courseType && {
          courseType: { equals: courseType },
        }),
      };

      return ctx.prisma.coursePage.findMany({
        where,
        orderBy: {
          // Default to "desc" if nothing is specified
          createdAt: orderByCreatedAt === "asc" ? "asc" : "desc",
        },
        include: {
          user: {
            select: {
              id: true,
            },
          },
          new_students: {
            select: {
              id: true,
            },
          },
          orders: {
            select: {
              id: true,
            },
          },
          lessons: {
            select: {
              id: true,
            },
          },
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
          courseAccessControls: {
            select: {
              id: true,
              areAllLessonsAccessible: true,
              accessibleLessons: true,
              changeScope: true,
              role: true,
              user: {
                select: {
                  email: true,
                  name: true,
                  id: true,
                  surname: true,
                },
              },
            },
          },
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
  t.field("courseAccessControl", {
    type: "CourseAccessControl",
    args: {
      id: stringArg(),
      userId: stringArg(),
      coursePageId: stringArg(),
    },
    resolve: async (_parent, { id, userId, coursePageId }, ctx) => {
      return ctx.prisma.courseAccessControl.findUnique({
        where: {
          ...(id && { id }),
          ...(userId && { userId }),
          ...(coursePageId && { coursePageId }),
        },
      });
    },
  });
  t.list.field("courseAccessControls", {
    type: "CourseAccessControl",
    args: {
      id: stringArg({
        description: "ID of the course access control entry to fetch.",
      }),
      userId: stringArg({ description: "User ID to filter course access." }),
      coursePageId: stringArg({
        description: "Course Page ID to filter access.",
      }),
    },
    resolve: async (_parent, { id, userId, coursePageId }, ctx) => {
      const where = {
        ...(id && { id }),
        ...(userId && { userId }),
        ...(coursePageId && { coursePageId }),
      };
      return ctx.prisma.courseAccessControl.findMany({
        where,
        include: {
          coursePage: {
            select: {
              id: true,
              title: true,
              description: true,
              published: true,
              courseType: true,
              updatedAt: true,
            },
          },
          user: {
            select: {
              id: true,
              name: true,
              surname: true,
              image: true,
            },
          },
        },
      });
    },
  });
}

module.exports = {
  courseQueries,
};
