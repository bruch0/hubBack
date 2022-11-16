-- DropForeignKey
ALTER TABLE "CompanyManager" DROP CONSTRAINT "CompanyManager_companyId_fkey";

-- AddForeignKey
ALTER TABLE "CompanyManager" ADD CONSTRAINT "CompanyManager_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
