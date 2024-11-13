-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_sourceCommentId_fkey";

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_sourceCommentId_fkey" FOREIGN KEY ("sourceCommentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
