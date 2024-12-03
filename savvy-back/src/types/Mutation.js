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
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const postmark = require("postmark");
const { promisify } = require("util");
const { randomBytes } = require("crypto");
const axios = require("axios");
const { YooCheckout, IGetPaymentList } = require("@a2seven/yoo-checkout");

const community_checkout = new YooCheckout({
  shopId: process.env.SHOP_ID_IP,
  secretKey: process.env.SHOP_KEY_IP,
});

const ClientEmail = require("../emails/ClientEmail");
const WelcomeEmail = require("../emails/Welcome");
const WelcomeEmailEng = require("../emails/WelcomeEng");

const PurchaseEmail = require("../emails/Purchase");
const GeneralEmail = require("../emails/GeneralEmail");
const GenericEmail = require("../emails/Generic");
const Template = require("../emails/Template");
const FollowUpEmailOne = require("../emails/FollowUpEmailOne");
const BusinessEmail2 = require("../emails/BusinessEmailTop");

const NextWeekEmail = require("../emails/nextWeek");
const CommentEmail = require("../emails/Comment");
// const ConfEmail = require("../emails/Conf");
const { argsToArgsConfig } = require("graphql/type/definition");

const client = new postmark.ServerClient(process.env.MAIL_TOKEN);

const qrcode = require("qrcode-terminal");

async function getMessageOpens(serverToken, messageID) {
  try {
    const response = await axios.get(
      `https://api.postmarkapp.com/messages/outbound/opens`,
      {
        headers: {
          "X-Postmark-Server-Token": serverToken,
          Accept: "application/json",
        },
        params: {
          messageID: messageID,
          count: 1, // Add the 'count' parameter
          offset: 0,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching message opens:", error);
  }
}

const { exists } = require("fs");
const { Dialogue, ChatResult } = require("./Results");
const { Renewals } = require("./User");
const { text } = require("body-parser");

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
        referal: stringArg(),
        status: arg({
          type: "Status", // name should match the name you provided
        }),
        uniID: stringArg(),
        careerTrackID: stringArg(),
        company: stringArg(),
        traffic_sources: arg({
          type: "Visits",
        }),
      },
      resolve: async (
        _,
        {
          name,
          surname,
          email,
          number,
          password,
          status,
          country,
          traffic_sources,
          referal,
        },
        ctx
      ) => {
        const hashed_password = await bcrypt.hash(password, 10);
        const valid = await bcrypt.compare(password, hashed_password);

        const our_user = await ctx.prisma.user.findUnique({
          where: { email: email.toLowerCase() },
        });
        if (our_user) {
          throw new Error(
            `User with this email already exists. Please sign in or register.`
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
            referal: referal,
            // uni: { connect: { id: uniID } },
            // company: { connect: { id: company } },
            // careerTrack: { connect: { id: careerTrackID } },
            isFamiliar: true,
            status: status,
            traffic_sources: traffic_sources,
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
        // if (
        //   country == null ||
        //   country.toLowerCase() == "ru" ||
        //   country.toLowerCase() == "kz" ||
        //   country.toLowerCase() == "by" ||
        //   country.toLowerCase() == "am" ||
        //   country.toLowerCase() == "tj" ||
        //   country.toLowerCase() == "uz"
        // ) {
        //   const newEmailRus = await client.sendEmail({
        //     From: "Mikhail@besavvy.app",
        //     To: email,
        //     Subject: "Расскажу о возможностях BeSavvy",
        //     HtmlBody: WelcomeEmail.WelcomeEmail(name, password, email),
        //   });
        // } else {
        const newEmailEng = await client.sendEmail({
          From: "Mike@besavvy.app",
          To: email,
          Subject: "Hello from BeSavvy",
          HtmlBody: WelcomeEmailEng.WelcomeEmailEng(name, password, email),
        });
        // }

        if (referal) {
          const old_user = await ctx.prisma.user.findUnique({
            where: { id: referal },
          });

          const updated_user = await ctx.prisma.user.update({
            data: {
              score: old_user.score + 100,
            },
            where: {
              id: referal,
            },
          });
        }

        return { user, token };
      },
    });
    t.field("singleSignup", {
      type: "AuthPayload",
      args: {
        name: stringArg(),
        surname: stringArg(),
        email: stringArg(),
        password: stringArg(),
        isFamiliar: booleanArg(),
        image: stringArg(),
      },
      resolve: async (_, { name, surname, email, password, image }, ctx) => {
        const hashed_password = await bcrypt.hash(password, 10);
        const our_user = await ctx.prisma.user.findUnique({
          where: { email: email.toLowerCase() },
        });
        if (our_user) {
          throw new Error(
            `User with this email already exists. Please sign in.`
          );
        }

        const user = await ctx.prisma.user.create({
          data: {
            name,
            surname,
            email: email.toLowerCase(),
            permissions: { set: ["USER"] },
            password: hashed_password,
            authType: "google",
            image: image,
            isFamiliar: true,
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

        const newEmailEng = await client.sendEmail({
          From: "Mike@besavvy.app",
          To: email,
          Subject: "Hello from BeSavvy",
          HtmlBody: WelcomeEmailEng.WelcomeEmailEng(name, password, email),
        });

        return { user, token };
      },
    });
    t.field("botSignup", {
      type: "AuthPayload",
      args: {
        name: stringArg(),
        surname: stringArg(),
        email: stringArg(),
        password: stringArg(),
        number: stringArg(),
      },
      resolve: async (_, { name, email, password, number, surname }, ctx) => {
        const hashed_password = await bcrypt.hash(password, 10);
        const valid = await bcrypt.compare(password, hashed_password);

        const our_user = await ctx.prisma.user.findUnique({
          where: { email: email.toLowerCase() },
        });
        if (our_user) {
          return { user: { id: "exists" }, token: "exists" };
        }

        const user = await ctx.prisma.user.create({
          data: {
            name,
            surname,
            number,
            email: email.toLowerCase(),
            permissions: { set: ["USER"] },
            password: hashed_password,
            isFamiliar: true,
            tags: { set: ["wealthbrite"] },
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
        return { user };
      },
    });
    t.field("advancedSignup", {
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
        traffic_sources: arg({
          type: "Visits",
        }),
      },
      resolve: async (
        _,
        {
          name,
          surname,
          email,
          number,
          password,
          status,
          country,
          traffic_sources,
        },
        ctx
      ) => {
        const hashed_password = await bcrypt.hash(password, 10);
        const valid = await bcrypt.compare(password, hashed_password);

        const our_user = await ctx.prisma.user.findUnique({
          where: { email: email.toLowerCase() },
        });
        if (our_user) {
          let token = jwt.sign(
            { userId: our_user.id },
            process.env.APP_SECRET,
            {
              expiresIn: 1000 * 60 * 60 * 24 * 365,
            }
          );
          let user = our_user;
          return { token, user };
        } else {
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
              traffic_sources: traffic_sources,
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
          // if (
          //   country.toLowerCase() == "ru" ||
          //   country.toLowerCase() == "kz" ||
          //   country.toLowerCase() == "by" ||
          //   country.toLowerCase() == "am" ||
          //   country.toLowerCase() == "tj" ||
          //   country.toLowerCase() == "uz"
          // ) {
          //   const newEmailRus = await client.sendEmail({
          //     From: "Mikhail@besavvy.app",
          //     To: email,
          //     Subject: "Расскажу о возможностях BeSavvy",
          //     HtmlBody: WelcomeEmail.WelcomeEmail(name, password, email),
          //   });
          // } else {
          const newEmailEng = await client.sendEmail({
            From: "Mikhail@besavvy.app",
            To: email,
            Subject: "Hello from BeSavvy",
            HtmlBody: WelcomeEmailEng.WelcomeEmailEng(name, password, email),
          });
          // }

          return { user, token };
        }
      },
    });
    t.field("signin", {
      type: "AuthPayload",
      args: {
        email: stringArg(),
        password: stringArg(),
        traffic_sources: arg({
          type: "Visits",
        }),
      },
      resolve: async (_, { email, password, traffic_sources }, ctx) => {
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
        let new_traffic_sources = [];
        if (user.traffic_sources === null) {
          new_traffic_sources = traffic_sources;
        } else if (traffic_sources && traffic_sources.visitsList.length > 0) {
          new_traffic_sources = {
            visitsList: traffic_sources.visitsList.concat(
              user.traffic_sources.visitsList
            ),
          };
        }

        const updated_user = await ctx.prisma.user.update({
          data: {
            traffic_sources: new_traffic_sources,
          },
          where: {
            email: low_email,
          },
        });
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
    t.field("singleSignin", {
      type: "AuthPayload",
      args: {
        email: stringArg(),
        // password: stringArg(),
        // traffic_sources: arg({
        //   type: "Visits",
        // }),
      },
      resolve: async (_, { email }, ctx) => {
        // 1. check if there is a user with that email
        const low_email = email.toLowerCase();
        const user = await ctx.prisma.user.findUnique({
          where: { email: low_email },
        });

        if (!user) {
          throw new Error(`No such user found for email ${email}`);
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

    t.field("createTeam", {
      type: "Team",
      args: {
        name: stringArg(),
      },
      resolve: async (_, { name }, ctx) => {
        const team = await ctx.prisma.team.create({
          data: {
            name,
            founder: {
              connect: {
                id: ctx.res.req.userId,
              },
            },
            users: {
              connect: {
                id: ctx.res.req.userId,
              },
            },
          },
        });

        return team;
      },
    });

    t.field("addToTeam", {
      type: "User",
      args: {
        id: stringArg(),
      },
      resolve: async (_, { id }, ctx) => {
        const user = await ctx.prisma.user.update({
          data: {
            myTeams: {
              connect: {
                id: id,
              },
            },
          },
          where: {
            id: ctx.res.req.userId,
          },
        });
        return user;
      },
    });

    t.field("recordSession", {
      type: "User",
      args: {
        id: stringArg(),
        traffic_sources: arg({
          type: "Visits",
        }),
      },
      resolve: async (_, { id, traffic_sources }, ctx) => {
        const user = await ctx.prisma.user.findUnique({
          where: { id: id },
        });

        let new_traffic_sources = [];

        if (user.traffic_sources === null) {
          new_traffic_sources = traffic_sources;
        } else {
          // Concatenate new traffic sources with existing ones
          new_traffic_sources = {
            visitsList: user.traffic_sources.visitsList.concat(
              traffic_sources.visitsList
            ),
          };

          // Limit the total number of traffic sources to 30
          if (new_traffic_sources.visitsList.length > 30) {
            // Trim the new traffic sources to 30 most recent ones
            new_traffic_sources.visitsList =
              new_traffic_sources.visitsList.slice(
                Math.max(new_traffic_sources.visitsList.length - 30, 0)
              );
          }
        }

        const updated_user = await ctx.prisma.user.update({
          data: {
            traffic_sources: new_traffic_sources,
          },
          where: {
            id: id,
          },
        });

        return updated_user;
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
        active: booleanArg(),
        description: stringArg(),
        work: stringArg(),
        comment: stringArg(),
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
    t.field("updateActiveUser", {
      type: "User",
      args: {
        email: stringArg(),
        active: booleanArg(),
      },
      resolve: async (_, { email, active }, ctx) => {
        const user = await ctx.prisma.user.update({
          data: {
            active: active,
          },
          where: {
            email: email,
          },
        });
        return user;
      },
    });
    t.field("updateScore", {
      type: "User",
      args: {
        id: stringArg(),
        score: intArg(),
      },
      resolve: async (_, { id, score }, ctx) => {
        const user = await ctx.prisma.user.findUnique({
          where: { id: id },
        });

        const updated_user = await ctx.prisma.user.update({
          data: {
            score: user.score + score,
          },
          where: {
            id: id,
          },
        });
        return updated_user;
      },
    });
    t.field("createEmailReminder", {
      type: "EmailReminder",
      args: {
        userId: stringArg(),
        coursePageId: stringArg(),
        emailCampaignId: stringArg(),
        link: stringArg(),
        gap: intArg(),
      },
      resolve: async (_, args, ctx) => {
        const emailReminder = await ctx.prisma.emailReminder.create({
          data: {
            user: {
              connect: {
                id: args.userId,
              },
            },
            coursePage: {
              connect: {
                id: args.coursePageId,
              },
            },
            emailCampaign: {
              connect: {
                id: args.emailCampaignId,
              },
            },
            link: args.link,
            gap: args.gap,
            sendAt: new Date("2023-04-31T09:29:35.723Z"),
          },
        });

        return emailReminder;
      },
    });
    t.field("updateEmailReminder", {
      type: "EmailReminder",
      args: {
        id: stringArg(),
        emailsSent: list(stringArg()),
      },
      resolve: async (_, args, ctx) => {
        const emailReminder = await ctx.prisma.emailReminder.update({
          where: {
            id: args.id,
          },
          data: {
            emailsSent: {
              set: [...args.emailsSent],
            },
          },
        });

        const theEmailReminder = await ctx.prisma.emailReminder.findUnique({
          where: { id: args.id },
        });

        const theEmailCampaign = await ctx.prisma.emailCampaign.findUnique({
          where: { id: theEmailReminder.emailCampaignId },
        });

        const our_user = await ctx.prisma.user.findUnique({
          where: { id: theEmailReminder.userId },
        });

        let our_email =
          theEmailCampaign.emails.emails[args.emailsSent.length - 1];

        const SendGenericEmail = await client.sendEmail({
          From: "Mikhail@besavvy.app",
          To: our_user.email,
          Subject: `${our_email.header}`,
          HtmlBody: GenericEmail.GenericEmail(our_email.text),
          Tag: "funnel_email",
        });

        return emailReminder;
        // return null;
      },
    });
    //   type: "EmailReminder",
    //   args: {
    //     id: stringArg(),
    //   },
    //   resolve: async (_, args, ctx) => {
    //     const emailReminder = await ctx.prisma.emailReminder.findUnique({
    //       where: { id: args.id },
    //       include: { user: { select: { id: true, email: true } } },
    //     });

    //     const fetchSentEmails = async (email) => {
    //       const url = "https://api.postmarkapp.com/messages/outbound";
    //       const fromDate = new Date();
    //       fromDate.setDate(fromDate.getDate() - 7);

    //       try {
    //         const response = await axios.get(url, {
    //           params: {
    //             recipient: email,
    //             fromdate: fromDate.toISOString(),
    //             count: 50,
    //             offset: 0,
    //           },
    //           headers: {
    //             "X-Postmark-Server-Token": process.env.MAIL_TOKEN,
    //             "Content-Type": "application/json",
    //           },
    //         });

    //         const sentEmails = response.data.Messages.map(async (message) => {
    //           const opensData = await getMessageOpens(
    //             process.env.MAIL_TOKEN,
    //             message.MessageID
    //           );
    //           const opened = opensData.TotalCount > 0;

    //           return {
    //             id: message.MessageID,
    //             subject: message.Subject,
    //             status: message.Status,
    //             receivedAt: message.ReceivedAt,
    //             opened: opened,
    //           };
    //         });

    //         return await Promise.all(sentEmails);
    //       } catch (error) {
    //         console.error("Error fetching sent emails:", error);
    //         return [];
    //       }
    //     };

    //     const sentEmails = await fetchSentEmails(emailReminder.user.email);
    //     console.log("sentEmails", sentEmails);

    //     const emailReminderWithSentEmails = {
    //       ...emailReminder,
    //       user: {
    //         ...emailReminder.user,
    //         sentEmails,
    //       },
    //     };

    //     return emailReminderWithSentEmails;
    //   },
    // });
    t.field("deleteEmailReminder", {
      type: "EmailReminder",
      args: {
        id: stringArg(),
      },
      resolve: async (_, args, ctx) => {
        const where = { id: args.id };
        return ctx.prisma.emailReminder.delete({ where });
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

    t.field("addUserToCourse", {
      type: "User",
      args: {
        coursePageId: stringArg(),
        email: stringArg(),
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
            email: args.email,
          },
        });
        const courseVisits = await ctx.prisma.courseVisit.findMany(
          {
            where: {
              student: { email: { equals: args.email } },
              coursePage: { id: { equals: coursePageId } },
            },
          },
          `{ student { id, name, email } }`
        );
        if (courseVisits.length === 0) {
          const CourseVisit = await ctx.prisma.courseVisit.create({
            data: {
              student: {
                connect: { email: args.email },
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
    t.field("unenrollFromCourse", {
      type: "User",
      args: {
        coursePageId: stringArg(),
        id: stringArg(),
      },
      resolve: async (_, args, ctx) => {
        const coursePageId = args.coursePageId;
        delete args.coursePageId;
        const unenrolledUser = await ctx.prisma.user.update({
          data: {
            new_subjects: {
              disconnect: { id: coursePageId },
            },
          },
          where: {
            id: args.id,
          },
        });

        return unenrolledUser;
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
        promotionId: stringArg(),
        audience: stringArg(),
        result: stringArg(),
        months: intArg(),
        syllabus: arg({
          type: "Syllabus",
        }),
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
        reviews: arg({
          type: "ReviewsList",
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
            const updatedText = replaceElementIds(
              texteditor.text,
              newIdMapping
            );

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
          type: "ReviewsList",
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
          type: "LessonStructure",
        }),
        short_structure: arg({
          type: "LessonStructure",
        }),
        tags: list(stringArg()),
      },
      resolve: async (_, args, ctx) => {
        const updates = { ...args };
        delete updates.id;
        delete updates.tags;
        if (args.tags) {
          const updatedLesson = await ctx.prisma.lesson.update({
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
          return updatedLesson;
        } else {
          const updatedLesson2 = await ctx.prisma.lesson.update({
            data: {
              ...updates,
            },
            where: {
              id: args.id,
            },
          });
          return updatedLesson2;
        }
      },
    });
    t.field("createNewTest", {
      type: "NewTest",
      args: {
        lessonId: stringArg(),
        answers: list(stringArg()),
        complexTestAnswers: arg({
          type: "ComplexTestAnswers",
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
        const newTP = await ctx.prisma.testPractice.create({ data: new_data });
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
          type: "ComplexTestAnswers",
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
          type: "ComplexAnswer",
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
          type: "ComplexAnswer",
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
          type: "QuizIdeas",
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
    t.field("createOffer", {
      type: "Offer",
      args: {
        lessonId: stringArg(),
        header: stringArg(),
        text: stringArg(),
        type: stringArg(),
        courseId: stringArg(),
        price: intArg(),
        discountPrice: intArg(),
      },
      resolve: async (_, args, ctx) => {
        const lessonId = args.lessonId;
        delete args.lessonId;
        const Offer = await ctx.prisma.offer.create({
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

        return Offer;
      },
    });

    t.field("updateOffer", {
      type: "Offer",
      args: {
        id: stringArg(),
        header: stringArg(),
        text: stringArg(),
        type: stringArg(),
        courseId: stringArg(),
        price: intArg(),
        discountPrice: intArg(),
      },
      resolve: async (_, args, ctx) => {
        const { id, ...otherArgs } = args;
        let updateData = { ...otherArgs };

        const updatedOffer = await ctx.prisma.offer.update({
          where: { id },
          data: updateData,
        });

        return updatedOffer;
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
        name: stringArg(),
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
        type: stringArg(),
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
        type: stringArg(),
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
            lessonID: lessonId,
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
        goal: stringArg(),
        context: stringArg(),
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
        answers: arg({
          type: "ConstructionAnswers",
        }),
        attempts: intArg(),
        constructionId: stringArg(),
        lessonId: stringArg(),
        goal: stringArg(),
        elements: arg({
          type: "ElementsList",
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
          type: "ElementsList",
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
    t.field("createProblem", {
      type: "Problem",
      args: {
        lessonId: stringArg(),
        name: stringArg(),
        text: stringArg(),
        goal: stringArg(),
        steps: arg({
          type: "ProblemStructure",
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
        steps: arg({
          type: "ProblemStructure",
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

        console.log("order", order.user.email);

        // 2. check at yookassa if any order is paid
        if (order.paymentID) {
          const payment = await community_checkout.getPayment(order.paymentID);
          console.log("payment 1", payment);

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

        const number_details = await wa_client.getNumberId(number); // get mobile number details

        if (number_details) {
          const sendMessageData = await wa_client.sendMessage(
            number_details._serialized,
            comment
          ); // send message
          console.log(number, "Success");
        } else {
          console.log(number, "Mobile number is not registered");
        }
        const bclient = await ctx.prisma.businessClient.update({
          where: { id },
          data: {
            comment,
          },
        });

        return bclient;
      },
    });
    t.field("textUser", {
      type: "User",
      args: {
        comment: stringArg(),
        id: stringArg(),
      },
      resolve: async (_, { comment, id }, ctx) => {
        const my_client = await ctx.prisma.user.findUnique({
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

        const number_details = await wa_client.getNumberId(number); // get mobile number details

        if (number_details) {
          const sendMessageData = await wa_client.sendMessage(
            number_details._serialized,
            comment
          ); // send message
          console.log(number, "Success");
        } else {
          console.log(number, "Mobile number is not registered");
        }
        // const bclient = await ctx.prisma.businessClient.update({
        //   where: { id },
        //   data: {
        //     comment,
        //   },
        // });

        return my_client;
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
          type: "ClientMessages",
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
    t.field("createBusinessClient", {
      type: "User",
      args: {
        name: stringArg(),
        surname: stringArg(),
        email: stringArg(),
        number: stringArg(),
        country: stringArg(),
        source: stringArg(),
        comment: stringArg(),
        type: stringArg(),
        sales_cycle: arg({
          type: "SalesCycle",
        }),
        // communication_history: arg({
        //   type: "ClientMessages",
        // }),
        // communication_medium: stringArg(),
        coursePageId: stringArg(),
      },
      resolve: async (_, args, ctx) => {
        const coursePageId = args.coursePageId;
        delete args.coursePageId;
        let new_client;
        if (coursePageId) {
          new_client = await ctx.prisma.businessClient.create({
            data: {
              coursePage: {
                connect: { id: coursePageId },
              },
              ...args,
            },
          });
        } else {
          new_client = await ctx.prisma.businessClient.create({
            data: {
              ...args,
            },
          });
        }

        // if (args.comment == "consult") {
        // const newEmail = await client.sendEmail({
        //   From: "Mikhail@besavvy.app",
        //   To: "Mikhail@besavvy.app",
        //   Subject: "Новая заявка на курс",
        //   Tag: "internal_business_email",
        //   HtmlBody: makeANiceEmail(
        //     `Новая заявка на курс. Вот данные: ${args.name}, ${args.email}, ${args.number}`
        //   ),
        // });
        // }

        return new_client;
      },
    }),
      t.field("updateBusinessClient", {
        type: "BusinessClient",
        args: {
          id: stringArg(),
          comment: stringArg(),
          number: stringArg(),
          tags: list(stringArg()),
          sales_cycle: arg({
            type: "SalesCycle",
          }),
          communication_history: arg({
            type: "ClientMessages",
          }),
        },
        resolve: async (
          _,
          { comment, tags, id, sales_cycle, communication_history },
          ctx
        ) => {
          const bclient = await ctx.prisma.businessClient.update({
            where: { id },
            data: {
              tags: {
                set: [...tags],
              },
              comment,
              sales_cycle,
              communication_history,
            },
          });

          return bclient;
        },
      }),
      t.field("deleteClient", {
        type: "BusinessClient",
        args: {
          id: stringArg(),
        },
        resolve: async (_, args, ctx) => {
          const where = { id: args.id };
          return ctx.prisma.businessClient.delete({ where });
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
          Subject: "Change password",
          HtmlBody: makeANiceEmail(`This is your link to change the password
                  \n\n
                  <a href="${process.env.FRONTEND_URL7}/reset?resetToken=${resetToken}">Press here and get back your account!</a>`),
        });
        // 4. Return the message
        return { message: "Thanks!" };
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
      }),
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
      }),
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
    t.field("createEmailCampaign", {
      type: "EmailCampaign",
      args: {
        content: stringArg(),
        name: stringArg(),
        emails: arg({ type: "EmailsList" }),
      },
      resolve: async (_, args, ctx) => {
        const emailCampaign = await ctx.prisma.emailCampaign.create({
          data: {
            ...args,
          },
        });
        return emailCampaign;
      },
    });

    t.field("deleteEmailCampaign", {
      type: "EmailCampaign",
      args: {
        id: stringArg(),
      },
      resolve: async (_, args, ctx) => {
        const where = { id: args.id };
        return ctx.prisma.emailCampaign.delete({ where });
      },
    });

    t.field("updateEmailCampaign", {
      type: "EmailCampaign",
      args: {
        id: stringArg(),
        content: stringArg(),
        name: stringArg(),
        emails: arg({ type: "EmailsList" }),
      },
      resolve: async (_, { id, content, emails, name }, ctx) => {
        const updatedEmailCampaign = await ctx.prisma.emailCampaign.update({
          where: { id },
          data: {
            content,
            emails,
            name,
          },
        });
        return updatedEmailCampaign;
      },
    });

    t.field("createUserLevel", {
      type: "UserLevel",
      args: {
        level: floatArg(),
        consumedContent: arg({
          type: "ConsumedContentList",
        }),
        myProgress: arg({
          type: "MyProgressList",
        }),
        isProgressPublic: booleanArg(),
      },
      resolve: async (_, args, ctx) => {
        return ctx.prisma.userLevel.create({ data: args });
      },
    });

    t.field("deleteUserLevel", {
      type: "UserLevel",
      args: {
        id: stringArg(),
      },
      resolve: async (_, { id }, ctx) => {
        return ctx.prisma.userLevel.delete({ where: { id } });
      },
    });

    t.field("updateUserLevel", {
      type: "UserLevel",
      args: {
        id: stringArg(),
        level: floatArg(),
        consumedContent: arg({
          type: "ConsumedContentList",
        }),
        myProgress: arg({
          type: "MyProgressList",
        }),
        isProgressPublic: booleanArg(),
        learningStreak: list(
          arg({
            type: "DateTime", // Make sure you have a DateTimeList type defined
          })
        ),
      },
      resolve: async (_, { id, ...args }, ctx) => {
        return ctx.prisma.userLevel.update({ where: { id }, data: args });
      },
    });

    t.field("createGrowthArea", {
      type: "GrowthArea",
      args: {
        name: nonNull(stringArg()),
        maxProgress: intArg(),
        marks: arg({
          type: "MarksList",
        }),
      },
      resolve: async (_, args, ctx) => {
        return ctx.prisma.growthArea.create({ data: args });
      },
    });

    t.field("deleteGrowthArea", {
      type: "GrowthArea",
      args: {
        id: nonNull(stringArg()),
      },
      resolve: async (_, { id }, ctx) => {
        return ctx.prisma.growthArea.delete({ where: { id } });
      },
    });

    t.field("updateGrowthArea", {
      type: "GrowthArea",
      args: {
        id: nonNull(stringArg()),
        name: stringArg(),
        maxProgress: intArg(),
        marks: arg({
          type: "MarksList",
        }),
      },
      resolve: async (_, { id, ...args }, ctx) => {
        return ctx.prisma.growthArea.update({ where: { id }, data: args });
      },
    });
    t.field("createSubscription", {
      type: "Subscription",
      args: {
        type: stringArg(),
        startDate: arg({
          type: "DateTime",
        }),
        endDate: arg({
          type: "DateTime",
        }),
        paymentID: stringArg(),
        userId: stringArg(),
        term: stringArg(),
      },
      resolve: async (_, args, ctx) => {
        const userId = args.userId;
        delete args.userId;
        const Sub = await ctx.prisma.subscription.create({
          data: {
            user: {
              connect: {
                id: userId,
              },
            },
            ...args,
          },
        });
        return Sub;
      },
    });
    t.field("updateSubscription", {
      type: "Subscription",
      args: {
        id: stringArg(),
        type: stringArg(),
        isActive: booleanArg(),
        endDate: arg({
          type: "DateTime",
        }),
        term: stringArg(),
        paymentID: stringArg(),
        renewals: arg({
          type: "Renewals",
        }),
      },
      resolve: async (_, args, ctx) => {
        const subscriptionId = args.id;
        delete args.id;
        return ctx.prisma.subscription.update({
          where: { id: subscriptionId },
          data: args,
        });
      },
    });
    t.field("cancelSubscription", {
      type: "Subscription",
      args: {
        id: stringArg(),
      },
      resolve: async (_, args, ctx) => {
        return ctx.prisma.subscription.update({
          where: { id: args.id },
          data: {
            isActive: false,
          },
        });
      },
    });
    t.field("createReferral", {
      type: "Referral",
      args: {
        referrerId: stringArg(),
      },
      resolve: async (_, args, ctx) => {
        const Referral = await ctx.prisma.referral.create({
          data: {
            referrer: {
              connect: { id: args.referrerId },
            },
            referee: { connect: { id: ctx.res.req.userId } },
            isCounted: false,
            isPaid: false,
          },
        });
        return Referral;
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
        });
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
          data: { text: args.text, status: args.status },
        });
      },
    });
  },
});

module.exports = {
  Mutation,
};
