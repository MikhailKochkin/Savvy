const { queryType } = require("nexus");

const { userQueries } = require("./queries/users");
const { courseQueries } = require("./queries/coursePages");
const { lessonQueries } = require("./queries/lessons");
const { orderQueries } = require("./queries/orders");
const { miscellaneousQueries } = require("./queries/miscellaneous");
const { resultsQueries } = require("./queries/results");
const { exercisesQueries } = require("./queries/exercises");

const Query = queryType({
  definition(t) {
    userQueries(t);
    courseQueries(t);
    lessonQueries(t);
    orderQueries(t);
    resultsQueries(t);
    exercisesQueries(t);
    miscellaneousQueries(t);
  },
});

module.exports = {
  Query,
};
