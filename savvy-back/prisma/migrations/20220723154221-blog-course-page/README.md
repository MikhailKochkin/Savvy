# Migration `20220723154221-blog-course-page`

This migration has been generated by MikhailKochkin at 7/23/2022, 7:42:21 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql

```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20220722150117-link-lawrdle..20220723154221-blog-course-page
--- datamodel.dml
+++ datamodel.dml
@@ -3,9 +3,9 @@
 }
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 model Application {
   id            String     @id @default(cuid())
@@ -476,9 +476,9 @@
   tags        String[]
   userId      String
   coursePageId String?
   user        User         @relation(fields: [userId], references: [id])
-  coursePages CoursePage?   @relation(fields: [coursePageId], references: [id])
+  coursePage CoursePage?   @relation(fields: [coursePageId], references: [id])
 }
 model Problem {
   id             String          @id @default(cuid())
```

