const { ApolloServer } = require("@apollo/server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("@apollo/server-plugin-landing-page-graphql-playground");

const {
  ApolloServerPluginLandingPageDisabled,
} = require("@apollo/server/plugin/disabled");

const { PrismaClient } = require("@prisma/client");
const { nexusPrisma } = require("@mercurialweb/nexus-plugin-prisma");
// const { DateTimeResolver, JSONObjectResolver } = require("graphql-scalars");
// const { GraphQLScalarType } = require("graphql/type");
const { makeSchema, connectionPlugin } = require("nexus");
const types = require("./types");

const prisma = new PrismaClient();

const server = new ApolloServer({
  playground: true,
  introspection: true,
  apollo: {
    graphRef: process.env.APOLLO_GRAPH_REF, // replace with your graph id and variant
  },
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  schema: makeSchema({
    types,
    plugins: [
      nexusPrisma({
        prismaClient: (ctx) => (ctx.prisma = prisma),
        experimentalCRUD: true,
      }),
    ],
    outputs: {
      schema: __dirname + "/../schema.graphql",
      typegen: __dirname + "/generated/nexus.ts",
    },
  }),
  context: ({ req, res }) => {
    console.log("apollo", req); // Log the req object here
    return { req, res, prisma };
  },
});

exports.server = server;
exports.prisma = prisma;
