# Migration `20210928103231-update-post`

This migration has been generated by MikhailKochkin at 9/28/2021, 1:32:31 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "Post" ADD COLUMN     "summary" TEXT,
ADD COLUMN     "image" TEXT
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20210903045000-short_structure..20210928103231-update-post
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
@@ -413,8 +413,10 @@
 model Post {
   id          String       @id @default(cuid())
   title       String?
   text        String?
+  summary     String?
+  image       String?
   createdAt   DateTime     @default(now())
   updatedAt   DateTime     @updatedAt
   likes       Int?         @default(1)
   tags        String[]
```

