const { ApolloServer } = require("@apollo/server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("@apollo/server-plugin-landing-page-graphql-playground");
const { PrismaClient } = require("@prisma/client");
const { nexusPrisma } = require("@mercurialweb/nexus-plugin-prisma");
const { makeSchema, connectionPlugin } = require("nexus");
const types = require("./types");

const prisma = new PrismaClient();

const areIntrospectionAndPlaygroundEnabled = !(
  process.env.NODE_ENV == "production"
);
const server = new ApolloServer({
  introspection: areIntrospectionAndPlaygroundEnabled,
  playground: areIntrospectionAndPlaygroundEnabled,
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
