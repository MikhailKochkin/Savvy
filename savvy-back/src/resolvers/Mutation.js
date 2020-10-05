const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const postmark = require("postmark");
const { randomBytes } = require("crypto");
const { promisify } = require("util");
const { hasPermission } = require("../utils");
const yandex = require("../yandexCheckout");
const WelcomeEmail = require("../emails/Welcome");
const PurchaseEmail = require("../emails/Purchase");
const ReminderEmail = require("../emails/Reminder");
const FinishEmail = require("../emails/Finish");
const NextWeekEmail = require("../emails/nextWeek");

const client = new postmark.ServerClient(process.env.MAIL_TOKEN);
const makeANiceEmail = (text) => `
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

const newFeedbackNotification = (name, title, id, lesson) => `
  <div className="email" style="
    padding: 20px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 20px;
  ">
  <h4>${name}, добрый день!</h4>
  <p>Преподаватель по курсу "${title}" оставил обратную связь по уроку "${lesson}" </p>
  <p>Посмотрите, что написал преподаватель, <a href="https://besavvy.app/coursePage?id=${id}">по этой ссылке</a> в разделе "Обратная связь".</p>
  </div>
`;

const newOrderEmail = (client, surname, email, course, price) => `
  <div className="email" style="
    padding: 20px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 20px;
  ">
    <h2>Привет!</h2>
    <p>${client} ${surname} оформил новый заказ.</p>
    <p> Имейл: ${email} </p>
    <p>Курс – ${course}, цена – ${price} </p>
  </div>
`;

const AuthorNotification = (lesson, course, lessonID) => `
  <div className="email" style="
    padding: 20px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 20px;
  ">
    <h2>Привет!</h2>
    <p>Пришел новый вопрос по уроку "${lesson}" курса "${course}"</p>
    <button><a href="https://besavvy.app/lesson?id=${lessonID}&type=regular">Перейти</a></button>
  </div>
`;

const Mutations = {
  async updateUser(parent, args, ctx, info) {
    //run the update method
    const updates = { ...args };
    const careerID = args.careerTrackID;
    const uniID = args.uniID;
    const id = args.id;
    const company = args.company;
    delete updates.careerID;
    delete updates.uniID;
    delete updates.args;
    delete updates.id;
    delete updates.company;
    delete args;
    //run the update method
    const updatedUser = await ctx.db.mutation.updateUser(
      {
        where: {
          id,
        },
        data: {
          careerTrack: {
            connect: { id: careerID },
          },
          uni: {
            connect: { id: uniID },
          },
          company: {
            connect: { id: company },
          },
          ...updates,
        },
      },
      info
    );
    return updatedUser;
  },
  async updateUserInterests(parent, args, ctx, info) {
    //run the update method
    //run the update method
    const updateUserInterests = await ctx.db.mutation.updateUser(
      {
        where: {
          id: args.id,
        },
        data: {
          interests: {
            set: [...args.interests],
          },
        },
      },
      info
    );
    return updateUserInterests;
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
      data: { resetToken, resetTokenExpiry },
    });
    // 3. Email them that reset token
    const mailRes = await client.sendEmail({
      From: "Mikhail@besavvy.app",
      To: user.email,
      Subject: "Смена пароля",
      HtmlBody: makeANiceEmail(`Вот твой токен для смены пароля
          \n\n
          <a href="${
            process.env.FRONTEND_URL2
          }/reset?resetToken=${resetToken}">Нажми сюда, чтобы сменить пароль!</a>`),
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
        resetTokenExpiry_gte: Date.now() - 3600000,
      },
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
        resetTokenExpiry: null,
      },
    });
    // 6. Generate JWT
    const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET);
    // 7. Set the JWT cookie
    ctx.response.cookie("token", token, {
      maxAge: 1000 * 60 * 60 * 24 * 365,
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
              id: ctx.request.userId,
            },
          },
          uni: {
            connect: {
              id: uniID,
            },
          },
          ...args,
        },
      },
      info
    );
    return coursePage;
  },
  async updateUni(parent, args, ctx, info) {
    //run the update method
    const updates = { ...args };
    const id = args.id;
    //remove the ID from updates
    delete updates.id;
    delete updates.args;
    //run the update method
    const updatedUni = await ctx.db.mutation.updateUni(
      {
        where: {
          id: args.id,
        },
        data: {
          ...updates,
        },
      },
      info
    );
    return updatedUni;
  },
  async createPointA(parent, args, ctx, info) {
    // TODO: Check if they are logged in
    const coursePageID = args.coursePageID;
    delete args.id;
    if (!ctx.request.userId) {
      throw new Error(
        "Вы должны быть зарегистрированы на сайте, чтобы делать это!"
      );
    }
    const PointA = await ctx.db.mutation.createPointA(
      {
        data: {
          user: {
            connect: { id: ctx.request.userId },
          },
          coursePage: {
            connect: { id: coursePageID },
          },
          ...args,
        },
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
          id: args.id,
        },
      },
      info
    );
  },
  async createTextEditor(parent, args, ctx, info) {
    // TODO: Check if they are logged in
    const lessonID = args.lessonID;
    delete args.id;
    const TextEditor = await ctx.db.mutation.createTextEditor(
      {
        data: {
          user: {
            connect: { id: ctx.request.userId },
          },
          lesson: {
            connect: { id: lessonID },
          },
          ...args,
        },
      },
      info
    );
    return TextEditor;
  },
  async updateTextEditor(parent, args, ctx, info) {
    const updates = { ...args };
    delete updates.id;
    return ctx.db.mutation.updateTextEditor(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info
    );
  },
  async deleteTextEditor(parent, args, ctx, info) {
    const where = { id: args.id };
    //1. find the lesson
    const textEditor = await ctx.db.query.textEditor({ where }, `{ id }`);
    //3. Delete it
    return ctx.db.mutation.deleteTextEditor({ where }, info);
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
          id: args.id,
        },
      },
      info
    );
  },
  async createLesson(parent, args, ctx, info) {
    // TODO: Check if they are logged in
    const coursePageID = args.coursePageID;
    delete args.id;
    if (!ctx.request.userId) {
      throw new Error(
        "Вы должны быть зарегистрированы на сайте, чтобы делать это!"
      );
    }

    const Lesson = await ctx.db.mutation.createLesson(
      {
        data: {
          user: {
            connect: { id: ctx.request.userId },
          },
          coursePage: {
            connect: { id: coursePageID },
          },
          ...args,
        },
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
    if (args.map) {
      return ctx.db.mutation.updateLesson(
        {
          data: {
            map: {
              set: [[...args.map]],
            },
          },
          where: {
            id: args.id,
          },
        },
        info
      );
    } else {
      return ctx.db.mutation.updateLesson(
        {
          data: updates,
          where: {
            id: args.id,
          },
        },
        info
      );
    }
  },
  async updatePublished(parent, args, ctx, info) {
    const updates = { ...args };
    delete updates.id;
    //run the update method
    const published = await ctx.db.mutation.updateLesson(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info
    );

    return published;
  },
  async deleteLesson(parent, args, ctx, info) {
    const where = { id: args.id };
    // 1. find the lesson
    const lesson = await ctx.db.query.lesson({ where }, `{ id, user { id } }`);
    // 2. check permissions
    const ownsLesson = lesson.user.id === ctx.request.userId;
    if (!ownsLesson) {
      throw new Error("К сожалению, у вас нет полномочий на это.");
    }
    // 3. Delete it
    return ctx.db.mutation.deleteLesson({ where }, info);
  },
  async createTest(parent, args, ctx, info) {
    // TODO: Check if they are logged in
    const lessonID = args.lessonID;
    delete args.id;
    if (!ctx.request.userId) {
      throw new Error(
        "Вы должны быть зарегистрированы на сайте, чтобы делать это!"
      );
    }

    const test = await ctx.db.mutation.createTest(
      {
        data: {
          user: {
            connect: { id: ctx.request.userId },
          },
          lesson: {
            connect: { id: lessonID },
          },
          ...args,
        },
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
        connect: { id: ctx.request.userId },
      },
      lesson: {
        connect: { id: lessonID },
      },
      answers: {
        set: [...answers],
      },
      correct: {
        set: [...correct],
      },
      question: {
        set: [...question],
      },
      ifRight: args.ifRight,
      ifWrong: args.ifWrong,
    };

    const test = await ctx.db.mutation.createNewTest({ data }, info);
    return test;
  },
  async updateNewTest(parent, args, ctx, info) {
    const answers = args.answers;
    const correct = args.correct;
    const question = args.question;
    const updates = { ...args };
    delete updates.id;
    delete updates.answers;
    delete updates.correct;
    delete updates.question;

    return ctx.db.mutation.updateNewTest(
      {
        data: {
          answers: {
            set: [...answers],
          },
          correct: {
            set: [...correct],
          },
          question: {
            set: [...question],
          },
          ifRight: args.ifRight,
          ifWrong: args.ifWrong,
          ...updates,
        },
        where: {
          id: args.id,
        },
      },
      info
    );
  },
  async updateTestForProblem(parent, args, ctx, info) {
    const updates = { ...args };
    delete updates.id;
    return ctx.db.mutation.updateNewTest(
      {
        data: {
          ...updates,
        },
        where: {
          id: args.id,
        },
      },
      info
    );
  },
  async createTestResult(parent, args, ctx, info) {
    // TODO: Check if they are logged in
    const testID = args.testID;
    const lessonID = args.lessonID;
    if (!ctx.request.userId) {
      throw new Error(
        "Вы должны быть зарегистрированы на сайте, чтобы делать это!"
      );
    }
    const TestResult = await ctx.db.mutation.createTestResult(
      {
        data: {
          student: {
            connect: { id: ctx.request.userId },
          },
          test: {
            connect: { id: testID },
          },
          lesson: {
            connect: { id: lessonID },
          },
          ...args,
        },
      },
      info
    );
    const test = await ctx.db.query.newTest(
      { where: { id: testID } },
      `{ id, answers, correct}`
    );

    let checker = [];
    test.correct.map((el, index) => {
      if (el === true) {
        checker.push(test.answers[index]);
      }
    });

    if (checker.join(", ") === args.answer) {
      const user = await ctx.db.query.user(
        { where: { id: ctx.request.userId } },
        `{ id, level {id, level} }`
      );
      const updateUserLevel = await ctx.db.mutation.updateUserLevel(
        {
          data: {
            level: user.level.level + 1,
          },
          where: {
            id: user.level.id,
          },
        },
        info
      );
    }
    return TestResult;
  },
  async createLessonResult(parent, args, ctx, info) {
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
            connect: { id: ctx.request.userId },
          },
          lesson: {
            connect: { id: lessonID },
          },
          ...args,
        },
      },
      info
    );
    return LessonResult;
  },
  async createChallengeResult(parent, args, ctx, info) {
    let lesson = args.lesson;
    delete args.lesson;
    if (!ctx.request.userId) {
      throw new Error(
        "Вы должны быть зарегистрированы на сайте, чтобы делать это!"
      );
    }
    const ChallengeResult = await ctx.db.mutation.createChallengeResult(
      {
        data: {
          student: {
            connect: { id: ctx.request.userId },
          },
          lesson: {
            connect: { id: lesson },
          },
          correct: args.correct,
          wrong: args.wrong,
          time: args.time,
        },
      },
      info
    );
    return ChallengeResult;
  },
  async updateLessonResult(parent, args, ctx, info) {
    const updates = { ...args };
    delete updates.id;
    //run the update method
    const updatedLessonResult = await ctx.db.mutation.updateLessonResult(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info
    );
    return updatedLessonResult;
  },
  async createQuizResult(parent, args, ctx, info) {
    // TODO: Check if they are logged in
    const lessonID = args.lessonID;
    const quiz = args.quiz;
    delete args.quiz;
    if (!ctx.request.userId) {
      throw new Error(
        "Вы должны быть зарегистрированы на сайте, чтобы делать это!"
      );
    }
    const QuizResult = await ctx.db.mutation.createQuizResult(
      {
        data: {
          student: {
            connect: { id: ctx.request.userId },
          },
          lesson: {
            connect: { id: lessonID },
          },
          quiz: {
            connect: { id: quiz },
          },
          ...args,
        },
      },
      info
    );

    if (args.correct === true) {
      const user = await ctx.db.query.user(
        { where: { id: ctx.request.userId } },
        `{ id, level {id, level} }`
      );
      const updateUserLevel = await ctx.db.mutation.updateUserLevel(
        {
          data: {
            level: user.level.level + 2,
          },
          where: {
            id: user.level.id,
          },
        },
        info
      );
    }

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
            connect: { id: ctx.request.userId },
          },
          problem: {
            connect: { id: problemID },
          },
          lesson: {
            connect: { id: lessonID },
          },
          revealed: {
            set: [...revealed],
          },
          ...args,
        },
      },
      info
    );
    return ProblemResult;
  },
  async createTextEditorResult(parent, args, ctx, info) {
    // TODO: Check if they are logged in
    const lesson = args.lesson;
    const textEditor = args.textEditor;
    delete args.lesson;
    delete args.textEditor;
    if (!ctx.request.userId) {
      throw new Error(
        "Вы должны быть зарегистрированы на сайте, чтобы делать это!"
      );
    }
    const TextEditorResult = await ctx.db.mutation.createTextEditorResult(
      {
        data: {
          student: {
            connect: { id: ctx.request.userId },
          },
          textEditor: {
            connect: { id: textEditor },
          },
          lesson: {
            connect: { id: lesson },
          },
          ...args,
        },
      },
      info
    );

    if (args.result === true) {
      const user = await ctx.db.query.user(
        { where: { id: ctx.request.userId } },
        `{ id, level {id, level} }`
      );
      const updateUserLevel = await ctx.db.mutation.updateUserLevel(
        {
          data: {
            level: user.level.level + 0.25,
          },
          where: {
            id: user.level.id,
          },
        },
        info
      );
    }
    return TextEditorResult;
  },
  async createQuiz(parent, args, ctx, info) {
    // TODO: Check if they are logged in
    const lessonID = args.lessonID;
    delete args.id;
    if (!ctx.request.userId) {
      throw new Error(
        "Вы должны быть зарегистрированы на сайте, чтобы делать это!"
      );
    }

    const Quiz = await ctx.db.mutation.createQuiz(
      {
        data: {
          user: {
            connect: { id: ctx.request.userId },
          },
          lesson: {
            connect: { id: lessonID },
          },
          ...args,
        },
      },
      info
    );
    return Quiz;
  },
  async updateQuiz(parent, args, ctx, info) {
    //first take a copy of the updates
    const updates = { ...args };
    //remove the ID from updates
    delete updates.id;
    console.log(updates);
    //run the update method
    return ctx.db.mutation.updateQuiz(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info
    );
  },
  async createPointATest(parent, args, ctx, info) {
    // TODO: Check if they are logged in
    const coursePageID = args.coursePageID;
    delete args.id;
    if (!ctx.request.userId) {
      throw new Error(
        "Вы должны быть зарегистрированы на сайте, чтобы делать это!"
      );
    }

    const pointATest = await ctx.db.mutation.createPointATest(
      {
        data: {
          user: {
            connect: { id: ctx.request.userId },
          },
          coursePage: {
            connect: { id: coursePageID },
          },
          ...args,
        },
      },
      info
    );
    return pointATest;
  },

  async deleteNewTest(parent, args, ctx, info) {
    const where = { id: args.id };
    //1. find the lesson
    const test = await ctx.db.query.newTest({ where }, `{ id, user { id } }`);

    const ownsTest = test.user.id === ctx.request.userId;
    if (!ownsTest) {
      throw new Error("К сожалению, у вас нет полномочий на это.");
    }
    //3. Delete it
    return ctx.db.mutation.deleteNewTest({ where }, info);
  },
  async deleteQuiz(parent, args, ctx, info) {
    const where = { id: args.id };
    //1. find the lesson
    const quiz = await ctx.db.query.quiz({ where }, `{ id, user { id } }`);
    const ownsQuiz = quiz.user.id === ctx.request.userId;
    if (!ownsQuiz) {
      throw new Error("К сожалению, у вас нет полномочий на это.");
    }
    //3. Delete it
    return ctx.db.mutation.deleteQuiz({ where }, info);
  },
  async createProblem(parent, args, ctx, info) {
    // TODO: Check if they are logged in
    const lessonID = args.lessonID;
    delete args.id;
    if (!ctx.request.userId) {
      throw new Error(
        "Вы должны быть зарегистрированы на сайте, чтобы делать это!"
      );
    }
    const problem = await ctx.db.mutation.createProblem(
      {
        data: {
          user: {
            connect: { id: ctx.request.userId },
          },
          lesson: {
            connect: { id: lessonID },
          },
          ...args,
        },
      },
      info
    );
    return problem;
  },
  async updateProblem(parent, args, ctx, info) {
    //first take a copy of the updates
    const updates = { ...args };
    //remove the ID from updates
    delete updates.id;
    //run the update method
    return ctx.db.mutation.updateProblem(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info
    );
  },
  async deleteProblem(parent, args, ctx, info) {
    const where = { id: args.id };
    //1. find the lesson

    const problem = await ctx.db.query.problem(
      { where },
      `{ id, user { id } }`
    );
    const ownsProblem = problem.user.id === ctx.request.userId;
    if (!ownsProblem) {
      throw new Error("К сожалению, у вас нет полномочий на это.");
    } //3. Delete it
    return ctx.db.mutation.deleteProblem({ where }, info);
  },
  async createConstruction(parent, args, ctx, info) {
    // TODO: Check if they are logged in
    const lessonID = args.lessonID;
    variants = args.variants;
    answer = args.answer;
    delete args.answer;
    delete args.variants;
    if (!ctx.request.userId) {
      throw new Error(
        "Вы должны быть зарегистрированы на сайте, чтобы делать это!"
      );
    }
    const construction = await ctx.db.mutation.createConstruction(
      {
        data: {
          user: {
            connect: { id: ctx.request.userId },
          },
          lesson: {
            connect: { id: lessonID },
          },
          variants: {
            set: [...variants],
          },
          answer: {
            set: [...answer],
          },
          ...args,
        },
      },
      info
    );
    return construction;
  },
  async updateConstruction(parent, args, ctx, info) {
    return ctx.db.mutation.updateConstruction(
      {
        data: {
          variants: {
            set: [...args.variants],
          },
          answer: {
            set: [...args.answer],
          },
          name: args.name,
          hint: args.hint,
          type: args.type,
        },
        where: {
          id: args.id,
        },
      },
      info
    );
  },
  async deleteConstruction(parent, args, ctx, info) {
    const where = { id: args.id };
    //1. find the lesson
    const construction = await ctx.db.query.construction(
      { where },
      `{ id, user { id } }`
    );
    const ownsConstruction = construction.user.id === ctx.request.userId;
    if (!ownsConstruction) {
      throw new Error("К сожалению, у вас нет полномочий на это.");
    }
    //3. Delete it
    return ctx.db.mutation.deleteConstruction({ where }, info);
  },
  async createConstructionResult(parent, args, ctx, info) {
    // TODO: Check if they are logged in
    const lessonID = args.lessonID;
    const constructionID = args.constructionID;
    const inputs = args.inputs;
    delete args.inputs;
    if (!ctx.request.userId) {
      throw new Error(
        "Вы должны быть зарегистрированы на сайте, чтобы делать это!"
      );
    }
    const ConstructionResult = await ctx.db.mutation.createConstructionResult(
      {
        data: {
          student: {
            connect: { id: ctx.request.userId },
          },
          lesson: {
            connect: { id: lessonID },
          },
          construction: {
            connect: { id: constructionID },
          },
          inputs: {
            set: [...inputs],
          },
          ...args,
        },
      },
      info
    );

    const user = await ctx.db.query.user(
      { where: { id: ctx.request.userId } },
      `{ id, level {id, level} }`
    );

    const updateUserLevel = await ctx.db.mutation.updateUserLevel(
      {
        data: {
          level: user.level.level + 3,
        },
        where: {
          id: user.level.id,
        },
      },
      info
    );

    return ConstructionResult;
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
    if (!ctx.request.userId) {
      throw new Error(
        "Вы должны быть зарегистрированы на сайте, чтобы делать это!"
      );
    }
    const sandbox = await ctx.db.mutation.createSandbox(
      {
        data: {
          user: {
            connect: { id: ctx.request.userId },
          },
          sandboxPage: {
            connect: { id: sandboxPageID },
          },
          ...args,
        },
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
    if (!ctx.request.userId) {
      throw new Error(
        "Вы должны быть зарегистрированы на сайте, чтобы делать это!"
      );
    }
    const sandboxPageGoal = await ctx.db.mutation.createSandboxPageGoal(
      {
        data: {
          user: {
            connect: { id: ctx.request.userId },
          },
          sandboxPage: {
            connect: { id: sandboxPageID },
          },
          ...args,
        },
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
          id: args.id,
        },
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
            set: [...args.favourites],
          },
        },
        where: {
          id: args.id,
        },
      },
      info
    );
    return updatedUser;
  },
  async enrollOnCourse(parent, args, ctx, info) {
    const enrolledUser = await ctx.db.mutation.updateUser(
      {
        data: {
          new_subjects: {
            connect: { id: args.coursePage },
          },
        },
        where: {
          id: args.id,
        },
      },
      info
    );

    const courseVisits = await ctx.db.query.courseVisits(
      {
        where: {
          student: { id: args.id },
          coursePage: { id: args.coursePage },
        },
      },
      `{ student { id, name, email } }`
    );

    if (courseVisits.length === 0) {
      const CourseVisit = await ctx.db.mutation.createCourseVisit(
        {
          data: {
            student: {
              connect: { id: args.id },
            },
            coursePage: {
              connect: { id: args.coursePage },
            },
            visitsNumber: 1,
          },
        },
        info
      );
    }

    return enrolledUser;
  },
  async signup(parent, args, ctx, info) {
    // lower the email
    args.email = args.email.toLowerCase();
    const uniID = args.uniID;
    const careerTrackID = args.careerTrackID;
    const company = args.company;
    delete args.uniID;
    delete args.company;
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
            connect: { id: uniID },
          },
          company: {
            connect: { id: company },
          },
          careerTrack: {
            connect: { id: careerTrackID },
          },
        },
      },
      info
    );

    const newEmail = await client.sendEmail({
      From: "Mikhail@besavvy.app",
      To: args.email,
      Subject: "Расскажу о возможностях BeSavvy",
      HtmlBody: WelcomeEmail.WelcomeEmail(args.name),
    });

    const UserLevel = await ctx.db.mutation.createUserLevel(
      {
        data: {
          user: {
            connect: { id: user.id },
          },
          level: 0,
        },
      },
      info
    );

    //create the JWT token for them
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // we set the jwt as a cookie on the response
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
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
      maxAge: 1000 * 60 * 60 * 24 * 365,
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
          id: ctx.request.userId,
        },
      },
      info
    );
    // 3.Check if they have permissions to do it
    hasPermission(currentUser, ["ADMIN"]);
    // 4. Update the permissions
    return ctx.db.mutation.updateUser(
      {
        data: {
          permissions: {
            //special prisma syntax for enum
            set: args.permissions,
          },
        },
        where: {
          id: args.userId,
        },
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
    // 2. Create yandex payment
    const result = await yandex.createPayment({
      amount: {
        value: args.price,
        currency: "RUB",
      },
      payment_method_data: {
        type: "bank_card",
      },
      confirmation: {
        type: "redirect",
        return_url: "https://www.besavvy.app/",
      },
      capture: true,
    });

    ctx.response.cookie("url", result.confirmation.confirmation_url, {
      domain: ".besavvy.app",
      httpOnly: false,
    });

    const paymentID = result.id;
    const user = await ctx.db.query.user({ where: { id: args.user } });
    const coursePage = await ctx.db.query.coursePage({
      where: { id: args.coursePage },
    });

    const order = await ctx.db.mutation.createOrder({
      data: {
        price: args.price,
        paymentID: paymentID,
        promocode: args.promocode,
        comment: args.comment,
        user: {
          connect: { id: user.id },
        },
        coursePage: {
          connect: { id: args.coursePage },
        },
      },
      info,
    });

    const newOrderMail = await client.sendEmail({
      From: "Mikhail@besavvy.app",
      To: "Mi.Kochkin@ya.ru",
      Subject: "Новый клиент",
      HtmlBody: newOrderEmail(
        user.name,
        user.surname,
        user.email,
        coursePage.title,
        args.price
      ),
    });
    return order;
  },
  async createPrivateOrder(parent, args, ctx, info) {
    // 1. TODO: Check if they are logged in
    // const idempotenceKey = '3ww8c4329-a6849-rt9219db-891e-f24532we10d29r7qd211';
    if (!ctx.request.userId) {
      throw new Error(
        "Вы должны быть зарегистрированы на сайте, чтобы делать это!"
      );
    }
    const user = await ctx.db.query.user({ where: { id: args.user } });
    const coursePage = await ctx.db.query.coursePage({
      where: { id: args.coursePage },
    });

    const order = await ctx.db.mutation.createOrder({
      data: {
        promocode: args.promocode,
        user: {
          connect: { id: user.id },
        },
        coursePage: {
          connect: { id: args.coursePage },
        },
      },
      info,
    });

    const newOrderMail = await client.sendEmail({
      From: "Mikhail@besavvy.app",
      To: "Mi.Kochkin@ya.ru",
      Subject: "Новый клиент",
      HtmlBody: newOrderEmail(user.name, coursePage.title, " закрытый курс"),
    });

    return order;
  },
  async updateOrder(parent, args, ctx, info) {
    if (args.isPaid === true) {
      const order = await ctx.db.query.order(
        { where: { id: args.id } },
        `{ id, user { name, email}, coursePage {id, title} }`
      );
      const notification = await client.sendEmail({
        From: "Mikhail@besavvy.app",
        To: order.user.email,
        Subject: "🎆 BeSavvy: доступ к курсу открыт!",
        HtmlBody: PurchaseEmail.PurchaseEmail(
          order.user.name,
          order.coursePage.title,
          order.coursePage.id
        ),
      });
    }
    return ctx.db.mutation.updateOrder(
      {
        data: {
          isPaid: args.isPaid,
        },
        where: {
          id: args.id,
        },
      },
      info
    );
  },
  async deleteOrder(parent, args, ctx, info) {
    const where = { id: args.id };
    //1. find the lesson
    const order = await ctx.db.query.order({ where }, `{ id }`);
    //3. Delete it
    return ctx.db.mutation.deleteOrder({ where }, info);
  },
  async createExamQuestion(parent, args, ctx, info) {
    // TODO: Check if they are logged in
    const coursePageID = args.coursePageID;
    if (!ctx.request.userId) {
      throw new Error(
        "Вы должны быть зарегистрированы на сайте, чтобы делать это!"
      );
    }
    const examQuestion = await ctx.db.mutation.createExamQuestion(
      {
        data: {
          coursePage: {
            connect: { id: coursePageID },
          },
          ...args,
        },
      },
      info
    );
    return examQuestion;
  },
  updateExamQuestion(parent, args, ctx, info) {
    //first take a copy of the updates
    const updates = { ...args };
    //remove the ID from updates
    delete updates.id;
    //run the update method
    return ctx.db.mutation.updateExamQuestion(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info
    );
  },
  async createExamAnswer(parent, args, ctx, info) {
    // TODO: Check if they are logged in
    const examQuestionID = args.examQuestionID;
    if (!ctx.request.userId) {
      throw new Error(
        "Вы должны быть зарегистрированы на сайте, чтобы делать это!"
      );
    }
    const examAnswer = await ctx.db.mutation.createExamAnswer(
      {
        data: {
          student: {
            connect: { id: ctx.request.userId },
          },
          examQuestion: {
            connect: { id: examQuestionID },
          },
          ...args,
        },
      },
      info
    );
    return examAnswer;
  },
  async createPost(parent, args, ctx, info) {
    // TODO: Check if they are logged in
    if (!ctx.request.userId) {
      throw new Error(
        "Вы должны быть зарегистрированы на сайте, чтобы делать это!"
      );
    }
    const Post = await ctx.db.mutation.createPost(
      {
        data: {
          user: {
            connect: { id: ctx.request.userId },
          },
          ...args,
        },
      },
      info
    );
    return Post;
  },
  async createShot(parent, args, ctx, info) {
    const parts = args.parts;
    const comments = args.comments;
    delete args.parts;
    delete args.comments;
    if (!ctx.request.userId) {
      throw new Error(
        "Вы должны быть зарегистрированы на сайте, чтобы делать это!"
      );
    }
    const Shot = await ctx.db.mutation.createShot(
      {
        data: {
          user: {
            connect: { id: ctx.request.userId },
          },
          lesson: {
            connect: { id: args.lessonID },
          },
          parts: {
            set: [...parts],
          },
          comments: {
            set: [...comments],
          },
          ...args,
        },
      },
      info
    );
    return Shot;
  },
  async deleteShot(parent, args, ctx, info) {
    const where = { id: args.id };
    //1. find the lesson
    const shot = await ctx.db.query.shot({ where }, `{ id }`);
    //3. Delete it
    return ctx.db.mutation.deleteShot({ where }, info);
  },
  async createShotResult(parent, args, ctx, info) {
    // TODO: Check if they are logged in
    if (!ctx.request.userId) {
      throw new Error(
        "Вы должны быть зарегистрированы на сайте, чтобы делать это!"
      );
    }
    const ShotResult = await ctx.db.mutation.createShotResult(
      {
        data: {
          student: {
            connect: { id: ctx.request.userId },
          },
          lesson: {
            connect: { id: args.lessonID },
          },
          shot: {
            connect: { id: args.shotID },
          },
          ...args,
        },
      },
      info
    );
    return ShotResult;
  },
  async createNote(parent, args, ctx, info) {
    // TODO: Check if they are logged in
    const lessonID = args.lessonID;
    if (!ctx.request.userId) {
      throw new Error(
        "Вы должны быть зарегистрированы на сайте, чтобы делать это!"
      );
    }
    const Note = await ctx.db.mutation.createNote(
      {
        data: {
          user: {
            connect: { id: ctx.request.userId },
          },
          lesson: {
            connect: { id: lessonID },
          },
          ...args,
        },
      },
      info
    );
    return Note;
  },
  async updateNote(parent, args, ctx, info) {
    const updates = { ...args };
    delete updates.id;
    return ctx.db.mutation.updateNote(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info
    );
  },
  async deleteNote(parent, args, ctx, info) {
    const where = { id: args.id };
    //1. find the lesson
    const note = await ctx.db.query.note({ where }, `{ id, user { id } }`);
    const ownsNote = note.user.id === ctx.request.userId;
    if (!ownsNote) {
      throw new Error("У вас нет на это полномочий!");
    }
    //3. Delete it
    return ctx.db.mutation.deleteNote({ where }, info);
  },
  async createFeedback(parent, args, ctx, info) {
    // TODO: Check if they are logged in
    if (!ctx.request.userId) {
      throw new Error(
        "Вы должны быть зарегистрированы на сайте, чтобы делать это!"
      );
    }

    const user = await ctx.db.query.user({ where: { id: args.student } });
    const coursePages = await ctx.db.query.coursePages({
      where: { lessons_some: { id: args.lesson } },
    });
    const lesson = await ctx.db.query.lesson({ where: { id: args.lesson } });

    const FeedbackNotification = await client.sendEmail({
      From: "Mikhail@besavvy.app",
      To: user.email,
      Subject: "BeSavvy: преподаватель проверил вашу работу",
      HtmlBody: newFeedbackNotification(
        user.name,
        coursePages[0].title,
        coursePages[0].id,
        lesson.name
      ),
    });

    const Feedback = await ctx.db.mutation.createFeedback(
      {
        data: {
          teacher: {
            connect: { id: ctx.request.userId },
          },
          student: {
            connect: { id: args.student },
          },
          lesson: {
            connect: { id: args.lesson },
          },
          text: args.text,
        },
      },
      info
    );
    return Feedback;
  },
  async createCourseVisit(parent, args, ctx, info) {
    const id = args.coursePage;
    // delete args.coursePage;
    if (!ctx.request.userId) {
      throw new Error(
        "Вы должны быть зарегистрированы на сайте, чтобы делать это!"
      );
    }
    const CourseVisit = await ctx.db.mutation.createCourseVisit(
      {
        data: {
          student: {
            connect: { id: args.student },
          },
          coursePage: {
            connect: { id: args.coursePage },
          },
          visitsNumber: 0,
        },
      },
      info
    );
    return CourseVisit;
  },
  async updateCourseVisit(parent, args, ctx, info) {
    const updates = { ...args };
    delete updates.id;
    //run the update method
    const CourseVisit = await ctx.db.mutation.updateCourseVisit(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info
    );
    return CourseVisit;
  },
  async updateFinish(parent, args, ctx, info) {
    const updates = { ...args };
    delete updates.id;
    //run the update method
    const CourseVisit = await ctx.db.mutation.updateCourseVisit(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info
    );

    const users = await ctx.db.query.users({
      where: { courseVisits_some: { id: args.id } },
    });

    const courseVisits = await ctx.db.query.courseVisits(
      {
        where: { id: args.id },
      },
      `{ id, coursePage {id, title} }`
    );

    const Finish = await client.sendEmail({
      From: "Mikhail@besavvy.app",
      To: users[0].email,
      Subject: "🥇 Курс окончен! Фантастический результат!",
      HtmlBody: FinishEmail.FinishEmail(
        users[0].name,
        courseVisits[0].coursePage.title,
        courseVisits[0].coursePage.id
      ),
    });

    return CourseVisit;
  },
  async updateReminder(parent, args, ctx, info) {
    const updates = { ...args };
    delete updates.id;
    delete updates.reminders;
    //run the update method
    const CourseVisit = await ctx.db.mutation.updateCourseVisit(
      {
        data: {
          reminders: {
            set: args.reminders,
          },
          ...updates,
        },
        where: {
          id: args.id,
        },
      },
      info
    );
    const users = await ctx.db.query.users({
      where: { courseVisits_some: { id: args.id } },
    });

    const courseVisits = await ctx.db.query.courseVisits(
      {
        where: { id: args.id },
      },
      `{ id, coursePage {id, title} }`
    );

    const Reminder = await client.sendEmail({
      From: "Mikhail@besavvy.app",
      To: users[0].email,
      Subject: "🥇 Только 4% заканчивают онлайн-курс. Будешь среди них?",
      HtmlBody: ReminderEmail.ReminderEmail(
        users[0].name,
        courseVisits[0].coursePage.title,
        courseVisits[0].coursePage.id
      ),
    });
    return CourseVisit;
  },
  async newWeek(parent, args, ctx, info) {
    const updates = { ...args };
    delete updates.id;
    delete updates.reminders;
    //run the update method
    const CourseVisit = await ctx.db.mutation.updateCourseVisit(
      {
        data: {
          reminders: {
            set: args.reminders,
          },
          ...updates,
        },
        where: {
          id: args.id,
        },
      },
      info
    );
    const users = await ctx.db.query.users({
      where: { courseVisits_some: { id: args.id } },
    });

    const courseVisits = await ctx.db.query.courseVisits(
      {
        where: { id: args.id },
      },
      `{ id, coursePage {id, title} }`
    );

    const NextWeek = await client.sendEmail({
      From: "Mikhail@besavvy.app",
      To: users[0].email,
      Subject: "Новая неделя курса. Готовы?",
      HtmlBody: NextWeekEmail.NextWeekEmail(
        users[0].name,
        courseVisits[0].coursePage.title,
        courseVisits[0].coursePage.id
      ),
    });
    return CourseVisit;
  },
  async createExam(parent, args, ctx, info) {
    // TODO: Check if they are logged in
    const lesson = args.lesson;
    delete args.lesson;
    const Exam = await ctx.db.mutation.createExam(
      {
        data: {
          user: {
            connect: { id: ctx.request.userId },
          },
          lesson: {
            connect: { id: lesson },
          },
          ...args,
        },
      },
      info
    );
    return Exam;
  },
  async updateExam(parent, args, ctx, info) {
    const updates = { ...args };
    delete updates.id;
    return ctx.db.mutation.updateExam(
      {
        data: {
          ...updates,
        },
        where: {
          id: args.id,
        },
      },
      info
    );
  },
  async deleteExam(parent, args, ctx, info) {
    const where = { id: args.id };
    //1. find the lesson
    const exam = await ctx.db.query.exam({ where }, `{ id, user { id } }`);
    const ownsExam = exam.user.id === ctx.request.userId;
    if (!ownsExam) {
      throw new Error("У вас нет на это полномочий!");
    }
    //3. Delete it
    return ctx.db.mutation.deleteExam({ where }, info);
  },
  async createExamResult(parent, args, ctx, info) {
    const ExamResult = await ctx.db.mutation.createExamResult(
      {
        data: {
          user: {
            connect: { id: ctx.request.userId },
          },
          answers: {
            set: [...args.answers],
          },
          lesson: {
            connect: { id: args.lesson },
          },
          exam: {
            connect: { id: args.exam },
          },
        },
      },
      info
    );
    return ExamResult;
  },
  async createDocument(parent, args, ctx, info) {
    // TODO: Check if they are logged in
    if (!ctx.request.userId) {
      throw new Error(
        "Вы должны быть зарегистрированы на сайте, чтобы делать это!"
      );
    }

    const Document = await ctx.db.mutation.createDocument(
      {
        data: {
          user: {
            connect: { id: ctx.request.userId },
          },
          lesson: {
            connect: { id: args.lesson },
          },
          title: args.title,
        },
      },
      info
    );
    return Document;
  },
  async deleteDocument(parent, args, ctx, info) {
    const where = { id: args.id };
    //1. find the lesson
    const document = await ctx.db.query.document(
      { where },
      `{ id, user { id } }`
    );
    const ownsDoc = document.user.id === ctx.request.userId;
    if (!ownsDoc) {
      throw new Error("У вас нет на это полномочий!");
    }
    //3. Delete it
    return ctx.db.mutation.deleteDocument({ where }, info);
  },
  async createClause(parent, args, ctx, info) {
    // TODO: Check if they are logged in
    delete args.id;
    if (!ctx.request.userId) {
      throw new Error(
        "Вы должны быть зарегистрированы на сайте, чтобы делать это!"
      );
    }

    const Clause = await ctx.db.mutation.createClause(
      {
        data: {
          user: {
            connect: { id: ctx.request.userId },
          },
          document: {
            connect: { id: args.document },
          },
          keywords: {
            set: [...args.keywords],
          },
          commentary: args.commentary,
          sample: args.sample,
          number: args.number,
        },
      },
      info
    );
    return Clause;
  },
  async updateClause(parent, args, ctx, info) {
    return ctx.db.mutation.updateClause(
      {
        data: {
          keywords: {
            set: [...args.keywords],
          },
          commentary: args.commentary,
          sample: args.sample,
        },
        where: {
          id: args.id,
        },
      },
      info
    );
  },
  async deleteClause(parent, args, ctx, info) {
    const where = { id: args.id };
    //1. find the lesson
    const clause = await ctx.db.query.clause({ where }, `{ id, user { id } }`);
    const ownsClause = clause.user.id === ctx.request.userId;
    if (!ownsClause) {
      throw new Error("У вас нет на это полномочий!");
    }
    //3. Delete it
    return ctx.db.mutation.deleteClause({ where }, info);
  },
  async createDocumentResult(parent, args, ctx, info) {
    // TODO: Check if they are logged in
    const lesson = args.lesson;
    const document = args.document;
    const answers = args.answers;
    const drafts = args.drafts;
    delete args;
    if (!ctx.request.userId) {
      throw new Error(
        "Вы должны быть зарегистрированы на сайте, чтобы делать это!"
      );
    }
    const DocumentResult = await ctx.db.mutation.createDocumentResult(
      {
        data: {
          user: {
            connect: { id: ctx.request.userId },
          },
          lesson: {
            connect: { id: lesson },
          },
          document: {
            connect: { id: document },
          },
          answers: {
            set: [...answers],
          },
          drafts: {
            set: [...drafts],
          },
        },
      },
      info
    );
    return DocumentResult;
  },
  async createForum(parent, args, ctx, info) {
    // TODO: Check if they are logged in
    const lesson = args.lesson;
    const text = args.text;
    delete args;
    if (!ctx.request.userId) {
      throw new Error(
        "Вы должны быть зарегистрированы на сайте, чтобы делать это!"
      );
    }
    const Forum = await ctx.db.mutation.createForum(
      {
        data: {
          user: {
            connect: { id: ctx.request.userId },
          },
          lesson: {
            connect: { id: lesson },
          },
          text: text,
        },
      },
      info
    );
    return Forum;
  },
  async updateForum(parent, args, ctx, info) {
    //first take a copy of the updates
    const updates = { ...args }; //remove the ID from updates
    delete updates.id;
    //run the update method
    return ctx.db.mutation.updateForum(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info
    );
  },
  async createRating(parent, args, ctx, info) {
    // TODO: Check if they are logged in
    const rating = args.rating;
    const forum = args.forum;
    delete args;
    if (!ctx.request.userId) {
      throw new Error(
        "Вы должны быть зарегистрированы на сайте, чтобы делать это!"
      );
    }
    const Rating = await ctx.db.mutation.createRating(
      {
        data: {
          user: {
            connect: { id: ctx.request.userId },
          },
          forum: {
            connect: { id: forum },
          },
          rating: rating,
        },
      },
      info
    );
    return Rating;
  },
  async updateRating(parent, args, ctx, info) {
    //first take a copy of the updates
    const updates = { ...args }; //remove the ID from updates
    delete updates.id;
    //run the update method
    return ctx.db.mutation.updateRating(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info
    );
  },
  async createStatement(parent, args, ctx, info) {
    // TODO: Check if they are logged in

    const forum = args.forum;
    const text = args.text;
    delete args;

    const author = await ctx.db.query.users({
      where: { forums_some: { id: args.forum } },
    });
    // const order = await ctx.db.query.order(
    //   { where: { id: args.id } },
    //   `{ id, user { name, email}, coursePage {id, title} }`
    // );
    const lesson = await ctx.db.query.lessons(
      { where: { forum: { id: args.forum } } },
      `{id, coursePage {id, title}, name}`
    );
    const newMail = await client.sendEmail({
      From: "Mikhail@besavvy.app",
      To: author[0].email,
      Subject: "Новое сообщение на форуме",
      HtmlBody: AuthorNotification(
        lesson[0].name,
        lesson[0].coursePage.title,
        lesson[0].id
      ),
    });

    if (!ctx.request.userId) {
      throw new Error(
        "Вы должны быть зарегистрированы на сайте, чтобы делать это!"
      );
    }

    const Statement = await ctx.db.mutation.createStatement(
      {
        data: {
          user: {
            connect: { id: ctx.request.userId },
          },
          forum: {
            connect: { id: forum },
          },
          text: text,
        },
      },
      info
    );
    return Statement;
  },
  async deleteStatement(parent, args, ctx, info) {
    const where = { id: args.id };
    if (!ctx.request.userId) {
      throw new Error(
        "Вы должны быть зарегистрированы на сайте, чтобы делать это!"
      );
    }
    const statement = await ctx.db.query.statement(
      { where },
      `{ id, user { id } }`
    );
    const ownsStatement = statement.user.id === ctx.request.userId;
    if (!ownsStatement) {
      throw new Error("К сожалению, у вас нет полномочий на это.");
    }
    //3. Delete it
    return ctx.db.mutation.deleteStatement({ where }, info);
  },
  async createUserLevel(parent, args, ctx, info) {
    // TODO: Check if they are logged in
    delete args;
    if (!ctx.request.userId) {
      throw new Error(
        "Вы должны быть зарегистрированы на сайте, чтобы делать это!"
      );
    }
    const UserLevel = await ctx.db.mutation.createUserLevel(
      {
        data: {
          user: {
            connect: { id: args.user },
          },
          level: args.level,
        },
      },
      info
    );
    return UserLevel;
  },
  async updatePost(parent, args, ctx, info) {
    const updates = { ...args };
    delete updates.id;
    return ctx.db.mutation.updatePost(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info
    );
  },
};

module.exports = Mutations;
