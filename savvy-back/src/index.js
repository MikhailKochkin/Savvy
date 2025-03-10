require("dotenv").config({ path: "variables.env" });
require("./instrument.js");

const cookieParser = require("cookie-parser");
const express = require("express");
const Sentry = require("@sentry/node");
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

  app.use((err, req, res, next) => {
    console.error("Error:", err.message);
    res.status(500).send("Something went wrong!");
  });

  app.use(cors(corsOptions)); // Use cors middleware with corsOptions

  app.use(
    "/",
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => ({ req, res, prisma }),
    })
  );

  app.use(async (req, res, next) => {
    if (!req.userId) return next();
    try {
      req.user = await prisma.user.findUnique({
        where: { id: req.userId },
        select: { id: true, permissions: true, email: true, name: true },
      });
    } catch (error) {
      console.error("Error fetching user:", error);
      next(error); // Pass error to your error handler
    }
    next();
  });

  Sentry.setupExpressErrorHandler(app);

  // Optional fallthrough error handler
  app.use(function onError(err, req, res, next) {
    // The error id is attached to `res.sentry` to be returned
    // and optionally displayed to the user for support.
    res.statusCode = 500;
    res.end(res.sentry + "\n");
  });

  const PORT = process.env.PORT || 4000;

  // Ensure we wait for our server to start

  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:4444/`);
})();
