-- CreateEnum
CREATE TYPE "CheckType" AS ENUM ('WORD', 'IDEA');

-- CreateEnum
CREATE TYPE "CourseType" AS ENUM ('PUBLIC', 'PRIVATE', 'FORMONEY', 'UNI', 'CHALLENGE');

-- CreateEnum
CREATE TYPE "Level" AS ENUM ('STANDARD', 'ADVANCED');

-- CreateEnum
CREATE TYPE "Permission" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('STUDENT', 'LAWYER', 'AUTHOR', 'SAVVY_AUTHOR', 'HR');

-- CreateEnum
CREATE TYPE "PageView" AS ENUM ('COURSE', 'CONF');

-- CreateEnum
CREATE TYPE "TaskType" AS ENUM ('TEST', 'FORM');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('STORY', 'REGULAR', 'CHALLENGE', 'HIDDEN');

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "applicantId" TEXT NOT NULL,
    "applicantName" TEXT NOT NULL,
    "promocode" TEXT,
    "message" TEXT,
    "coursePageID" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "coursePageId" TEXT NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessClient" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "surname" TEXT,
    "email" TEXT NOT NULL,
    "number" TEXT,
    "country" TEXT,
    "source" TEXT,
    "comment" TEXT,
    "tags" TEXT[],
    "communication_medium" TEXT,
    "type" TEXT,
    "communication_history" JSONB,
    "sales_cycle" JSONB,
    "coursePageId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessClient_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "CommunityMember" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT,
    "subscription" TEXT,
    "source" TEXT,
    "email" TEXT NOT NULL,
    "number" TEXT,

    CONSTRAINT "CommunityMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CareerTrack" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "img" TEXT,

    CONSTRAINT "CareerTrack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CareerTrackUnit" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "number" INTEGER,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "img" TEXT,
    "topics" TEXT[],
    "articles" TEXT[],
    "careerTrackId" TEXT NOT NULL,

    CONSTRAINT "CareerTrackUnit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChallengeResult" (
    "id" TEXT NOT NULL,
    "correct" INTEGER,
    "wrong" INTEGER,
    "time" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "studentId" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,

    CONSTRAINT "ChallengeResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clause" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "commentary" TEXT NOT NULL,
    "sample" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "keywords" TEXT[],
    "userId" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,

    CONSTRAINT "Clause_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "paidMonths" INTEGER DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Construction" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lessonID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "hint" TEXT,
    "type" TEXT NOT NULL,
    "variants" TEXT[],
    "answer" TEXT[],
    "userId" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "complexity" INTEGER DEFAULT 1,
    "text" TEXT,
    "hasText" BOOLEAN NOT NULL DEFAULT false,
    "columnsNum" INTEGER,
    "elements" JSONB,

    CONSTRAINT "Construction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConstructionResult" (
    "id" TEXT NOT NULL,
    "answer" TEXT,
    "attempts" INTEGER,
    "constructionID" TEXT,
    "lessonID" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "inputs" TEXT[],
    "studentId" TEXT NOT NULL,
    "lessonId" TEXT,
    "constructionId" TEXT,

    CONSTRAINT "ConstructionResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoursePage" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "modules" JSONB,
    "promotionId" TEXT,
    "view" "PageView" NOT NULL DEFAULT E'COURSE',
    "courseType" "CourseType",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "price" INTEGER,
    "prices" JSONB,
    "currency" TEXT DEFAULT E'ruble',
    "countries" TEXT[],
    "discountPrice" INTEGER,
    "numInCareerTrack" INTEGER,
    "published" BOOLEAN DEFAULT false,
    "uniID" TEXT,
    "news" TEXT DEFAULT E'Добро пожаловать на курс! Проходите уроки, выполняйте задания и выполняйте финальное задание!',
    "audience" TEXT,
    "result" TEXT,
    "tariffs" TEXT,
    "methods" TEXT,
    "openLesson" TEXT,
    "video" TEXT,
    "companyId" TEXT,
    "banner" TEXT,
    "batch" TEXT,
    "header" TEXT[],
    "subheader" TEXT[],
    "nextStart" TIMESTAMP(3),
    "uptodateAt" TIMESTAMP(3),
    "goals" TEXT[],
    "reviews" JSONB,
    "weeks" INTEGER,
    "subscriptionPrice" INTEGER,
    "installments" INTEGER,
    "subscription" BOOLEAN DEFAULT false,
    "tags" TEXT[],
    "students" TEXT[],
    "userId" TEXT NOT NULL,
    "uniId" TEXT,
    "examQuestionId" TEXT,
    "promocode" JSONB,

    CONSTRAINT "CoursePage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Program" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "promotionId" TEXT,
    "syllabus" JSONB,
    "months" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "price" INTEGER,
    "currency" TEXT DEFAULT E'ruble',
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

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseVisit" (
    "id" TEXT NOT NULL,
    "visitsNumber" INTEGER DEFAULT 0,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "finish" TIMESTAMP(3),
    "reminders" TIMESTAMP(3)[],
    "studentId" TEXT NOT NULL,
    "coursePageId" TEXT NOT NULL,
    "info" JSONB,

    CONSTRAINT "CourseVisit_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "complexity" INTEGER DEFAULT 1,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentResult" (
    "id" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "answers" TEXT[],
    "drafts" TEXT[],
    "userId" TEXT,
    "lessonId" TEXT,
    "documentId" TEXT,

    CONSTRAINT "DocumentResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "teacherId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "lessonId" TEXT,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Forum" (
    "id" TEXT NOT NULL,
    "text" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Forum_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "LegalPortfolio" (
    "id" TEXT NOT NULL,
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
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "coursePageID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "number" INTEGER,
    "totalPoints" INTEGER DEFAULT 0,
    "hasSecret" BOOLEAN DEFAULT false,
    "published" BOOLEAN DEFAULT false,
    "open" BOOLEAN DEFAULT false,
    "type" TEXT DEFAULT E'REGULAR',
    "description" TEXT,
    "structure" JSONB,
    "short_structure" JSONB,
    "challenge_num" INTEGER DEFAULT 10,
    "change" TEXT,
    "assignment" BOOLEAN,
    "map" JSONB[],
    "userId" TEXT NOT NULL,
    "coursePageId" TEXT NOT NULL,
    "forumId" TEXT,
    "image" TEXT,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LessonResult" (
    "id" TEXT NOT NULL,
    "visitsNumber" INTEGER DEFAULT 1,
    "lessonID" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "progress" INTEGER DEFAULT 0,
    "checked" BOOLEAN DEFAULT false,
    "studentId" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,

    CONSTRAINT "LessonResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewTest" (
    "id" TEXT NOT NULL,
    "lessonID" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" TEXT DEFAULT E'TEST',
    "next" JSONB,
    "ifRight" TEXT,
    "ifWrong" TEXT,
    "question" TEXT[],
    "answers" TEXT[],
    "comments" TEXT[],
    "correct" BOOLEAN[],
    "userId" TEXT NOT NULL,
    "lessonId" TEXT,
    "complexity" INTEGER DEFAULT 1,

    CONSTRAINT "NewTest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestPractice" (
    "id" TEXT NOT NULL,
    "text" TEXT,
    "tasksNum" INTEGER NOT NULL,
    "tasks" TEXT[],
    "userId" TEXT,
    "lessonId" TEXT,
    "intro" TEXT,
    "successText" TEXT,
    "failureText" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

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
CREATE TABLE "Note" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "link_clicks" INTEGER DEFAULT 0,
    "lessonID" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isSecret" BOOLEAN DEFAULT false,
    "next" JSONB,
    "userId" TEXT,
    "lessonId" TEXT,
    "chat" BOOLEAN,
    "type" TEXT DEFAULT E'longread',
    "complexity" INTEGER DEFAULT 1,

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
    "id" TEXT NOT NULL,
    "price" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "paymentID" TEXT,
    "promocode" TEXT,
    "isPaid" BOOLEAN,
    "level" "Level",
    "comment" TEXT,
    "userId" TEXT NOT NULL,
    "teamId" TEXT,
    "coursePageId" TEXT NOT NULL,
    "programId" TEXT,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "text" TEXT,
    "language" TEXT DEFAULT E'ru',
    "summary" TEXT,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "likes" INTEGER DEFAULT 1,
    "tags" TEXT[],
    "userId" TEXT NOT NULL,
    "coursePageId" TEXT,
    "lessonId" TEXT,
    "emailCampaignId" TEXT,
    "leadin" TEXT,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "Problem" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "hints" TEXT,
    "solution" TEXT,
    "answer" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lessonID" TEXT NOT NULL,
    "nodeType" TEXT,
    "nodeID" TEXT,
    "isSecret" BOOLEAN DEFAULT false,
    "hintsList" TEXT[],
    "solutionList" TEXT[],
    "steps" JSONB,
    "userId" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "complexity" INTEGER DEFAULT 1,

    CONSTRAINT "Problem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProblemResult" (
    "id" TEXT NOT NULL,
    "answer" TEXT,
    "lessonID" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "problemID" TEXT,
    "revealed" TEXT[],
    "studentId" TEXT NOT NULL,
    "lessonId" TEXT,
    "problemId" TEXT,

    CONSTRAINT "ProblemResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quiz" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "lessonID" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "type" TEXT DEFAULT E'TEST',
    "next" JSONB,
    "ifRight" TEXT,
    "ifWrong" TEXT,
    "check" TEXT DEFAULT E'IDEA',
    "userId" TEXT NOT NULL,
    "lessonId" TEXT,
    "complexity" INTEGER DEFAULT 1,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizResult" (
    "id" TEXT NOT NULL,
    "answer" TEXT,
    "attempts" INTEGER,
    "lessonID" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "correct" BOOLEAN,
    "studentId" TEXT NOT NULL,
    "lessonId" TEXT,
    "quizId" TEXT,

    CONSTRAINT "QuizResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rating" (
    "id" TEXT NOT NULL,
    "rating" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,
    "forumId" TEXT,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shot" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "lessonID" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "parts" TEXT[],
    "comments" TEXT[],
    "userId" TEXT NOT NULL,
    "lessonId" TEXT,

    CONSTRAINT "Shot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShotResult" (
    "id" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "lessonID" TEXT,
    "shotID" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "studentId" TEXT NOT NULL,
    "lessonId" TEXT,
    "shotId" TEXT,

    CONSTRAINT "ShotResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Statement" (
    "id" TEXT NOT NULL,
    "text" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,
    "forumId" TEXT,
    "miniforumId" TEXT,
    "comments" TEXT[],
    "answered" BOOLEAN DEFAULT false,

    CONSTRAINT "Statement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestResult" (
    "id" TEXT NOT NULL,
    "answer" TEXT,
    "attempts" INTEGER,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lessonID" TEXT,
    "testID" TEXT,
    "studentId" TEXT NOT NULL,
    "lessonId" TEXT,
    "testId" TEXT,

    CONSTRAINT "TestResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TextEditor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "lessonID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "totalMistakes" INTEGER,
    "userId" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "complexity" INTEGER DEFAULT 1,

    CONSTRAINT "TextEditor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TextEditorResult" (
    "id" TEXT NOT NULL,
    "attempts" INTEGER,
    "wrong" TEXT,
    "correct" TEXT,
    "guess" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "result" BOOLEAN,
    "studentId" TEXT NOT NULL,
    "type" TEXT,
    "lessonId" TEXT,
    "textEditorId" TEXT,

    CONSTRAINT "TextEditorResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Uni" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "capacity" INTEGER DEFAULT 2,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paidMonths" INTEGER DEFAULT 0,

    CONSTRAINT "Uni_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "founderId" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "number" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "country" TEXT,
    "resetToken" TEXT,
    "resetTokenExpiry" DOUBLE PRECISION,
    "traffic_sources" JSONB,
    "referal" TEXT,
    "score" INTEGER DEFAULT 0,
    "active" BOOLEAN DEFAULT false,
    "isFamiliar" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "careerTrackID" TEXT,
    "status" TEXT DEFAULT E'STUDENT',
    "uniID" TEXT,
    "description" TEXT,
    "resume" TEXT,
    "coverLetter" TEXT,
    "surname" TEXT,
    "comment" TEXT,
    "work" TEXT,
    "image" TEXT,
    "favourites" TEXT[],
    "subjects" TEXT[],
    "tags" TEXT[],
    "permissions" "Permission"[],
    "uniId" TEXT,
    "companyId" TEXT,
    "legalPortfolioId" TEXT,
    "careerTrackId" TEXT,
    "levelId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BotDialogue" (
    "id" TEXT NOT NULL,
    "journey" TEXT[],
    "rating" INTEGER,
    "source" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BotDialogue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "text" TEXT,
    "subject" TEXT,
    "coursePageId" TEXT,
    "link" TEXT,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserLevel" (
    "id" TEXT NOT NULL,
    "level" DOUBLE PRECISION DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "consumedContent" JSONB,
    "myProgress" JSONB,
    "learningStreak" TIMESTAMP(3)[],
    "isProgressPublic" BOOLEAN DEFAULT false,

    CONSTRAINT "UserLevel_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "EmailReminder" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "coursePageId" TEXT,
    "sendAt" TIMESTAMP(3),
    "status" INTEGER,
    "emailsSent" TEXT[],
    "gap" INTEGER DEFAULT 1,
    "emailCampaignId" TEXT,
    "link" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmailReminder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailCampaign" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "content" TEXT NOT NULL,
    "emails" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmailCampaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exam" (
    "id" TEXT NOT NULL,
    "nodeType" TEXT,
    "nodeID" TEXT,
    "question" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "userId" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,

    CONSTRAINT "Exam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExamAnswer" (
    "id" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "examQuestionID" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "studentId" TEXT NOT NULL,
    "examQuestionId" TEXT NOT NULL,

    CONSTRAINT "ExamAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExamQuestion" (
    "id" TEXT NOT NULL,
    "coursePageID" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExamQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExamResult" (
    "id" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "answers" TEXT[],
    "userId" TEXT,
    "lessonId" TEXT,
    "examId" TEXT,

    CONSTRAINT "ExamResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chat" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "messages" JSONB,
    "link_clicks" INTEGER DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isSecret" BOOLEAN DEFAULT false,
    "userId" TEXT NOT NULL,
    "lessonId" TEXT NOT NULL,
    "complexity" INTEGER DEFAULT 1,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PointA" (
    "id" TEXT NOT NULL,
    "description" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "coursePageID" TEXT,
    "userId" TEXT NOT NULL,
    "coursePageId" TEXT NOT NULL,

    CONSTRAINT "PointA_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PointATest" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer1" TEXT NOT NULL,
    "answer1Correct" TEXT NOT NULL,
    "answer2" TEXT NOT NULL,
    "answer2Correct" TEXT NOT NULL,
    "answer3" TEXT,
    "answer3Correct" TEXT,
    "answer4" TEXT,
    "answer4Correct" TEXT,
    "coursePageID" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "coursePageId" TEXT,

    CONSTRAINT "PointATest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sandbox" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "video" TEXT,
    "sandboxPageID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "likes" INTEGER DEFAULT 0,
    "link" TEXT,
    "sandboxPageId" TEXT NOT NULL,

    CONSTRAINT "Sandbox_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SandboxPage" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "students" TEXT[],
    "userId" TEXT NOT NULL,

    CONSTRAINT "SandboxPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SandboxPageGoal" (
    "id" TEXT NOT NULL,
    "goal" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "sandboxPageID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "sandboxPageId" TEXT,

    CONSTRAINT "SandboxPageGoal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Test" (
    "id" TEXT NOT NULL,
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
    "lessonID" TEXT,
    "userId" TEXT NOT NULL,
    "lessonId" TEXT,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lawrdle" (
    "id" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "story" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "buttonText" TEXT,
    "link" TEXT,
    "pros" TEXT[],
    "tags" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "coursePageId" TEXT,
    "emailCampaignId" TEXT,
    "leadin" TEXT,

    CONSTRAINT "Lawrdle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Useful" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "header" TEXT NOT NULL,
    "buttonText" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tags" TEXT[],

    CONSTRAINT "Useful_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CoursePageForCareer" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CareerTrackUnitToCoursePage" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_AuthorsCoursePage" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_UserSubjects" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CoursePageToProgram" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_joinedTeams" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_GrowthAreaToUserLevel" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ExamAnswerToLegalPortfolio" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PointATests" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CoursePage_examQuestionId_key" ON "CoursePage"("examQuestionId");

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_forumId_key" ON "Lesson"("forumId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_legalPortfolioId_key" ON "User"("legalPortfolioId");

-- CreateIndex
CREATE UNIQUE INDEX "User_careerTrackId_key" ON "User"("careerTrackId");

-- CreateIndex
CREATE UNIQUE INDEX "User_levelId_key" ON "User"("levelId");

-- CreateIndex
CREATE UNIQUE INDEX "_CoursePageForCareer_AB_unique" ON "_CoursePageForCareer"("A", "B");

-- CreateIndex
CREATE INDEX "_CoursePageForCareer_B_index" ON "_CoursePageForCareer"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CareerTrackUnitToCoursePage_AB_unique" ON "_CareerTrackUnitToCoursePage"("A", "B");

-- CreateIndex
CREATE INDEX "_CareerTrackUnitToCoursePage_B_index" ON "_CareerTrackUnitToCoursePage"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AuthorsCoursePage_AB_unique" ON "_AuthorsCoursePage"("A", "B");

-- CreateIndex
CREATE INDEX "_AuthorsCoursePage_B_index" ON "_AuthorsCoursePage"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserSubjects_AB_unique" ON "_UserSubjects"("A", "B");

-- CreateIndex
CREATE INDEX "_UserSubjects_B_index" ON "_UserSubjects"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CoursePageToProgram_AB_unique" ON "_CoursePageToProgram"("A", "B");

-- CreateIndex
CREATE INDEX "_CoursePageToProgram_B_index" ON "_CoursePageToProgram"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_joinedTeams_AB_unique" ON "_joinedTeams"("A", "B");

-- CreateIndex
CREATE INDEX "_joinedTeams_B_index" ON "_joinedTeams"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GrowthAreaToUserLevel_AB_unique" ON "_GrowthAreaToUserLevel"("A", "B");

-- CreateIndex
CREATE INDEX "_GrowthAreaToUserLevel_B_index" ON "_GrowthAreaToUserLevel"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ExamAnswerToLegalPortfolio_AB_unique" ON "_ExamAnswerToLegalPortfolio"("A", "B");

-- CreateIndex
CREATE INDEX "_ExamAnswerToLegalPortfolio_B_index" ON "_ExamAnswerToLegalPortfolio"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PointATests_AB_unique" ON "_PointATests"("A", "B");

-- CreateIndex
CREATE INDEX "_PointATests_B_index" ON "_PointATests"("B");

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_coursePageId_fkey" FOREIGN KEY ("coursePageId") REFERENCES "CoursePage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessClient" ADD CONSTRAINT "BusinessClient_coursePageId_fkey" FOREIGN KEY ("coursePageId") REFERENCES "CoursePage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CareerTrackUnit" ADD CONSTRAINT "CareerTrackUnit_careerTrackId_fkey" FOREIGN KEY ("careerTrackId") REFERENCES "CareerTrack"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChallengeResult" ADD CONSTRAINT "ChallengeResult_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChallengeResult" ADD CONSTRAINT "ChallengeResult_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clause" ADD CONSTRAINT "Clause_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clause" ADD CONSTRAINT "Clause_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Construction" ADD CONSTRAINT "Construction_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Construction" ADD CONSTRAINT "Construction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConstructionResult" ADD CONSTRAINT "ConstructionResult_constructionId_fkey" FOREIGN KEY ("constructionId") REFERENCES "Construction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConstructionResult" ADD CONSTRAINT "ConstructionResult_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConstructionResult" ADD CONSTRAINT "ConstructionResult_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoursePage" ADD CONSTRAINT "CoursePage_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoursePage" ADD CONSTRAINT "CoursePage_uniId_fkey" FOREIGN KEY ("uniId") REFERENCES "Uni"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoursePage" ADD CONSTRAINT "CoursePage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoursePage" ADD CONSTRAINT "CoursePage_examQuestionId_fkey" FOREIGN KEY ("examQuestionId") REFERENCES "ExamQuestion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseVisit" ADD CONSTRAINT "CourseVisit_coursePageId_fkey" FOREIGN KEY ("coursePageId") REFERENCES "CoursePage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseVisit" ADD CONSTRAINT "CourseVisit_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_coursePageId_fkey" FOREIGN KEY ("coursePageId") REFERENCES "CoursePage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentResult" ADD CONSTRAINT "DocumentResult_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentResult" ADD CONSTRAINT "DocumentResult_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentResult" ADD CONSTRAINT "DocumentResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Forum" ADD CONSTRAINT "Forum_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MiniForum" ADD CONSTRAINT "MiniForum_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MiniForum" ADD CONSTRAINT "MiniForum_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_coursePageId_fkey" FOREIGN KEY ("coursePageId") REFERENCES "CoursePage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_forumId_fkey" FOREIGN KEY ("forumId") REFERENCES "Forum"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonResult" ADD CONSTRAINT "LessonResult_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LessonResult" ADD CONSTRAINT "LessonResult_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewTest" ADD CONSTRAINT "NewTest_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewTest" ADD CONSTRAINT "NewTest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestPractice" ADD CONSTRAINT "TestPractice_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestPractice" ADD CONSTRAINT "TestPractice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestPracticeResult" ADD CONSTRAINT "TestPracticeResult_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestPracticeResult" ADD CONSTRAINT "TestPracticeResult_testPracticeId_fkey" FOREIGN KEY ("testPracticeId") REFERENCES "TestPractice"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestPracticeResult" ADD CONSTRAINT "TestPracticeResult_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_coursePageId_fkey" FOREIGN KEY ("coursePageId") REFERENCES "CoursePage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_coursePageId_fkey" FOREIGN KEY ("coursePageId") REFERENCES "CoursePage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_emailCampaignId_fkey" FOREIGN KEY ("emailCampaignId") REFERENCES "EmailCampaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamQuest" ADD CONSTRAINT "TeamQuest_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamQuest" ADD CONSTRAINT "TeamQuest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamQuestResult" ADD CONSTRAINT "TeamQuestResult_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamQuestResult" ADD CONSTRAINT "TeamQuestResult_teamQuestId_fkey" FOREIGN KEY ("teamQuestId") REFERENCES "TeamQuest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamQuestResult" ADD CONSTRAINT "TeamQuestResult_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Problem" ADD CONSTRAINT "Problem_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Problem" ADD CONSTRAINT "Problem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProblemResult" ADD CONSTRAINT "ProblemResult_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProblemResult" ADD CONSTRAINT "ProblemResult_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProblemResult" ADD CONSTRAINT "ProblemResult_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizResult" ADD CONSTRAINT "QuizResult_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizResult" ADD CONSTRAINT "QuizResult_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizResult" ADD CONSTRAINT "QuizResult_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_forumId_fkey" FOREIGN KEY ("forumId") REFERENCES "Forum"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shot" ADD CONSTRAINT "Shot_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shot" ADD CONSTRAINT "Shot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShotResult" ADD CONSTRAINT "ShotResult_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShotResult" ADD CONSTRAINT "ShotResult_shotId_fkey" FOREIGN KEY ("shotId") REFERENCES "Shot"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShotResult" ADD CONSTRAINT "ShotResult_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Statement" ADD CONSTRAINT "Statement_forumId_fkey" FOREIGN KEY ("forumId") REFERENCES "Forum"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Statement" ADD CONSTRAINT "Statement_miniforumId_fkey" FOREIGN KEY ("miniforumId") REFERENCES "MiniForum"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Statement" ADD CONSTRAINT "Statement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestResult" ADD CONSTRAINT "TestResult_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestResult" ADD CONSTRAINT "TestResult_testId_fkey" FOREIGN KEY ("testId") REFERENCES "NewTest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestResult" ADD CONSTRAINT "TestResult_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TextEditor" ADD CONSTRAINT "TextEditor_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TextEditor" ADD CONSTRAINT "TextEditor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TextEditorResult" ADD CONSTRAINT "TextEditorResult_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TextEditorResult" ADD CONSTRAINT "TextEditorResult_textEditorId_fkey" FOREIGN KEY ("textEditorId") REFERENCES "TextEditor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TextEditorResult" ADD CONSTRAINT "TextEditorResult_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_founderId_fkey" FOREIGN KEY ("founderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_careerTrackId_fkey" FOREIGN KEY ("careerTrackId") REFERENCES "CareerTrack"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_legalPortfolioId_fkey" FOREIGN KEY ("legalPortfolioId") REFERENCES "LegalPortfolio"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_uniId_fkey" FOREIGN KEY ("uniId") REFERENCES "Uni"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "UserLevel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailReminder" ADD CONSTRAINT "EmailReminder_coursePageId_fkey" FOREIGN KEY ("coursePageId") REFERENCES "CoursePage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailReminder" ADD CONSTRAINT "EmailReminder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailReminder" ADD CONSTRAINT "EmailReminder_emailCampaignId_fkey" FOREIGN KEY ("emailCampaignId") REFERENCES "EmailCampaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamAnswer" ADD CONSTRAINT "ExamAnswer_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamAnswer" ADD CONSTRAINT "ExamAnswer_examQuestionId_fkey" FOREIGN KEY ("examQuestionId") REFERENCES "ExamQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamResult" ADD CONSTRAINT "ExamResult_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamResult" ADD CONSTRAINT "ExamResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExamResult" ADD CONSTRAINT "ExamResult_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PointA" ADD CONSTRAINT "PointA_coursePageId_fkey" FOREIGN KEY ("coursePageId") REFERENCES "CoursePage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PointA" ADD CONSTRAINT "PointA_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PointATest" ADD CONSTRAINT "PointATest_coursePageId_fkey" FOREIGN KEY ("coursePageId") REFERENCES "CoursePage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PointATest" ADD CONSTRAINT "PointATest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sandbox" ADD CONSTRAINT "Sandbox_sandboxPageId_fkey" FOREIGN KEY ("sandboxPageId") REFERENCES "SandboxPage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SandboxPage" ADD CONSTRAINT "SandboxPage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SandboxPageGoal" ADD CONSTRAINT "SandboxPageGoal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SandboxPageGoal" ADD CONSTRAINT "SandboxPageGoal_sandboxPageId_fkey" FOREIGN KEY ("sandboxPageId") REFERENCES "SandboxPage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lawrdle" ADD CONSTRAINT "Lawrdle_coursePageId_fkey" FOREIGN KEY ("coursePageId") REFERENCES "CoursePage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lawrdle" ADD CONSTRAINT "Lawrdle_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lawrdle" ADD CONSTRAINT "Lawrdle_emailCampaignId_fkey" FOREIGN KEY ("emailCampaignId") REFERENCES "EmailCampaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoursePageForCareer" ADD CONSTRAINT "_CoursePageForCareer_A_fkey" FOREIGN KEY ("A") REFERENCES "CareerTrack"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoursePageForCareer" ADD CONSTRAINT "_CoursePageForCareer_B_fkey" FOREIGN KEY ("B") REFERENCES "CoursePage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CareerTrackUnitToCoursePage" ADD CONSTRAINT "_CareerTrackUnitToCoursePage_A_fkey" FOREIGN KEY ("A") REFERENCES "CareerTrackUnit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CareerTrackUnitToCoursePage" ADD CONSTRAINT "_CareerTrackUnitToCoursePage_B_fkey" FOREIGN KEY ("B") REFERENCES "CoursePage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuthorsCoursePage" ADD CONSTRAINT "_AuthorsCoursePage_A_fkey" FOREIGN KEY ("A") REFERENCES "CoursePage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuthorsCoursePage" ADD CONSTRAINT "_AuthorsCoursePage_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserSubjects" ADD CONSTRAINT "_UserSubjects_A_fkey" FOREIGN KEY ("A") REFERENCES "CoursePage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserSubjects" ADD CONSTRAINT "_UserSubjects_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoursePageToProgram" ADD CONSTRAINT "_CoursePageToProgram_A_fkey" FOREIGN KEY ("A") REFERENCES "CoursePage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoursePageToProgram" ADD CONSTRAINT "_CoursePageToProgram_B_fkey" FOREIGN KEY ("B") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_joinedTeams" ADD CONSTRAINT "_joinedTeams_A_fkey" FOREIGN KEY ("A") REFERENCES "Team"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_joinedTeams" ADD CONSTRAINT "_joinedTeams_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GrowthAreaToUserLevel" ADD CONSTRAINT "_GrowthAreaToUserLevel_A_fkey" FOREIGN KEY ("A") REFERENCES "GrowthArea"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GrowthAreaToUserLevel" ADD CONSTRAINT "_GrowthAreaToUserLevel_B_fkey" FOREIGN KEY ("B") REFERENCES "UserLevel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExamAnswerToLegalPortfolio" ADD CONSTRAINT "_ExamAnswerToLegalPortfolio_A_fkey" FOREIGN KEY ("A") REFERENCES "ExamAnswer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExamAnswerToLegalPortfolio" ADD CONSTRAINT "_ExamAnswerToLegalPortfolio_B_fkey" FOREIGN KEY ("B") REFERENCES "LegalPortfolio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PointATests" ADD CONSTRAINT "_PointATests_A_fkey" FOREIGN KEY ("A") REFERENCES "PointA"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PointATests" ADD CONSTRAINT "_PointATests_B_fkey" FOREIGN KEY ("B") REFERENCES "PointATest"("id") ON DELETE CASCADE ON UPDATE CASCADE;