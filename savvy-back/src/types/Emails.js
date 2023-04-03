const { objectType } = require("@nexus/schema");

// const ReminderEmail = objectType({
//   name: "AuthPayload",
//   definition(t) {
//     t.string("token");
//     t.field("user", { type: "User" });
//   },
// });

// const NewWeekEmail = objectType({
//   name: "PaymentInfo",
//   definition(t) {
//     t.string("url");
//     t.field("order", { type: "Order" });
//   },
// });

const EmailReminder = objectType({
  name: "EmailReminder",
  definition(t) {
    t.model.id();
    t.model.link();
    t.model.sendAt();
    t.model.coursePageId();
    t.model.coursePage();
    t.model.emailsSent();
    t.model.gap();
    t.model.emailCampaign();
    t.model.user();
    t.model.userId();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

const EmailCampaign = objectType({
  name: "EmailCampaign",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.content();
    t.model.emails();
    t.model.emailReminders();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

module.exports = { EmailReminder, EmailCampaign };
