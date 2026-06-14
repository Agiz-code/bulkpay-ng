import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LedgerService {
  constructor(private prisma: PrismaService) {}

  async record(
    reference: string,
    debit: string,
    credit: string,
    amount: bigint,
  ) {
    return this.prisma.transaction.createMany({
      data: [
        {
          walletId: debit,
          type: 'DEBIT',
          status: 'PENDING',
          amount,
          reference,
        },
        {
          walletId: credit,
          type: 'CREDIT',
          status: 'PENDING',
          amount,
          reference,
        },
      ],
    });
  }
}
