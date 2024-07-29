/*
  Warnings:

  - You are about to drop the column `complexAnswers` on the `NewTest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "NewTest" DROP COLUMN "complexAnswers",
ADD COLUMN     "complexTestAnswers" JSONB;
