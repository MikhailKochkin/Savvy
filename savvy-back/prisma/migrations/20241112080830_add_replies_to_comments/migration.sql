-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "sourceCommentId" TEXT;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_sourceCommentId_fkey" FOREIGN KEY ("sourceCommentId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
