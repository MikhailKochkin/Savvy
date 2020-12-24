require("dotenv").config({ path: "variables.env" });
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { createServer, prisma } = require("./createServer");

// const throng = require("throng");

const server = createServer();

// const WORKERS = process.env.WEB_CONCURRENCY || 1;

// throng(
//   {
//     workers: WORKERS,
//     lifetime: Infinity,
//   },
//   start
// );

// function start() {
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

server.start(
  {
    cors: {
      credentials: true,
      origin: [
        process.env.FRONTEND_URL,
        process.env.FRONTEND_URL2,
        process.env.FRONTEND_URL3,
      ],
    },
  },
  (deets) => {
    console.log(`Server is now running 
    on port http://localhost:${deets.port}`);
  }
);
// }
