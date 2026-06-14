import { Controller, Post, Get, Body } from '@nestjs/common';
import { CompanyService } from './company.service';

@Controller('company')
export class CompanyController {
  constructor(private company: CompanyService) {}

  @Post()
  create(@Body() body: any) {
    return this.company.create(body.name);
  }

  @Get()
  findAll() {
    return this.company.findAll();
  }
}
