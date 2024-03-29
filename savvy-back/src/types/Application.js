const { objectType } = require("nexus");

const Application = objectType({
  name: "Application",
  definition(t) {
    t.model.id();
    t.model.applicantId();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

module.exports = {
  Application,
};
