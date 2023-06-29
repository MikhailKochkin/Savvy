const { enumType } = require("@nexus/schema");

const CourseType = enumType({
  name: "CourseType",
  members: ["PUBLIC", "PRIVATE", "FORMONEY", "UNI", "CHALLENGE"],
  description: "The first Star Wars episodes released",
});

const Permission = enumType({
  name: "Permission",
  members: ["ADMIN", "USER"],
  description: "The first Star Wars episodes released",
});

const Status = enumType({
  name: "Status",
  members: ["STUDENT", "LAWYER", "AUTHOR", "SAVVY_AUTHOR", "HR"],
  description: "The first Star Wars episodes released",
});

module.exports = {
  CourseType,
  Permission,
  Status,
};
