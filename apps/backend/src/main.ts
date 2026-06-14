import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import * as express from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Ensure raw body is available for Clerk webhook verification on this route
  app.use('/api/webhooks/clerk', express.raw({ type: '*/*' }));

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
