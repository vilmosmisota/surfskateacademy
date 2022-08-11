import { useEffect, useState } from "react";

export default function Input({
  name,
  label,
  inputType,
  isRequired,
  pattern,
  placeholder,
}: {
  name: string;
  wasSubmitted?: boolean;
  inputType: string;
  isRequired: boolean;
  label: string;
  pattern?: string;
  placeholder?: string;
}) {
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);

  return (
    <div
      key={name}
      className="flex align-middle text-left justify-evenly flex-col w-full md:flex-row md:justify-between md:w-3/4 md:mx-auto   mb-4"
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
        onBlur={() => setTouched(true)}
        required={isRequired && true}
        pattern={pattern}
        placeholder={placeholder}
        className="rounded-lg focus:ring-red focus:border-red border-none"
      />
    </div>
  );
}
