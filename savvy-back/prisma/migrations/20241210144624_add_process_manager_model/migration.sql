-- CreateTable
CREATE TABLE "ProcessManager" (
    "id" VARCHAR(30) NOT NULL,
    "name" TEXT NOT NULL,
    "backgroundStory" TEXT,
    "remainingResources" INTEGER,
    "userId" VARCHAR(30) NOT NULL,
    "lessonId" VARCHAR(30) NOT NULL,
    "nodes" JSONB NOT NULL,
    "edges" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProcessManager_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProcessManager" ADD CONSTRAINT "ProcessManager_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProcessManager" ADD CONSTRAINT "ProcessManager_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
