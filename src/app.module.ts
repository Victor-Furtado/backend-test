import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvestmentModule } from './investment/investment.module';
import { Inve]Module } from './inve]/inve].module';
import { InvestmentModule } from './investment/investment.module';
import config from '../ormconfig';
@Module({
  imports: [TypeOrmModule.forRoot(config), InvestmentModule, Inve]Module],
  controllers: [],
  providers: [],
})
export class AppModule {}
