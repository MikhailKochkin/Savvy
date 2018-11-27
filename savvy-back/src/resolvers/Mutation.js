const Mutations = {
    async createCase(parent, args, ctx, info) {
        // TODO: Check if they are logged in

        const edCase = await ctx.db.mutation.createCase(
            {
            data: {
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
    const where = { id: args.id };
    //1. find the item
    const edCase = await ctx.db.query.case({ where }, `{ id title}`);
    //2. check if they own the itemor have the permissions
    //TODO
    //3. Delete it
    return ctx.db.mutation.deleteCase({ where }, info);
  }
};

module.exports = Mutations;