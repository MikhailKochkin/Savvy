const { enumType } = require("nexus");

const CourseType = enumType({
  name: "CourseType",
  members: ["PUBLIC", "PRIVATE", "FORMONEY", "UNI", "CHALLENGE"],
  description:
    "Defines the type of a course, such as public, private, for money, university-affiliated, or a challenge course.",
});

const Permission = enumType({
  name: "Permission",
  members: ["ADMIN", "USER"],
  description:
    "Defines the access level of a user, either as an admin or a regular user.",
});

const Status = enumType({
  name: "Status",
  members: ["STUDENT", "LAWYER", "AUTHOR", "SAVVY_AUTHOR", "HR"],
  description:
    "Represents the role or status of a user, such as student, lawyer, author, savvy author, or HR personnel.",
});

const CommentStatus = enumType({
  name: "CommentStatus",
  members: ["PENDING", "APPROVED", "REJECTED"],
  description:
    "Represents the status of a comment, such as pending, approved, or rejected.",
});

const CourseRole = enumType({
  name: "CourseRole",
  members: ["MENTOR", "AUTHOR"],
  description:
    "Defines the role of a user in a course, either as a Mentor or an Author.",
});

const ChangeScope = enumType({
  name: "ChangeScope",
  members: ["EDIT", "COMMENT"],
  description:
    "Defines the level of access a user has for modifying course content.",
});

module.exports = {
  CourseType,
  Permission,
  Status,
  CommentStatus,
  CourseRole,
  ChangeScope,
};
