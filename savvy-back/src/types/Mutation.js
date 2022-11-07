const {
  list,
  intArg,
  booleanArg,
  mutationType,
  stringArg,
  arg,
} = require("@nexus/schema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const postmark = require("postmark");
const { promisify } = require("util");
const { randomBytes } = require("crypto");
const { YooCheckout, IGetPaymentList } = require("@a2seven/yoo-checkout");
const idempotenceKey = "02347fc4-a4f0-456db-807e-f0d11c2eс4a5";

const community_checkout = new YooCheckout({
  shopId: process.env.SHOP_ID_IP,
  secretKey: process.env.SHOP_KEY_IP,
});

const ClientReminder = require("../emails/ClientReminder");
const WelcomeEmail = require("../emails/Welcome");
const PurchaseEmail = require("../emails/Purchase");
const ReminderEmail = require("../emails/Reminder");
const GenericEmail = require("../emails/Generic");
const Template = require("../emails/Template");

const NextWeekEmail = require("../emails/nextWeek");
const CommentEmail = require("../emails/Comment");
const ConfEmail = require("../emails/Conf");
const { argsToArgsConfig } = require("graphql/type/definition");

const client = new postmark.ServerClient(process.env.MAIL_TOKEN);

const qrcode = require("qrcode-terminal");

// const { Client } = require("whatsapp-web.js");
// const wa_client = new Client();

// wa_client.on("qr", (qr) => {
//   console.log(1);
//   qrcode.generate(qr, { small: true });
//   console.log(2);
// });

// wa_client.on("ready", () => {
//   console.log("Client is ready!");
// });

// wa_client.initialize();

// console.log(12);

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
    <p>Основатель BeSavvy,Михаил Кочкин</p>
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

const newFeedbackNotification = (name, title, id, lesson) => `
  <div className="email" style="
    padding: 20px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 20px;
  ">
  <h4>${name}, добрый день!</h4>
  <p>Преподаватель по курсу "${title}" оставил обратную связь по уроку "${lesson}" </p>
  <p>Посмотрите, что написал преподаватель, <a href="https://besavvy.app/course?id=${id}">по этой ссылке</a> в разделе "Обратная связь".</p>
  </div>
`;

const Mutation = mutationType({
  name: "Mutation",
  definition(t) {
    t.field("signup", {
      type: "AuthPayload",
      args: {
        name: stringArg(),
        surname: stringArg(),
        number: stringArg(),
        email: stringArg(),
        password: stringArg(),
        isFamiliar: booleanArg(),
        country: stringArg(),
        status: arg({
          type: "Status", // name should match the name you provided
        }),
        uniID: stringArg(),
        careerTrackID: stringArg(),
        company: stringArg(),
      },
      resolve: async (
        _,
        { name, surname, email, number, password, status, country },
        ctx
      ) => {
        const hashed_password = await bcrypt.hash(password, 10);
        const valid = await bcrypt.compare(password, hashed_password);

        const our_user = await ctx.prisma.user.findUnique({
          where: { email: email.toLowerCase() },
        });
        if (our_user) {
          throw new Error(
            `Пользователь с таким имейл уже есть. Войдите в аккаунт или восстановите пароль.`
          );
        }

        const user = await ctx.prisma.user.create({
          data: {
            name,
            surname,
            email: email.toLowerCase(),
            permissions: { set: ["USER"] },
            password: hashed_password,
            number: number,
            country: country,
            // uni: { connect: { id: uniID } },
            // company: { connect: { id: company } },
            // careerTrack: { connect: { id: careerTrackID } },
            isFamiliar: true,
            status: status,
          },
        });

        const UserLevel = await ctx.prisma.userLevel.create({
          data: {
            user: {
              connect: { id: user.id },
            },
            level: 1,
          },
        });

        let token = jwt.sign({ userId: user.id }, process.env.APP_SECRET, {
          expiresIn: 1000 * 60 * 60 * 24 * 365,
        });
        if (process.env.NODE_ENV === "production") {
          ctx.res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "None",
            maxAge: 31557600000,
          });
        } else {
          ctx.res.cookie("token", token, {
            httpOnly: true,
            maxAge: 31557600000,
          });
        }

        const newEmail = await client.sendEmail({
          From: "Mikhail@besavvy.app",
          To: email,
          Subject: "Расскажу о возможностях BeSavvy",
          HtmlBody: WelcomeEmail.WelcomeEmail(name, password, email),
        });

        return { user, token };
      },
    });
    t.field("signin", {
      type: "AuthPayload",
      args: {
        email: stringArg(),
        password: stringArg(),
      },
      resolve: async (_, { email, password }, ctx) => {
        // 1. check if there is a user with that email
        const low_email = email.toLowerCase();
        const user = await ctx.prisma.user.findUnique({
          where: { email: low_email },
        });
        if (!user) {
          throw new Error(`No such user found for email ${email}`);
        }
        // 2. Check if their password is correct
        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
          throw new Error("Invalid Password!");
        }
        // 3. generate the JWT Token
        let token = jwt.sign({ userId: user.id }, process.env.APP_SECRET, {
          expiresIn: 1000 * 60 * 60 * 24 * 365,
        });
        if (process.env.NODE_ENV === "production") {
          ctx.res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "None",
            maxAge: 31557600000,
          });
        } else {
          ctx.res.cookie("token", token, {
            httpOnly: true,
            maxAge: 31557600000,
          });
        }

        // 4. Return the user and token
        return { user, token };
      },
    });

    t.field("updateUser", {
      type: "User",
      args: {
        id: stringArg(),
        name: stringArg(),
        number: stringArg(),
        image: stringArg(),
        tags: list(stringArg()),
        surname: stringArg(),
        email: stringArg(),
        description: stringArg(),
        work: stringArg(),
        status: arg({
          type: "Status", // name should match the name you provided
        }),
        isFamiliar: booleanArg(),
      },
      resolve: async (_, args, ctx) => {
        // const permissions = args.permissions;
        // delete args.permissions;
        const updates = { ...args };
        delete updates.tags;
        delete updates.id;
        const user = await ctx.prisma.user.update({
          data: {
            tags: {
              set: [...args.tags],
            },
            ...updates,
          },
          where: {
            id: args.id,
          },
        });
        return user;
      },
    });

    t.field("sendMessage", {
      type: "Message",
      args: {
        userId: stringArg(),
        text: stringArg(),
      },
      resolve: async (_, args, ctx) => {
        const userId = args.userId;

        delete args.userId;
        const message = await ctx.prisma.message.create({
          data: {
            user: {
              connect: {
                id: userId,
              },
            },
            ...args,
          },
        });

        const user = await ctx.prisma.user.findUnique({
          where: { id: userId },
        });
        const SendGenericEmail = await client.sendEmail({
          From: "Mikhail@besavvy.app",
          To: user.email,
          Subject: `${user.name}, BeSavvy Lawyer is here 👋🏻`,
          HtmlBody: GenericEmail.GenericEmail(args.text),
        });
        return message;
      },
    });

    t.field("enrollOnCourse", {
      type: "User",
      args: {
        coursePageId: stringArg(),
        id: stringArg(),
      },
      resolve: async (_, args, ctx) => {
        const coursePageId = args.coursePageId;
        delete args.coursePageId;
        const enrolledUser = await ctx.prisma.user.update({
          data: {
            new_subjects: {
              connect: { id: coursePageId },
            },
          },
          where: {
            id: args.id,
          },
        });
        const courseVisits = await ctx.prisma.courseVisit.findMany(
          {
            where: {
              student: { id: { equals: args.id } },
              coursePage: { id: { equals: coursePageId } },
            },
          },
          `{ student { id, name, email } }`
        );
        if (courseVisits.length === 0) {
          const CourseVisit = await ctx.prisma.courseVisit.create({
            data: {
              student: {
                connect: { id: args.id },
              },
              coursePage: {
                connect: { id: coursePageId },
              },
              visitsNumber: 1,
            },
          });
        }
        return enrolledUser;
      },
    });

    t.field("signout", {
      type: "SignOut",
      resolve: async (_, args, ctx) => {
        ctx.res.clearCookie("token");
        return { message: "Goodbye!" };
      },
    });
    t.field("createCoursePage", {
      type: "CoursePage",
      args: {
        title: stringArg(),
        description: stringArg(),
        image: stringArg(),
        audience: stringArg(),
        result: stringArg(),
        courseType: stringArg(),
        published: booleanArg(),
      },
      resolve: async (_, args, ctx) => {
        const coursePage = await ctx.prisma.coursePage.create({
          data: {
            user: {
              connect: {
                id: ctx.res.req.userId,
              },
            },
            ...args,
          },
        });
        return coursePage;
      },
    });
    t.field("createProgram", {
      type: "Program",
      args: {
        title: stringArg(),
        description: stringArg(),
        image: stringArg(),
        audience: stringArg(),
        result: stringArg(),
        // news: stringArg(),
        methods: stringArg(),
        price: intArg(),
        header: list(stringArg()),
        subheader: list(stringArg()),
        nextStart: arg({
          type: "DateTime",
        }),
        // uptodateAt: arg({
        //   type: "DateTime",
        // }),
        goals: list(stringArg()),
        // video: stringArg(),
      },
      resolve: async (_, args, ctx) => {
        const updates = { ...args };
        const header = args.header;
        const subheader = args.subheader;
        const goals = args.goals;
        delete updates.header;
        delete updates.subheader;
        delete updates.goals;

        const program = await ctx.prisma.program.create({
          data: {
            header: {
              set: [...header],
            },
            subheader: {
              set: [...subheader],
            },
            goals: {
              set: [...goals],
            },
            ...updates,
          },
        });
        return program;
      },
    });
    t.field("updateProgram", {
      type: "Program",
      args: {
        id: stringArg(),
        title: stringArg(),
        description: stringArg(),
        image: stringArg(),
        audience: stringArg(),
        result: stringArg(),

        price: intArg(),
        currency: stringArg(),
        news: stringArg(),
        authors: stringArg(),
        // promocode: arg({
        //   type: "PromocodeList", // name should match the name you provided
        // }),
        // tariffs: stringArg(),
        methods: stringArg(),
        image: stringArg(),
        video: stringArg(),
        header: list(stringArg()),
        subheader: list(stringArg()),
        nextStart: arg({
          type: "DateTime",
        }),
        // uptodateAt: arg({
        //   type: "DateTime",
        // }),
        goals: list(stringArg()),
      },
      resolve: async (_, args, ctx) => {
        const updates = { ...args };
        delete updates.id;
        const header = args.header;
        const subheader = args.subheader;
        const goals = args.goals;
        delete updates.header;
        delete updates.subheader;
        delete updates.goals;

        const program = await ctx.prisma.program.update({
          data: {
            header: {
              set: [...header],
            },
            subheader: {
              set: [...subheader],
            },
            goals: {
              set: [...goals],
            },
            ...updates,
          },
          where: {
            id: args.id,
          },
        });
        return program;
      },
    });
    t.field("createCourseVisit", {
      type: "CourseVisit",
      args: {
        visitsNumber: intArg(),
        coursePageId: stringArg(),
        studentId: stringArg(),
      },
      resolve: async (_, { visitsNumber, coursePageId, studentId }, ctx) => {
        const courseVisit = await ctx.prisma.courseVisit.create({
          data: {
            coursePage: {
              connect: {
                id: coursePageId,
              },
            },
            student: {
              connect: {
                id: studentId,
              },
            },
            visitsNumber,
          },
        });
        return courseVisit;
      },
    });
    t.field("updateCourseVisit", {
      type: "CourseVisit",
      args: {
        visitsNumber: intArg(),
        id: stringArg(),
      },
      resolve: async (_, { visitsNumber, id }, ctx) => {
        const courseVisit = await ctx.prisma.courseVisit.update({
          where: { id },
          data: { visitsNumber },
        });
        return courseVisit;
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
    t.field("createCertificate", {
      type: "Certificate",
      args: {
        coursePageId: stringArg(),
        studentId: stringArg(),
      },
      resolve: async (_, { coursePageId, studentId }, ctx) => {
        const cert = await ctx.prisma.certificate.create({
          data: {
            coursePage: {
              connect: {
                id: coursePageId,
              },
            },
            student: {
              connect: {
                id: studentId,
              },
            },
          },
        });
        return cert;
      },
    });
    t.field("createLesson", {
      type: "Lesson",
      args: {
        number: intArg(),
        name: stringArg(),
        text: stringArg(),
        description: stringArg(),
        coursePageID: stringArg(),
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
        return ctx.prisma.lesson.delete({ where });
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
    t.field("publishCourse", {
      type: "CoursePage",
      args: {
        id: stringArg(),
        published: booleanArg(),
      },
      resolve: async (_, args, ctx) => {
        const published = await ctx.prisma.coursePage.update({
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
    t.field("updateCoursePage", {
      type: "CoursePage",
      args: {
        id: stringArg(),
        title: stringArg(),
        description: stringArg(),
        audience: stringArg(),
        result: stringArg(),
        price: intArg(),
        discountPrice: intArg(),
        currency: stringArg(),
        news: stringArg(),
        authors: stringArg(),
        promocode: arg({
          type: "PromocodeList", // name should match the name you provided
        }),
        tariffs: stringArg(),
        methods: stringArg(),
        image: stringArg(),
        video: stringArg(),
        header: list(stringArg()),
        subheader: list(stringArg()),
        nextStart: arg({
          type: "DateTime",
        }),
        uptodateAt: arg({
          type: "DateTime",
        }),
        goals: list(stringArg()),
      },
      resolve: async (_, args, ctx) => {
        const updates = { ...args };
        delete updates.id;
        const header = args.header;
        const subheader = args.subheader;
        const goals = args.goals;
        delete updates.header;
        delete updates.subheader;
        delete updates.goals;

        const updatedCoursePage = await ctx.prisma.coursePage.update({
          data: {
            header: {
              set: [...header],
            },
            subheader: {
              set: [...subheader],
            },
            goals: {
              set: [...goals],
            },
            ...updates,
          },
          where: {
            id: args.id,
          },
        });
        return updatedCoursePage;
      },
    });
    t.field("updateLesson", {
      type: "Lesson",
      args: {
        id: stringArg(),
        number: intArg(),
        name: stringArg(),
        audience: stringArg(),
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
        structure: arg({
          type: "LessonStructure",
        }),
        short_structure: arg({
          type: "LessonStructure",
        }),
      },
      resolve: async (_, args, ctx) => {
        const updates = { ...args };
        delete updates.id;
        const updatedLesson = await ctx.prisma.lesson.update({
          data: updates,
          where: {
            id: args.id,
          },
        });
        return updatedLesson;
      },
    });
    t.field("createNewTest", {
      type: "NewTest",
      args: {
        lessonId: stringArg(),
        answers: list(stringArg()),
        correct: list(booleanArg()),
        comments: list(stringArg()),
        question: list(stringArg()),
        type: stringArg(),
        ifRight: stringArg(),
        ifWrong: stringArg(),
      },
      resolve: async (
        _,
        {
          lessonId,
          answers,
          correct,
          comments,
          question,
          ifRight,
          ifWrong,
          type,
        },
        ctx
      ) => {
        const new_data = {
          user: {
            connect: {
              id: ctx.res.req.userId
                ? ctx.res.req.userId
                : "ckmddnbfy180981gwpn2ir82c9",
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
          ifRight,
          ifWrong,
          type,
        };

        const newTest = await ctx.prisma.newTest.create({ data: new_data });
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
    t.field("createTestPractice", {
      type: "TestPractice",
      args: {
        text: stringArg(),
        tasksNum: intArg(),
        tasks: list(stringArg()),
        lessonId: stringArg(),
      },
      resolve: async (_, { lessonId, tasks, tasksNum, text }, ctx) => {
        const new_data = {
          user: {
            connect: {
              id: ctx.res.req.userId
                ? ctx.res.req.userId
                : "ckmddnbfy180981gwpn2ir82c9",
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
        };
        const newTP = await ctx.prisma.testPractice.create({ data: new_data });
        return newTP;
      },
    });
    t.field("createTestResult", {
      type: "TestResult",
      args: {
        answer: stringArg(),
        testID: stringArg(),
        lessonID: stringArg(),
      },
      resolve: async (_, args, ctx) => {
        const TestResult = await ctx.prisma.testResult.create({
          data: {
            student: {
              connect: {
                id: ctx.res.req.userId
                  ? ctx.res.req.userId
                  : "ckmddnbfy180981gwpn2ir82c9",
              },
            },
            test: {
              connect: { id: args.testID },
            },
            lesson: {
              connect: { id: args.lessonID },
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
                  : "ckmddnbfy180981gwpn2ir82c9",
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
                  : "ckmddnbfy180981gwpn2ir82c9",
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
    t.field("updateNewTest", {
      type: "NewTest",
      args: {
        id: stringArg(),
        answers: list(stringArg()),
        correct: list(booleanArg()),
        question: list(stringArg()),
        comments: list(stringArg()),
        type: stringArg(),
        ifRight: stringArg(),
        ifWrong: stringArg(),
        complexity: intArg(),
        next: arg({
          type: "NextType", // name should match the name you provided
        }),
      },
      resolve: async (_, args, ctx) => {
        const updates = { ...args };
        delete updates.id;
        const updatedTest = await ctx.prisma.newTest.update({
          data: updates,
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
    t.field("createQuiz", {
      type: "Quiz",
      args: {
        question: stringArg(),
        answer: stringArg(),
        lessonId: stringArg(),
        ifRight: stringArg(),
        ifWrong: stringArg(),
        type: stringArg(),
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
          type: "NextType", // name should match the name you provided
        }),
        ifRight: stringArg(),
        ifWrong: stringArg(),
        check: stringArg(),
      },
      resolve: async (_, args, ctx) => {
        const updates = { ...args };
        delete updates.id;
        const updatedQuiz = await ctx.prisma.quiz.update({
          data: updates,
          where: {
            id: args.id,
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
                  : "ckmddnbfy180981gwpn2ir82c9",
              },
            },
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
                  : "ckmddnbfy180981gwpn2ir82c9",
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
        link_clicks: intArg(),
        isSecret: booleanArg(),
        complexity: intArg(),
        next: arg({
          type: "NextType", // name should match the name you provided
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
    t.field("createChat", {
      type: "Chat",
      args: {
        name: stringArg(),
        lessonId: stringArg(),
        messages: arg({
          type: "Messages",
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
        });
        return Chat;
      },
    });
    t.field("updateChat", {
      type: "Chat",
      args: {
        id: stringArg(),
        name: stringArg(),
        link_clicks: intArg(),
        isSecret: booleanArg(),
        messages: arg({
          type: "Messages",
        }),
      },
      resolve: async (_, args, ctx) => {
        const id = args.id;
        delete args.id;
        const Chat = await ctx.prisma.chat.update({
          data: {
            ...args,
          },
          where: {
            id,
          },
        });
        return Chat;
      },
    });
    t.field("createTextEditor", {
      type: "TextEditor",
      args: {
        lessonId: stringArg(),
        text: stringArg(),
        name: stringArg(),
        totalMistakes: intArg(),
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
            ...args,
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
      },
      resolve: async (_, args, ctx) => {
        const updates = { ...args };
        delete updates.id;
        return ctx.prisma.textEditor.update({
          data: updates,
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
                  : "ckmddnbfy180981gwpn2ir82c9",
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
                  : "ckmddnbfy180981gwpn2ir82c9",
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
        return TextEditorResult;
      },
    });
    t.field("createConstruction", {
      type: "Construction",
      args: {
        lessonId: stringArg(),
        type: stringArg(),
        name: stringArg(),
        hint: stringArg(),
        variants: list(stringArg()),
        answer: list(stringArg()),
        text: stringArg(),
        hasText: booleanArg(),
        columnsNum: intArg(),
        elements: arg({
          type: "ElementsList",
        }),
      },
      resolve: async (_, args, ctx) => {
        const lessonId = args.lessonId;
        delete args.lessonId;
        variants = args.variants;
        answer = args.answer;
        delete args.answer;
        delete args.variants;

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
              set: [...variants],
            },
            answer: {
              set: [...answer],
            },
            ...args,
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
        elements: arg({
          type: "ElementsList",
        }),
      },
      resolve: async (_, args, ctx) => {
        const updates = { ...args };
        delete updates.id;
        delete updates.variants;
        delete updates.answer;
        const variants = args.variants;
        const answer = args.answer;
        return ctx.prisma.construction.update({
          data: {
            // variants: {
            //   set: [...variants],
            // },
            // answer: {
            //   set: [...answer],
            // },
            ...updates,
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
        attempts: intArg(),
        constructionId: stringArg(),
        lessonId: stringArg(),
        inputs: list(stringArg()),
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
                  : "ckmddnbfy180981gwpn2ir82c9",
              },
            },
            construction: {
              connect: { id: constructionId },
            },
            lesson: {
              connect: { id: lessonId },
            },
            inputs: {
              set: [...inputs],
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
                  : "ckmddnbfy180981gwpn2ir82c9",
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
    t.field("createProblem", {
      type: "Problem",
      args: {
        lessonId: stringArg(),
        text: stringArg(),
        steps: arg({
          type: "ProblemStructure",
        }),
        // nodeID: stringArg(),
        // nodeType: stringArg(),
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
            ...args,
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
        // nodeID: stringArg(),
        // nodeType: stringArg(),
        complexity: intArg(),
        isSecret: booleanArg(),
      },
      resolve: async (_, args, ctx) => {
        const updates = { ...args };
        //remove the ID from updates
        delete updates.id;
        //run the update method
        return ctx.prisma.problem.update({
          data: updates,
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
              connect: { id: ctx.res.req.userId },
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
            where: { forums: { some: { id: { equals: forumId } } } },
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
          where: { forums: { some: { id: { equals: forumId } } } },
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
        console.log("comments initial", args.comments.join(", "));
        const statement = await ctx.prisma.statement.findUnique({
          where: { id: args.id },
        });
        console.log("statement", statement);

        const student = await ctx.prisma.user.findUnique({
          where: { id: statement.userId },
        });

        const lesson = await ctx.prisma.lesson.findUnique({
          where: { forumId: statement.forumId },
        });
        console.log("args.comments[0]", args.comments[0]);
        const commentEmail = await client.sendEmail({
          From: "Mikhail@besavvy.app",
          To: student.email,
          Subject: "BeSavvy: ответили на ваш вопрос",
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
        const ownsTest = C.userId === ctx.res.req.userId;
        if (!ownsTest) {
          throw new Error("К сожалению, у вас нет полномочий на это.");
        }
        //3. Delete it
        return ctx.prisma.statement.delete({ where });
      },
    });
    t.field("createShot", {
      type: "Shot",
      args: {
        lessonId: stringArg(),
        title: stringArg(),
        parts: list(stringArg()),
        comments: list(stringArg()),
      },
      resolve: async (_, args, ctx) => {
        const parts = args.parts;
        const comments = args.comments;
        console.log("parts", parts, comments);
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
        });
        return Shot;
      },
    });
    t.field("updateShot", {
      type: "Shot",
      args: {
        id: stringArg(),
        parts: list(stringArg()),
        comments: list(stringArg()),
        title: stringArg(),
      },
      resolve: async (_, args, ctx) => {
        const id = args.id;
        //remove the ID from updates
        delete args.id;
        //run the update method
        return ctx.prisma.shot.update({
          data: {
            parts: {
              set: [...args.parts],
            },
            comments: {
              set: [...args.comments],
            },
            title: args.title,
          },
          where: {
            id,
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
              connect: { id: ctx.res.req.userId },
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
    t.field("createOrder", {
      type: "PaymentInfo",
      args: {
        coursePageId: stringArg(),
        userId: stringArg(),
        promocode: stringArg(),
        comment: stringArg(),
        price: intArg(),
      },
      resolve: async (_, args, ctx) => {
        // 1.

        // const result = await yandex.createPayment({

        const user = await ctx.prisma.user.findUnique({
          where: { id: args.userId },
        });
        const coursePage = await ctx.prisma.coursePage.findUnique({
          where: { id: args.coursePageId },
        });

        const createPayload = {
          amount: {
            value: args.price,
            currency: "RUB",
          },
          payment_method_data: {
            type: "bank_card",
          },
          receipt: {
            customer: {
              email: user.email,
            },
            items: [
              {
                description: coursePage.title,
                quantity: "1",
                amount: {
                  value: args.price,
                  currency: "RUB",
                },
                vat_code: 1,
              },
            ],
          },
          confirmation: {
            type: "redirect",
            return_url: `https://besavvy.app/onboarding?id=${coursePage.id}`,
          },
          capture: true,
        };

        const payment = await community_checkout.createPayment(createPayload);

        const url = payment.confirmation.confirmation_url;

        // const createReceiptPayload = {
        //   send: true,
        //   customer: {
        //     email: "mi.kochkin@ya.ru",
        //   },
        //   type: "payment",
        //   payment_id: payment.id,
        //   settlements: [
        //     {
        //       type: "cashless",
        //       amount: {
        //         value: "2.00",
        //         currency: "RUB",
        //       },
        //     },
        //   ],
        //   items: [
        //     {
        //       description: "test",
        //       quantity: "1",
        //       amount: {
        //         value: "2.00",
        //         currency: "RUB",
        //       },
        //       vat_code: 1,
        //     },
        //   ],
        // };

        // try {
        //   const receipt = await checkout.createReceipt(createReceiptPayload);
        //   console.log("receipt", receipt);
        // } catch (error) {
        //   console.error("error1", error);
        // }

        // 2.
        // const paymentID = result.id;
        // console.log("args", args);
        const order = await ctx.prisma.order.create({
          data: {
            price: args.price,
            paymentID: payment.id,
            isPaid: false,
            promocode: args.promocode,
            comment: args.comment,
            user: {
              connect: { id: args.userId },
            },
            coursePage: {
              connect: { id: args.coursePageId },
            },
          },
        });

        // 3.

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

        return { url, order };
      },
    });

    t.field("createPrivateOrder", {
      type: "PaymentInfo",
      args: {
        coursePageId: stringArg(),
        userId: stringArg(),
        promocode: stringArg(),
      },
      resolve: async (_, args, ctx) => {
        const user = await ctx.prisma.user.findUnique({
          where: { id: args.userId },
        });

        const coursePage = await ctx.prisma.coursePage.findUnique({
          where: { id: args.coursePageId },
        });

        const order = await ctx.prisma.order.create({
          data: {
            promocode: args.promocode,
            user: {
              connect: { id: args.userId },
            },
            coursePage: {
              connect: { id: args.coursePageId },
            },
          },
        });

        const newOrderMail = await client.sendEmail({
          From: "Mikhail@besavvy.app",
          To: "Mikhail@besavvy.app",
          Subject: "Новый клиент",
          HtmlBody: newOrderEmail(
            user.name,
            user.surname,
            user.email,
            coursePage.title,
            0
          ),
        });

        const newOrderMail2 = await client.sendEmail({
          From: "Mikhail@besavvy.app",
          To: "Anastasia@besavvy.app",
          Subject: "Новая заявка на присоединение к курсу",
          HtmlBody: newOrderEmail(
            user.name,
            user.surname,
            user.email,
            coursePage.title,
            0
          ),
        });

        return { order };
      },
    });

    t.field("updateOrder", {
      type: "Order",
      args: {
        id: stringArg(),
        isPaid: booleanArg(),
      },
      resolve: async (_, args, ctx) => {
        if (args.isPaid === true) {
          const order = await ctx.prisma.order.findUnique(
            {
              where: { id: args.id },
              include: {
                user: true,
                coursePage: true,
              },
            },
            `{ id, user { id, name, email}, coursePage {id, title} }`
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
        return ctx.prisma.order.update({
          data: {
            isPaid: args.isPaid,
          },
          where: {
            id: args.id,
          },
        });
      },
    });
    t.field("updateOrderAuto", {
      type: "Order",
      args: {
        id: stringArg(),
        userId: stringArg(),
      },
      resolve: async (_, args, ctx) => {
        // 1. find all orders for our user

        const order = await ctx.prisma.order.findUnique(
          {
            where: { id: args.id },
            include: {
              user: true,
              coursePage: true,
            },
          },
          `{ id, user { id, name, email}, coursePage {id, title}, paymentID }`
        );

        // 2. check at yookassa if any order is paid
        if (order.paymentID) {
          const payment = await community_checkout.getPayment(order.paymentID);

          if (payment.status == "succeeded") {
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
            return ctx.prisma.order.update({
              data: {
                isPaid: true,
              },
              where: {
                id: args.id,
              },
            });
          } else {
            return ctx.prisma.order.update({
              data: {
                isPaid: false,
              },
              where: {
                id: args.id,
              },
            });
          }
        }
        // 3. give access
      },
    });
    t.field("deleteOrder", {
      type: "Order",
      args: {
        id: stringArg(),
      },
      resolve: async (_, args, ctx) => {
        const where = { id: args.id };

        const C = await ctx.prisma.order.findUnique(
          { where },
          `{ id, user { id } }`
        );
        const ownsTest = C.userId === ctx.res.req.userId;
        if (!ownsTest) {
          throw new Error("К сожалению, у вас нет полномочий на это.");
        }
        //3. Delete it
        return ctx.prisma.order.delete({ where });
      },
    });
    t.field("createPost", {
      type: "Post",
      args: {
        text: stringArg(),
        title: stringArg(),
        summary: stringArg(),
        image: stringArg(),
      },
      resolve: async (_, args, ctx) => {
        const post = await ctx.prisma.post.create({
          data: {
            user: {
              connect: { id: ctx.res.req.userId },
            },
            ...args,
          },
        });
        return post;
      },
    });
    t.field("deletePost", {
      type: "Post",
      args: {
        id: stringArg(),
      },
      resolve: async (_, args, ctx) => {
        const where = { id: args.id };
        //3. Delete it
        return ctx.prisma.post.delete({ where });
      },
    });
    t.field("updatePost", {
      type: "Post",
      args: {
        text: stringArg(),
        summary: stringArg(),
        image: stringArg(),
        title: stringArg(),
        id: stringArg(),
        likes: intArg(),
        tags: list(stringArg()),
      },
      resolve: async (
        _,
        { text, id, likes, summary, image, title, tags },
        ctx
      ) => {
        const updatedPost = await ctx.prisma.post.update({
          where: { id },
          data: {
            tags: {
              set: [...tags],
            },
            text,
            likes,
            summary,
            image,
            title,
          },
        });
        return updatedPost;
      },
    });
    t.field("remind", {
      type: "CourseVisit",
      args: {
        id: stringArg(),
        reminders: list(
          arg({
            type: "DateTime",
          })
        ),
      },
      resolve: async (_, { id, reminders }, ctx) => {
        // const updateCourseVisit = await ctx.prisma.courseVisit.update({
        //   where: { id },
        //   data: { reminders: { set: reminders } },
        // });

        // const users = await ctx.prisma.user.findMany({
        //   where: { courseVisits: { some: { id: { equals: id } } } },
        // });

        const courseVisits = await ctx.prisma.courseVisit.findMany(
          {
            where: { id: id },
            include: { coursePage: true },
          },
          `{ id, coursePage {id, title} }`
        );

        // const Reminder = await client.sendEmail({
        //   From: "Mikhail@besavvy.app",
        //   To: users[0].email,
        //   Subject: "🥇 Только 4% заканчивают онлайн-курс. Будешь среди них?",
        //   HtmlBody: ReminderEmail.ReminderEmail(
        //     users[0].name,
        //     courseVisits[0].coursePage.title,
        //     courseVisits[0].coursePage.id
        //   ),
        // });

        return updateCourseVisit;
      },
    });
    t.field("sendEmailToStudent", {
      type: "CourseVisit",
      args: {
        id: stringArg(),
        comment: stringArg(),
        info: arg({
          type: "EmailInfo", // name should match the name you provided
        }),
        reminders: list(
          arg({
            type: "DateTime",
          })
        ),
      },
      resolve: async (_, { id, reminders, comment, info }, ctx) => {
        const getNoun = (number, one, two, five) => {
          let n = Math.abs(number);
          n %= 100;
          if (n >= 5 && n <= 20) {
            return five;
          }
          n %= 10;
          if (n === 1) {
            return one;
          }
          if (n >= 2 && n <= 4) {
            return two;
          }
          return five;
        };

        const left_lessons = info.lesResultsList.lesResults.filter(
          (l) => l.progress / l.lesson_size < 0.8
        );

        const updateCourseVisit = await ctx.prisma.courseVisit.update({
          where: { id },
          data: { reminders: { set: reminders } },
        });

        const users = await ctx.prisma.user.findMany({
          where: { courseVisits: { some: { id: { equals: id } } } },
        });

        const courseVisits = await ctx.prisma.courseVisit.findMany(
          {
            where: { id: id },
            include: { coursePage: true },
          },
          `{ id, coursePage {id, title, lessons {id, lessonResults {id, student {id}}}} }`
        );
        if (comment === "hello") {
          const NextWeek = await client.sendEmail({
            From: "Mikhail@besavvy.app",
            To: users[0].email,
            Subject: "Привет от директора BeSavvy 😁",
            HtmlBody: NextWeekEmail.NextWeekEmail(
              users[0].name,
              `<p>Это Миша, основатель BeSavvy.</p>
        <p>Рад приветствовать тебя среди участников курса "${courseVisits[0].coursePage.title}".</p>
        <p>Главное, запомни, что ты занимаешься не в одиночку. Я всегда буду рад помочь тебе с любым учебным или техническим вопросом. Со мной можно связаться, написав в Discord или ответив на это письмо.</p>
        <p>У тебя же есть ссылка на Discord?</p>
        `,
              courseVisits[0].coursePage.title,
              courseVisits[0].coursePage.id
            ),
          });
        } else if (comment === "problem") {
          const NextWeek = await client.sendEmail({
            From: "Mikhail@besavvy.app",
            To: users[0].email,
            Subject:
              "Если нужна помощь на курсе, помощь от BeSavvy всегда рядом 🖐🏻",
            HtmlBody: NextWeekEmail.NextWeekEmail(
              users[0].name,
              `<p>Это Миша, основатель BeSavvy.</p>
        <p>Ты проходишь наш курс "${courseVisits[0].coursePage.title}". Я заметил, что что-то пошло не так и у тебя пока не получилось пройти курс до конца. Может быть, я могу чем-то помочь? </p>
        <p>Даже если у тебя долгое время не было возможности заниматься, это не повод бросать. Мы взрослые люди, понимаем, что бывают завалы на работе или в семейной жизни. Главное, продолжать заниматься. И я буду рада вновь ввести тебя в курс дела и найти отправную точку. Просто ответь на это письмо)</p>
        `,
              courseVisits[0].coursePage.title,
              courseVisits[0].coursePage.id
            ),
          });
        } else if (comment === "motivation") {
          const NextWeek = await client.sendEmail({
            From: "Mikhail@besavvy.app",
            To: users[0].email,
            Subject: "Еще немного и ты закончишь курс на BeSavvy ✅",
            HtmlBody: NextWeekEmail.NextWeekEmail(
              users[0].name,
              `<p>Это Миша, основатель BeSavvy.</p>

<p>Пишу, чтобы подвести итоги нашей работы за последнее время по курсу “${
                info.course_name
              }”</p>

<p>Мы с тобой прошли уже <b>${info.completed_lessons_number}</b> из <b>${
                info.lessons_number
              } ${getNoun(info.lessons_number, "урок", "урока", "уроков")}</b>. 
              
              ${
                [...left_lessons].length == 0
                  ? "<p></p>"
                  : `
              <p>Правда, еще не ${
                [...left_lessons].length <= 1
                  ? "закончен урок:"
                  : "закончены уроки: "
              }</p><br> ${[...left_lessons].map(
                      (l) =>
                        `<li>
                    ${l.lesson_number}.
                    ${" "}
                    ${l.lesson_name}
                  </li>`
                    )}<p>Посмотришь ${
                      [...left_lessons].length <= 1 ? "его" : "их"
                    }?</p>
              </div>`
              }

<p>Нам еще осталось пройти </b>${
                info.lessons_number - info.completed_lessons_number
              }  ${getNoun(
                info.lessons_number - info.completed_lessons_number,
                "урок",
                "урока",
                "уроков"
              )}</b>. Думаю, что нам потребуется еще <b>${
                parseInt(
                  (info.lessons_number - info.completed_lessons_number) / 3
                ) > 0
                  ? parseInt(
                      (info.lessons_number - info.completed_lessons_number) / 3
                    )
                  : 1
              } ${getNoun(
                parseInt(
                  (info.lessons_number - info.completed_lessons_number) / 3
                ) > 0
                  ? parseInt(
                      (info.lessons_number - info.completed_lessons_number) / 3
                    )
                  : 1,
                "неделя",
                "недели",
                "недель"
              )}</b>, чтобы закончить курс.</p>

<p>Если есть вопросы, пиши в наш Дискорд. У тебя же есть ссылка?</p>`,
              courseVisits[0].coursePage.title,
              courseVisits[0].coursePage.id
            ),
          });
        }
        return updateCourseVisit;
      },
    });
    t.field("createFeedback", {
      type: "Feedback",
      args: {
        text: stringArg(),
        lessonId: stringArg(),
        studentId: stringArg(),
      },
      resolve: async (_, args, ctx) => {
        const user = await ctx.prisma.user.findUnique({
          where: { id: args.studentId },
        });
        const coursePages = await ctx.prisma.coursePage.findMany({
          where: { lessons: { some: { id: { equals: args.lessonId } } } },
        });
        const lesson = await ctx.prisma.lesson.findUnique({
          where: { id: args.lessonId },
        });
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

        const Feedback = await ctx.prisma.feedback.create({
          data: {
            student: {
              connect: { id: args.studentId },
            },
            teacher: {
              connect: { id: ctx.res.req.userId },
            },
            lesson: {
              connect: { id: args.lessonId },
            },
            text: args.text,
          },
        });
        return Feedback;
      },
    });
    t.field("updateBusinessClient", {
      type: "BusinessClient",
      args: {
        comment: stringArg(),
        tags: list(stringArg()),
        id: stringArg(),
      },
      resolve: async (_, { comment, tags, id }, ctx) => {
        const bclient = await ctx.prisma.businessClient.update({
          where: { id },
          data: {
            tags: {
              set: [...tags],
            },
            comment,
          },
        });

        return bclient;
      },
    });
    t.field("textBusinessClient", {
      type: "BusinessClient",
      args: {
        comment: stringArg(),
        id: stringArg(),
      },
      resolve: async (_, { comment, id }, ctx) => {
        const my_client = await ctx.prisma.businessClient.findUnique({
          where: { id: id },
        });

        let number;
        if (my_client.number.startsWith("8")) {
          number = my_client.number.replace("8", "7");
        } else if (my_client.number.startsWith("+7")) {
          number = my_client.number.replace("+7", "7");
        } else if (my_client.number.startsWith("9")) {
          number = `7${my_client.number}`;
        } else {
          number = my_client.number;
        }

        // const number_details = await wa_client.getNumberId(number); // get mobile number details

        // if (number_details) {
        //   const sendMessageData = await wa_client.sendMessage(
        //     number_details._serialized,
        //     comment
        //   ); // send message
        //   console.log(number, "Success");
        // } else {
        //   console.log(number, "Mobile number is not registered");
        // }
        // const bclient = await ctx.prisma.businessClient.update({
        //   where: { id },
        //   data: {
        //     comment,
        //   },
        // });

        return bclient;
      },
    });
    t.field("deleteClient", {
      type: "BusinessClient",
      args: {
        id: stringArg(),
      },
      resolve: async (_, args, ctx) => {
        const where = { id: args.id };
        return ctx.prisma.businessClient.delete({ where });
      },
    });
    t.field("sendBusinessClientEmail", {
      type: "BusinessClient",
      args: {
        comment: stringArg(),
        id: stringArg(),
      },
      resolve: async (_, { communication_medium, comment, id }, ctx) => {
        const bc = await ctx.prisma.businessClient.findUnique({
          where: { id: id },
        });

        const newEmail3 = await client.sendEmail({
          From: "Mikhail@besavvy.app",
          To: bc.email,
          Subject: `17.08 Полезные материалы от BeSavvy Lawyer 🚀`,
          HtmlBody: GenericEmail.GenericEmail(comment),
        });

        return bc;
      },
    });
    t.field("createBusinessClient", {
      type: "User",
      args: {
        email: stringArg(),
        name: stringArg(),
        type: stringArg(),
        number: stringArg(),
        communication_medium: stringArg(),
        comment: stringArg(),
        coursePageId: stringArg(),
      },
      resolve: async (_, args, ctx) => {
        const coursePageId = args.coursePageId;
        delete args.coursePageId;
        const new_client = await ctx.prisma.businessClient.create({
          data: {
            coursePage: {
              connect: { id: coursePageId },
            },
            ...args,
          },
        });

        if (args.comment == "consult") {
          const newEmail = await client.sendEmail({
            From: "Mikhail@besavvy.app",
            To: "Mikhail@besavvy.app",
            Subject: "Новая заявка на консультацию",
            HtmlBody: makeANiceEmail(
              `Новая заявка на курс. Вот данные: ${args.name}, ${args.email}, ${args.number}`
            ),
          });
        }

        return new_client;
      },
    }),
      t.field("createCommunityMember", {
        type: "PaymentInfo2",
        args: {
          email: stringArg(),
          name: stringArg(),
          surname: stringArg(),
          number: stringArg(),
          subscription: stringArg(),
        },
        resolve: async (_, args, ctx) => {
          // 1. Create new community member
          const communityMember = await ctx.prisma.communityMember.create({
            data: {
              ...args,
            },
          });

          // 2. Generate payment link

          let price;
          let description;

          if (args.subscription == "month") {
            price = 490;
            description = "месяц";
          } else if (args.subscription == "year") {
            price = 5000;
            description = "год";
          }
          const createPayload2 = {
            amount: {
              value: price,
              currency: "RUB",
            },
            payment_method_data: {
              type: "bank_card",
            },
            receipt: {
              customer: {
                email: args.email,
              },
              items: [
                {
                  description: `Подписка BeSavvy Connect: 1 ${description}`,
                  quantity: "1",
                  amount: {
                    value: price,
                    currency: "RUB",
                  },
                  vat_code: 1,
                },
              ],
            },
            confirmation: {
              type: "redirect",
              return_url: "https://besavvy.app/connect",
            },
          };

          // try {
          //   const payment = await community_checkout.createPayment(
          //     createPayload2
          //   );
          //   console.log("payment 1", payment);
          // } catch (error) {
          //   console.error(error);
          // }

          // try {
          const payment = await community_checkout.createPayment(
            createPayload2
          );
          //   console.error(error);
          // }

          const url = payment.confirmation.confirmation_url;

          // 3. Send email to administration
          const newEmail = await client.sendEmail({
            From: "Mikhail@besavvy.app",
            To: "Mikhail@besavvy.app",
            Subject: "Новая заявка в сообщество",
            HtmlBody: makeANiceEmail(
              `Новая заявка в сообщество. Вот данные: ${args.name} ${args.surname}, ${args.email}, ${args.number}, ${args.subscription}`
            ),
          });

          return { url, communityMember };
        },
      }),
      t.field("createConfUser", {
        type: "ConfUser",
        args: {
          email: stringArg(),
          conf_number: intArg(),
        },
        resolve: async (_, args, ctx) => {
          const conf_user = await ctx.prisma.confUser.create({
            data: {
              ...args,
            },
          });

          const newEmail = await client.sendEmail({
            From: "Mikhail@besavvy.app",
            To: args.email,
            Subject: "Рады видеть тебя на BeSavvyCon",
            HtmlBody: ConfEmail.ConfEmail(),
          });

          return conf_user;
        },
      }),
      t.field("updateConfUser", {
        type: "ConfUser",
        args: {
          id: stringArg(),
          name: stringArg(),
          surname: stringArg(),
        },
        resolve: async (_, args, ctx) => {
          const updates = { ...args };
          //remove the ID from updates
          delete updates.id;
          //run the update method
          return ctx.prisma.statement.update({
            data: {
              ...updates,
            },
            where: {
              id: args.id,
            },
          });
        },
      });
    t.field("requestReset", {
      type: "AuthMessage",
      args: {
        email: stringArg(),
      },
      resolve: async (_, args, ctx) => {
        const user = await ctx.prisma.user.findUnique({
          where: { email: args.email.toLowerCase() },
        });

        const randomBytesPromiseified = promisify(randomBytes);
        const resetToken = (await randomBytesPromiseified(20)).toString("hex");
        const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now
        const res = await ctx.prisma.user.update({
          where: { email: args.email.toLowerCase() },
          data: { resetToken, resetTokenExpiry },
        });
        // 3. Email them that reset token
        const mailRes = await client.sendEmail({
          From: "Mikhail@besavvy.app",
          To: user.email,
          Subject: "Смена пароля",
          HtmlBody: makeANiceEmail(`Вот твой токен для смены пароля
                  \n\n
                  <a href="${process.env.FRONTEND_URL7}/reset?resetToken=${resetToken}">Нажми сюда, чтобы сменить пароль!</a>`),
        });
        // 4. Return the message
        return { message: "Спасибо!" };
      },
    }),
      t.field("resetPassword", {
        type: "User",
        args: {
          resetToken: stringArg(),
          password: stringArg(),
          confirmPassword: stringArg(),
        },
        resolve: async (_, args, ctx) => {
          // 1. check if the passwords match
          if (args.password !== args.confirmPassword) {
            throw new Error("Пароли не совпадают!");
          }

          // 2. check if its a legit reset token
          // 3. Check if its expired

          const [user] = await ctx.prisma.user.findMany({
            where: {
              resetToken: { equals: args.resetToken },
              // resetTokenExpiry: Date.now() - 3600000,
            },
          });
          if (!user) {
            throw new Error("Это неправильный или устаревший токен!");
          }

          // 4. Hash their new password
          const password = await bcrypt.hash(args.password, 10);
          // 5. Save the new password to the user and remove old resetToken fields
          const updatedUser = await ctx.prisma.user.update({
            where: { email: user.email },
            data: {
              password,
              resetToken: null,
              resetTokenExpiry: null,
            },
          });

          const token = jwt.sign(
            { userId: updatedUser.id },
            process.env.APP_SECRET
          );

          // 7. Set the JWT cookie
          ctx.res.cookie("token", token, {
            maxAge: 1000 * 60 * 60 * 24 * 365,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "None",
          });
          // 8. return the new user
          return updatedUser;
        },
      }),
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
      }),
      t.field("createLawrdle", {
        type: "Lawrdle",
        args: {
          authorId: stringArg(),
          word: stringArg(),
          story: stringArg(),
          active: booleanArg(),
          buttonText: stringArg(),
          link: stringArg(),
          coursePageId: stringArg(),
          tags: list(stringArg()),
        },
        resolve: async (_, args, ctx) => {
          console.log(args);
          const authorId = args.authorId;
          delete args.authorId;
          const coursePageId = args.coursePageId;
          delete args.coursePageId;
          const tags = args.tags;
          delete args.tags;
          const Lawrdle = await ctx.prisma.lawrdle.create({
            data: {
              author: {
                connect: { id: authorId },
              },
              coursePage: {
                connect: { id: coursePageId },
              },
              tags: {
                set: [...tags],
              },
              ...args,
            },
          });

          return Lawrdle;
        },
      }),
      t.field("createUseful", {
        type: "Useful",
        args: {
          header: stringArg(),
          buttonText: stringArg(),
          image: stringArg(),
          link: stringArg(),
          tags: list(stringArg()),
        },
        resolve: async (_, args, ctx) => {
          const tags = args.tags;
          delete args.tags;
          console.log("args", args);
          const Useful = await ctx.prisma.useful.create({
            data: {
              tags: {
                set: [...tags],
              },
              ...args,
            },
          });
          return Useful;
        },
      });
  },
});

module.exports = {
  Mutation,
};
