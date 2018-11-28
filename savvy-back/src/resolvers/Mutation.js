const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { hasPermission } = require("../utils");

const Mutations = {
    async createCase(parent, args, ctx, info) {
        // TODO: Check if they are logged in
        if (!ctx.request.userId) {
          throw new Error('You must be logged in to do that!')
        }

        const edCase = await ctx.db.mutation.createCase(
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
        return edCase;
    },
    updateCase(parent, args, ctx, info) {
      //first take a copy of the updates
      const updates = { ...args };
      //remove the ID from updates
      delete updates.id;
      //run the update method
      return ctx.db.mutation.updateCase(
        {
          data: updates,
          where: {
            id: args.id
        },
      }, 
      info
    );
  },
  async deleteCase(parent, args, ctx, info) {
    throw new Error('You are not allowed!')
    const where = { id: args.id };
    //1. find the case
    const edCase = await ctx.db.query.case({ where }, `{ id title user { id }}`);
    //2. check if they own the case or have the permissions
    //TODO
    const createdEdCase = edCase.user.id === ctx.request.usedId;
    const hasPermissions = ctx.request.user.permission.some
    (permission => 
      ['ADMIN', 'CASEDELETE'].includes(permission)
    );
    if (!ownsItem && !hasPermissions) {
        throw new Error("You don't have permission to that!")
    }

    //3. Delete it
    return ctx.db.mutation.deleteCase({ where }, info);
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