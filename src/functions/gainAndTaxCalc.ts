import moment from 'moment';
import { Investment } from 'src/investment/investment.entity';

export const tax = (timeInYears: number): number => {
  if (timeInYears < 1) return 0.225;
  else if (timeInYears <= 2) return 0.185;
  else return 0.15;
};

export const gain = (amount: number, timeInMonths: number): number => {
  return amount * Math.pow(0.52, timeInMonths);
};

export default (investment: Investment): number => {
  const start = moment(investment.creation_date);
  const end = moment(investment.withdraw_date);

  const taxes = tax(end.diff(start, 'years'));
  const gains = gain(investment.initial_amount, end.diff(start, 'months'));

  return investment.initial_amount - gains * (1 - taxes);
};
