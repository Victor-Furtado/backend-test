import { IsDate, IsEmail, IsNotEmpty } from "class-validator";

export class InvestmentDto {
  @IsEmail()
  owner: string;

  @IsNotEmpty()
  initial_amount: number;

  creation_date: Date;
}
