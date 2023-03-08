import { useState } from "react";

export type RadioGroupProps = {
  labelText: string;
  name: string;
  radioButtons: {
    value: string;
    required?: boolean;
  }[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const RadioGroup = ({
  labelText,
  name,
  radioButtons,
  onChange,
}: RadioGroupProps) => {
  const [checkedValue, setCheckedValue] = useState<string>(
    radioButtons[0].value
  );
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCheckedValue(event.target.value);

    // leaving the callback here for the same reason described in Input.tsx
    onChange && onChange(event);
  }
  return (
    <label>
      {labelText}
      {radioButtons.map((btn) => (
        <label key={btn.value}>
          <input
            type="radio"
            name={name}
            value={btn.value}
            checked={checkedValue === btn.value}
            onChange={handleChange}
          />
          {btn.value}
        </label>
      ))}
    </label>
  );
};

export default RadioGroup;
