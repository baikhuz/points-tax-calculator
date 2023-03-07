import { useState } from "react";
import "./App.css";
import fetchGet from "./utils/fetchGet";
import calculateTax from "./utils/calculateTax";
import TaxInfo from "./components/TaxInfo";
import TaxForm from "./components/TaxForm";

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

const TAX_INFO_INIT = {
  taxRate: 0,
  taxOwed: 0,
  taxPerBand: [
    {
      min: 0,
      max: 0,
      rate: 0,
      amount: 0,
    },
  ],
  effectiveTaxRate: 0,
};

const GET_BRACKETS_URL = "http://localhost:5000/tax-calculator/brackets";

function App() {
  const [salary, setSalary] = useState(0);
  const [taxInfo, setTaxInfo] = useState<TaxInfoType>(TAX_INFO_INIT);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data: BracketsData = await fetchGet(GET_BRACKETS_URL);
    const bracketsArr = data.tax_brackets;
    const { taxRate, taxOwed, taxPerBand, effectiveTaxRate } = calculateTax(
      salary,
      bracketsArr
    );

    setTaxInfo({
      taxRate,
      taxOwed,
      taxPerBand,
      effectiveTaxRate,
    });
  };

  return (
    <div className="App">
      <h1>Points Tax Calculator 💰💸</h1>
      <TaxForm onSubmit={onSubmit} setSalary={setSalary} />
      <TaxInfo taxInfo={taxInfo} />
    </div>
  );
}

export default App;
