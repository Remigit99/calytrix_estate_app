import 'dotenv/config';

import * as argon2 from 'argon2';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';

const connectionString = process.env.DATABASE_URL_UNPOOLED;

if (!connectionString) {
  throw new Error('DATABASE_URL_UNPOOLED is not configured');
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

const seed = async () => {
  const passwordHash = await argon2.hash('Password123!', {
    type: argon2.argon2id,
  });

  const agent = await prisma.user.upsert({
    where: {
      email: 'agent@calytrix.test',
    },
    update: {
      role: 'AGENT',
      isActive: true,
    },
    create: {
      firstName: 'Calytrix',
      lastName: 'Agent',
      email: 'agent@calytrix.test',
      passwordHash,
      phone: '08000000001',
      role: 'AGENT',
      isActive: true,
    },
  });

  const admin = await prisma.user.upsert({
    where: {
      email: 'admin@calytrix.test',
    },
    update: {
      role: 'ADMIN',
      isActive: true,
    },
    create: {
      firstName: 'Calytrix',
      lastName: 'Admin',
      email: 'admin@calytrix.test',
      passwordHash,
      phone: '08000000002',
      role: 'ADMIN',
      isActive: true,
    },
  });

  const user = await prisma.user.upsert({
    where: {
      email: 'user@calytrix.test',
    },
    update: {
      role: 'USER',
      isActive: true,
    },
    create: {
      firstName: 'Calytrix',
      lastName: 'User',
      email: 'user@calytrix.test',
      passwordHash,
      phone: '08000000003',
      role: 'USER',
      isActive: true,
    },
  });

  console.log('Seed complete');
  console.log({
    agent: agent.email,
    admin: admin.email,
    user: user.email,
  });
};

seed()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
