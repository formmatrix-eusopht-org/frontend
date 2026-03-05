import React, { useState } from "react";
import { DateInput } from "./DateInput";
import CustomDropdown from "./CustomDropDown";
import DatePickerInput from "./DatePicker"; // must return a Date | null
import AddressUnit from "./AddressUnit";

type Option = {
  value: string;
  label: string;
};

type InputProps = {
  label: string;
  placeholder?: string;
  value?: string;
  type?: "text" | "phone" | "date" | "dropdown" | "datepicker" | "address" | "numeric";
  onChange?: (val: string) => void;
  className?: string;
  options?: Option[];
  maxLength?: number;
};

export default function Input({
  label,
  placeholder = "",
  type = "text",
  value = "",
  onChange,
  className = '',
  options = [],
  maxLength,
}: InputProps) {
  // Formatter for phone
  const formatPhone = (input: string) => {
    const digits = input.replace(/\D/g, "").slice(0, 12);
    const parts = [];

    if (digits.length > 0) parts.push("(" + digits.slice(0, 3));
    if (digits.length >= 4) parts.push(")" + digits.slice(3, 11));

    return parts.join("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (type === "phone") {
      val = formatPhone(val);
    } else if (type === "numeric") {
      val = val.replace(/\D/g, "");
    } else {
      val = val.toUpperCase();
    }
    onChange?.(val);
  };

  // Helper to parse string to Date
  const parseStringToDate = (dateStr: string): Date | null => {
    if (!dateStr) return null;
    const parts = dateStr.split("/");
    if (parts.length !== 3) return null;
    const [month, day, year] = parts.map(Number);
    return new Date(year, month - 1, day);
  };

  // Helper to format Date to MM/DD/YYYY string
  const formatDateToString = (date: Date | null): string => {
    if (!date) return "";
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
  };

  return (
    <div className="flex flex-col">
      <label className="text-[13px] font-thin tracking-tight mb-1 mt-3 whitespace-nowrap overflow-hidden text-ellipsis" title={label}>{label}</label>

      {type === "date" ? (
        <DateInput
          label={label}
          placeholder={placeholder}
          value={value}
          onChange={(val) => onChange?.(val)}
          className={className}
        />
      ) : type === "dropdown" && options.length > 0 ? (
        <CustomDropdown
          value={value}
          onChange={(val: string) => onChange?.(val)}
          placeholder={placeholder}
          options={options}
          className={`rounded h-[37px] ${className}`}
        />
      ) : type === "datepicker" ? (
        <DatePickerInput
          label=""
          selectedDate={parseStringToDate(value)}
          onChange={(date) => onChange?.(formatDateToString(date))}
          placeholder={placeholder}
        />
      ) : type === "address" ? (
        <AddressUnit
          value={value}
          onChange={(val: string) => onChange?.(val)}
          placeholder="Unit number"
          className={className}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          inputMode={type === "phone" || type === "numeric" ? "numeric" : undefined}
          // maxLength={type === "phone" ? 14 : undefined}
          maxLength={type === "phone" ? 14 : maxLength}
          className={`border border-gray-300 rounded-md px-3 py-2 text-sm w-full ${className}`}
        />
      )}
    </div>
  );
}
