const Mutations = {
    async createCase(parent, args, ctx, info) {
        // TODO: Check if they are logged in

        const Case = await ctx.db.mutation.createCase({
            data: {
                ...args
            }
        }, info)
    }
}

module.exports = Mutations;