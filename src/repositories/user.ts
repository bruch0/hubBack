import { Prisma, PrismaClient, User } from '@prisma/client';

const getUsers = async (userFindMany: Prisma.UserFindManyArgs): Promise<User[]> => {
  const prisma = new PrismaClient();
  const response = await prisma.user.findMany(userFindMany);

  return response;
};

const getOneUser = async (UserFindUnique: Prisma.UserFindUniqueArgs): Promise<User | null> => {
  const prisma = new PrismaClient();
  const response = await prisma.user.findUnique(UserFindUnique);

  return response;
};

const createUser = async (userCreate: Prisma.UserCreateArgs): Promise<User> => {
  const prisma = new PrismaClient();
  const response = await prisma.user.create(userCreate);

  return response;
};

export { getUsers, getOneUser, createUser };
