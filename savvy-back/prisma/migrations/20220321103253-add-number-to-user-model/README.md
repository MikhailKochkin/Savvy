# Migration `20220321103253-add-number-to-user-model`

This migration has been generated by MikhailKochkin at 3/21/2022, 1:32:53 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "User" ADD COLUMN     "number" TEXT
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20220309120217-add-post-language..20220321103253-add-number-to-user-model
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
@@ -646,8 +646,9 @@
 model User {
   id                  String               @id @default(cuid())
   name                String
+  number                String?
   email               String               @unique
   password            String
   resetToken          String?
   resetTokenExpiry    Float?
```

