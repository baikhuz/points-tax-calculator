import { TaxBracket, TaxBracketWithAmount } from "../App";

export default function calculateTax(
  salary: number,
  brackets: TaxBracket[]
): {
  taxRate: number;
  taxOwed: number;
  taxPerBand: TaxBracketWithAmount[];
  effectiveTaxRate: number;
} {
  let taxOwed = 0;
  let taxPerBand: TaxBracketWithAmount[] = [];

  for (const bracket of brackets) {
    const taxableIncome = Math.max(
      0,
      Math.min(
        salary - bracket.min,
        bracket.max != null ? bracket.max - bracket.min : Infinity
      )
    );
    const taxThisBand = taxableIncome * bracket.rate;

    taxOwed += taxThisBand;
    taxPerBand.push({ ...bracket, amount: taxThisBand });

    if (bracket.max != null && salary <= bracket.max) {
      break;
    }
  }

  const taxRate = Number((taxOwed / salary).toFixed(2));
  const effectiveTaxRate = taxOwed / (salary - taxOwed);

  return {
    taxRate,
    taxOwed: Number(taxOwed.toFixed(2)),
    taxPerBand,
    effectiveTaxRate: Number(effectiveTaxRate.toFixed(2)),
  };
}
