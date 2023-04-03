/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Topic` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Article" ALTER COLUMN "status" SET DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Topic_name_key" ON "Topic"("name");
