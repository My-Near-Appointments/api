-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('CompanyAdmin', 'Customer', 'Admin');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'Customer';
