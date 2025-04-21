/*
  Warnings:

  - A unique constraint covering the columns `[commentId,reporterId]` on the table `Report` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[feedId,reporterId]` on the table `Report` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "likedByUser" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "Report_commentId_reporterId_key" ON "Report"("commentId", "reporterId");

-- CreateIndex
CREATE UNIQUE INDEX "Report_feedId_reporterId_key" ON "Report"("feedId", "reporterId");
