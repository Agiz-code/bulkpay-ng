import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  create(name: string) {
    return this.prisma.company.create({
      data: { name },
    });
  }

  findAll() {
    return this.prisma.company.findMany();
  }
}
