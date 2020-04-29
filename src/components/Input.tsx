import React from "react";

type InputProps = {
  label: string;
  type?: "text" | "email" | "password";
  value: any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  placeholder?: string;
};
export const Input = ({
  label,
  name,
  type = "text",
  placeholder,
  onChange,
  value,
}: InputProps) => (
  <div className="flex flex-col m2">
    <label htmlFor={name}>{label}</label>

    <input
      type={type}
      className="input"
      placeholder={placeholder}
      name={name}
      id={name}
      onChange={onChange}
      value={value}
    />
  </div>
);
