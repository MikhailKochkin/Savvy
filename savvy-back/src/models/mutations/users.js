const { list, intArg, floatArg, booleanArg, stringArg, arg } = require("nexus");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const postmark = require("postmark");
const { promisify } = require("util");
const { randomBytes } = require("crypto");

const WelcomeEmailEng = require("../../emails/WelcomeEng");

const client = new postmark.ServerClient(process.env.MAIL_TOKEN);

const makeANiceEmail = (text) => `
  <div className="email" style="
    padding: 20px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 20px;
  ">
    <h2>Hi!</h2>
    <p>Let me help you.</p>
    <p>${text}</p>
    <p>Mike from BeSavvy</p>
  </div>
`;

function userMutations(t) {
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

      // const UserLevel = await ctx.prisma.userLevel.create({
      //   data: {
      //     user: {
      //       connect: { id: user.id },
      //     },
      //     level: 1,
      //   },
      // });

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
        throw new Error(`User with this email already exists. Please sign in.`);
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

      // const UserLevel = await ctx.prisma.userLevel.create({
      //   data: {
      //     user: {
      //       connect: { id: user.id },
      //     },
      //     level: 1,
      //   },
      // });

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

      // const UserLevel = await ctx.prisma.userLevel.create({
      //   data: {
      //     user: {
      //       connect: { id: user.id },
      //     },
      //     level: 1,
      //   },
      // });
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
        let token = jwt.sign({ userId: our_user.id }, process.env.APP_SECRET, {
          expiresIn: 1000 * 60 * 60 * 24 * 365,
        });
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

        // const UserLevel = await ctx.prisma.userLevel.create({
        //   data: {
        //     user: {
        //       connect: { id: user.id },
        //     },
        //     level: 1,
        //   },
        // });

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
  t.field("signout", {
    type: "SignOut",
    resolve: async (_, args, ctx) => {
      ctx.res.clearCookie("token");
      return { message: "Goodbye!" };
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
        From: "Mike@besavvy.app",
        To: user.email,
        Subject: "Change password",
        HtmlBody: makeANiceEmail(`This is your link to change the password
                      \n\n
                      <a href="${process.env.FRONTEND_URL7}/reset?resetToken=${resetToken}">Press here and get back your account!</a>`),
      });
      // 4. Return the message
      return { message: "Thanks!" };
    },
  });
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
            set: args.tags ? [...args.tags] : [],
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
          new_traffic_sources.visitsList = new_traffic_sources.visitsList.slice(
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
  }),
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
  t.field("addCoAuthor", {
    type: "User",
    args: {
      coursePageId: stringArg(),
      email: stringArg(),
    },
    resolve: async (_, args, ctx) => {
      const coursePageId = args.coursePageId;
      delete args.coursePageId;
      const NewAuthor = await ctx.prisma.user.update({
        data: {
          co_coursePages: {
            connect: { id: coursePageId },
          },
        },
        where: {
          email: args.email,
        },
      });
      return NewAuthor;
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
  t.field("createBusinessClient", {
    type: "BusinessClient",
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
  });
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
        type: "CommunicationHistoryInput",
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
}

module.exports = { userMutations };
