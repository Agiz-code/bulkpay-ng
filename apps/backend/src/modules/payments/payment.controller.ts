import { Body, Controller, Post } from '@nestjs/common';
import { PaymentService } from './payments.service';

@Controller('payments')
export class PaymentController {
  constructor(private payment: PaymentService) {}

  @Post('fund')
  fund(@Body() body: any) {
    return this.payment.initiateFunding(
      body.companyId,
      body.amount,
      body.email,
    );
  }
}
