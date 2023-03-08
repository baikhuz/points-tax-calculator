import { useState } from "react";
import "./App.css";
import TaxInfo from "./components/TaxInfo";
import TaxForm from "./components/TaxForm";
import { TAX_INFO_INIT } from "./constants";

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

function App() {
  const [taxInfo, setTaxInfo] = useState<TaxInfoType>(TAX_INFO_INIT);

  return (
    <div className="App">
      <h1>Points Tax Calculator 💰💸</h1>
      <TaxForm setTaxInfo={setTaxInfo} />
      <TaxInfo taxInfo={taxInfo} />
    </div>
  );
}

export default App;
