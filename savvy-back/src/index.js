require("dotenv").config({ path: "variables.env" });
const cookieParser = require("cookie-parser");
const express = require("express");
const jwt = require("jsonwebtoken");
const { server, prisma } = require("./createServer");

// const WORKERS = process.env.WEB_CONCURRENCY || 1;

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
  ],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const app = express();

app.use(cookieParser());

app.use(async (req, res, next) => {
  const { token } = req.cookies;
  console.log("req.cookies", req.cookies);
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    // put the userId onto the req for future requests to access
    req.userId = userId;
    console.log(1, req.userId);
  }
  next();
});

app.use(async (req, res, next) => {
  // if they aren't logged in, skip this
  if (!req.userId) return next();
  const user = await prisma.user.findUnique(
    { where: { id: req.userId } },
    "{ id, permissions, email, name }"
  );

  req.user = user;
  console.log(2, req.user.id);

  next();
});

server.applyMiddleware({ app, cors: corsOptions });

const PORT = process.env.PORT || 4000;

app.listen({ port: PORT }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  )
);
