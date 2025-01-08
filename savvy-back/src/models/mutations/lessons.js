const {
  list,
  intArg,
  floatArg,
  booleanArg,
  stringArg,
  nonNull,
  arg,
} = require("nexus");

function lessonMutations(t) {
  t.field("createLesson", {
    type: "Lesson",
    args: {
      number: intArg(),
      name: stringArg(),
      text: stringArg(),
      description: stringArg(),
      coursePageID: stringArg(),
      goal: stringArg(),
    },
    resolve: async (_, args, ctx) => {
      const Lesson = await ctx.prisma.lesson.create({
        data: {
          user: {
            connect: { id: ctx.res.req.userId },
          },
          coursePage: {
            connect: { id: args.coursePageID },
          },
          ...args,
        },
      });
      return Lesson;
    },
  });
  t.field("updateLesson", {
    type: "Lesson",
    args: {
      id: stringArg(),
      number: intArg(),
      name: stringArg(),
      story: stringArg(),
      banner: stringArg(),
      audience: stringArg(),
      context: stringArg(),
      text: stringArg(),
      description: stringArg(),
      type: stringArg(),
      tariffs: stringArg(),
      change: stringArg(),
      assignment: booleanArg(),
      challenge_num: intArg(),
      totalPoints: intArg(),
      hasSecret: booleanArg(),
      open: booleanArg(),
      goal: stringArg(),
      structure: arg({
        type: "LessonStructureInput",
      }),
      short_structure: arg({
        type: "LessonStructureInput",
      }),
      characters: list(
        arg({
          type: "CharacterInput",
        })
      ),
      tags: list(stringArg()),
    },
    resolve: async (_, args, ctx) => {
      try {
        const updates = { ...args };
        delete updates.id;
        delete updates.tags;

        const data = {
          ...updates,
          ...(args.tags && { tags: { set: [...args.tags] } }),
          ...(args.characters && {
            characters: args.characters,
          }),
        };

        const updatedLesson = await ctx.prisma.lesson.update({
          data,
          where: {
            id: args.id,
          },
        });

        return updatedLesson;
      } catch (error) {
        throw new Error(`Failed to update lesson: ${error.message}`);
      }
    },
  });
  t.field("copyLesson", {
    type: "Lesson",
    args: {
      id: nonNull(stringArg()),
      coursePageId: nonNull(stringArg()),
    },
    resolve: async (_, args, ctx) => {
      const originalLessonId = args.id;
      const userId = ctx.res.req.userId;
      const newIdMapping = {};

      // Fetch the original lesson
      const originalLesson = await ctx.prisma.lesson.findUnique({
        where: { id: originalLessonId },
        include: {
          newTests: true,
          notes: true,
          problems: true,
          quizes: true,
          shots: true,
          texteditors: true,
          offers: true,
          constructions: true,
          chats: true,
        },
      });

      if (!originalLesson) {
        throw new Error("Lesson not found");
      }

      const newLesson = await ctx.prisma.lesson.create({
        data: {
          id: undefined,
          createdAt: undefined,
          updatedAt: undefined,
          description: originalLesson.description,
          type: "REGULAR",
          name: originalLesson.name + " (Copy)",
          text: originalLesson.text,
          number: 0,
          structure: originalLesson.structure, // Set the original structure for now, we'll update it later
          coursePage: { connect: { id: args.coursePageId } },
          user: { connect: { id: userId } },
          coursePageID: args.coursePageId,
        },
        include: {
          coursePage: true,
          user: true,
        },
      });

      await Promise.all(
        originalLesson.notes.map(async (note) => {
          const createdNote = await ctx.prisma.note.create({
            data: {
              text: note.text,
              id: undefined,
              user: {
                connect: { id: userId },
              },
              lesson: {
                connect: { id: newLesson.id },
              },
            },
          });
          newIdMapping[note.id] = createdNote.id;
        })
      );

      await Promise.all(
        originalLesson.newTests.map(async (newTest) => {
          const createdNewTest = await ctx.prisma.newTest.create({
            data: {
              answers: {
                set: [...newTest.answers],
              },
              comments: {
                set: [...newTest.comments],
              },
              correct: {
                set: [...newTest.correct],
              },
              question: {
                set: [...newTest.question],
              },
              lessonID: newLesson.id,
              ifRight: newTest.ifRight,
              ifWrong: newTest.ifWrong,
              type: newTest.type,
              user: {
                connect: { id: userId },
              },
              lesson: {
                connect: { id: newLesson.id },
              },
            },
          });
          newIdMapping[newTest.id] = createdNewTest.id;
        })
      );

      await Promise.all(
        originalLesson.quizes.map(async (quiz) => {
          const createdQuiz = await ctx.prisma.quiz.create({
            data: {
              question: quiz.question,
              answer: quiz.answer,
              answers: quiz.answers,
              ifWrong: quiz.ifWrong,
              ifRight: quiz.ifRight,
              goal: quiz.goal,
              type: quiz.type,
              goalType: quiz.goalType,
              user: {
                connect: { id: userId },
              },
              lesson: {
                connect: { id: newLesson.id },
              },
            },
          });
          newIdMapping[quiz.id] = createdQuiz.id;
        })
      );

      await Promise.all(
        originalLesson.chats.map(async (chat) => {
          const createdChat = await ctx.prisma.chat.create({
            data: {
              messages: chat.messages,
              name: chat.name,
              user: {
                connect: { id: userId },
              },
              lesson: {
                connect: { id: newLesson.id },
              },
            },
          });
          newIdMapping[chat.id] = createdChat.id;
        })
      );

      await Promise.all(
        originalLesson.shots.map(async (shot) => {
          const createdShot = await ctx.prisma.shot.create({
            data: {
              title: shot.title,
              parts: {
                set: [...shot.parts],
              },
              comments: {
                set: [...shot.comments],
              },
              user: {
                connect: { id: userId },
              },
              lesson: {
                connect: { id: newLesson.id },
              },
            },
          });
          newIdMapping[shot.id] = createdShot.id;
        })
      );

      await Promise.all(
        originalLesson.problems.map(async (problem) => {
          if (
            problem.steps &&
            problem.steps.problemItems &&
            problem.steps.problemItems.length !== 0
          ) {
            let newSteps = problem.steps.problemItems.map((step) => {
              return {
                ...step,

                // Update id reference
                id: newIdMapping[step.id] || step.id,

                // Update next value
                next: {
                  true: {
                    type: step.next.true.type,
                    value:
                      newIdMapping[step.next.true.value] ||
                      step.next.true.value,
                  },
                  false: {
                    type: step.next.false.type,
                    value:
                      newIdMapping[step.next.false.value] ||
                      step.next.false.value,
                  },
                },
              };
            });
            const createdProblem = await ctx.prisma.problem.create({
              data: {
                text: problem.text,
                lessonID: newLesson.id,
                user: {
                  connect: { id: userId },
                },
                lesson: {
                  connect: { id: newLesson.id },
                },
                steps: { problemItems: newSteps },
              },
            });
            newIdMapping[problem.id] = createdProblem.id;
          }
        })
      );

      await Promise.all(
        originalLesson.constructions.map(async (construction) => {
          const createdConstruction = await ctx.prisma.construction.create({
            data: {
              type: construction.type,
              name: construction.name,
              text: construction.text,
              hasText: construction.hasText,
              columnsNum: construction.columnsNum,
              elements: construction.elements,
              variants: {
                set: [...construction.variants],
              },
              answer: {
                set: [...construction.answer],
              },
              user: {
                connect: { id: userId },
              },
              lesson: {
                connect: { id: newLesson.id },
              },
              lessonID: newLesson.id,
            },
          });
          newIdMapping[construction.id] = createdConstruction.id;
        })
      );

      await Promise.all(
        originalLesson.texteditors.map(async (texteditor) => {
          const replaceElementIds = (text, newIdMapping) => {
            return text.replace(/elementId="([^"]+)"/g, (match, p1) => {
              // Find the new ID in newIdMapping
              const newId = newIdMapping[p1] || p1;
              return `elementId="${newId}"`;
            });
          };
          const updatedText = replaceElementIds(texteditor.text, newIdMapping);

          const createdEditor = await ctx.prisma.textEditor.create({
            data: {
              text: updatedText,
              totalMistakes: texteditor.totalMistakes,
              name: texteditor.name,
              user: {
                connect: { id: userId },
              },
              lesson: {
                connect: { id: newLesson.id },
              },
              lessonID: newLesson.id,
            },
          });
          newIdMapping[texteditor.id] = createdEditor.id;
        })
      );

      const originalStructure = originalLesson.structure;
      const updatedStructure = originalStructure.lessonItems.map((item) => ({
        ...item,
        id: newIdMapping[item.id],
      }));

      await ctx.prisma.lesson.update({
        where: { id: newLesson.id },
        data: { structure: { lessonItems: updatedStructure } },
      });

      return newLesson;
    },
  });
  t.field("deleteLesson", {
    type: "Lesson",
    args: {
      id: stringArg(),
    },
    resolve: async (_, args, ctx) => {
      const where = { id: args.id };
      const lesson = await ctx.prisma.lesson.findUnique(
        { where },
        `{ id, user { id } }`
      );
      //3. Delete it
      return ctx.prisma.lesson.delete({
        where: {
          id: args.id,
        },
      });
    },
  });
  t.field("updatePublished", {
    type: "Lesson",
    args: {
      id: stringArg(),
      published: booleanArg(),
    },
    resolve: async (_, args, ctx) => {
      const published = await ctx.prisma.lesson.update({
        data: { published: args.published },
        where: {
          id: args.id,
        },
      });
      return published;
    },
  });
  t.field("createLessonResult", {
    type: "LessonResult",
    args: {
      visitsNumber: intArg(),
      lessonID: stringArg(),
    },
    resolve: async (_, args, ctx) => {
      const LessonResult = await ctx.prisma.lessonResult.create({
        data: {
          student: {
            connect: { id: ctx.res.req.userId },
          },
          lesson: {
            connect: { id: args.lessonID },
          },
          ...args,
        },
      });
      return LessonResult;
    },
  });
  t.field("updateLessonResult", {
    type: "LessonResult",
    args: {
      id: stringArg(),
      visitsNumber: intArg(),
      progress: intArg(),
    },
    resolve: async (_, args, ctx) => {
      const updatedLessonResult = await ctx.prisma.lessonResult.update({
        data: { visitsNumber: args.visitsNumber, progress: args.progress },
        where: {
          id: args.id,
        },
      });
      return updatedLessonResult;
    },
  });
  t.field("deleteLessonResult", {
    type: "LessonResult",
    args: {
      id: stringArg(),
    },
    resolve: async (_, args, ctx) => {
      const where = { id: args.id };
      return ctx.prisma.lessonResult.delete({ where });
    },
  });
  t.field("checkAssignment", {
    type: "LessonResult",
    args: {
      checked: booleanArg(),
      id: stringArg(),
    },
    resolve: async (_, { checked, id }, ctx) => {
      const lessonResult = await ctx.prisma.lessonResult.update({
        where: { id },
        data: { checked },
      });
      return lessonResult;
    },
  });
  t.field("createChallengeResult", {
    type: "ChallengeResult",
    args: {
      lesson: stringArg(),
      correct: intArg(),
      wrong: intArg(),
      time: intArg(),
    },
    resolve: async (_, args, ctx) => {
      const client = await ctx.prisma.challengeResult.create({
        data: {
          student: {
            connect: { id: ctx.res.req.userId },
          },
          lesson: {
            connect: { id: args.lesson },
          },
          correct: args.correct,
          wrong: args.wrong,
          time: args.time,
        },
      });
      return client;
    },
  });
  t.field("createComment", {
    type: "Comment",
    args: {
      text: stringArg(),
      lessonId: stringArg(),
      blockId: stringArg(),
    },
    resolve: async (_, args, ctx) => {
      return ctx.prisma.comment.create({
        data: {
          text: args.text,
          blockId: args.blockId,
          lesson: {
            connect: { id: args.lessonId },
          },
          user: {
            connect: { id: ctx.res.req.userId },
          },
        },
        include: {
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
  t.field("updateComment", {
    type: "Comment",
    args: {
      id: stringArg(),
      text: stringArg(),
      status: arg({
        type: "CommentStatus",
      }),
    },
    resolve: async (_, args, ctx) => {
      return ctx.prisma.comment.update({
        where: { id: args.id },
        data: { text: args.text, status: args.status },
        include: {
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
  t.field("deleteComment", {
    type: "Comment",
    args: {
      id: stringArg(),
    },
    resolve: async (_, args, ctx) => {
      return ctx.prisma.comment.delete({ where: { id: args.id } });
    },
  });
  t.field("createReply", {
    type: "Comment",
    args: {
      text: stringArg(),
      lessonId: stringArg(),
      blockId: stringArg(),
      sourceCommentId: stringArg(), // New argument to link to the parent comment
    },
    resolve: async (_, args, ctx) => {
      return ctx.prisma.comment.create({
        data: {
          text: args.text,
          blockId: args.blockId,
          lesson: {
            connect: { id: args.lessonId },
          },
          user: {
            connect: { id: ctx.res.req.userId },
          },
          parentComment: {
            connect: { id: args.sourceCommentId }, // Connect reply to the parent comment
          },
        },
        include: {
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
  t.field("updateReply", {
    type: "Comment",
    args: {
      id: stringArg(),
      text: stringArg(),
      status: arg({
        type: "CommentStatus",
      }),
    },
    resolve: async (_, args, ctx) => {
      return ctx.prisma.comment.update({
        where: { id: args.id },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              surname: true,
              image: true,
            },
          },
        },
        data: { text: args.text, status: args.status },
      });
    },
  });
  t.field("deleteReply", {
    type: "Comment",
    args: {
      id: stringArg(),
    },
    resolve: async (_, args, ctx) => {
      return ctx.prisma.comment.delete({ where: { id: args.id } });
    },
  });
}

module.exports = { lessonMutations };
