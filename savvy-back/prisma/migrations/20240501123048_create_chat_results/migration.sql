-- CreateTable
CREATE TABLE "ChatResult" (
    "id" TEXT NOT NULL,
    "chatId" TEXT NOT NULL,
    "dialogues" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" VARCHAR(30) NOT NULL,
    "lessonId" VARCHAR(30) NOT NULL,

    CONSTRAINT "ChatResult_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ChatResult" ADD CONSTRAINT "ChatResult_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatResult" ADD CONSTRAINT "ChatResult_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ChatResult" ADD CONSTRAINT "ChatResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
