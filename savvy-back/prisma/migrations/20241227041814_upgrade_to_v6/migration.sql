-- AlterTable
ALTER TABLE "_AuthorsCoursePage" ADD CONSTRAINT "_AuthorsCoursePage_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_AuthorsCoursePage_AB_unique";

-- AlterTable
ALTER TABLE "_CareerTrackUnitToCoursePage" ADD CONSTRAINT "_CareerTrackUnitToCoursePage_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_CareerTrackUnitToCoursePage_AB_unique";

-- AlterTable
ALTER TABLE "_CoursePageForCareer" ADD CONSTRAINT "_CoursePageForCareer_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_CoursePageForCareer_AB_unique";

-- AlterTable
ALTER TABLE "_CoursePageToProgram" ADD CONSTRAINT "_CoursePageToProgram_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_CoursePageToProgram_AB_unique";

-- AlterTable
ALTER TABLE "_ExamAnswerToLegalPortfolio" ADD CONSTRAINT "_ExamAnswerToLegalPortfolio_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_ExamAnswerToLegalPortfolio_AB_unique";

-- AlterTable
ALTER TABLE "_GrowthAreaToUserLevel" ADD CONSTRAINT "_GrowthAreaToUserLevel_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_GrowthAreaToUserLevel_AB_unique";

-- AlterTable
ALTER TABLE "_PointATests" ADD CONSTRAINT "_PointATests_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_PointATests_AB_unique";

-- AlterTable
ALTER TABLE "_UserSubjects" ADD CONSTRAINT "_UserSubjects_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_UserSubjects_AB_unique";

-- AlterTable
ALTER TABLE "_joinedTeams" ADD CONSTRAINT "_joinedTeams_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_joinedTeams_AB_unique";
