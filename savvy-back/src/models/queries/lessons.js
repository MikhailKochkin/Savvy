const { stringArg, nonNull } = require("nexus");

function lessonQueries(t) {
  t.list.field("lessons", {
    type: "Lesson",
    args: {
      id: stringArg({ description: "ID of the lesson to fetch." }),
    },
    resolve: async (_parent, { id }, ctx) => {
      // Use the argument in the Prisma query
      const where = id ? { id } : {}; // Construct a filter dynamically
      const res = await ctx.prisma.lesson.findMany({
        where, // Prisma supports `where` filtering
        include: {
          comments: true,
          user: true,
          coursePage: {
            include: {
              lessons: true, // Include the lessons field inside coursePage
              authors: true,
            },
          },
          notes: {
            include: {
              user: true, // Include the lessons field inside coursePage
            },
          },
          chats: true,
          quizes: {
            include: {
              user: true, // Include the lessons field inside coursePage
            },
          },
          newTests: {
            include: {
              user: true, // Include the lessons field inside coursePage
            },
          },
          testPractices: true,
          teamQuests: true,
          problems: {
            include: {
              user: true, // Include the lessons field inside coursePage
            },
          },
          offers: true,
          constructions: {
            include: {
              user: true, // Include the lessons field inside coursePage
            },
          },
          texteditors: {
            include: {
              user: true, // Include the lessons field inside coursePage
            },
          },
          documents: true,
          shots: {
            include: {
              user: true, // Include the lessons field inside coursePage
            },
          },
          miniforums: true,
          forum: true,
          comments: true,
        },
      });
      console.log("Steps:", res[0].problems[0].steps.problemItems);
      return res;
    },
  });

  t.field("lesson", {
    type: "Lesson",
    args: {
      id: nonNull(stringArg()),
    },
    resolve: (_parent, { id }, ctx) => {
      return ctx.prisma.lesson.findUnique({
        where: { id },
        include: {
          comments: true,
          user: true,
          coursePage: {
            include: {
              lessons: true, // Include the lessons field inside coursePage
              authors: true,
            },
          },
          notes: {
            include: {
              user: true, // Include the lessons field inside coursePage
            },
          },
          chats: true,
          quizes: {
            include: {
              user: true, // Include the lessons field inside coursePage
            },
          },
          newTests: {
            include: {
              user: true, // Include the lessons field inside coursePage
            },
          },
          testPractices: true,
          teamQuests: true,
          problems: {
            include: {
              user: true, // Include the lessons field inside coursePage
            },
          },
          offers: true,
          constructions: {
            include: {
              user: true, // Include the lessons field inside coursePage
            },
          },
          texteditors: {
            include: {
              user: true, // Include the lessons field inside coursePage
            },
          },
          documents: true,
          shots: {
            include: {
              user: true, // Include the lessons field inside coursePage
            },
          },
          miniforums: true,
          forum: {
            include: {
              user: true,
              rating: true,
              statements: {
                include: {
                  user: true,
                },
              },
            },
          },
          comments: {
            include: {
              user: true,
              replies: {
                include: {
                  user: true,
                },
              },
            },
          },
        },
      });
    },
  });

  t.list.field("ratings", {
    type: "Rating",
    args: {
      forumId: stringArg({
        description: "ID of the forum to fetch ratings for.",
      }),
    },
    resolve: (_parent, { forumId }, ctx) => {
      const where = forumId ? { forumId } : {};
      return ctx.prisma.rating.findMany({
        where,
      });
    },
  });

  t.field("rating", {
    type: "Rating",
    args: {
      id: nonNull(stringArg()),
    },
    resolve: (_parent, { id }, ctx) => {
      return ctx.prisma.rating.findUnique({
        where: { id },
      });
    },
  });

  t.list.field("feedbacks", {
    type: "Feedback",
    args: {
      id: stringArg({ description: "ID of the feedback to fetch." }),
    },
    resolve: (_parent, { id }, ctx) => {
      const where = id ? { id } : {};
      return ctx.prisma.feedback.findMany({
        where,
        include: {
          user: true,
          lesson: true,
        },
      });
    },
  });

  t.list.field("lessonResults", {
    type: "LessonResult",
    args: {
      lessonId: stringArg({ description: "ID of the lesson." }), // Optional
      userId: stringArg({ description: "ID of the user." }), // Optional
      coursePageId: stringArg({ description: "ID of the course page." }),
    },
    resolve: (_parent, { lessonId, userId, coursePageId }, ctx) => {
      const where = {};

      // Add conditions to the `where` clause dynamically based on the provided args
      if (lessonId) {
        where.lessonId = lessonId;
      }
      if (userId) {
        where.studentId = userId;
      }

      if (coursePageId) {
        // Use relational filtering to filter based on `coursePageId` in the related `lesson`
        where.lesson = {
          coursePageId: coursePageId,
        };
      }
      return ctx.prisma.lessonResult.findMany({
        where,
        include: {
          lesson: {
            select: {
              id: true,
              name: true,
              structure: true,
              type: true,
              number: true,
            },
          },
          student: true,
        },
      });
    },
  });

  t.list.field("challengeResults", {
    type: "ChallengeResult",
    args: {
      id: stringArg({
        description: "ID of the challenge result to fetch.",
      }),
    },
    resolve: (_parent, { id }, ctx) => {
      const where = id ? { id } : {};
      return ctx.prisma.challengeResult.findMany({
        where,
      });
    },
  });

  t.list.field("comments", {
    type: "Comment",
    args: {
      id: stringArg({ description: "ID of the comment to fetch." }),
    },
    resolve: (_parent, { id }, ctx) => {
      const where = id ? { id } : {};
      return ctx.prisma.comment.findMany({
        where,
      });
    },
  });

  t.field("comment", {
    type: "Comment",
    args: {
      id: nonNull(stringArg()),
    },
    resolve: (_parent, { id }, ctx) => {
      return ctx.prisma.comment.findUnique({
        where: { id },
      });
    },
  });
}

module.exports = {
  lessonQueries,
};
