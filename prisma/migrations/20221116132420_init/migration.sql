/*
  Warnings:

  - A unique constraint covering the columns `[id,taxId]` on the table `Company` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Company_taxId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Company_id_taxId_key" ON "Company"("id", "taxId");
