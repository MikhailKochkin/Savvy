const { objectType } = require("@nexus/schema");

const Post = objectType({
  name: "Post",
  definition(t) {
    t.model.id();
    t.model.title();
    t.model.text();
    t.model.image();
    t.model.language();
    t.model.summary();
    t.model.likes();
    t.model.userId();
    t.model.text();
    t.model.user();
    t.model.tags();
    t.model.coursePage();
    t.model.lessonId();
    t.model.leadin();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

module.exports = {
  Post,
};
