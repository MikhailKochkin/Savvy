const { objectType } = require("nexus");

const Lawrdle = objectType({
  name: "Lawrdle",
  definition(t) {
    t.model.id();
    t.model.word();
    t.model.story();
    t.model.buttonText();
    t.model.link();
    t.model.authorId();
    t.model.author();
    t.model.active();
    t.model.coursePage();
    t.model.coursePageId();
    t.model.emailCampaign();
    t.model.emailCampaignId();
    t.model.leadin();
    t.model.lessonId();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

const Useful = objectType({
  name: "Useful",
  definition(t) {
    t.model.id();
    t.model.header();
    t.model.name();
    t.model.buttonText();
    t.model.link();
    t.model.image();
    t.model.tags();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

module.exports = {
  Lawrdle,
  Useful,
};
