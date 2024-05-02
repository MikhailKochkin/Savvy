/*
  Warnings:

  - You are about to drop the column `dialogues` on the `ChatResult` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ChatResult" DROP COLUMN "dialogues",
ADD COLUMN     "dialogue" JSONB;
