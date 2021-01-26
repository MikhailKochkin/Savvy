const { objectType } = require("@nexus/schema");

const AuthPayload = objectType({
  name: "AuthPayload",
  definition(t) {
    t.string("token");
    t.field("user", { type: "User" });
  },
});

const Message = objectType({
  name: "Message",
  definition(t) {
    t.string("message");
  },
});

const PaymentInfo = objectType({
  name: "PaymentInfo",
  definition(t) {
    t.string("url");
    t.field("order", { type: "Order" });
  },
});

const SignOut = objectType({
  name: "SignOut",
  definition(t) {
    t.string("message");
  },
});

module.exports = { AuthPayload, SignOut, PaymentInfo, Message };
