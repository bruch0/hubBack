/*
  Warnings:

  - You are about to drop the column `taxId` on the `Place` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Company` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_mainUserId_fkey";

-- AlterTable
ALTER TABLE "Place" DROP COLUMN "taxId";

-- CreateIndex
CREATE UNIQUE INDEX "Company_id_key" ON "Company"("id");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_mainUserId_fkey" FOREIGN KEY ("mainUserId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
