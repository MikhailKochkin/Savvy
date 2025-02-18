const { stringArg, nonNull } = require("nexus");

function lessonQueries(t) {
  t.list.field("lessons", {
    type: "Lesson",
    args: {
      id: stringArg({ description: "ID of the lesson to fetch." }),
      coursePageId: stringArg({
        description: "ID of the coursePage to fetch.",
      }),
    },
    resolve: async (_parent, { id, coursePageId }, ctx) => {
      // Use the arguments in the Prisma query
      const where = {
        ...(id && { id }),
        ...(coursePageId && { coursePageId }),
      }; // Construct a filter dynamically
      const res = await ctx.prisma.lesson.findMany({
        where, // Prisma supports `where` filtering
        include: {
          comments: true,
          user: {
            select: {
              id: true,
            },
          },
          coursePage: {
            include: {
              lessons: true, // Include the lessons field inside coursePage
              authors: true,
            },
          },
          notes: {
            include: {
              user: {
                select: {
                  id: true,
                },
              }, // Include the lessons field inside coursePage
            },
          },
          chats: true,
          quizes: {
            include: {
              user: {
                select: {
                  id: true,
                },
              }, // Include the lessons field inside coursePage
            },
          },
          newTests: {
            include: {
              user: {
                select: {
                  id: true,
                },
              }, // Include the lessons field inside coursePage
            },
          },
          testPractices: true,
          teamQuests: true,
          problems: {
            include: {
              user: {
                select: {
                  id: true,
                },
              }, // Include the lessons field inside coursePage
            },
          },
          offers: true,
          constructions: {
            include: {
              user: {
                select: {
                  id: true,
                },
              }, // Include the lessons field inside coursePage
            },
          },
          texteditors: {
            include: {
              user: {
                select: {
                  id: true,
                },
              }, // Include the lessons field inside coursePage
            },
          },
          documents: true,
          shots: {
            include: {
              user: {
                select: {
                  id: true,
                },
              }, // Include the lessons field inside coursePage
            },
          },
          miniforums: true,
          forum: true,
          comments: true,
        },
      });
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
          challengeResults: {
            include: {
              student: true, // Include the lessons field inside coursePage
            },
          },
          coursePage: {
            include: {
              lessons: true, // Include the lessons field inside coursePage
              authors: true,
              courseAccessControls: {
                select: {
                  id: true,
                  accessibleLessons: true,
                  areAllLessonsAccessible: true,
                  changeScope: true,
                  role: true,
                  user: {
                    select: {
                      id: true,
                      name: true,
                      surname: true,
                      email: true,
                    },
                  },
                },
              },
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
          offers: {
            include: {
              user: true,
              lesson: true, // Include the lessons field inside coursePage
            },
          },
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
              user: true, // Include the lessons field inside coursePage
              rating: {
                include: {
                  user: true, // Include the lessons field inside coursePage
                },
              },
              statements: {
                include: {
                  user: true, // Include the lessons field inside coursePage
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

  t.field("shortLesson", {
    type: "Lesson",
    args: {
      id: nonNull(stringArg()),
    },
    resolve: (_parent, { id }, ctx) => {
      return ctx.prisma.lesson.findUnique({
        where: { id },
        select: {
          id: true,
          text: true,
          openSize: true,
          name: true,
          number: true,
          type: true,
          context: true,
          user: {
            select: {
              id: true,
              name: true,
              surname: true,
              image: true,
            },
          },
          structure: {
            select: {
              lessonItems: {
                select: {
                  id: true,
                  type: true,
                  comment: true,
                },
              },
            },
          },
          coursePage: {
            include: {
              lessons: {
                select: {
                  id: true,
                  number: true,
                  published: true,
                  name: true,
                  open: true,
                  story: true,
                },
              }, // Include the lessons field inside coursePage
              authors: {
                select: {
                  id: true,
                },
              },
              courseAccessControls: {
                select: {
                  id: true,
                  accessibleLessons: true,
                  areAllLessonsAccessible: true,
                  changeScope: true,
                  role: true,
                  user: {
                    select: {
                      id: true,
                      name: true,
                      surname: true,
                      email: true,
                    },
                  },
                },
              },
            },
          },
          open: true,
          forum: {
            include: {
              user: {
                select: {
                  id: true,
                },
              },
              rating: {
                include: {
                  user: {
                    select: {
                      id: true,
                    },
                  },
                },
              },
              statements: {
                include: {
                  user: {
                    select: {
                      id: true,
                    },
                  },
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
          user: {
            select: {
              id: true,
            },
          },
          lesson: true,
        },
      });
    },
  });

  t.list.field("lessonResults", {
    type: "LessonResult",
    args: {
      lessonId: stringArg({ description: "ID of the lesson." }), // Optional
      studentId: stringArg({ description: "ID of the user." }), // Optional
      coursePageId: stringArg({ description: "ID of the course page." }),
    },
    resolve: (_parent, { lessonId, studentId, coursePageId }, ctx) => {
      const where = {};

      // Add conditions to the `where` clause dynamically based on the provided args
      if (lessonId) {
        where.lessonId = lessonId;
      }
      if (studentId) {
        where.studentId = studentId;
      }
      if (coursePageId) {
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
