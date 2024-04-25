/*
  Warnings:

  - You are about to drop the column `authentificationType` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "authentificationType",
ADD COLUMN     "authType" TEXT DEFAULT 'email';
