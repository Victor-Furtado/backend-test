import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InvestmentController } from './investment.controller';
import { Investment } from './investment.entity';
import { InvestmentService } from './investment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Investment])],
  controllers: [InvestmentController],
  providers: [InvestmentService],
})
export class InvestmentModule {}
