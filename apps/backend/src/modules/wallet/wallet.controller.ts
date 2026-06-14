import { JwtGuard } from '@/common/guards/jwt.guard';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private wallet: WalletService) {}

  @UseGuards(JwtGuard)
  @Get()
  getWallet(@Req() req: any) {
    return this.wallet.getBalance(req.user.companyId);
  }
}
