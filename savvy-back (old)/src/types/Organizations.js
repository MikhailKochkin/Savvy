const { objectType, enumType } = require("@nexus/schema");

const Status = enumType({
  name: "Status",
  members: ["STUDENT", "LAWYER", "AUTHOR", "SAVVY_AUTHOR", "HR"],
  description: "The first Star Wars episodes released",
});

const Uni = objectType({
  name: "Uni",
  definition(t) {
    t.model.id();
    t.model.title();
    t.model.capacity();
    t.model.teachers();
    t.model.paidMonths();
    t.model.capacity();
  },
});

const Company = objectType({
  name: "Company",
  definition(t) {
    t.model.id();
    t.model.name();
  },
});

module.exports = {
  Status,
  Uni,
  Company,
};
