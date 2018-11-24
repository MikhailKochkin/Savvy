const {forwardTo} = require("prisma-binding")

const Query = {
    cases: forwardTo('db'),
    case:forwardTo('db'),
};

module.exports = Query;