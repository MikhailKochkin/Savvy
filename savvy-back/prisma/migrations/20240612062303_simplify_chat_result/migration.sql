/*
  Warnings:

  - You are about to drop the column `dialogue` on the `ChatResult` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ChatResult" DROP COLUMN "dialogue",
ADD COLUMN     "name" TEXT,
ADD COLUMN     "text" TEXT;
