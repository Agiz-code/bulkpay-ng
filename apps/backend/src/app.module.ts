import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaService } from '../prisma/prisma.service';

import { PaymentController } from './modules/payments/payment.controller';
import { PaymentService } from './modules/payments/payments.service';
import { PaystackWebhook } from './paystack.webhook';

import { AuthModule } from './modules/auth/auth.module';
import { LedgerService } from './modules/ledger/ledger.service';
import { PayrollModule } from './modules/payroll/payroll.module';
import { TransferService } from './modules/transfer/transfer.service';
import { WalletModule } from './modules/wallet/wallet.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    WalletModule,
    PayrollModule,
  ],
  controllers: [PaymentController, PaystackWebhook],
  providers: [PrismaService, PaymentService, TransferService, LedgerService],
})
export class AppModule {}
