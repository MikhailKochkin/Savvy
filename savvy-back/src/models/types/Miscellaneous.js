const { objectType, scalarType } = require("nexus");

const Application = objectType({
  name: "Application",
  definition(t) {
    t.int("id"); // ID field
    t.int("applicantId"); // Applicant ID field
    t.field("createdAt", { type: "DateTime" }); // Creation timestamp
    t.field("updatedAt", { type: "DateTime" }); // Update timestamp
    // Add any additional fields here. If there are relationships, define them as follows:
    // t.field("applicant", { type: "User" }); // Example relationship field to a User
    // t.list.field("documents", { type: "Document" }); // Example list field for related Documents
  },
});
const Certificate = objectType({
  name: "Certificate",
  definition(t) {
    t.int("id"); // Certificate ID
    t.field("createdAt", { type: "DateTime" }); // Creation timestamp
    t.field("updatedAt", { type: "DateTime" }); // Update timestamp
    t.int("studentId"); // ID of the associated student
    t.int("coursePageId"); // ID of the associated course page
    t.field("coursePage", { type: "CoursePage" }); // Relationship to the CoursePage
    t.field("student", { type: "User" }); // Relationship to the Student
  },
});

const DateTime = scalarType({
  name: "DateTime",
  asNexusMethod: "dateTime", // This allows `t.dateTime` shorthand
  description:
    "A DateTime scalar type representing ISO-8601 formatted date and time.",
  parseValue(value) {
    return new Date(value); // Convert incoming value to Date
  },
  serialize(value) {
    return value instanceof Date ? value.toISOString() : null; // Convert outgoing Date to ISO string
  },
  parseLiteral(ast) {
    if (ast.kind === "StringValue") {
      return new Date(ast.value); // Convert AST literal to Date
    }
    return null;
  },
});

const EmailReminder = objectType({
  name: "EmailReminder",
  definition(t) {
    t.int("id"); // Reminder ID
    t.string("link"); // Associated link
    t.field("sendAt", { type: "DateTime" }); // Scheduled send date and time
    t.int("coursePageId"); // Associated CoursePage ID
    t.field("coursePage", { type: "CoursePage" }); // Related CoursePage
    t.int("emailsSent"); // Number of emails sent
    t.int("gap"); // Gap between email sends
    t.field("emailCampaign", { type: "EmailCampaign" }); // Related email campaign
    t.field("user", { type: "User" }); // Associated user
    t.string("userId"); // User ID
    t.field("createdAt", { type: "DateTime" }); // Creation timestamp
    t.field("updatedAt", { type: "DateTime" }); // Update timestamp
  },
});

const EmailCampaign = objectType({
  name: "EmailCampaign",
  definition(t) {
    t.int("id"); // Campaign ID
    t.string("name"); // Campaign name
    t.string("content"); // Email content
    t.list.field("emails", { type: "EmailReminder" }); // Associated emails
    t.list.field("emailReminders", { type: "EmailReminder" }); // Related email reminders
    t.field("createdAt", { type: "DateTime" }); // Creation timestamp
    t.field("updatedAt", { type: "DateTime" }); // Update timestamp
  },
});

const Order = objectType({
  name: "Order",
  definition(t) {
    t.string("id", { description: "Unique identifier for the order." });
    t.string("paymentID", {
      description: "Payment identifier associated with the order.",
    });
    t.float("price", { description: "Price of the order." });
    t.string("level", { description: "Level or category of the order." });
    t.string("comment", {
      description: "Additional comments regarding the order.",
    });
    t.string("promocode", { description: "Promocode applied to the order." });
    t.boolean("isPaid", {
      description: "Indicates whether the order has been paid.",
    });
    t.int("userId", {
      description: "ID of the user associated with the order.",
    });
    t.int("coursePageId", {
      description: "ID of the course page linked to the order.",
    });
    t.field("coursePage", {
      type: "CoursePage",
      description: "Details of the course page linked to the order.",
    });
    t.field("user", {
      type: "User",
      description: "Details of the user associated with the order.",
    });
    // t.field("team", {
    //   type: "Team",
    //   description: "Details of the team associated with the order, if any.",
    // });
    t.field("createdAt", {
      type: "DateTime",
      description: "Timestamp when the order was created.",
    });
    t.field("updatedAt", {
      type: "DateTime",
      description: "Timestamp when the order was last updated.",
    });
  },
});

const Uni = objectType({
  name: "Uni",
  definition(t) {
    t.int("id", { description: "Unique identifier for the university." });
    t.string("title", { description: "The title or name of the university." });
    t.int("capacity", {
      description: "Capacity of the university in terms of number of students.",
    });
    // t.list.field("teachers", {
    //   type: "Teacher",
    //   description: "List of teachers associated with the university.",
    // });
    // t.list.field("paidMonths", {
    //   type: "PaidMonth",
    //   description: "Details of paid months for the university's programs.",
    // });
  },
});

const Company = objectType({
  name: "Company",
  definition(t) {
    t.int("id", { description: "Unique identifier for the company." });
    t.string("name", { description: "Name of the company." });
  },
});

const Lawrdle = objectType({
  name: "Lawrdle",
  definition(t) {
    t.int("id", { description: "Unique identifier for the Lawrdle entry." });
    t.string("word", {
      description: "Word associated with the Lawrdle entry.",
    });
    t.string("story", {
      description: "Story or context related to the Lawrdle entry.",
    });
    t.string("buttonText", {
      description: "Text displayed on the associated button.",
    });
    t.string("link", {
      description: "Link associated with the Lawrdle entry.",
    });
    t.int("authorId", {
      description: "ID of the author who created the Lawrdle entry.",
    });
    t.field("author", {
      type: "User",
      description: "Details of the author who created the Lawrdle entry.",
    });
    t.boolean("active", {
      description: "Indicates if the Lawrdle entry is active.",
    });
    t.field("coursePage", {
      type: "CoursePage",
      description: "Course page linked to the Lawrdle entry.",
    });
    t.int("coursePageId", {
      description: "ID of the course page linked to the Lawrdle entry.",
    });
    t.field("emailCampaign", {
      type: "EmailCampaign",
      description: "Email campaign associated with the Lawrdle entry.",
    });
    t.string("emailCampaignId", {
      description:
        "ID of the email campaign associated with the Lawrdle entry.",
    });
    t.string("leadin", {
      description: "Introductory text or lead-in for the Lawrdle entry.",
    });
    t.string("lessonId", {
      description: "ID of the lesson linked to the Lawrdle entry.",
    });
    t.field("createdAt", {
      type: "DateTime",
      description: "Timestamp when the Lawrdle entry was created.",
    });
    t.field("updatedAt", {
      type: "DateTime",
      description: "Timestamp when the Lawrdle entry was last updated.",
    });
  },
});

const Useful = objectType({
  name: "Useful",
  definition(t) {
    t.int("id", { description: "Unique identifier for the Useful entry." });
    t.string("header", { description: "Header text for the Useful entry." });
    t.string("name", { description: "Name of the Useful entry." });
    t.string("buttonText", {
      description: "Text displayed on the associated button.",
    });
    t.string("link", { description: "Link associated with the Useful entry." });
    t.string("image", {
      description: "Image URL associated with the Useful entry.",
    });
    // t.list.field("tags", {
    //   type: "Tag",
    //   description: "Tags associated with the Useful entry.",
    // });
    t.field("createdAt", {
      type: "DateTime",
      description: "Timestamp when the Useful entry was created.",
    });
    t.field("updatedAt", {
      type: "DateTime",
      description: "Timestamp when the Useful entry was last updated.",
    });
  },
});

module.exports = {
  Application,
  Certificate,
  DateTime,
  EmailReminder,
  EmailCampaign,
  Order,
  Uni,
  Company,
  Lawrdle,
  Useful,
};
