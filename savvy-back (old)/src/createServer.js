const { ApolloServer } = require("apollo-server-express");
const { PrismaClient } = require("@prisma/client");
const { makeSchema, declarativeWrappingPlugin } = require("nexus");
const { nexusPrisma } = require("@mercurialweb/nexus-plugin-prisma");

// const { nexusPrisma } = require("nexus-plugin-prisma");
const { DateTimeResolver, JSONObjectResolver } = require("graphql-scalars");
const { GraphQLScalarType } = require("graphql/type");
// const { makeSchema, connectionPlugin } = require("@nexus/schema");
const types = require("./types");

const prisma = new PrismaClient();

const server = new ApolloServer({
  playground: true,
  introspection: true,
  schema: makeSchema({
    types,
    plugins: [
      nexusPrisma,
      {
        experimentalCRUD: true,
        //   scalars: {
        //     DateTime: DateTimeResolver,
        //     Json: new GraphQLScalarType({
        //       ...JSONObjectResolver,
        //       name: "Json",
        //       description:
        //         "The `JSON` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).",
        //     }),
        //   },
      },
      declarativeWrappingPlugin(),
      // connectionPlugin(),
    ],
    outputs: {
      schema: __dirname + "/../schema.graphql",
      typegen: __dirname + "/generated/nexus.ts",
    },
    // sourceTypes: {
    //   modules: [
    //     {
    //       module: "@prisma/client",
    //       alias: "prisma",
    //     },
    //   ],
    // },
    // typegenAutoConfig: {
    //   contextType: "Context.Context",
    //   sources: [
    //     {
    //       source: "@prisma/client",
    //       alias: "prisma",
    //     },
    //     {
    //       source: require.resolve("./context.js"),
    //       alias: "context",
    //     },
    //   ],
    // },
  }),
  context: (req) => ({ ...req, prisma }),
});

exports.server = server;
exports.prisma = prisma;
