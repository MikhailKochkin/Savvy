-- DropForeignKey
ALTER TABLE "Lesson" DROP CONSTRAINT "Lesson_forumId_fkey";

-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_lessonId_fkey";

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_forumId_fkey" FOREIGN KEY ("forumId") REFERENCES "Forum"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
