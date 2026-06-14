import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransferService {
  constructor(private prisma: PrismaService) {}

  async transfer(from: string, to: string, amount: number) {
    return this.prisma.$transaction(async (tx) => {
      const fromWallet = await tx.wallet.findUnique({
        where: { companyId: from },
      });

      const toWallet = await tx.wallet.findUnique({
        where: { companyId: to },
      });

      if (!fromWallet || !toWallet) throw new Error('Wallet missing');

      if (fromWallet.balance < BigInt(amount)) {
        throw new Error('Insufficient funds');
      }

      await tx.wallet.update({
        where: { id: fromWallet.id },
        data: { balance: { decrement: BigInt(amount) } },
      });

      await tx.wallet.update({
        where: { id: toWallet.id },
        data: { balance: { increment: BigInt(amount) } },
      });

      return { success: true };
    });
  }
}
