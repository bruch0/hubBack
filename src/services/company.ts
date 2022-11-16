import * as companyRepository from '@repositories/company';

const getUserCompanies = async ({ userId }: { userId: number }): Promise<any> => {
  const userCompanies = await companyRepository.getCompanies({
    where: {
      userId,
    },
    include: {
      company: true,
    },
  });

  return userCompanies;
};

export { getUserCompanies };
