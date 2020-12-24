const { objectType } = require("@nexus/schema");

const Order = objectType({
  name: "Order",
  definition(t) {
    t.model.id();
    t.model.paymentID();
    t.model.price();
    t.model.level();
    t.model.comment();
    t.model.promocode();
    t.model.isPaid();
    t.model.userId();
    t.model.coursePageId();
    t.model.coursePage();
    t.model.user();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

module.exports = {
  Order,
};
