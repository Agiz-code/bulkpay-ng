import { Controller, Post, Req } from '@nestjs/common';
import * as crypto from 'crypto';
import { PaymentService } from './modules/payments/payments.service';

@Controller('webhook')
export class PaystackWebhook {
  constructor(private payment: PaymentService) {}

  @Post()
  async handle(@Req() req: any) {
    const hash = crypto
      .createHmac('sha512', process.env.PAYSTACK_SECRET!)
      .update(JSON.stringify(req.body))
      .digest('hex');

    if (hash !== req.headers['x-paystack-signature']) {
      throw new Error('Invalid signature');
    }

    const event = req.body;

    if (event.event === 'charge.success') {
      await this.payment.confirmFunding(event.data.reference);
    }

    return { ok: true };
  }
}
