const { objectType } = require("@nexus/schema");

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
    t.model.password();
    t.model.description();
    t.model.resume();
    t.model.status();
    t.model.tags();
    t.model.level();
    t.model.uni();
    t.model.image();
    t.model.orders();
    t.model.new_subjects();
    t.model.permissions();
    t.model.certificates();
    t.model.courseVisits();
    t.model.lessons();
    t.model.studentFeedback();
    t.model.teacherFeedback();
    t.model.coursePages({ ordering: { title: true } });
    t.model.co_coursePages({ ordering: { title: true } });
    t.model.company();
    t.model.lessonResults();
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
    t.model.email();
    t.model.type();
    t.model.name();
    t.model.comment();
    t.model.tags();
    t.model.number();
    t.model.communication_medium();
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

module.exports = {
  User,
  Feedback,
  UserLevel,
  BusinessClient,
  ConfUser,
  CommunityMember,
};
