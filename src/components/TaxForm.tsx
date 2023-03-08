import React, { useState } from "react";
import Input from "./Input";
import fetchGet from "../utils/fetchGet";
import calculateTax from "../utils/calculateTax";
import { TaxInfoType, BracketsData } from "../App";
import { TAX_INFO_INIT } from "../constants";

interface TaxFormProps {
  setTaxInfo: React.Dispatch<React.SetStateAction<TaxInfoType>>;
}

const GET_BRACKETS_URL = "http://localhost:5001/tax-calculator/brackets";

const TaxForm = ({ setTaxInfo }: TaxFormProps) => {
  const [salary, setSalary] = useState(0);
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTaxInfo(TAX_INFO_INIT);
    setError("");

    if (salary < 0) {
      setError("Is your salary really negative?🤔");
      return;
    }

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
    <form onSubmit={onSubmit}>
      <label>
        Enter your yearly salary:
        <Input
          name="salary"
          type="number"
          onChange={(e) => setSalary(e.target.value as unknown as number)}
        />
      </label>
      <input type="submit" value="Calculate" />
      {error ? <p className="tax-form-error">Error: {error}</p> : null}
    </form>
  );
};

export default TaxForm;
