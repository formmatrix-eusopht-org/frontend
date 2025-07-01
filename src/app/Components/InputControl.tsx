import React, { useState } from "react";
import { DateInput } from "./DateInput";
import CustomDropdown from "./CustomDropDown";

type Option = {
  value: string;
  label: string;
};

type InputProps = {
  label: string;
  placeholder?: string;
  value?: string;
  type?: "text" | "phone" | "date" | "dropdown";
  onChange?: (val: string) => void;
  className?: string;
  options?: Option[]; // for dropdowns
};

export default function Input({
  label,
  placeholder = "",
  type = "text",
  value = "",
  onChange,
  className = '',
  options = [],
}: InputProps) {
  // Local formatter for phone input (still controlled from parent)
  const formatPhone = (input: string) => {
    const digits = input.replace(/\D/g, "").slice(0, 12);
    const parts = [];

    if (digits.length > 0) parts.push("(" + digits.slice(0, 3));
    if (digits.length >= 4) parts.push(")" + digits.slice(3, 11));

    return parts.join("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = type === "phone" ? formatPhone(e.target.value) : (e.target.value).toUpperCase();
    onChange?.(val);
  };

  return (
    <div className="flex flex-col">
      <label className="text-[13px] font-thin tracking-tight mb-1">{label}</label>

      {type === "date" ? (
        <DateInput
          label={label}
          placeholder={placeholder}
          value={value} // ← from parent
          onChange={(val) => {
            console.log("Firing date input change", label, val);
            onChange?.(val); // ← propagate to form state
          }}
        />
      ) : type === "dropdown" && options.length > 0 ? (
        <CustomDropdown
          value={value}
          onChange={(val: string, _label: string) => onChange?.(val)}
          placeholder={placeholder}
          options={options}
          className="rounded h-[37px]"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          inputMode={type === "phone" ? "numeric" : undefined}
          maxLength={type === "phone" ? 14 : undefined}
          className={` border border-gray-300 rounded-md px-3 py-2 text-sm ${className}`}
        />
      )}
    </div>
  );
}
