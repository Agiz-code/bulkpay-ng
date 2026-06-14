import { PrismaService } from '@/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ClerkWebhookController } from './clerk-webhook.controller';
import { ClerkWebhookService } from './clerk-webhook.service';
import { ClerkService } from './clerk.service';
import { NeonAuthService } from './neon-auth.service';

@Module({
  controllers: [AuthController, ClerkWebhookController],
  providers: [
    AuthService,
    NeonAuthService,
    ClerkService,
    PrismaService,
    ClerkWebhookService,
  ],
})
export class AuthModule {}
