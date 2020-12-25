const { GraphQLServer } = require("graphql-yoga");
const { PrismaClient } = require("@prisma/client");
const { nexusPrisma } = require("nexus-plugin-prisma");
const { DateTimeResolver, JSONObjectResolver } = require("graphql-scalars");
const { GraphQLScalarType } = require("graphql/type");
const { makeSchema, connectionPlugin } = require("@nexus/schema");
const types = require("./types");
const { ApolloServer } = require("apollo-server");

const prisma = new PrismaClient();

function createContext() {
  return { prisma };
}

function createServer() {
  return new ApolloServer({
    cors: {
      origin: "*", // <- allow request from all domains
      credentials: true,
    },
    context: createContext,
    schema: makeSchema({
      types,
      plugins: [
        nexusPrisma({
          experimentalCRUD: true,
          scalars: {
            DateTime: DateTimeResolver,
            Json: new GraphQLScalarType({
              ...JSONObjectResolver,
              name: "Json",
              description:
                "The `JSON` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).",
            }),
          },
        }),
        connectionPlugin(),
      ],
      outputs: {
        schema: __dirname + "/../schema.graphql",
        typegen: __dirname + "/generated/nexus.ts",
      },
    }),
  });
}

exports.createServer = createServer;
exports.prisma = prisma;
