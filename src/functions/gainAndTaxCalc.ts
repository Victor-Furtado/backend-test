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
  const start: number = +investment.creation_date;
  const end: number = +investment.withdraw_date;

  const years = Math.floor((end - start) / 31557600000);
  const months = Math.floor((end - start) / 2419200000) - 1;

  const taxes = tax(years);
  const gains = gain(investment.initial_amount, months);

  return parseFloat(
    (investment.initial_amount + gains * (1 - taxes)).toFixed(2),
  );
};
