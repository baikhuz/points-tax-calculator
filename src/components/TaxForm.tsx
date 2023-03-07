import React from "react";
import Input from "./Input";

interface TaxFormProps {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  setSalary: React.Dispatch<React.SetStateAction<number>>;
}

const TaxForm = ({ onSubmit, setSalary }: TaxFormProps) => {
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
    </form>
  );
};

export default TaxForm;
