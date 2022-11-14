import { PrismaClient } from '@prisma/client';

const clearDatabase = async (): Promise<void> => {
  const prisma = new PrismaClient();

  await prisma.$executeRawUnsafe('TRUNCATE "User" CASCADE;');

  await prisma.$executeRawUnsafe('TRUNCATE "Company" CASCADE;');

  await prisma.$executeRawUnsafe('TRUNCATE "Place" CASCADE;');

  await prisma.$executeRawUnsafe('TRUNCATE "PlaceManager" CASCADE;');

  await prisma.$executeRawUnsafe('TRUNCATE "CompanyManager" CASCADE;');

  await prisma.$executeRawUnsafe('TRUNCATE "Session" CASCADE;');

  await prisma.$executeRawUnsafe('TRUNCATE "Ticket" CASCADE;');
};

export default clearDatabase;
