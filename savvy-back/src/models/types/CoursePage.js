const { objectType, inputObjectType } = require("nexus");

const Program = objectType({
  name: "Program",
  definition(t) {
    t.int("id"); // Program ID
    t.string("title"); // Program title
    t.string("description"); // Program description
    t.string("image"); // Program image URL
    t.list.field("orders", { type: "Order" }); // Associated orders
    t.string("syllabus"); // Syllabus content
    t.int("months"); // Duration in months
    t.int("promotionId"); // ID of associated promotion
    // t.list.field("offers", { type: "Offer" }); // List of offers
    // t.list.field("news", { type: "News" }); // Related news
    // t.list.field("coursePages", { type: "CoursePage" }); // Related course pages
    // t.boolean("published"); // Published status
    // t.string("currency"); // Currency type
    // t.boolean("installments"); // Installments availability
    // t.list.string("tags"); // Tags
    // t.string("header"); // Header text
    // t.string("subheader"); // Subheader text
    // t.field("nextStart", { type: "DateTime" }); // Next start date
    // t.field("uptodateAt", { type: "DateTime" }); // Last updated date
    // t.string("goals"); // Goals of the program
    // t.float("price"); // Price of the program
    // t.float("discountPrice"); // Discounted price
    // t.string("promocode"); // Promocode
    // t.string("audience"); // Target audience
    // t.string("result"); // Expected result
    // t.string("tariffs"); // Tariff details
    // t.string("methods"); // Teaching methods
    // t.string("batch"); // Batch information
    // t.list.field("reviews", { type: "Review" }); // Associated reviews
    // t.string("video"); // Video URL
    // t.field("createdAt", { type: "DateTime" }); // Creation timestamp
    // t.field("updatedAt", { type: "DateTime" }); // Update timestamp
  },
});

const CoursePage = objectType({
  name: "CoursePage",
  definition(t) {
    t.string("id"); // CoursePage ID
    t.string("title"); // CoursePage title
    t.string("description"); // CoursePage description
    t.string("image"); // Image URL
    t.string("banner"); // Banner image URL
    // t.list.field("modules", { type: "Module" }); // Associated modules
    t.int("promotionId"); // Associated promotion ID
    t.int("numInCareerTrack"); // Number in career track
    t.int("weeks"); // Duration in weeks
    // t.boolean("subscription"); // Subscription status
    t.list.field("orders", { type: "Order" }); // Associated orders
    // t.list.field("news", { type: "News" }); // Related news
    t.string("userId");
    t.field("user", { type: "User" }); // Associated user
    t.list.field("authors", { type: "User" }); // Authors
    t.list.field("lessons", { type: "Lesson" }); // Lessons
    t.list.field("applications", { type: "Application" }); // Applications
    t.boolean("published"); // Published status
    t.string("uni"); // University affiliation
    t.string("currency"); // Currency
    t.boolean("installments"); // Installment availability
    t.list.string("tags"); // Tags
    t.list.string("header"); // Header
    t.int("view"); // View count
    t.list.string("countries"); // Supported countries
    t.list.string("subheader"); // Subheader
    t.field("nextStart", { type: "DateTime" }); // Next start date
    t.field("uptodateAt", { type: "DateTime" }); // Last updated date
    t.list.string("goals"); // Goals
    t.string("courseType"); // Course type
    // t.list.field("students", { type: "User" }); // Students
    t.list.field("new_students", { type: "User" }); // New students
    t.float("price"); // Price
    // t.list.field("prices", { type: "Price" }); // Prices
    t.float("subscriptionPrice"); // Subscription price
    t.float("discountPrice"); // Discounted price
    t.field("company", { type: "Company" }); // Associated company
    t.string("promocode"); // Promocode
    t.string("audience"); // Target audience
    t.string("result"); // Expected result
    // t.list.field("tariffs", { type: "Tariff" }); // Tariffs
    t.string("methods"); // Teaching methods
    t.string("batch"); // Batch info
    t.field("reviews", { type: "ReviewsList" }); // Reviews
    t.string("video"); // Video URL
    t.field("createdAt", { type: "DateTime" }); // Creation timestamp
    t.field("updatedAt", { type: "DateTime" }); // Update timestamp
  },
});

const ReviewsList = objectType({
  name: "ReviewsList",
  definition(t) {
    t.list.field("reviews", {
      type: "Review",
      description: "List of reviews.",
    });
  },
});

const Review = objectType({
  name: "Review",
  definition(t) {
    t.string("name", { description: "Name of the reviewer." });
    t.string("text", { description: "Review text content." });
    t.string("image", { description: "Image URL associated with the review." });
    t.string("source", { description: "Source of the review." });
  },
});

const ReviewInput = inputObjectType({
  name: "ReviewInput",
  definition(t) {
    t.string("name", { description: "Name of the reviewer." });
    t.string("text", { description: "Review text content." });
    t.string("image", { description: "Image URL associated with the review." });
    t.string("source", { description: "Source of the review." });
  },
});

const ReviewsListInput = inputObjectType({
  name: "ReviewsListInput",
  definition(t) {
    t.list.field("reviewsInput", {
      type: "ReviewInput",
      description: "List of reviews.",
    });
  },
});

const CourseVisit = objectType({
  name: "CourseVisit",
  definition(t) {
    t.int("id"); // Visit ID
    t.int("visitsNumber"); // Number of visits
    t.field("createdAt", { type: "DateTime" }); // Creation timestamp
    t.field("updatedAt", { type: "DateTime" }); // Update timestamp
    // t.list.field("reminders", { type: "Reminder" }); // Associated reminders
    t.int("studentId"); // Associated student ID
    t.int("coursePageId"); // Associated course page ID
    t.field("coursePage", { type: "CoursePage" }); // Related course page
    t.field("student", { type: "User" }); // Associated student
  },
});

module.exports = {
  CoursePage,
  CourseVisit,
  Program,
  ReviewsList,
  Review,
  ReviewInput,
  ReviewsListInput,
};
