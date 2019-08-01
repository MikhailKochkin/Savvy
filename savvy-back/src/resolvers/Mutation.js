const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const postmark = require("postmark");
const { randomBytes } = require("crypto");
const { promisify } = require("util");
const { hasPermission } = require("../utils");
const yandex = require("../yandexCheckout");

const client = new postmark.ServerClient(process.env.MAIL_TOKEN);
const makeANiceEmail = text => `
  <div className="email" style="
    padding: 20px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 20px;
  ">
    <h2>Привет!</h2>
    <p>Приятно познакомиться!</p>
    <p>${text}</p>
    <p>Основатель Savvy,Михаил Кочкин</p>
  </div>
`;

const Mutations = {
  async updateUser(parent, args, ctx, info) {
    //run the update method
    const updates = { ...args };
    const id = args.careerTrackID;
    const visitedLessons = args.visitedLessons;
    //remove the ID from updates
    delete updates.id;
    delete updates.args;
    //run the update method
    const updatedUser = await ctx.db.mutation.updateUser(
      {
        where: {
          id: args.id
        },
        data: {
          careerTrack: {
            connect: { id }
          },
          ...updates
        }
      },
      info
    );
    return updatedUser;
  },
  async requestReset(parent, args, ctx, info) {
    // 1. Check if this is a real user
    const user = await ctx.db.query.user({ where: { email: args.email } });
    if (!user) {
      throw new Error(`Нет пользователя с электронной почтой: ${args.email}`);
    }
    // 2. Set a reset token and expiry on that user
    const randomBytesPromiseified = promisify(randomBytes);
    const resetToken = (await randomBytesPromiseified(20)).toString("hex");
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now
    const res = await ctx.db.mutation.updateUser({
      where: { email: args.email },
      data: { resetToken, resetTokenExpiry }
    });
    // 3. Email them that reset token
    const mailRes = await client
      .sendEmail({
        From: "Mikhail@savvvy.app",
        To: user.email,
        Subject: "Смена пароля",
        HtmlBody: makeANiceEmail(`Вот твой токен для смены пароля
          \n\n
          <a href="${
            process.env.FRONTEND_URL2
          }/reset?resetToken=${resetToken}">Нажми сюда, чтобы сменить пароль!</a>`)
      })
      .then(response => {
        // console.log("Sending message");
        // console.log(response.To);
        // console.log(response.Message);
      });
    // 4. Return the message
    return { message: "Спасибо!" };
  },
  async resetPassword(parent, args, ctx, info) {
    // 1. check if the passwords match
    if (args.password !== args.confirmPassword) {
      throw new Error("Пароли не совпадают!");
    }
    // 2. check if its a legit reset token
    // 3. Check if its expired
    const [user] = await ctx.db.query.users({
      where: {
        resetToken: args.resetToken,
        resetTokenExpiry_gte: Date.now() - 3600000
      }
    });
    if (!user) {
      throw new Error("Это неправильный или устаревший токен!");
    }
    // 4. Hash their new password
    const password = await bcrypt.hash(args.password, 10);
    // 5. Save the new password to the user and remove old resetToken fields
    const updatedUser = await ctx.db.mutation.updateUser({
      where: { email: user.email },
      data: {
        password,
        resetToken: null,
        resetTokenExpiry: null
      }
    });
    // 6. Generate JWT
    const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET);
    // 7. Set the JWT cookie
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });
    // 8. return the new user
    return updatedUser;
  },
  async createCoursePage(parent, args, ctx, info) {
    // TODO: Check if they are logged in
    uniID = args.uniID;
    delete args.uniID;
    if (!ctx.request.userId) {
      throw new Error(
        "Вы должны быть зарегистрированы на сайте, чтобы делать это!"
      );
    }
    const coursePage = await ctx.db.mutation.createCoursePage(
      {
        data: {
          user: {
            connect: {
              id: ctx.request.userId
            }
          },
          uni: {
            connect: {
              id: uniID
            }
          },
          ...args
        }
      },
      info
    );
    return coursePage;
  },
  async updateUni(parent, args, ctx, info) {
    //run the update method
    // console.log(args);
    const updates = { ...args };
    const id = args.id;
    //remove the ID from updates
    delete updates.id;
    delete updates.args;
    //run the update method
    const updatedUni = await ctx.db.mutation.updateUni(
      {
        where: {
          id: args.id
        },
        data: {
          ...updates
        }
      },
      info
    );
    return updatedUni;
  },
  async createPointA(parent, args, ctx, info) {
    // TODO: Check if they are logged in
    const coursePageID = args.coursePageID;
    delete args.id;
    // console.log(ctx.request.userId)
    // console.log(coursePagedID)
    if (!ctx.request.userId) {
      throw new Error(
        "Вы должны быть зарегистрированы на сайте, чтобы делать это!"
      );
    }
    const PointA = await ctx.db.mutation.createPointA(
      {
        data: {
          user: {
            connect: { id: ctx.request.userId }
          },
          coursePage: {
            connect: { id: coursePageID }
          },
          ...args
        }
      },
      info
    );
    return PointA;
  },
  async updatePointA(parent, args, ctx, info) {
    //first take a copy of the updates
    const updates = { ...args };
    //remove the ID from updates
    delete updates.id;
    //run the update method
    return ctx.db.mutation.updatePointA(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  },
  async createTextEditor(parent, args, ctx, info) {
    // TODO: Check if they are logged in
    const lessonID = args.lessonID;
    delete args.id;
    // console.log(ctx.request.userId)
    // console.log(coursePagedID)
    // if (!ctx.request.userId) {
    //   throw new Error('Вы должны быть зарегистрированы на сайте, чтобы делать это!')
    // }

    const TextEditor = await ctx.db.mutation.createTextEditor(
      {
        data: {
          user: {
            connect: { id: ctx.request.userId }
          },
          lesson: {
            connect: { id: lessonID }
          },
          ...args
        }
      },
      info
    );
    return TextEditor;
  },
  async deleteTextEditor(parent, args, ctx, info) {
    const where = { id: args.id };
    //1. find the lesson
    const textEditor = await ctx.db.query.textEditor({ where }, `{ id }`);
    //3. Delete it
    return ctx.db.mutation.deleteTextEditor({ where }, info);
  },
  async createSandboxPage(parent, args, ctx, info) {
    // TODO: Check if they are logged in
    if (!ctx.request.userId) {
      throw new Error(
        "Вы должны быть зарегистрированы на сайте, чтобы делать это!"
      );
    }
    const sandboxPage = await ctx.db.mutation.createSandboxPage(
      {
        data: {
          user: {
            connect: {
              id: ctx.request.userId
            }
          },
          ...args
        }
      },
      info
    );
    return sandboxPage;
  },
  updateSandboxPage(parent, args, ctx, info) {
    //first take a copy of the updates
    const updates = { ...args };
    //remove the ID from updates
    delete updates.id;
    //run the update method
    return ctx.db.mutation.updateSandboxPage(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  },
  updateCoursePage(parent, args, ctx, info) {
    //first take a copy of the updates
    const updates = { ...args };
    //remove the ID from updates
    delete updates.id;
    //run the update method
    return ctx.db.mutation.updateCoursePage(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  },
  async deleteSandboxPage(parent, args, ctx, info) {
    const where = { id: args.id };
    //1. find the case
    const sandboxPage = await ctx.db.query.sandboxPage(
      { where },
      `{ id title user { id }}`
    );
    //2. check if they own the case or have the permissions
    const ownsSandboxPage = sandboxPage.user.id === ctx.request.userId;
    if (!ownsSandboxPage) {
      throw new Error("К сожалению, у вас нет полномочий на это.");
    }
    //3. Delete it
    return ctx.db.mutation.deleteSandboxPage({ where }, info);
  },
  async deleteCoursePage(parent, args, ctx, info) {
    const where = { id: args.id };
    //1. find the case
    const coursePage = await ctx.db.query.coursePage(
      { where },
      `{ id title user { id }}`
    );
    //2. check if they own the case or have the permissions
    const ownscoursePage = coursePage.user.id === ctx.request.userId;
    if (!ownscoursePage) {
      throw new Error("К сожалению, у вас нет полномочий на это.");
    }
    //3. Delete it
    return ctx.db.mutation.deleteCoursePage({ where }, info);
  },
  async createLesson(parent, args, ctx, info) {
    // TODO: Check if they are logged in
    const coursePageID = args.coursePageID;
    delete args.id;
    // console.log(ctx.request.userId)
    // console.log(coursePagedID)
    if (!ctx.request.userId) {
      throw new Error(
        "Вы должны быть зарегистрированы на сайте, чтобы делать это!"
      );
    }

    const Lesson = await ctx.db.mutation.createLesson(
      {
        data: {
          user: {
            connect: { id: ctx.request.userId }
          },
          coursePage: {
            connect: { id: coursePageID }
          },
          ...args
        }
      },
      info
    );
    return Lesson;
  },
  async updateLesson(parent, args, ctx, info) {
    //first take a copy of the updates
    const updates = { ...args };
    //remove the ID from updates
    delete updates.id;
    //run the update method
    return ctx.db.mutation.updateLesson(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  },
  async updatePublished(parent, args, ctx, info) {
    const updates = { ...args };
    delete updates.id;
    //run the update method
    const published = await ctx.db.mutation.updateLesson(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );

    return published;
  },
  async deleteLesson(parent, args, ctx, info) {
    const where = { id: args.id };
    //1. find the lesson
    const lesson = await ctx.db.query.lesson({ where }, `{ id }`);
    //3. Delete it
    return ctx.db.mutation.deleteLesson({ where }, info);
  },
  async createTest(parent, args, ctx, info) {
    // TODO: Check if they are logged in
    const lessonID = args.lessonID;
    delete args.id;
    // console.log(ctx.request.userId)
    // console.log(coursePagedID)
    if (!ctx.request.userId) {
      throw new Error(
        "Вы должны быть зарегистрированы на сайте, чтобы делать это!"
      );
    }

    const test = await ctx.db.mutation.createTest(
      {
        data: {
          user: {
            connect: { id: ctx.request.userId }
          },
          lesson: {
            connect: { id: lessonID }
          },
          ...args
        }
      },
      info
    );
    return test;
  },
  async createNewTest(parent, args, ctx, info) {
    const lessonID = args.lessonID;
    const answers = args.answers;
    const correct = args.correct;
    const question = args.question;

    if (!ctx.request.userId) {
      throw new Error(
        "Вы должны быть зарегистрированы на сайте, чтобы делать это!"
      );
    }

    const data = {
      user: {
        connect: { id: ctx.request.userId }
      },
      lesson: {
        connect: { id: lessonID }
      },
      answers: {
        set: [...answers]
      },
      correct: {
        set: [...correct]
      },
      question: {
        set: [...question]
      }
    };

    const test = await ctx.db.mutation.createNewTest({ data }, info);
    // .then(console.log(data));
    return test;
  },
  async createTestResult(parent, args, ctx, info) {
    // TODO: Check if they are logged in
    const lessonID = args.lessonID;
    // console.log(ctx.request.userId)
    // console.log(coursePagedID)
    if (!ctx.request.userId) {
      throw new Error(
        "Вы должны быть зарегистрированы на сайте, чтобы делать это!"
      );
    }
    const TestResult = await ctx.db.mutation.createTestResult(
      {
        data: {
          student: {
            connect: { id: ctx.request.userId }
          },
          lesson: {
            connect: { id: lessonID }
          },
          ...args
        }
      },
      info
    );
    return TestResult;
  },
  async createLessonResult(parent, args, ctx, info) {
    // console.log(args);
    // console.log(ctx.request.userId);
    const lessonID = args.lessonID;
    if (!ctx.request.userId) {
      throw new Error(
        "Вы должны быть зарегистрированы на сайте, чтобы делать это!"
      );
    }
    const LessonResult = await ctx.db.mutation.createLessonResult(
      {
        data: {
          student: {
            connect: { id: ctx.request.userId }
          },
          lesson: {
            connect: { id: lessonID }
          },
          ...args
        }
      },
      info
    );
    return LessonResult;
  },
  async updateLessonResult(parent, args, ctx, info) {
    // console.log(args);
    // console.log(ctx.request.userId);
    const updates = { ...args };
    delete updates.id;
    //run the update method
    const updatedLessonResult = await ctx.db.mutation.updateLessonResult(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
    return updatedLessonResult;
  },
  async createTestResult(parent, args, ctx, info) {
    // TODO: Check if they are logged in
    const lessonID = args.lessonID;
    // console.log(ctx.request.userId)
    // console.log(coursePagedID)
    if (!ctx.request.userId) {
      throw new Error(
        "Вы должны быть зарегистрированы на сайте, чтобы делать это!"
      );
    }
    const TestResult = await ctx.db.mutation.createTestResult(
      {
        data: {
          student: {
            connect: { id: ctx.request.userId }
          },
          lesson: {
            connect: { id: lessonID }
          },
          ...args
        }
      },
      info
    );
    return TestResult;
  },
  async createQuizResult(parent, args, ctx, info) {
    // TODO: Check if they are logged in
    const lessonID = args.lessonID;
    if (!ctx.request.userId) {
      throw new Error(
        "Вы должны быть зарегистрированы на сайте, чтобы делать это!"
      );
    }
    const QuizResult = await ctx.db.mutation.createQuizResult(
      {
        data: {
          student: {
            connect: { id: ctx.request.userId }
          },
          lesson: {
            connect: { id: lessonID }
          },
          ...args
        }
      },
      info
    );
    return QuizResult;
  },
  async createProblemResult(parent, args, ctx, info) {
    // TODO: Check if they are logged in
    const lessonID = args.lessonID;
    const problemID = args.problemID;
    const revealed = args.revealed;
    delete args.revealed;
    if (!ctx.request.userId) {
      throw new Error(
        "Вы должны быть зарегистрированы на сайте, чтобы делать это!"
      );
    }
    const ProblemResult = await ctx.db.mutation.createProblemResult(
      {
        data: {
          student: {
            connect: { id: ctx.request.userId }
          },
          problem: {
            connect: { id: problemID }
          },
          lesson: {
            connect: { id: lessonID }
          },
          revealed: {
            set: [...revealed]
          },
          ...args
        }
      },
      info
    );
    return ProblemResult;
  },
  async createTextEditorResult(parent, args, ctx, info) {
    // console.log(args);
    // TODO: Check if they are logged in
    const lessonID = args.lessonID;
    const textEditorID = args.textEditorID;
    const revealed = args.revealed;
    delete args.revealed;
    if (!ctx.request.userId) {
      throw new Error(
        "Вы должны быть зарегистрированы на сайте, чтобы делать это!"
      );
    }
    const TextEditorResult = await ctx.db.mutation.createTextEditorResult(
      {
        data: {
          student: {
            connect: { id: ctx.request.userId }
          },
          textEditor: {
            connect: { id: textEditorID }
          },
          lesson: {
            connect: { id: lessonID }
          },
          revealed: {
            set: [...revealed]
          },
          ...args
        }
      },
      info
    );
    return TextEditorResult;
  },
  async createQuiz(parent, args, ctx, info) {
    // TODO: Check if they are logged in
    const lessonID = args.lessonID;
    delete args.id;
    // console.log(ctx.request.userId)
    // console.log(coursePagedID)
    if (!ctx.request.userId) {
      throw new Error(
        "Вы должны быть зарегистрированы на сайте, чтобы делать это!"
      );
    }

    const Quiz = await ctx.db.mutation.createQuiz(
      {
        data: {
          user: {
            connect: { id: ctx.request.userId }
          },
          lesson: {
            connect: { id: lessonID }
          },
          ...args
        }
      },
      info
    );
    return Quiz;
  },
  async createPointATest(parent, args, ctx, info) {
    // TODO: Check if they are logged in
    const coursePageID = args.coursePageID;
    delete args.id;
    // console.log(ctx.request.userId)
    // console.log(coursePagedID)
    if (!ctx.request.userId) {
      throw new Error(
        "Вы должны быть зарегистрированы на сайте, чтобы делать это!"
      );
    }

    const pointATest = await ctx.db.mutation.createPointATest(
      {
        data: {
          user: {
            connect: { id: ctx.request.userId }
          },
          coursePage: {
            connect: { id: coursePageID }
          },
          ...args
        }
      },
      info
    );
    return pointATest;
  },

  async deleteNewTest(parent, args, ctx, info) {
    const where = { id: args.id };
    //1. find the lesson
    const test = await ctx.db.query.newTest({ where }, `{ id }`);
    //3. Delete it
    return ctx.db.mutation.deleteNewTest({ where }, info);
  },
  async deletePointATest(parent, args, ctx, info) {
    const where = { id: args.id };
    //1. find the lesson
    const pointATest = await ctx.db.query.pointATest({ where }, `{ id }`);
    //3. Delete it
    return ctx.db.mutation.deletePointATest({ where }, info);
  },
  async createProblem(parent, args, ctx, info) {
    // TODO: Check if they are logged in
    const lessonID = args.lessonID;
    delete args.id;
    // const solutions = args.solution;
    // delete args.solution
    // const hints = args.hints;
    // delete args.hints
    // console.log(ctx.request.userId)
    // console.log(coursePagedID)
    if (!ctx.request.userId) {
      throw new Error(
        "Вы должны быть зарегистрированы на сайте, чтобы делать это!"
      );
    }
    const problem = await ctx.db.mutation.createProblem(
      {
        data: {
          user: {
            connect: { id: ctx.request.userId }
          },
          lesson: {
            connect: { id: lessonID }
          },
          // solution: {
          //   set: [...solutions]
          // },
          // hints: {
          //   set: [...hints]
          // },
          ...args
        }
      },
      info
    );
    return problem;
  },
  async deleteProblem(parent, args, ctx, info) {
    const where = { id: args.id };
    //1. find the lesson
    const problem = await ctx.db.query.problem({ where }, `{ id }`);
    //3. Delete it
    return ctx.db.mutation.deleteProblem({ where }, info);
  },
  async createConstruction(parent, args, ctx, info) {
    // TODO: Check if they are logged in
    const lessonID = args.lessonID;
    delete args.id;
    // console.log(ctx.request.userId)
    // console.log(coursePagedID)
    if (!ctx.request.userId) {
      throw new Error(
        "Вы должны быть зарегистрированы на сайте, чтобы делать это!"
      );
    }
    const construction = await ctx.db.mutation.createConstruction(
      {
        data: {
          user: {
            connect: { id: ctx.request.userId }
          },
          lesson: {
            connect: { id: lessonID }
          },
          ...args
        }
      },
      info
    );
    return construction;
  },
  async deleteConstruction(parent, args, ctx, info) {
    const where = { id: args.id };
    //1. find the lesson
    const construction = await ctx.db.query.construction({ where }, `{ id }`);
    //3. Delete it
    return ctx.db.mutation.deleteConstruction({ where }, info);
  },
  async createApplication(parent, args, ctx, info) {
    // TODO: Check if they are logged in
    const coursePageID = args.coursePageID;
    delete args.id;
    if (!ctx.request.userId) {
      throw new Error(
        "Вы должны быть зарегистрированы на сайте, чтобы делать это!"
      );
    }
    const application = await ctx.db.mutation.createApplication(
      {
        data: {
          coursePage: {
            connect: { id: coursePageID }
          },
          ...args
        }
      },
      info
    );
    return application;
  },
  async deleteApplication(parent, args, ctx, info) {
    const where = { id: args.id };
    //1. find the case
    const application = await ctx.db.query.application({ where }, `{ id }`);
    //3. Delete it
    return ctx.db.mutation.deleteApplication({ where }, info);
  },
  async createSandbox(parent, args, ctx, info) {
    // TODO: Check if they are logged in
    const sandboxPageID = args.sandboxPageID;
    delete args.id;
    // console.log(ctx.request.userId)
    // console.log(sandboxPageID)
    if (!ctx.request.userId) {
      throw new Error(
        "Вы должны быть зарегистрированы на сайте, чтобы делать это!"
      );
    }

    const sandbox = await ctx.db.mutation.createSandbox(
      {
        data: {
          user: {
            connect: { id: ctx.request.userId }
          },
          sandboxPage: {
            connect: { id: sandboxPageID }
          },
          ...args
        }
      },
      info
    );
    return sandbox;
  },
  async deleteSandbox(parent, args, ctx, info) {
    const where = { id: args.id };
    //1. find the case
    const sandbox = await ctx.db.query.sandbox({ where }, `{ id user { id }}`);
    //2. check if they own the case or have the permissions
    const ownsSandbox = sandbox.user.id === ctx.request.userId;
    if (!ownsSandbox) {
      throw new Error("К сожалению, у вас нет полномочий на это.");
    }
    //3. Delete it
    return ctx.db.mutation.deleteSandbox({ where }, info);
  },
  async createSandboxPageGoal(parent, args, ctx, info) {
    // TODO: Check if they are logged in
    const sandboxPageID = args.sandboxPageID;
    delete args.id;
    // console.log(ctx.request.userId)
    // console.log(sandboxPageID)
    if (!ctx.request.userId) {
      throw new Error(
        "Вы должны быть зарегистрированы на сайте, чтобы делать это!"
      );
    }
    const sandboxPageGoal = await ctx.db.mutation.createSandboxPageGoal(
      {
        data: {
          user: {
            connect: { id: ctx.request.userId }
          },
          sandboxPage: {
            connect: { id: sandboxPageID }
          },
          ...args
        }
      },
      info
    );
    return sandboxPageGoal;
  },
  async likePost(parent, args, ctx, info) {
    const updates = { ...args };
    delete updates.id;
    //run the update method
    const like = await ctx.db.mutation.updateSandbox(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
    return like;
  },
  async addToFavourites(parent, args, ctx, info) {
    //run the update method
    const updatedUser = await ctx.db.mutation.updateUser(
      {
        data: {
          favourites: {
            set: [...args.favourites]
          }
        },
        where: {
          id: args.id
        }
      },
      info
    );
    return updatedUser;
  },
  async enrollOnCourse(parent, args, ctx, info) {
    // console.log("ctx.request.userId");
    // console.log(args);
    //run the update method
    const enrolledUser = await ctx.db.mutation.updateUser(
      {
        data: {
          subjects: {
            set: [...args.subjects]
          },
          new_subjects: {
            connect: { id: args.coursePageID }
          }
        },
        where: {
          id: args.id
        }
      },
      info
    );
    return enrolledUser;
  },
  async addUserToCoursePage(parent, args, ctx, info) {
    //run the update method
    const updatedCoursePage = await ctx.db.mutation.updateCoursePage(
      {
        data: {
          students: {
            set: [...args.students]
          },
          new_students: {
            connect: { id: ctx.request.userId }
          }
        },
        where: {
          id: args.id
        }
      },
      info
    );
    return updatedCoursePage;
  },
  async deleteCoursePage(parent, args, ctx, info) {
    const where = { id: args.id };
    // console.log(where)
    //1. find the case
    const coursePage = await ctx.db.query.coursePage(
      { where },
      `{ id title user { id }}`
    );
    // console.log(coursePage)
    //2. check if they own the case or have the permissions
    //TODO
    const ownsCoursePage = coursePage.user.id === ctx.request.userId;
    const hasPermissions = ctx.request.user.permissions.some(permission =>
      ["ADMIN", "CASEDELETE"].includes(permission)
    );
    if (!ownsCoursePage && !hasPermissions) {
      throw new Error(
        "Вы должны быть зарегистрированы на сайте, чтобы делать это!"
      );
    }
    //3. Delete it
    return ctx.db.mutation.deleteCoursePage({ where }, info);
  },
  async signup(parent, args, ctx, info) {
    // lower the email
    // console.log(args);
    args.email = args.email.toLowerCase();
    const uniID = args.uniID;
    // hash the password
    const password = await bcrypt.hash(args.password, 10);
    //create the user
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permissions: { set: ["USER"] },
          uni: {
            connect: { id: uniID }
          }
        }
      },
      info
    );
    //create the JWT token for them
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // we set the jwt as a cookie on the response
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
    });
    // return the user to the browser
    return user;
  },
  async signin(parent, { email, password }, ctx, info) {
    // 1. check if there is a user with that email
    const user = await ctx.db.query.user({ where: { email } });
    if (!user) {
      throw new Error(`No such user found for email ${email}`);
    }
    // 2. Check if their password is correct
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error("Invalid Password!");
    }
    // 3. generate the JWT Token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // 4. Set the cookie with the token
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });
    // 5. Return the user
    return user;
  },
  signout(parent, args, ctx, info) {
    ctx.response.clearCookie("token");
    return { message: "Goodbye!" };
  },
  async updatePermissions(parent, args, ctx, info) {
    // 1. check if they are logged in
    if (!ctx.request.userId) {
      throw new Error("Please log in!");
    }
    // 2. Query the current user
    const currentUser = await ctx.db.query.user(
      {
        where: {
          id: ctx.request.userId
        }
      },
      info
    );
    // 3.Check if they have permissions to do it
    hasPermission(currentUser, ["ADMIN", "PERMISSIONUPDATE"]);
    // 4. Update the permissions
    return ctx.db.mutation.updateUser(
      {
        data: {
          permissions: {
            //special prisma syntax for enum
            set: args.permissions
          }
        },
        where: {
          id: args.userId
        }
      },
      info
    );
  },
  async createOrder(parent, args, ctx, info) {
    // 1. TODO: Check if they are logged in
    // const idempotenceKey = '3ww8c4329-a6849-rt9219db-891e-f24532we10d29r7qd211';
    if (!ctx.request.userId) {
      throw new Error(
        "Вы должны быть зарегистрированы на сайте, чтобы делать это!"
      );
    }
    // console.log(args)
    // 2. Create yandex payment
    // Убрали ключ идемпотентности, теперь он генерируется Яндексом самостоятельно
    // и не влияет на повоторные покурки внутри приложения.
    const result = await yandex.createPayment({
      amount: {
        value: args.price,
        currency: "RUB"
      },
      payment_method_data: {
        type: "bank_card"
      },
      confirmation: {
        type: "redirect",
        return_url: "https://www.savvvy.app/"
      },
      capture: true
    });
    // console.log(result.id);
    // console.log(result.confirmation);
    // console.log(result);
    const paymentId = result.id;

    // это кстати тоже можно убрать из продакшана
    // yandex.getPayment(paymentId)
    //   .then(function(result) {
    //     console.log({payment: result});
    // })
    //   .catch(function(err) {
    //     console.error(err);
    // })

    const order = await ctx.db.mutation.createOrder({
      data: {
        coursePageID: args.coursePageID,
        price: args.price,
        paymentId: paymentId,
        userID: args.userID,
        user: {
          connect: { id: ctx.request.userId }
        },
        coursePage: {
          connect: { id: args.coursePageID }
        }
      },
      info
    });
    ctx.response.cookie("url", result.confirmation.confirmation_url, {
      domain: ".savvvy.app",
      httpOnly: false
    });
    return order;
  },
  async deleteOrder(parent, args, ctx, info) {
    const where = { id: args.id };
    //1. find the lesson
    const order = await ctx.db.query.order({ where }, `{ id }`);
    //3. Delete it
    return ctx.db.mutation.deleteOrder({ where }, info);
  }
};

module.exports = Mutations;
