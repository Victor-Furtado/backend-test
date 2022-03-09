import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotBrackets, Repository } from 'typeorm';
import { InvestmentDto } from './dto/investment.dto';
import { Investment } from './investment.entity';

import Calc from '../functions/gainAndTaxCalc';
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
    if(!createInvestmentDto.creation_date) createInvestmentDto.creation_date = new Date(); 
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
    investments.where('i.owner = :owner', { owner });
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
    if (investment.withdraw_date)
      return `This investment has already been withdrawn`;
    investment.withdraw_date = new Date();
    investment.withdraw_amount = Calc(investment);
    this.InvestmentRepository.save(investment);
    return `You withdrew $${investment.withdraw_amount}, Congratulations!`;
  }
}
