# Migration `20221209071809-course_countries`

This migration has been generated by MikhailKochkin at 12/9/2022, 11:18:09 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "CoursePage" ADD COLUMN     "countries" TEXT[]
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20221208180035-course_view..20221209071809-course_countries
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
@@ -168,8 +168,9 @@
   createdAt         DateTime          @default(now())
   updatedAt         DateTime          @updatedAt
   price             Int?
   currency          String?           @default("ruble")
+  countries         String[]
   discountPrice     Int?
   numInCareerTrack  Int?
   published         Boolean?          @default(false)
   uniID             String?           @default(cuid())
```

