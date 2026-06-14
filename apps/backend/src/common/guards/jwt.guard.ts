import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { createRemoteJWKSet, jwtVerify as joseVerify } from 'jose';
import { verify as jwtVerifyLocal } from 'jsonwebtoken';

@Injectable()
export class JwtGuard implements CanActivate {
  private jwks?: ReturnType<typeof createRemoteJWKSet>;
  private issuer: string;
  private localSecret: string;
  constructor() {
    this.issuer = process.env.CLERK_JWT_ISSUER ?? '';
    this.localSecret = process.env.JWT_SECRET ?? '';
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request & { user?: any }>();
    // Lazy init JWKS to avoid startup-time URL parsing errors
    if (!this.jwks) {
      if (!this.issuer) {
        throw new UnauthorizedException('Auth issuer not configured');
      }
      try {
        const jwksUrl = new URL(`${this.issuer}/.well-known/jwks.json`);
        this.jwks = createRemoteJWKSet(jwksUrl);
      } catch {
        throw new UnauthorizedException('Invalid auth issuer URL');
      }
    }

    const authHeader = req.headers.authorization;
    if (!authHeader)
      throw new UnauthorizedException('Missing Authorization header');

    const token = authHeader.split(' ')[1];
    if (!token) throw new UnauthorizedException('Missing token');

    if (this.localSecret) {
      try {
        const payload = jwtVerifyLocal(token, this.localSecret) as any;
        req.user = payload;
        return true;
      } catch {
        // fall through to Clerk verification
      }
    }

    if (!this.issuer) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    try {
      if (!this.jwks) {
        const jwksUrl = new URL(`${this.issuer}/.well-known/jwks.json`);
        this.jwks = createRemoteJWKSet(jwksUrl);
      }

      const { payload } = await joseVerify(token, this.jwks, {
        issuer: this.issuer,
      });
      req.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
