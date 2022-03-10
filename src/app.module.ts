import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvestmentModule } from './investment/investment.module';
import config from '../ormconfig';
@Module({
  imports: [TypeOrmModule.forRoot(config), InvestmentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
