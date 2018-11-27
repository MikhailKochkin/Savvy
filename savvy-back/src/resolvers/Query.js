const {forwardTo} = require("prisma-binding")

const Query = {
    cases: forwardTo('db'),
    case:forwardTo('db'),
    casesConnection: forwardTo('db'),
};

module.exports = Query;