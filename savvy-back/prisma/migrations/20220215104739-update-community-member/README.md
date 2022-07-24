# Migration `20220215104739-update-community-member`

This migration has been generated by MikhailKochkin at 2/15/2022, 1:47:40 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "CommunityMember" ADD COLUMN     "subscription" TEXT,
ADD COLUMN     "source" TEXT
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20220215101712-community-member..20220215104739-update-community-member
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
@@ -44,13 +44,15 @@
 }
 model CommunityMember {
   id                   String   @id @default(cuid())
-  email                String
   createdAt            DateTime @default(now())
   updatedAt            DateTime @updatedAt
   name                 String
   surname              String?
+  subscription         String?
+  source               String?
+  email                String
   number               String?
 }
 model CareerTrack {
```

