-- CreateEnum
CREATE TYPE "CourseRole" AS ENUM ('AUTHOR', 'MENTOR');

-- CreateEnum
CREATE TYPE "ChangeScope" AS ENUM ('EDIT', 'COMMENT');

-- CreateTable
CREATE TABLE "CourseAccessControl" (
    "id" VARCHAR(30) NOT NULL,
    "role" "CourseRole" NOT NULL,
    "changeScope" "ChangeScope" NOT NULL DEFAULT 'EDIT',
    "areAllLessonsAccessible" BOOLEAN NOT NULL DEFAULT true,
    "accessibleLessons" TEXT[],
    "userId" VARCHAR(30) NOT NULL,
    "coursePageId" VARCHAR(30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CourseAccessControl_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Lesson_coursePageId_idx" ON "Lesson"("coursePageId");

-- CreateIndex
CREATE INDEX "LessonResult_lessonId_studentId_idx" ON "LessonResult"("lessonId", "studentId");

-- AddForeignKey
ALTER TABLE "CourseAccessControl" ADD CONSTRAINT "CourseAccessControl_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CourseAccessControl" ADD CONSTRAINT "CourseAccessControl_coursePageId_fkey" FOREIGN KEY ("coursePageId") REFERENCES "CoursePage"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
