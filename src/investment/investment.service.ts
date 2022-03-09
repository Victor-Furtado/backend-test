import { Injectable } from '@nestjs/common';
import { InvestmentDto } from './dto/investment.dto';

@Injectable()
export class InvestmentService {
  create(createInvestmentDto: InvestmentDto) {
    return 'This action adds a new investment';
  }

  findAll() {
    return `This action returns all investment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} investment`;
  }

  withdraw(id: number) {
    return `This action withdraw and updates a #${id} investment`;
  }
}
