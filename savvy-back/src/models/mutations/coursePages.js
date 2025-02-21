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

const NextWeekEmail = require("../../emails/nextWeek");

const client = new postmark.ServerClient(process.env.MAIL_TOKEN);

function courseMutations(t) {
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
  t.field("updateCoursePage", {
    type: "CoursePage",
    args: {
      id: stringArg(),
      title: stringArg(),
      description: stringArg(),
      audience: stringArg(),
      result: stringArg(),
      promotionId: stringArg(),
      price: intArg(),
      prices: arg({
        type: "Prices",
      }),
      modules: arg({
        type: "Modules",
      }),
      discountPrice: intArg(),
      currency: stringArg(),
      news: stringArg(),
      authors: stringArg(),
      promocode: arg({
        type: "PromocodeList",
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
      reviews: arg({
        type: "ReviewsListInput",
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
  t.field("deleteCoursePage", {
    type: "CoursePage",
    args: {
      id: stringArg(),
    },
    resolve: async (_, args, ctx) => {
      const where = { id: args.id };
      const lesson = await ctx.prisma.coursePage.findUnique(
        { where },
        `{ id }`
      );
      //3. Delete it
      return ctx.prisma.coursePage.delete({
        where: {
          id: args.id,
        },
      });
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
              <p>Главное, запомни, что ты занимаешься не в одиночку. Я всегда буду рад помочь тебе с любым учебным или техническим вопросом. </p>
              <p>Со мной можно связаться, написав в наше сообщество в ТГ или ответив на это письмо.</p>
              <p><a href="https://t.me/besavvylawyer" target="_blank">Вот ссылка</a> на наше сообщество.</p>
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
  t.field("changeCourseAccessControl", {
    type: "CourseAccessControl",
    args: {
      email: stringArg(),
      coursePageId: stringArg(),
      role: arg({ type: "CourseRole" }),
      changeScope: arg({ type: "ChangeScope" }),
      areAllLessonsAccessible: booleanArg(),
      accessibleLessons: list(stringArg()),
    },
    resolve: async (_, args, ctx) => {
      const coursePageId = args.coursePageId;
      delete args.coursePageId;
      const NewAuthor = await ctx.prisma.user.findUnique({
        where: {
          email: args.email,
        },
        select: {
          id: true,
        },
      });
      const findExistingControl =
        await ctx.prisma.courseAccessControl.findFirst({
          where: {
            user: {
              id: NewAuthor.id, //NewAuthor.id,
            },
            coursePage: {
              id: coursePageId,
            },
          },
        });
      if (!findExistingControl) {
        let new_control = await ctx.prisma.courseAccessControl.create({
          data: {
            user: {
              connect: { id: NewAuthor.id },
            },
            coursePage: {
              connect: { id: coursePageId },
            },
            role: args.role,
            changeScope: args.changeScope,
            areAllLessonsAccessible: args.areAllLessonsAccessible,
            accessibleLessons: { set: args.accessibleLessons },
          },
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
        });
        return new_control;
      } else {
        let updated_control = await ctx.prisma.courseAccessControl.update({
          where: {
            id: findExistingControl.id,
          },
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
          data: {
            role: args.role,
            changeScope: args.changeScope,
            areAllLessonsAccessible: args.areAllLessonsAccessible,
            accessibleLessons: { set: args.accessibleLessons },
          },
        });
        return updated_control;
      }
    },
  });
  t.field("deleteCourseAccessControl", {
    type: "CourseAccessControl",
    args: {
      id: stringArg(),
    },
    resolve: async (_, args, ctx) => {
      return await ctx.prisma.courseAccessControl.delete({
        where: { id: args.id },
      });
    },
  });
  t.field("createCharacter", {
    type: "Character",
    args: {
      name: stringArg({ description: "Name of the character" }),
      image: stringArg({ description: "Image URL of the character" }),
      description: stringArg({
        description: "Short description of the character",
      }),
      coursePageId: stringArg({
        description: "Unique identifier of the associated course page",
      }),
    },
    resolve: async (_, args, ctx) => {
      return await ctx.prisma.character.create({
        data: {
          name: args.name,
          image: args.image,
          description: args.description,
          coursePageId: args.coursePageId,
        },
      });
    },
  });

  t.field("updateCharacter", {
    type: "Character",
    args: {
      id: stringArg({ description: "Unique identifier of the character" }),
      name: stringArg({ description: "Name of the character" }),
      image: stringArg({ description: "Image URL of the character" }),
      description: stringArg({
        description: "Short description of the character",
      }),
    },
    resolve: async (_, { id, ...updates }, ctx) => {
      return await ctx.prisma.character.update({
        where: { id },
        data: updates,
      });
    },
  });

  t.field("deleteCharacter", {
    type: "Character",
    args: {
      id: stringArg({ description: "Unique identifier of the character" }),
    },
    resolve: async (_, args, ctx) => {
      return await ctx.prisma.character.delete({
        where: { id: args.id },
      });
    },
  });
}

module.exports = { courseMutations };
