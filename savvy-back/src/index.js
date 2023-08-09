require("dotenv").config({ path: "variables.env" });
const cookieParser = require("cookie-parser");
const express = require("express");
const jwt = require("jsonwebtoken");
const { server, prisma } = require("./createServer");
const cors = require("cors");
const http = require("http");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");

var corsOptions = {
  credentials: true,
  origin: [
    process.env.FRONTEND_URL,
    process.env.FRONTEND_URL2,
    process.env.FRONTEND_URL3,
    process.env.FRONTEND_URL4,
    process.env.FRONTEND_URL5,
    process.env.FRONTEND_URL6,
    process.env.FRONTEND_URL7,
    process.env.FRONTEND_URL8,
    process.env.FRONTEND_URL9,
    process.env.FRONTEND_URL10,
    process.env.FRONTEND_URL11,
    process.env.FRONTEND_URL12,
    "https://studio.apollographql.com",
  ],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Required logic for integrating with Express
const app = express();
// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
const httpServer = http.createServer(app);

// Set up our Express middleware to handle CORS, body parsing,
// and our expressMiddleware function.

(async function startServer() {
  await server.start();
  app.use(cookieParser());

  app.use(async (req, res, next) => {
    const { token } = req.cookies;
    if (token) {
      const { userId } = jwt.verify(token, process.env.APP_SECRET);
      // put the userId onto the req for future requests to access
      req.userId = userId;
    }
    next();
  });

  app.use(async (req, res, next) => {
    if (!req.userId) return next();
    const user = await prisma.user.findUnique(
      { where: { id: req.userId } },
      "{ id, permissions, email, name }"
    );
    req.user = user;
    next();
  });

  app.use(cors(corsOptions)); // Use cors middleware with corsOptions

  app.use(
    "/",
    // cors(),
    bodyParser.json(),
    expressMiddleware(
      server,
      // { cors: corsOptions },
      {
        context: async ({ req, res }) => ({ req, res, prisma }),
      }
    )
  );

  const PORT = process.env.PORT || 4000;

  // Ensure we wait for our server to start

  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:4444/`);
})();
