# Migration `20201125032629-update-feeds`

This migration has been generated by Jace Benson at 11/24/2020, 9:26:29 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "Feed" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT false
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201124234433-feed..20201125032629-update-feeds
--- datamodel.dml
+++ datamodel.dml
@@ -1,9 +1,9 @@
 datasource DS {
   // optionally set multiple providers
   // example: provider = ["sqlite", "postgresql"]
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider      = "prisma-client-js"
@@ -42,5 +42,6 @@
   name    String
   url     String
   created DateTime @default(now())
   lastRun DateTime @default(now())
+  active  Boolean  @default(false)
 }
```

