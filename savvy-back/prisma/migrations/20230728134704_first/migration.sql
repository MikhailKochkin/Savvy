/*
  Warnings:

  - You are about to alter the column `A` on the `_CoursePageToProgram` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `B` on the `_GrowthAreaToUserLevel` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `B` on the `_joinedTeams` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to drop the `_Migration` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AuthorsCoursePage" DROP CONSTRAINT "_AuthorsCoursePage_A_fkey";

-- DropForeignKey
ALTER TABLE "_AuthorsCoursePage" DROP CONSTRAINT "_AuthorsCoursePage_B_fkey";

-- DropForeignKey
ALTER TABLE "_CareerTrackUnitToCoursePage" DROP CONSTRAINT "_CareerTrackUnitToCoursePage_A_fkey";

-- DropForeignKey
ALTER TABLE "_CareerTrackUnitToCoursePage" DROP CONSTRAINT "_CareerTrackUnitToCoursePage_B_fkey";

-- DropForeignKey
ALTER TABLE "_CoursePageForCareer" DROP CONSTRAINT "_CoursePageForCareer_A_fkey";

-- DropForeignKey
ALTER TABLE "_CoursePageForCareer" DROP CONSTRAINT "_CoursePageForCareer_B_fkey";

-- DropForeignKey
ALTER TABLE "_CoursePageToProgram" DROP CONSTRAINT "_CoursePageToProgram_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExamAnswerToLegalPortfolio" DROP CONSTRAINT "_ExamAnswerToLegalPortfolio_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExamAnswerToLegalPortfolio" DROP CONSTRAINT "_ExamAnswerToLegalPortfolio_B_fkey";

-- DropForeignKey
ALTER TABLE "_GrowthAreaToUserLevel" DROP CONSTRAINT "_GrowthAreaToUserLevel_B_fkey";

-- DropForeignKey
ALTER TABLE "_PointATests" DROP CONSTRAINT "_PointATests_A_fkey";

-- DropForeignKey
ALTER TABLE "_PointATests" DROP CONSTRAINT "_PointATests_B_fkey";

-- DropForeignKey
ALTER TABLE "_UserSubjects" DROP CONSTRAINT "_UserSubjects_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserSubjects" DROP CONSTRAINT "_UserSubjects_B_fkey";

-- DropForeignKey
ALTER TABLE "_joinedTeams" DROP CONSTRAINT "_joinedTeams_B_fkey";

-- AlterTable
ALTER TABLE "_CoursePageToProgram" ALTER COLUMN "A" SET DATA TYPE VARCHAR(30);

-- AlterTable
ALTER TABLE "_ExamAnswerToLegalPortfolio" ALTER COLUMN "A" SET DATA TYPE VARCHAR(30),
ALTER COLUMN "B" SET DATA TYPE VARCHAR(30);

-- AlterTable
ALTER TABLE "_GrowthAreaToUserLevel" ALTER COLUMN "B" SET DATA TYPE VARCHAR(30);

-- AlterTable
ALTER TABLE "_PointATests" ALTER COLUMN "A" SET DATA TYPE VARCHAR(30),
ALTER COLUMN "B" SET DATA TYPE VARCHAR(30);

-- AlterTable
ALTER TABLE "_joinedTeams" ALTER COLUMN "B" SET DATA TYPE VARCHAR(30);

-- DropTable
DROP TABLE "_Migration";

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
ALTER TABLE "_CoursePageToProgram" ADD CONSTRAINT "_CoursePageToProgram_A_fkey" FOREIGN KEY ("A") REFERENCES "CoursePage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserSubjects" ADD CONSTRAINT "_UserSubjects_A_fkey" FOREIGN KEY ("A") REFERENCES "CoursePage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserSubjects" ADD CONSTRAINT "_UserSubjects_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

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
