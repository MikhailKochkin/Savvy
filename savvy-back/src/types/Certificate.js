const { objectType } = require("@nexus/schema");

const Certificate = objectType({
  name: "Certificate",
  definition(t) {
    t.model.id();
    t.model.createdAt();
    t.model.updatedAt();
    t.model.studentId();
    t.model.coursePageId();
    t.model.coursePage();
    t.model.student();
  },
});

module.exports = {
  Certificate,
};
