const { objectType, inputObjectType } = require("@nexus/schema");

const User = objectType({
  name: "User",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.createdAt();
    t.model.updatedAt();
    t.model.surname();
    t.model.number();
    t.model.email();
    t.model.comment();
    t.model.work();
    t.model.password();
    t.model.description();
    t.model.messages();
    t.model.resume();
    t.model.status();
    t.model.tags();
    t.model.traffic_sources();
    t.model.country();
    t.model.level();
    t.model.uni();
    t.model.image();
    t.model.orders();
    t.model.new_subjects();
    t.model.permissions();
    t.model.certificates();
    t.model.courseVisits();
    t.model.teams();
    t.model.myTeams();
    t.model.teamQuests();
    t.model.teamQuestResults();
    t.model.lessons();
    t.model.studentFeedback();
    t.model.teacherFeedback();
    t.model.coursePages({ ordering: { title: true } });
    t.model.co_coursePages({ ordering: { title: true } });
    t.model.company();
    t.model.lessonResults();
  },
});

const Team = objectType({
  name: "Team",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.image();
    t.model.createdAt();
    t.model.updatedAt();
    t.model.founder();
    t.model.users();
    t.model.orders();
  },
});

const Feedback = objectType({
  name: "Feedback",
  definition(t) {
    t.model.id();
    t.model.text();
    t.model.teacherId();
    t.model.studentId();
    t.model.lessonId();
    t.model.lesson();
    t.model.teacher();
    t.model.student();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

const Message = objectType({
  name: "Message",
  definition(t) {
    t.model.id();
    t.model.text();
    t.model.userId();
    t.model.user();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

const UserLevel = objectType({
  name: "UserLevel",
  definition(t) {
    t.model.id();
    t.model.level();
    // t.model.userId();
    t.model.user();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

const BusinessClient = objectType({
  name: "BusinessClient",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.surname();
    t.model.email();
    t.model.number();
    t.model.country();
    t.model.source();
    t.model.type();
    t.model.comment();
    t.model.tags();
    t.model.sales_cycle();
    t.model.communication_history();
    t.model.communication_medium();
    t.model.coursePageId();
    t.model.coursePage();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

const ConfUser = objectType({
  name: "ConfUser",
  definition(t) {
    t.model.id();
    t.model.email();
    t.model.surname();
    t.model.name();
    t.model.conf_number();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

const CommunityMember = objectType({
  name: "CommunityMember",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.surname();
    t.model.email();
    t.model.number();
    t.model.source();
    t.model.subscription();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

const Visits = inputObjectType({
  name: "Visits",
  definition(t) {
    t.list.field("visitsList", { type: "Visit" });
  },
});

const Visit = inputObjectType({
  name: "Visit",
  definition(t) {
    t.string("date");
    t.string("utm_source");
    t.string("utm_medium");
    t.string("utm_campaign");
  },
});

const BotDialogue = objectType({
  name: "BotDialogue",
  definition(t) {
    t.model.id();
    t.model.journey();
    t.model.rating();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

module.exports = {
  User,
  Feedback,
  UserLevel,
  Message,
  BusinessClient,
  ConfUser,
  CommunityMember,
  Visits,
  Visit,
  Team,
  BotDialogue,
};
