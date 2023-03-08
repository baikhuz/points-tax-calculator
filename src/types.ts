export type TaxBracket = {
  min: number;
  max: number;
  rate: number;
};

export interface TaxBracketWithAmount extends TaxBracket {
  amount: number;
}

export type BracketsData = {
  tax_brackets: TaxBracket[];
};

export type TaxInfoType = {
  taxRate: number;
  taxOwed: number;
  taxPerBand: TaxBracketWithAmount[];
  effectiveTaxRate: number;
};
