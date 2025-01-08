const { ApolloServer } = require("@apollo/server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("@apollo/server-plugin-landing-page-graphql-playground");
const { PrismaClient } = require("@prisma/client");
const { makeSchema } = require("nexus");
// We'll remove connectionPlugin if we don't specifically need Relay-style pagination
// but you can keep it if you do use Relay edges/connections
const { schema } = require("./schema");
// We'll create a separate 'schema.js' that exports our Nexus schema

const prisma = new PrismaClient();

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
