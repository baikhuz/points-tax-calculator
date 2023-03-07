import { useState } from "react";

export interface InputProps {
  name: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ name, type = "text", onChange }: InputProps) => {
  const [value, setValue] = useState("");
  return (
    <input
      name={name}
      type={type}
      onChange={(e) => {
        setValue(e.target.value);

        // VVV speaking of a problem with your controlled components
        // - passing callbacks to inputs through props makes them
        // self-sustained so they can live in a component library and
        // be configurable in Storybook. this is the approach MUI and
        // Chakra are using VVV
        onChange && onChange(e);
      }}
      value={value}
    />
  );
};

export default Input;
