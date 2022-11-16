import Error from '@errors/genericError';

import * as companySchema from '@services/schemas/company';
import * as companyRepository from '@repositories/company';

const getUserCompanies = async ({ userId }: { userId: number }): Promise<any> => {
  const userCompanies = await companyRepository.getCompanies({
    where: {
      userId,
    },
    select: {
      company: true,
    },
  });

  return userCompanies;
};

const getCompanyDetails = async ({ companyId }: { companyId: number }): Promise<any> => {
  if (Number.isNaN(companyId) || companyId < 1) throw new Error('invalidCompanyId', 'Empresa inválida', 404);

  const companyDetails = await companyRepository.getOneCompany({
    where: {
      id: companyId,
    },
    select: {
      name: true,
      address: true,
      taxId: true,
      mainUserId: true,
      managers: {
        select: {
          user: {
            select: {
              name: true,
              email: true,
              phone: true,
            },
          },
        },
      },
      places: {
        select: {
          name: true,
          address: true,
        },
      },
    },
  });

  return companyDetails;
};

const createCompany = async ({
  name,
  address,
  taxId,
  mainUserId,
}: {
  name: string;
  address: string;
  taxId: string;
  mainUserId: number;
}): Promise<any> => {
  const validation = companySchema.createCompany.validate({
    name,
    address,
    taxId,
    mainUserId,
  });

  if (validation.error != null) {
    const errorMessage = validation.error.details[0].message;
    throw new Error('bodyValidation', errorMessage, 400);
  }

  const available = await companyRepository.getOneCompany({
    where: { taxId },
  });
  if (available != null) throw new Error('companyAlreadyRegistered', 'This company is already in our database', 403);

  await companyRepository.createCompany({ data: { name, address, taxId, mainUserId } });
};

const updateCompany = async ({
  name,
  address,
  taxId,
}: {
  name: string;
  address: string;
  taxId: string;
}): Promise<any> => {
  const validation = companySchema.updateCompany.validate({
    name,
    address,
    taxId,
  });

  if (validation.error != null) {
    const errorMessage = validation.error.details[0].message;
    throw new Error('bodyValidation', errorMessage, 400);
  }

  const companyDetails = await companyRepository.updateCompany({ data: { name, address, taxId }, where: { taxId } });

  return companyDetails;
};

const deleteCompany = async ({ taxId, userId }: { userId: number; taxId: string }): Promise<any> => {
  const validation = companySchema.deleteCompany.validate({
    taxId,
    userId,
  });

  if (validation.error != null) {
    const errorMessage = validation.error.details[0].message;
    throw new Error('bodyValidation', errorMessage, 400);
  }

  const company = await companyRepository.getOneCompany({
    where: {
      taxId,
    },
  });

  if (company?.mainUserId !== userId) throw new Error('unauthorized', 'Only the owner can delete a company', 401);

  await companyRepository.deleteCompany({ where: { taxId } });
};

export { getUserCompanies, getCompanyDetails, createCompany, updateCompany, deleteCompany };
