import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PaymentService {
  constructor(private prisma: PrismaService) {}

  async initiateFunding(companyId: string, amount: number, email: string) {
    const wallet = await this.prisma.wallet.findUnique({
      where: { companyId },
    });
    if (!wallet) throw new Error('Wallet not found');

    const reference = `fund_${Date.now()}`;

    await this.prisma.transaction.create({
      data: {
        walletId: wallet.id,
        amount: BigInt(amount),
        type: 'CREDIT',
        status: 'PENDING',
        reference,
      },
    });

    const res = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      { email, amount, reference },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
        },
      },
    );

    return res.data.data;
  }

  async confirmFunding(reference: string) {
    return this.prisma.$transaction(async (tx) => {
      const trx = await tx.transaction.findUnique({
        where: { reference },
        include: { wallet: true },
      });

      if (!trx || trx.status === 'SUCCESS') return;

      const verify = await axios.get(
        `https://api.paystack.co/transaction/verify/${reference}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
          },
        },
      );

      const data = verify.data.data;

      if (data.status !== 'success') {
        await tx.transaction.update({
          where: { id: trx.id },
          data: { status: 'FAILED' },
        });
        return;
      }

      await tx.transaction.update({
        where: { id: trx.id },
        data: { status: 'SUCCESS' },
      });

      await tx.wallet.update({
        where: { id: trx.walletId },
        data: {
          balance: { increment: trx.amount },
        },
      });

      return { success: true };
    });
  }
}
