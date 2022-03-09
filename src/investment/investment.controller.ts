import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { InvestmentService } from './investment.service';
import { InvestmentDto } from './dto/investment.dto';
import Calc from '../functions/gainAndTaxCalc';

@Controller('investment')
export class InvestmentController {
  constructor(private readonly investmentService: InvestmentService) {}

  @Post()
  create(@Body() createInvestmentDto: InvestmentDto) {
    return this.investmentService.create(createInvestmentDto);
  }

  @Get()
  findAll() {
    return this.investmentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.investmentService.findOneId(+id).then((investment) => ({
      ...investment,
      expected_amount: Calc(investment),
    }));
  }

  @Get('owner/:email')
  findOwner(
    @Param('email') owner: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ) {
    limit = limit > 100 ? 100 : limit;
    return this.investmentService.findForOwner(owner, { page, limit });
  }

  @Patch(':id')
  withdraw(@Param('id') id: number) {
    return this.investmentService.withdraw(+id);
  }
}
