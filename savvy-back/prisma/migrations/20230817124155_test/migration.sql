/*
  Warnings:

  - The primary key for the `CareerTrack` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `CareerTrackUnit` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ExamAnswer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `LegalPortfolio` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_careerTrackId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_legalPortfolioId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_uniId_fkey";

-- AlterTable
ALTER TABLE "CareerTrack" DROP CONSTRAINT "CareerTrack_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "CareerTrack_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "CareerTrackUnit" DROP CONSTRAINT "CareerTrackUnit_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "CareerTrackUnit_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ExamAnswer" DROP CONSTRAINT "ExamAnswer_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "ExamAnswer_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "LegalPortfolio" DROP CONSTRAINT "LegalPortfolio_pkey",
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "LegalPortfolio_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "_CareerTrackUnitToCoursePage" ALTER COLUMN "A" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_CoursePageForCareer" ALTER COLUMN "A" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "_ExamAnswerToLegalPortfolio" ALTER COLUMN "A" SET DATA TYPE TEXT,
ALTER COLUMN "B" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "CareerTrackUnit" ADD CONSTRAINT "CareerTrackUnit_careerTrackId_fkey" FOREIGN KEY ("careerTrackId") REFERENCES "CareerTrack"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_careerTrackId_fkey" FOREIGN KEY ("careerTrackId") REFERENCES "CareerTrack"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_legalPortfolioId_fkey" FOREIGN KEY ("legalPortfolioId") REFERENCES "LegalPortfolio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_uniId_fkey" FOREIGN KEY ("uniId") REFERENCES "Uni"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "_CoursePageForCareer" ADD CONSTRAINT "_CoursePageForCareer_A_fkey" FOREIGN KEY ("A") REFERENCES "CareerTrack"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoursePageForCareer" ADD CONSTRAINT "_CoursePageForCareer_B_fkey" FOREIGN KEY ("B") REFERENCES "CoursePage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CareerTrackUnitToCoursePage" ADD CONSTRAINT "_CareerTrackUnitToCoursePage_A_fkey" FOREIGN KEY ("A") REFERENCES "CareerTrackUnit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CareerTrackUnitToCoursePage" ADD CONSTRAINT "_CareerTrackUnitToCoursePage_B_fkey" FOREIGN KEY ("B") REFERENCES "CoursePage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserSubjects" ADD CONSTRAINT "_UserSubjects_A_fkey" FOREIGN KEY ("A") REFERENCES "CoursePage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserSubjects" ADD CONSTRAINT "_UserSubjects_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoursePageToProgram" ADD CONSTRAINT "_CoursePageToProgram_A_fkey" FOREIGN KEY ("A") REFERENCES "CoursePage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuthorsCoursePage" ADD CONSTRAINT "_AuthorsCoursePage_A_fkey" FOREIGN KEY ("A") REFERENCES "CoursePage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AuthorsCoursePage" ADD CONSTRAINT "_AuthorsCoursePage_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExamAnswerToLegalPortfolio" ADD CONSTRAINT "_ExamAnswerToLegalPortfolio_A_fkey" FOREIGN KEY ("A") REFERENCES "ExamAnswer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExamAnswerToLegalPortfolio" ADD CONSTRAINT "_ExamAnswerToLegalPortfolio_B_fkey" FOREIGN KEY ("B") REFERENCES "LegalPortfolio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GrowthAreaToUserLevel" ADD CONSTRAINT "_GrowthAreaToUserLevel_B_fkey" FOREIGN KEY ("B") REFERENCES "UserLevel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PointATests" ADD CONSTRAINT "_PointATests_A_fkey" FOREIGN KEY ("A") REFERENCES "PointA"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PointATests" ADD CONSTRAINT "_PointATests_B_fkey" FOREIGN KEY ("B") REFERENCES "PointATest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_joinedTeams" ADD CONSTRAINT "_joinedTeams_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
