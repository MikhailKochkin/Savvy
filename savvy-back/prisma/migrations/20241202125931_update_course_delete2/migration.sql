-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_coursePageId_fkey";

-- DropForeignKey
ALTER TABLE "CourseVisit" DROP CONSTRAINT "CourseVisit_coursePageId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_coursePageId_fkey";

-- DropForeignKey
ALTER TABLE "PointA" DROP CONSTRAINT "PointA_coursePageId_fkey";

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_coursePageId_fkey" FOREIGN KEY ("coursePageId") REFERENCES "CoursePage"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "CourseVisit" ADD CONSTRAINT "CourseVisit_coursePageId_fkey" FOREIGN KEY ("coursePageId") REFERENCES "CoursePage"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_coursePageId_fkey" FOREIGN KEY ("coursePageId") REFERENCES "CoursePage"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "PointA" ADD CONSTRAINT "PointA_coursePageId_fkey" FOREIGN KEY ("coursePageId") REFERENCES "CoursePage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
