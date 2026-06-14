import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WalletService {
  constructor(private prisma: PrismaService) {}

  async getBalance(companyId: string) {
    const wallet = await this.prisma.wallet.findUnique({
      where: { companyId },
    });

    return wallet?.balance ?? BigInt(0);
  }
}
