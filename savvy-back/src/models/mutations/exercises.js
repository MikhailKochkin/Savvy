const {
  list,
  intArg,
  floatArg,
  booleanArg,
  mutationType,
  stringArg,
  nonNull,
  arg,
} = require("nexus");
const postmark = require("postmark");

const CommentEmail = require("../../emails/Comment");

const client = new postmark.ServerClient(process.env.MAIL_TOKEN);

const AuthorNotification = (lesson, course, lessonID, text) => `
  <div className="email" style="
    padding: 20px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 20px;
  ">
    <h2>Привет!</h2>
    <p>Пришел новый вопрос по уроку "${lesson}" курса "${course}"</p>
    <p>Вопрос звучит так:</p>
    <p><i>"${text}"</i></p>
    <p>Ответить можно прямо в чате. Перейдите к курсу по ссылке.</p>
    <button><a href="https://besavvy.app/lesson?id=${lessonID}&type=story">Перейти</a></button>
  </div>
`;

function exercisesMutations(t) {
  t.field("createNewTest", {
    type: "NewTest",
    args: {
      lessonId: stringArg(),
      answers: list(stringArg()),
      complexTestAnswers: arg({
        type: "ComplexTestAnswersInput",
      }),
      correct: list(booleanArg()),
      comments: list(stringArg()),
      question: list(stringArg()),
      goal: stringArg(),
      type: stringArg(),
      name: stringArg(),
      instructorName: stringArg(),
      image: stringArg(),
      ifRight: stringArg(),
      ifWrong: stringArg(),
    },
    resolve: async (_, args, ctx) => {
      const lessonId = args.lessonId;
      const answers = args.answers;
      const comments = args.comments;
      const correct = args.correct;
      const question = args.question;
      delete args.lessonId;
      delete args.answers;
      delete args.comments;
      delete args.correct;
      delete args.question;

      const new_data = {
        user: {
          connect: {
            id: ctx.res.req.userId
              ? ctx.res.req.userId
              : "clkvdew14837181f13vcbbcw0x",
          },
        },
        lesson: {
          connect: { id: lessonId },
        },
        answers: {
          set: [...answers],
        },
        comments: {
          set: [...comments],
        },
        correct: {
          set: [...correct],
        },
        question: {
          set: [...question],
        },
        lessonID: lessonId,
        ...args,
      };

      const newTest = await ctx.prisma.newTest.create({
        data: new_data,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              surname: true,
            },
          },
        },
      });
      const miniForum = await ctx.prisma.miniForum.create({
        data: {
          user: {
            connect: { id: ctx.res.req.userId },
          },
          lesson: {
            connect: { id: lessonId },
          },
          value: newTest.id,
          type: "NewTest",
        },
      });

      return newTest;
    },
  });
  t.field("updateNewTest", {
    type: "NewTest",
    args: {
      id: stringArg(),
      answers: list(stringArg()),
      correct: list(booleanArg()),
      question: list(stringArg()),
      comments: list(stringArg()),
      type: stringArg(),
      complexTestAnswers: arg({
        type: "ComplexTestAnswersInput",
      }),
      ifRight: stringArg(),
      ifWrong: stringArg(),
      complexity: intArg(),
      goal: stringArg(),
      goalType: stringArg(),
      name: stringArg(),
      instructorName: stringArg(),
      image: stringArg(),
      next: arg({
        type: "NextTypeInput", // name should match the name you provided
      }),
    },
    resolve: async (_, args, ctx) => {
      const updates = { ...args };
      delete updates.id;
      const updatedTest = await ctx.prisma.newTest.update({
        data: updates,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              surname: true,
            },
          },
        },
        where: {
          id: args.id,
        },
      });
      return updatedTest;
    },
  });
  t.field("deleteNewTest", {
    type: "NewTest",
    args: {
      id: stringArg(),
    },
    resolve: async (_, args, ctx) => {
      const where = { id: args.id };
      const test = await ctx.prisma.newTest.findUnique(
        { where },
        `{ id, user { id } }`
      );
      // const ownsTest = test.userId === ctx.res.req.userId;
      // if (!ownsTest) {
      //   throw new Error("К сожалению, у вас нет полномочий на это.");
      // }
      //3. Delete it
      return ctx.prisma.newTest.delete({ where });
    },
  });
  t.field("createTestResult", {
    type: "TestResult",
    args: {
      answer: stringArg(),
      hint: stringArg(),
      type: stringArg(),
      testID: stringArg(),
      lessonID: stringArg(),
      result: stringArg(),
      answerArray: list(stringArg()),
    },
    resolve: async (_, args, ctx) => {
      const TestResult = await ctx.prisma.testResult.create({
        data: {
          student: {
            connect: {
              id: ctx.res.req.userId
                ? ctx.res.req.userId
                : "clkvdew14837181f13vcbbcw0x",
            },
          },
          test: {
            connect: { id: args.testID },
          },
          lesson: {
            connect: { id: args.lessonID },
          },
          answerArray: {
            set: [...args.answerArray],
          },
          ...args,
        },
      });
      const test = await ctx.prisma.newTest.findUnique(
        { where: { id: args.testID } },
        `{ id, answers, correct}`
      );

      let checker = [];
      test.correct.map((el, index) => {
        if (el === true) {
          checker.push(test.answers[index]);
        }
      });

      if (checker.join(", ") === args.answer) {
        const user = await ctx.prisma.user.findUnique(
          {
            where: {
              id: ctx.res.req.userId
                ? ctx.res.req.userId
                : "clkvdew14837181f13vcbbcw0x",
            },
            include: {
              level: true,
            },
          },
          `{ id, level {id, level} }`
        );
        const updateUserLevel = await ctx.prisma.userLevel.update({
          data: {
            level: user.level.level + 1,
          },
          where: {
            id: user.level.id,
          },
        });
      }

      return TestResult;
    },
  });
  t.field("createTestPractice", {
    type: "TestPractice",
    args: {
      text: stringArg(),
      tasksNum: intArg(),
      intro: stringArg(),
      successText: stringArg(),
      failureText: stringArg(),
      tasks: list(stringArg()),
      lessonId: stringArg(),
      goal: stringArg(),
    },
    resolve: async (
      _,
      {
        lessonId,
        tasks,
        tasksNum,
        text,
        intro,
        successText,
        failureText,
        goal,
      },
      ctx
    ) => {
      const new_data = {
        user: {
          connect: {
            id: ctx.res.req.userId
              ? ctx.res.req.userId
              : "clkvdew14837181f13vcbbcw0x",
          },
        },
        lesson: {
          connect: { id: lessonId },
        },
        tasks: {
          set: [...tasks],
        },
        tasksNum: tasksNum,
        text: text,
        successText: successText,
        failureText: failureText,
        intro: intro,
        goal: goal,
      };
      const newTP = await ctx.prisma.testPractice.create({
        data: new_data,
      });
      return newTP;
    },
  });
  t.field("updateTestPractice", {
    type: "TestPractice",
    args: {
      id: stringArg(),
      // text: stringArg(),
      tasksNum: intArg(),
      intro: stringArg(),
      successText: stringArg(),
      failureText: stringArg(),
      tasks: list(stringArg()),
      // lessonId: stringArg(),
      // goal: stringArg(),
    },
    resolve: async (
      _,
      {
        id, // New argument
        // lessonId,
        tasks,
        tasksNum,
        // text,
        intro,
        successText,
        failureText,
        // goal,
      },
      ctx
    ) => {
      // Optionally, check if the user has permission to update this TestPractice
      const testPractice = await ctx.prisma.testPractice.findUnique({
        where: { id },
        include: { user: true },
      });

      if (!testPractice) {
        throw new Error("TestPractice not found");
      }

      // if (testPractice.user.id !== ctx.res.req.userId) {
      //   throw new Error(
      //     "You don't have permission to update this TestPractice"
      //   );
      // }

      const update_data = {
        // lesson: lessonId ? { connect: { id: lessonId } } : undefined,
        tasks: tasks ? { set: [...tasks] } : undefined,
        tasksNum: tasksNum ?? undefined,
        // text: text ?? undefined,
        successText: successText ?? undefined,
        failureText: failureText ?? undefined,
        intro: intro ?? undefined,
        // goal: goal ?? undefined,
      };

      // Remove undefined fields
      const cleanedData = Object.fromEntries(
        Object.entries(update_data).filter(([_, v]) => v !== undefined)
      );

      const updatedTP = await ctx.prisma.testPractice.update({
        where: { id },
        data: cleanedData,
      });

      return updatedTP;
    },
  });
  t.field("createTestPracticeResult", {
    type: "TestPracticeResult",
    args: {
      tasks: list(stringArg()),
      correct: intArg(),
      lessonId: stringArg(),
      testPracticeId: stringArg(),
    },
    resolve: async (_, args, ctx) => {
      const TestPracticeResult = await ctx.prisma.testPracticeResult.create({
        data: {
          student: {
            connect: {
              id: ctx.res.req.userId
                ? ctx.res.req.userId
                : "clkvdew14837181f13vcbbcw0x",
            },
          },
          testPractice: {
            connect: { id: args.testPracticeId },
          },
          lesson: {
            connect: { id: args.lessonId },
          },
          tasks: {
            set: [...args.tasks],
          },
          correct: args.correct,
        },
      });
      return TestPracticeResult;
    },
  });
  t.field("createTeamQuest", {
    type: "TeamQuest",
    args: {
      tasks: arg({
        type: "QuestList",
      }),
      introduction: stringArg(),
      solution: stringArg(),
      lessonId: stringArg(),
    },
    resolve: async (_, { lessonId, tasks, introduction, solution }, ctx) => {
      const new_data = {
        user: {
          connect: {
            id: ctx.res.req.userId
              ? ctx.res.req.userId
              : "clkvdew14837181f13vcbbcw0x",
          },
        },
        lesson: {
          connect: { id: lessonId },
        },
        tasks: tasks,
        solution: solution,
        introduction: introduction,
      };
      const newTQ = await ctx.prisma.teamQuest.create({ data: new_data });
      return newTQ;
    },
  });
  t.field("createTeamQuestResult", {
    type: "TeamQuestResult",
    args: {
      answer: stringArg(),
      lessonId: stringArg(),
      teamQuestId: stringArg(),
    },
    resolve: async (_, { answer, lessonId, teamQuestId }, ctx) => {
      const TQResult = await ctx.prisma.teamQuestResult.create({
        data: {
          student: {
            connect: { id: ctx.res.req.userId },
          },
          teamQuest: {
            connect: { id: teamQuestId },
          },
          lesson: {
            connect: { id: lessonId },
          },
          answer: answer,
        },
      });
      return TQResult;
    },
  });
  t.field("createQuiz", {
    type: "Quiz",
    args: {
      instructorName: stringArg(),
      name: stringArg(),
      image: stringArg(),
      question: stringArg(),
      answer: stringArg(),
      lessonId: stringArg(),
      ifRight: stringArg(),
      ifWrong: stringArg(),
      type: stringArg(),
      goalType: stringArg(),
      answers: arg({
        type: "ComplexAnswerInput",
      }),
    },
    resolve: async (_, args, ctx) => {
      const lessonId = args.lessonId;
      delete args.lessonId;
      const Quiz = await ctx.prisma.quiz.create({
        data: {
          user: {
            connect: { id: ctx.res.req.userId },
          },
          lesson: {
            connect: { id: lessonId },
          },
          ...args,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              surname: true,
            },
          },
        },
      });
      const miniForum = await ctx.prisma.miniForum.create({
        data: {
          user: {
            connect: { id: ctx.res.req.userId },
          },
          lesson: {
            connect: { id: lessonId },
          },
          value: Quiz.id,
          type: "Quiz",
        },
      });
      return Quiz;
    },
  });
  t.field("updateQuiz", {
    type: "Quiz",
    args: {
      id: stringArg(),
      question: stringArg(),
      answer: stringArg(),
      lessonId: stringArg(),
      complexity: intArg(),
      next: arg({
        type: "NextTypeInput", // name should match the name you provided
      }),
      isScoringShown: booleanArg(),
      ifRight: stringArg(),
      type: stringArg(),
      ifWrong: stringArg(),
      check: stringArg(),
      goal: stringArg(),
      goalType: stringArg(),
      instructorName: stringArg(),
      name: stringArg(),
      image: stringArg(),
      isOrderOfAnswersImportant: booleanArg(),
      shouldAnswerSizeMatchSample: booleanArg(),
      answers: arg({
        type: "ComplexAnswerInput",
      }),
    },
    resolve: async (_, args, ctx) => {
      const updates = { ...args };
      delete updates.id;
      const updatedQuiz = await ctx.prisma.quiz.update({
        data: updates,
        where: {
          id: args.id,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              surname: true,
            },
          },
        },
      });
      return updatedQuiz;
    },
  });
  t.field("deleteQuiz", {
    type: "Quiz",
    args: {
      id: stringArg(),
    },
    resolve: async (_, args, ctx) => {
      const where = { id: args.id };
      const quiz = await ctx.prisma.quiz.findUnique(
        { where },
        `{ id, user { id } }`
      );
      // const ownsTest = quiz.userId === ctx.res.req.userId;
      // if (!ownsTest) {
      //   throw new Error("К сожалению, у вас нет полномочий на это.");
      // }
      //3. Delete it
      return ctx.prisma.quiz.delete({ where });
    },
  });
  t.field("createQuizResult", {
    type: "QuizResult",
    args: {
      answer: stringArg(),
      correct: booleanArg(),
      quiz: stringArg(),
      lessonId: stringArg(),
      comment: stringArg(),
      hint: stringArg(),
      explanation: stringArg(),
      improvement: stringArg(),
      goal: stringArg(),
      type: stringArg(),
      result: stringArg(),
      ideasList: arg({
        type: "QuizIdeasInput",
      }),
    },
    resolve: async (_, args, ctx) => {
      const quiz = args.quiz;
      const lessonId = args.lessonId;
      delete args.quiz;
      delete args.lessonId;
      const QuizResult = await ctx.prisma.quizResult.create({
        data: {
          student: {
            connect: {
              id: ctx.res.req.userId
                ? ctx.res.req.userId
                : "clkvdew14837181f13vcbbcw0x",
            },
          },
          hint: args.hint ? args.hint : "",
          explanation: args.explanation ? args.explanation : "",
          improvement: args.improvement ? args.improvement : "",
          quiz: {
            connect: { id: quiz },
          },
          lesson: {
            connect: { id: lessonId },
          },
          ...args,
        },
      });

      if (args.correct === true) {
        const user = await ctx.prisma.user.findUnique(
          {
            where: {
              id: ctx.res.req.userId
                ? ctx.res.req.userId
                : "clkvdew14837181f13vcbbcw0x",
            },
            include: {
              level: true,
            },
          },
          `{ id, level {id, level} }`
        );
        const updateUserLevel = await ctx.prisma.userLevel.update({
          data: {
            level: user.level.level + 2,
          },
          where: {
            id: user.level.id,
          },
        });
      }

      return QuizResult;
    },
  });
  t.field("createNote", {
    type: "Note",
    args: {
      lessonId: stringArg(),
      text: stringArg(),
      name: stringArg(),
    },
    resolve: async (_, args, ctx) => {
      const lessonId = args.lessonId;
      delete args.lessonId;
      const Note = await ctx.prisma.note.create({
        data: {
          user: {
            connect: { id: ctx.res.req.userId },
          },
          lesson: {
            connect: { id: lessonId },
          },
          ...args,
        },
      });
      const miniForum = await ctx.prisma.miniForum.create({
        data: {
          user: {
            connect: { id: ctx.res.req.userId },
          },
          lesson: {
            connect: { id: lessonId },
          },
          value: Note.id,
          type: "Note",
        },
      });
      return Note;
    },
  });
  t.field("updateNote", {
    type: "Note",
    args: {
      id: stringArg(),
      text: stringArg(),
      type: stringArg(),
      link_clicks: intArg(),
      isSecret: booleanArg(),
      complexity: intArg(),
      horizontal_image: stringArg(),
      vertical_image: stringArg(),
      name: stringArg(),
      instructorName: stringArg(),
      next: arg({
        type: "NextTypeInput", // name should match the name you provided
      }),
    },
    resolve: async (_, args, ctx) => {
      const updates = { ...args };
      delete updates.id;
      return ctx.prisma.note.update({
        data: updates,
        where: {
          id: args.id,
        },
      });
    },
  });
  t.field("deleteNote", {
    type: "Note",
    args: {
      id: stringArg(),
    },
    resolve: async (_, args, ctx) => {
      const where = { id: args.id };
      const note = await ctx.prisma.note.findUnique(
        { where },
        `{ id, user { id } }`
      );
      // const ownsTest = note.userId === ctx.res.req.userId;
      // if (!ownsTest) {
      //   throw new Error("К сожалению, у вас нет полномочий на это.");
      // }
      //3. Delete it
      return ctx.prisma.note.delete({ where });
    },
  });
  t.field("createChat", {
    type: "Chat",
    args: {
      name: stringArg(),
      lessonId: stringArg(),
      type: stringArg(),
      messages: arg({
        type: "MessagesInput",
      }),
    },
    resolve: async (_, args, ctx) => {
      const lessonId = args.lessonId;
      delete args.lessonId;
      const Chat = await ctx.prisma.chat.create({
        data: {
          user: {
            connect: { id: ctx.res.req.userId },
          },
          lesson: {
            connect: { id: lessonId },
          },
          ...args,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              surname: true,
            },
          },
        },
      });
      return Chat;
    },
  });
  t.field("updateChat", {
    type: "Chat",
    args: {
      id: stringArg(),
      name: stringArg(),
      type: stringArg(),
      link_clicks: intArg(),
      isSecret: booleanArg(),
      messages: arg({
        type: "MessagesInput",
      }),
    },
    resolve: async (_, args, ctx) => {
      const id = args.id;
      delete args.id;
      const Chat = await ctx.prisma.chat.update({
        data: {
          ...args,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              surname: true,
            },
          },
        },
        where: {
          id,
        },
      });
      return Chat;
    },
  });
  t.field("deleteChat", {
    type: "Chat",
    args: {
      id: stringArg(),
    },
    resolve: async (_, args, ctx) => {
      const where = { id: args.id };
      const chat = await ctx.prisma.chat.findUnique(
        { where },
        `{ id, user { id } }`
      );
      // const ownsTest = note.userId === ctx.res.req.userId;
      // if (!ownsTest) {
      //   throw new Error("К сожалению, у вас нет полномочий на это.");
      // }
      //3. Delete it
      return ctx.prisma.chat.delete({ where });
    },
  });
  t.field("createChatResult", {
    type: "ChatResult",
    args: {
      chatId: stringArg(),
      lessonId: stringArg(),
      name: stringArg(),
      text: stringArg(),
    },
    resolve: async (_, args, ctx) => {
      const chatId = args.chatId;
      const lessonId = args.lessonId;
      delete args.chatId;
      delete args.lessonId;
      const ChatResult = await ctx.prisma.chatResult.create({
        data: {
          user: {
            connect: {
              id: ctx.res.req.userId
                ? ctx.res.req.userId
                : "clkvdew14837181f13vcbbcw0x",
            },
          },
          chat: {
            connect: { id: chatId },
          },
          lesson: {
            connect: { id: lessonId },
          },
          ...args,
        },
      });
      return ChatResult;
    },
  });
  t.field("createTextEditor", {
    type: "TextEditor",
    args: {
      lessonId: stringArg(),
      text: stringArg(),
      name: stringArg(),
      totalMistakes: intArg(),
      goal: stringArg(),
    },
    resolve: async (_, args, ctx) => {
      const lessonId = args.lessonId;
      delete args.lessonId;
      const TE = await ctx.prisma.textEditor.create({
        data: {
          user: {
            connect: { id: ctx.res.req.userId },
          },
          lesson: {
            connect: { id: lessonId },
          },
          lessonID: lessonId,
          ...args,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              surname: true,
            },
          },
        },
      });
      return TE;
    },
  });
  t.field("updateTextEditor", {
    type: "TextEditor",
    args: {
      id: stringArg(),
      text: stringArg(),
      name: stringArg(),
      totalMistakes: intArg(),
      complexity: intArg(),
      goal: stringArg(),
      context: stringArg(),
    },
    resolve: async (_, args, ctx) => {
      const updates = { ...args };
      delete updates.id;
      return ctx.prisma.textEditor.update({
        data: updates,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              surname: true,
            },
          },
        },
        where: {
          id: args.id,
        },
      });
    },
  });
  t.field("deleteTextEditor", {
    type: "TextEditor",
    args: {
      id: stringArg(),
    },
    resolve: async (_, args, ctx) => {
      const where = { id: args.id };

      const TE = await ctx.prisma.textEditor.findUnique(
        { where },
        `{ id, user { id } }`
      );

      //3. Delete it
      return ctx.prisma.textEditor.delete({ where });
    },
  });
  t.field("createTextEditorResult", {
    type: "TextEditorResult",
    args: {
      lessonId: stringArg(),
      textEditorId: stringArg(),
      attempts: intArg(),
      wrong: stringArg(),
      correct: stringArg(),
      guess: stringArg(),
      type: stringArg(),
      result: booleanArg(),
    },
    resolve: async (_, args, ctx) => {
      const lessonId = args.lessonId;
      const textEditorId = args.textEditorId;
      delete args.lessonId;
      delete args.textEditorId;

      const TextEditorResult = await ctx.prisma.textEditorResult.create({
        data: {
          student: {
            connect: {
              id: ctx.res.req.userId
                ? ctx.res.req.userId
                : "clkvdew14837181f13vcbbcw0x",
            },
          },
          textEditor: {
            connect: { id: textEditorId },
          },
          lesson: {
            connect: { id: lessonId },
          },
          ...args,
        },
      });

      if (args.result === true) {
        const user = await ctx.prisma.user.findUnique(
          {
            where: {
              id: ctx.res.req.userId
                ? ctx.res.req.userId
                : "clkvdew14837181f13vcbbcw0x",
            },
            include: {
              level: true,
            },
          },
          `{ id, level {id, level} }`
        );

        const updateUserLevel = await ctx.prisma.userLevel.update({
          data: {
            level: parseFloat(user.level.level) + 0.25,
          },
          where: {
            id: user.level.id,
          },
        });
      }
      return TextEditorResult;
    },
  });
  t.field("createProblem", {
    type: "Problem",
    args: {
      lessonId: stringArg(),
      name: stringArg(),
      text: stringArg(),
      goal: stringArg(),
      steps: arg({
        type: "ProblemStructureInput",
      }),
    },
    resolve: async (_, args, ctx) => {
      const lessonId = args.lessonId;
      delete args.lessonId;
      const problem = await ctx.prisma.problem.create({
        data: {
          user: {
            connect: { id: ctx.res.req.userId },
          },
          lesson: {
            connect: { id: lessonId },
          },
          lessonID: lessonId,
          name: args.name,
          text: args.text,
          goal: args.goal,
          steps: args.steps,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              surname: true,
            },
          },
        },
      });
      return problem;
    },
  });
  t.field("updateProblem", {
    type: "Problem",
    args: {
      id: stringArg(),
      text: stringArg(),
      steps: arg({
        type: "ProblemStructureInput",
      }),
      complexity: intArg(),
      isSecret: booleanArg(),
      goal: stringArg(),
      name: stringArg(),
      type: stringArg(),
      context: stringArg(),
    },
    resolve: async (_, args, ctx) => {
      const updates = { ...args };
      //remove the ID from updates
      delete updates.id;
      //run the update method
      return ctx.prisma.problem.update({
        data: updates,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              surname: true,
            },
          },
        },
        where: {
          id: args.id,
        },
      });
    },
  });
  t.field("deleteProblem", {
    type: "Problem",
    args: {
      id: stringArg(),
    },
    resolve: async (_, args, ctx) => {
      const where = { id: args.id };

      const C = await ctx.prisma.problem.findUnique(
        { where },
        `{ id, user { id } }`
      );
      // const ownsTest = C.userId === ctx.res.req.userId;
      // if (!ownsTest) {
      //   throw new Error("К сожалению, у вас нет полномочий на это.");
      // }
      //3. Delete it
      return ctx.prisma.problem.delete({ where });
    },
  });
  t.field("createProblemResult", {
    type: "ProblemResult",
    args: {
      answer: stringArg(),
      revealed: list(stringArg()),
      lessonId: stringArg(),
      problemID: stringArg(),
    },
    resolve: async (_, args, ctx) => {
      const lessonId = args.lessonId;
      const problemID = args.problemID;
      const revealed = args.revealed;
      delete args.lessonId;
      delete args.problemID;
      delete args.inputs;
      const ProblemResult = await ctx.prisma.problemResult.create({
        data: {
          student: {
            connect: {
              id: ctx.res.req.userId
                ? ctx.res.req.userId
                : "clkvdew14837181f13vcbbcw0x",
            },
          },
          problem: {
            connect: { id: problemID },
          },
          lesson: {
            connect: { id: lessonId },
          },
          revealed: {
            set: [...revealed],
          },
          ...args,
        },
      });
      return ProblemResult;
    },
  });
  t.field("createShot", {
    type: "Shot",
    args: {
      lessonId: stringArg(),
      name: stringArg(),
      title: stringArg(),
      parts: list(stringArg()),
      comments: list(stringArg()),
    },
    resolve: async (_, args, ctx) => {
      const parts = args.parts;
      const comments = args.comments;
      const lessonId = args.lessonId;
      delete args.parts;
      delete args.comments;
      delete args.lessonId;
      const Shot = await ctx.prisma.shot.create({
        data: {
          user: {
            connect: { id: ctx.res.req.userId },
          },
          lesson: {
            connect: { id: lessonId },
          },
          parts: {
            set: [...parts],
          },
          comments: {
            set: [...comments],
          },
          ...args,
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
      return Shot;
    },
  });
  t.field("updateShot", {
    type: "Shot",
    args: {
      id: stringArg(),
      name: stringArg(),
      parts: list(stringArg()),
      comments: list(stringArg()),
      title: stringArg(),
    },
    resolve: async (_, args, ctx) => {
      const id = args.id;
      const parts = args.parts;
      const comments = args.comments;
      delete args.id;
      delete args.parts;
      delete args.comments;
      return ctx.prisma.shot.update({
        data: {
          parts: {
            set: [...parts],
          },
          comments: {
            set: [...comments],
          },
          ...args,
        },
        where: {
          id,
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
  t.field("deleteShot", {
    type: "Shot",
    args: {
      id: stringArg(),
    },
    resolve: async (_, args, ctx) => {
      const where = { id: args.id };

      const C = await ctx.prisma.shot.findUnique(
        { where },
        `{ id, user { id } }`
      );
      //3. Delete it
      return ctx.prisma.shot.delete({ where });
    },
  });
  t.field("createShotResult", {
    type: "ShotResult",
    args: {
      answer: stringArg(),
      lessonId: stringArg(),
      shotId: stringArg(),
    },
    resolve: async (_, args, ctx) => {
      const shotId = args.shotId;
      const lessonId = args.lessonId;
      delete args.shotId;
      delete args.lessonId;
      const ShotResult = await ctx.prisma.shotResult.create({
        data: {
          student: {
            connect: {
              id: ctx.res.req.userId
                ? ctx.res.req.userId
                : "clkvdew14837181f13vcbbcw0x",
            },
          },
          lesson: {
            connect: { id: lessonId },
          },
          shot: {
            connect: { id: shotId },
          },
          ...args,
        },
      });
      return ShotResult;
    },
  });
  t.field("createDocument", {
    type: "Document",
    args: {
      lessonId: stringArg(),
      title: stringArg(),
      goal: stringArg(),
      name: stringArg(),
    },
    resolve: async (_, args, ctx) => {
      const lessonId = args.lessonId;
      delete args.lessonId;
      const Document = await ctx.prisma.document.create({
        data: {
          user: {
            connect: { id: ctx.res.req.userId },
          },
          lesson: {
            connect: { id: lessonId },
          },
          ...args,
        },
      });
      return Document;
    },
  });
  t.field("deleteDocument", {
    type: "Document",
    args: {
      id: stringArg(),
    },
    resolve: async (_, args, ctx) => {
      const where = { id: args.id };

      const C = await ctx.prisma.document.findUnique(
        { where },
        `{ id, user { id } }`
      );
      const ownsTest = C.userId === ctx.res.req.userId;
      if (!ownsTest) {
        throw new Error("К сожалению, у вас нет полномочий на это.");
      }
      //3. Delete it
      return ctx.prisma.document.delete({ where });
    },
  });
  t.field("createClause", {
    type: "Clause",
    args: {
      title: stringArg(),
      sample: stringArg(),
      keywords: list(stringArg()),
      number: intArg(),
      documentId: stringArg(),
      commentary: stringArg(),
    },
    resolve: async (_, args, ctx) => {
      const documentId = args.documentId;
      delete args.documentId;
      const Clause = await ctx.prisma.clause.create({
        data: {
          user: {
            connect: { id: ctx.res.req.userId },
          },
          document: {
            connect: { id: documentId },
          },
          keywords: {
            set: [...args.keywords],
          },
          commentary: args.commentary,
          sample: args.sample,
          number: args.number,
        },
      });
      return Clause;
    },
  });
  t.field("updateClause", {
    type: "Clause",
    args: {
      id: stringArg(),
      text: stringArg(),
      number: intArg(),
      commentary: stringArg(),
      sample: stringArg(),
      keywords: list(stringArg()),
    },
    resolve: async (_, args, ctx) => {
      const id = args.id;
      //remove the ID from updates
      delete args.id;
      //run the update method
      return ctx.prisma.clause.update({
        data: {
          keywords: {
            set: [...args.keywords],
          },
          commentary: args.commentary,
          sample: args.sample,
          number: args.number,
        },
        where: {
          id,
        },
      });
    },
  });
  t.field("deleteClause", {
    type: "Clause",
    args: {
      id: stringArg(),
    },
    resolve: async (_, args, ctx) => {
      const where = { id: args.id };

      const C = await ctx.prisma.clause.findUnique(
        { where },
        `{ id, user { id } }`
      );
      const ownsTest = C.userId === ctx.res.req.userId;
      if (!ownsTest) {
        throw new Error("К сожалению, у вас нет полномочий на это.");
      }
      //3. Delete it
      return ctx.prisma.clause.delete({ where });
    },
  });
  t.field("createDocumentResult", {
    type: "DocumentResult",
    args: {
      documentId: stringArg(),
      lessonId: stringArg(),
      answers: list(stringArg()),
      drafts: list(stringArg()),
    },
    resolve: async (_, args, ctx) => {
      const documentId = args.documentId;
      delete args.documentId;
      const DocumentResult = await ctx.prisma.documentResult.create({
        data: {
          user: {
            connect: { id: ctx.res.req.userId },
          },
          document: {
            connect: { id: documentId },
          },
          lesson: {
            connect: { id: args.lessonId },
          },
          answers: {
            set: [...args.answers],
          },
          drafts: {
            set: [...args.drafts],
          },
        },
      });
      return DocumentResult;
    },
  });
  t.field("createProcessManager", {
    type: "ProcessManager",
    args: {
      name: stringArg(),
      backgroundStory: stringArg(),
      remainingResources: intArg(),
      lessonId: stringArg(),
      nodes: arg({
        type: "ProcessNodes",
      }),
      edges: arg({
        type: "ProcessEdges",
      }),
    },
    resolve: async (_, args, ctx) => {
      const userId = args.userId;
      delete args.userId;
      const lessonId = args.lessonId;
      delete args.lessonId;

      const processManager = await ctx.prisma.processManager.create({
        data: {
          user: {
            connect: { id: ctx.res.req.userId },
          },
          lesson: {
            connect: { id: lessonId },
          },
          ...args,
        },
      });
      return processManager;
    },
  });
  t.field("updateProcessManager", {
    type: "ProcessManager",
    args: {
      id: stringArg(),
      name: stringArg(),
      backgroundStory: stringArg(),
      remainingResources: intArg(),
      nodes: arg({
        type: "ProcessNodes",
      }),
      edges: arg({
        type: "ProcessEdges",
      }),
    },
    resolve: async (_, args, ctx) => {
      const updates = { ...args };
      delete updates.id;

      return ctx.prisma.processManager.update({
        data: {
          ...updates,
        },
        where: {
          id: args.id,
        },
      });
    },
  });
  t.field("deleteProcessManager", {
    type: "ProcessManager",
    args: {
      id: stringArg(),
    },
    resolve: async (_, args, ctx) => {
      const where = { id: args.id };
      return ctx.prisma.processManager.delete({ where });
    },
  });
  t.field("createConstruction", {
    type: "Construction",
    args: {
      lessonId: stringArg(),
      type: stringArg(),
      name: stringArg(),
      // hint: stringArg(),
      // variants: list(stringArg()),
      // answer: list(stringArg()),
      text: stringArg(),
      hasText: booleanArg(),
      columnsNum: intArg(),
      elements: arg({
        type: "ConstructionElementsListInput",
      }),
    },
    resolve: async (_, args, ctx) => {
      const lessonId = args.lessonId;
      delete args.lessonId;

      const construction = await ctx.prisma.construction.create({
        data: {
          user: {
            connect: { id: ctx.res.req.userId },
          },
          lesson: {
            connect: { id: lessonId },
          },
          type: "equal",
          variants: {
            set: [],
          },
          answer: {
            set: [],
          },
          lessonID: lessonId,
          ...args,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              surname: true,
            },
          },
        },
      });
      return construction;
    },
  });
  t.field("updateConstruction", {
    type: "Construction",
    args: {
      id: stringArg(),
      type: stringArg(),
      name: stringArg(),
      hint: stringArg(),
      variants: list(stringArg()),
      answer: list(stringArg()),
      complexity: intArg(),
      columnsNum: intArg(),
      goal: stringArg(),
      context: stringArg(),
      elements: arg({
        type: "ConstructionElementsListInput",
      }),
    },
    resolve: async (_, args, ctx) => {
      const updates = { ...args };
      delete updates.id;
      return ctx.prisma.construction.update({
        data: {
          ...updates,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              surname: true,
            },
          },
        },
        where: {
          id: args.id,
        },
      });
    },
  });
  t.field("deleteConstruction", {
    type: "Construction",
    args: {
      id: stringArg(),
    },
    resolve: async (_, args, ctx) => {
      const where = { id: args.id };

      const C = await ctx.prisma.construction.findUnique(
        { where },
        `{ id, user { id } }`
      );
      // const ownsTest = C.userId === ctx.res.req.userId;
      // if (!ownsTest) {
      //   throw new Error("К сожалению, у вас нет полномочий на это.");
      // }
      //3. Delete it
      return ctx.prisma.construction.delete({ where });
    },
  });
  t.field("createConstructionResult", {
    type: "ConstructionResult",
    args: {
      answer: stringArg(),
      answers: arg({
        type: "ConstructionElementsListInput",
      }),
      attempts: intArg(),
      constructionId: stringArg(),
      lessonId: stringArg(),
      goal: stringArg(),
      elements: arg({
        type: "ConstructionElementsListInput",
      }),
    },
    resolve: async (_, args, ctx) => {
      const lessonId = args.lessonId;
      const constructionId = args.constructionId;
      const inputs = args.inputs;
      delete args.lessonId;
      delete args.constructionId;
      delete args.inputs;
      const ConstructionResult = await ctx.prisma.constructionResult.create({
        data: {
          student: {
            connect: {
              id: ctx.res.req.userId
                ? ctx.res.req.userId
                : "clkvdew14837181f13vcbbcw0x",
            },
          },
          construction: {
            connect: { id: constructionId },
          },
          lesson: {
            connect: { id: lessonId },
          },
          ...args,
        },
      });

      if (args.result === true) {
        const user = await ctx.prisma.user.findUnique(
          {
            where: {
              id: ctx.res.req.userId
                ? ctx.res.req.userId
                : "clkvdew14837181f13vcbbcw0x",
            },
            include: {
              level: true,
            },
          },
          `{ id, level {id, level} }`
        );
        const updateUserLevel = await ctx.prisma.userLevel.update({
          data: {
            level: user.level.level + 0.25,
          },
          where: {
            id: user.level.id,
          },
        });
      }
      return ConstructionResult;
    },
  });
  t.field("updateConstructionResult", {
    type: "ConstructionResult",
    args: {
      id: stringArg(),
      elements: arg({
        type: "ConstructionElementsListInput",
      }),
    },
    resolve: async (_, args, ctx) => {
      const updates = { ...args };
      delete updates.id;
      const updatedConstructionResult =
        await ctx.prisma.constructionResult.update({
          data: updates,
          where: {
            id: args.id,
          },
        });

      return updatedConstructionResult;
    },
  });
  t.field("createForum", {
    type: "Forum",
    args: {
      lessonId: stringArg(),
      text: stringArg(),
    },
    resolve: async (_, args, ctx) => {
      const lessonId = args.lessonId;
      delete args.lessonId;
      const forum = await ctx.prisma.forum.create({
        data: {
          user: {
            connect: { id: ctx.res.req.userId },
          },
          lesson: {
            connect: { id: lessonId },
          },
          ...args,
        },
      });
      return forum;
    },
  });
  t.field("updateForum", {
    type: "Forum",
    args: {
      id: stringArg(),
      text: stringArg(),
    },
    resolve: async (_, args, ctx) => {
      const updates = { ...args };
      //remove the ID from updates
      delete updates.id;
      //run the update method
      return ctx.prisma.forum.update({
        data: updates,
        where: {
          id: args.id,
        },
      });
    },
  });
  t.field("createMiniForum", {
    type: "MiniForum",
    args: {
      lessonId: stringArg(),
      type: stringArg(),
      value: stringArg(),
    },
    resolve: async (_, args, ctx) => {
      const lessonId = args.lessonId;
      delete args.lessonId;
      const miniforum = await ctx.prisma.miniForum.create({
        data: {
          user: {
            connect: { id: ctx.res.req.userId },
          },
          lesson: {
            connect: { id: lessonId },
          },
          ...args,
        },
      });
      return miniforum;
    },
  });
  t.field("createStatement", {
    type: "Statement",
    args: {
      miniforumId: stringArg(),
      forumId: stringArg(),
      text: stringArg(),
    },
    resolve: async (_, args, ctx) => {
      const forumId = args.forumId;
      delete args.forumId;
      const miniforumId = args.miniforumId;
      delete args.miniforumId;
      let statement;
      if (forumId) {
        const author = await ctx.prisma.user.findMany({
          where: { forum: { some: { id: { equals: forumId } } } },
        });
        const lesson = await ctx.prisma.lesson.findMany(
          {
            where: { forumId: forumId },
            include: { coursePage: true },
          },
          `{id, coursePage {id, title}, name}`
        );
        const newMail = await client.sendEmail({
          From: "Mikhail@besavvy.app",
          To: author[0].email,
          Subject: "Новое сообщение на форуме",
          Tag: "internal_info_email",
          HtmlBody: AuthorNotification(
            lesson[0].name,
            lesson[0].coursePage.title,
            lesson[0].id,
            args.text
          ),
        });
        // if (author[0].email.toLowerCase() !== "mi.kochkin@ya.ru") {
        //   const newMail2 = await client.sendEmail({
        //     From: "Mikhail@besavvy.app",
        //     To: "mi.kochkin@ya.ru",
        //     Subject: "(Другой автор) Новое сообщение на форуме",
        //     HtmlBody: AuthorNotification(
        //       lesson[0].name,
        //       lesson[0].coursePage.title,
        //       lesson[0].id
        //     ),
        //   });
        // }
        statement = await ctx.prisma.statement.create({
          data: {
            user: {
              connect: { id: ctx.res.req.userId },
            },
            forum: {
              connect: { id: forumId },
            },
            ...args,
          },
        });
      } else if (miniforumId) {
        statement = await ctx.prisma.statement.create({
          data: {
            user: {
              connect: { id: ctx.res.req.userId },
            },
            miniforum: {
              connect: { id: miniforumId },
            },
            ...args,
          },
        });
      }

      return statement;
    },
  });
  t.field("createMiniStatement", {
    type: "Statement",
    args: {
      miniforumId: stringArg(),
      text: stringArg(),
    },
    resolve: async (_, args, ctx) => {
      const miniforumId = args.miniforumId;
      delete args.miniforumId;
      const author = await ctx.prisma.user.findMany({
        where: { forum: { some: { id: { equals: forumId } } } },
      });
      // const lesson = await ctx.prisma.lesson.findMany(
      //   {
      //     where: { forumId: forumId },
      //     include: { coursePage: true },
      //   },
      //   `{id, coursePage {id, title}, name}`
      // );
      // const newMail = await client.sendEmail({
      //   From: "Mikhail@besavvy.app",
      //   To: author[0].email,
      //   Subject: "Новое сообщение на форуме",
      //   HtmlBody: AuthorNotification(
      //     lesson[0].name,
      //     lesson[0].coursePage.title,
      //     lesson[0].id
      //   ),
      // });
      // if (author[0].email.toLowerCase() !== "mi.kochkin@ya.ru") {
      //   const newMail2 = await client.sendEmail({
      //     From: "Mikhail@besavvy.app",
      //     To: "mi.kochkin@ya.ru",
      //     Subject: "(Другой автор) Новое сообщение на форуме",
      //     HtmlBody: AuthorNotification(
      //       lesson[0].name,
      //       lesson[0].coursePage.title,
      //       lesson[0].id
      //     ),
      //   });
      // }
      const statement = await ctx.prisma.statement.create({
        data: {
          user: {
            connect: { id: ctx.res.req.userId },
          },
          miniforum: {
            connect: { id: miniforumId },
          },
          ...args,
        },
      });
      return statement;
    },
  });
  t.field("updateStatement", {
    type: "Statement",
    args: {
      id: stringArg(),
      comments: list(stringArg()),
    },
    resolve: async (_, args, ctx) => {
      const updates = { ...args };
      //remove the ID from updates
      delete updates.id;
      //run the update method
      const statement = await ctx.prisma.statement.findUnique({
        where: { id: args.id },
      });

      const student = await ctx.prisma.user.findUnique({
        where: { id: statement.userId },
      });

      const lesson = await ctx.prisma.lesson.findUnique({
        where: { forumId: statement.forumId },
      });
      const commentEmail = await client.sendEmail({
        From: "Mikhail@besavvy.app",
        To: student.email,
        Subject: "BeSavvy: ответили на ваш вопрос",
        Tag: "lesson_info_email",
        HtmlBody: CommentEmail.CommentEmail(
          student.name,
          lesson.name,
          lesson.id,
          statement.text,
          args.comments.join(", ")
        ),
      });
      return ctx.prisma.statement.update({
        data: {
          comments: {
            set: [...args.comments],
          },
        },
        where: {
          id: args.id,
        },
      });
    },
  });
  t.field("updateMiniStatement", {
    type: "Statement",
    args: {
      id: stringArg(),
      comments: list(stringArg()),
    },
    resolve: async (_, args, ctx) => {
      const updates = { ...args };
      //remove the ID from updates
      delete updates.id;
      //run the update method

      const statement = await ctx.prisma.statement.findUnique({
        where: { id: args.id },
      });

      // const student = await ctx.prisma.user.findUnique({
      //   where: { id: statement.userId },
      // });

      // const lesson = await ctx.prisma.lesson.findUnique({
      //   where: { forumId: statement.forumId },
      // });

      // const commentEmail = await client.sendEmail({
      //   From: "Mikhail@besavvy.app",
      //   To: student.email,
      //   Subject: "BeSavvy: ответ на комментарий по курсу",
      //   HtmlBody: CommentEmail.CommentEmail(
      //     student.name,
      //     lesson.name,
      //     lesson.id
      //   ),
      // });
      return ctx.prisma.statement.update({
        data: {
          comments: {
            set: [...args.comments],
          },
        },
        where: {
          id: args.id,
        },
      });
    },
  });
  t.field("updateStatementChecked", {
    type: "Statement",
    args: {
      id: stringArg(),
      answered: booleanArg(),
    },
    resolve: async (_, args, ctx) => {
      const updates = { ...args };
      //remove the ID from updates
      delete updates.id;
      //run the update method

      return ctx.prisma.statement.update({
        data: {
          answered: args.answered,
        },
        where: {
          id: args.id,
        },
      });
    },
  });
  t.field("deleteStatement", {
    type: "Statement",
    args: {
      id: stringArg(),
    },
    resolve: async (_, args, ctx) => {
      const where = { id: args.id };

      const C = await ctx.prisma.statement.findUnique(
        { where },
        `{ id, user { id } }`
      );
      // const ownsTest = C.userId === ctx.res.req.userId;
      // if (!ownsTest) {
      //   throw new Error("К сожалению, у вас нет полномочий на это.");
      // }
      //3. Delete it
      return ctx.prisma.statement.delete({ where });
    },
  });
  t.field("createRating", {
    type: "Rating",
    args: {
      forumId: stringArg(),
      rating: intArg(),
    },
    resolve: async (_, args, ctx) => {
      const forumId = args.forumId;
      delete args.forumId;
      const rating = await ctx.prisma.rating.create({
        data: {
          user: {
            connect: { id: ctx.res.req.userId },
          },
          forum: {
            connect: { id: forumId },
          },
          ...args,
        },
      });
      return rating;
    },
  });
  t.field("updateRating", {
    type: "Rating",
    args: {
      id: stringArg(),
      rating: intArg(),
    },
    resolve: async (_, args, ctx) => {
      const updates = { ...args };
      //remove the ID from updates
      delete updates.id;
      //run the update method
      return ctx.prisma.rating.update({
        data: updates,
        where: {
          id: args.id,
        },
      });
    },
  });
}

module.exports = { exercisesMutations };
