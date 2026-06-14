import { PrismaService } from '@/prisma/prisma.service';
import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ClerkService } from './clerk.service';
import { NeonAuthService } from './neon-auth.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private neonAuth: NeonAuthService,
    private clerkService: ClerkService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) throw new UnauthorizedException();

    if (this.neonAuth.isEnabled()) {
      try {
        const neonAuthData = await this.neonAuth.signIn(email, password);
        // Return Neon's JWT directly
        return {
          token: neonAuthData.access_token,
          user: { ...user, password: undefined },
        };
      } catch {
        throw new UnauthorizedException();
      }
    } else {
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new UnauthorizedException();
    }

    // Fallback to local JWT signing if Neon auth is disabled
    const { password: _password, ...safeUser } = user;
    const secret: jwt.Secret = process.env.JWT_SECRET!;
    const token = jwt.sign(
      { userId: user.id, role: user.role, companyId: user.companyId },
      secret,
      { expiresIn: process.env.JWT_EXPIRES_IN || '15m' } as jwt.SignOptions,
    );

    return { token, user: safeUser };
  }

  async register(name: string, email: string, password: string) {
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new BadRequestException('Email already registered');
    }

    const clerkId = this.clerkService.isEnabled()
      ? (
          await this.clerkService.createUser({
            email,
            firstName: name.split(' ')[0],
            lastName: name.split(' ').slice(1).join(' ') || undefined,
          })
        ).id
      : undefined;

    if (this.neonAuth.isEnabled()) {
      try {
        const neonAuthData = await this.neonAuth.signUp(email, password, name);
        // Create user in our database
        const user = await this.prisma.$transaction(async (tx) => {
          const now = new Date();
          const company = await tx.company.create({
            data: {
              name,
              updatedAt: now,
            },
          });

          await tx.wallet.create({
            data: {
              companyId: company.id,
              balance: BigInt(0),
              updatedAt: now,
            },
          });

          const user = await tx.user.create({
            data: {
              email,
              password: '',
              role: 'ADMIN',
              companyId: company.id,
              name,
              clerkId,
              updatedAt: now,
            },
          });

          return user;
        });

        return {
          token: neonAuthData.access_token,
          user: { ...user, password: undefined },
        };
      } catch (error) {
        throw new BadRequestException(
          'Neon Auth registration failed: ' +
            (error?.message ?? 'unknown error'),
        );
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.prisma.$transaction(async (tx) => {
      const now = new Date();
      const company = await tx.company.create({
        data: {
          name,
          updatedAt: now,
        },
      });

      await tx.wallet.create({
        data: {
          companyId: company.id,
          balance: BigInt(0),
          updatedAt: now,
        },
      });

      const user = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          role: 'ADMIN',
          companyId: company.id,
          name,
          clerkId,
          updatedAt: now,
        },
      });

      const { password: _password, ...safeUser } = user;
      const secret: jwt.Secret = process.env.JWT_SECRET!;
      const token = jwt.sign(
        { userId: user.id, role: user.role, companyId: company.id },
        secret,
        { expiresIn: process.env.JWT_EXPIRES_IN || '15m' } as jwt.SignOptions,
      );

      return { token, user: safeUser };
    });
  }

  async me(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) throw new UnauthorizedException();

    const { password: _password, ...safeUser } = user;
    return safeUser;
  }
}
