import * as companyRepository from '@repositories/company';

const getUserCompanies = async ({ userId }: { userId: number }): Promise<any> => {
  const userCompanies = await companyRepository.getCompanies({
    where: {
      mainUserId: userId,
    },
  });

  return userCompanies;
};

export { getUserCompanies };
