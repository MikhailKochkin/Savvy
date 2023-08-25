/*
  Warnings:

  - You are about to drop the column `answerAray` on the `TestResult` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TestResult" DROP COLUMN "answerAray",
ADD COLUMN     "answerArray" TEXT[];
