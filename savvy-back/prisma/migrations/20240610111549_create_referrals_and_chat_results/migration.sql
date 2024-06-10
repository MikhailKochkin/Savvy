/*
  Warnings:

  - You are about to alter the column `chatId` on the `ChatResult` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to drop the column `referal` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChatResult" DROP CONSTRAINT "ChatResult_chatId_fkey";

-- AlterTable
ALTER TABLE "ChatResult" ALTER COLUMN "chatId" SET DATA TYPE VARCHAR(30);

-- AlterTable
ALTER TABLE "Subscription" ALTER COLUMN "isActive" SET DEFAULT true;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "referal";

-- CreateTable
CREATE TABLE "Referral" (
    "id" TEXT NOT NULL,
    "isCounted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "referrerId" TEXT NOT NULL,
    "refereeId" TEXT NOT NULL,

    CONSTRAINT "Referral_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ChatResult" ADD CONSTRAINT "ChatResult_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_referrerId_fkey" FOREIGN KEY ("referrerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Referral" ADD CONSTRAINT "Referral_refereeId_fkey" FOREIGN KEY ("refereeId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
