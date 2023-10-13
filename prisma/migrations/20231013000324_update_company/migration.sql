/*
  Warnings:

  - A unique constraint covering the columns `[companyId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,cnpj,email]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `companyId` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adminId` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_addressId_fkey";

-- DropIndex
DROP INDEX "Company_name_key";

-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "companyId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "adminId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Address_companyId_key" ON "Address"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "Company_name_cnpj_email_key" ON "Company"("name", "cnpj", "email");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
