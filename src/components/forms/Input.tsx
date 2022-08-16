import { useState } from "react";

export default function Input({
  name,
  label,
  inputType,
  isRequired,
  pattern,
  placeholder,
  serverValue,
}: {
  name: string;
  wasSubmitted?: boolean;
  inputType: string;
  isRequired: boolean;
  label: string;
  pattern?: string;
  placeholder?: string;
  serverValue?: string | boolean;
}) {
  const [value, setValue] = useState(serverValue || "");
  const [touched, setTouched] = useState(false);

  return (
    <div
      key={name}
      className="flex align-middle text-left justify-evenly flex-col w-full md:flex-row md:justify-between  md:mx-auto   mb-4"
    >
      <label
        className="pb-2 font-sansBody capitalize md:self-center md:pb-0"
        htmlFor={`${name}-input`}
      >
        {label}:
      </label>
      <input
        id={`${name}-input`}
        name={name}
        type={inputType}
        onChange={(event) => {
          const value = event.currentTarget.value;
          setValue(value);
        }}
        value={value as string}
        onBlur={() => setTouched(true)}
        required={isRequired && true}
        pattern={pattern}
        placeholder={placeholder}
        className="rounded-lg focus:ring-red focus:border-red border-none"
      />
    </div>
  );
}
