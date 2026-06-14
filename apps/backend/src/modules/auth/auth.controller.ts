import { JwtGuard } from '@/common/guards/jwt.guard';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('login')
  login(@Body() body: any) {
    if (!body.email || !body.password) {
      throw new BadRequestException('Email and password are required');
    }
    return this.auth.login(body.email, body.password);
  }

  @Post('register')
  register(@Body() body: any) {
    // Validate input
    if (!body.name || !body.name.trim()) {
      throw new BadRequestException('Name is required');
    }
    if (!body.email || !body.email.trim()) {
      throw new BadRequestException('Email is required');
    }
    if (!body.password || body.password.length < 6) {
      throw new BadRequestException('Password must be at least 6 characters');
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      throw new BadRequestException('Invalid email format');
    }

    return this.auth.register(body.name, body.email, body.password);
  }

  @UseGuards(JwtGuard)
  @Get('me')
  me(@Req() req: any) {
    return this.auth.me(req.user.userId);
  }
}
