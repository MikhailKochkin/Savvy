const { ApolloServer } = require("@apollo/server");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("@apollo/server-plugin-landing-page-graphql-playground");
const { schema } = require("./schema");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({
  // log: ["query", "info", "warn", "error"], // Log for debugging
});
const areIntrospectionAndPlaygroundEnabled =
  process.env.NODE_ENV !== "production";

const server = new ApolloServer({
  introspection: areIntrospectionAndPlaygroundEnabled,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground(),
    // {
    //   requestDidStart(requestContext) {
    //     console.log(`Request started: ${new Date()}`);
    //     return {
    //       willSendResponse(requestContext) {
    //         console.log(`Request completed: ${new Date()}`);
    //         console.log(`Query: ${requestContext.request.query}`);
    //       },
    //     };
    //   },
    // },
  ],
  schema, // We'll directly use the imported schema
  context: ({ req, res }) => {
    return { req, res, prisma };
  },
});

exports.server = server;
exports.prisma = prisma;
