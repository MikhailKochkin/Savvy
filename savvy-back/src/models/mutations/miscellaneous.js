const { list, intArg, booleanArg, stringArg, arg } = require("nexus");
const postmark = require("postmark");
const { YooCheckout, IGetPaymentList } = require("@a2seven/yoo-checkout");

const community_checkout = new YooCheckout({
  shopId: process.env.SHOP_ID_IP,
  secretKey: process.env.SHOP_KEY_IP,
});

const ClientEmail = require("../../emails/ClientEmail");

const PurchaseEmail = require("../../emails/Purchase");
const GeneralEmail = require("../../emails/GeneralEmail");
const GenericEmail = require("../../emails/Generic");
const FollowUpEmailOne = require("../../emails/FollowUpEmailOne");
const BusinessEmail2 = require("../../emails/BusinessEmailTop");

const NextWeekEmail = require("../../emails/nextWeek");

const client = new postmark.ServerClient(process.env.MAIL_TOKEN);

const newOrderEmail = (client, surname, email, course, price, comment) => `
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
    <p>Комментарий: ${comment} </p>
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

function miscellaneousMutations(t) {
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
        save_payment_method: true,
        receipt: {
          customer: {
            email: user.email,
          },
          items: [
            {
              description: coursePage?.title
                ? coursePage.title
                : "BeSavvy Plus",
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
          return_url: `https://besavvy.app/onboarding?id=${coursePage?.id}`,
        },
        capture: true,
      };

      const payment = await community_checkout.createPayment(createPayload);

      const url = payment.confirmation.confirmation_url;
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
            connect: {
              id: "clwl0no8h00002xuxtmyq8778",
            },
          },
        },
      });

      // 3.

      const newOrderMail = await client.sendEmail({
        From: "Mikhail@besavvy.app",
        To: "Mi.Kochkin@ya.ru",
        Subject: "Новый клиент",
        Tag: "internal_business_email",
        HtmlBody: newOrderEmail(
          user.name,
          user.surname,
          user.email,
          coursePage?.title ? coursePage.title : "BeSavvy Plus",
          args.price,
          args.comment
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
        Tag: "internal_business_email",
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

      const order = await ctx.prisma.order.findUnique({
        where: { id: args.id },
        include: {
          user: true,
          coursePage: true,
        },
      });
      console.log("order", order.paymentID);
      // 2. check at yookassa if any order is paid
      if (order.paymentID) {
        console.log("community_checkout", community_checkout);
        try {
          const payment = await community_checkout.getPayment(order.paymentID);
          console.log("payment", payment);
        } catch (error) {
          console.error("Error from getPayment:", error);
          // Possibly handle or rethrow with a normalized error message
        }
        console.log("payment", payment);
        const createPayload = {
          amount: {
            value: "1990.00",
            currency: "RUB",
          },
          payment_method_id: payment.payment_method.id,
          receipt: {
            customer: {
              email: order.user.email,
            },
            items: [
              {
                description: "BeSavvy Plus",
                quantity: "1",
                amount: {
                  value: "1990.00",
                  currency: "RUB",
                },
                vat_code: 1,
              },
            ],
          },
          capture: true,
        };

        // Log the payload
        console.log("createPayload", JSON.stringify(createPayload, null, 2));

        try {
          const newPayment = await community_checkout.createPayment(
            createPayload
          );
          console.log("newPayment", newPayment);
        } catch (error) {
          console.error("Error creating new payment:", error.message, error);
        }

        const payment2 = await community_checkout.getPayment(
          payment.payment_method.id
        );
        console.log("payment2", payment2);
      }
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
  t.field("sendBusinessEmail", {
    type: "User",
    args: {
      name: stringArg(),
      email: stringArg(),
      firm: stringArg(),
      subject: stringArg(),
      personalTouch: stringArg(),
      connection: stringArg(),
      type: stringArg(),
    },
    resolve: async (
      _,
      { name, email, firm, subject, personalTouch, connection, type },
      ctx
    ) => {
      if (type == "follow_up_1") {
        const newEmail2 = await client.sendEmail({
          From: '"Mike Kochkin, CEO of BeSavvy" <Mike@besavvy.app>',
          To: email,
          Subject: subject,
          HtmlBody: FollowUpEmailOne.FollowUpEmailOne(name, connection),
          MessageStream: "international-law-firms",
        });
      } else if (type == "internal") {
        const newEmail1 = await client.sendEmail({
          From: '"Mike Kochkin" <Mike@besavvy.app>',
          To: email,
          Subject: subject,
          HtmlBody: GeneralEmail.GeneralEmail(name, connection),
          MessageStream: "outbound",
        });
      } else {
        const newEmail3 = await client.sendEmail({
          From: '"Mike Kochkin, CEO of BeSavvy" <Mike@besavvy.app>',
          To: email,
          Subject: subject,
          HtmlBody: BusinessEmail2.BusinessEmail2(name, connection, firm),
          MessageStream: "international-law-firms",
        });
      }
      return { name: name };
    },
  });
  t.field("sendWelcomeEmail", {
    type: "CoursePage",
    args: {
      name: stringArg(),
      email: stringArg(),
      courseId: stringArg(),
    },
    resolve: async (_, { name, email, courseId }, ctx) => {
      const course = await ctx.prisma.coursePage.findUnique({
        where: { id: courseId },
      });

      const NextWeek = await client.sendEmail({
        From: "Mikhail@besavvy.app",
        To: email,
        Subject: "Привет от директора BeSavvy 😁",
        HtmlBody: NextWeekEmail.NextWeekEmail(
          name,
          `<p>Это Миша, основатель BeSavvy.</p>
                    <p>Рад приветствовать тебя среди участников курса "${course.title}".</p>
                    <p>Главное, запомни, что ты занимаешься не в одиночку. Я всегда буду рад помочь тебе с любым учебным или техническим вопросом. </p>
                    <p>Со мной можно связаться, написав в наше сообщество в ТГ или ответив на это письмо.</p>
                    <p><a href="https://t.me/+ZKc7m_C8TslkNTEy" target="_blank">Вот ссылка</a> на наше сообщество по английскому и <a href="https://t.me/+gmqzbUWeqlc5N2Qy" target="_blank">ссылка</a> на наше карьерное сообщество.</p>
              `,
          course.title,
          courseId
        ),
      });
      return course;
    },
  });
  t.field("sendClientEmail", {
    type: "User",
    args: {
      name: stringArg(),
      email: stringArg(),
      firm: stringArg(),
      subject: stringArg(),
      personalTouch: stringArg(),
      connection: stringArg(),
      type: stringArg(),
    },
    resolve: async (
      _,
      { name, email, firm, subject, personalTouch, connection, type },
      ctx
    ) => {
      const newEmail2 = await client.sendEmail({
        From: '"Михаил Кочкин из BeSavvy" <Mikhail@besavvy.app>',
        To: email,
        Subject: subject,
        HtmlBody: ClientEmail.ClientEmail(name, connection),
        MessageStream: "broadcast",
      });
      return { name: name };
    },
  });
  t.field("sendBusinessClientEmail", {
    type: "BusinessClient",
    args: {
      communication_history: arg({
        type: "CommunicationHistoryInput",
      }),
      id: stringArg(),
    },
    resolve: async (_, { communication_history, comment, id }, ctx) => {
      const bc = await ctx.prisma.businessClient.findUnique({
        where: { id: id },
      });

      const updated_bc = await ctx.prisma.businessClient.update({
        where: { id },
        data: {
          communication_history: communication_history,
        },
      });
      const newEmail3 = await client.sendEmail({
        From: "Mike@besavvy.app",
        To: bc.email,
        Subject:
          communication_history.messages[
            communication_history.messages.length - 1
          ].subject,
        HtmlBody: GenericEmail.GenericEmail(
          communication_history.messages[
            communication_history.messages.length - 1
          ].message
        ),
        MessageStream: "international-law-firms",
      });

      return bc;
    },
  });
  t.field("createUseful", {
    type: "Useful",
    args: {
      name: stringArg(),
      header: stringArg(),
      buttonText: stringArg(),
      image: stringArg(),
      link: stringArg(),
      tags: list(stringArg()),
    },
    resolve: async (_, args, ctx) => {
      const tags = args.tags;
      delete args.tags;
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
  t.field("createBotDialogue", {
    type: "BotDialogue",
    args: {
      journey: list(stringArg()),
      source: stringArg(),
    },
    resolve: async (_, { journey, source }, ctx) => {
      const new_data = {
        journey: {
          set: [...journey],
        },
        source: source,
      };
      const newBotDialogue = await ctx.prisma.botDialogue.create({
        data: new_data,
      });
      return newBotDialogue;
    },
  });
  t.field("updateBotDialogue", {
    type: "BotDialogue",
    args: {
      id: stringArg(),
      journey: list(stringArg()),
      rating: intArg(),
    },
    resolve: async (_, args, ctx) => {
      const updates = { ...args };
      delete updates.id;
      const updatedBotDialogue = await ctx.prisma.botDialogue.update({
        data: updates,
        where: {
          id: args.id,
        },
      });
      return updatedBotDialogue;
    },
  });
  t.field("sendMessage", {
    type: "Message",
    args: {
      userId: stringArg(),
      text: stringArg(),
      comment: stringArg(),
      subject: stringArg(),
      coursePageId: stringArg(),
      link: stringArg(),
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
        Subject: `${args.subject ? args.subject : "Hello from BeSavvy 👋🏻"}`,
        HtmlBody: GenericEmail.GenericEmail(args.text),
        Tag: "communication_email",
        MessageStream: "broadcast",
      });
      return message;
    },
  });
}

module.exports = { miscellaneousMutations };
