/*
  Warnings:

  - You are about to drop the `Companie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CompanyManagers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PlaceManagers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tickes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Companie" DROP CONSTRAINT "Companie_mainUserId_fkey";

-- DropForeignKey
ALTER TABLE "CompanyManagers" DROP CONSTRAINT "CompanyManagers_companyId_fkey";

-- DropForeignKey
ALTER TABLE "CompanyManagers" DROP CONSTRAINT "CompanyManagers_userId_fkey";

-- DropForeignKey
ALTER TABLE "Place" DROP CONSTRAINT "Place_companyId_fkey";

-- DropForeignKey
ALTER TABLE "PlaceManagers" DROP CONSTRAINT "PlaceManagers_placeId_fkey";

-- DropForeignKey
ALTER TABLE "PlaceManagers" DROP CONSTRAINT "PlaceManagers_userId_fkey";

-- DropForeignKey
ALTER TABLE "Tickes" DROP CONSTRAINT "Tickes_requesterId_replierEmail_fkey";

-- DropTable
DROP TABLE "Companie";

-- DropTable
DROP TABLE "CompanyManagers";

-- DropTable
DROP TABLE "PlaceManagers";

-- DropTable
DROP TABLE "Tickes";

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "taxId" TEXT NOT NULL,
    "mainUserId" INTEGER NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyManager" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "CompanyManager_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlaceManager" (
    "id" SERIAL NOT NULL,
    "placeId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "PlaceManager_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "requesterId" INTEGER NOT NULL,
    "replierEmail" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_email_key" ON "Ticket"("email");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_mainUserId_fkey" FOREIGN KEY ("mainUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Place" ADD CONSTRAINT "Place_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyManager" ADD CONSTRAINT "CompanyManager_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyManager" ADD CONSTRAINT "CompanyManager_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaceManager" ADD CONSTRAINT "PlaceManager_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaceManager" ADD CONSTRAINT "PlaceManager_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_requesterId_replierEmail_fkey" FOREIGN KEY ("requesterId", "replierEmail") REFERENCES "User"("id", "email") ON DELETE RESTRICT ON UPDATE CASCADE;
