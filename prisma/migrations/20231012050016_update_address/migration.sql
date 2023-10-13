/*
  Warnings:

  - You are about to drop the column `country` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `streetName` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `zipCode` on the `Address` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "country",
DROP COLUMN "streetName",
DROP COLUMN "zipCode";
