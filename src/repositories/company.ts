import { Prisma, Company, CompanyManager } from '@prisma/client';
import prisma from '@repositories/prismaInitializer';

const getCompanies = async (companyFindMany: Prisma.CompanyManagerFindManyArgs): Promise<CompanyManager[]> => {
  const response = await prisma.companyManager.findMany(companyFindMany);

  return response;
};

const getOneCompany = async (CompanyFindUnique: Prisma.CompanyFindUniqueArgs): Promise<Company | null> => {
  const response = await prisma.company.findUnique(CompanyFindUnique);

  return response;
};

const createCompany = async (companyCreate: Prisma.CompanyCreateArgs): Promise<void> => {
  await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    const company = await tx.company.create(companyCreate);
    await tx.companyManager.create({ data: { userId: companyCreate.data.mainUserId!, companyId: company.id } });
  });
};

const updateCompany = async (companyUpdate: Prisma.CompanyUpdateArgs): Promise<Company> => {
  const response = await prisma.company.update(companyUpdate);

  return response;
};

const deleteCompany = async (companyDelete: Prisma.CompanyDeleteArgs): Promise<Company> => {
  const response = await prisma.company.delete(companyDelete);

  return response;
};

export { getCompanies, getOneCompany, createCompany, updateCompany, deleteCompany };
