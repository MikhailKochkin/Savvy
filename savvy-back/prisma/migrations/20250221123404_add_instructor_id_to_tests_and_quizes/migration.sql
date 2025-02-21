/*
  Warnings:

  - You are about to drop the column `image` on the `NewTest` table. All the data in the column will be lost.
  - You are about to drop the column `instructorName` on the `NewTest` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Quiz` table. All the data in the column will be lost.
  - You are about to drop the column `instructorName` on the `Quiz` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "NewTest" DROP COLUMN "image",
DROP COLUMN "instructorName",
ADD COLUMN     "instructorId" TEXT;

-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "image",
DROP COLUMN "instructorName",
ADD COLUMN     "instructorId" TEXT;
