/*
  Warnings:

  - You are about to drop the column `type` on the `Job` table. All the data in the column will be lost.
  - The `location` column on the `Job` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `jobType` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "SalaryRange" ADD VALUE 'VERY_LOW';
ALTER TYPE "SalaryRange" ADD VALUE 'ULTRA';

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "type",
ADD COLUMN     "jobType" "JobType" NOT NULL,
DROP COLUMN "location",
ADD COLUMN     "location" TEXT;
