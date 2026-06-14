import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

type ClerkEmail = { email_address: string };
type ClerkUser = {
  id: string;
  first_name?: string | null;
  last_name?: string | null;
  image_url?: string | null;
  email_addresses?: ClerkEmail[] | null;
};

type ClerkEvent = {
  type: string;
  data?: { user?: ClerkUser } | null;
};

@Injectable()
export class ClerkWebhookService {
  private readonly logger = new Logger(ClerkWebhookService.name);

  constructor(private readonly prisma: PrismaService) {}

  async handleEvent(event: ClerkEvent) {
    const type = event.type;
    const user = event.data?.user;
    if (!user || !user.id) {
      this.logger.warn('Webhook event missing user payload or id');
      return;
    }

    const clerkId = user.id;
    const email = user.email_addresses?.[0]?.email_address;
    const firstName = user.first_name ?? null;
    const lastName = user.last_name ?? null;
    const imageUrl = user.image_url ?? null;
    const name =
      [user.first_name, user.last_name].filter(Boolean).join(' ') || undefined;

    try {
      if (type === 'user.created' || type === 'user.updated') {
        if (!email) {
          this.logger.warn(
            `Skipping ${type} for Clerk user ${clerkId} because no email was provided`,
          );
          return;
        }

        const existingByClerkId = await this.prisma.user.findUnique({
          where: { clerkId },
        });
        const existingByEmail = await this.prisma.user.findUnique({
          where: { email },
        });

        if (existingByClerkId) {
          await this.prisma.user.update({
            where: { clerkId },
            data: {
              email,
              name: name ?? existingByClerkId.name,
              firstName,
              lastName,
              imageUrl,
            },
          });
          return;
        }

        if (existingByEmail) {
          await this.prisma.user.update({
            where: { email },
            data: {
              clerkId,
              name: name ?? existingByEmail.name,
              firstName,
              lastName,
              imageUrl,
            },
          });
          return;
        }

        const companyId = await this.getOrCreateClerkImportCompanyId();
        if (!companyId) {
          this.logger.warn(
            `Cannot create Clerk user ${clerkId} because no import company is configured or available`,
          );
          return;
        }

        const password = await bcrypt.hash(
          `${clerkId}-${Date.now()}-${Math.random()}`,
          10,
        );

        await this.prisma.user.create({
          data: {
            clerkId,
            email,
            name: name ?? email,
            password,
            role: 'STAFF',
            companyId,
            firstName,
            lastName,
            imageUrl,
          },
        });
      } else if (type === 'user.deleted') {
        if (email) {
          try {
            await this.prisma.user.delete({ where: { email } });
            return;
          } catch {
            // if the email delete fails, try clerkId delete path below
          }
        }

        try {
          await this.prisma.user.delete({ where: { clerkId } });
        } catch (err) {
          this.logger.debug(
            `User with clerkId ${clerkId} not found for deletion`,
          );
        }
      } else {
        this.logger.debug(`Ignored event type ${type}`);
      }
    } catch (err) {
      this.logger.error('Error handling Clerk webhook event', err as Error);
      throw err;
    }
  }

  private async getOrCreateClerkImportCompanyId(): Promise<string | null> {
    const configuredCompanyId = process.env.CLERK_DEFAULT_COMPANY_ID;
    if (configuredCompanyId) {
      const company = await this.prisma.company.findUnique({
        where: { id: configuredCompanyId },
      });
      if (company) {
        return company.id;
      }
      this.logger.warn(
        `CLERK_DEFAULT_COMPANY_ID=${configuredCompanyId} does not exist`,
      );
    }

    const placeholderName = 'Clerk imported users';
    const existing = await this.prisma.company.findFirst({
      where: { name: placeholderName },
    });
    if (existing) {
      return existing.id;
    }

    const company = await this.prisma.company.create({
      data: { name: placeholderName },
    });
    return company.id;
  }
}
