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
    const { token } = req.cookies;
    if (token) {
      const { userId } = jwt.verify(token, process.env.APP_SECRET);
      // put the userId onto the req for future requests to access
      req.userId = userId;
    }
    next();
  });

  // 2. Create a middleware that populates the user on very each request

  server.express.use(async (req, res, next) => {
    // if they aren't logged in, skip this
    if (!req.userId) return next();
    const user = await prisma.user.findUnique(
      { where: { id: req.userId } },
      "{ id, permissions, email, name }"
    );
    req.user = user;
    next();
  });

  // 3. CORS middleware

  server.express.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", [
      "http://localhost:7777",
      "https://localhost:7777",
      "https://besavvy.app",
      "https://www.besavvy.app",
    ]);
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
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
