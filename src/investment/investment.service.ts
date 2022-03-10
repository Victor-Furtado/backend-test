import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvestmentDto } from './dto/investment.dto';
import { Investment } from './investment.entity';

import ApiResponse from '../response.interface';

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

  async create(createInvestmentDto: InvestmentDto): Promise<ApiResponse> {
    if (!createInvestmentDto.creation_date)
      createInvestmentDto.creation_date = new Date();
    else if (
      createInvestmentDto.creation_date.setHours(0, 0, 0, 0) -
        new Date().setHours(0, 0, 0, 0) >
      0
    ) {
      return {
        statusCode: 400,
        message: [`A investment cannot be created in future`],
        data: {},
        error: 'Bad Request',
      };
    }
    try {
      const investment = this.InvestmentRepository.create(createInvestmentDto);
      return {
        statusCode: 200,
        message: [
          `Investment of $${investment.initial_amount.toFixed(
            2,
          )} made on behalf of ${investment.owner}`,
        ],
        data: await this.InvestmentRepository.save(investment),
        error: null,
      };
    } catch (err) {
      // handle error
      console.error(err);
    }
  }

  async findAll(): Promise<ApiResponse> {
    return {
      statusCode: 200,
      message: ['Fetch successfully completed'],
      data: await this.InvestmentRepository.find(),
      error: null,
    };
  }

  async findForOwner(
    owner: string,
    options: IPaginationOptions,
  ): Promise<ApiResponse> {
    const investments = this.InvestmentRepository.createQueryBuilder('i');
    investments.where('i.owner = :owner', { owner });
    return {
      statusCode: 200,
      message: ['Fetch successfully completed'],
      data: await paginate<Investment>(this.InvestmentRepository, options),
      error: null,
    };
  }

  async findOneId(id: number): Promise<ApiResponse> {
    try {
      const investment = this.InvestmentRepository.findOne(id);
      if (!investment)
        return {
          statusCode: 400,
          message: ['ID not Found'],
          data: {},
          error: 'Bad Request',
        };
      return {
        statusCode: 200,
        message: ['Fetch successfully completed'],
        data: await investment,
        error: null,
      };
    } catch (err) {
      // handle error
      console.error(err);
    }
  }

  async withdraw(id: number) {
    try {
      const investment = await this.InvestmentRepository.findOne(id);
      if (!investment)
        return {
          statusCode: 400,
          message: ['ID not Found'],
          data: {},
          error: 'Bad Request',
        };
      if (investment.withdraw_date)
        return {
          statusCode: 400,
          message: [`This investment has already been withdrawn`],
          data: investment,
          error: 'Bad Request',
        };
      investment.withdraw_date = new Date();
      investment.withdraw_amount = Calc(investment);
      this.InvestmentRepository.save(investment);
      return {
        statusCode: 200,
        message: [
          `You withdrew $${investment.withdraw_amount}, Congratulations!`,
        ],
        data: investment,
        error: null,
      };
    } catch (err) {
      throw err;
    }
  }
}
