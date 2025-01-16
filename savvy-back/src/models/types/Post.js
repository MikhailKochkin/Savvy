const { objectType } = require("nexus");

const Post = objectType({
  name: "Post",
  definition(t) {
    t.string("id", { description: "Unique identifier for the post." });
    t.string("title", { description: "Title of the post." });
    t.string("text", { description: "Main content or body of the post." });
    t.string("image", { description: "Image URL associated with the post." });
    t.string("language", {
      description: "Language in which the post is written.",
    });
    t.string("summary", {
      description: "Summary or brief description of the post.",
    });
    t.int("likes", { description: "Number of likes the post has received." });
    t.string("userId", { description: "ID of the user who created the post." });
    t.field("user", {
      type: "User",
      description: "Details of the user who created the post.",
    });
    t.list.string("tags", {
      description: "List of tags associated with the post.",
    });
    t.field("emailCampaign", {
      type: "EmailCampaign",
      description: "Email campaign associated with the post.",
    });
    t.string("emailCampaignId", {
      description: "ID of the email campaign associated with the post.",
    });
    t.field("coursePage", {
      type: "CoursePage",
      description: "Course page associated with the post.",
    });
    t.string("lessonId", {
      description: "ID of the lesson associated with the post.",
    });
    t.string("leadin", {
      description: "Introductory text or lead-in for the post.",
    });
    t.field("createdAt", {
      type: "DateTime",
      description: "Timestamp when the post was created.",
    });
    t.field("updatedAt", {
      type: "DateTime",
      description: "Timestamp when the post was last updated.",
    });
  },
});

module.exports = {
  Post,
};
