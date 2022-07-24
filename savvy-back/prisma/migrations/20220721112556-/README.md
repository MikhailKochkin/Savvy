# Migration `20220721112556-`

This migration has been generated by MikhailKochkin at 7/21/2022, 3:25:56 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql

```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20220721112119-llawrddle..20220721112556-
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
@@ -916,16 +916,16 @@
   user           User     @relation(fields: [userId], references: [id])
 }
 model Lawrdle {
-  id          String   @id
+  id          String   @id @default(cuid())
   word        String
   story       String
   authorId    String
   active      Boolean
   author      User     @relation(fields: [authorId], references: [id])
   createdAt      DateTime @default(now())
-  updatedAt      DateTime
+  updatedAt      DateTime @updatedAt
 }
 enum CheckType {
   WORD
```

