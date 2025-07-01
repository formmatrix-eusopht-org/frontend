import React, { useRef, useEffect } from "react";

interface Option {
  label: string;
  value: string;
  [key: string]: any;
}

interface CustomDropdownProps {
  value: string;
  onChange: (val: string, label: string) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  value,
  onChange,
  options,
  placeholder = "Select option",
  className = "",
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const selectedOption = options.find((opt) => opt.value === value);
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (val: string) => {
    const selected = options.find((opt) => opt.value === val);
    onChange(val, selected?.label ?? "");
    setIsOpen(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full">
      <button
        type="button"
        onClick={toggleDropdown}
        className={`w-full bg-white border border-gray-300 flex items-center justify-between px-4
        ${!selectedOption ? "text-gray-400" : "text-gray-800"}
        ${className}`}
      >
        <span>{selectedOption?.label || placeholder}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform ${isOpen ? "rotate-180" : ""} ml-2`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {isOpen && (
        <ul className="absolute w-full mt-1 bg-white border border-gray-300 rounded shadow max-h-48 overflow-y-auto z-20">
          {options.map((opt) => (
            <li
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={`px-4 py-2 text-[13px] cursor-pointer ${
                value === opt.value
                  ? "bg-gray-100 text-black font-medium"
                  : "text-gray-500"
              } hover:bg-black hover:text-white`}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
