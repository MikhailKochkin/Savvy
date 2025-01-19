const { ApolloServer } = require("@apollo/server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("@apollo/server-plugin-landing-page-graphql-playground");
const { schema } = require("./schema");
// We'll create a separate 'schema.js' that exports our Nexus schema

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
//   {
//   log: ["query", "info", "warn", "error"],
// }

const areIntrospectionAndPlaygroundEnabled =
  process.env.NODE_ENV !== "production";

const server = new ApolloServer({
  introspection: areIntrospectionAndPlaygroundEnabled,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  schema, // We'll directly use the imported schema
  context: ({ req, res }) => {
    return { req, res, prisma };
  },
});

exports.server = server;
exports.prisma = prisma;
