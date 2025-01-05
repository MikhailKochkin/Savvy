const { mutationType } = require("nexus");

const { userMutations } = require("./mutations/users");
const { courseMutations } = require("./mutations/coursePages");
const { lessonMutations } = require("./mutations/lessons");
const { miscellaneousMutations } = require("./mutations/miscellaneous");
const { exercisesMutations } = require("./mutations/exercises");
const { subscriptionMutations } = require("./mutations/subscriptions");

const Mutation = mutationType({
  definition(t) {
    userMutations(t);
    courseMutations(t);
    lessonMutations(t);
    miscellaneousMutations(t);
    exercisesMutations(t);
    subscriptionMutations(t);
  },
});

module.exports = {
  Mutation,
};
