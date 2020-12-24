const { objectType } = require("@nexus/schema");

const CoursePage = objectType({
  name: "CoursePage",
  definition(t) {
    t.model.id();
    t.model.title();
    t.model.description();
    t.model.image();
    t.model.banner();
    t.model.weeks();
    t.model.subscription();
    t.model.news();
    t.model.user();
    t.model.authors();
    t.model.lessons();
    t.model.applications();
    t.model.published();
    t.model.uni();
    // t.model.posts();
    t.model.tags();
    t.model.courseType();
    t.model.students();
    t.model.new_students();
    t.model.price();
    t.model.subscriptionPrice();
    t.model.discountPrice();
    // t.model.orders();
    t.model.company();
    t.model.promocode();
    // t.model.visits();
    t.model.audience();
    t.model.result();
    t.model.tariffs();
    t.model.methods();
    t.model.batch();
    t.model.reviews();
    t.model.video();
    t.model.createdAt();
    t.model.updatedAt();
  },
});

const CourseVisit = objectType({
  name: "CourseVisit",
  definition(t) {
    t.model.id();
    t.model.visitsNumber();
    t.model.createdAt();
    t.model.updatedAt();
    t.model.reminders();
    t.model.studentId();
    t.model.coursePageId();
    t.model.coursePage();
    t.model.student();
  },
});

module.exports = {
  CoursePage,
  CourseVisit,
};
