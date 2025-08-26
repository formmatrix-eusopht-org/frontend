"use client";
import React, { useState, useRef, useEffect } from "react";

interface Option {
  code: string;
  name: string;
}

interface AutoCompleteInputProps {
  options: Option[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const AutoCompleteInput: React.FC<AutoCompleteInputProps> = ({
  options,
  value = "",
  onChange,
  placeholder = "Country",
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [filteredOptions, setFilteredOptions] = useState<Option[]>([]);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inputValue.trim() === "") {
      setFilteredOptions([]);
    } else {
      const sorted = options
        .filter((opt) =>
          opt.name.toLowerCase().includes(inputValue.toLowerCase())
        )
        .sort((a, b) => a.name.localeCompare(b.name));
      setFilteredOptions(sorted);
    }
  }, [inputValue, options]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (option: Option) => {
    setInputValue(option.name);
    onChange(option.name);
    setOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <input
        type="text"
        value={inputValue}
        placeholder={placeholder}
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setInputValue(e.target.value);
          onChange(e.target.value);
          setOpen(true);
        }}
        className="w-full h-10 rounded-md border px-3 border-[#E9EAEF] font-medium text-sm"
      />
      {open && filteredOptions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border mt-1 rounded-md shadow-lg max-h-48 overflow-y-auto">
          {filteredOptions.map((option) => (
            <li
              key={option.code}
              onClick={() => handleSelect(option)}
              className="px-3 py-2 cursor-pointer hover:bg-blue-100"
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoCompleteInput;
