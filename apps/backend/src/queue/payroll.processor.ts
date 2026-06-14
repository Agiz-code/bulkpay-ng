import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { Worker } from 'bullmq';

const prisma = new PrismaClient({
  log: ['error', 'warn'],
});

// Ensure graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

new Worker(
  'payroll',
  async (job) => {
    const { batchId } = job.data;

    try {
      const items = await prisma.payrollItem.findMany({
        where: { batchId },
      });

      for (const item of items) {
        try {
          const amount = Number(item.amount) * 100;

          await axios.post(
            'https://api.paystack.co/transfer',
            {
              amount,
              recipient: item.account,
            },
            {
              headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
              },
            },
          );

          await prisma.payrollItem.update({
            where: { id: item.id },
            data: { status: 'SUCCESS' },
          });
        } catch (error) {
          console.error(`Payroll item ${item.id} failed:`, error);
          await prisma.payrollItem.update({
            where: { id: item.id },
            data: { status: 'FAILED' },
          });
        }
      }
    } catch (error) {
      console.error('Payroll job failed:', error);
      throw error;
    }
  },
  {
    connection: {
      host: process.env.REDIS_HOST || '127.0.0.1',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      password: process.env.REDIS_PASSWORD,
    },
  },
);
