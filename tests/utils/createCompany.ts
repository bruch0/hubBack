import { Company } from '@prisma/client';
import faker from 'faker';

import prisma from '../../src/repositories/prismaInitializer';
import createUser from './createUser';

const createCompany = async (): Promise<Omit<Company, 'name' | 'taxId' | 'address' | 'mainUserId'>> => {
  const { id } = await createUser();

  const validBody = {
    name: faker.name.findName(),
    address: faker.address.streetAddress(),
    taxId: faker.datatype.string(13),
    mainUserId: id,
  };

  const company = await prisma.company.create({ data: { ...validBody } });

  return { id: company.id };
};

export default createCompany;
