import { Prisma, PrismaClient, Company, CompanyManager } from '@prisma/client';

const getCompanies = async (companyFindMany: Prisma.CompanyManagerFindManyArgs): Promise<CompanyManager[]> => {
  const prisma = new PrismaClient();
  const response = await prisma.companyManager.findMany(companyFindMany);

  return response;
};

const getOneCompany = async (CompanyFindUnique: Prisma.CompanyFindUniqueArgs): Promise<Company | null> => {
  const prisma = new PrismaClient();
  const response = await prisma.company.findUnique(CompanyFindUnique);

  return response;
};

const createCompany = async (companyCreate: Prisma.CompanyCreateArgs): Promise<Company> => {
  const prisma = new PrismaClient();
  const response = await prisma.company.create(companyCreate);

  return response;
};

const updateCompany = async (companyUpdate: Prisma.CompanyUpdateArgs): Promise<Company> => {
  const prisma = new PrismaClient();
  const response = await prisma.company.update(companyUpdate);

  return response;
};

const deleteCompany = async (companyDelete: Prisma.CompanyDeleteArgs): Promise<Company> => {
  const prisma = new PrismaClient();
  const response = await prisma.company.delete(companyDelete);

  return response;
};

export { getCompanies, getOneCompany, createCompany, updateCompany, deleteCompany };
