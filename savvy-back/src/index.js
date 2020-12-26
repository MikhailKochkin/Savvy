require("dotenv").config({ path: "variables.env" });
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { createServer, prisma } = require("./createServer");
const throng = require("throng");

const server = createServer();

const WORKERS = process.env.WEB_CONCURRENCY || 1;

const start = () => {
  server.express.use(cookieParser());

  // decode the JWT so we can get the user Id on each request
  server.express.use((req, res, next) => {
    console.log("req", req);
    console.log("куки", req.cookies);
    const { token } = req.cookies;
    console.log("токен", token);
    if (token) {
      const { userId } = jwt.verify(token, process.env.APP_SECRET);
      console.log("userId", userId);
      // put the userId onto the req for future requests to access
      req.userId = userId;
    }
    next();
  });

  // 2. Create a middleware that populates the user on very each request

  server.express.use(async (req, res, next) => {
    // if they aren't logged in, skip this
    console.log("server user id", req.userId);
    if (!req.userId) return next();
    const user = await prisma.user.findUnique(
      { where: { id: req.userId } },
      "{ id, permissions, email, name }"
    );
    req.user = user;

    next();
  });

  server.start(
    {
      cors: {
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
        ],
      },
    },
    (deets) => {
      console.log(`Server is now running 
    on port http://localhost:${deets.port}`);
    }
  );
};

throng(
  {
    workers: WORKERS,
    lifetime: Infinity,
  },
  start
);
