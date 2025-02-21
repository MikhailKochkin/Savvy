-- DropForeignKey
ALTER TABLE "CourseAccessControl" DROP CONSTRAINT "CourseAccessControl_coursePageId_fkey";

-- CreateTable
CREATE TABLE "Character" (
    "id" VARCHAR(30) NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "description" TEXT NOT NULL,
    "coursePageId" VARCHAR(30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_coursePageId_fkey" FOREIGN KEY ("coursePageId") REFERENCES "CoursePage"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CourseAccessControl" ADD CONSTRAINT "CourseAccessControl_coursePageId_fkey" FOREIGN KEY ("coursePageId") REFERENCES "CoursePage"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
