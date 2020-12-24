const { objectType } = require("@nexus/schema");

const ReminderEmail = objectType({
  name: "AuthPayload",
  definition(t) {
    t.string("token");
    t.field("user", { type: "User" });
  },
});

const NewWeekEmail = objectType({
  name: "PaymentInfo",
  definition(t) {
    t.string("url");
    t.field("order", { type: "Order" });
  },
});

module.exports = { AuthPayload, SignOut, PaymentInfo };
