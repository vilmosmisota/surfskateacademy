import { useEffect, useState } from "react";

export default function Input({
  name,
  label,
  wasSubmitted,
  inputType,
  isRequired,
  pattern,
  placeholder,
}: {
  name: string;
  wasSubmitted: boolean;
  inputType: string;
  isRequired: boolean;
  label: string;
  pattern?: string;
  placeholder?: string;
}) {
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (touched) {
      console.log("vege");
    }
  }, [touched]);

  return (
    <div
      key={name}
      className="flex align-middle text-left justify-evenly flex-col w-full  mb-4"
    >
      <label
        className="pb-2 font-sansBody capitalize"
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
          setValue(value.toLowerCase());
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
