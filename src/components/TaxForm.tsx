import React, { useState } from "react";
import Input from "./Input";
import calculateTax from "../utils/calculateTax";
import { TaxInfoType, BracketsData } from "../App";
import { TAX_INFO_INIT } from "../constants";
import useFetch from "../hooks/useFetch";

interface TaxFormProps {
  setTaxInfo: React.Dispatch<React.SetStateAction<TaxInfoType>>;
}

const GET_BRACKETS_URL = "http://localhost:5000/tax-calculator/brackets";

const TaxForm = ({ setTaxInfo }: TaxFormProps) => {
  const [salary, setSalary] = useState(0);
  const [error, setError] = useState("");
  const {
    data,
    error: fetchError,
  }: { data: BracketsData | null; error: Error | null } =
    useFetch(GET_BRACKETS_URL);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTaxInfo(TAX_INFO_INIT);
    setError("");

    if (fetchError) {
      setError(
        `Oops, something's wrong with our server, try again later: ${String(
          fetchError
        )}`
      );
      return;
    }

    if (salary <= 0) {
      setError("Enter a positive salary!");
      return;
    }

    if (data?.tax_brackets) {
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
    }
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
