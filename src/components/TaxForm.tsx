import Input from "./Input";
import { TaxInfoType } from "../types";
import useTaxForm from "../hooks/useTaxForm";
import RadioGroup from "./RadioGroup";
import { GET_YEAR_RADIO_BUTTONS } from "../constants";

interface TaxFormProps {
  setTaxInfo: React.Dispatch<React.SetStateAction<TaxInfoType>>;
}

const TaxForm = ({ setTaxInfo }: TaxFormProps) => {
  const { setSalary, error, onSubmit, onRadioChange, loading } =
    useTaxForm(setTaxInfo);

  return (
    <form onSubmit={onSubmit}>
      {/* TODO: the api does not support years outside 2019-2021 range. this RadioGroup can be removed once the api is updated */}
      <RadioGroup
        labelText="Select year:"
        name="year"
        radioButtons={GET_YEAR_RADIO_BUTTONS}
        onChange={onRadioChange}
      />
      <label>
        Enter your yearly salary:
        <Input
          name="salary"
          type="number"
          onChange={(e) => setSalary(e.target.value as unknown as number)}
        />
      </label>
      <input type="submit" value="Calculate" className="submit-button" />
      {loading ? "Loading..." : null}
      {error ? <p className="tax-form-error">Error: {error}</p> : null}
    </form>
  );
};

export default TaxForm;
