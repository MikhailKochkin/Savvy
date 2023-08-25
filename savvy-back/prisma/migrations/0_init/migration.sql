-- CreateEnum
CREATE TYPE "CheckType" AS ENUM ('WORD', 'IDEA');

-- CreateEnum
CREATE TYPE "CourseType" AS ENUM ('PUBLIC', 'PRIVATE', 'FORMONEY', 'UNI', 'CHALLENGE');

-- CreateEnum
CREATE TYPE "Level" AS ENUM ('STANDARD', 'ADVANCED');

-- CreateEnum
CREATE TYPE "PageView" AS ENUM ('COURSE', 'CONF');

-- CreateEnum
CREATE TYPE "Permission" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('STUDENT', 'LAWYER', 'AUTHOR', 'SAVVY_AUTHOR', 'HR');

-- CreateEnum
CREATE TYPE "TaskType" AS ENUM ('TEST', 'FORM');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('STORY', 'REGULAR', 'CHALLENGE', 'HIDDEN');

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "applicantId" VARCHAR(25) NOT NULL,
    "applicantName" TEXT NOT NULL,
    "message" TEXT,
    "coursePageID" VARCHAR(25) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "coursePageId" VARCHAR(30) NOT NULL,
    "promocode" TEXT,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BotDialogue" (
    "id" TEXT NOT NULL,
    "journey" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rating" INTEGER,
    "source" TEXT,

    CONSTRAINT "BotDialogue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessClient" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,
    "number" TEXT,
    "communication_medium" TEXT,
    "type" TEXT,
    "comment" TEXT,
    "tags" TEXT[],
    "coursePageId" TEXT,
    "surname" TEXT,
    "country" TEXT,
    "source" TEXT,
    "communication_history" JSONB,
    "sales_cycle" JSONB,

    CONSTRAINT "BusinessClient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CareerTrack" (
    "id" VARCHAR(30) NOT NULL,
    "name" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "img" TEXT,

    CONSTRAINT "CareerTrack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CareerTrackUnit" (
    "id" VARCHAR(30) NOT NULL,
    "title" TEXT NOT NULL,
    "number" INTEGER,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "img" TEXT,
    "topics" TEXT[],
    "articles" TEXT[],
    "careerTrackId" VARCHAR(30) NOT NULL,

    CONSTRAINT "CareerTrackUnit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certificate" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "studentId" TEXT NOT NULL,
    "coursePageId" TEXT NOT NULL,

    CONSTRAINT "Certificate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChallengeResult" (
    "id" VARCHAR(30) NOT NULL,
    "correct" INTEGER,
    "wrong" INTEGER,
    "time" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "studentId" VARCHAR(30) NOT NULL,
    "lessonId" VARCHAR(30) NOT NULL,

    CONSTRAINT "ChallengeResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chat" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "messages" JSONB,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "complexity" INTEGER DEFAULT 1,
    "link_clicks" INTEGER DEFAULT 0,
    "isSecret" BOOLEAN DEFAULT false,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clause" (
    "id" VARCHAR(30) NOT NULL,
    "number" INTEGER NOT NULL,
    "commentary" TEXT NOT NULL,
    "sample" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "keywords" TEXT[],
    "userId" VARCHAR(30) NOT NULL,
    "documentId" VARCHAR(30) NOT NULL,

    CONSTRAINT "Clause_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommunityMember" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT,
    "number" TEXT,
    "subscription" TEXT,
    "source" TEXT,

    CONSTRAINT "CommunityMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" VARCHAR(30) NOT NULL,
    "name" TEXT NOT NULL,
    "paidMonths" INTEGER DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConfUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "surname" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "conf_number" INTEGER,

    CONSTRAINT "ConfUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Construction" (
    "id" VARCHAR(30) NOT NULL,
    "name" TEXT NOT NULL,
    "lessonID" VARCHAR(30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "hint" TEXT,
    "type" TEXT NOT NULL,
    "variants" TEXT[],
    "answer" TEXT[],
    "userId" VARCHAR(30) NOT NULL,
    "lessonId" VARCHAR(30) NOT NULL,
    "complexity" INTEGER DEFAULT 1,
    "text" TEXT,
    "hasText" BOOLEAN NOT NULL DEFAULT false,
    "columnsNum" INTEGER,
    "elements" JSONB,

    CONSTRAINT "Construction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConstructionResult" (
    "id" VARCHAR(30) NOT NULL,
    "answer" TEXT,
    "attempts" INTEGER,
    "constructionID" VARCHAR(30),
    "lessonID" VARCHAR(30),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "inputs" TEXT[],
    "studentId" VARCHAR(30) NOT NULL,
    "lessonId" VARCHAR(30),
    "constructionId" VARCHAR(30),

    CONSTRAINT "ConstructionResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoursePage" (
    "id" VARCHAR(30) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "courseType" "CourseType",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "price" INTEGER,
    "discountPrice" INTEGER,
    "numInCareerTrack" INTEGER,
    "published" BOOLEAN DEFAULT false,
    "uniID" VARCHAR(30),
    "news" TEXT DEFAULT 'Добро пожаловать на курс! Проходите уроки, выполняйте задания и выполняйте финальное задание!',
    "audience" TEXT,
    "result" TEXT,
    "tariffs" TEXT,
    "methods" TEXT,
    "openLesson" VARCHAR(25),
    "video" TEXT,
    "companyId" VARCHAR(30),
    "banner" TEXT,
    "batch" TEXT,
    "reviews" JSONB,
    "weeks" INTEGER,
    "subscriptionPrice" INTEGER,
    "subscription" BOOLEAN DEFAULT false,
    "tags" TEXT[],
    "students" TEXT[],
    "userId" VARCHAR(30) NOT NULL,
    "uniId" VARCHAR(30),
    "examQuestionId" VARCHAR(30),
    "promocode" JSONB,
    "header" TEXT[],
    "subheader" TEXT[],
    "nextStart" TIMESTAMP(3),
    "uptodateAt" TIMESTAMP(3),
    "goals" TEXT[],
    "currency" TEXT DEFAULT 'ruble',
    "installments" INTEGER,
    "view" "PageView" NOT NULL DEFAULT 'COURSE',
    "countries" TEXT[],
    "prices" JSONB,
    "modules" JSONB,
    "promotionId" TEXT,

    CONSTRAINT "CoursePage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseVisit" (
    "id" VARCHAR(30) NOT NULL,
    "visitsNumber" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "finish" TIMESTAMP(3),
    "reminders" TIMESTAMP[],
    "studentId" VARCHAR(30) NOT NULL,
    "coursePageId" VARCHAR(30) NOT NULL,
    "comment" TEXT,
    "info" JSONB,

    CONSTRAINT "CourseVisit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" VARCHAR(30) NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" VARCHAR(30) NOT NULL,
    "lessonId" VARCHAR(30) NOT NULL,
    "complexity" INTEGER DEFAULT 1,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentResult" (
    "id" VARCHAR(30) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "answers" TEXT[],
    "drafts" TEXT[],
    "userId" VARCHAR(30),
    "lessonId" VARCHAR(30),
    "documentId" VARCHAR(30),

    CONSTRAINT "DocumentResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailCampaign" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "emails" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT,

    CONSTRAINT "EmailCampaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailReminder" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "coursePageId" TEXT,
    "sendAt" TIMESTAMP(3),
    "link" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "emailsSent" TEXT[],
    "status" INTEGER,
    "emailCampaignId" TEXT,
    "gap" INTEGER DEFAULT 1,

    CONSTRAINT "EmailReminder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exam" (
    "id" VARCHAR(30) NOT NULL,
    "nodeType" TEXT,
    "nodeID" VARCHAR(25),
    "question" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "userId" VARCHAR(30) NOT NULL,
    "lessonId" VARCHAR(30) NOT NULL,

    CONSTRAINT "Exam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExamAnswer" (
    "id" VARCHAR(30) NOT NULL,
    "answer" TEXT NOT NULL,
    "examQuestionID" VARCHAR(25) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "studentId" VARCHAR(30) NOT NULL,
    "examQuestionId" VARCHAR(30) NOT NULL,

    CONSTRAINT "ExamAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExamQuestion" (
    "id" VARCHAR(30) NOT NULL,
    "coursePageID" VARCHAR(25) NOT NULL,
    "question" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExamQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExamResult" (
    "id" VARCHAR(30) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "answers" TEXT[],
    "userId" VARCHAR(30),
    "lessonId" VARCHAR(30),
    "examId" VARCHAR(30),

    CONSTRAINT "ExamResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" VARCHAR(30) NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "teacherId" VARCHAR(30) NOT NULL,
    "studentId" VARCHAR(30) NOT NULL,
    "lessonId" VARCHAR(30),

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Forum" (
    "id" VARCHAR(30) NOT NULL,
    "text" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" VARCHAR(30),

    CONSTRAINT "Forum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GrowthArea" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "maxProgress" INTEGER,
    "marks" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GrowthArea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lawrdle" (
    "id" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "story" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pros" TEXT[],
    "tags" TEXT[],
    "coursePageId" TEXT,
    "buttonText" TEXT,
    "link" TEXT,
    "emailCampaignId" TEXT,
    "leadin" TEXT,
    "lessonId" TEXT,

    CONSTRAINT "Lawrdle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LegalPortfolio" (
    "id" VARCHAR(30) NOT NULL,
    "cv" TEXT,
    "resume" TEXT,
    "open" BOOLEAN NOT NULL DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "portfolioIDs" TEXT[],

    CONSTRAINT "LegalPortfolio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lesson" (
    "id" VARCHAR(30) NOT NULL,
    "text" TEXT NOT NULL,
    "coursePageID" VARCHAR(30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "number" INTEGER,
    "published" BOOLEAN DEFAULT false,
    "open" BOOLEAN DEFAULT false,
    "type" TEXT DEFAULT 'REGULAR',
    "description" TEXT,
    "structure" JSONB,
    "challenge_num" INTEGER DEFAULT 10,
    "change" TEXT,
    "map" JSON[],
    "userId" VARCHAR(30) NOT NULL,
    "coursePageId" VARCHAR(30) NOT NULL,
    "forumId" VARCHAR(30),
    "image" TEXT,
    "short_structure" JSONB,
    "assignment" BOOLEAN,
    "totalPoints" INTEGER DEFAULT 0,
    "hasSecret" BOOLEAN DEFAULT false,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LessonResult" (
    "id" VARCHAR(30) NOT NULL,
    "visitsNumber" INTEGER DEFAULT 1,
    "lessonID" VARCHAR(30),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "progress" INTEGER DEFAULT 0,
    "studentId" VARCHAR(30) NOT NULL,
    "lessonId" VARCHAR(30) NOT NULL,
    "checked" BOOLEAN DEFAULT false,

    CONSTRAINT "LessonResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "text" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,
    "subject" TEXT,
    "comment" TEXT,
    "coursePageId" TEXT,
    "link" TEXT,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MiniForum" (
    "id" TEXT NOT NULL,
    "text" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lessonId" TEXT,
    "userId" TEXT,
    "type" TEXT,
    "value" TEXT,

    CONSTRAINT "MiniForum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewTest" (
    "id" VARCHAR(30) NOT NULL,
    "lessonID" VARCHAR(30),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" TEXT DEFAULT 'TEST',
    "next" JSONB,
    "ifRight" TEXT,
    "ifWrong" TEXT,
    "question" TEXT[],
    "answers" TEXT[],
    "correct" BOOLEAN[],
    "userId" VARCHAR(30) NOT NULL,
    "lessonId" VARCHAR(30),
    "complexity" INTEGER DEFAULT 1,
    "comments" TEXT[],

    CONSTRAINT "NewTest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Note" (
    "id" VARCHAR(30) NOT NULL,
    "text" TEXT NOT NULL,
    "lessonID" VARCHAR(30),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "next" JSONB,
    "userId" VARCHAR(30),
    "lessonId" VARCHAR(30),
    "chat" BOOLEAN,
    "complexity" INTEGER DEFAULT 1,
    "link_clicks" INTEGER DEFAULT 0,
    "isSecret" BOOLEAN DEFAULT false,
    "type" TEXT DEFAULT 'longread',

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Offer" (
    "id" TEXT NOT NULL,
    "header" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "type" TEXT,
    "courseId" TEXT,
    "price" INTEGER,
    "discountPrice" INTEGER,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    "lessonId" TEXT,
    "programId" TEXT,

    CONSTRAINT "Offer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" VARCHAR(30) NOT NULL,
    "price" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "paymentID" TEXT,
    "promocode" TEXT,
    "isPaid" BOOLEAN,
    "level" "Level",
    "comment" TEXT,
    "userId" VARCHAR(30) NOT NULL,
    "coursePageId" VARCHAR(30) NOT NULL,
    "programId" TEXT,
    "teamId" TEXT,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PointA" (
    "id" VARCHAR(30) NOT NULL,
    "description" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "coursePageID" VARCHAR(25),
    "userId" VARCHAR(30) NOT NULL,
    "coursePageId" VARCHAR(30) NOT NULL,
    "text" TEXT,

    CONSTRAINT "PointA_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PointATest" (
    "id" VARCHAR(30) NOT NULL,
    "question" TEXT NOT NULL,
    "answer1" TEXT NOT NULL,
    "answer1Correct" TEXT NOT NULL,
    "answer2" TEXT NOT NULL,
    "answer2Correct" TEXT NOT NULL,
    "answer3" TEXT,
    "answer3Correct" TEXT,
    "answer4" TEXT,
    "answer4Correct" TEXT,
    "coursePageID" VARCHAR(25),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" VARCHAR(30) NOT NULL,
    "coursePageId" VARCHAR(30),

    CONSTRAINT "PointATest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" VARCHAR(30) NOT NULL,
    "title" TEXT,
    "text" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "likes" INTEGER DEFAULT 1,
    "tags" TEXT[],
    "userId" VARCHAR(30) NOT NULL,
    "summary" TEXT,
    "image" TEXT,
    "language" TEXT DEFAULT 'ru',
    "coursePageId" TEXT,
    "lessonId" TEXT,
    "leadin" TEXT,
    "emailCampaignId" TEXT,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Problem" (
    "id" VARCHAR(30) NOT NULL,
    "text" TEXT NOT NULL,
    "hints" TEXT,
    "solution" TEXT,
    "answer" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lessonID" VARCHAR(30) NOT NULL,
    "nodeType" TEXT,
    "nodeID" VARCHAR(30),
    "hintsList" TEXT[],
    "solutionList" TEXT[],
    "userId" VARCHAR(30) NOT NULL,
    "lessonId" VARCHAR(30) NOT NULL,
    "complexity" INTEGER DEFAULT 1,
    "isSecret" BOOLEAN DEFAULT false,
    "steps" JSONB,

    CONSTRAINT "Problem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProblemResult" (
    "id" VARCHAR(30) NOT NULL,
    "answer" TEXT,
    "lessonID" VARCHAR(30),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "problemID" VARCHAR(30),
    "revealed" TEXT[],
    "studentId" VARCHAR(30) NOT NULL,
    "lessonId" VARCHAR(30),
    "problemId" VARCHAR(30),
    "depth" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ProblemResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Program" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "price" INTEGER,
    "currency" TEXT DEFAULT 'ruble',
    "discountPrice" INTEGER,
    "published" BOOLEAN DEFAULT false,
    "news" TEXT,
    "audience" TEXT,
    "result" TEXT,
    "tariffs" TEXT,
    "methods" TEXT,
    "video" TEXT,
    "batch" TEXT,
    "header" TEXT[],
    "subheader" TEXT[],
    "nextStart" TIMESTAMP(3),
    "uptodateAt" TIMESTAMP(3),
    "goals" TEXT[],
    "reviews" JSONB,
    "installments" INTEGER,
    "tags" TEXT[],
    "promocode" JSONB,
    "promotionId" TEXT,
    "syllabus" JSONB,
    "months" INTEGER,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quiz" (
    "id" VARCHAR(30) NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "lessonID" VARCHAR(30),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" TEXT DEFAULT 'TEST',
    "next" JSONB,
    "ifRight" TEXT,
    "ifWrong" TEXT,
    "check" TEXT DEFAULT 'IDEA',
    "userId" VARCHAR(30) NOT NULL,
    "lessonId" VARCHAR(30),
    "complexity" INTEGER DEFAULT 1,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizResult" (
    "id" VARCHAR(30) NOT NULL,
    "answer" TEXT,
    "attempts" INTEGER,
    "lessonID" VARCHAR(30),
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "correct" BOOLEAN,
    "studentId" VARCHAR(30) NOT NULL,
    "lessonId" VARCHAR(30),
    "quizId" VARCHAR(30),

    CONSTRAINT "QuizResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rating" (
    "id" VARCHAR(30) NOT NULL,
    "rating" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" VARCHAR(30),
    "forumId" VARCHAR(30),

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sandbox" (
    "id" VARCHAR(30) NOT NULL,
    "text" TEXT NOT NULL,
    "video" TEXT,
    "sandboxPageID" VARCHAR(25) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "likes" INTEGER DEFAULT 0,
    "link" TEXT,
    "sandboxPageId" VARCHAR(30) NOT NULL,

    CONSTRAINT "Sandbox_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SandboxPage" (
    "id" VARCHAR(30) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "students" TEXT[],
    "userId" VARCHAR(30) NOT NULL,

    CONSTRAINT "SandboxPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SandboxPageGoal" (
    "id" VARCHAR(30) NOT NULL,
    "goal" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "sandboxPageID" VARCHAR(25) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" VARCHAR(30) NOT NULL,
    "sandboxPageId" VARCHAR(30),

    CONSTRAINT "SandboxPageGoal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shot" (
    "id" VARCHAR(30) NOT NULL,
    "title" TEXT NOT NULL,
    "lessonID" VARCHAR(30),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "parts" TEXT[],
    "comments" TEXT[],
    "userId" VARCHAR(30) NOT NULL,
    "lessonId" VARCHAR(30),

    CONSTRAINT "Shot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShotResult" (
    "id" VARCHAR(30) NOT NULL,
    "answer" TEXT NOT NULL,
    "lessonID" VARCHAR(30),
    "shotID" VARCHAR(30),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "studentId" VARCHAR(30) NOT NULL,
    "lessonId" VARCHAR(30),
    "shotId" VARCHAR(30),
    "depth" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "ShotResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Statement" (
    "id" VARCHAR(30) NOT NULL,
    "text" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" VARCHAR(30),
    "forumId" VARCHAR(30),
    "comments" TEXT[],
    "answered" BOOLEAN DEFAULT false,
    "miniforumId" TEXT,

    CONSTRAINT "Statement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "founderId" TEXT NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamQuest" (
    "id" TEXT NOT NULL,
    "introduction" TEXT NOT NULL,
    "solution" TEXT,
    "tasks" JSONB NOT NULL,
    "userId" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TeamQuest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamQuestResult" (
    "id" TEXT NOT NULL,
    "answer" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "studentId" TEXT NOT NULL,
    "lessonId" TEXT,
    "teamQuestId" TEXT,

    CONSTRAINT "TeamQuestResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Test" (
    "id" VARCHAR(30) NOT NULL,
    "question" TEXT NOT NULL,
    "answer1" TEXT NOT NULL,
    "answer1Correct" TEXT NOT NULL,
    "answer2" TEXT NOT NULL,
    "answer2Correct" TEXT NOT NULL,
    "answer3" TEXT,
    "answer3Correct" TEXT,
    "answer4" TEXT,
    "answer4Correct" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lessonID" VARCHAR(25),
    "userId" VARCHAR(30) NOT NULL,
    "lessonId" VARCHAR(30),

    CONSTRAINT "Test_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestPractice" (
    "id" TEXT NOT NULL,
    "text" TEXT,
    "tasksNum" INTEGER NOT NULL,
    "tasks" TEXT[],
    "userId" TEXT,
    "lessonId" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "intro" TEXT,
    "successText" TEXT,
    "failureText" TEXT,

    CONSTRAINT "TestPractice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestPracticeResult" (
    "id" TEXT NOT NULL,
    "tasks" TEXT[],
    "correct" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "studentId" TEXT NOT NULL,
    "lessonId" TEXT,
    "testPracticeId" TEXT,

    CONSTRAINT "TestPracticeResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestResult" (
    "id" VARCHAR(30) NOT NULL,
    "answer" TEXT,
    "attempts" INTEGER,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lessonID" VARCHAR(30),
    "testID" VARCHAR(30),
    "studentId" VARCHAR(30) NOT NULL,
    "lessonId" VARCHAR(30),
    "testId" VARCHAR(30),
    "answerAray" TEXT[],

    CONSTRAINT "TestResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TextEditor" (
    "id" VARCHAR(30) NOT NULL,
    "name" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "lessonID" VARCHAR(30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "totalMistakes" INTEGER,
    "userId" VARCHAR(30) NOT NULL,
    "lessonId" VARCHAR(30) NOT NULL,
    "complexity" INTEGER DEFAULT 1,

    CONSTRAINT "TextEditor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TextEditorResult" (
    "id" VARCHAR(30) NOT NULL,
    "attempts" INTEGER,
    "wrong" TEXT,
    "correct" TEXT,
    "guess" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "result" BOOLEAN,
    "studentId" VARCHAR(30) NOT NULL,
    "lessonId" VARCHAR(30),
    "textEditorId" VARCHAR(30),
    "type" TEXT,

    CONSTRAINT "TextEditorResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Uni" (
    "id" VARCHAR(30) NOT NULL,
    "title" TEXT NOT NULL,
    "capacity" INTEGER DEFAULT 2,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paidMonths" INTEGER DEFAULT 0,

    CONSTRAINT "Uni_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Useful" (
    "id" TEXT NOT NULL,
    "header" TEXT NOT NULL,
    "buttonText" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tags" TEXT[],
    "image" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "Useful_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" VARCHAR(30) NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "resetToken" TEXT,
    "resetTokenExpiry" DECIMAL(65,30),
    "isFamiliar" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "careerTrackID" VARCHAR(30),
    "status" TEXT DEFAULT 'STUDENT',
    "uniID" VARCHAR(30),
    "description" TEXT,
    "resume" TEXT,
    "coverLetter" TEXT,
    "surname" TEXT,
    "image" TEXT,
    "favourites" TEXT[],
    "subjects" TEXT[],
    "permissions" "Permission"[],
    "uniId" VARCHAR(30),
    "companyId" VARCHAR(30),
    "legalPortfolioId" VARCHAR(30),
    "careerTrackId" VARCHAR(30),
    "levelId" VARCHAR(30),
    "number" TEXT,
    "tags" TEXT[],
    "comment" TEXT,
    "work" TEXT,
    "country" TEXT,
    "traffic_sources" JSONB,
    "active" BOOLEAN DEFAULT false,
    "score" INTEGER DEFAULT 0,
    "referal" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserLevel" (
    "id" VARCHAR(30) NOT NULL,
    "level" DECIMAL(65,30) DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "consumedContent" JSONB,
    "myProgress" JSONB,
    "isProgressPublic" BOOLEAN DEFAULT false,
    "learningStreak" TIMESTAMP(3)[],

    CONSTRAINT "UserLevel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AuthorsCoursePage" (
    "A" VARCHAR(30) NOT NULL,
    "B" VARCHAR(30) NOT NULL
);

-- CreateTable
CREATE TABLE "_CareerTrackUnitToCoursePage" (
    "A" VARCHAR(30) NOT NULL,
    "B" VARCHAR(30) NOT NULL
);

-- CreateTable
CREATE TABLE "_CoursePageForCareer" (
    "A" VARCHAR(30) NOT NULL,
    "B" VARCHAR(30) NOT NULL
);

-- CreateTable
CREATE TABLE "_CoursePageToProgram" (
    "A" VARCHAR(30) NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ExamAnswerToLegalPortfolio" (
    "A" VARCHAR(30) NOT NULL,
    "B" VARCHAR(30) NOT NULL
);

-- CreateTable
CREATE TABLE "_GrowthAreaToUserLevel" (
    "A" TEXT NOT NULL,
    "B" VARCHAR(30) NOT NULL
);

-- CreateTable
CREATE TABLE "_PointATests" (
    "A" VARCHAR(30) NOT NULL,
    "B" VARCHAR(30) NOT NULL
);

-- CreateTable
CREATE TABLE "_UserSubjects" (
    "A" VARCHAR(30) NOT NULL,
    "B" VARCHAR(30) NOT NULL
);

-- CreateTable
CREATE TABLE "_joinedTeams" (
    "A" TEXT NOT NULL,
    "B" VARCHAR(30) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CoursePage.examQuestionId_unique" ON "CoursePage"("examQuestionId" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "Lesson.forumId_unique" ON "Lesson"("forumId" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "User.careerTrackId_unique" ON "User"("careerTrackId" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "User.legalPortfolioId_unique" ON "User"("legalPortfolioId" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "User.levelId_unique" ON "User"("levelId" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "_AuthorsCoursePage_AB_unique" ON "_AuthorsCoursePage"("A" ASC, "B" ASC);

-- CreateIndex
CREATE INDEX "_AuthorsCoursePage_B_index" ON "_AuthorsCoursePage"("B" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "_CareerTrackUnitToCoursePage_AB_unique" ON "_CareerTrackUnitToCoursePage"("A" ASC, "B" ASC);

-- CreateIndex
CREATE INDEX "_CareerTrackUnitToCoursePage_B_index" ON "_CareerTrackUnitToCoursePage"("B" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "_CoursePageForCareer_AB_unique" ON "_CoursePageForCareer"("A" ASC, "B" ASC);

-- CreateIndex
CREATE INDEX "_CoursePageForCareer_B_index" ON "_CoursePageForCareer"("B" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "_CoursePageToProgram_AB_unique" ON "_CoursePageToProgram"("A" ASC, "B" ASC);

-- CreateIndex
CREATE INDEX "_CoursePageToProgram_B_index" ON "_CoursePageToProgram"("B" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "_ExamAnswerToLegalPortfolio_AB_unique" ON "_ExamAnswerToLegalPortfolio"("A" ASC, "B" ASC);

-- CreateIndex
CREATE INDEX "_ExamAnswerToLegalPortfolio_B_index" ON "_ExamAnswerToLegalPortfolio"("B" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "_GrowthAreaToUserLevel_AB_unique" ON "_GrowthAreaToUserLevel"("A" ASC, "B" ASC);

-- CreateIndex
CREATE INDEX "_GrowthAreaToUserLevel_B_index" ON "_GrowthAreaToUserLevel"("B" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "_PointATests_AB_unique" ON "_PointATests"("A" ASC, "B" ASC);

-- CreateIndex
CREATE INDEX "_PointATests_B_index" ON "_PointATests"("B" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "_UserSubjects_AB_unique" ON "_UserSubjects"("A" ASC, "B" ASC);

-- CreateIndex
CREATE INDEX "_UserSubjects_B_index" ON "_UserSubjects"("B" ASC);

-- CreateIndex
CREATE UNIQUE INDEX "_joinedTeams_AB_unique" ON "_joinedTeams"("A" ASC, "B" ASC);

-- CreateIndex
CREATE INDEX "_joinedTeams_B_index" ON "_joinedTeams"("B" ASC);

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_coursePageId_fkey" FOREIGN KEY ("coursePageId") REFERENCES "CoursePage"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "BusinessClient" ADD CONSTRAINT "BusinessClient_coursePageId_fkey" FOREIGN KEY ("coursePageId") REFERENCES "CoursePage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_coursePageId_fkey" FOREIGN KEY ("coursePageId") REFERENCES "CoursePage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChallengeResult" ADD CONSTRAINT "ChallengeResult_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ChallengeResult" ADD CONSTRAINT "ChallengeResult_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clause" ADD CONSTRAINT "Clause_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Clause" ADD CONSTRAINT "Clause_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Construction" ADD CONSTRAINT "Construction_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Construction" ADD CONSTRAINT "Construction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ConstructionResult" ADD CONSTRAINT "ConstructionResult_constructionId_fkey" FOREIGN KEY ("constructionId") REFERENCES "Construction"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ConstructionResult" ADD CONSTRAINT "ConstructionResult_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ConstructionResult" ADD CONSTRAINT "ConstructionResult_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CoursePage" ADD CONSTRAINT "CoursePage_company_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CoursePage" ADD CONSTRAINT "CoursePage_examQuestionId_fkey" FOREIGN KEY ("examQuestionId") REFERENCES "ExamQuestion"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CoursePage" ADD CONSTRAINT "CoursePage_uniId_fkey" FOREIGN KEY ("uniId") REFERENCES "Uni"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CoursePage" ADD CONSTRAINT "CoursePage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CourseVisit" ADD CONSTRAINT "CourseVisit_coursePageId_fkey" FOREIGN KEY ("coursePageId") REFERENCES "CoursePage"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CourseVisit" ADD CONSTRAINT "CourseVisit_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "DocumentResult" ADD CONSTRAINT "DocumentResult_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "DocumentResult" ADD CONSTRAINT "DocumentResult_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "DocumentResult" ADD CONSTRAINT "DocumentResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "EmailReminder" ADD CONSTRAINT "EmailReminder_coursePageId_fkey" FOREIGN KEY ("coursePageId") REFERENCES "CoursePage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailReminder" ADD CONSTRAINT "EmailReminder_emailCampaignId_fkey" FOREIGN KEY ("emailCampaignId") REFERENCES "EmailCampaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailReminder" ADD CONSTRAINT "EmailReminder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ExamAnswer" ADD CONSTRAINT "ExamAnswer_examQuestionId_fkey" FOREIGN KEY ("examQuestionId") REFERENCES "ExamQuestion"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ExamAnswer" ADD CONSTRAINT "ExamAnswer_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ExamResult" ADD CONSTRAINT "ExamResult_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ExamResult" ADD CONSTRAINT "ExamResult_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ExamResult" ADD CONSTRAINT "ExamResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Forum" ADD CONSTRAINT "Forum_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Lawrdle" ADD CONSTRAINT "Lawrdle_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lawrdle" ADD CONSTRAINT "Lawrdle_coursePageId_fkey" FOREIGN KEY ("coursePageId") REFERENCES "CoursePage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lawrdle" ADD CONSTRAINT "Lawrdle_emailCampaignId_fkey" FOREIGN KEY ("emailCampaignId") REFERENCES "EmailCampaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_coursePageId_fkey" FOREIGN KEY ("coursePageId") REFERENCES "CoursePage"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_forumId_fkey" FOREIGN KEY ("forumId") REFERENCES "Forum"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "LessonResult" ADD CONSTRAINT "LessonResult_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "LessonResult" ADD CONSTRAINT "LessonResult_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MiniForum" ADD CONSTRAINT "MiniForum_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MiniForum" ADD CONSTRAINT "MiniForum_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewTest" ADD CONSTRAINT "NewTest_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "NewTest" ADD CONSTRAINT "NewTest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_coursePageId_fkey" FOREIGN KEY ("coursePageId") REFERENCES "CoursePage"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PointA" ADD CONSTRAINT "PointA_coursePageId_fkey" FOREIGN KEY ("coursePageId") REFERENCES "CoursePage"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PointA" ADD CONSTRAINT "PointA_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PointATest" ADD CONSTRAINT "PointATest_coursePageId_fkey" FOREIGN KEY ("coursePageId") REFERENCES "CoursePage"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PointATest" ADD CONSTRAINT "PointATest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_coursePageId_fkey" FOREIGN KEY ("coursePageId") REFERENCES "CoursePage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_emailCampaignId_fkey" FOREIGN KEY ("emailCampaignId") REFERENCES "EmailCampaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Problem" ADD CONSTRAINT "Problem_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Problem" ADD CONSTRAINT "Problem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProblemResult" ADD CONSTRAINT "ProblemResult_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProblemResult" ADD CONSTRAINT "ProblemResult_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProblemResult" ADD CONSTRAINT "ProblemResult_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "QuizResult" ADD CONSTRAINT "QuizResult_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "QuizResult" ADD CONSTRAINT "QuizResult_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "QuizResult" ADD CONSTRAINT "QuizResult_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_forumId_fkey" FOREIGN KEY ("forumId") REFERENCES "Forum"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Sandbox" ADD CONSTRAINT "Sandbox_sandboxPageId_fkey" FOREIGN KEY ("sandboxPageId") REFERENCES "SandboxPage"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SandboxPage" ADD CONSTRAINT "SandboxPage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SandboxPageGoal" ADD CONSTRAINT "SandboxPageGoal_sandboxPageId_fkey" FOREIGN KEY ("sandboxPageId") REFERENCES "SandboxPage"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SandboxPageGoal" ADD CONSTRAINT "SandboxPageGoal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Shot" ADD CONSTRAINT "Shot_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Shot" ADD CONSTRAINT "Shot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ShotResult" ADD CONSTRAINT "ShotResult_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ShotResult" ADD CONSTRAINT "ShotResult_shotId_fkey" FOREIGN KEY ("shotId") REFERENCES "Shot"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ShotResult" ADD CONSTRAINT "ShotResult_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Statement" ADD CONSTRAINT "Statement_forumId_fkey" FOREIGN KEY ("forumId") REFERENCES "Forum"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Statement" ADD CONSTRAINT "Statement_miniforumId_fkey" FOREIGN KEY ("miniforumId") REFERENCES "MiniForum"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Statement" ADD CONSTRAINT "Statement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_founderId_fkey" FOREIGN KEY ("founderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamQuest" ADD CONSTRAINT "TeamQuest_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamQuest" ADD CONSTRAINT "TeamQuest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamQuestResult" ADD CONSTRAINT "TeamQuestResult_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamQuestResult" ADD CONSTRAINT "TeamQuestResult_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamQuestResult" ADD CONSTRAINT "TeamQuestResult_teamQuestId_fkey" FOREIGN KEY ("teamQuestId") REFERENCES "TeamQuest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TestPractice" ADD CONSTRAINT "TestPractice_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestPractice" ADD CONSTRAINT "TestPractice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestPracticeResult" ADD CONSTRAINT "TestPracticeResult_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestPracticeResult" ADD CONSTRAINT "TestPracticeResult_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestPracticeResult" ADD CONSTRAINT "TestPracticeResult_testPracticeId_fkey" FOREIGN KEY ("testPracticeId") REFERENCES "TestPractice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestResult" ADD CONSTRAINT "TestResult_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TestResult" ADD CONSTRAINT "TestResult_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TestResult" ADD CONSTRAINT "TestResult_testId_fkey" FOREIGN KEY ("testId") REFERENCES "NewTest"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TextEditor" ADD CONSTRAINT "TextEditor_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TextEditor" ADD CONSTRAINT "TextEditor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TextEditorResult" ADD CONSTRAINT "TextEditorResult_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TextEditorResult" ADD CONSTRAINT "TextEditorResult_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TextEditorResult" ADD CONSTRAINT "TextEditorResult_textEditorId_fkey" FOREIGN KEY ("textEditorId") REFERENCES "TextEditor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_careerTrackId_fkey" FOREIGN KEY ("careerTrackId") REFERENCES "CareerTrack"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_legalPortfolioId_fkey" FOREIGN KEY ("legalPortfolioId") REFERENCES "LegalPortfolio"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "UserLevel"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_uniId_fkey" FOREIGN KEY ("uniId") REFERENCES "Uni"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "_CoursePageToProgram" ADD CONSTRAINT "_CoursePageToProgram_B_fkey" FOREIGN KEY ("B") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GrowthAreaToUserLevel" ADD CONSTRAINT "_GrowthAreaToUserLevel_A_fkey" FOREIGN KEY ("A") REFERENCES "GrowthArea"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_joinedTeams" ADD CONSTRAINT "_joinedTeams_A_fkey" FOREIGN KEY ("A") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

