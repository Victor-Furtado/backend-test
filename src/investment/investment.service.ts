import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvestmentDto } from './dto/investment.dto';
import { Investment } from './investment.entity';

import Calc from '../functions/gainAndTaxCalc';
import paginateResponse from 'src/functions/paginationResponse';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class InvestmentService {
  constructor(
    @InjectRepository(Investment)
    private InvestmentRepository: Repository<Investment>,
  ) {}

  create(createInvestmentDto: InvestmentDto): Promise<Investment> {
    const investment = this.InvestmentRepository.create(createInvestmentDto);
    return this.InvestmentRepository.save(investment);
  }

  findAll(): Promise<Investment[]> {
    return this.InvestmentRepository.find();
  }

  async findForOwner(
    owner: string,
    options: IPaginationOptions,
  ): Promise<Pagination<Investment>> {
    const investments = this.InvestmentRepository.createQueryBuilder('i');
    investments.where('c.owner = :owner', { owner });
    return paginate<Investment>(this.InvestmentRepository, options);
  }

  async findOneId(id: number): Promise<Investment> {
    try {
      const investment = await this.InvestmentRepository.findOneOrFail(id);
      return investment;
    } catch (err) {
      // handle error
      throw err;
    }
  }

  async withdraw(id: number) {
    const investment = await this.findOneId(id);
    investment.withdraw_date = new Date();
    investment.withdraw_amount = Calc(investment);
    return `You withdrew $${investment.withdraw_amount.toFixed(
      2,
    )}, Congratulations!`;
  }
}
