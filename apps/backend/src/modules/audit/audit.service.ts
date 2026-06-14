import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class AuditService {
  constructor(private prisma: PrismaService) {}

  log(
    action: string,
    actorId: string,
    entityType: string = 'UNKNOWN',
    entityId: string = 'UNKNOWN',
    metadata?: any,
  ) {
    return this.prisma.auditLog.create({
      data: {
        action,
        userId: actorId,
        metadata: {
          entityType,
          entityId,
          before: metadata?.before,
          after: metadata?.after,
          ipAddress: metadata?.ipAddress,
        },
      },
    });
  }
}
