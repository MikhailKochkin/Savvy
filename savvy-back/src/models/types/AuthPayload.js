const { objectType } = require("nexus");

const AuthPayload = objectType({
  name: "AuthPayload",
  definition(t) {
    t.string("token"); // Authentication token
    t.field("user", { type: "User" }); // Associated user
  },
});

const AuthMessage = objectType({
  name: "AuthMessage",
  definition(t) {
    t.string("message"); // Message content
  },
});

const PaymentInfo = objectType({
  name: "PaymentInfo",
  definition(t) {
    t.string("url"); // Payment URL
    t.field("order", { type: "Order" }); // Associated order
  },
});

const PaymentInfo2 = objectType({
  name: "PaymentInfo2",
  definition(t) {
    t.string("url"); // Payment URL
    t.field("communityMember", { type: "CommunityMember" }); // Associated community member
  },
});

const SignOut = objectType({
  name: "SignOut",
  definition(t) {
    t.string("message"); // Sign-out message
  },
});

module.exports = {
  AuthPayload,
  SignOut,
  PaymentInfo,
  PaymentInfo2,
  AuthMessage,
};
