import { useCallback, useState } from "react";
import calculateTax from "../utils/calculateTax";
import { TaxInfoType } from "../types";
import { TAX_INFO_INIT, GET_BRACKETS_URL } from "../constants";

const useTaxForm = (
  setTaxInfo: React.Dispatch<React.SetStateAction<TaxInfoType>>
) => {
  const [salary, setSalary] = useState(0);
  const [selectedYear, setSelectedYear] = useState("2019");
  function onRadioChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSelectedYear(e.target.value);
  }
  const [error, setError] = useState("");

  // fetching logic is usually contained in a custom hook for bigger apps
  // although i'd use ReactQuery library for all API calls for cleaner code and easy caching
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<Error | null>(null);
  const fetchData = async (url: string) => {
    try {
      setLoading(true);
      const response = await fetch(url);
      setLoading(false);

      if (response.status !== 200) {
        const err = new Error(response.statusText);
        setFetchError(err);
      }
      return await response.json();
    } catch (err) {
      setFetchError(err as Error);
    }
  };

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setTaxInfo(TAX_INFO_INIT);
      setError("");
      setFetchError(null);

      if (salary <= 0) {
        setError("Enter a positive salary!");
        return;
      }

      const data = await fetchData(`${GET_BRACKETS_URL}${selectedYear}`);

      if (fetchError) {
        setError(
          `Oops, something's wrong with our server, refresh the page and try again: ${String(
            fetchError
          )}`
        );
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
    },
    [fetchError, salary, selectedYear, setTaxInfo]
  );

  return {
    setSalary,
    error,
    onSubmit,
    onRadioChange,
    loading,
  };
};

export default useTaxForm;
