/*
  Warnings:

  - A unique constraint covering the columns `[taxId]` on the table `Company` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Company_taxId_key" ON "Company"("taxId");
