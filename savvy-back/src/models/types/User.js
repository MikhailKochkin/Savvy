const { objectType, inputObjectType, DateTime } = require("nexus");

const User = objectType({
  name: "User",
  definition(t) {
    t.string("id", { description: "Unique identifier for the user." });
    t.string("name", { description: "First name of the user." });
    t.string("authType", { description: "Authentication type for the user." });
    t.field("createdAt", {
      type: "DateTime",
      description: "Timestamp when the user was created.",
    });
    t.field("updatedAt", {
      type: "DateTime",
      description: "Timestamp when the user was last updated.",
    });
    t.string("surname", { description: "Surname of the user." });
    t.string("number", { description: "Contact number of the user." });
    t.string("email", { description: "Email address of the user." });
    t.string("comment", {
      description: "Additional comments or notes for the user.",
    });
    t.boolean("isFamiliar", {
      description:
        "Indicates if the user is familiar with the terms and privacy policy.",
    });
    t.string("work", { description: "Work or profession of the user." });
    t.list.field("subscriptions", {
      type: "Subscription",
      description: "List of subscriptions associated with the user.",
    });
    t.string("password", { description: "Password for the user account." });
    t.boolean("active", {
      description: "Indicates if the user account is active.",
    });
    t.float("score", { description: "Score associated with the user." });
    t.list.field("ratings", {
      type: "Rating",
      description: "List of ratings given by the user.",
    });
    t.string("description", { description: "Description or bio of the user." });
    t.list.field("messages", {
      type: "Message",
      description: "List of messages associated with the user.",
    });
    t.string("resume", { description: "Resume or CV of the user." });
    t.string("status", { description: "Status or role of the user." });
    t.list.string("tags", { description: "Tags associated with the user." });
    t.list.string("traffic_sources", {
      description: "Sources of traffic associated with the user.",
    });
    t.string("country", { description: "Country of residence of the user." });
    t.field("level", {
      type: "UserLevel",
      description: "User level or rank.",
    });
    t.string("image", { description: "Profile image URL of the user." });
    t.list.field("orders", {
      type: "Order",
      description: "List of orders placed by the user.",
    });
    t.list.field("new_subjects", {
      type: "CoursePage",
      description: "List of new subjects associated with the user.",
    });
    t.list.string("permissions", {
      description: "Permissions assigned to the user.",
    });
    t.list.field("certificates", {
      type: "Certificate",
      description: "List of certificates earned by the user.",
    });
    t.list.field("courseVisits", {
      type: "CourseVisit",
      description: "List of course visits made by the user.",
    });
    t.list.field("teams", {
      type: "Team",
      description: "Teams associated with the user.",
    });
    t.list.field("myTeams", {
      type: "Team",
      description: "Teams where the user is a member.",
    });
    t.list.field("teamQuests", {
      type: "TeamQuest",
      description: "List of team quests associated with the user.",
    });
    t.list.field("teamQuestResults", {
      type: "TeamQuestResult",
      description: "Results of team quests associated with the user.",
    });
    t.list.field("lessons", {
      type: "Lesson",
      description: "Lessons associated with the user.",
    });
    t.list.field("studentFeedback", {
      type: "Feedback",
      description: "Feedback given to students by the user.",
    });
    t.list.field("teacherFeedback", {
      type: "Feedback",
      description: "Feedback received from teachers.",
    });
    t.list.field("coursePages", {
      type: "CoursePage",
      ordering: { title: true },
      description: "Course pages owned by the user.",
    });
    t.list.field("co_coursePages", {
      type: "CoursePage",
      ordering: { title: true },
      description: "Course pages co-owned by the user.",
    });
    t.field("company", {
      type: "Company",
      description: "Company associated with the user.",
    });
    t.list.field("lessonResults", {
      type: "LessonResult",
      description: "Lesson results associated with the user.",
    });
    t.list.field("challengeResults", {
      type: "ChallengeResult",
      description: "Challenge results associated with the user.",
    });
    t.list.field("comments", {
      type: "Comment",
      description: "Comments made by the user.",
    });
  },
});

const Team = objectType({
  name: "Team",
  definition(t) {
    t.string("id", { description: "Unique identifier for the team." });
    t.string("name", { description: "Name of the team." });
    t.string("image", { description: "Image URL representing the team." });
    t.field("createdAt", {
      type: "DateTime",
      description: "Timestamp when the team was created.",
    });
    t.field("updatedAt", {
      type: "DateTime",
      description: "Timestamp when the team was last updated.",
    });
    t.field("founder", { type: "User", description: "Founder of the team." });
    t.list.field("users", {
      type: "User",
      description: "List of users in the team.",
    });
    t.list.field("orders", {
      type: "Order",
      description: "List of orders associated with the team.",
    });
  },
});

const Feedback = objectType({
  name: "Feedback",
  definition(t) {
    t.string("id", { description: "Unique identifier for the feedback." });
    t.string("text", { description: "Text content of the feedback." });
    t.int("teacherId", {
      description: "ID of the teacher who gave the feedback.",
    });
    t.int("studentId", {
      description: "ID of the student who received the feedback.",
    });
    t.string("lessonId", { description: "ID of the associated lesson." });
    t.field("lesson", {
      type: "Lesson",
      description: "Details of the associated lesson.",
    });
    t.field("teacher", {
      type: "User",
      description: "Details of the teacher who gave the feedback.",
    });
    t.field("student", {
      type: "User",
      description: "Details of the student who received the feedback.",
    });
    t.field("createdAt", {
      type: "DateTime",
      description: "Timestamp when the feedback was created.",
    });
    t.field("updatedAt", {
      type: "DateTime",
      description: "Timestamp when the feedback was last updated.",
    });
  },
});

const Message = objectType({
  name: "Message",
  definition(t) {
    t.string("id", { description: "Unique identifier for the message." });
    t.string("text", { description: "Text content of the message." });
    t.string("comment", { description: "Additional comments on the message." });
    t.string("subject", { description: "Subject of the message." });
    t.int("coursePageId", { description: "ID of the associated course page." });
    t.string("link", { description: "Link associated with the message." });
    t.string("userId", { description: "ID of the user who sent the message." });
    t.field("user", {
      type: "User",
      description: "Details of the user who sent the message.",
    });
    t.field("createdAt", {
      type: "DateTime",
      description: "Timestamp when the message was created.",
    });
    t.field("updatedAt", {
      type: "DateTime",
      description: "Timestamp when the message was last updated.",
    });
  },
});

const UserLevel = objectType({
  name: "UserLevel",
  definition(t) {
    t.string("id", { description: "Unique identifier for the user level." });
    t.string("level", { description: "Level or rank of the user." });
    t.field("user", {
      type: "User",
      description: "Details of the associated user.",
    });
    t.string("learningStreak", { description: "Learning streak of the user." });
    // t.list.field("consumedContent", {
    //   type: "ConsumedContent",
    //   description: "Content consumed by the user.",
    // // });
    // t.list.field("myProgress", {
    //   type: "Progress",
    //   description: "Progress made by the user.",
    // });
    // t.list.field("growthAreas", {
    //   type: "GrowthArea",
    //   description: "Growth areas associated with the user.",
    // });
    t.boolean("isProgressPublic", {
      description: "Indicates if the user's progress is public.",
    });
    t.field("createdAt", {
      type: "DateTime",
      description: "Timestamp when the user level was created.",
    });
    t.field("updatedAt", {
      type: "DateTime",
      description: "Timestamp when the user level was last updated.",
    });
  },
});

const GrowthArea = objectType({
  name: "GrowthArea",
  definition(t) {
    t.string("id", { description: "Unique identifier for the growth area." });
    t.string("name", { description: "Name of the growth area." });
    t.int("maxProgress", {
      description: "Maximum progress achievable in this area.",
    });
    // t.list.field("marks", {
    //   type: "Mark",
    //   description: "Marks associated with the growth area.",
    // });
    t.list.field("userLevels", {
      type: "UserLevel",
      description: "User levels linked to the growth area.",
    });
    t.field("createdAt", {
      type: "DateTime",
      description: "Timestamp when the growth area was created.",
    });
    t.field("updatedAt", {
      type: "DateTime",
      description: "Timestamp when the growth area was last updated.",
    });
  },
});

const BusinessClient = objectType({
  name: "BusinessClient",
  definition(t) {
    t.string("id", {
      description: "Unique identifier for the business client.",
    });
    t.string("name", { description: "Name of the business client." });
    t.string("surname", { description: "Surname of the business client." });
    t.string("email", { description: "Email of the business client." });
    t.string("number", {
      description: "Contact number of the business client.",
    });
    t.string("country", { description: "Country of the business client." });
    t.string("source", {
      description: "Source from which the client was acquired.",
    });
    t.string("type", {
      description: "Type or category of the business client.",
    });
    t.string("comment", {
      description: "Additional comments about the business client.",
    });
    t.list.string("tags", {
      description: "Tags associated with the business client.",
    });
    t.string("sales_cycle", {
      description: "Sales cycle details for the client.",
    });
    t.field("communication_history", {
      type: "CommunicationHistory",
      description: "History of communications with the client.",
    });
    t.string("communication_medium", {
      description: "Preferred communication medium of the client.",
    });
    t.int("coursePageId", { description: "ID of the associated course page." });
    t.field("coursePage", {
      type: "CoursePage",
      description: "Details of the associated course page.",
    });
    t.field("createdAt", {
      type: "DateTime",
      description: "Timestamp when the client record was created.",
    });
    t.field("updatedAt", {
      type: "DateTime",
      description: "Timestamp when the client record was last updated.",
    });
  },
});

const CommunicationHistory = objectType({
  name: "CommunicationHistory",
  definition(t) {
    t.list.field("messages", {
      type: "CommunicationHistoryMessage",
      description: "History of communications.",
    });
  },
});

const CommunicationHistoryMessage = objectType({
  name: "CommunicationHistoryMessage",
  definition(t) {
    t.string("id", { description: "Unique identifier for the communication." });
    t.string("subject", { description: "Subject of the communication." });
    t.string("message", {
      description: "Message content of the communication.",
    });
    t.string("date", { description: "Date of the communication." });
  },
});

const CommunicationHistoryInput = inputObjectType({
  name: "CommunicationHistoryInput",
  definition(t) {
    t.list.field("messages", {
      type: "CommunicationHistoryMessageInput",
      description: "History of communications.",
    });
  },
});

const CommunicationHistoryMessageInput = inputObjectType({
  name: "CommunicationHistoryMessageInput",
  definition(t) {
    t.string("id", { description: "Unique identifier for the communication." });
    t.string("subject", { description: "Subject of the communication." });
    t.string("message", {
      description: "Message content of the communication.",
    });
    t.string("date", { description: "Date of the communication." });
  },
});

const ConfUser = objectType({
  name: "ConfUser",
  definition(t) {
    t.string("id", {
      description: "Unique identifier for the conference user.",
    });
    t.string("email", { description: "Email address of the conference user." });
    t.string("surname", { description: "Surname of the conference user." });
    t.string("name", { description: "First name of the conference user." });
    t.string("conf_number", {
      description: "Conference number associated with the user.",
    });
    t.field("createdAt", {
      type: "DateTime",
      description: "Timestamp when the conference user record was created.",
    });
    t.field("updatedAt", {
      type: "DateTime",
      description:
        "Timestamp when the conference user record was last updated.",
    });
  },
});

const Referral = objectType({
  name: "Referral",
  definition(t) {
    t.string("id", { description: "Unique identifier for the referral." });
    t.field("createdAt", {
      type: "DateTime",
      description: "Timestamp when the referral was created.",
    });
    t.field("updatedAt", {
      type: "DateTime",
      description: "Timestamp when the referral was last updated.",
    });
    t.boolean("isCounted", {
      description: "Indicates if the referral has been counted.",
    });
    t.int("referrerId", { description: "ID of the referrer." });
    t.int("refereeId", { description: "ID of the referee." });
    t.field("referrer", {
      type: "User",
      description: "Details of the referrer.",
    });
    t.field("referee", {
      type: "User",
      description: "Details of the referee.",
    });
  },
});

const CommunityMember = objectType({
  name: "CommunityMember",
  definition(t) {
    t.string("id", {
      description: "Unique identifier for the community member.",
    });
    t.string("name", { description: "First name of the community member." });
    t.string("surname", { description: "Surname of the community member." });
    t.string("email", {
      description: "Email address of the community member.",
    });
    t.string("number", {
      description: "Contact number of the community member.",
    });
    t.string("source", {
      description: "Source of acquisition for the community member.",
    });
    t.field("subscription", {
      type: "Subscription",
      description: "Subscription details for the community member.",
    });
    t.field("createdAt", {
      type: "DateTime",
      description: "Timestamp when the community member record was created.",
    });
    t.field("updatedAt", {
      type: "DateTime",
      description:
        "Timestamp when the community member record was last updated.",
    });
  },
});

const Visits = inputObjectType({
  name: "Visits",
  definition(t) {
    t.list.field("visitsList", {
      type: "Visit",
      description: "List of visits made by the user.",
    });
  },
});

const Visit = inputObjectType({
  name: "Visit",
  definition(t) {
    t.string("date", { description: "Date of the visit." });
    t.string("utm_source", {
      description: "UTM source associated with the visit.",
    });
    t.string("utm_medium", {
      description: "UTM medium associated with the visit.",
    });
    t.string("utm_campaign", {
      description: "UTM campaign associated with the visit.",
    });
  },
});

const BotDialogue = objectType({
  name: "BotDialogue",
  definition(t) {
    t.string("id", { description: "Unique identifier for the bot dialogue." });
    t.string("journey", {
      description: "Journey or path of the bot dialogue.",
    });
    t.float("rating", { description: "Rating given for the bot dialogue." });
    t.string("source", {
      description: "Source or context of the bot dialogue.",
    });
    t.field("createdAt", {
      type: "DateTime",
      description: "Timestamp when the bot dialogue was created.",
    });
    t.field("updatedAt", {
      type: "DateTime",
      description: "Timestamp when the bot dialogue was last updated.",
    });
  },
});

const Subscription = objectType({
  name: "Subscription",
  definition(t) {
    t.string("id", { description: "Unique identifier for the subscription." });
    t.boolean("isActive", {
      description: "Indicates if the subscription is active.",
    });
    t.string("type", { description: "Type of the subscription." });
    t.string("term", { description: "Term or duration of the subscription." });
    t.field("startDate", {
      type: "DateTime",
      description: "Start date of the subscription.",
    });
    t.field("endDate", {
      type: "DateTime",
      description: "End date of the subscription.",
    });
    t.string("paymentID", {
      description: "Payment ID associated with the subscription.",
    });
    t.list.field("renewals", {
      type: "Renewal",
      description: "List of renewals associated with the subscription.",
    });
    t.string("userId", {
      description: "ID of the user associated with the subscription.",
    });
    t.field("user", {
      type: "User",
      description: "Details of the user associated with the subscription.",
    });
    t.field("createdAt", {
      type: "DateTime",
      description: "Timestamp when the subscription was created.",
    });
    t.field("updatedAt", {
      type: "DateTime",
      description: "Timestamp when the subscription was last updated.",
    });
  },
});

const Renewal = objectType({
  name: "Renewal",
  description: "Represents a single renewal record.",
  definition(t) {
    t.string("date", { description: "Date of the renewal." });
    t.string("type", { description: "Type of renewal." });
    t.string("price", { description: "Price associated with the renewal." });
  },
});

// Output type for Renewals
const Renewals = objectType({
  name: "Renewals",
  description: "List of renewal records.",
  definition(t) {
    t.list.field("renewals", {
      type: "Renewal", // Reference the Renewal output type here
      description: "List of individual renewals.",
    });
  },
});

const NewStudentFilter = inputObjectType({
  name: "NewStudentFilter",
  definition(t) {
    t.string("id", { description: "Filter by student ID." });
    t.string("name", { description: "Filter by student name." }); // Example field
  },
});

module.exports = {
  User,
  Feedback,
  UserLevel,
  Message,
  BusinessClient,
  ConfUser,
  CommunityMember,
  Visits,
  Visit,
  Team,
  BotDialogue,
  GrowthArea,
  Subscription,
  Renewals,
  Renewal,
  Referral,
  NewStudentFilter,
  CommunicationHistory,
  CommunicationHistoryMessage,
  CommunicationHistoryMessageInput,
  CommunicationHistoryInput,
};
