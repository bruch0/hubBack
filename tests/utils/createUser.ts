import { PrismaClient, User } from '@prisma/client';
import { hashSync } from 'bcrypt';
import faker from 'faker';

const createUser = async (): Promise<Omit<User, 'name' | 'phone' | 'address'>> => {
  const prisma = new PrismaClient();
  const password = faker.internet.password();
  const validBody = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: hashSync(password, 12),
    address: faker.address.streetAddress(),
    phone: faker.phone.phoneNumber('###########'),
  };

  const user = await prisma.user.create({ data: { ...validBody } });

  return { id: user.id, email: user.email, password };
};

export default createUser;
