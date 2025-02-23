/*
  Warnings:

  - You are about to drop the column `instructorName` on the `Note` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Note" DROP COLUMN "instructorName",
ADD COLUMN     "instructorId" TEXT;
