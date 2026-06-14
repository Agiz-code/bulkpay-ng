import { Controller, HttpStatus, Logger, Post, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { Webhook } from 'svix';
import { ClerkWebhookService } from './clerk-webhook.service';

@Controller('api/webhooks')
export class ClerkWebhookController {
  private readonly logger = new Logger(ClerkWebhookController.name);

  constructor(private readonly clerkService: ClerkWebhookService) {}

  @Post('clerk')
  async handleClerkWebhook(@Req() req: Request, @Res() res: Response) {
    const secret = process.env.CLERK_WEBHOOK_SECRET;
    if (!secret) {
      this.logger.error('CLERK_WEBHOOK_SECRET is not configured');
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send('Server misconfigured');
    }

    // When using express.raw middleware for this route, req.body is a Buffer
    const raw = req.body as Buffer | undefined;
    if (!raw || !(raw instanceof Buffer)) {
      this.logger.warn('No raw body available on request');
      return res.status(HttpStatus.BAD_REQUEST).send('Missing raw body');
    }

    const headers = {
      'svix-id': req.header('svix-id') ?? '',
      'svix-timestamp': req.header('svix-timestamp') ?? '',
      'svix-signature': req.header('svix-signature') ?? '',
    };

    try {
      new Webhook(secret).verify(raw, headers);
    } catch (err) {
      this.logger.warn('Svix verification failed', err as Error);
      return res.status(HttpStatus.BAD_REQUEST).send('Invalid signature');
    }

    let payload: unknown;
    try {
      payload = JSON.parse(raw.toString('utf8')) as unknown;
    } catch (err) {
      this.logger.warn('Invalid JSON payload', err as Error);
      return res.status(HttpStatus.BAD_REQUEST).send('Invalid JSON');
    }

    try {
      // delegate to service for handling
      // service will validate structure and ignore unknown events
      await this.clerkService.handleEvent(payload as any);
    } catch (err) {
      this.logger.error('Error processing webhook', err as Error);
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send('Processing error');
    }

    return res.status(HttpStatus.OK).send('ok');
  }
}
