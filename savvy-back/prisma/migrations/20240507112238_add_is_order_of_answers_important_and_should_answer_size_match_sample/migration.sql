-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "isOrderOfAnswersImportant" BOOLEAN DEFAULT false,
ADD COLUMN     "shouldAnswerSizeMatchSample" BOOLEAN DEFAULT false;
