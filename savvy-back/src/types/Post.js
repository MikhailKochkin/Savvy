const { objectType } = require("@nexus/schema");

const Post = objectType({
  name: "Post",
  definition(t) {
    t.model.id();
    t.model.title();
    t.model.text();
    t.model.likes();
    t.model.userId();
    t.model.text();
    t.model.user();
    t.model.tags();
    t.model.coursePages();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

module.exports = {
  Post,
};
