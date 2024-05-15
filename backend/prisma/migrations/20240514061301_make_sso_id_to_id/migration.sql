/*
  Warnings:

  - You are about to drop the column `ssoId` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_ssoId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "ssoId";
