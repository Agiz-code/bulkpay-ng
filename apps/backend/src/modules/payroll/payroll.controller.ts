import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { PayrollService } from './payroll.service';
import { JwtGuard } from '@/common/guards/jwt.guard';

@Controller('payroll')
export class PayrollController {
  constructor(private payroll: PayrollService) {}

  @UseGuards(JwtGuard)
  @Post('create')
  create(@Body() body: any, @Req() req: any) {
    return this.payroll.createBatch(body.data, req.user.userId);
  }

  @UseGuards(JwtGuard)
  @Post('approve')
  approve(@Body() body: any) {
    return this.payroll.approve(body.batchId);
  }
}
