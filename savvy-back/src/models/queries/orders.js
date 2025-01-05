const { queryType, stringArg, nonNull, arg } = require("nexus");

function orderQueries(t) {
  t.list.field("orders", {
    type: "Order", // The type being queried
    args: {
      id: stringArg({ description: "ID of the order to fetch." }),
    },
    resolve: (_parent, { id }, ctx) => {
      // Use the argument in the Prisma query
      const where = id ? { id } : {}; // Construct a filter dynamically
      const res = ctx.prisma.order.findMany({
        where, // Prisma supports `where` filtering
      });
      return res;
    },
  });

  t.field("order", {
    type: "Order",
    args: {
      id: nonNull(stringArg()),
    },
    resolve: (_parent, { id }, ctx) => {
      return ctx.prisma.order.findUnique({
        where: { id },
      });
    },
  });
}

module.exports = {
  orderQueries,
};
