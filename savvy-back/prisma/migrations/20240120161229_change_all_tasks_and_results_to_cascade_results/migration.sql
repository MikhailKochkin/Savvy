-- DropForeignKey
ALTER TABLE "ChallengeResult" DROP CONSTRAINT "ChallengeResult_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "ChallengeResult" DROP CONSTRAINT "ChallengeResult_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Construction" DROP CONSTRAINT "Construction_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "ConstructionResult" DROP CONSTRAINT "ConstructionResult_constructionId_fkey";

-- DropForeignKey
ALTER TABLE "ConstructionResult" DROP CONSTRAINT "ConstructionResult_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "ConstructionResult" DROP CONSTRAINT "ConstructionResult_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_userId_fkey";

-- DropForeignKey
ALTER TABLE "DocumentResult" DROP CONSTRAINT "DocumentResult_documentId_fkey";

-- DropForeignKey
ALTER TABLE "DocumentResult" DROP CONSTRAINT "DocumentResult_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "DocumentResult" DROP CONSTRAINT "DocumentResult_userId_fkey";

-- DropForeignKey
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "Exam" DROP CONSTRAINT "Exam_userId_fkey";

-- DropForeignKey
ALTER TABLE "ExamResult" DROP CONSTRAINT "ExamResult_examId_fkey";

-- DropForeignKey
ALTER TABLE "ExamResult" DROP CONSTRAINT "ExamResult_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "ExamResult" DROP CONSTRAINT "ExamResult_userId_fkey";

-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Feedback" DROP CONSTRAINT "Feedback_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "LessonResult" DROP CONSTRAINT "LessonResult_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "LessonResult" DROP CONSTRAINT "LessonResult_studentId_fkey";

-- DropForeignKey
ALTER TABLE "MiniForum" DROP CONSTRAINT "MiniForum_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "MiniForum" DROP CONSTRAINT "MiniForum_userId_fkey";

-- DropForeignKey
ALTER TABLE "NewTest" DROP CONSTRAINT "NewTest_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "NewTest" DROP CONSTRAINT "NewTest_userId_fkey";

-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_userId_fkey";

-- DropForeignKey
ALTER TABLE "Offer" DROP CONSTRAINT "Offer_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "Offer" DROP CONSTRAINT "Offer_userId_fkey";

-- DropForeignKey
ALTER TABLE "Problem" DROP CONSTRAINT "Problem_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "Problem" DROP CONSTRAINT "Problem_userId_fkey";

-- DropForeignKey
ALTER TABLE "ProblemResult" DROP CONSTRAINT "ProblemResult_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "ProblemResult" DROP CONSTRAINT "ProblemResult_problemId_fkey";

-- DropForeignKey
ALTER TABLE "ProblemResult" DROP CONSTRAINT "ProblemResult_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_userId_fkey";

-- DropForeignKey
ALTER TABLE "QuizResult" DROP CONSTRAINT "QuizResult_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "QuizResult" DROP CONSTRAINT "QuizResult_quizId_fkey";

-- DropForeignKey
ALTER TABLE "QuizResult" DROP CONSTRAINT "QuizResult_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Shot" DROP CONSTRAINT "Shot_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "Shot" DROP CONSTRAINT "Shot_userId_fkey";

-- DropForeignKey
ALTER TABLE "ShotResult" DROP CONSTRAINT "ShotResult_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "ShotResult" DROP CONSTRAINT "ShotResult_shotId_fkey";

-- DropForeignKey
ALTER TABLE "ShotResult" DROP CONSTRAINT "ShotResult_studentId_fkey";

-- DropForeignKey
ALTER TABLE "TeamQuestResult" DROP CONSTRAINT "TeamQuestResult_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "TeamQuestResult" DROP CONSTRAINT "TeamQuestResult_teamQuestId_fkey";

-- DropForeignKey
ALTER TABLE "Test" DROP CONSTRAINT "Test_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "Test" DROP CONSTRAINT "Test_userId_fkey";

-- DropForeignKey
ALTER TABLE "TestPractice" DROP CONSTRAINT "TestPractice_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "TestPractice" DROP CONSTRAINT "TestPractice_userId_fkey";

-- DropForeignKey
ALTER TABLE "TestPracticeResult" DROP CONSTRAINT "TestPracticeResult_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "TestPracticeResult" DROP CONSTRAINT "TestPracticeResult_testPracticeId_fkey";

-- DropForeignKey
ALTER TABLE "TestResult" DROP CONSTRAINT "TestResult_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "TestResult" DROP CONSTRAINT "TestResult_studentId_fkey";

-- DropForeignKey
ALTER TABLE "TestResult" DROP CONSTRAINT "TestResult_testId_fkey";

-- DropForeignKey
ALTER TABLE "TextEditor" DROP CONSTRAINT "TextEditor_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "TextEditor" DROP CONSTRAINT "TextEditor_userId_fkey";

-- DropForeignKey
ALTER TABLE "TextEditorResult" DROP CONSTRAINT "TextEditorResult_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "TextEditorResult" DROP CONSTRAINT "TextEditorResult_studentId_fkey";

-- DropForeignKey
ALTER TABLE "TextEditorResult" DROP CONSTRAINT "TextEditorResult_textEditorId_fkey";

-- AddForeignKey
ALTER TABLE "ChallengeResult" ADD CONSTRAINT "ChallengeResult_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ChallengeResult" ADD CONSTRAINT "ChallengeResult_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Construction" ADD CONSTRAINT "Construction_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ConstructionResult" ADD CONSTRAINT "ConstructionResult_constructionId_fkey" FOREIGN KEY ("constructionId") REFERENCES "Construction"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ConstructionResult" ADD CONSTRAINT "ConstructionResult_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ConstructionResult" ADD CONSTRAINT "ConstructionResult_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "DocumentResult" ADD CONSTRAINT "DocumentResult_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "Document"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "DocumentResult" ADD CONSTRAINT "DocumentResult_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "DocumentResult" ADD CONSTRAINT "DocumentResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Exam" ADD CONSTRAINT "Exam_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ExamResult" ADD CONSTRAINT "ExamResult_examId_fkey" FOREIGN KEY ("examId") REFERENCES "Exam"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ExamResult" ADD CONSTRAINT "ExamResult_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ExamResult" ADD CONSTRAINT "ExamResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "LessonResult" ADD CONSTRAINT "LessonResult_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "LessonResult" ADD CONSTRAINT "LessonResult_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "MiniForum" ADD CONSTRAINT "MiniForum_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MiniForum" ADD CONSTRAINT "MiniForum_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewTest" ADD CONSTRAINT "NewTest_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "NewTest" ADD CONSTRAINT "NewTest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Problem" ADD CONSTRAINT "Problem_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Problem" ADD CONSTRAINT "Problem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProblemResult" ADD CONSTRAINT "ProblemResult_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProblemResult" ADD CONSTRAINT "ProblemResult_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProblemResult" ADD CONSTRAINT "ProblemResult_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "QuizResult" ADD CONSTRAINT "QuizResult_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "QuizResult" ADD CONSTRAINT "QuizResult_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "QuizResult" ADD CONSTRAINT "QuizResult_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Shot" ADD CONSTRAINT "Shot_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Shot" ADD CONSTRAINT "Shot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ShotResult" ADD CONSTRAINT "ShotResult_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ShotResult" ADD CONSTRAINT "ShotResult_shotId_fkey" FOREIGN KEY ("shotId") REFERENCES "Shot"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ShotResult" ADD CONSTRAINT "ShotResult_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TeamQuestResult" ADD CONSTRAINT "TeamQuestResult_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamQuestResult" ADD CONSTRAINT "TeamQuestResult_teamQuestId_fkey" FOREIGN KEY ("teamQuestId") REFERENCES "TeamQuest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TestPractice" ADD CONSTRAINT "TestPractice_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestPractice" ADD CONSTRAINT "TestPractice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestPracticeResult" ADD CONSTRAINT "TestPracticeResult_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestPracticeResult" ADD CONSTRAINT "TestPracticeResult_testPracticeId_fkey" FOREIGN KEY ("testPracticeId") REFERENCES "TestPractice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestResult" ADD CONSTRAINT "TestResult_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TestResult" ADD CONSTRAINT "TestResult_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TestResult" ADD CONSTRAINT "TestResult_testId_fkey" FOREIGN KEY ("testId") REFERENCES "NewTest"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TextEditor" ADD CONSTRAINT "TextEditor_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TextEditor" ADD CONSTRAINT "TextEditor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TextEditorResult" ADD CONSTRAINT "TextEditorResult_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TextEditorResult" ADD CONSTRAINT "TextEditorResult_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "TextEditorResult" ADD CONSTRAINT "TextEditorResult_textEditorId_fkey" FOREIGN KEY ("textEditorId") REFERENCES "TextEditor"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
