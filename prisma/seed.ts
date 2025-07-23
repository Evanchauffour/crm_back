import * as bcrypt from 'bcryptjs';
import { PrismaClient, Status } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed Users
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
  const passwordHash: string = await bcrypt.hash('password123', 10);
  await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      email: 'alice@example.com',
      password: passwordHash,
    },
  });
  await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: {
      email: 'bob@example.com',
      password: passwordHash,
    },
  });

  // Seed Clients
  const client1 = await prisma.client.upsert({
    where: { email: 'client1@company.com' },
    update: {},
    create: {
      name: 'Client One',
      email: 'client1@company.com',
      phone: '0600000001',
      company: 'Company A',
      notes: 'Premier client important',
    },
  });
  const client2 = await prisma.client.upsert({
    where: { email: 'client2@company.com' },
    update: {},
    create: {
      name: 'Client Two',
      email: 'client2@company.com',
      phone: '0600000002',
      company: 'Company B',
      notes: 'Client potentiel',
    },
  });

  // Seed Opportunities
  await prisma.opportunity.createMany({
    data: [
      {
        title: 'Vente CRM',
        amount: 5000,
        status: Status.in_progress,
        clientId: client1.id,
      },
      {
        title: 'Formation équipe',
        amount: 2000,
        status: Status.won,
        clientId: client1.id,
      },
      {
        title: 'Migration cloud',
        amount: 8000,
        status: Status.lost,
        clientId: client2.id,
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .catch((e: unknown) => {
    console.error(e);
    process.exit(1);
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect();
  });
