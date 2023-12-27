/*
  Warnings:

  - Added the required column `companyId` to the `EmployeeAvailability` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EmployeeAvailability" ADD COLUMN     "companyId" TEXT NOT NULL;
