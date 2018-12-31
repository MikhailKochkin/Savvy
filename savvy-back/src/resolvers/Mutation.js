const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { hasPermission } = require("../utils");

const Mutations = {
  async createCoursePage(parent, args, ctx, info) {
    // TODO: Check if they are logged in
    if (!ctx.request.userId) {
      throw new Error('You must be logged in to do that!')
    }
    const tags = args.tags
    delete args.tags
    const coursePage = await ctx.db.mutation.createCoursePage(
        {
        data: {
            user: {
              connect: {
                id: ctx.request.userId,
              }
            },
            tags: {
              set: [...tags]
            },
            ...args
        },
    }, 
    info
  );
    return coursePage;
  },
  async createSandboxPage(parent, args, ctx, info) {
    // TODO: Check if they are logged in
    if (!ctx.request.userId) {
      throw new Error('You must be logged in to do that!')
    }
    const sandboxPage = await ctx.db.mutation.createSandboxPage(
        {
        data: {
            user: {
              connect: {
                id: ctx.request.userId,
              }
            },
            ...args
        },
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
        },
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
      },
    }, 
    info
  );
},
  async deleteSandboxPage(parent, args, ctx, info) {
    const where = { id: args.id };
    //1. find the case
    const sandboxPage = await ctx.db.query.sandboxPage({ where }, `{ id title user { id }}`);
    //2. check if they own the case or have the permissions
    const ownsSandboxPage = sandboxPage.user.id === ctx.request.userId;
    if (!ownsSandboxPage) {
        throw new Error("К сожалению, у вас нет полномочий на это.")
    }
    //3. Delete it
    return ctx.db.mutation.deleteSandboxPage({ where }, info);
  },
  async deleteCoursePage(parent, args, ctx, info) {
    const where = { id: args.id };
    //1. find the case
    const coursePage = await ctx.db.query.coursePage({ where }, `{ id title user { id }}`);
    //2. check if they own the case or have the permissions
    const ownscoursePage = coursePage.user.id === ctx.request.userId;
    if (!ownscoursePage) {
        throw new Error("К сожалению, у вас нет полномочий на это.")
    }
    //3. Delete it
    return ctx.db.mutation.deleteCoursePage({ where }, info);
  },
    async createLesson(parent, args, ctx, info) {
        // TODO: Check if they are logged in
        const coursePageID = args.coursePageID
        delete args.id
        // console.log(ctx.request.userId)
        // console.log(coursePagedID)
        if (!ctx.request.userId) {
          throw new Error('You must be logged in to do that!')
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
            },
        }, 
        info
      );
        return Lesson;
    },
    async createTest(parent, args, ctx, info) {
      // TODO: Check if they are logged in
      const coursePageID = args.coursePageID
      delete args.id
      // console.log(ctx.request.userId)
      // console.log(coursePagedID)
      if (!ctx.request.userId) {
        throw new Error('You must be logged in to do that!')
      }

      const test = await ctx.db.mutation.createTest(
            {
            data: {
                user: {
                  connect: { id: ctx.request.userId }
                  },
                coursePage: {
                  connect: { id: coursePageID }
                },
                ...args
            },
        }, 
        info
      );
        return test;
    },
    async createProblem(parent, args, ctx, info) {
      // TODO: Check if they are logged in
      const coursePageID = args.coursePageID
      delete args.id
      // console.log(ctx.request.userId)
      // console.log(coursePagedID)
      if (!ctx.request.userId) {
        throw new Error('You must be logged in to do that!')
      }
      const problem = await ctx.db.mutation.createProblem(
            {
            data: {
                user: {
                  connect: { id: ctx.request.userId }
                  },
                coursePage: {
                  connect: { id: coursePageID }
                },
                ...args
            },
        }, 
        info
      );
        return problem;
    },
    async createSandbox(parent, args, ctx, info) {
      // TODO: Check if they are logged in
      const sandboxPageID = args.sandboxPageID
      delete args.id
      console.log(ctx.request.userId)
      console.log(sandboxPageID)
      if (!ctx.request.userId) {
        throw new Error('You must be logged in to do that!')
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
          },
      }, 
      info
    );
      return sandbox;
    },
    async deleteSandbox(parent, args, ctx, info) {
      const where = { id: args.id };
      //1. find the case
      console.log(where)
      const sandbox = await ctx.db.query.sandbox({ where }, `{ id user { id }}`);
      console.log(sandbox)
      //2. check if they own the case or have the permissions
      const ownsSandbox = sandbox.user.id === ctx.request.userId;
      console.log(ownsSandbox)
      if (!ownsSandbox) {
          throw new Error("К сожалению, у вас нет полномочий на это.")
      }
      //3. Delete it
      return ctx.db.mutation.deleteSandbox({ where }, info);
    },
    async createSandboxPageGoal(parent, args, ctx, info) {
      // TODO: Check if they are logged in
      const sandboxPageID = args.sandboxPageID
      delete args.id
      console.log(ctx.request.userId)
      console.log(sandboxPageID)
      if (!ctx.request.userId) {
        throw new Error('You must be logged in to do that!')
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
          },
      }, 
      info
    );
      return sandboxPageGoal;
    },
  async likePost(parent, args, ctx, info) {
    const updates = { ...args };
    delete updates.id;
    console.log(args)
    //run the update method
    const like = await ctx.db.mutation.updateSandbox(
      {
        data: updates,
        where: {
          id: args.id
        },
      },
    info
    );
    console.log("Updated Post!")
    return like; 
  },
  async addToFavourites(parent, args, ctx, info) {
    //run the update method
    console.log(args.favourites)
    console.log(args.id)
    const updatedUser = await ctx.db.mutation.updateUser(
      {
        data: {
          favourites: {
            set: [...args.favourites]
          },
        },
        where: {
          id: args.id
        },
      },
      info
    );
    console.log("Updated User!")
    return updatedUser; 
  },
  async deleteCoursePage(parent, args, ctx, info) {
    const where = { id: args.id };
    // console.log(where)
    //1. find the case
    const coursePage = await ctx.db.query.coursePage({ where }, `{ id title user { id }}`);
    // console.log(coursePage)
    // console.log(ctx.request.userId)
    // console.log(ctx.request.userId)
    // console.log(ctx.request.user.id)
    //2. check if they own the case or have the permissions
    //TODO
    const ownsCoursePage = coursePage.user.id === ctx.request.userId;
    const hasPermissions = ctx.request.user.permissions.some
    (permission => 
      ['ADMIN', 'CASEDELETE'].includes(permission)
    );
    if (!ownsCoursePage && !hasPermissions) {
        throw new Error("You don't have permission to that!")
    }
    //3. Delete it
    return ctx.db.mutation.deleteCoursePage({ where }, info);
  },
  async signup(parent, args, ctx, info) {
    // lower the email
    args.email = args.email.toLowerCase();
    // hash the password
    const password = await bcrypt.hash(args.password, 10)
    //create the user
    const user = await ctx.db.mutation.createUser({
      data: {
        ...args,
        password,
        permissions: { set: ['USER'] },
        },
      }, 
    info
    );
    //create the JWT token for them
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // we set the jwt as a cookie on the response
    ctx.response.cookie('token', token, {
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
      throw new Error('Invalid Password!');
    }
    // 3. generate the JWT Token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // 4. Set the cookie with the token
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    // 5. Return the user
    return user;
  },
  signout(parent, args, ctx, info) {
    ctx.response.clearCookie('token');
    return { message: 'Goodbye!' };
  },
  async updatePermissions(parent, args, ctx, info) {
    // 1. check if they are logged in
    if(!ctx.request.userId) {
      throw new Error("Please log in!")
    }
    // 2. Query the current user
    const currentUser  = await ctx.db.query.user({
      where: {
        id: ctx.request.userId
        },
      }, info
    )
    // 3.Check if they have permissions to do it
    hasPermission(currentUser, ['ADMIN', 
    'PERMISSIONUPDATE']);
    // 4. Update the permissions
    return ctx.db.mutation.updateUser({
      data: {
        permissions: {
          //special prisma sytax for enum
          set: args.permissions,
        }
      },
      where: {
        id: args.userId
      }
    }, 
    info);
  }
};


module.exports = Mutations;