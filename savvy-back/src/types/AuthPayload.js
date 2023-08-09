const { objectType } = require("nexus");

const AuthPayload = objectType({
  name: "AuthPayload",
  definition(t) {
    t.string("token");
    t.field("user", { type: "User" });
  },
});

const AuthMessage = objectType({
  name: "AuthMessage",
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

const PaymentInfo2 = objectType({
  name: "PaymentInfo2",
  definition(t) {
    t.string("url");
    t.field("communityMember", { type: "CommunityMember" });
  },
});

const SignOut = objectType({
  name: "SignOut",
  definition(t) {
    t.string("message");
  },
});

module.exports = {
  AuthPayload,
  SignOut,
  PaymentInfo,
  PaymentInfo2,
  AuthMessage,
};
