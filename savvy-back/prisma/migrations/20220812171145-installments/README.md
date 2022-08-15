# Migration `20220812171145-installments`

This migration has been generated by MikhailKochkin at 8/12/2022, 9:11:46 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "CoursePage" ADD COLUMN     "installments" INTEGER
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20220809070212-currency..20220812171145-installments
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
@@ -189,8 +189,9 @@
   goals             String[]
   reviews           Json?
   weeks             Int?
   subscriptionPrice Int?
+  installments      Int?
   subscription      Boolean?          @default(false)
   tags              String[]
   students          String[]
   userId            String
```

